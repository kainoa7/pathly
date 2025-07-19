import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMicrophone, 
  faMicrophoneSlash, 
  faPaperPlane, 
  faCalendarDays,
  faEnvelope,
  faSearch,
  faSparkles,
  faRobot,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'action';
}

interface QuickAction {
  id: string;
  text: string;
  icon: any;
  description: string;
  response: string;
}

const AIAssistantInterface = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Welcome back, ${user?.firstName}! I'm your AI career assistant. How can I help you today?`,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const quickActions: QuickAction[] = [
    {
      id: 'calendar',
      text: "What's on my calendar today?",
      icon: faCalendarDays,
      description: 'Check today\'s schedule',
      response: 'You have a meeting at 2:00 PM. I can help you prepare or reschedule if needed.'
    },
    {
      id: 'email',
      text: 'Write an email to Rachel',
      icon: faEnvelope,
      description: 'Draft professional emails',
      response: 'Sure, I\'ve drafted an email to Rachel for you. Would you like me to customize the tone or add specific details?'
    },
    {
      id: 'search',
      text: 'Recent articles',
      icon: faSearch,
      description: 'Find latest career insights',
      response: 'Here are some recent articles I found that match your career interests in tech and AI.'
    }
  ];

  // Auto-scroll to bottom when new messages arrive
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
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleSendMessage = async (text: string, isQuickAction = false) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      let aiResponse = '';
      
      if (isQuickAction) {
        const action = quickActions.find(a => a.text === text);
        aiResponse = action?.response || 'I can help you with that!';
      } else {
        // Simple AI responses for demo
        if (text.toLowerCase().includes('career')) {
          aiResponse = `Based on your ${user?.accountType} profile, I recommend focusing on AI and tech skills. Would you like me to create a personalized roadmap?`;
        } else if (text.toLowerCase().includes('help')) {
          aiResponse = 'I can assist with career planning, job applications, skill recommendations, and daily productivity. What specific area interests you?';
        } else if (text.toLowerCase().includes('job')) {
          aiResponse = 'I can help you find relevant job opportunities, optimize your resume, and prepare for interviews. What type of role are you targeting?';
        } else {
          aiResponse = `That's a great question about ${text.toLowerCase()}. Let me help you explore this further. What specific aspect would you like to focus on?`;
        }
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
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

  const handleQuickAction = (action: QuickAction) => {
    handleSendMessage(action.text, true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-24 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] flex items-center justify-center">
              <FontAwesomeIcon icon={faRobot} className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Kaiyl AI</h1>
            <p className="text-slate-400">Your Premium AI Career Assistant</p>
          </div>
          <div className="ml-auto">
            <div className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
              <span className="text-white font-semibold text-sm">PREMIUM BETA</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Quick Actions Sidebar */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faSparkles} className="text-[#EDEAB1]" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                {quickActions.map((action) => (
                  <motion.button
                    key={action.id}
                    onClick={() => handleQuickAction(action)}
                    className="w-full p-4 bg-slate-700/50 hover:bg-slate-600/50 rounded-xl border border-slate-600/50 hover:border-[#71ADBA]/50 transition-all duration-200 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FontAwesomeIcon icon={action.icon} className="text-white text-sm" />
                      </div>
                      <div className="text-left">
                        <div className="text-white font-medium text-sm">{action.text}</div>
                        <div className="text-slate-400 text-xs">{action.description}</div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Chat Interface */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 h-[600px] flex flex-col">
              {/* Messages */}
              <div className="flex-1 p-6 overflow-y-auto">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`flex gap-3 mb-6 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      {message.sender === 'ai' && (
                        <div className="w-8 h-8 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-full flex items-center justify-center flex-shrink-0">
                          <FontAwesomeIcon icon={faRobot} className="text-white text-xs" />
                        </div>
                      )}
                      
                      <div className={`max-w-[70%] p-4 rounded-2xl ${
                        message.sender === 'user' 
                          ? 'bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white rounded-br-md' 
                          : 'bg-slate-700/50 text-white rounded-bl-md'
                      }`}>
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <div className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>

                      {message.sender === 'user' && (
                        <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <FontAwesomeIcon icon={faUser} className="text-white text-xs" />
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isTyping && (
                  <motion.div
                    className="flex gap-3 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faRobot} className="text-white text-xs" />
                    </div>
                    <div className="bg-slate-700/50 p-4 rounded-2xl rounded-bl-md">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-slate-700/50">
                <div className="flex gap-3 items-end">
                  {/* Voice Button */}
                  <motion.button
                    onClick={handleVoiceInput}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isListening 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] hover:scale-110'
                    }`}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FontAwesomeIcon 
                      icon={isListening ? faMicrophoneSlash : faMicrophone} 
                      className="text-white" 
                    />
                  </motion.button>

                  {/* Text Input */}
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                      placeholder="Ask me anything about your career..."
                      className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-[#71ADBA] focus:ring-1 focus:ring-[#71ADBA] transition-all duration-200"
                    />
                  </div>

                  {/* Send Button */}
                  <motion.button
                    onClick={() => handleSendMessage(inputText)}
                    disabled={!inputText.trim()}
                    className="w-12 h-12 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:scale-110 transition-all duration-200"
                    whileTap={{ scale: 0.95 }}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} className="text-white" />
                  </motion.button>
                </div>

                {isListening && (
                  <motion.div 
                    className="mt-3 text-center text-slate-400 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      Listening... Speak now
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantInterface;
