import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faNewspaper, 
  faChartLine, 
  faBolt, 
  faCalendarDays, 
  faArrowRight, 
  faBullseye,
  faUsers,
  faShare,
  faArrowTrendUp,
  faBookmark,
  faComments,
  faThumbsUp,
  faCrown,
  faRocket,
  faEye,
  faClock,
  faGem,
  faFire,
  faStar,
  faLightbulb,
  faBrain,
  faShield,
  faChartBar,
  faTrophy,
  faCrosshairs,
  faHandshake
} from '@fortawesome/free-solid-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

const ProLandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Premium dynamic data - this is what Pro users pay for
  const [dashboardData] = useState({
    personalizedInsights: [
      {
        title: "Your industry saw 23% salary increase this quarter",
        icon: "💰",
        trend: "hot",
        timestamp: "2 mins ago",
        relevance: "Based on your career profile",
        action: "View Salary Report"
      },
      {
        title: "5 new job opportunities match your skills",
        icon: "🎯",
        trend: "rising",
        timestamp: "8 mins ago",
        relevance: "AI-matched to your preferences",
        action: "Review Matches"
      },
      {
        title: "LinkedIn views up 40% after profile optimization",
        icon: "📈",
        trend: "hot",
        timestamp: "1 hour ago",
        relevance: "Your recent activity impact",
        action: "See Analytics"
      }
    ],
    careerMetrics: [
      {
        label: "Career Score",
        value: "9.2/10",
        change: "+0.8 this month",
        trend: "up",
        description: "Your overall career trajectory strength"
      },
      {
        label: "Market Position",
        value: "Top 15%",
        change: "+5% vs peers",
        trend: "up",
        description: "Compared to professionals in your field"
      },
      {
        label: "Skill Relevance",
        value: "94%",
        change: "+12% this quarter",
        trend: "up",
        description: "How current your skills are"
      },
      {
        label: "Network Growth",
        value: "127",
        change: "+23 this week",
        trend: "up",
        description: "New professional connections"
      }
    ],
    todaysPriorities: [
      {
        title: "Complete LinkedIn headline optimization",
        progress: 75,
        impact: "3x more recruiter views",
        deadline: "Today",
        priority: "high"
      },
      {
        title: "Review personalized job matches",
        progress: 0,
        impact: "5 perfect-fit opportunities",
        deadline: "This week",
        priority: "high"
      },
      {
        title: "Practice technical interview questions",
        progress: 60,
        impact: "85% higher success rate",
        deadline: "Next week",
        priority: "medium"
      }
    ],
    aiInsights: {
      weeklyGoal: "Apply to 3 senior-level positions",
      completedToday: 1,
      targetToday: 2,
      streak: 7,
      motivation: "You're on a 7-day productivity streak! 🔥"
    }
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      default: return 'text-green-400 bg-green-500/20';
    }
  };

  const proFeatures = [
    {
      title: "AI Career Intelligence",
      description: "Real-time market analysis and personalized career insights",
      icon: <FontAwesomeIcon icon={faBrain} className="text-2xl" />,
      metrics: "94% accuracy • 1000+ data points",
      path: "/ai-insights"
    },
    {
      title: "Executive News Hub",
      description: "Curated industry news with expert analysis and trending insights",
      icon: <FontAwesomeIcon icon={faNewspaper} className="text-2xl" />,
      metrics: "50+ sources • Real-time updates",
      path: "/news"
    },
    {
      title: "Salary Intelligence",
      description: "Advanced compensation analytics and negotiation strategies",
      icon: <FontAwesomeIcon icon={faChartBar} className="text-2xl" />,
      metrics: "Live market data • Negotiation tools",
      path: "/analytics"
    },
    {
      title: "Elite Network Access",
      description: "Connect with top professionals and industry leaders",
      icon: <FontAwesomeIcon icon={faHandshake} className="text-2xl" />,
      metrics: "5000+ executives • Verified profiles",
      path: "/network"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0f1c] via-[#1a2234] to-[#0f1419] relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full bg-gradient-to-r from-[#FFD700]/10 to-[#FFA500]/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-[#9C71BA]/5 to-[#71ADBA]/5 blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-[#FFD700]/10 via-[#FFA500]/10 to-[#71ADBA]/10 rounded-3xl p-8 border border-[#FFD700]/30 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] px-4 py-2 rounded-full text-black text-sm font-bold flex items-center gap-2">
                    <FontAwesomeIcon icon={faCrown} />
                    PRO MEMBER
                  </div>
                  <div className="bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 px-3 py-1 rounded-full text-[#71ADBA] text-sm border border-[#71ADBA]/30">
                    <FontAwesomeIcon icon={faClock} className="mr-2" />
                    {formatTime(currentTime)}
                  </div>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
                  {getGreeting()}, <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">{user?.firstName || 'Professional'}</span>! 👋
                </h1>
                
                <p className="text-xl text-gray-300 mb-4">
                  {dashboardData.aiInsights.motivation}
                </p>
                
                <div className="flex items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Live market data active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faShield} className="text-[#FFD700]" />
                    <span>Premium analytics unlocked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faBrain} className="text-[#71ADBA]" />
                    <span>AI insights updated</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-3xl font-bold text-[#FFD700] mb-2">
                  {dashboardData.aiInsights.completedToday}/{dashboardData.aiInsights.targetToday}
                </div>
                <div className="text-gray-400 text-sm mb-2">Goals Today</div>
                <div className="bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 px-3 py-1 rounded-full text-[#FFD700] text-xs">
                  {dashboardData.aiInsights.streak} day streak 🔥
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Premium Metrics Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {dashboardData.careerMetrics.map((metric, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#1a2234]/80 to-[#0f1419]/80 rounded-2xl p-6 border border-[#71ADBA]/20 backdrop-blur-sm hover:border-[#FFD700]/40 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl">
                  {metric.trend === 'up' ? '📈' : '📉'}
                </div>
                <FontAwesomeIcon icon={faArrowTrendUp} className="text-green-400 text-sm" />
              </div>
              
              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-xs text-gray-400 mb-2">{metric.label}</div>
              <div className="text-xs text-green-400 mb-2">{metric.change}</div>
              <div className="text-xs text-gray-500">{metric.description}</div>
            </div>
          ))}
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
          
          {/* Personalized AI Insights */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="xl:col-span-2 bg-gradient-to-br from-[#1a2234]/60 to-[#0f1419]/60 rounded-3xl p-8 border border-[#71ADBA]/20 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <FontAwesomeIcon icon={faBrain} className="text-[#FFD700]" />
                AI Career Intelligence
              </h3>
              <div className="bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 px-3 py-1 rounded-full text-[#FFD700] text-sm font-semibold">
                LIVE
              </div>
            </div>
            
            <div className="space-y-4">
              {dashboardData.personalizedInsights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-gradient-to-r from-[#71ADBA]/5 to-[#9C71BA]/5 rounded-2xl p-6 border border-[#71ADBA]/10 hover:border-[#FFD700]/30 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{insight.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-white font-semibold text-lg leading-tight">{insight.title}</h4>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          insight.trend === 'hot' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {insight.trend === 'hot' ? '🔥 HOT' : '📈 RISING'}
                        </div>
                      </div>
                      
                      <p className="text-[#71ADBA] text-sm mb-3">{insight.relevance}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-xs">{insight.timestamp}</span>
                        <button className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] px-4 py-2 rounded-lg text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300">
                          {insight.action}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Priority Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-gradient-to-br from-[#1a2234]/60 to-[#0f1419]/60 rounded-3xl p-8 border border-[#71ADBA]/20 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <FontAwesomeIcon icon={faBullseye} className="text-green-400" />
                Today's Priorities
              </h3>
              <button className="text-[#71ADBA] hover:text-white transition-colors text-sm">
                View All →
              </button>
            </div>
            
            <div className="space-y-4">
              {dashboardData.todaysPriorities.map((priority, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-gradient-to-r from-[#0f1419]/50 to-[#1a2234]/50 rounded-xl p-4 border border-[#71ADBA]/10"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-white font-medium text-sm leading-tight">{priority.title}</h4>
                    <div className={`text-xs px-2 py-1 rounded ${getPriorityColor(priority.priority)}`}>
                      {priority.priority.toUpperCase()}
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{priority.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${priority.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-green-400">{priority.impact}</span>
                    <div className="flex items-center gap-1 text-gray-400">
                      <FontAwesomeIcon icon={faClock} />
                      <span>{priority.deadline}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Premium Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
            <FontAwesomeIcon icon={faGem} className="text-[#FFD700]" />
            Your Premium Arsenal
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {proFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                onClick={() => navigate(feature.path)}
                className="bg-gradient-to-br from-[#1a2234]/80 to-[#0f1419]/80 rounded-2xl p-6 border border-[#71ADBA]/20 backdrop-blur-sm hover:border-[#FFD700]/40 transition-all duration-300 cursor-pointer group hover:transform hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 rounded-xl flex items-center justify-center text-[#FFD700] group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <FontAwesomeIcon icon={faArrowRight} className="text-gray-500 group-hover:text-[#FFD700] transition-colors duration-300" />
                </div>
                
                <h3 className="text-white font-semibold mb-2 group-hover:text-[#FFD700] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3 leading-relaxed">
                  {feature.description}
                </p>
                <div className="text-xs text-[#71ADBA] font-medium">
                  {feature.metrics}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Exclusive Community CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-[#FFD700]/10 via-[#FFA500]/10 to-[#71ADBA]/10 rounded-3xl p-8 border border-[#FFD700]/30 text-center backdrop-blur-sm"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <FontAwesomeIcon icon={faTrophy} className="text-[#FFD700] text-3xl" />
              <h2 className="text-3xl font-bold text-white">
                Elite Professional Network
              </h2>
              <FontAwesomeIcon icon={faTrophy} className="text-[#FFD700] text-3xl" />
            </div>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Connect with C-suite executives, industry leaders, and top performers. 
              Share insights, close deals, and accelerate your career trajectory.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#1a2234]/60 rounded-xl p-6 border border-[#FFD700]/20">
                <FontAwesomeIcon icon={faUsers} className="text-[#FFD700] text-2xl mb-3" />
                <h3 className="text-white font-semibold mb-2">Executive Access</h3>
                <p className="text-gray-300 text-sm">Direct connections to Fortune 500 leaders and startup founders</p>
              </div>
              <div className="bg-[#1a2234]/60 rounded-xl p-6 border border-[#FFD700]/20">
                <FontAwesomeIcon icon={faLightbulb} className="text-[#FFD700] text-2xl mb-3" />
                <h3 className="text-white font-semibold mb-2">Industry Insights</h3>
                <p className="text-gray-300 text-sm">Exclusive reports and trend analysis from market leaders</p>
              </div>
                             <div className="bg-[#1a2234]/60 rounded-xl p-6 border border-[#FFD700]/20">
                 <FontAwesomeIcon icon={faCrosshairs} className="text-[#FFD700] text-2xl mb-3" />
                 <h3 className="text-white font-semibold mb-2">Career Acceleration</h3>
                 <p className="text-gray-300 text-sm">Fast-track opportunities and executive mentorship</p>
               </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('https://discord.gg/jarvus-pro', '_blank')}
                className="flex-1 py-4 px-6 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-3 shadow-lg"
              >
                <FontAwesomeIcon icon={faDiscord} />
                Join Elite Discord
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/network')}
                className="flex-1 py-4 px-6 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black rounded-xl font-bold transition-all hover:opacity-90 flex items-center justify-center gap-3 shadow-lg"
              >
                <FontAwesomeIcon icon={faHandshake} />
                Explore Network
              </motion.button>
            </div>
            
            <div className="mt-6 flex items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>127 executives online now</span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faStar} className="text-[#FFD700]" />
                <span>4.9/5 member satisfaction</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProLandingPage; 