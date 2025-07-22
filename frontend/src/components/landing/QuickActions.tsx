import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { QUICK_ACTIONS } from '../../data/landingPageData';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {QUICK_ACTIONS.map((action, index) => (
        <motion.button
          key={index}
          onClick={() => navigate(action.route)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-4 rounded-xl border transition-all duration-300 bg-gradient-to-br ${action.color} ${action.border} hover:border-opacity-60`}
        >
          <div className="text-3xl mb-2">{action.icon}</div>
          <h4 className="text-white font-semibold mb-1">{action.title}</h4>
          <p className="text-gray-400 text-sm">{action.description}</p>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default QuickActions; 