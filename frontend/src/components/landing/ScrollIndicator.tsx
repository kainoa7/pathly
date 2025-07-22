import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ScrollIndicator: React.FC = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleScroll = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  return (
    <motion.div
      style={{ opacity }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-50 bg-[#1a2234]/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-[#71ADBA]/20 hidden md:flex"
      onClick={handleScroll}
    >
      <span className="text-gray-400 text-sm">Scroll to explore</span>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-6 h-6 text-[#EDEAB1]"
      >
        ↓
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator; 