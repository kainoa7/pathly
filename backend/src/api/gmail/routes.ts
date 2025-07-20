import { Router, Request, Response } from 'express';
import { mockEmails, getMockEmailStats, MockEmail } from '../../data/mockEmails';
import OpenAI from 'openai';

const router = Router();

// OpenAI client for email analysis
let openai: OpenAI | null = null;
const getOpenAIClient = (): OpenAI | null => {
  if (!process.env.OPENAI_API_KEY) return null;
  if (!openai) {
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
};

// Mock Gmail connection status
let isConnected = false;

// Simulate Gmail connection (bypass OAuth)
router.get('/auth', (req: Request, res: Response) => {
  try {
    // Return a fake auth URL that we'll handle on the frontend
    const fakeAuthUrl = 'http://localhost:5173/gmail-mock-auth';
    res.json({ authUrl: fakeAuthUrl });
  } catch (error) {
    console.error('Mock Gmail auth error:', error);
    res.status(500).json({ error: 'Failed to generate mock auth URL' });
  }
});

// Mock Gmail callback (simulate successful connection)
router.get('/callback', async (req: Request, res: Response) => {
  try {
    // Simulate successful Gmail connection
    isConnected = true;
    
    // Set CSP headers to allow inline scripts for this route
    res.setHeader('Content-Security-Policy', "script-src 'self' 'unsafe-inline'");
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Gmail Connected Successfully!</title>
        <meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline'">
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          }
          .success-container {
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            padding: 2rem;
            border-radius: 10px;
            backdrop-filter: blur(10px);
          }
          .checkmark {
            font-size: 4rem;
            margin-bottom: 1rem;
          }
        </style>
      </head>
      <body>
        <div class="success-container">
          <div class="checkmark">✅</div>
          <h2>Gmail Connected Successfully!</h2>
          <p>JARVUS is now analyzing your emails...</p>
          <p><small>This window will close automatically.</small></p>
        </div>
        <script>
          console.log('Mock Gmail auth successful, sending message to parent');
          if (window.opener) {
            window.opener.postMessage({
              type: 'GMAIL_AUTH_SUCCESS',
              message: 'Gmail integration successful! (Using mock data for demo)',
              mockMode: true
            }, window.location.origin);
          }
          
          // Close window after a brief delay
          setTimeout(() => {
            window.close();
          }, 1500);
        </script>
      </body>
      </html>
    `;
    
    res.send(html);
  } catch (error) {
    console.error('Mock Gmail callback error:', error);
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Gmail Connection Error</title>
      </head>
      <body>
        <h2>Gmail Connection Failed</h2>
        <p>An error occurred during mock authentication.</p>
        <script>
          if (window.opener) {
            window.opener.postMessage({
              type: 'GMAIL_AUTH_ERROR',
              error: 'Failed to complete mock Gmail authentication'
            }, window.location.origin);
          }
          window.close();
        </script>
      </body>
      </html>
    `;
    res.send(html);
  }
});

// Get connection status
router.get('/status', (req: Request, res: Response) => {
  res.json({ 
    connected: isConnected,
    mockMode: true,
    message: isConnected ? 'Gmail connected (mock mode)' : 'Gmail not connected'
  });
});

// Get career-relevant emails with AI analysis
router.post('/analyze-emails', async (req: Request, res: Response) => {
  try {
    if (!isConnected) {
      return res.status(401).json({ error: 'Gmail not connected' });
    }

    const { category, limit = 10 } = req.body;
    
    // Filter emails by category if specified
    let filteredEmails = mockEmails;
    if (category && category !== 'all') {
      filteredEmails = mockEmails.filter(email => email.category === category);
    }

    // Sort by priority and date
    filteredEmails = filteredEmails
      .sort((a, b) => b.priority - a.priority || new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);

    // Analyze emails with AI if OpenAI is available
    const client = getOpenAIClient();
    let analysis = null;

    if (client && filteredEmails.length > 0) {
      try {
        const emailSummary = filteredEmails.map(email => 
          `Subject: ${email.subject}\nFrom: ${email.from}\nCategory: ${email.category}\nSnippet: ${email.snippet}`
        ).join('\n\n');

        const prompt = `Analyze these career-related emails and provide insights:

${emailSummary}

Provide a brief analysis including:
1. Key opportunities or action items
2. Overall career momentum assessment
3. Recommended next steps
4. Priority emails to respond to

Keep the response concise and actionable.`;

        const completion = await client.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 500,
          temperature: 0.7,
        });

        analysis = completion.choices[0]?.message?.content || null;
      } catch (aiError) {
        console.error('AI analysis error:', aiError);
        // Continue without AI analysis
      }
    }

    const stats = getMockEmailStats();
    
    res.json({
      emails: filteredEmails,
      analysis,
      stats,
      mockMode: true,
      message: 'Email analysis complete (using mock data)'
    });

  } catch (error) {
    console.error('Email analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze emails' });
  }
});

// Get email statistics
router.get('/stats', (req: Request, res: Response) => {
  try {
    if (!isConnected) {
      return res.status(401).json({ error: 'Gmail not connected' });
    }

    const stats = getMockEmailStats();
    res.json({
      ...stats,
      mockMode: true,
      message: 'Email statistics (mock data)'
    });
  } catch (error) {
    console.error('Email stats error:', error);
    res.status(500).json({ error: 'Failed to get email statistics' });
  }
});

// Get specific email by ID
router.get('/email/:id', (req: Request, res: Response) => {
  try {
    if (!isConnected) {
      return res.status(401).json({ error: 'Gmail not connected' });
    }

    const { id } = req.params;
    const email = mockEmails.find(e => e.id === id);

    if (!email) {
      return res.status(404).json({ error: 'Email not found' });
    }

    res.json({
      email,
      mockMode: true
    });
  } catch (error) {
    console.error('Get email error:', error);
    res.status(500).json({ error: 'Failed to get email' });
  }
});

// Mark email as read
router.patch('/email/:id/read', (req: Request, res: Response) => {
  try {
    if (!isConnected) {
      return res.status(401).json({ error: 'Gmail not connected' });
    }

    const { id } = req.params;
    const email = mockEmails.find(e => e.id === id);

    if (!email) {
      return res.status(404).json({ error: 'Email not found' });
    }

    email.isRead = true;

    res.json({
      success: true,
      email,
      mockMode: true,
      message: 'Email marked as read (mock data)'
    });
  } catch (error) {
    console.error('Mark email read error:', error);
    res.status(500).json({ error: 'Failed to mark email as read' });
  }
});

// Disconnect Gmail (reset mock state)
router.post('/disconnect', (req: Request, res: Response) => {
  try {
    isConnected = false;
    res.json({ 
      success: true, 
      message: 'Gmail disconnected (mock mode)' 
    });
  } catch (error) {
    console.error('Disconnect error:', error);
    res.status(500).json({ error: 'Failed to disconnect Gmail' });
  }
});

export default router; 