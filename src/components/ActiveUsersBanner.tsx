import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ActiveUsersBannerProps {
  initialCount?: number;
  className?: string;
}

const ActiveUsersBanner = ({ initialCount = 3217, className = '' }: ActiveUsersBannerProps) => {
  const [userCount, setUserCount] = useState(initialCount);

  // Simulate user activity
  useEffect(() => {
    const simulateUserActivity = () => {
      // 60% chance of increase, 20% chance of decrease, 20% chance of no change
      const random = Math.random();
      
      setUserCount(prevCount => {
        if (random < 0.6) {
          return prevCount + 1;
        } else if (random < 0.8) {
          // Don't let count go below initial count - 50
          return Math.max(prevCount - 1, initialCount - 50);
        }
        return prevCount; // No change
      });
    };

    // Longer interval between 8-15 seconds for more gradual changes
    const getRandomInterval = () => Math.floor(Math.random() * (15000 - 8000) + 8000);

    let activityInterval: NodeJS.Timeout;
    
    const scheduleNextUpdate = () => {
      activityInterval = setTimeout(() => {
        simulateUserActivity();
        scheduleNextUpdate();
      }, getRandomInterval());
    };

    scheduleNextUpdate();

    return () => {
      if (activityInterval) {
        clearTimeout(activityInterval);
      }
    };
  }, [initialCount]);

  // Format number with commas
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className={`${className}`}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 bg-[#1a1f36]/60 backdrop-blur-lg rounded-full 
                   px-4 py-2 border border-[#71ADBA]/20 shadow-lg
                   hover:bg-[#1a1f36]/80 transition-all duration-300
                   group"
      >
        {/* Active indicator dot */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-2.5 h-2.5 rounded-full bg-emerald-500 
                     shadow-[0_0_8px_rgba(16,185,129,0.6)] 
                     group-hover:shadow-[0_0_12px_rgba(16,185,129,0.8)]"
        />
        
        {/* User count text */}
        <div className="text-sm md:text-base font-medium text-gray-300">
          <span className="mr-1">👥</span>
          Current active users:{' '}
          <motion.span 
            key={userCount}
            initial={{ opacity: 0.5, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-base md:text-lg font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 
                      bg-clip-text text-transparent ml-1"
          >
            {formatNumber(userCount)}
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
};

export default ActiveUsersBanner; 