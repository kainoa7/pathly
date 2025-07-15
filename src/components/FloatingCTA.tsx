import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const FloatingCTA = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  
  const opacity = useTransform(
    scrollY,
    [0, 200, 300], // scroll positions
    [0, 0, 1] // opacity values
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{ opacity }}
      className="fixed bottom-8 right-8 z-50"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
    >
      <motion.button
        onClick={() => navigate('/onboarding')}
        className="relative px-6 py-3 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-full text-white font-medium 
                   shadow-lg shadow-[#71ADBA]/20 hover:shadow-xl hover:shadow-[#71ADBA]/30
                   flex items-center gap-2 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative z-10 flex items-center gap-2">
          <span className="group-hover:scale-110 transition-transform">🚀</span>
          Get Started
          <motion.span
            className="group-hover:translate-x-1"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            →
          </motion.span>
        </span>
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[#9C71BA] to-[#71ADBA] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </motion.button>
    </motion.div>
  );
};

export default FloatingCTA; 