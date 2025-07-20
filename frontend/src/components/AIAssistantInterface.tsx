import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMicrophone, 
  faEnvelope,
  faCalendarDays,
  faBrain,
  faFileText,
  faCog,
  faSearch,
  faSignOutAlt,
  faBuilding,
  faClock,
  faUser,
  faLightbulb,
  faPaperPlane,
  faVolumeHigh,
  faRobot
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'preview';
}

interface ConversationHistory {
  role: 'user' | 'assistant';
  content: string;
}

const AIAssistantInterface = () => {
  const { logout, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [personality, setPersonality] = useState<'professional' | 'friendly' | 'balanced' | 'creative'>('balanced');
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationHistory, setConversationHistory] = useState<ConversationHistory[]>([]);
  const [showConversation, setShowConversation] = useState(false);
  const [apiStatus, setApiStatus] = useState<'preview' | 'production' | 'loading'>('loading');
  const [activeView, setActiveView] = useState<'dashboard' | 'mail' | 'calendar' | 'brain' | 'resume' | 'settings'>('brain');
  const [gmailConnected, setGmailConnected] = useState(false);
  const [gmailTokens, setGmailTokens] = useState<any>(null);
  const [emailInsights, setEmailInsights] = useState<any>(null);
  const [isLoadingEmails, setIsLoadingEmails] = useState(false);
  const [isConnectingGmail, setIsConnectingGmail] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check AI API status on mount
  useEffect(() => {
    checkAPIStatus();
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const checkAPIStatus = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/ai/health`);
      const data = await response.json();
      setApiStatus(data.mode);
    } catch (error) {
      console.error('Failed to check API status:', error);
      setApiStatus('preview');
    }
  };

  const handleLogout = () => {
    if (!isAuthenticated || !user) {
      // If not authenticated (preview mode), just go to main landing page
      navigate('/', { replace: true });
      return;
    }
    
    // If authenticated, logout and redirect based on account type
    logout();
    
    // Navigate to appropriate landing page based on account type
    switch (user.accountType) {
      case 'PREMIUM':
        navigate('/', { replace: true }); // Main landing page for premium
        break;
      case 'PRO':
        navigate('/pro', { replace: true }); // Pro landing page
        break;
      case 'EXPLORER':
        navigate('/explorer', { replace: true }); // Explorer landing page
        break;
      default:
        navigate('/', { replace: true }); // Fallback to main landing
    }
  };

  const handleAutoFix = (buttonType = 'autofix') => {
    // Check if user is authenticated
    if (!isAuthenticated || !user) {
      // If not authenticated (preview mode), show signup prompt
      const signupPrompt = window.confirm(
        '🚀 This feature requires an account!\n\n' +
        'To use JARVUS\'s advanced AI features like auto-scheduling, interview prep, and calendar intelligence, you need to create an account.\n\n' +
        'Would you like to sign up now?\n\n' +
        '• Explorer: Free forever\n' +
        '• Pro: $9.99/month\n' +
        '• Premium: $19.99/month'
      );
      
      if (signupPrompt) {
        // Navigate to pricing page to show all signup options
        navigate('/pricing', { replace: true });
      }
      return;
    }
    
    // If authenticated, show success message for demo based on button type
    const messages = {
      autofix: '🤖 Auto-fix applied! Schedule conflict resolved.\n\n• Lunch moved to 12:00 PM\n• Interview prep block added 1:00-1:30 PM\n• Netflix interview optimized at 2:00 PM',
      apply: '✅ Neural suggestion applied!\n\n• Sam meeting rescheduled to 4:00 PM\n• Netflix interview maintained at 2:00 PM\n• Optimal timing preserved',
      set: '🎯 Auto-block activated!\n\n• 60-minute prep blocks created before all interviews\n• AI study materials will be ready\n• Calendar intelligence enabled',
      reschedule: '📅 Mock interview rescheduled!\n\n• New time: Thursday 2:00 PM\n• AI interviewer: Sarah (Meta specialist)\n• Prep materials updated\n• Calendar notification sent',
      practice: '⚡ Practice session started!\n\n• Question: "Tell me about a time you solved a difficult problem"\n• Recording enabled for feedback\n• AI will analyze your response\n• Expected duration: 5-7 minutes'
    };
    
    alert(messages[buttonType] || messages.autofix);
  };

  const sendMessage = async () => {
    if (!searchQuery.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: searchQuery,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setConversationHistory(prev => [...prev, { role: 'user', content: searchQuery }]);
    setIsLoading(true);
    setShowConversation(true);

    const messageToSend = searchQuery;
    setSearchQuery('');

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageToSend,
          personality,
          conversationHistory
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          sender: 'ai',
          timestamp: new Date(),
          type: data.type || 'text'
        };

        setMessages(prev => [...prev, aiMessage]);
        setConversationHistory(prev => [...prev, { role: 'assistant', content: data.response }]);

        // Generate TTS if available
        if (apiStatus === 'production') {
          generateTTS(data.response);
        }
      } else {
        throw new Error('Failed to get AI response');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now. Please try again in a moment.",
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateTTS = async (text: string) => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/ai/tts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text.substring(0, 200) }), // Limit for demo
      });

      const data = await response.json();
      if (data.audio) {
        const audio = new Audio(data.audio);
        audio.play().catch(console.error);
      }
    } catch (error) {
      console.error('TTS error:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Gmail Integration Functions
  const connectGmail = async () => {
    try {
      setIsConnectingGmail(true);
      console.log('Connecting to Gmail...');
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/gmail/auth`);
      const data = await response.json();
      
      console.log('Gmail auth response:', data);
      
      // Check if this is mock mode
      if (data.authUrl && data.authUrl.includes('gmail-mock-auth')) {
        console.log('🧪 Using mock Gmail authentication');
        
        // Option 1: Direct mock connection (bypasses popup)
        console.log('🚀 Connecting directly with mock data...');
        setTimeout(() => {
          localStorage.setItem('gmail_mock_connected', 'true');
          setGmailConnected(true);
          setIsConnectingGmail(false);
          alert('🎉 Gmail connected successfully! (Demo mode with mock data)\n\nJARVUS is now analyzing your career emails with AI.');
          loadMockEmailInsights();
        }, 1500);
        return;
        
        // Option 2: Popup method (fallback)
        /*
        // Simulate the OAuth popup for demo purposes
        const popup = window.open(`${apiUrl}/api/gmail/callback`, 'gmail-auth', 'width=500,height=600,scrollbars=yes,resizable=yes');
        
        if (!popup) {
          // Fallback: simulate connection without popup
          console.log('Popup blocked, simulating connection directly');
          setTimeout(() => {
            setGmailConnected(true);
            setIsConnectingGmail(false);
            alert('🎉 Gmail connected successfully! (Demo mode with mock data)\n\nJARVUS is now analyzing your career emails with AI.');
            loadMockEmailInsights();
          }, 1500);
          return;
        }
        
        // Listen for postMessage from callback
        const messageListener = (event: MessageEvent) => {
          // Only accept messages from our domain
          if (event.origin !== window.location.origin) return;
          
          if (event.data.type === 'GMAIL_AUTH_SUCCESS') {
            console.log('Mock Gmail auth successful!', event.data);
            window.removeEventListener('message', messageListener);
            popup?.close();
            
            // Store mock connection state
            localStorage.setItem('gmail_mock_connected', 'true');
            setGmailConnected(true);
            setIsConnectingGmail(false);
            
            // Show success message
            alert('🎉 Gmail connected successfully! (Demo mode with mock data)\n\nJARVUS is now analyzing your career emails with AI.');
            
            // Load mock email insights
            loadMockEmailInsights();
          } else if (event.data.type === 'GMAIL_AUTH_ERROR') {
            console.error('Mock Gmail auth error:', event.data.error);
            window.removeEventListener('message', messageListener);
            popup?.close();
            setIsConnectingGmail(false);
            alert('Gmail authentication failed: ' + event.data.error);
          }
        };
        
        window.addEventListener('message', messageListener);
        
        // Cleanup if window is closed manually
        const checkClosed = setInterval(() => {
          if (popup.closed) {
            clearInterval(checkClosed);
            window.removeEventListener('message', messageListener);
            setIsConnectingGmail(false);
          }
        }, 1000);
        */
      } else if (data.authUrl && data.authUrl.includes('client_id=') && !data.authUrl.includes('client_id=&')) {
        // Real OAuth flow (fallback)
        const popup = window.open(data.authUrl, 'gmail-auth', 'width=500,height=600,scrollbars=yes,resizable=yes');
        
        if (!popup) {
          alert('Please allow popups for Gmail authentication');
          setIsConnectingGmail(false);
          return;
        }
        
        // Listen for postMessage from callback
        const messageListener = (event: MessageEvent) => {
          if (event.origin !== window.location.origin) return;
          
          if (event.data.type === 'GMAIL_AUTH_SUCCESS') {
            console.log('Gmail auth successful!', event.data);
            window.removeEventListener('message', messageListener);
            popup?.close();
            
            localStorage.setItem('gmail_tokens', JSON.stringify(event.data.tokens));
            setGmailTokens(event.data.tokens);
            setGmailConnected(true);
            setIsConnectingGmail(false);
            
            alert('🎉 Gmail connected successfully! You can now analyze your career emails with AI.');
            
            if (event.data.tokens?.access_token) {
              loadEmailInsights(event.data.tokens.access_token);
            }
          } else if (event.data.type === 'GMAIL_AUTH_ERROR') {
            console.error('Gmail auth error:', event.data.error);
            window.removeEventListener('message', messageListener);
            popup?.close();
            setIsConnectingGmail(false);
            alert('Gmail authentication failed: ' + event.data.error);
          }
        };
        
        window.addEventListener('message', messageListener);
            
      } else {
        // Google credentials not configured
        alert(`🔧 Gmail Integration Setup Required

To connect Gmail, the administrator needs to:

1. Go to Google Cloud Console
2. Enable Gmail API  
3. Create OAuth 2.0 credentials
4. Add these to backend .env file:
   - GOOGLE_CLIENT_ID=your_client_id
   - GOOGLE_CLIENT_SECRET=your_client_secret

For now, you can use the AI Email Assistant without Gmail connection.`);
        setIsConnectingGmail(false);
      }
    } catch (error) {
      console.error('Gmail connection error:', error);
      alert('Unable to connect to Gmail. Please check if the backend server is running.');
      setIsConnectingGmail(false);
    }
  };

  const checkGmailConnection = () => {
    // Check if mock Gmail connection is stored
    const mockConnected = localStorage.getItem('gmail_mock_connected');
    if (mockConnected === 'true') {
      console.log('🧪 Restoring mock Gmail connection...');
      setGmailConnected(true);
      loadMockEmailInsights();
      return;
    }
    
    // Check if real Gmail tokens are stored
    const stored = localStorage.getItem('gmail_tokens');
    if (stored) {
      const tokens = JSON.parse(stored);
      setGmailTokens(tokens);
      setGmailConnected(true);
      loadEmailInsights(tokens.access_token);
    }
  };

  const loadEmailInsights = async (accessToken: string) => {
    try {
      setIsLoadingEmails(true);
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
      
      const response = await fetch(`${apiUrl}/api/gmail/insights`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accessToken })
      });

      const data = await response.json();
      if (data.success) {
        setEmailInsights(data.insights);
      }
    } catch (error) {
      console.error('Email insights error:', error);
    } finally {
      setIsLoadingEmails(false);
    }
  };

  const loadMockEmailInsights = async () => {
    try {
      setIsLoadingEmails(true);
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
      
      console.log('🧪 Loading mock email insights...');
      
      // Get mock email stats
      const statsResponse = await fetch(`${apiUrl}/api/gmail/stats`);
      const statsData = await statsResponse.json();
      
      if (statsData.mockMode) {
        console.log('📊 Mock email stats:', statsData);
        
        // Set mock email insights
        setEmailInsights({
          careerEmails: statsData.total || 6,
          unreadCareer: statsData.unread || 3,
          interviewInvites: statsData.categories?.interview || 2,
          networkingOpportunities: statsData.categories?.networking || 1,
          totalEmails: statsData.total || 6,
          priorityActions: [
            'Respond to Netflix interview invitation',
            'Follow up with Meta offer',
            'Schedule coffee chat with OpenAI contact'
          ]
        });
        
        console.log('✅ Mock email insights loaded successfully!');
      }
    } catch (error) {
      console.error('Mock email insights error:', error);
      // Set fallback data if API fails
      setEmailInsights({
        careerEmails: 6,
        unreadCareer: 3,
        interviewInvites: 2,
        networkingOpportunities: 1,
        totalEmails: 6,
        priorityActions: [
          'Demo mode: Mock email data loaded',
          'Netflix interview - respond ASAP',
          'Meta offer - review and decide'
        ]
      });
    } finally {
      setIsLoadingEmails(false);
    }
  };

  const analyzeEmails = async () => {
    // Check if we're in mock mode or have real tokens
    const isMockMode = localStorage.getItem('gmail_mock_connected') === 'true';
    if (!isMockMode && !gmailTokens?.access_token) return;
    
    try {
      setIsLoadingEmails(true);
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
      
      const response = await fetch(`${apiUrl}/api/gmail/analyze-emails`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(isMockMode ? { 
          category: 'all',
          limit: 10 
        } : { 
          accessToken: gmailTokens.access_token,
          maxResults: 20 
        })
      });

      const data = await response.json();
      if (data.success || data.mockMode) {
        // Create AI message with email insights
        const isMockMode = data.mockMode;
        const emailAnalysis = data.analysis || '';
        
        const emailSummary = isMockMode ? `📧 **Gmail Analysis Complete!** (Demo Mode)

Found **${data.emails.length}** career-relevant emails in your mock inbox:

${data.emails.slice(0, 5).map((email: any, index: number) => `
**${index + 1}. ${email.subject}**
From: ${email.from}
Category: ${email.category} | Priority: ${email.priority}/10
Date: ${new Date(email.date).toLocaleDateString()}
Snippet: ${email.snippet}
Status: ${email.isRead ? '✅ Read' : '📧 Unread'}
`).join('\n')}

${data.emails.length > 5 ? `\n...and ${data.emails.length - 5} more emails analyzed!` : ''}

🤖 **AI Analysis:**
${emailAnalysis || `
• **High Priority**: ${data.emails.filter((e: any) => e.priority >= 8).length} emails need immediate attention
• **Interview Related**: ${data.emails.filter((e: any) => e.category === 'interview').length} interview opportunities  
• **Job Offers**: ${data.emails.filter((e: any) => e.category === 'offer').length} offer letters
• **Networking**: ${data.emails.filter((e: any) => e.category === 'networking').length} networking opportunities

**Next Steps**: Respond to Netflix interview ASAP, review Meta offer details, and schedule coffee with OpenAI contact.`}

💡 **Mock Demo Features**:
• Real-time email sentiment analysis
• Career opportunity detection  
• Interview scheduling assistance
• Salary negotiation insights

Want me to help you craft responses to any of these emails?` : 

`📧 **Gmail Analysis Complete!**

Found **${data.emails.length}** career-relevant emails:

${data.emails.slice(0, 5).map((email: any, index: number) => `
**${index + 1}. ${email.subject}**
From: ${email.from}
Priority: ${email.aiAnalysis?.priority || 'Unknown'} | Category: ${email.aiAnalysis?.category || 'Unknown'}
Insight: ${email.aiAnalysis?.keyInsights || 'No analysis available'}
Action: ${email.aiAnalysis?.suggestedAction || 'No action needed'}
`).join('\n')}

${data.emails.length > 5 ? `\n...and ${data.emails.length - 5} more emails analyzed!` : ''}

💡 **Key Recommendations:**
${data.emails.filter((e: any) => e.aiAnalysis?.priority === 'high').length > 0 ? 
  `• You have ${data.emails.filter((e: any) => e.aiAnalysis?.priority === 'high').length} high-priority career emails!` : ''}
${data.emails.filter((e: any) => e.aiAnalysis?.actionRequired === 'yes').length > 0 ? 
  `• ${data.emails.filter((e: any) => e.aiAnalysis?.actionRequired === 'yes').length} emails need your immediate attention` : ''}
${data.emails.filter((e: any) => e.aiAnalysis?.category === 'interview').length > 0 ? 
  `• ${data.emails.filter((e: any) => e.aiAnalysis?.category === 'interview').length} interview-related emails found` : ''}

Want me to help you craft responses to any of these emails?`;

        const aiMessage = {
          id: Date.now().toString(),
          text: emailSummary,
          sender: 'ai' as const,
          timestamp: new Date(),
          type: 'email-analysis' as const
        };

        setMessages(prev => [...prev, aiMessage]);
        setShowConversation(true);
      }
    } catch (error) {
      console.error('Email analysis error:', error);
    } finally {
      setIsLoadingEmails(false);
    }
  };

  // Check Gmail connection on mount
  useEffect(() => {
    checkGmailConnection();
  }, []);

  const sidebarItems = [
    { icon: faEnvelope, label: 'Mail', view: 'mail' as const, active: activeView === 'mail' },
    { icon: faCalendarDays, label: 'Calendar', view: 'calendar' as const, active: activeView === 'calendar' },
    { icon: faBrain, label: 'Jarvus Brain', view: 'brain' as const, active: activeView === 'brain' },
    { icon: faFileText, label: 'Resume', view: 'resume' as const, active: activeView === 'resume' },
    { icon: faCog, label: 'Settings', view: 'settings' as const, active: activeView === 'settings' },
  ];

  const motivationalQuotes = [
    "O ka lama kukui - light the torch of knowledge.",
    "The future belongs to those who prepare for it today.",
    "Your career journey is a marathon, not a sprint.",
    "Every expert was once a beginner who refused to give up.",
    "Success is where preparation meets opportunity."
  ];

  const [todaysQuote] = useState(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const glowVariants = {
    animate: {
      boxShadow: [
        "0 0 20px rgba(6, 182, 212, 0.3)",
        "0 0 30px rgba(6, 182, 212, 0.5)",
        "0 0 20px rgba(6, 182, 212, 0.3)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Optimized animation variants - reduced GPU load
  const sidebarIconVariants = {
    idle: { 
      scale: 1,
      transition: { duration: 0.2 }
    },
    hover: { 
      scale: 1.1,
      transition: { duration: 0.2 }
    },
    active: {
      scale: 1.05,
      boxShadow: [
        "0 0 15px rgba(6, 182, 212, 0.4)",
        "0 0 25px rgba(6, 182, 212, 0.6)",
        "0 0 15px rgba(6, 182, 212, 0.4)",
      ],
      transition: { 
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const cardHoverVariants = {
    idle: { 
      scale: 1,
      y: 0
    },
    hover: { 
      scale: 1.01,
      y: -4,
      transition: { duration: 0.2 }
    }
  };

  const micVariants = {
    idle: { 
      scale: 1,
      color: "#06b6d4"
    },
    listening: {
      scale: [1, 1.1, 1],
      color: "#ef4444",
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white relative">
      {/* Simplified Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 20s linear infinite'
        }} />
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        /* Custom scrollbar for demo page only */
        body {
          overflow-x: hidden !important;
        }
        
        ::-webkit-scrollbar {
          width: 12px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(75, 85, 99, 0.3);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #8b5cf6, #6366f1);
          border-radius: 10px;
          border: 2px solid rgba(75, 85, 99, 0.3);
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #7c3aed, #4f46e5);
        }
        
        .glow-text {
          text-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }
        
        .simple-border {
          border: 1px solid rgba(6, 182, 212, 0.3);
          transition: border-color 0.2s ease;
        }
        
        .simple-border:hover {
          border-color: rgba(6, 182, 212, 0.5);
        }

        .sidebar-icon-glow {
          transition: all 0.3s ease;
          position: relative;
        }

        .sidebar-icon-glow:hover {
          filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.8));
          box-shadow: 
            0 0 20px rgba(6, 182, 212, 0.4),
            inset 0 0 20px rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.6);
        }

        .sidebar-icon-glow.active {
          box-shadow: 
            0 0 25px rgba(6, 182, 212, 0.6),
            inset 0 0 25px rgba(6, 182, 212, 0.2);
          border: 1px solid rgba(6, 182, 212, 0.8);
          background: rgba(6, 182, 212, 0.1);
        }

        .sidebar-icon-glow:hover::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          background: linear-gradient(45deg, transparent, rgba(6, 182, 212, 0.3), transparent);
          z-index: -1;
          animation: rotate-border 2s linear infinite;
        }

        @keyframes rotate-border {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }



        @keyframes subtle-pulse {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.01) translateY(-2px); }
        }
      `}</style>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <motion.div 
          className="w-20 bg-gray-900/80 border-r border-cyan-500/20 flex flex-col items-center py-8 space-y-8"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {sidebarItems.map((item, index) => (
            <motion.div
              key={item.label}
              className={`w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer sidebar-icon-glow ${
                item.active 
                  ? 'bg-cyan-500/20 text-cyan-400 active' 
                  : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10'
              }`}
              variants={sidebarIconVariants}
              initial="idle"
              animate={item.active ? "active" : "idle"}
              whileHover={{ 
                scale: 1.1,
                boxShadow: [
                  "0 0 20px rgba(6, 182, 212, 0.4)",
                  "0 0 30px rgba(6, 182, 212, 0.6)",
                  "0 0 20px rgba(6, 182, 212, 0.4)",
                ],
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => {
                console.log('Clicked sidebar item:', item.label, item.view);
                setActiveView(item.view);
              }}
              title={item.label}
            >
              <FontAwesomeIcon icon={item.icon} className="text-lg" />
            </motion.div>
          ))}
          
          {/* Logout Button */}
          <motion.div
            className="mt-auto w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer text-gray-400 hover:text-red-400 hover:bg-red-500/10 sidebar-icon-glow transition-all duration-300"
            whileHover={{ 
              scale: 1.15, 
              y: -2,
              boxShadow: [
                "0 0 20px rgba(239, 68, 68, 0.4)",
                "0 0 30px rgba(239, 68, 68, 0.6)",
                "0 0 20px rgba(239, 68, 68, 0.4)",
              ],
              color: "#ef4444",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              console.log('Logout clicked');
              handleLogout();
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="text-lg" />
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <motion.div 
            className="h-20 px-8 flex items-center justify-between border-b border-cyan-500/20"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.h1 
              className="text-4xl font-bold glow-text bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
            >
              JARVUS
            </motion.h1>

            {/* Search Bar */}
            <motion.div 
              className="relative w-96"
              variants={glowVariants}
              animate="animate"
            >
              <div className="relative rounded-full bg-gray-800/40 border border-cyan-400/30">
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400" 
                />
                <input
                  type="text"
                  placeholder="Ask JARVUS anything..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-12 pr-12 py-3 bg-transparent text-white placeholder-cyan-300/80 focus:outline-none rounded-full"
                  disabled={isLoading}
                />
                <motion.button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={sendMessage}
                  disabled={isLoading || !searchQuery.trim()}
                >
                  <FontAwesomeIcon 
                    icon={isLoading ? faRobot : faPaperPlane} 
                    className="text-cyan-400"
                  />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Dynamic Content Based on Active View */}
          <motion.div 
            className="flex-1 p-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* JARVUS Brain (AI Chat) - Default */}
            {activeView === 'brain' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Today's Schedule Card */}
                <motion.div
                  className="bg-gray-800/60 rounded-2xl p-6 hover:bg-gray-700/60 transition-colors cursor-pointer"
                  variants={cardHoverVariants}
                  initial="idle"
                  whileHover="hover"
                  animate="idle"
                  onClick={() => setShowConversation(true)}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                      <FontAwesomeIcon icon={faCalendarDays} className="text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-cyan-400">Today's Schedule</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <motion.div 
                      className="bg-gray-700/50 rounded-xl p-4 border border-cyan-500/20"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="text-lg font-semibold mb-2">Interview</div>
                      <div className="text-gray-300 mb-1">at <span className="text-cyan-400">Oceanic Ventures</span></div>
                      <div className="flex items-center text-gray-400">
                        <FontAwesomeIcon icon={faClock} className="mr-2" />
                        <span className="text-2xl font-bold text-cyan-400">9:00 AM</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Unread Emails Card */}
                <motion.div
                  className="bg-gray-800/60 rounded-2xl p-6 hover:bg-gray-700/60 transition-colors cursor-pointer"
                  variants={cardHoverVariants}
                  initial="idle"
                  whileHover="hover"
                  animate="idle"
                  onClick={() => setActiveView('mail')}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <FontAwesomeIcon icon={faEnvelope} className="text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-blue-400">Unread Emails</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-center mb-4">
                      <div className="text-4xl font-bold text-blue-400 mb-2">5</div>
                      <div className="text-gray-400">Unread</div>
                    </div>
                    
                    <motion.div 
                      className="bg-gray-700/50 rounded-xl p-4 border border-blue-500/20"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center">
                          <FontAwesomeIcon icon={faUser} className="text-white text-sm" />
                        </div>
                        <div>
                          <div className="font-semibold">Kai Lopez</div>
                          <div className="text-gray-400 text-sm">Project Update</div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Jarvus Thought of the Day Card */}
                <motion.div
                  className="bg-gray-800/60 rounded-2xl p-6 hover:bg-gray-700/60 transition-colors cursor-pointer"
                  variants={cardHoverVariants}
                  initial="idle"
                  whileHover="hover"
                  animate="idle"
                  onClick={() => setShowConversation(true)}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                      <FontAwesomeIcon icon={faLightbulb} className="text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-purple-400">Jarvus Thought</h3>
                  </div>
                  <div className="text-lg font-medium mb-4">of the Day</div>
                  
                  <motion.div 
                    className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 rounded-xl p-4 border border-purple-500/20"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-lg font-medium text-gray-200 leading-relaxed italic">
                      "{todaysQuote}"
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            )}

            {/* AI-Powered Mail Module */}
            {activeView === 'mail' && (
              <div className="space-y-6">
                {/* Gmail Connection Status */}
                <motion.div
                  className={`rounded-2xl p-6 border ${
                    gmailConnected 
                      ? 'bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/20' 
                      : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-blue-400 mb-2">
                        📧 {gmailConnected ? 'Gmail Connected!' : 'AI Email Assistant'}
                      </h2>
                      <p className="text-gray-300">
                        {gmailConnected 
                          ? 'JARVUS is now analyzing your career emails with AI' 
                          : 'Connect Gmail to get AI-powered email analysis and responses'}
                      </p>
                    </div>
                    {gmailConnected && (
                      <div className="space-y-2">
                        <button
                          onClick={() => {
                            console.log('Refreshing email view...');
                            loadMockEmailInsights();
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-200"
                        >
                          🔄 Refresh Emails
                        </button>
                      </div>
                    )}
                    {!gmailConnected && (
                      <div className="space-y-2">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('Gmail button clicked!');
                            connectGmail();
                          }}
                          disabled={isConnectingGmail}
                          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                            isConnectingGmail 
                              ? 'bg-gray-600 cursor-not-allowed' 
                              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 cursor-pointer'
                          }`}
                          style={{ 
                            pointerEvents: 'auto',
                            position: 'relative',
                            zIndex: 100
                          }}
                          type="button"
                        >
                          {isConnectingGmail ? (
                            <>
                              <span className="inline-block animate-spin mr-2">🔄</span>
                              Connecting...
                            </>
                          ) : (
                            <>🔗 Connect Gmail</>
                          )}
                        </button>
                        
                        {/* Backup button for testing */}
                        <button 
                          onClick={() => {
                            console.log('Backup button clicked!');
                            alert('✅ Click detection works! The main button should also work now.');
                            connectGmail();
                          }}
                          className="block px-4 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors"
                          style={{ position: 'relative', zIndex: 101 }}
                        >
                          🔧 Backup Connect
                        </button>
                      </div>
                    )}

                    {/* Debug: Simple test button */}
                    <button 
                      onClick={() => {
                        console.log('Test button clicked!');
                        alert('Button click works!');
                      }}
                      className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                      style={{ position: 'relative', zIndex: 9999 }}
                    >
                      🧪 Test Click
                    </button>
                  </div>

                  {/* Gmail Insights */}
                  {gmailConnected && emailInsights && (
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                      <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-cyan-400">{emailInsights.careerEmails}</div>
                        <div className="text-sm text-gray-400">Career Emails</div>
                      </div>
                      <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-400">{emailInsights.unreadCareer}</div>
                        <div className="text-sm text-gray-400">Unread</div>
                      </div>
                      <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-green-400">{emailInsights.interviewInvites}</div>
                        <div className="text-sm text-gray-400">Interviews</div>
                      </div>
                      <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-purple-400">{emailInsights.networkingOpportunities}</div>
                        <div className="text-sm text-gray-400">Networking</div>
                      </div>
                    </div>
                  )}

                  {/* Optimized Ultra-Futuristic Email Scanner */}
                  {gmailConnected && (
                    <motion.div
                      className="relative bg-slate-800/70 rounded-2xl p-5 border border-cyan-300/30 mb-6 overflow-hidden"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ 
                        scale: 1.01,
                        boxShadow: "0 0 60px rgba(6, 182, 212, 0.3)",
                        borderColor: "rgba(6, 182, 212, 0.5)"
                      }}
                      transition={{ delay: 0.3, type: "spring", damping: 20 }}
                    >
                      {/* Simplified Neural Grid */}
                      <div className="absolute inset-0 opacity-10">
            
                      </div>

                      {/* Optimized Header */}
                      <div className="relative z-10 flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <motion.div
                            className="relative w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                          >
                            <span className="text-white text-sm">🧠</span>
                          </motion.div>
                          <div>
                            <h3 className="text-cyan-300 font-bold text-sm tracking-wide">NEURAL EMAIL ANALYSIS</h3>
                            <div className="text-xs text-gray-400 font-mono">AI Memory: Active • Learning: 94.7%</div>
                          </div>
                        </div>
                        
                        {/* Simplified Voice Indicator */}
                        <div className="flex items-center space-x-2 bg-cyan-500/10 rounded-full px-3 py-1 border border-cyan-400/30">
                          <motion.div
                            className="w-2 h-2 bg-cyan-400 rounded-full"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <span className="text-cyan-300 text-xs font-mono">LISTENING</span>
                        </div>
                      </div>
                      
                      {/* Optimized Email Cards */}
                      <div className="relative space-y-3">
                        {/* Critical Priority */}
                        <motion.div
                          className="group relative bg-gradient-to-r from-red-900/20 to-transparent rounded-2xl p-4 border border-red-400/30 hover:border-red-300/50 transition-colors cursor-pointer"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          whileHover={{ x: 4, scale: 1.01 }}
                          transition={{ delay: 0.5 }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <motion.div 
                                className="w-4 h-4 rounded-full bg-red-400"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                              />
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-red-300 font-bold text-lg">🔥</span>
                                  <span className="text-red-200 font-bold tracking-wide">META OFFER</span>
                                </div>
                                <div className="text-xs text-gray-400 font-mono">Neural Priority: CRITICAL</div>
                                <div className="text-xs text-red-300">$215k + equity • 4 days remaining</div>
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-red-300 font-mono text-lg font-bold">10.0</div>
                              <div className="text-xs text-gray-500">URGENCY</div>
                            </div>
                          </div>
                        </motion.div>

                        {/* High Priority */}
                        <motion.div
                          className="group relative bg-gradient-to-r from-orange-900/20 to-transparent rounded-2xl p-4 border border-orange-400/30 hover:border-orange-300/50 transition-colors cursor-pointer"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          whileHover={{ x: 4, scale: 1.01 }}
                          transition={{ delay: 0.7 }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="w-4 h-4 rounded-full bg-orange-400"></div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-orange-300 font-bold text-lg">🎯</span>
                                  <span className="text-orange-200 font-bold tracking-wide">NETFLIX TECHNICAL</span>
                                </div>
                                <div className="text-xs text-gray-400 font-mono">AI Schedule Sync • Prep Ready</div>
                                <div className="text-xs text-orange-300">React + System Design • 90min</div>
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-orange-300 font-mono text-lg font-bold">9.2</div>
                              <div className="text-xs text-gray-500">PRIORITY</div>
                            </div>
                          </div>
                        </motion.div>

                        {/* Medium Priority */}
                        <motion.div
                          className="group relative bg-gradient-to-r from-blue-900/20 to-transparent rounded-2xl p-4 border border-blue-400/30 hover:border-blue-300/50 transition-colors cursor-pointer"
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          whileHover={{ x: 4, scale: 1.01 }}
                          transition={{ delay: 0.9 }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <motion.div 
                                className="w-4 h-4 rounded-full bg-blue-400"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                              />
                              <div>
                                <div className="flex items-center space-x-2">
                                  <span className="text-blue-300 font-bold text-lg">🤝</span>
                                  <span className="text-blue-200 font-bold tracking-wide">OPENAI NETWORK</span>
                                </div>
                                <div className="text-xs text-gray-400 font-mono">Neural Learning • Relationship Building</div>
                                <div className="text-xs text-blue-300">Coffee @ SOMA • AI Career</div>
                              </div>
                            </div>
                            <div className="text-center">
                              <div className="text-blue-300 font-mono text-lg font-bold">8.5</div>
                              <div className="text-xs text-gray-500">VALUE</div>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      {/* Simplified Neural Analysis */}
                      <motion.div
                        className="relative mt-6 bg-gradient-to-r from-purple-900/20 to-purple-900/20 rounded-2xl p-4 border border-purple-400/30"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.01 }}
                        transition={{ delay: 1.3 }}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <motion.div
                            className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                          >
                            <span className="text-white text-xs">🧠</span>
                          </motion.div>
                          <div>
                            <h4 className="text-purple-300 font-bold text-sm tracking-wide">NEURAL ANALYSIS</h4>
                            <div className="text-xs text-gray-400 font-mono">Pattern Recognition • Memory Integration</div>
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-300 leading-relaxed font-mono">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div className="space-y-1">
                              <div className="text-purple-300 font-bold">IMMEDIATE:</div>
                              <div>• Meta negotiation closing</div>
                              <div>• Netflix prep queued</div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-blue-300 font-bold">LEARNING:</div>
                              <div>• Prefers FAANG companies</div>
                              <div>• Response time: 24-48h</div>
                            </div>
                            <div className="space-y-1">
                              <div className="text-green-300 font-bold">MEMORY:</div>
                              <div>• Salary expectations: $200k+</div>
                              <div>• Interview style: Technical</div>
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Simplified Voice Interface */}
                      <motion.div
                        className="relative mt-4 bg-gradient-to-r from-cyan-900/20 to-cyan-900/20 rounded-2xl p-3 border border-cyan-400/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <motion.div
                            className="flex space-x-1"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            {[1, 2, 3, 4].map((i) => (
                              <motion.div
                                key={i}
                                className="w-1 bg-cyan-400 rounded-full"
                                animate={{ height: ["4px", "12px", "4px"] }}
                                transition={{ 
                                  duration: 2, 
                                  repeat: Infinity,
                                  delay: i * 0.2
                                }}
                              />
                            ))}
                          </motion.div>
                          <span className="text-cyan-300 text-xs font-mono tracking-wide">VOICE INTERFACE</span>
                        </div>
                        
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center space-x-3">
                            <span className="text-gray-400 font-mono">USER:</span>
                            <span className="text-white">"Hey JARVUS, any updates on my emails?"</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className="text-cyan-400 font-mono">JARVUS:</span>
                            <span className="text-cyan-200">
                              "3 critical items detected. Meta offer expires in 4 days. Netflix prep loaded."
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}

                  {/* AI Email Actions */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {gmailConnected ? (
                      <>
                        <motion.div
                          className="bg-gray-800/50 rounded-xl p-4 cursor-pointer"
                          whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)" }}
                          onClick={analyzeEmails}
                          disabled={isLoadingEmails}
                        >
                          <div className="text-blue-400 text-xl mb-2">
                            {isLoadingEmails ? '🔄' : '🔍'}
                          </div>
                          <h3 className="font-semibold mb-2">
                            {isLoadingEmails ? 'Analyzing...' : 'Analyze Emails'}
                          </h3>
                          <p className="text-sm text-gray-400">AI analysis of career-relevant emails</p>
                        </motion.div>
                        
                        <motion.div
                          className="bg-gray-800/50 rounded-xl p-4 cursor-pointer"
                          whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)" }}
                          onClick={() => {
                            setSearchQuery("Help me write a professional email response");
                            setActiveView('brain');
                            setShowConversation(true);
                          }}
                        >
                          <div className="text-green-400 text-xl mb-2">✍️</div>
                          <h3 className="font-semibold mb-2">Draft Response</h3>
                          <p className="text-sm text-gray-400">AI-crafted email responses</p>
                        </motion.div>
                        
                        <motion.div
                          className="bg-gray-800/50 rounded-xl p-4 cursor-pointer"
                          whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)" }}
                          onClick={() => {
                            setSearchQuery("Give me a summary of my recent career-related emails and suggest next steps");
                            setActiveView('brain');
                            setShowConversation(true);
                          }}
                        >
                          <div className="text-purple-400 text-xl mb-2">📊</div>
                          <h3 className="font-semibold mb-2">Email Insights</h3>
                          <p className="text-sm text-gray-400">Career progress tracking</p>
                        </motion.div>
                      </>
                    ) : (
                      <>
                        <motion.div
                          className="bg-gray-800/50 rounded-xl p-4 cursor-pointer opacity-60"
                        >
                          <div className="text-blue-400 text-xl mb-2">🔒</div>
                          <h3 className="font-semibold mb-2">Interview Follow-up</h3>
                          <p className="text-sm text-gray-400">Connect Gmail to unlock</p>
                        </motion.div>
                        
                        <motion.div
                          className="bg-gray-800/50 rounded-xl p-4 cursor-pointer opacity-60"
                        >
                          <div className="text-blue-400 text-xl mb-2">🔒</div>
                          <h3 className="font-semibold mb-2">Networking Emails</h3>
                          <p className="text-sm text-gray-400">Connect Gmail to unlock</p>
                        </motion.div>
                        
                        <motion.div
                          className="bg-gray-800/50 rounded-xl p-4 cursor-pointer opacity-60"
                        >
                          <div className="text-blue-400 text-xl mb-2">🔒</div>
                          <h3 className="font-semibold mb-2">Salary Negotiation</h3>
                          <p className="text-sm text-gray-400">Connect Gmail to unlock</p>
                        </motion.div>
                      </>
                    )}
                  </div>
                </motion.div>

                {/* Revolutionary Features Preview */}
                <motion.div
                  className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-2xl font-bold text-purple-400 mb-4">🚀 Revolutionary Email AI</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <span className="text-sm">Real-time email sentiment analysis</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm">Automatic priority scoring (1-10)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-sm">Career relevance detection</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span className="text-sm">Context-aware response generation</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <span className="text-sm">Interview invite detection</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span className="text-sm">Networking opportunity alerts</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Neural Calendar Interface */}
            {activeView === 'calendar' && (
              <div className="space-y-4">
                {/* Calendar Neural Hub */}
                <motion.div
                  className="relative bg-slate-800/70 rounded-2xl p-5 border border-purple-300/30 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ 
                    scale: 1.01,
                    borderColor: "rgba(168, 85, 247, 0.6)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Neural Calendar Grid Background */}
                  <div className="absolute inset-0 opacity-20">
                    
                  </div>

                  {/* Holographic Calendar Header */}
                  <div className="relative z-10 flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className="relative w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-red-400 flex items-center justify-center"
                        animate={{ 
                          rotate: [0, 360]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      >
                        <span className="text-white text-sm">📅</span>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/30 to-red-400/30 blur-sm"></div>
                      </motion.div>
                      <div>
                        <h3 className="text-purple-300 font-bold text-sm tracking-wide">FUTURE-FOCUSED CALENDAR</h3>
                        <div className="text-xs text-gray-400 font-mono">Upcoming Events • Career Planning • Smart Scheduling</div>
                      </div>
                    </div>
                    
                    {/* Conflict Alert System */}
                    <motion.div 
                      className="flex items-center space-x-2 bg-red-500/10 rounded-full px-3 py-1 border border-red-400/30"
                    >
                      <motion.div
                        className="w-2 h-2 bg-red-400 rounded-full"
                        animate={{ 
                          scale: [1, 1.3, 1],
                          opacity: [0.7, 1, 0.7] 
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                      <span className="text-red-300 text-xs font-mono">3 UPCOMING</span>
                    </motion.div>
                  </div>

                  {/* Critical Schedule Alert */}
                  <motion.div
                    className="relative bg-gradient-to-r from-red-900/30 via-red-800/20 to-transparent rounded-2xl p-4 border border-red-400/30 mb-4 overflow-hidden"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ 
                      scale: 1.01
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Neural Alert Pattern */}
    
                    
                    <div className="relative flex items-center space-x-4">
                                              <motion.div
                          className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center"
                          animate={{ 
                            rotate: [0, 360]
                          }}
                          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                      >
                        <span className="text-white text-lg">⚠️</span>
                      </motion.div>
                      <div className="flex-1">
                        <div className="text-red-200 font-bold text-sm tracking-wide">UPCOMING SCHEDULE CONFLICT</div>
                        <div className="text-xs text-gray-300 font-mono">Today 2:00 PM • Netflix Interview overlaps with lunch break</div>
                        <div className="text-xs text-red-300 mt-1">AI Suggestion: Block 1:00-1:30 PM for interview prep • Move lunch to 12:00 PM</div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAutoFix}
                        className="px-4 py-2 bg-red-500/20 text-red-300 rounded-xl border border-red-400/30 hover:bg-red-500/30 font-mono text-xs cursor-pointer"
                      >
                        AUTO-FIX
                      </motion.button>
                    </div>
                  </motion.div>

                  {/* Future-Focused Calendar Grid */}
                  <div className="relative mb-4">
                    <div className="text-xs text-purple-300 font-mono mb-2 tracking-wide">UPCOMING EVENTS • NEXT 7 DAYS</div>
                    <div className="grid grid-cols-1 gap-3">
                      {/* Next 7 Days with Events */}
                      {[
                        { day: 'Today', date: 'Dec 18', events: [{ time: '2:00 PM', title: 'Netflix Technical Interview', type: 'critical', color: 'red' }] },
                        { day: 'Tomorrow', date: 'Dec 19', events: [{ time: '10:00 AM', title: 'Coffee Chat with Meta Engineer', type: 'networking', color: 'orange' }] },
                        { day: 'Thu', date: 'Dec 20', events: [{ time: '3:00 PM', title: 'Resume Review Session', type: 'improvement', color: 'blue' }] },
                        { day: 'Fri', date: 'Dec 21', events: [{ time: '1:00 PM', title: 'Google Phone Screen Follow-up', type: 'critical', color: 'red' }] },
                        { day: 'Mon', date: 'Dec 24', events: [{ time: '9:00 AM', title: 'LinkedIn Learning: System Design', type: 'skill', color: 'green' }] },
                        { day: 'Tue', date: 'Dec 25', events: [{ time: 'All Day', title: 'Holiday Break - No Interviews', type: 'break', color: 'gray' }] },
                        { day: 'Wed', date: 'Dec 26', events: [{ time: '11:00 AM', title: 'Apple On-site Interview Prep', type: 'critical', color: 'red' }] },
                      ].map((dayData, index) => (
                        <motion.div 
                          key={dayData.day} 
                          className="relative"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <motion.div 
                            className={`relative rounded-xl p-4 border cursor-pointer overflow-hidden ${
                              dayData.events[0]?.type === 'critical' ? 'bg-gradient-to-r from-red-900/30 to-red-700/20 border-red-400/40' : 
                              dayData.events[0]?.type === 'networking' ? 'bg-gradient-to-r from-orange-900/30 to-orange-700/20 border-orange-400/40' :
                              dayData.events[0]?.type === 'improvement' ? 'bg-gradient-to-r from-blue-900/30 to-blue-700/20 border-blue-400/40' :
                              dayData.events[0]?.type === 'skill' ? 'bg-gradient-to-r from-green-900/30 to-green-700/20 border-green-400/40' :
                              'bg-gray-800/30 border-gray-600/30'
                            }`}
                            whileHover={{ 
                              scale: 1.01
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="text-center">
                                  <div className="text-sm font-mono text-gray-300">{dayData.day}</div>
                                  <div className="text-xs text-gray-400">{dayData.date}</div>
                                </div>
                                <div className="flex-1">
                                  {dayData.events.map((event, eventIndex) => (
                                    <div key={eventIndex} className="flex items-center space-x-3">
                                      <motion.div
                                        className={`w-3 h-3 rounded-full ${
                                          event.color === 'red' ? 'bg-red-400' :
                                          event.color === 'orange' ? 'bg-orange-400' :
                                          event.color === 'blue' ? 'bg-blue-400' :
                                          event.color === 'green' ? 'bg-green-400' :
                                          'bg-gray-400'
                                        }`}
                                        animate={{ 
                                          scale: event.type === 'critical' ? [1, 1.2, 1] : [1, 1.05, 1],
                                          opacity: [0.8, 1, 0.8] 
                                        }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                      />
                                      <div>
                                        <div className="text-sm font-medium text-white">{event.title}</div>
                                        <div className="text-xs text-gray-400 font-mono">{event.time}</div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              {dayData.events[0]?.type === 'critical' && (
                                <motion.div
                                  className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-mono border border-red-400/30"
                                  animate={{ 
                                    opacity: [0.8, 1, 0.8]
                                  }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  HIGH PRIORITY
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Deadlines & Opportunities */}
                  <motion.div
                    className="relative bg-gradient-to-r from-green-900/20 via-emerald-900/10 to-green-900/20 rounded-2xl p-4 border border-green-400/30 mb-4 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ 
                      scale: 1.01
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <motion.div
                          className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center"
                        >
                          <span className="text-white text-xs">🎯</span>
                        </motion.div>
                        <div>
                          <h4 className="text-green-300 font-bold text-sm tracking-wide">FUTURE OPPORTUNITIES</h4>
                          <div className="text-xs text-gray-400 font-mono">Deadlines • Applications • Career Milestones</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-xs">
                      <motion.div 
                        className="flex items-center justify-between p-3 bg-green-500/10 rounded-xl border border-green-400/20"
                        whileHover={{ backgroundColor: "rgba(34, 197, 94, 0.15)" }}
                      >
                        <div className="flex items-center space-x-3">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-yellow-400"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <span className="text-green-200">Apple Summer Internship - Application due Jan 15</span>
                        </div>
                        <span className="text-xs text-gray-400 font-mono">28 days left</span>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center justify-between p-3 bg-blue-500/10 rounded-xl border border-blue-400/20"
                        whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.15)" }}
                      >
                        <div className="flex items-center space-x-3">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-blue-400"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          <span className="text-blue-200">Google STEP Program - Early deadline Dec 31</span>
                        </div>
                        <span className="text-xs text-gray-400 font-mono">13 days left</span>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center justify-between p-3 bg-purple-500/10 rounded-xl border border-purple-400/20"
                        whileHover={{ backgroundColor: "rgba(168, 85, 247, 0.15)" }}
                      >
                        <div className="flex items-center space-x-3">
                          <motion.div
                            className="w-2 h-2 rounded-full bg-purple-400"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          />
                          <span className="text-purple-200">Career Fair Registration opens - Jan 5</span>
                        </div>
                        <span className="text-xs text-gray-400 font-mono">18 days left</span>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Neural Scheduling Intelligence */}
                  <motion.div
                    className="relative bg-gradient-to-r from-cyan-900/30 via-blue-900/20 to-cyan-900/30 rounded-2xl p-4 border border-cyan-400/30 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ 
                      scale: 1.01
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Neural Analysis Background */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(6,182,212,0.1)_25%,transparent_25%,transparent_75%,rgba(6,182,212,0.1)_75%)] bg-[length:20px_20px]"></div>
                    </div>
                    
                    <div className="relative flex items-center space-x-3 mb-3">
                      <motion.div
                        className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center"
                      >
                        <span className="text-white text-xs">🤖</span>
                      </motion.div>
                      <div>
                        <h4 className="text-cyan-300 font-bold text-sm tracking-wide">NEURAL SCHEDULING AI</h4>
                        <div className="text-xs text-gray-400 font-mono">Real-time Optimization • Pattern Learning • Conflict Resolution</div>
                      </div>
                    </div>
                    
                    <div className="relative space-y-3 text-xs font-mono">
                      <motion.div 
                        className="flex items-center justify-between p-3 bg-cyan-500/10 rounded-xl border border-cyan-400/20"
                        whileHover={{ backgroundColor: "rgba(6, 182, 212, 0.15)" }}
                      >
                        <div className="flex items-center space-x-3">
                          <motion.div
                            className="w-3 h-3 rounded-full bg-cyan-400"
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                          <span className="text-cyan-200">Neural suggestion: Move Sam → 4PM • Keep Netflix → 2PM optimal</span>
                        </div>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAutoFix('apply')}
                          className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/30 cursor-pointer"
                        >
                          APPLY
                        </motion.button>
                      </motion.div>
                      
                      <motion.div 
                        className="flex items-center justify-between p-3 bg-purple-500/10 rounded-xl border border-purple-400/20"
                        whileHover={{ backgroundColor: "rgba(168, 85, 247, 0.15)" }}
                      >
                        <div className="flex items-center space-x-3">
                          <motion.div
                            className="w-3 h-3 rounded-full bg-purple-400"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          />
                          <span className="text-purple-200">Auto-block 60min prep before interviews • AI materials ready</span>
                        </div>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAutoFix('set')}
                          className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg border border-purple-500/30 hover:bg-purple-500/30 cursor-pointer"
                        >
                          SET
                        </motion.button>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Calendar Voice Interface */}
                  <motion.div
                    className="relative mt-4 bg-gradient-to-r from-purple-900/30 via-slate-900/20 to-purple-900/30 rounded-2xl p-3 border border-purple-400/30 overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ 
                      boxShadow: "0 0 30px rgba(168, 85, 247, 0.3), inset 0 0 15px rgba(168, 85, 247, 0.1)"
                    }}
                    transition={{ delay: 0.7 }}
                  >
                    {/* Voice Waveform */}
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(168,85,247,0.1)_50%,transparent_100%)] bg-[length:80px_100%] animate-pulse"></div>
                    </div>
                    
                    <div className="relative">
                      <div className="flex items-center space-x-3 mb-2">
                        <motion.div
                          className="flex space-x-1"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {[1, 2, 3, 4, 5].map((i) => (
                            <motion.div
                              key={i}
                              className="w-1 bg-purple-400 rounded-full"
                              animate={{ 
                                height: ["3px", "10px", "6px", "14px", "8px", "3px"]
                              }}
                              transition={{ 
                                duration: 1.8, 
                                repeat: Infinity,
                                delay: i * 0.15
                              }}
                            />
                          ))}
                        </motion.div>
                        <span className="text-purple-300 text-xs font-mono tracking-wide">CALENDAR NEURAL INTERFACE</span>
                      </div>
                      
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-400 font-mono">USER:</span>
                          <span className="text-white">"JARVUS, optimize my calendar for this week"</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-purple-400 font-mono">JARVUS:</span>
                          <span className="text-purple-200">
                            "5 conflicts resolved. Interview prep auto-scheduled. 
                            Networking slots optimized for maximum career impact. Calendar intelligence: 94.7% efficient."
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            )}

            {/* Resume AI */}
            {activeView === 'resume' && (
              <div className="space-y-4">
                {/* Resume Header - Minimal */}
                <motion.div
                  className="bg-slate-800/70 rounded-3xl p-4 border border-green-400/20"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ 
                    boxShadow: "0 0 30px rgba(34, 197, 94, 0.3)",
                    borderColor: "rgba(34, 197, 94, 0.4)"
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400 text-lg">📄</span>
                      <span className="text-green-300 font-medium text-sm">Resume AI</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-green-300 font-mono text-xs">94%</span>
                    </div>
                  </div>

                  {/* Enhancement Preview */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {/* Before/After - Compact */}
                    <div className="space-y-2">
                      <motion.div
                        className="bg-gray-800/30 rounded-2xl p-3 border border-gray-600/20"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-green-400 text-sm">✨</span>
                          <span className="text-green-300 font-medium text-xs">Live Enhancement</span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="bg-gray-700/30 rounded-xl p-2">
                            <div className="text-xs text-gray-500 mb-1">Before:</div>
                            <div className="text-xs text-gray-400 line-through">Worked on frontend</div>
                          </div>
                          
                          <motion.div
                            className="bg-green-500/10 rounded-xl p-2 border border-green-500/20"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                          >
                            <div className="text-xs text-green-400 mb-1">AI Enhanced:</div>
                            <div className="text-xs text-gray-300">Built React components for 50k+ users, boosted performance 40%</div>
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Metrics - Compact */}
                      <motion.div
                        className="bg-gray-800/30 rounded-2xl p-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-green-400 text-sm">🎯</span>
                          <span className="text-green-300 font-medium text-xs">Impact Score</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="text-center">
                            <div className="text-sm font-bold text-green-400">12</div>
                            <div className="text-xs text-gray-500">Verbs</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-bold text-yellow-400">8</div>
                            <div className="text-xs text-gray-500">Metrics</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-bold text-blue-400">6</div>
                            <div className="text-xs text-gray-500">Tech</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-bold text-purple-400">4</div>
                            <div className="text-xs text-gray-500">Buzz</div>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* AI Suggestions */}
                    <div className="space-y-4">
                      <motion.div
                        className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-4 border border-blue-500/30"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h3 className="text-blue-400 font-semibold mb-3">🚀 Suggested Improvements</h3>
                        <div className="space-y-3">
                          <div className="bg-gray-800/50 rounded-lg p-3">
                            <div className="text-sm text-blue-400 mb-1">Skills Gap Analysis</div>
                            <div className="text-xs text-gray-300">Add "TypeScript" and "GraphQL" to match 89% of React jobs</div>
                          </div>
                          <div className="bg-gray-800/50 rounded-lg p-3">
                            <div className="text-sm text-purple-400 mb-1">Achievement Boost</div>
                            <div className="text-xs text-gray-300">Quantify your team collaboration: "Led 3-person team..."</div>
                          </div>
                          <div className="bg-gray-800/50 rounded-lg p-3">
                            <div className="text-sm text-green-400 mb-1">Format Optimization</div>
                            <div className="text-xs text-gray-300">Reduce to 1 page for roles with {'<'}5 years experience</div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Live Preview */}
                      <motion.div
                        className="bg-gray-800/30 rounded-xl p-4 border border-gray-600/30"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        <h3 className="text-gray-400 font-semibold mb-3">📱 Live Preview</h3>
                        <div className="bg-white/10 rounded-lg p-3 text-xs">
                          <div className="text-center mb-2">
                            <div className="font-bold text-white">KAINOA AQUI</div>
                            <div className="text-gray-300">Full Stack Developer</div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-green-400">• Built responsive React components serving 50k+ users</div>
                            <div className="text-green-400">• Optimized API performance reducing load times by 40%</div>
                            <div className="text-green-400">• Led 3-person development team on JARVUS AI platform</div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Voice Command Demo */}
                  <motion.div
                    className="bg-gray-800/50 rounded-lg p-3 mt-4 border border-gray-600/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-gray-400 text-sm font-mono">You:</div>
                      <div className="text-gray-300 text-sm">"Jarvus, optimize my work experience section"</div>
                    </div>
                    <div className="flex items-center space-x-3 mt-2">
                      <div className="text-green-400 text-sm font-mono">JARVUS:</div>
                      <div className="text-green-300 text-sm">"I've enhanced your bullet points with impact metrics and action verbs. Your ATS score increased from 73% to 94%!"</div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            )}

            {/* Career AI */}
            {activeView === 'brain' && (
              <div className="space-y-4">
                {/* Career Header - Minimal */}
                <motion.div
                  className="bg-slate-800/70 rounded-3xl p-4 border border-cyan-400/20"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ 
                    boxShadow: "0 0 30px rgba(6, 182, 212, 0.3)",
                    borderColor: "rgba(6, 182, 212, 0.4)"
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-cyan-400 text-lg">🧠</span>
                      <span className="text-cyan-300 font-medium text-sm">Career AI</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <span className="text-cyan-300 font-mono text-xs">ONLINE</span>
                    </div>
                  </div>

                  {/* Career Insights - Compact Grid */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <motion.div
                      className="bg-green-500/10 border border-green-500/20 rounded-2xl p-3 text-center hover:bg-green-500/20 transition-all cursor-pointer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="text-lg font-bold text-green-400">Meta</div>
                      <div className="text-xs text-gray-500">Top Match</div>
                      <div className="text-xs text-green-300">94%</div>
                    </motion.div>
                    <motion.div
                      className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-3 text-center hover:bg-orange-500/20 transition-all cursor-pointer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="text-lg font-bold text-orange-400">5</div>
                      <div className="text-xs text-gray-500">Days Left</div>
                      <div className="text-xs text-orange-300">Deadline</div>
                    </motion.div>
                    <motion.div
                      className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-3 text-center hover:bg-blue-500/20 transition-all cursor-pointer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="text-lg font-bold text-blue-400">87%</div>
                      <div className="text-xs text-gray-500">Progress</div>
                      <div className="text-xs text-blue-300">Q4</div>
                    </motion.div>
                  </div>

                  {/* AI Chat Interface */}
                  <motion.div
                    className="bg-gray-800/30 rounded-xl p-4 border border-gray-600/30 mb-4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      <div className="flex space-x-3">
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                          <div className="text-cyan-400 text-sm">🤖</div>
                        </div>
                        <div className="flex-1">
                          <div className="bg-cyan-500/10 rounded-lg p-3 border border-cyan-500/30">
                            <div className="text-sm text-cyan-300">
                              Based on your recent interviews, I've identified that Meta emphasizes behavioral questions. 
                              I've prepared a personalized study guide focusing on leadership and problem-solving scenarios.
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
                          <div className="text-gray-300 text-sm">👤</div>
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-700/50 rounded-lg p-3">
                            <div className="text-sm text-gray-300">
                              What's the salary range for Software Engineer L4 at Meta?
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                          <div className="text-cyan-400 text-sm">🤖</div>
                        </div>
                        <div className="flex-1">
                          <div className="bg-cyan-500/10 rounded-lg p-3 border border-cyan-500/30">
                            <div className="text-sm text-cyan-300">
                              For L4 Software Engineer at Meta in SF Bay Area:
                              • Base: $155k - $175k
                              • Total Comp: $280k - $350k
                              • Your offer of $165k base + $120k RSU is within range!
                              
                              💡 Negotiation tip: You could ask for a higher signing bonus given your React expertise.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    <motion.button
                      className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center hover:bg-purple-500/20 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-purple-400 mb-1">📚</div>
                      <div className="text-xs text-gray-300">Interview Prep</div>
                    </motion.button>
                    
                    <motion.button
                      className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center hover:bg-green-500/20 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-green-400 mb-1">💰</div>
                      <div className="text-xs text-gray-300">Salary Analysis</div>
                    </motion.button>
                    
                    <motion.button
                      className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center hover:bg-blue-500/20 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-blue-400 mb-1">🎯</div>
                      <div className="text-xs text-gray-300">Career Path</div>
                    </motion.button>
                    
                    <motion.button
                      className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 text-center hover:bg-orange-500/20 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="text-orange-400 mb-1">🤝</div>
                      <div className="text-xs text-gray-300">Network</div>
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            )}

            {/* Settings & Configuration Module */}
            {activeView === 'settings' && (
              <div className="space-y-6">
                {/* Settings Header */}
                <motion.div
                  className="bg-gradient-to-r from-gray-500/10 to-slate-500/10 rounded-2xl p-6 border border-gray-500/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-400 mb-2">
                        ⚙️ JARVUS Settings & Preferences
                      </h2>
                      <p className="text-gray-300">Customize your AI career assistant experience</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">✓</div>
                      <div className="text-sm text-gray-400">All Systems Operational</div>
                    </div>
                  </div>

                  {/* Settings Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Voice & Audio Settings */}
                    <motion.div
                      className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl p-4 border border-purple-500/30"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-purple-400 font-semibold mb-4 flex items-center">
                        🎤 Voice & Audio Settings
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-gray-300">Voice Assistant</div>
                            <div className="text-xs text-gray-400">ElevenLabs AI Voice (Coming Soon)</div>
                          </div>
                          <div className="w-10 h-6 bg-purple-500 rounded-full flex items-center justify-end px-1">
                            <div className="w-4 h-4 bg-white rounded-full"></div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-gray-300">Voice Speed</div>
                            <div className="text-xs text-gray-400">Natural (1.0x)</div>
                          </div>
                          <div className="w-20 bg-gray-700 rounded-full h-2">
                            <div className="w-12 bg-purple-500 h-2 rounded-full"></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-gray-300">Audio Notifications</div>
                            <div className="text-xs text-gray-400">Email alerts & interview reminders</div>
                          </div>
                          <div className="w-10 h-6 bg-purple-500 rounded-full flex items-center justify-end px-1">
                            <div className="w-4 h-4 bg-white rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* AI Intelligence Settings */}
                    <motion.div
                      className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl p-4 border border-cyan-500/30"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="text-cyan-400 font-semibold mb-4 flex items-center">
                        🧠 AI Intelligence
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-gray-300">AI Personality</div>
                            <div className="text-xs text-gray-400">Current: {personality}</div>
                          </div>
                          <select
                            value={personality}
                            onChange={(e) => setPersonality(e.target.value as any)}
                            className="bg-gray-700 text-gray-300 rounded px-2 py-1 text-xs"
                          >
                            <option value="balanced">Balanced</option>
                            <option value="professional">Professional</option>
                            <option value="friendly">Friendly</option>
                            <option value="creative">Creative</option>
                          </select>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-gray-300">Analysis Depth</div>
                            <div className="text-xs text-gray-400">Deep career insights</div>
                          </div>
                          <select className="bg-gray-700 text-gray-300 rounded px-2 py-1 text-xs">
                            <option>Deep Analysis</option>
                            <option>Standard</option>
                            <option>Quick Overview</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-gray-300">Learning Mode</div>
                            <div className="text-xs text-gray-400">Adapt to your preferences</div>
                          </div>
                          <div className="w-10 h-6 bg-cyan-500 rounded-full flex items-center justify-end px-1">
                            <div className="w-4 h-4 bg-white rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Privacy & Data */}
                    <motion.div
                      className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-4 border border-green-500/30"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h3 className="text-green-400 font-semibold mb-4 flex items-center">
                        🔒 Privacy & Data
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-gray-300">Email Data Encryption</div>
                            <div className="text-xs text-gray-400">End-to-end encrypted</div>
                          </div>
                          <div className="text-green-400 text-lg">🔐</div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-gray-300">Data Retention</div>
                            <div className="text-xs text-gray-400">30 days (customizable)</div>
                          </div>
                          <button className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">
                            Configure
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-gray-300">Analytics Sharing</div>
                            <div className="text-xs text-gray-400">Anonymous usage data</div>
                          </div>
                          <div className="w-10 h-6 bg-gray-600 rounded-full flex items-center px-1">
                            <div className="w-4 h-4 bg-white rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Interview Prep Demo */}
                    <motion.div
                      className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl p-4 border border-orange-500/30"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <h3 className="text-orange-400 font-semibold mb-4 flex items-center">
                        💼 Interview Prep Center
                      </h3>
                      <div className="space-y-3">
                        <div className="bg-gray-800/50 rounded-lg p-3">
                          <div className="text-sm text-orange-400 mb-1">📚 Active Study Plan</div>
                          <div className="text-xs text-gray-300">Meta Behavioral Questions (5/12 completed)</div>
                          <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                            <div className="w-5/12 bg-orange-500 h-1 rounded-full"></div>
                          </div>
                        </div>
                        
                        <div className="bg-gray-800/50 rounded-lg p-3">
                          <div className="text-sm text-red-400 mb-1">🎯 Mock Interview</div>
                          <div className="text-xs text-gray-300">Next: Tuesday 3:00 PM with AI interviewer</div>
                          <motion.button 
                            className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded mt-1 cursor-pointer hover:bg-red-500/30 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAutoFix('reschedule')}
                          >
                            Reschedule
                          </motion.button>
                        </div>

                        <div className="bg-gray-800/50 rounded-lg p-3">
                          <div className="text-sm text-yellow-400 mb-1">⚡ Quick Practice</div>
                          <div className="text-xs text-gray-300">"Tell me about a time you solved a difficult problem"</div>
                          <motion.button 
                            className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded mt-1 cursor-pointer hover:bg-yellow-500/30 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleAutoFix('practice')}
                          >
                            Practice Now
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* API Status Enhanced */}
                  <motion.div
                    className="bg-gray-800/30 rounded-xl p-4 border border-gray-600/30 mt-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <h3 className="text-gray-400 font-semibold mb-3">📊 System Status</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-green-400 text-lg mb-1">🟢</div>
                        <div className="text-xs text-gray-300">Gmail Sync</div>
                        <div className="text-xs text-green-400">Active (Mock)</div>
                      </div>
                      <div className="text-center">
                        <div className="text-yellow-400 text-lg mb-1">🟡</div>
                        <div className="text-xs text-gray-300">Calendar API</div>
                        <div className="text-xs text-yellow-400">Limited</div>
                      </div>
                      <div className="text-center">
                        <div className={`${apiStatus === 'production' ? 'text-green-400' : 'text-yellow-400'} text-lg mb-1`}>
                          {apiStatus === 'production' ? '🟢' : '🟡'}
                        </div>
                        <div className="text-xs text-gray-300">AI Engine</div>
                        <div className={`text-xs ${apiStatus === 'production' ? 'text-green-400' : 'text-yellow-400'}`}>
                          {apiStatus === 'production' ? 'Optimal' : 'Preview'}
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-red-400 text-lg mb-1">🔴</div>
                        <div className="text-xs text-gray-300">Voice API</div>
                        <div className="text-xs text-red-400">Coming Soon</div>
                      </div>
                    </div>
                    
                    <div className={`px-3 py-2 rounded-lg text-sm ${
                      apiStatus === 'production' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {apiStatus === 'production' ? '🟢 Full AI Active' : '🟡 Preview Mode Active'}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      {apiStatus === 'production' 
                        ? 'All AI features are fully functional' 
                        : 'Add OpenAI API key to activate full features'}
                    </p>
                  </motion.div>

                  {/* Voice Command Demo */}
                  <motion.div
                    className="bg-gray-800/50 rounded-lg p-3 mt-4 border border-gray-600/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-gray-400 text-sm font-mono">You:</div>
                      <div className="text-gray-300 text-sm">"Jarvus, enable proactive notifications"</div>
                    </div>
                    <div className="flex items-center space-x-3 mt-2">
                      <div className="text-gray-400 text-sm font-mono">JARVUS:</div>
                      <div className="text-gray-300 text-sm">"Proactive notifications enabled! I'll now alert you about interview follow-ups and networking opportunities."</div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            )}


          </motion.div>
        </div>
      </div>

      {/* AI Conversation Interface */}
      <AnimatePresence>
        {showConversation && (
          <motion.div
            className="fixed top-0 right-0 h-full w-96 bg-gray-900/95 border-l border-cyan-500/20 z-50"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Conversation Header */}
            <div className="p-6 border-b border-cyan-500/20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-cyan-400">JARVUS Chat</h3>
                <button
                  onClick={() => setShowConversation(false)}
                  className="text-gray-400 hover:text-cyan-400 transition-colors"
                >
                  ✕
                </button>
              </div>
              
              {/* API Status Indicator */}
              <div className={`text-xs px-3 py-1 rounded-full inline-block ${
                apiStatus === 'production' 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-yellow-500/20 text-yellow-400'
              }`}>
                {apiStatus === 'production' ? '🟢 AI Active' : '🟡 Preview Mode'}
              </div>

              {/* Personality Selector */}
              <div className="mt-4">
                <label className="text-sm text-gray-400 mb-2 block">Personality:</label>
                <select
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value as any)}
                  className="w-full bg-gray-800/50 border border-cyan-500/20 rounded-lg px-3 py-2 text-cyan-400 focus:outline-none focus:border-cyan-400"
                >
                  <option value="balanced">Balanced</option>
                  <option value="professional">Professional</option>
                  <option value="friendly">Friendly</option>
                  <option value="creative">Creative</option>
                </select>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 h-96 max-h-96">
              {messages.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  <FontAwesomeIcon icon={faRobot} className="text-4xl mb-4 text-cyan-400" />
                  <p>Start a conversation with JARVUS!</p>
                  <p className="text-sm mt-2">Ask about careers, interviews, or professional growth.</p>
                </div>
              ) : (
                messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`inline-block max-w-xs p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-cyan-500/20 text-cyan-100'
                        : 'bg-gray-700/50 text-gray-200'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      <span className="text-xs opacity-60 mt-1 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
              
              {isLoading && (
                <motion.div
                  className="text-left mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="inline-block bg-gray-700/50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-t border-cyan-500/20">
              <div className="grid grid-cols-1 gap-2 text-xs">
                <button
                  onClick={() => setSearchQuery("How do I prepare for a software engineering interview?")}
                  className="text-left p-2 bg-cyan-500/10 rounded-lg text-cyan-400 hover:bg-cyan-500/20 transition-colors"
                >
                  💻 Interview prep tips
                </button>
                <button
                  onClick={() => setSearchQuery("What should I include in my resume for tech companies?")}
                  className="text-left p-2 bg-blue-500/10 rounded-lg text-blue-400 hover:bg-blue-500/20 transition-colors"
                >
                  📄 Resume optimization
                </button>
                <button
                  onClick={() => setSearchQuery("How do I negotiate my salary effectively?")}
                  className="text-left p-2 bg-purple-500/10 rounded-lg text-purple-400 hover:bg-purple-500/20 transition-colors"
                >
                  💰 Salary negotiation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Navigation Button */}
      <motion.div
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center cursor-pointer simple-border"
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-6 h-1 bg-white rounded-full"></div>
        <div className="w-6 h-1 bg-white rounded-full mt-1"></div>
        <div className="w-6 h-1 bg-white rounded-full mt-1"></div>
      </motion.div>
    </div>
  );
};

export default AIAssistantInterface;
