import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PricingTier } from '../../data/pricingData';

interface PricingCardProps {
  tier: PricingTier;
  onWaitlist?: () => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ tier, onWaitlist }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (tier.action === 'waitlist' && onWaitlist) {
      onWaitlist();
    } else if (tier.route) {
      navigate(tier.route);
    }
  };

  const getCardStyle = () => {
    if (tier.id === 'premium') {
      return "relative bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500/50 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300";
    }
    if (tier.isPopular) {
      return "relative bg-gradient-to-br from-[#71ADBA]/10 to-[#9C71BA]/10 border-2 border-[#71ADBA]/50 rounded-2xl p-8 transform hover:scale-105 transition-all duration-300";
    }
    return "relative bg-[#1a2234]/60 border border-[#71ADBA]/20 rounded-2xl p-8 hover:border-[#71ADBA]/40 transition-all duration-300";
  };

  const getButtonStyle = () => {
    switch (tier.buttonStyle) {
      case 'outline':
        return "w-full py-3 rounded-xl border-2 border-[#71ADBA] text-[#71ADBA] hover:bg-[#71ADBA] hover:text-white transition-all duration-300 font-semibold";
      case 'primary':
        return "w-full py-4 rounded-xl bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white hover:opacity-90 transition-all duration-300 font-bold text-lg";
      case 'premium':
        return "w-full py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:opacity-90 transition-all duration-300 font-bold text-lg";
      default:
        return "w-full py-3 rounded-xl bg-gray-600 text-white hover:bg-gray-500 transition-all duration-300 font-semibold";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={getCardStyle()}
    >
      {/* Badge */}
      {tier.badge && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full font-bold text-sm">
            {tier.badge}
          </div>
        </div>
      )}

      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
        <p className="text-gray-300 mb-6">{tier.description}</p>
        
        <div className="mb-8">
          {tier.originalPrice && (
            <div className="text-gray-400 line-through text-lg">{tier.originalPrice}</div>
          )}
          <div className="text-4xl font-bold text-white">
            {tier.price}
            {tier.period && <span className="text-lg text-gray-400">/{tier.period}</span>}
          </div>
        </div>

        <button
          onClick={handleClick}
          className={getButtonStyle()}
        >
          {tier.buttonText}
        </button>
      </div>
    </motion.div>
  );
};

export default PricingCard; 