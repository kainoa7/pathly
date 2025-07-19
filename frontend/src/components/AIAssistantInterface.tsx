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
  faRobot,
  faUser,
  faSignOutAlt,
  faChevronDown
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIAssistantInterface = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "What's on my calendar today?",
      sender: 'user',
      timestamp: new Date()
    },
    {
      id: '2',
      text: 'You have a meeting at 2:00 PM.',
      sender: 'ai',
      timestamp: new Date()
    },
    {
      id: '3',
      text: 'Write an email to Rachel',
      sender: 'user',
      timestamp: new Date()
    },
    {
      id: '4',
      text: "Sure, I've drafted an email to Rachel for you.",
      sender: 'ai',
      timestamp: new Date()
    },
    {
      id: '5',
      text: 'Here are some recent articles I found.',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new (window as any).webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        // Handle voice input here
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
    <div className="h-screen bg-slate-900 flex relative overflow-hidden">
      {/* Premium Account Dropdown */}
      <div className="absolute top-4 right-4 z-50">
        <div className="relative" ref={dropdownRef}>
          <motion.button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full px-4 py-2 text-white font-semibold text-sm hover:shadow-lg transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-white font-bold text-sm">
                {user?.firstName?.charAt(0) || 'K'}
              </span>
            </div>
            <span>PREMIUM</span>
            <FontAwesomeIcon icon={faChevronDown} className={`transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </motion.button>
          
          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-xl border border-slate-700 py-2"
              >
                <div className="px-4 py-2 border-b border-slate-700">
                  <p className="text-white font-semibold">{user?.firstName} {user?.lastName}</p>
                  <p className="text-slate-400 text-xs">{user?.email}</p>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setShowDropdown(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span>Sign Out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Left Side - Chat Messages */}
      <div className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
            <FontAwesomeIcon icon={faUser} className="text-white text-lg" />
          </div>
          <h1 className="text-2xl font-bold text-white">Kaiyl AI</h1>
        </div>

        {/* Messages */}
        <div className="space-y-4 max-w-2xl">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`p-4 rounded-2xl max-w-md ${
                  message.sender === 'user' 
                    ? 'bg-slate-700 text-white ml-auto' 
                    : 'bg-slate-800 text-white'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Center - Large Microphone */}
      <div className="flex-shrink-0 flex items-center justify-center p-8">
        <motion.button
          onClick={handleVoiceInput}
          className={`w-48 h-48 rounded-full flex items-center justify-center transition-all duration-300 ${
            isListening 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
              : 'bg-gradient-to-r from-cyan-400 to-blue-500'
          } relative`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Glowing ring effect */}
          <div className={`absolute inset-0 rounded-full ${
            isListening ? 'animate-pulse' : ''
          } bg-gradient-to-r from-cyan-400 to-blue-500 opacity-30 blur-lg`}></div>
          
          <FontAwesomeIcon 
            icon={isListening ? faMicrophoneSlash : faMicrophone} 
            className="text-white text-6xl relative z-10" 
          />
        </motion.button>
      </div>

      {/* Right Side - Action Icons */}
      <div className="flex-shrink-0 flex flex-col items-center justify-center p-8 space-y-8">
        <motion.div
          className="w-16 h-16 bg-cyan-500 rounded-2xl flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FontAwesomeIcon icon={faCalendarDays} className="text-white text-2xl" />
        </motion.div>
        
        <motion.div
          className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FontAwesomeIcon icon={faEnvelope} className="text-white text-2xl" />
        </motion.div>
        
        <motion.div
          className="w-16 h-16 bg-cyan-400 rounded-2xl flex items-center justify-center cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FontAwesomeIcon icon={faSearch} className="text-white text-2xl" />
        </motion.div>
      </div>
    </div>
  );
};

export default AIAssistantInterface;
