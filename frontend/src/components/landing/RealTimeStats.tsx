import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { INITIAL_STATS } from '../../data/landingPageData';

const RealTimeStats: React.FC = () => {
  const [stats, setStats] = useState(INITIAL_STATS);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 3),
        careersMatched: prev.careersMatched + Math.floor(Math.random() * 5),
        companiesPartners: prev.companiesPartners + (Math.random() > 0.9 ? 1 : 0),
        successRate: Math.min(99, prev.successRate + (Math.random() > 0.95 ? 0.1 : 0))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const statItems = [
    {
      value: stats.activeUsers.toLocaleString(),
      label: "Active Students",
      color: "#71ADBA"
    },
    {
      value: stats.careersMatched.toLocaleString(),
      label: "Careers Matched", 
      color: "#9C71BA"
    },
    {
      value: `${stats.companiesPartners}+`,
      label: "Partner Companies",
      color: "#EDEAB1"
    },
    {
      value: `${stats.successRate.toFixed(1)}%`,
      label: "Success Rate",
      color: "#71ADBA"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
    >
      {statItems.map((stat, index) => (
        <div key={index} className="text-center">
          <motion.div
            key={stat.value}
            initial={{ scale: 1.2, color: stat.color }}
            animate={{ scale: 1, color: "#FFFFFF" }}
            transition={{ duration: 0.3 }}
            className="text-3xl font-bold mb-2"
          >
            {stat.value}
          </motion.div>
          <div className="text-gray-400 text-sm">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  );
};

export default RealTimeStats; 