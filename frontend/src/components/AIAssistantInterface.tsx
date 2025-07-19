import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMicrophone, 
  faMicrophoneSlash, 
  faPaperPlane, 
  faCalendarDays,
  faEnvelope,
  faSearch,
  faRobot,
  faUser,
  faSignOutAlt,
  faChevronDown,
  faTasks,
  faNewspaper,
  faCog,
  faFileText,
  faBell,
  faSmile,
  faMeh,
  faFrown,
  faLaugh,
  faStar,
  faWaveSquare,
  faVolumeHigh,
  faEye,
  faClock,
  faRocket,
  faUsers,
  faChartLine,
  faTrophy
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'calendar' | 'email' | 'summary' | 'reminder' | 'research' | 'digest';
  metadata?: any;
}

interface ConversationHistory {
  role: 'user' | 'assistant';
  content: string;
}

interface PersonalityMode {
  id: string;
  name: string;
  icon: any;
  description: string;
  color: string;
}

interface QuickAction {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  action: () => void;
  comingSoon?: boolean;
}

const AIAssistantInterface = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPersonality, setShowPersonality] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(true);
  const [currentPersonality, setCurrentPersonality] = useState('balanced');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationHistory, setConversationHistory] = useState<ConversationHistory[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Mouse tracking for floating effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 300 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 300 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Personality modes
  const personalityModes: PersonalityMode[] = [
    {
      id: 'professional',
      name: 'Professional',
      icon: faFileText,
      description: 'Formal and business-focused',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      id: 'friendly',
      name: 'Friendly',
      icon: faSmile,
      description: 'Warm and conversational',
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: 'balanced',
      name: 'Balanced',
      icon: faMeh,
      description: 'Perfect mix of helpful and casual',
      color: 'from-cyan-400 to-teal-500'
    },
    {
      id: 'creative',
      name: 'Creative',
      icon: faLaugh,
      description: 'Innovative and out-of-the-box thinking',
      color: 'from-purple-400 to-pink-500'
    }
  ];

  const quickActions: QuickAction[] = [
    {
      id: 'resume',
      title: 'Resume Builder',
      subtitle: "AI-powered resume optimization",
      icon: faFileText,
      color: 'from-blue-400 to-indigo-500',
      action: () => handleQuickAction('resume'),
      comingSoon: true
    },
    {
      id: 'interview',
      title: 'Interview Prep',
      subtitle: 'Company-specific practice',
      icon: faUsers,
      color: 'from-purple-400 to-pink-500',
      action: () => handleQuickAction('interview'),
      comingSoon: true
    },
    {
      id: 'networking',
      title: 'Network Builder',
      subtitle: 'LinkedIn & career connections',
      icon: faChartLine,
      color: 'from-cyan-400 to-teal-500',
      action: () => handleQuickAction('networking'),
      comingSoon: true
    },
    {
      id: 'salary',
      title: 'Salary Coach',
      subtitle: 'Negotiation & market data',
      icon: faTrophy,
      color: 'from-emerald-400 to-green-500',
      action: () => handleQuickAction('salary'),
      comingSoon: true
    }
  ];

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setShowPersonality(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new (window as any).webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
        // Auto-send voice input after a brief delay
        setTimeout(() => {
          handleSendMessage(transcript);
        }, 500);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleQuickAction = (actionId: string) => {
    const careerPrompts = {
      resume: "Show me how JARVUS AI would help build the perfect resume for my target role",
      interview: "Demonstrate how JARVUS would prep me for interviews at top companies",
      networking: "Explain how JARVUS AI would help me build professional networks and optimize LinkedIn",
      salary: "Preview how JARVUS would coach me through salary negotiations with market data"
    };
    
    const prompt = careerPrompts[actionId as keyof typeof careerPrompts];
    setInputText(prompt);
    setTimeout(() => {
      handleSendMessage(prompt);
    }, 100);
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputText;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Add to conversation history
    const newHistory = [...conversationHistory, { role: 'user' as const, content: messageText }];

    try {
      // Call real ChatGPT API
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          personality: currentPersonality,
          conversationHistory: newHistory.slice(-10) // Keep last 10 messages for context
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const aiResponse = data.response || 'I apologize, but I encountered an issue generating a response.';

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        type: data.type || 'text'
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Update conversation history
      const updatedHistory = [...newHistory, { role: 'assistant' as const, content: aiResponse }];
      setConversationHistory(updatedHistory);

      // Generate speech for AI response
      try {
        const ttsResponse = await fetch(`${apiUrl}/api/ai/tts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: aiResponse
          })
        });

        if (ttsResponse.ok) {
          const ttsData = await ttsResponse.json();
          playAudio(ttsData.audio);
        }
      } catch (ttsError) {
        console.warn('TTS generation failed:', ttsError);
      }

    } catch (error) {
      console.error('Chat API error:', error);
      
      // Show user-friendly error message
      let fallbackText = "I'm having trouble connecting to my AI services right now.";
      
      if (error instanceof Error && error.message.includes('429')) {
        fallbackText = "I'm currently at my API usage limit. Please try again later, or the system administrator needs to add more credits.";
      } else if (error instanceof Error && error.message.includes('500')) {
        fallbackText = "My AI services are temporarily unavailable. Let me give you a simulated response instead!";
        
        // Use fallback simulated response
        const simulatedResponse = generateFallbackResponse(messageText);
        const fallbackMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: simulatedResponse.text,
          sender: 'ai',
          timestamp: new Date(),
          type: simulatedResponse.type as any
        };
        setMessages(prev => [...prev, fallbackMessage]);
        setIsTyping(false);
        return;
      }
      
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: fallbackText,
        sender: 'ai',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const generateFallbackResponse = (input: string): { text: string; type: string } => {
    const personalityIntros = {
      professional: "Certainly.",
      balanced: "Of course!",
      casual: "Sure thing! 😊",
      energetic: "Absolutely! 🚀"
    };

    const intro = personalityIntros[currentPersonality as keyof typeof personalityIntros];
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('calendar') || lowerInput.includes('schedule') || lowerInput.includes('meeting')) {
      return {
        text: `${intro} Here's your schedule for today:\n\n📅 **Today - ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}**\n\n🕘 **9:00 AM** - Team Standup\n📍 Conference Room A • 30 min\n\n🕚 **11:30 AM** - Client Call - TechCorp\n📞 Zoom Meeting • 45 min\n\n🕑 **2:00 PM** - Project Review\n📍 Main Office • 1 hour\n\n🕓 **4:30 PM** - 1:1 with Manager\n📍 Office 205 • 30 min\n\n✨ **You have 3 hours of free time today**\n\nWould you like me to schedule something new or move any meetings?\n\n*Note: This is a simulated response while my AI services are unavailable.*`,
        type: 'calendar'
      };
    } else if (lowerInput.includes('email') || lowerInput.includes('write') || lowerInput.includes('draft')) {
      return {
        text: `${intro} I'll help you draft an email.\n\n✉️ **Email Draft Ready:**\n\n**To:** rachel.johnson@company.com\n**Subject:** Project Timeline Follow-up\n\n---\n\nHi Rachel,\n\nI wanted to follow up on our discussion about the Q1 project timeline. Based on our conversation, I believe we can meet the March 15th deadline with the following approach:\n\n• **Phase 1:** Core development (Feb 1-20)\n• **Phase 2:** Testing & refinement (Feb 21-Mar 10)\n• **Phase 3:** Final preparations (Mar 11-15)\n\nCould we schedule a 30-minute call this week to align on the details?\n\nBest regards,\n${user?.firstName || 'Your name'}\n\n---\n\n**Actions:** ✏️ Edit • 📤 Send • ⏰ Schedule\n\n*Note: This is a simulated response while my AI services are unavailable.*`,
        type: 'email'
      };
    } else if (lowerInput.includes('research') || lowerInput.includes('find') || lowerInput.includes('search') || lowerInput.includes('ai trends')) {
      return {
        text: `${intro} Here's what I found on AI trends:\n\n🔍 **Latest AI Research & Trends:**\n\n**🚀 Breakthrough Developments:**\n• **GPT-4 Evolution:** Enhanced reasoning capabilities\n• **Multimodal AI:** Text, image, and voice integration\n• **AI Agents:** Autonomous task completion systems\n\n**📈 Market Insights:**\n• 40% increase in enterprise AI adoption\n• $200B AI market size projected for 2024\n• 67% of companies investing in AI training\n\n**🔮 Future Predictions:**\n• AI assistants becoming standard in workplaces\n• Personalized AI tutoring mainstream by 2025\n• AI-human collaboration new norm\n\n**📚 Key Sources:**\n• MIT Technology Review\n• Stanford AI Index Report\n• McKinsey Global Institute\n\nNeed me to dive deeper into any specific area?\n\n*Note: This is a simulated response while my AI services are unavailable.*`,
        type: 'research'
      };
    } else if (lowerInput.includes('brief') || lowerInput.includes('digest') || lowerInput.includes('today') || lowerInput.includes('daily')) {
      return {
        text: `${intro} Here's your daily brief:\n\n📰 **Daily Brief - ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}**\n\n**🗓️ Today's Focus:**\n• 4 meetings scheduled (2 high-priority)\n• 3 hours available for deep work\n• Next: Team standup in 2 hours\n\n**📧 Inbox Status:**\n• 12 new emails overnight\n• 3 urgent items requiring response\n• Client proposal needs review by 3 PM\n\n**📈 Market Update:**\n• Tech stocks up 1.8% in pre-market\n• AI regulation hearing scheduled this week\n• Your portfolio: +2.3% this month\n\n**🌤️ Weather & Logistics:**\n• Sunny, 68°F - Perfect for lunch outside\n• Light traffic on usual route\n• Air quality: Good\n\n**🎯 Priority Actions:**\n1. Review client proposal (due 3 PM)\n2. Prepare for team standup\n3. Schedule Q2 planning session\n\nReady to start your day?\n\n*Note: This is a simulated response while my AI services are unavailable.*`,
        type: 'digest'
      };
    } else {
      return {
        text: `${intro} I'm Jarvus, your AI assistant. I can help you with:\n\n📅 **Calendar** - Check schedule, book meetings\n✉️ **Email** - Draft, edit, and manage messages\n🔍 **Research** - Find information and insights\n📰 **Daily Brief** - Get your personalized overview\n⏰ **Reminders** - Set and manage tasks\n📄 **Summaries** - Analyze documents and articles\n\nTry saying something like "What's on my calendar?" or "Help me write an email" to get started.\n\n*Note: I'm currently using simulated responses while my AI services are being configured.*`,
        type: 'text'
      };
    }
  };

  const playAudio = (audioBase64: string) => {
    try {
      const audioBlob = new Blob([
        Uint8Array.from(atob(audioBase64), c => c.charCodeAt(0))
      ], { type: 'audio/mpeg' });
      
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onplay = () => setIsPlayingAudio(true);
      audioRef.current.onended = () => {
        setIsPlayingAudio(false);
        URL.revokeObjectURL(audioUrl);
      };
      audioRef.current.onerror = () => {
        setIsPlayingAudio(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      audioRef.current.play().catch(error => {
        console.warn('Audio playback failed:', error);
        setIsPlayingAudio(false);
      });
    } catch (error) {
      console.warn('Audio processing failed:', error);
    }
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.5, 0.5],
                x: [0, Math.random() * 20 - 10, 0],
                y: [0, Math.random() * 20 - 10, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Mouse-Following Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`mouse-${i}`}
              className="absolute w-0.5 h-0.5 bg-cyan-300 rounded-full"
              style={{
                x: smoothMouseX,
                y: smoothMouseY,
              }}
              animate={{
                opacity: [0, 0.7, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.1,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        {/* Large Floating Glow Effects */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center space-x-4">
          <motion.div 
            className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center relative"
            animate={{ 
              boxShadow: [
                '0 0 20px rgba(0, 255, 255, 0.3)',
                '0 0 40px rgba(0, 255, 255, 0.6)',
                '0 0 20px rgba(0, 255, 255, 0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <FontAwesomeIcon icon={faRobot} className="text-white text-xl" />
            {isPlayingAudio && (
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                <FontAwesomeIcon icon={faVolumeHigh} className="text-white text-xs" />
              </motion.div>
            )}
          </motion.div>
          
          <div>
            <h1 className="text-3xl font-bold text-white">JARVUS</h1>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs font-bold rounded animate-pulse">
                <FontAwesomeIcon icon={faEye} className="mr-1" />
                SNEAK PEEK
              </span>
              <span className="text-cyan-400 text-sm">Career AI Assistant Preview</span>
            </div>
            <div className="text-yellow-400 text-xs mt-1 flex items-center">
              <FontAwesomeIcon icon={faRocket} className="mr-1" />
              Community-Driven Development • Your Voice Matters
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-3">
          {/* Personality Selector */}
          <div className="relative">
            <button
              onClick={() => setShowPersonality(!showPersonality)}
              className="flex items-center space-x-2 px-3 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg transition-all hover:border-cyan-400/50 backdrop-blur-sm"
            >
              <FontAwesomeIcon 
                icon={personalityModes.find(p => p.id === currentPersonality)?.icon || faMeh} 
                className="text-cyan-400" 
              />
              <span className="text-white text-sm">
                {personalityModes.find(p => p.id === currentPersonality)?.name}
              </span>
              <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 text-xs" />
            </button>

            {showPersonality && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-slate-900/90 border border-cyan-500/30 rounded-lg shadow-2xl z-50 backdrop-blur-sm">
                {personalityModes.map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => {
                      setCurrentPersonality(mode.id);
                      setShowPersonality(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 hover:bg-cyan-500/10 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                      currentPersonality === mode.id ? 'bg-cyan-500/20' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 bg-gradient-to-r ${mode.color} rounded-lg flex items-center justify-center`}>
                      <FontAwesomeIcon icon={mode.icon} className="text-white text-sm" />
                    </div>
                    <div className="text-left">
                      <div className="text-white font-medium text-sm">{mode.name}</div>
                      <div className="text-gray-400 text-xs">{mode.description}</div>
                    </div>
                    {currentPersonality === mode.id && (
                      <FontAwesomeIcon icon={faStar} className="text-cyan-400 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-2 px-3 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg transition-all hover:border-cyan-400/50 backdrop-blur-sm"
            >
              <FontAwesomeIcon icon={faUser} className="text-cyan-400" />
              <span className="text-white text-sm">Premium</span>
              <FontAwesomeIcon icon={faChevronDown} className="text-gray-400 text-xs" />
            </button>

            {showDropdown && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-slate-900/90 border border-cyan-500/30 rounded-lg shadow-2xl z-50 backdrop-blur-sm">
                <div className="p-3 border-b border-cyan-500/30">
                  <div className="text-white font-medium text-sm">{user?.email}</div>
                  <div className="text-cyan-400 text-xs">Premium Account</div>
                </div>
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-2 px-4 py-3 hover:bg-cyan-500/10 transition-colors rounded-b-lg"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-gray-400" />
                  <span className="text-gray-300 text-sm">Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-6">
        
        {/* Preview Banner */}
        <motion.div 
          className="w-full max-w-4xl mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-3">
              <FontAwesomeIcon icon={faEye} className="text-yellow-400 text-xl animate-pulse" />
              <div className="text-center">
                <h3 className="text-yellow-400 font-bold text-lg">CAREER AI TESTING MODE</h3>
                <p className="text-yellow-200 text-sm">
                  Testing demand for career-focused AI • Community feedback determines if we build the ultimate career advancement assistant
                </p>
              </div>
              <FontAwesomeIcon icon={faRocket} className="text-yellow-400 text-xl animate-bounce" />
            </div>
          </div>
        </motion.div>

        {/* Welcome State or Chat Messages */}
        {messages.length === 0 ? (
          // Welcome Interface
          <div className="text-center max-w-4xl mx-auto">
            {/* Central Voice Interface */}
            <div className="mb-12">
              <motion.div
                className="relative inline-block"
                animate={isListening ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, repeat: isListening ? Infinity : 0 }}
              >
                {/* Floating Ring Effects */}
                <motion.div
                  className="absolute inset-0 rounded-full border border-cyan-400/20"
                  style={{ scale: 1.3 }}
                  animate={{
                    scale: [1.3, 1.6, 1.3],
                    opacity: [0.3, 0.1, 0.3],
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border border-blue-400/20"
                  style={{ scale: 1.5 }}
                  animate={{
                    scale: [1.5, 1.8, 1.5],
                    opacity: [0.2, 0.05, 0.2],
                    rotate: [360, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />

                <motion.button
                  onClick={handleVoiceInput}
                  className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 relative ${
                    isListening 
                      ? 'bg-gradient-to-r from-red-500 to-orange-500' 
                      : 'bg-gradient-to-r from-cyan-400 to-blue-500'
                  }`}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 0 60px rgba(0, 255, 255, 0.8)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    y: [0, -10, 0],
                    boxShadow: isListening 
                      ? [
                          '0 0 40px rgba(255, 0, 0, 0.5)',
                          '0 0 80px rgba(255, 100, 0, 0.8)',
                          '0 0 40px rgba(255, 0, 0, 0.5)'
                        ]
                      : [
                          '0 0 40px rgba(0, 255, 255, 0.3)',
                          '0 0 80px rgba(0, 255, 255, 0.6)',
                          '0 0 40px rgba(0, 255, 255, 0.3)'
                        ]
                  }}
                  transition={{ 
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    boxShadow: { duration: 2, repeat: Infinity }
                  }}
                >
                  {isListening && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-4 border-white/30"
                      animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                  
                  <FontAwesomeIcon 
                    icon={isListening ? faWaveSquare : faMicrophone} 
                    className="text-white text-4xl relative z-10" 
                  />
                </motion.button>
              </motion.div>
              
              <motion.div 
                className="mt-6"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <h2 className="text-2xl font-bold text-white mb-2">
                  {isListening ? 'Career AI Active...' : 'Your Career Deserves Iron Man AI'}
                </h2>
                <p className="text-cyan-400 text-lg">
                  {isListening ? 'Testing voice recognition' : 'Should we build the ultimate career advancement AI?'}
                </p>
                <div className="mt-3 flex items-center justify-center space-x-2 text-yellow-400 text-sm">
                  <FontAwesomeIcon icon={faRocket} className="animate-bounce" />
                  <span>Career-focused AI that could change how you advance professionally</span>
                </div>
              </motion.div>
            </div>

            {/* Floating Quick Actions */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {quickActions.map((action, index) => (
                <motion.button
                  key={action.id}
                  onClick={action.action}
                  className="p-6 bg-slate-900/40 border border-cyan-500/20 rounded-xl hover:border-cyan-400/40 transition-all backdrop-blur-sm group relative overflow-hidden"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ 
                    opacity: 1, 
                    y: [0, -8, 0],
                  }}
                  transition={{
                    opacity: { delay: index * 0.1 },
                    y: { 
                      duration: 3 + index * 0.5, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.2 
                    }
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -12,
                    boxShadow: '0 20px 40px rgba(0, 255, 255, 0.2)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Floating Background Glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-xl"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3
                    }}
                  />
                  
                  <motion.div 
                    className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:shadow-lg transition-all`}
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.5
                    }}
                  >
                    <FontAwesomeIcon icon={action.icon} className="text-white text-xl" />
                  </motion.div>
                  <h3 className="text-white font-semibold mb-1">{action.title}</h3>
                  <p className="text-gray-400 text-sm">{action.subtitle}</p>
                  {action.comingSoon && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl text-white text-xs font-bold">
                      Coming Soon
                    </div>
                  )}
                </motion.button>
              ))}
            </div>

            {/* Sample Commands */}
            <div className="text-center">
              <p className="text-gray-400 mb-4">Try saying:</p>
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  "What's on my calendar?",
                  "Write an email to Sarah",
                  "Research AI trends",
                  "Give me my daily brief"
                ].map((command, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setInputText(command);
                      setTimeout(() => handleSendMessage(command), 100);
                    }}
                    className="px-4 py-2 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-cyan-400 text-sm hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-all"
                  >
                    "{command}"
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Chat Interface
          <div className="w-full max-w-4xl">
            {/* Messages */}
            <div className="space-y-6 mb-8 max-h-[50vh] overflow-y-auto">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <div className={`max-w-2xl p-6 rounded-2xl relative ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30' 
                        : 'bg-slate-900/50 border border-cyan-500/20 backdrop-blur-sm'
                    }`}>
                      <div className="whitespace-pre-line text-white leading-relaxed">{message.text}</div>
                      {message.type && message.type !== 'text' && (
                        <div className="mt-3 flex items-center space-x-2">
                          <div className="flex items-center space-x-1 text-xs text-cyan-400">
                            {message.type === 'calendar' && <>📅 <span>Calendar</span></>}
                            {message.type === 'email' && <>✉️ <span>Email</span></>}
                            {message.type === 'research' && <>🔍 <span>Research</span></>}
                            {message.type === 'digest' && <>📰 <span>Daily Brief</span></>}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="bg-slate-900/50 border border-cyan-500/20 backdrop-blur-sm p-6 rounded-2xl">
                      <div className="flex items-center space-x-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-cyan-400 text-sm">Jarvus is processing...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        {/* Input Area - Always Visible */}
        <div className="w-full max-w-4xl">
          <motion.div 
            className="flex items-center space-x-4 bg-slate-900/40 border border-cyan-500/30 rounded-2xl p-4 backdrop-blur-sm relative overflow-hidden"
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            whileHover={{
              boxShadow: '0 0 30px rgba(0, 255, 255, 0.3)',
              borderColor: 'rgba(0, 255, 255, 0.5)'
            }}
          >
            {/* Floating Input Glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-2xl"
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.01, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <div className="flex-1 relative z-10">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask about career advancement, resume tips, interview prep..."
                className="w-full px-6 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
                disabled={isTyping}
              />
            </div>

            <motion.button
              onClick={handleVoiceInput}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all relative z-10 ${
                isListening 
                  ? 'bg-gradient-to-r from-red-500 to-orange-500' 
                  : 'bg-slate-700 hover:bg-slate-600'
              }`}
              whileHover={{ 
                scale: 1.1,
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <FontAwesomeIcon 
                icon={isListening ? faWaveSquare : faMicrophone} 
                className="text-white" 
              />
            </motion.button>

            <motion.button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isTyping}
              className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed relative z-10"
              whileHover={{ 
                scale: (inputText.trim() && !isTyping) ? 1.1 : 1,
                boxShadow: (inputText.trim() && !isTyping) ? '0 0 25px rgba(0, 255, 255, 0.6)' : undefined
              }}
              whileTap={{ scale: (inputText.trim() && !isTyping) ? 0.95 : 1 }}
              animate={{
                y: [0, -2, 0],
              }}
              transition={{
                y: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }
              }}
            >
              <FontAwesomeIcon icon={faPaperPlane} className="text-white" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreviewModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-8 max-w-lg w-full relative overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl" />
              
              {/* Floating particles */}
              {Array.from({ length: 15 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.1,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              ))}
              
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center"
                    animate={{ 
                      boxShadow: [
                        '0 0 20px rgba(0, 255, 255, 0.3)',
                        '0 0 40px rgba(0, 255, 255, 0.6)',
                        '0 0 20px rgba(0, 255, 255, 0.3)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FontAwesomeIcon icon={faEye} className="text-white text-xl" />
                  </motion.div>
                  
                  <div>
                    <h2 className="text-xl font-bold text-white">JARVUS AI Sneak Peek</h2>
                    <p className="text-cyan-400 text-sm">Premium Feature Preview</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <p className="text-gray-300">
                    Welcome to <span className="text-cyan-400 font-semibold">JARVUS AI</span> - 
                    the <span className="text-yellow-400 font-semibold">career-focused</span> Iron Man assistant we could build... if you want it!
                  </p>
                  
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-cyan-500/20">
                    <h3 className="text-white font-semibold mb-2 flex items-center">
                      <FontAwesomeIcon icon={faRocket} className="text-yellow-400 mr-2" />
                      Career-Focused AI Features:
                    </h3>
                    <ul className="text-gray-400 text-sm space-y-1">
                      <li>• <span className="text-cyan-400">Smart resume building</span> with industry insights</li>
                      <li>• <span className="text-cyan-400">Interview prep</span> tailored to your target companies</li>
                      <li>• <span className="text-cyan-400">Networking assistance</span> and LinkedIn optimization</li>
                      <li>• <span className="text-cyan-400">Salary negotiation</span> coaching and market data</li>
                      <li>• <span className="text-cyan-400">Career path guidance</span> with real-time market trends</li>
                      <li>• <span className="text-cyan-400">Job application automation</span> and tracking</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-blue-400 text-sm flex items-center">
                      <FontAwesomeIcon icon={faRocket} className="mr-2" />
                      <strong>Community decides:</strong> If there's enough interest, we'll build the full JARVUS experience!
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <motion.button
                    onClick={() => setShowPreviewModal(false)}
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 px-4 rounded-lg font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Explore Preview
                  </motion.button>
                  
                  <motion.button
                    onClick={() => window.history.back()}
                    className="px-4 py-2 border border-gray-600 text-gray-400 rounded-lg hover:text-white transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Back
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAssistantInterface;
