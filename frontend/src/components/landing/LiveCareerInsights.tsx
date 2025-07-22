import React from 'react';
import { motion } from 'framer-motion';
import { LIVE_INSIGHTS } from '../../data/landingPageData';

const LiveCareerInsights: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5 }}
      className="bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-2xl p-6 border border-[#71ADBA]/20"
    >
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        📊 Live Career Market
      </h3>
      <div className="space-y-3">
        {LIVE_INSIGHTS.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 + index * 0.2 }}
            className="flex items-center gap-3 p-3 bg-dark-background/50 rounded-lg"
          >
            <div className="text-2xl">{insight.icon}</div>
            <div className="flex-1">
              <div className="text-white font-medium text-sm">{insight.title}</div>
              <div className="text-gray-400 text-xs">{insight.timestamp}</div>
            </div>
            <div className={`px-2 py-1 rounded text-xs font-bold ${
              insight.trend === 'hot' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
            }`}>
              {insight.trend === 'hot' ? '🔥' : '📈'}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LiveCareerInsights; 