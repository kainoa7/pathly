import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const proFeatures = [
    {
      title: 'Daily News Hub',
      description: 'Professional news with voting, comments, and bookmarking',
      icon: '📰',
      category: 'News',
      action: () => navigate('/news'),
      isPremium: true
    },
    {
      title: 'Career Analytics Dashboard',
      description: 'Major salary comparisons and data-driven career insights',
      icon: '📊',
      category: 'Analytics',
      action: () => navigate('/analytics'),
      isPremium: true
    },
    {
      title: 'Advanced Career Quiz',
      description: 'Comprehensive career assessment with detailed insights',
      icon: '🎯',
      category: 'Assessment',
      action: () => navigate('/onboarding')
    },
    {
      title: 'Major Salary Comparison',
      description: '10-year salary projections and career path analysis',
      icon: '💰',
      category: 'Analytics',
      action: () => navigate('/analytics'),
      isPremium: true
    },
    {
      title: 'Founding Member Community',
      description: 'Exclusive access to co-creator community features',
      icon: '👑',
      category: 'Community',
      action: () => navigate('/'),
      isPremium: true
    },
    {
      title: 'Saved Articles',
      description: 'Bookmark and organize your favorite news articles',
      icon: '📚',
      category: 'Organization',
      action: () => navigate('/saved-articles'),
      isPremium: true
    }
  ];

  // Mock recent activity data
  const recentActivity = [
    { 
      title: 'Voted on "Tech Industry Layoffs Impact"',
      time: '2 hours ago',
      type: 'vote'
    },
    { 
      title: 'Saved "AI Career Opportunities in 2024"',
      time: '5 hours ago',
      type: 'save'
    },
    { 
      title: 'Commented on "Remote Work Trends"',
      time: '1 day ago',
      type: 'comment'
    },
    { 
      title: 'Used Major Salary Comparison Tool',
      time: '2 days ago',
      type: 'analytics'
    }
  ];

  const stats = [
    { label: 'Pro Features', value: '6+', icon: '🚀' },
    { label: 'Articles Read', value: '47', icon: '📰' },
    { label: 'Analytics Used', value: '12', icon: '📊' },
    { label: 'Community Points', value: '280', icon: '⭐' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-dark-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white font-semibold mb-4">
            <span>👑</span>
            <span className="text-sm sm:text-base">PRO MEMBER</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Your Pro Career
            <span className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] bg-clip-text text-transparent">
              {' '}Command Center
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Access exclusive features, real-time insights, and AI-powered tools 
            designed for ambitious professionals like you.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-dark-backgroundSecondary rounded-lg p-4 sm:p-6 border border-dark-border text-center hover:border-[#71ADBA] transition-colors"
            >
              <div className="text-2xl sm:text-3xl mb-2">{stat.icon}</div>
              <div className="text-xl sm:text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 px-2 sm:px-0">Your Pro Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {proFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`rounded-lg p-4 sm:p-6 border transition-all duration-300 cursor-pointer group hover:shadow-lg ${
                  feature.isPremium 
                    ? 'bg-gradient-to-br from-[#71ADBA]/10 to-[#9C71BA]/10 border-[#71ADBA]/40 hover:border-[#71ADBA] hover:shadow-[#71ADBA]/30' 
                    : 'bg-dark-backgroundSecondary border-dark-border hover:border-[#71ADBA] hover:shadow-[#71ADBA]/20'
                }`}
                onClick={feature.action}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl sm:text-4xl">{feature.icon}</div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-xs px-2 py-1 rounded ${
                      feature.isPremium 
                        ? 'bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white' 
                        : 'bg-[#71ADBA]/20 text-[#71ADBA]'
                    }`}>
                      {feature.category}
                    </span>
                    {feature.isPremium && (
                      <span className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded font-semibold">
                        ✨ PRO
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-[#71ADBA] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {feature.description}
                </p>
                <button className="w-full px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white hover:opacity-90 transition-opacity">
                  {feature.isPremium ? '🚀 Launch' : 'Explore'}
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
          className="mt-8 sm:mt-12 bg-dark-backgroundSecondary rounded-lg p-4 sm:p-6 border border-dark-border"
        >
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-3 sm:space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 sm:gap-4 p-3 rounded-lg bg-dark-background/50 hover:bg-dark-background transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  activity.type === 'vote' ? 'bg-blue-500/20 text-blue-400' :
                  activity.type === 'save' ? 'bg-green-500/20 text-green-400' :
                  activity.type === 'comment' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-orange-500/20 text-orange-400'
                }`}>
                  {activity.type === 'vote' ? '👍' : activity.type === 'save' ? '📚' : activity.type === 'comment' ? '💬' : '📊'}
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.title}</p>
                  <p className="text-gray-400 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <button
            onClick={() => navigate('/news')}
            className="p-4 sm:p-6 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30 hover:border-blue-500 transition-all group"
          >
            <div className="text-2xl sm:text-3xl mb-2">📰</div>
            <h3 className="text-white font-semibold mb-1">Browse News</h3>
            <p className="text-gray-400 text-sm">Discover trending articles</p>
          </button>
          
          <button
            onClick={() => navigate('/analytics')}
            className="p-4 sm:p-6 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-lg border border-green-500/30 hover:border-green-500 transition-all group"
          >
            <div className="text-2xl sm:text-3xl mb-2">📊</div>
            <h3 className="text-white font-semibold mb-1">View Analytics</h3>
            <p className="text-gray-400 text-sm">Check salary comparisons</p>
          </button>
          
          <button
            onClick={() => navigate('/saved-articles')}
            className="p-4 sm:p-6 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg border border-orange-500/30 hover:border-orange-500 transition-all group"
          >
            <div className="text-2xl sm:text-3xl mb-2">📚</div>
            <h3 className="text-white font-semibold mb-1">Saved Articles</h3>
            <p className="text-gray-400 text-sm">Review your bookmarks</p>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ProDashboard; 