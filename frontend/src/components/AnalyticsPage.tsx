import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import MajorComparisonTool from './MajorComparisonTool';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faRocket, faArrowUp } from '@fortawesome/free-solid-svg-icons';

const AnalyticsPage = () => {
  const { user } = useAuth();

  const analyticsFeatures = [
    {
      title: 'Major Salary Comparison',
      description: '10-year salary projections and career comparison charts',
      icon: '📊',
      status: 'active'
    },
    {
      title: 'Industry Growth Trends',
      description: 'Real-time industry growth analysis and predictions',
      icon: '📈',
      status: 'coming-soon'
    },
    {
      title: 'Career ROI Calculator',
      description: 'Calculate return on investment for different career paths',
      icon: '💰',
      status: 'coming-soon'
    },
    {
      title: 'Skills Demand Analytics',
      description: 'Track skill demand and salary impact in real-time',
      icon: '⚡',
      status: 'coming-soon'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-background pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <FontAwesomeIcon icon={faChartLine} className="text-[#71ADBA] text-4xl" />
            <h1 className="text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1]">
              Career Analytics Hub
            </h1>
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold">
              PRO EXCLUSIVE
            </span>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Advanced analytics and data-driven insights to help you make informed career decisions
          </p>
        </motion.div>

        {/* Analytics Features Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {analyticsFeatures.map((feature, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-[#1a2234] to-[#2a3441] rounded-xl p-6 border transition-all ${
                feature.status === 'active' 
                  ? 'border-[#71ADBA]/40 hover:border-[#71ADBA]/60' 
                  : 'border-gray-600/20'
              }`}
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className={`text-lg font-bold mb-2 ${
                feature.status === 'active' ? 'text-white' : 'text-gray-400'
              }`}>
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm mb-3">
                {feature.description}
              </p>
              <div className="flex items-center gap-2">
                {feature.status === 'active' ? (
                  <span className="text-[#71ADBA] text-sm font-medium flex items-center gap-1">
                    <FontAwesomeIcon icon={faRocket} className="text-xs" />
                    Available Now
                  </span>
                ) : (
                  <span className="text-gray-500 text-sm font-medium">
                    Coming Soon
                  </span>
                )}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Main Analytics Tool */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <MajorComparisonTool user={user} />
        </motion.div>

        {/* Coming Soon Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-br from-[#1a2234] to-[#2a3441] rounded-2xl p-8 border border-gray-600/20"
        >
          <div className="text-center">
            <FontAwesomeIcon icon={faArrowUp} className="text-[#9C71BA] text-4xl mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">More Analytics Coming Soon</h2>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              We're constantly expanding our analytics capabilities. Pro members get early access to new tools as they launch.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-2xl mb-2">🏢</div>
                <h4 className="font-bold text-white mb-1">Company Analytics</h4>
                <p className="text-sm text-gray-400">Track hiring trends at top companies</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🎓</div>
                <h4 className="font-bold text-white mb-1">University ROI</h4>
                <p className="text-sm text-gray-400">Compare cost vs. career outcomes by school</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🌍</div>
                <h4 className="font-bold text-white mb-1">Location Analysis</h4>
                <p className="text-sm text-gray-400">Cost of living vs. salary by region</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage; 