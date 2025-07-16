import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ExplorerDashboard = () => {
  const navigate = useNavigate();

  const explorerFeatures = [
    {
      title: 'Basic Career Quiz',
      description: 'Discover your career interests and strengths',
      icon: '🎯',
      available: true,
      action: () => navigate('/quiz')
    },
    {
      title: 'Major Recommendations',
      description: 'Get personalized major suggestions based on your profile',
      icon: '🎓',
      available: true,
      action: () => navigate('/major-selection')
    },
    {
      title: 'Basic Career Insights',
      description: 'View fundamental career path information',
      icon: '💡',
      available: true,
      action: () => navigate('/career-insights')
    },
    {
      title: 'Top 3 Major Trends',
      description: 'Stay updated with trending majors and career paths',
      icon: '📈',
      available: true,
      action: () => navigate('/major-trends')
    },
    {
      title: 'Limited AI Job Impact Reports',
      description: 'Basic insights into how AI affects your field',
      icon: '🤖',
      available: true,
      action: () => navigate('/ai-impact')
    }
  ];

  const proOnlyFeatures = [
    {
      title: 'Real-time Major Popularity Charts',
      description: 'Live data on major popularity and trends',
      icon: '📊',
      proOnly: true
    },
    {
      title: 'AI Impact Analysis by Industry',
      description: 'Comprehensive AI impact reports for all industries',
      icon: '🔍',
      proOnly: true
    },
    {
      title: 'Personalized Notifications',
      description: 'Custom alerts for opportunities and updates',
      icon: '🔔',
      proOnly: true
    },
    {
      title: 'Interactive Career Timeline',
      description: 'Visual roadmap of your career journey',
      icon: '🗺️',
      proOnly: true
    },
    {
      title: 'Skill Demand Tracker',
      description: 'Track demand for specific skills in real-time',
      icon: '⚡',
      proOnly: true
    }
  ];

  return (
    <div className="min-h-screen bg-dark-background pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1]">
            Welcome to Your Explorer Dashboard
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Start exploring your career path with these free tools
          </p>
          
          {/* Upgrade Banner */}
          <div className="bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 rounded-lg p-6 border border-[#71ADBA]/30 mb-8">
            <h3 className="text-lg font-semibold text-white mb-2">🚀 Ready for More?</h3>
            <p className="text-gray-300 mb-4">Upgrade to Pro for unlimited access to all features</p>
            <button
              onClick={() => navigate('/signup/pro')}
              className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Upgrade to Pro - Free Limited Time!
            </button>
          </div>
        </motion.div>

        {/* Available Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Your Available Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {explorerFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-dark-backgroundSecondary rounded-lg p-6 border border-dark-border hover:border-[#71ADBA] transition-colors cursor-pointer"
                onClick={feature.action}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{feature.description}</p>
                <button className="bg-[#71ADBA] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#9C71BA] transition-colors">
                  Try Now
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pro Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Unlock with Pro</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proOnlyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-dark-backgroundSecondary rounded-lg p-6 border border-dark-border opacity-60 relative"
              >
                <div className="absolute top-4 right-4">
                  <span className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-2 py-1 rounded text-xs font-semibold">
                    PRO
                  </span>
                </div>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{feature.description}</p>
                <button
                  onClick={() => navigate('/signup/pro')}
                  className="bg-gray-600 text-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-500 transition-colors"
                >
                  Upgrade to Unlock
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExplorerDashboard; 