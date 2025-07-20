import React, { useState, useEffect, useRef } from 'react';
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
  const { logout } = useAuth();
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

  // Enhanced animation variants
  const sidebarIconVariants = {
    idle: { 
      scale: 1,
      boxShadow: "0 0 0px rgba(6, 182, 212, 0)",
      transition: { duration: 0.2 }
    },
    hover: { 
      scale: 1.15,
      boxShadow: "0 0 25px rgba(6, 182, 212, 0.6)",
      transition: { duration: 0.3, ease: "easeOut" }
    },
    active: {
      scale: 1.1,
      boxShadow: [
        "0 0 20px rgba(6, 182, 212, 0.4)",
        "0 0 35px rgba(6, 182, 212, 0.8)",
        "0 0 20px rgba(6, 182, 212, 0.4)",
      ],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const cardHoverVariants = {
    idle: { 
      scale: 1,
      boxShadow: "0 0 20px rgba(6, 182, 212, 0.3)",
      y: 0
    },
    hover: { 
      scale: 1.02,
      y: -8,
      boxShadow: [
        "0 0 30px rgba(6, 182, 212, 0.5)",
        "0 0 40px rgba(6, 182, 212, 0.7)",
        "0 0 30px rgba(6, 182, 212, 0.5)",
      ],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const micVariants = {
    idle: { 
      scale: 1,
      color: "#06b6d4",
      filter: "drop-shadow(0 0 0px rgba(6, 182, 212, 0))"
    },
    listening: {
      scale: [1, 1.2, 1],
      color: ["#ef4444", "#f97316", "#ef4444"],
      filter: [
        "drop-shadow(0 0 5px rgba(239, 68, 68, 0.8))",
        "drop-shadow(0 0 15px rgba(239, 68, 68, 1))",
        "drop-shadow(0 0 5px rgba(239, 68, 68, 0.8))"
      ],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white relative">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
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
        
        .glow-border {
          box-shadow: 
            0 0 20px rgba(6, 182, 212, 0.3),
            inset 0 0 20px rgba(6, 182, 212, 0.1);
          border-width: 1px;
          border-style: solid;
          border-color: rgba(6, 182, 212, 0.3);
        }
        
        .glow-border:hover {
          box-shadow: 
            0 0 30px rgba(6, 182, 212, 0.5),
            inset 0 0 30px rgba(6, 182, 212, 0.2);
          border-width: 1px;
          border-color: rgba(6, 182, 212, 0.5);
        }

        .sidebar-icon-glow {
          transition: all 0.3s ease;
        }

        .sidebar-icon-glow:hover {
          filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.8));
        }

        .card-pulse:hover {
          animation: subtle-pulse 1.5s ease-in-out infinite;
        }

        @keyframes subtle-pulse {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.01) translateY(-2px); }
        }
      `}</style>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <motion.div 
          className="w-20 bg-gray-900/50 backdrop-blur-sm border-r border-cyan-500/20 flex flex-col items-center py-8 space-y-8"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {sidebarItems.map((item, index) => (
            <motion.div
              key={item.label}
              className={`w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer sidebar-icon-glow ${
                item.active 
                  ? 'bg-cyan-500/20 text-cyan-400' 
                  : 'text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10'
              }`}
              variants={sidebarIconVariants}
              initial="idle"
              animate={item.active ? "active" : "idle"}
              whileHover="hover"
              whileTap={{ scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setActiveView(item.view)}
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
              boxShadow: "0 0 25px rgba(239, 68, 68, 0.6)",
              color: "#ef4444"
            }}
            whileTap={{ scale: 0.9 }}
            onClick={logout}
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
              animate={{
                textShadow: [
                  "0 0 10px rgba(6, 182, 212, 0.5)",
                  "0 0 20px rgba(6, 182, 212, 0.8)",
                  "0 0 10px rgba(6, 182, 212, 0.5)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              JARVUS
            </motion.h1>

            {/* Search Bar */}
            <motion.div 
              className="relative w-96"
              variants={glowVariants}
              animate="animate"
            >
              <div className="relative glow-border rounded-full bg-gray-800/50 backdrop-blur-sm">
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
                  className="w-full pl-12 pr-20 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                  disabled={isLoading}
                />
                <motion.button
                  className="absolute right-12 top-1/2 transform -translate-y-1/2"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={sendMessage}
                  disabled={isLoading || !searchQuery.trim()}
                >
                  <FontAwesomeIcon 
                    icon={isLoading ? faRobot : faPaperPlane} 
                    className={`${isLoading ? 'text-cyan-400 animate-pulse' : 'text-cyan-400'}`}
                  />
                </motion.button>
                <motion.button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2"
                  variants={micVariants}
                  animate={isListening ? "listening" : "idle"}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsListening(!isListening)}
                >
                  <FontAwesomeIcon icon={faMicrophone} />
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
                  className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 card-pulse cursor-pointer"
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
                  className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 card-pulse cursor-pointer"
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
                  className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 card-pulse cursor-pointer"
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

                  {/* Futuristic Email Scanning Interface */}
                  {gmailConnected && (
                    <motion.div
                      className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl p-6 border border-cyan-500/30 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="text-cyan-400"
                          >
                            🔍
                          </motion.div>
                        </div>
                        <h3 className="text-xl font-semibold text-cyan-400">JARVUS Email Scanner</h3>
                        <div className="text-sm text-gray-400">(Demo Mode)</div>
                      </div>
                      
                      <div className="space-y-3">
                        {/* Scanning Animation */}
                        <motion.div
                          className="text-sm text-cyan-300 font-mono"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {">"} Scanning inbox for career opportunities...
                        </motion.div>
                        
                        {/* Mock Email Results */}
                        <div className="space-y-2">
                          <motion.div
                            className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-center justify-between"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                          >
                            <div>
                              <div className="text-red-400 font-semibold">🔥 HIGH PRIORITY</div>
                              <div className="text-sm text-gray-300">Meta Job Offer - Decision Due July 25</div>
                              <div className="text-xs text-gray-400">$165k base + $50k signing bonus</div>
                            </div>
                            <div className="text-right">
                              <div className="text-red-400 font-bold">10/10</div>
                              <div className="text-xs text-gray-400">Priority</div>
                            </div>
                          </motion.div>

                          <motion.div
                            className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 flex items-center justify-between"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                          >
                            <div>
                              <div className="text-orange-400 font-semibold">📅 INTERVIEW</div>
                              <div className="text-sm text-gray-300">Netflix Technical Interview</div>
                              <div className="text-xs text-gray-400">90-min session - React & System Design</div>
                            </div>
                            <div className="text-right">
                              <div className="text-orange-400 font-bold">9/10</div>
                              <div className="text-xs text-gray-400">Priority</div>
                            </div>
                          </motion.div>

                          <motion.div
                            className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 flex items-center justify-between"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.9 }}
                          >
                            <div>
                              <div className="text-blue-400 font-semibold">🤝 NETWORKING</div>
                              <div className="text-sm text-gray-300">OpenAI Coffee Chat - AI Career</div>
                              <div className="text-xs text-gray-400">Friday 2PM @ Blue Bottle SOMA</div>
                            </div>
                            <div className="text-right">
                              <div className="text-blue-400 font-bold">8/10</div>
                              <div className="text-xs text-gray-400">Priority</div>
                            </div>
                          </motion.div>

                          <motion.div
                            className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 flex items-center justify-between"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1.1 }}
                          >
                            <div>
                              <div className="text-green-400 font-semibold">⚡ FOLLOW-UP</div>
                              <div className="text-sm text-gray-300">Tesla Interview Update</div>
                              <div className="text-xs text-gray-400">Decision expected by end of week</div>
                            </div>
                            <div className="text-right">
                              <div className="text-green-400 font-bold">7/10</div>
                              <div className="text-xs text-gray-400">Priority</div>
                            </div>
                          </motion.div>
                        </div>

                        {/* AI Analysis */}
                        <motion.div
                          className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 mt-4 border border-purple-500/30"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 1.3 }}
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                              <div className="text-purple-400 text-sm">🧠</div>
                            </div>
                            <div className="text-purple-400 font-semibold">JARVUS AI Analysis</div>
                          </div>
                          <div className="text-sm text-gray-300 leading-relaxed">
                            <p><strong className="text-purple-300">Immediate Action Required:</strong> Meta offer deadline approaching - review terms and negotiate if needed.</p>
                            <p className="mt-1"><strong className="text-blue-300">Schedule:</strong> Confirm Netflix interview availability this week.</p>
                            <p className="mt-1"><strong className="text-green-300">Network:</strong> Leverage OpenAI connection for future AI opportunities.</p>
                          </div>
                        </motion.div>

                        {/* Voice Command Simulation */}
                        <motion.div
                          className="bg-gray-800/50 rounded-lg p-3 mt-4 border border-gray-600/30"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.5 }}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="text-gray-400 text-sm font-mono">You:</div>
                            <div className="text-gray-300 text-sm">"Hey JARVUS, what emails do I have?"</div>
                          </div>
                          <div className="flex items-center space-x-3 mt-2">
                            <div className="text-cyan-400 text-sm font-mono">JARVUS:</div>
                            <div className="text-cyan-300 text-sm">"I found 4 high-priority career emails requiring your attention. The Meta offer expires in 5 days."</div>
                          </div>
                        </motion.div>
                      </div>
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

            {/* AI-Powered Calendar Module */}
            {activeView === 'calendar' && (
              <div className="space-y-6">
                {/* Calendar Assistant Header */}
                <motion.div
                  className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-purple-400 mb-2">
                        📅 AI Calendar Assistant
                      </h2>
                      <p className="text-gray-300">Smart scheduling and time management with AI insights</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-400">5</div>
                      <div className="text-sm text-gray-400">Conflicts Detected</div>
                    </div>
                  </div>

                  {/* Calendar Conflict Alert */}
                  <motion.div
                    className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-4"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-red-400 text-xl">⚠️</div>
                      <div>
                        <div className="text-red-400 font-semibold">SCHEDULING CONFLICT</div>
                        <div className="text-sm text-gray-300">Tuesday 2:00 PM - Double-booked: Coffee with Sam & Netflix Interview</div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Weekly Calendar View */}
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                      <div key={day} className="text-center">
                        <div className="text-sm text-gray-400 mb-2">{day}</div>
                        <div className={`h-20 rounded-lg ${
                          index === 1 ? 'bg-red-500/20 border border-red-500/40' : 
                          index === 2 ? 'bg-orange-500/20 border border-orange-500/40' :
                          'bg-gray-800/50 border border-gray-600/30'
                        } p-2`}>
                          {index === 1 && (
                            <div className="text-xs">
                              <div className="text-red-400">2PM Coffee</div>
                              <div className="text-red-400">2PM Interview</div>
                            </div>
                          )}
                          {index === 2 && (
                            <div className="text-xs">
                              <div className="text-orange-400">10AM OpenAI</div>
                              <div className="text-orange-400">3PM Tesla</div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* AI Suggestions */}
                  <motion.div
                    className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl p-4 border border-cyan-500/30"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="text-cyan-400">🤖</div>
                      <div className="text-cyan-400 font-semibold">JARVUS Scheduling Recommendations</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3">
                        <div>
                          <div className="text-sm text-gray-300">Move coffee with Sam to 4:00 PM Tuesday</div>
                          <div className="text-xs text-gray-400">Keeps Netflix interview at optimal 2:00 PM slot</div>
                        </div>
                        <button className="px-3 py-1 bg-cyan-500 text-white rounded text-xs hover:bg-cyan-600">
                          Apply
                        </button>
                      </div>
                      <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-3">
                        <div>
                          <div className="text-sm text-gray-300">Block 1-hour prep before each interview</div>
                          <div className="text-xs text-gray-400">AI-generated prep material included</div>
                        </div>
                        <button className="px-3 py-1 bg-cyan-500 text-white rounded text-xs hover:bg-cyan-600">
                          Apply
                        </button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Voice Command Demo */}
                  <motion.div
                    className="bg-gray-800/50 rounded-lg p-3 mt-4 border border-gray-600/30"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-gray-400 text-sm font-mono">You:</div>
                      <div className="text-gray-300 text-sm">"Jarvus, what's my schedule Tuesday?"</div>
                    </div>
                    <div className="flex items-center space-x-3 mt-2">
                      <div className="text-purple-400 text-sm font-mono">JARVUS:</div>
                      <div className="text-purple-300 text-sm">"You're double-booked at 2 PM. I recommend moving your coffee with Sam to 4 PM to keep the Netflix interview slot."</div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            )}

            {/* AI Resume Builder Module */}
            {activeView === 'resume' && (
              <div className="space-y-6">
                {/* Resume Builder Header */}
                <motion.div
                  className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl p-6 border border-green-500/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-green-400 mb-2">
                        📄 AI Resume Builder
                      </h2>
                      <p className="text-gray-300">Real-time resume optimization with AI impact analysis</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">94%</div>
                      <div className="text-sm text-gray-400">ATS Score</div>
                    </div>
                  </div>

                  {/* Live Resume Preview */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Resume Content */}
                    <div className="space-y-4">
                      <motion.div
                        className="bg-gray-800/50 rounded-xl p-4 border border-green-500/20"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="text-green-400">✨</div>
                          <div className="text-green-400 font-semibold">AI Enhancement in Progress...</div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="bg-gray-700/50 rounded-lg p-3">
                            <div className="text-sm text-gray-400 mb-1">Before:</div>
                            <div className="text-gray-300 line-through">• Worked on frontend development</div>
                          </div>
                          
                          <motion.div
                            className="bg-green-500/10 rounded-lg p-3 border border-green-500/30"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                          >
                            <div className="text-sm text-green-400 mb-1">AI Enhanced:</div>
                            <div className="text-gray-300">• Built responsive React components serving 50k+ users, improving page load speeds by 40% and user engagement by 25%</div>
                          </motion.div>
                        </div>
                      </motion.div>

                      {/* Impact Metrics */}
                      <motion.div
                        className="bg-gray-800/50 rounded-xl p-4"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <h3 className="text-green-400 font-semibold mb-3">🎯 Impact Analysis</h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-400">12</div>
                            <div className="text-xs text-gray-400">Action Verbs</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-yellow-400">8</div>
                            <div className="text-xs text-gray-400">Quantified Results</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-400">6</div>
                            <div className="text-xs text-gray-400">Tech Keywords</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-400">4</div>
                            <div className="text-xs text-gray-400">Industry Buzzwords</div>
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

            {/* Enhanced AI Brain Module */}
            {activeView === 'brain' && (
              <div className="space-y-6">
                {/* Enhanced Brain Header */}
                <motion.div
                  className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-6 border border-cyan-500/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold text-cyan-400 mb-2">
                        🧠 JARVUS Brain - Career Intelligence
                      </h2>
                      <p className="text-gray-300">Advanced AI career coaching and personalized insights</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-cyan-400">AI</div>
                      <div className="text-sm text-gray-400">Online</div>
                    </div>
                  </div>

                  {/* Career Insights Dashboard */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                    <motion.div
                      className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="text-2xl font-bold text-green-400">Meta</div>
                      <div className="text-sm text-gray-400">Top Interview Match</div>
                      <div className="text-xs text-green-300 mt-1">94% Compatibility</div>
                    </motion.div>
                    <motion.div
                      className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="text-2xl font-bold text-orange-400">5</div>
                      <div className="text-sm text-gray-400">Days Until Deadline</div>
                      <div className="text-xs text-orange-300 mt-1">Meta Offer Decision</div>
                    </motion.div>
                    <motion.div
                      className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="text-2xl font-bold text-blue-400">87%</div>
                      <div className="text-sm text-gray-400">Career Progress</div>
                      <div className="text-xs text-blue-300 mt-1">This Quarter</div>
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
                          <button className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded mt-1">
                            Reschedule
                          </button>
                        </div>

                        <div className="bg-gray-800/50 rounded-lg p-3">
                          <div className="text-sm text-yellow-400 mb-1">⚡ Quick Practice</div>
                          <div className="text-xs text-gray-300">"Tell me about a time you solved a difficult problem"</div>
                          <button className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded mt-1">
                            Practice Now
                          </button>
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
            className="fixed top-0 right-0 h-full w-96 bg-gray-900/95 backdrop-blur-lg border-l border-cyan-500/20 z-50"
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
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center cursor-pointer glow-border"
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
