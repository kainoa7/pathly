import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import TimelineIcon from '@mui/icons-material/Timeline';
import BoltIcon from '@mui/icons-material/Bolt';
import StarIcon from '@mui/icons-material/Star';

const ProLandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  const proFeatures = [
    {
      title: 'Daily News Hub',
      description: 'Curated news on Tech, Business, Finance, Sports & AI with social voting and comments',
      icon: <NewspaperIcon className="w-8 h-8" />,
      gradient: 'from-blue-500 to-purple-600',
      path: '/news',
      isNew: true,
      stats: '5 Categories • Live Updates • Community Discussions'
    },
    {
      title: 'AI Impact Analysis',
      description: 'Comprehensive AI impact reports across all industries with predictive insights',
      icon: <SmartToyIcon className="w-8 h-8" />,
      gradient: 'from-purple-500 to-pink-600',
      path: '/ai-analysis',
      stats: '50+ Industries • Real-time Data • Future Predictions'
    },
    {
      title: 'Advanced Analytics',
      description: 'Real-time major popularity charts and market trend analysis',
      icon: <AutoGraphIcon className="w-8 h-8" />,
      gradient: 'from-green-500 to-blue-600',
      path: '/major-charts',
      stats: 'Live Charts • Trend Analysis • Market Insights'
    },
    {
      title: 'Career Timeline',
      description: 'Interactive visual roadmap of your personalized career journey',
      icon: <TimelineIcon className="w-8 h-8" />,
      gradient: 'from-orange-500 to-red-600',
      path: '/career-timeline',
      stats: 'Personalized • Milestone Tracking • Goal Setting'
    },
    {
      title: 'Skill Demand Tracker',
      description: 'Real-time tracking of skill demand across industries and job markets',
      icon: <BoltIcon className="w-8 h-8" />,
      gradient: 'from-yellow-500 to-orange-600',
      path: '/skill-tracker',
      stats: 'Real-time • Trending Skills • Demand Forecasting'
    },
    {
      title: 'Smart Notifications',
      description: 'Personalized alerts for opportunities, industry updates, and career insights',
      icon: <NotificationsActiveIcon className="w-8 h-8" />,
      gradient: 'from-indigo-500 to-purple-600',
      path: '/notifications',
      stats: 'Personalized • Instant Alerts • Smart Filtering'
    }
  ];

  const quickStats = [
    { label: 'Pro Features', value: '15+', icon: '🚀' },
    { label: 'Daily Updates', value: '50+', icon: '📊' },
    { label: 'Industries Tracked', value: '100+', icon: '🏢' },
    { label: 'Community Members', value: '5K+', icon: '👥' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1c] via-[#1a2234] to-[#2a3441] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-r from-[#EDEAB1]/20 to-[#71ADBA]/20 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-[#9C71BA]/10 to-[#71ADBA]/10 blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 px-6 py-3 rounded-full border border-[#71ADBA]/30 mb-6">
                <StarIcon className="w-5 h-5 text-[#EDEAB1]" />
                <span className="text-[#EDEAB1] font-semibold">Welcome back, {user?.firstName}!</span>
                <StarIcon className="w-5 h-5 text-[#EDEAB1]" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Your <span className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] bg-clip-text text-transparent">
                  Pro Career
                </span>
                <br />
                Command Center
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                Access exclusive features, real-time insights, and AI-powered tools designed for ambitious professionals like you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/news')}
                  className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
                >
                  <NewspaperIcon className="w-6 h-6" />
                  Explore News Hub
                  <span className="bg-yellow-400 text-black px-2 py-1 rounded text-sm font-bold">NEW</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/pro-dashboard')}
                  className="bg-white/10 backdrop-blur text-white px-8 py-4 rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-3"
                >
                  <RocketLaunchIcon className="w-6 h-6" />
                  Pro Dashboard
                </motion.button>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {quickStats.map((stat, index) => (
                <div key={index} className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Showcase */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Exclusive <span className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] bg-clip-text text-transparent">
                  Pro Features
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Unlock advanced tools and insights that give you a competitive edge in your career journey.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {proFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  onHoverStart={() => setHoveredFeature(index)}
                  onHoverEnd={() => setHoveredFeature(null)}
                  whileHover={{ y: -10 }}
                  onClick={() => navigate(feature.path)}
                  className="relative group cursor-pointer"
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`}></div>
                  
                  <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 group-hover:border-white/30 transition-all duration-300 h-full">
                    {feature.isNew && (
                      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        ✨ NEW
                      </div>
                    )}
                    
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#71ADBA] transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="text-sm text-gray-400 mb-6">
                      {feature.stats}
                    </div>
                    
                    <div className="flex items-center text-[#71ADBA] font-semibold group-hover:text-[#9C71BA] transition-colors">
                      <span>Explore Feature</span>
                      <TrendingUpIcon className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* News Hub Highlight */}
        <section className="py-20 px-4 bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 backdrop-blur">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/20"
            >
              <div className="text-6xl mb-6">📰</div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Introducing <span className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] bg-clip-text text-transparent">
                  News Hub
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Stay ahead with curated news from Tech, Business, Finance, Sports, and AI. 
                Engage with the community through comments, votes, and discussions.
              </p>
              
              <div className="grid md:grid-cols-5 gap-4 mb-8">
                {['💻 Tech', '💼 Business', '💰 Finance', '⚽ Sports', '🤖 AI'].map((category, index) => (
                  <div key={index} className="bg-white/10 rounded-lg py-3 px-4 text-white font-medium">
                    {category}
                  </div>
                ))}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/news')}
                className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3"
              >
                <NewspaperIcon className="w-6 h-6" />
                Launch News Hub
                <RocketLaunchIcon className="w-6 h-6" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Accelerate Your Career?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                You have access to all Pro features. Start exploring and take your career to the next level.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/pro-dashboard')}
                  className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Go to Pro Dashboard
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/quiz')}
                  className="bg-white/10 backdrop-blur text-white px-8 py-4 rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  Take Advanced Quiz
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProLandingPage; 