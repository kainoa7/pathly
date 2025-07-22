import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { USER_TYPES } from '../../data/landingPageData';

interface UserTypeCardsProps {
  onBetaSignup?: () => void;
}

const UserTypeCards: React.FC<UserTypeCardsProps> = ({ onBetaSignup }) => {
  const navigate = useNavigate();

  const handleAction = (userType: typeof USER_TYPES[0]) => {
    if (userType.action === 'beta-signup' && onBetaSignup) {
      onBetaSignup();
    } else if (userType.route) {
      navigate(userType.route);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {USER_TYPES.map((userType, index) => (
        <motion.div
          key={userType.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.2 }}
          className={`bg-gradient-to-br ${userType.gradient} rounded-2xl p-8 border ${userType.border} text-center`}
        >
          <div className="text-5xl mb-4">{userType.icon}</div>
          <h3 className="text-2xl font-bold text-white mb-4">{userType.title}</h3>
          <p className="text-gray-300 mb-6">{userType.description}</p>
          <button
            onClick={() => handleAction(userType)}
            className={`w-full py-3 px-6 bg-gradient-to-r ${userType.buttonGradient} text-white rounded-xl font-semibold hover:opacity-90 transition-opacity`}
          >
            {userType.ctaText}
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default UserTypeCards; 