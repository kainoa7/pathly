import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import PeopleIcon from '@mui/icons-material/People';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

interface ActiveUsersBannerProps {
  className?: string;
}

const ActiveUsersBanner = ({ className = "" }: ActiveUsersBannerProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [userCount, setUserCount] = useState(3223);
  const [trendingCount, setTrendingCount] = useState(142);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition < 800); // Increased scroll threshold
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount(prev => prev + Math.floor(Math.random() * 3));
      setTrendingCount(prev => prev + Math.floor(Math.random() * 2));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`fixed top-24 right-4 z-50 ${className}`}
      initial={{ opacity: 0, x: 100 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : 100
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-[#1a2234]/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-[#71ADBA]/20 shadow-lg"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#71ADBA] animate-pulse" />
            <PeopleIcon className="w-4 h-4 text-[#71ADBA]" />
            <span className="text-gray-300 text-sm">
              <span className="font-semibold text-white">{userCount.toLocaleString()}</span> online
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <WhatshotIcon className="w-4 h-4 text-[#EDEAB1]" />
            <span className="text-gray-300 text-sm">
              <span className="font-semibold text-white">{trendingCount}</span> exploring
            </span>
          </div>

          <div className="flex items-center gap-2">
            <AutoGraphIcon className="w-4 h-4 text-[#9C71BA]" />
            <span className="text-gray-300 text-sm">Trending Now</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ActiveUsersBanner; 