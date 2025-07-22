import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TypewriterText from '../TypewriterText';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const jarvusDescriptions = [
    "Tired of career uncertainty? Get your AI-powered roadmap.",
    "Build your dream career with confidence. Your AI mentor is here.",
    "Stop guessing your next move. Get personalized career guidance.",
    "From confused to confident. Your career breakthrough starts now.",
    "No more career anxiety. Get clear direction in minutes."
  ];

  return (
    <div className="min-h-screen relative flex flex-col justify-center items-center">
      {/* Main Hero Content */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        
        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1]"
        >
          JARVUS
        </motion.h1>

        {/* Typewriter Description - More Emotional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl md:text-2xl text-gray-300 font-medium mb-12 h-16 flex items-center justify-center"
        >
          <TypewriterText texts={jarvusDescriptions} />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <button
            onClick={() => navigate('/about')}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white text-lg font-semibold hover:opacity-90 transition-opacity min-w-[150px]"
          >
            About
          </button>
          
          <button
            onClick={() => navigate('/vision')}
            className="px-8 py-4 rounded-xl border-2 border-[#71ADBA] text-[#71ADBA] text-lg font-semibold hover:bg-[#71ADBA] hover:text-white transition-all duration-300 min-w-[150px]"
          >
            See Mission
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection; 