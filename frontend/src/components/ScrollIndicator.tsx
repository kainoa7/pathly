import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollIndicator = () => {
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollY } = useScroll();
  
  // Transform the arrow rotation based on scroll position
  const arrowRotation = useTransform(
    scrollY,
    [0, viewportHeight],
    [0, 180]
  );

  const handleClick = () => {
    const currentScroll = window.scrollY;
    const targetScroll = currentScroll < viewportHeight ? viewportHeight : 0;
    
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex flex-col items-center">
      <span className="text-sm text-gray-300 mb-3">Scroll to explore</span>
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="w-12 h-12 flex items-center justify-center text-2xl text-[#EDEAB1] bg-[#1a2234]/90 backdrop-blur-sm rounded-full border border-[#71ADBA]/20 cursor-pointer hover:bg-[#1a2234]/95 transition-colors"
        style={{
          rotate: arrowRotation,
          filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))'
        }}
      >
        ↓
      </motion.div>
    </div>
  );
};

export default ScrollIndicator; 