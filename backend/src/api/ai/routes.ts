import { Router, Request, Response } from 'express';
import OpenAI from 'openai';

const router = Router();

// Lazy initialize OpenAI client only when API key is available
let openai: OpenAI | null = null;

const getOpenAIClient = (): OpenAI | null => {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }
  
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  
  return openai;
};

// ElevenLabs configuration
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID;
const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1';

interface ChatRequest {
  message: string;
  personality?: string;
  conversationHistory?: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

interface TTSRequest {
  text: string;
  voice_id?: string;
}

// Personality-based prompts
const personalityPrompts = {
  professional: "You are a professional AI career advisor. Provide formal, business-focused guidance with industry insights and strategic recommendations.",
  friendly: "You are a warm and conversational career coach. Be supportive, encouraging, and personable while providing helpful career advice.",
  balanced: "You are a knowledgeable career assistant. Balance professionalism with approachability, providing practical and actionable career guidance.",
  creative: "You are an innovative career strategist. Think outside the box and provide creative, forward-thinking career advice and unique perspectives."
};

// Chat endpoint
router.post('/chat', async (req: Request, res: Response) => {
  try {
    const { message, personality = 'balanced', conversationHistory = [] }: ChatRequest = req.body;

    if (!message?.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const client = getOpenAIClient();
    
    if (!client) {
      // Fallback response when OpenAI is not available
      const fallbackResponses = {
        professional: "I'm currently in professional preview mode. In the full version, I would provide strategic career guidance, industry insights, and formal recommendations tailored to your professional goals.",
        friendly: "Hey there! I'm in preview mode right now, but I'm excited to help with your career journey! In the full version, I'd be your supportive career buddy, offering encouragement and personalized advice.",
        balanced: "I'm currently in preview mode, but I can show you what's coming! In the full version, I'd provide balanced career guidance combining industry knowledge with practical, actionable steps for your professional growth.",
        creative: "I'm in creative preview mode! In the full version, I'd help you think outside the box about your career, exploring innovative paths and unique opportunities you might not have considered."
      };

      const baseResponse = fallbackResponses[personality as keyof typeof fallbackResponses] || fallbackResponses.balanced;
      
      return res.json({
        response: `${baseResponse}

🚀 **Career-Focused AI Features Coming:**
• Smart resume optimization for target companies
• Company-specific interview preparation  
• Salary negotiation coaching with market data
• Professional networking strategies
• Career path planning with industry trends

Your feedback helps us build the ultimate career advancement AI! What career challenges matter most to you?`,
        type: 'preview',
        personality
      });
    }

    // Real OpenAI API call when available
    const systemPrompt = `${personalityPrompts[personality as keyof typeof personalityPrompts] || personalityPrompts.balanced}

You are JARVUS, a career-focused AI assistant. Focus specifically on:
- Career development and advancement strategies
- Resume and interview guidance
- Professional networking and LinkedIn optimization
- Salary negotiation and career transitions
- Industry insights and market trends

Keep responses helpful, actionable, and career-focused. If asked about non-career topics, gently redirect to career-related aspects.`;

    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...conversationHistory.slice(-10), // Keep last 10 messages for context
      { role: 'user' as const, content: message }
    ];

    const completion = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 500,
      temperature: personality === 'creative' ? 0.8 : 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    });

    const aiResponse = completion.choices[0]?.message?.content || 'I apologize, but I encountered an issue generating a response.';

    res.json({
      response: aiResponse,
      type: 'chat',
      personality,
      usage: completion.usage
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Fallback on any error
    res.json({
      response: "I'm currently in preview mode! While I work on connecting to my full capabilities, I can show you what's coming: career-focused AI guidance, resume optimization, interview prep, and salary negotiation coaching. What career goals are you working toward?",
      type: 'fallback',
      error: 'API temporarily unavailable'
    });
  }
});

// Text-to-speech endpoint
router.post('/tts', async (req: Request, res: Response) => {
  try {
    const { text, voice_id = ELEVENLABS_VOICE_ID }: TTSRequest = req.body;

    if (!text?.trim()) {
      return res.status(400).json({ error: 'Text is required' });
    }

    if (!ELEVENLABS_API_KEY) {
      return res.status(503).json({ 
        error: 'Text-to-speech service not available in preview mode',
        fallback: true
      });
    }

    const response = await fetch(`${ELEVENLABS_API_URL}/text-to-speech/${voice_id}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY
      },
      body: JSON.stringify({
        text: text.substring(0, 500), // Limit text length
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      })
    });

    if (!response.ok) {
      throw new Error(`ElevenLabs API error: ${response.status}`);
    }

    const audioBuffer = await response.arrayBuffer();
    const audioBase64 = Buffer.from(audioBuffer).toString('base64');

    res.json({
      audio: `data:audio/mpeg;base64,${audioBase64}`,
      success: true
    });

  } catch (error) {
    console.error('TTS API error:', error);
    res.status(500).json({ 
      error: 'Text-to-speech temporarily unavailable',
      fallback: true
    });
  }
});

// Health check endpoint
router.get('/health', (req: Request, res: Response) => {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      openai: !!process.env.OPENAI_API_KEY,
      elevenlabs: !!process.env.ELEVENLABS_API_KEY,
    },
    mode: (!process.env.OPENAI_API_KEY && !process.env.ELEVENLABS_API_KEY) ? 'preview' : 'production'
  };

  res.json(health);
});

export default router;
