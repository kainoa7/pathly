import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProDashboard = () => {
  const navigate = useNavigate();

  const proFeatures = [
    {
      title: 'Advanced Career Quiz',
      description: 'Comprehensive career assessment with detailed insights',
      icon: '🎯',
      category: 'Assessment',
      action: () => navigate('/quiz')
    },
    {
      title: 'Real-time Major Popularity Charts',
      description: 'Live data on major popularity and market trends',
      icon: '📊',
      category: 'Analytics',
      action: () => navigate('/major-charts')
    },
    {
      title: 'AI Impact Analysis by Industry',
      description: 'Comprehensive AI impact reports for all industries',
      icon: '🔍',
      category: 'AI Insights',
      action: () => navigate('/ai-analysis')
    },
    {
      title: 'Personalized Notifications',
      description: 'Custom alerts for opportunities and industry updates',
      icon: '🔔',
      category: 'Notifications',
      action: () => navigate('/notifications')
    },
    {
      title: 'Interactive Career Timeline',
      description: 'Visual roadmap of your career journey and milestones',
      icon: '🗺️',
      category: 'Planning',
      action: () => navigate('/career-timeline')
    },
    {
      title: 'Skill Demand Tracker',
      description: 'Real-time tracking of skill demand across industries',
      icon: '⚡',
      category: 'Skills',
      action: () => navigate('/skill-tracker')
    },
    {
      title: 'Major Switching Compatibility Score',
      description: 'Analyze compatibility for switching majors',
      icon: '🔄',
      category: 'Planning',
      action: () => navigate('/major-switching')
    },
    {
      title: 'Course Success Predictor',
      description: 'Predict your success in specific courses',
      icon: '📚',
      category: 'Academic',
      action: () => navigate('/course-predictor')
    },
    {
      title: 'Salary Trend Visualizations',
      description: 'Comprehensive salary data and future projections',
      icon: '💰',
      category: 'Financial',
      action: () => navigate('/salary-trends')
    },
    {
      title: 'Weekly Industry Updates',
      description: 'Curated industry news and trend analysis',
      icon: '📰',
      category: 'Updates',
      action: () => navigate('/industry-updates')
    }
  ];

  const getRandomProgress = () => Math.floor(Math.random() * 40) + 60;

  const quickStats = [
    { label: 'Courses Analyzed', value: '47', icon: '📚' },
    { label: 'Career Matches', value: '12', icon: '🎯' },
    { label: 'Skills Tracked', value: '23', icon: '⚡' },
    { label: 'Industry Updates', value: '8', icon: '📊' }
  ];

  return (
    <div className="min-h-screen bg-dark-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-gradient-to-r from-[#71ADBA] to-[#9C71BA]">
            <span className="text-white font-semibold">✨ PRO MEMBER</span>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1]">
            Welcome to Your Pro Dashboard
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Access all premium features and advanced analytics
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-[#71ADBA]/20 to-[#9C71BA]/20 rounded-lg p-6 border border-[#71ADBA]/30">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-dark-backgroundSecondary rounded-lg p-6 border border-dark-border mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Your Progress</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Career Assessment</span>
                <span className="text-[#71ADBA]">85%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] h-2 rounded-full" style={{width: '85%'}}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Skill Development</span>
                <span className="text-[#71ADBA]">72%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] h-2 rounded-full" style={{width: '72%'}}></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6">Your Pro Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {proFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-dark-backgroundSecondary rounded-lg p-6 border border-dark-border hover:border-[#71ADBA] transition-all duration-300 cursor-pointer group hover:shadow-lg hover:shadow-[#71ADBA]/20"
                onClick={feature.action}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{feature.icon}</div>
                  <span className="text-xs bg-[#71ADBA]/20 text-[#71ADBA] px-2 py-1 rounded">
                    {feature.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#71ADBA] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {feature.description}
                </p>
                <button className="w-full bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                  Launch
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 bg-dark-backgroundSecondary rounded-lg p-6 border border-dark-border"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-dark-background rounded-lg">
              <div className="text-2xl">🎯</div>
              <div className="flex-1">
                <h4 className="text-white font-medium">Completed Career Assessment</h4>
                <p className="text-gray-400 text-sm">2 hours ago</p>
              </div>
              <span className="text-green-400 text-sm">+15 XP</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-dark-background rounded-lg">
              <div className="text-2xl">📊</div>
              <div className="flex-1">
                <h4 className="text-white font-medium">Viewed Salary Trends Report</h4>
                <p className="text-gray-400 text-sm">Yesterday</p>
              </div>
              <span className="text-blue-400 text-sm">Viewed</span>
            </div>
            <div className="flex items-center gap-4 p-4 bg-dark-background rounded-lg">
              <div className="text-2xl">⚡</div>
              <div className="flex-1">
                <h4 className="text-white font-medium">Added Skills to Tracker</h4>
                <p className="text-gray-400 text-sm">2 days ago</p>
              </div>
              <span className="text-green-400 text-sm">+5 XP</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProDashboard; 