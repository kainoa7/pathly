import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import FeedbackIcon from '@mui/icons-material/Feedback';
import RouteIcon from '@mui/icons-material/Route';
import PsychologyIcon from '@mui/icons-material/Psychology';
import GroupsIcon from '@mui/icons-material/Groups';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

const FloatingCTA = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: RouteIcon,
      label: 'PathFinder',
      onClick: () => navigate('/onboarding'),
      description: 'AI-powered career discovery',
      badge: '🔥 Popular'
    },
    {
      icon: PsychologyIcon,
      label: 'Career Simulator',
      onClick: () => navigate('/coming-soon-feature', {
        state: {
          featureName: 'Career Simulator',
          featureDescription: 'Experience different career paths in a risk-free environment. Try out various roles, understand day-to-day responsibilities, and make informed decisions about your future.',
          featureIcon: '🎮'
        }
      }),
      description: 'Try different careers risk-free',
      badge: 'Beta'
    },
    {
      icon: GroupsIcon,
      label: 'Peer Circles',
      onClick: () => navigate('/coming-soon-feature', {
        state: {
          featureName: 'Peer Circles',
          featureDescription: 'Connect with like-minded students, form study groups, and build your professional network. Share experiences and learn from peers on similar career paths.',
          featureIcon: '👥'
        }
      }),
      description: 'Join study & career groups',
      badge: 'Beta'
    },
    {
      icon: FeedbackIcon,
      label: 'Give Feedback',
      onClick: () => document.querySelector<HTMLButtonElement>('[data-feedback-trigger]')?.click(),
      description: 'Help shape Jarvus\'s future'
    }
  ];

  return (
    <div 
      className="fixed bottom-16 md:bottom-6 right-2 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Button */}
      <motion.button
        className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-6 py-3 rounded-xl 
                   shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <RocketLaunchIcon className="w-5 h-5" />
        <span>Get Started</span>
      </motion.button>

      {/* Drop-up Menu */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute bottom-full right-0 mb-4 min-w-[300px]"
          >
            <div className="bg-[#1a1f36]/95 backdrop-blur-sm rounded-xl border border-[#71ADBA]/20 overflow-hidden">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.button
                    key={item.label}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-[#71ADBA]/10 transition-colors relative group"
                    onClick={item.onClick}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20">
                      <Icon className="w-5 h-5 text-[#EDEAB1]" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-[#EDEAB1] font-medium flex items-center gap-2">
                        {item.label}
                        {item.badge && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-400">{item.description}</div>
                    </div>
                    
                    {/* Hover Effect */}
                    <motion.div
                      className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={false}
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invisible hover target - keeps the menu functionality but no button */}
      <div className="w-12 h-12 opacity-0"></div>
    </div>
  );
};

export default FloatingCTA; 