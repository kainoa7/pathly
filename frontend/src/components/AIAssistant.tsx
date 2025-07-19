import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faCalendar, faEnvelope, faSearch, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const AIAssistant = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: "Hi! I'm Jarvus AI. I can help you with your career, schedule, emails, and research. What would you like to do today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  // Check if user has premium access
  if (!user || user.accountType !== 'PREMIUM') {
    return (
      <div className="min-h-screen bg-dark-background pt-20">
        <div className="max-w-4xl mx-auto p-8 text-center">
          <div className="bg-gradient-to-b from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-2xl p-12 border-2 border-[#71ADBA]">
            <h1 className="text-4xl font-bold text-white mb-4">🤖 AI Assistant</h1>
            <p className="text-gray-300 mb-6">This feature is exclusively for Premium users.</p>
            <div className="text-[#71ADBA] text-lg">
              Currently in beta testing phase.
            </div>
          </div>
        </div>
      </div>
    );
  }

  const quickActions = [
    {
      icon: faCalendar,
      text: "What's on my calendar today?",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: faEnvelope,
      text: "Write an email to Rachel",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: faSearch,
      text: "Find recent articles about...",
      color: "from-green-500 to-green-600"
    }
  ];

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, 
      { type: 'user', content: input },
      { type: 'ai', content: `I understand you want to "${input}". Let me help you with that!` }
    ]);
    setInput('');
  };

  const handleQuickAction = (action: string) => {
    setMessages(prev => [...prev, 
      { type: 'user', content: action },
      { type: 'ai', content: getAIResponse(action) }
    ]);
  };

  const getAIResponse = (action: string) => {
    if (action.includes('calendar')) {
      return "You have a meeting at 2:00 PM.";
    } else if (action.includes('email')) {
      return "Sure, I've drafted an email to Rachel for you.";
    } else if (action.includes('articles')) {
      return "Here are some recent articles I found.";
    }
    return "I'm working on that for you!";
  };

  return (
    <div className="min-h-screen bg-dark-background pt-20">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-dark-backgroundSecondary rounded-2xl overflow-hidden shadow-2xl border border-[#71ADBA]/20">
          
          {/* Header */}
          <div className="p-6 border-b border-[#71ADBA]/20">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] flex items-center justify-center">
                <span className="text-white text-lg">🤖</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Jarvus AI</h1>
                <p className="text-gray-400">Your AI Career Assistant</p>
              </div>
              <div className="ml-auto">
                <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-sm font-bold rounded-full">
                  BETA
                </span>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white' 
                    : 'bg-gray-700 text-gray-100'
                }`}>
                  {message.content}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="p-6 border-t border-[#71ADBA]/20">
            <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {quickActions.map((action, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleQuickAction(action.text)}
                  className={`p-4 rounded-xl bg-gradient-to-r ${action.color} text-white font-medium text-left flex items-center gap-3 hover:opacity-90 transition-opacity`}
                >
                  <FontAwesomeIcon icon={action.icon} className="w-5 h-5" />
                  <span className="text-sm">{action.text}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-6 border-t border-[#71ADBA]/20">
            <div className="flex gap-3">
              <button
                onClick={() => setIsListening(!isListening)}
                className={`p-3 rounded-full ${isListening ? 'bg-red-500' : 'bg-[#71ADBA]'} text-white hover:opacity-90 transition-all`}
              >
                <FontAwesomeIcon icon={faMicrophone} className="w-5 h-5" />
              </button>
              
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about your career..."
                  className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-[#71ADBA] focus:outline-none"
                />
                <button
                  onClick={handleSendMessage}
                  className="px-6 py-3 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white rounded-xl hover:opacity-90 transition-opacity"
                >
                  <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
