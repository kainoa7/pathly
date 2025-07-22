import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import UserTypeCards from '../UserTypeCards';
import CommunityStats from '../CommunityStats';

interface PersonalizedCTASectionProps {
  onBetaSignup?: () => void;
}

const PersonalizedCTASection: React.FC<PersonalizedCTASectionProps> = ({ onBetaSignup }) => {
  const [spotsRemaining, setSpotsRemaining] = useState(23);

  useEffect(() => {
    // Simulate decreasing spots to create urgency
    const interval = setInterval(() => {
      setSpotsRemaining(prev => Math.max(15, prev - Math.floor(Math.random() * 2)));
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="relative py-24 bg-gradient-to-b from-[rgba(113,173,186,0.03)] to-transparent"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Exclusive Invitation Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 px-4 py-2 rounded-full border border-[#71ADBA]/30 mb-6"
          >
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-[#71ADBA] font-semibold">Limited Invitation Only</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Become a JARVUS Insider 🎯
          </h2>
          <p className="text-xl text-gray-300 mb-4">
            Help us build the future of career guidance
          </p>
          
          {/* Urgency Counter */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 text-orange-400 font-semibold"
          >
            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
            Only {spotsRemaining} founding member spots remaining
          </motion.div>
        </div>

        {/* Personalized Options with Exclusive Language */}
        <div className="mb-16">
          <UserTypeCards onBetaSignup={onBetaSignup} />
        </div>

        {/* Exclusive Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-2xl p-8 border border-[#71ADBA]/20 mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Founding Member Exclusive Benefits
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-white font-semibold mb-1">Lifetime Pro Access</div>
              <div className="text-gray-400 text-sm">Worth $2,400/year</div>
            </div>
            <div>
              <div className="text-3xl mb-2">🧠</div>
              <div className="text-white font-semibold mb-1">Direct AI Training Input</div>
              <div className="text-gray-400 text-sm">Shape JARVUS with your feedback</div>
            </div>
            <div>
              <div className="text-3xl mb-2">👑</div>
              <div className="text-white font-semibold mb-1">VIP Support Priority</div>
              <div className="text-gray-400 text-sm">Skip the line, get instant help</div>
            </div>
          </div>
        </motion.div>

        {/* Community Stats */}
        <CommunityStats />
      </div>
    </motion.div>
  );
};

export default PersonalizedCTASection; 