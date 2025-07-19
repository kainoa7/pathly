import { Router, Request, Response } from 'express';
import OpenAI from 'openai';

const router = Router();

// Initialize OpenAI with API key from environment
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

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
  voiceId?: string;
}

// Chat endpoint using ChatGPT
router.post('/chat', async (req: Request, res: Response) => {
  try {
    const { message, personality = 'balanced', conversationHistory = [] }: ChatRequest = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Define personality prompts
    const personalityPrompts = {
      professional: `You are Jarvus, a professional AI assistant. Respond in a formal, business-focused manner. Be comprehensive and detailed in your responses.`,
      balanced: `You are Jarvus, a friendly but focused AI assistant. Maintain a balance between being approachable and professional.`,
      casual: `You are Jarvus, a casual and friendly AI assistant. Use light humor and energy in your responses. Include appropriate emojis.`,
      energetic: `You are Jarvus, an enthusiastic and high-energy AI assistant. Be excited and motivational in your responses. Use emojis and exclamation marks.`
    };

    // System prompt with personality and capabilities
    const systemPrompt = `${personalityPrompts[personality as keyof typeof personalityPrompts]}

You are an advanced AI assistant with the following capabilities:
- Calendar management (checking schedules, booking meetings)
- Email drafting and management
- Research and web search
- Document summarization
- Task reminders and management
- Daily briefings and summaries

When users ask about these features, provide realistic and helpful responses. Format your responses with appropriate emojis and structure. For calendar requests, show realistic meeting schedules. For email requests, draft professional emails. For research, provide comprehensive insights.

Keep responses concise but informative. Use formatting like bullet points and headers when appropriate.`;

    // Prepare conversation messages
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...conversationHistory,
      { role: 'user' as const, content: message }
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 500,
      temperature: personality === 'energetic' ? 0.9 : personality === 'professional' ? 0.3 : 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    });

    const aiResponse = completion.choices[0]?.message?.content || 'I apologize, but I encountered an issue generating a response.';

    // Determine response type based on content
    let responseType = 'text';
    const lowerResponse = aiResponse.toLowerCase();
    if (lowerResponse.includes('calendar') || lowerResponse.includes('schedule') || lowerResponse.includes('meeting')) {
      responseType = 'calendar';
    } else if (lowerResponse.includes('email') || lowerResponse.includes('draft') || lowerResponse.includes('message')) {
      responseType = 'email';
    } else if (lowerResponse.includes('research') || lowerResponse.includes('found') || lowerResponse.includes('search')) {
      responseType = 'research';
    } else if (lowerResponse.includes('brief') || lowerResponse.includes('digest') || lowerResponse.includes('summary')) {
      responseType = 'digest';
    }

    res.json({
      response: aiResponse,
      type: responseType,
      personality: personality,
      tokensUsed: completion.usage?.total_tokens || 0
    });

  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ 
      error: 'Failed to generate AI response',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Text-to-Speech endpoint using ElevenLabs
router.post('/tts', async (req: Request, res: Response) => {
  try {
    const { text, voiceId = ELEVENLABS_VOICE_ID }: TTSRequest = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Text is required' });
    }

    if (!ELEVENLABS_API_KEY) {
      return res.status(500).json({ error: 'ElevenLabs API key not configured' });
    }

    // Clean text for TTS (remove markdown and excessive formatting)
    const cleanText = text
      .replace(/\*\*(.*?)\*\*/g, '$1')  // Remove bold markdown
      .replace(/\*(.*?)\*/g, '$1')     // Remove italic markdown
      .replace(/#{1,6}\s/g, '')        // Remove headers
      .replace(/•/g, '')               // Remove bullet points
      .replace(/📅|✉️|🔍|📰|⏰|📄/g, '') // Remove emojis that might confuse TTS
      .replace(/\n+/g, '. ')           // Replace line breaks with periods
      .substring(0, 500);              // Limit length for TTS

    const response = await fetch(`${ELEVENLABS_API_URL}/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY
      },
      body: JSON.stringify({
        text: cleanText,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.8,
          style: 0.2,
          use_speaker_boost: true
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs API error:', errorText);
      return res.status(500).json({ error: 'Failed to generate speech' });
    }

    // Convert audio response to base64
    const audioBuffer = await response.arrayBuffer();
    const audioBase64 = Buffer.from(audioBuffer).toString('base64');

    res.json({
      audio: audioBase64,
      format: 'mp3',
      text: cleanText
    });

  } catch (error) {
    console.error('TTS error:', error);
    res.status(500).json({ 
      error: 'Failed to generate speech',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Health check endpoint
router.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    openai: !!process.env.OPENAI_API_KEY,
    elevenlabs: !!process.env.ELEVENLABS_API_KEY,
    timestamp: new Date().toISOString()
  });
});

export default router; 