import React from 'react';
import { motion } from 'framer-motion';
import { COMMUNITY_STATS } from '../../data/landingPageData';

const CommunityStats: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <div className="inline-flex items-center gap-8 bg-dark-backgroundSecondary/50 backdrop-blur-sm px-8 py-4 rounded-2xl border border-[#71ADBA]/20">
        <div className="flex items-center gap-2 text-[#71ADBA]">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="font-semibold">{COMMUNITY_STATS.activeNow}</span>
        </div>
        <div className="text-gray-400">•</div>
        <div className="text-gray-300">
          <span className="font-semibold text-[#9C71BA]">{COMMUNITY_STATS.weeklyOffers}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityStats; 