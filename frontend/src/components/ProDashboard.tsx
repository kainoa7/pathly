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
  faClock
} from '@fortawesome/free-solid-svg-icons';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

const ProDashboard = () => {
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

  // Mock dynamic data - in real app, this would come from APIs
  const [dashboardData] = useState({
    personalizedNews: [
      {
        title: "AI Engineers See 40% Salary Increase in 2024",
        category: "Tech Careers",
        time: "2 hours ago",
        votes: 127,
        trending: true,
        relevance: "Based on your interest in AI/ML"
      },
      {
        title: "Remote Work Policies Changing at Major Tech Companies",
        category: "Work Culture",
        time: "4 hours ago",
        votes: 89,
        trending: false,
        relevance: "You saved similar articles"
      }
    ],
    skillAlerts: [
      {
        skill: "Prompt Engineering",
        demand: "+156%",
        salaryImpact: "$15k-$25k",
        urgency: "high",
        reason: "Growing 3x faster than expected in your field"
      },
      {
        skill: "Cloud Architecture",
        demand: "+45%",
        salaryImpact: "$8k-$18k",
        urgency: "medium",
        reason: "High demand in companies you're interested in"
      }
    ],
    careerMilestones: [
      {
        title: "Complete LinkedIn Profile Optimization",
        progress: 75,
        impact: "2x more recruiter views",
        deadline: "This week",
        priority: "high"
      },
      {
        title: "Practice System Design Interview",
        progress: 40,
        impact: "85% success rate improvement",
        deadline: "Next week",
        priority: "medium"
      }
    ],
    todaysFocus: {
      primaryGoal: "Apply to 3 AI/ML positions",
      completedToday: 1,
      targetToday: 3,
      streak: 5,
      motivation: "You're on a 5-day application streak! 🔥"
    }
  });

  const proFeatures = [
    {
      title: '🤖 AI Assistant (Beta)',
      description: 'Chat with JARVUS AI for instant career guidance',
      icon: '🤖',
      category: 'AI Assistant',
      action: () => navigate('/ai-assistant'),
      isPremium: true,
      isBeta: true,
      usage: 'Used 3 times this week'
    },
    {
      title: 'Daily News Hub',
      description: 'Professional news with voting and bookmarking',
      icon: '📰',
      category: 'News',
      action: () => navigate('/news'),
      isPremium: true,
      usage: '47 articles read'
    },
    {
      title: 'Career Analytics Dashboard',
      description: 'Salary comparisons and market insights',
      icon: '📊',
      category: 'Analytics',
      action: () => navigate('/analytics'),
      isPremium: true,
      usage: '12 reports generated'
    },
    {
      title: 'Advanced Career Quiz',
      description: 'Comprehensive career assessment',
      icon: '🎯',
      category: 'Assessment',
      action: () => navigate('/onboarding'),
      usage: 'Last taken 2 weeks ago'
    },
    {
      title: 'Founding Member Community',
      description: 'Exclusive Discord and special events',
      icon: '👑',
      category: 'Community',
      action: () => window.open('https://discord.gg/jarvus', '_blank'),
      isPremium: true,
      usage: '280 community points'
    },
    {
      title: 'Saved Articles',
      description: 'Your bookmarked articles and resources',
      icon: '📚',
      category: 'Organization',
      action: () => navigate('/saved-articles'),
      isPremium: true,
      usage: '23 articles saved'
    }
  ];

  const stats = [
    { label: 'Career Score', value: '8.4/10', icon: '⭐', trend: '+0.3 this week' },
    { label: 'Articles Read', value: '47', icon: '📰', trend: '+12 this week' },
    { label: 'Skills Tracking', value: '15', icon: '🎯', trend: '+2 new skills' },
    { label: 'Network Growth', value: '280', icon: '🤝', trend: '+15 connections' }
  ];

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

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      default: return 'text-green-400 bg-green-500/20 border-green-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      default: return 'text-green-400';
    }
  };

  return (
    <div className="min-h-screen bg-dark-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Personal Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-2xl p-6 border border-[#71ADBA]/30">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] px-3 py-1 rounded-full text-white text-sm font-semibold flex items-center gap-2">
                    <FontAwesomeIcon icon={faCrown} />
                    FOUNDING MEMBER
                  </div>
                  <span className="text-gray-400 text-sm">{formatTime(currentTime)}</span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {getGreeting()}, {user?.firstName || 'Career Builder'}! 👋
                </h1>
                <p className="text-gray-300">
                  {dashboardData.todaysFocus.motivation}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#71ADBA] mb-1">
                  {dashboardData.todaysFocus.completedToday}/{dashboardData.todaysFocus.targetToday}
                </div>
                <div className="text-gray-400 text-sm">Goals Today</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-dark-backgroundSecondary rounded-xl p-4 border border-dark-border hover:border-[#71ADBA] transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl">{stat.icon}</div>
                                 <FontAwesomeIcon icon={faArrowTrendUp} className="text-green-400 text-sm" />
              </div>
              <div className="text-xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
              <div className="text-xs text-green-400">{stat.trend}</div>
            </div>
          ))}
        </motion.div>

        {/* Dynamic Content Modules */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          
          {/* Personalized News Headlines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-dark-backgroundSecondary rounded-xl p-6 border border-dark-border"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <FontAwesomeIcon icon={faNewspaper} className="text-[#71ADBA]" />
                Top Headlines for You
              </h3>
              <button
                onClick={() => navigate('/news')}
                className="text-[#71ADBA] hover:text-white transition-colors text-sm"
              >
                View All →
              </button>
            </div>
            <div className="space-y-4">
              {dashboardData.personalizedNews.map((article, index) => (
                <div key={index} className="border-l-2 border-[#71ADBA] pl-4 hover:bg-dark-background/50 p-3 rounded-r-lg transition-colors cursor-pointer">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="text-white font-medium text-sm leading-tight">{article.title}</h4>
                    {article.trending && (
                      <div className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-xs whitespace-nowrap">
                        🔥 HOT
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{article.category}</span>
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faThumbsUp} />
                      <span>{article.votes}</span>
                      <span>•</span>
                      <span>{article.time}</span>
                    </div>
                  </div>
                  <div className="text-xs text-[#71ADBA] mt-1">{article.relevance}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills in Demand Alert */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-dark-backgroundSecondary rounded-xl p-6 border border-dark-border"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <FontAwesomeIcon icon={faBolt} className="text-yellow-400" />
                Skills in Demand
              </h3>
              <button
                onClick={() => navigate('/analytics')}
                className="text-[#71ADBA] hover:text-white transition-colors text-sm"
              >
                Track More →
              </button>
            </div>
            <div className="space-y-4">
              {dashboardData.skillAlerts.map((skill, index) => (
                <div key={index} className={`border rounded-lg p-4 ${getUrgencyColor(skill.urgency)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{skill.skill}</h4>
                    <div className="text-right">
                      <div className="font-bold">{skill.demand}</div>
                      <div className="text-xs opacity-75">demand</div>
                    </div>
                  </div>
                  <div className="text-sm opacity-90 mb-2">{skill.reason}</div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Salary Impact: <strong>{skill.salaryImpact}</strong></span>
                    <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Career Milestones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-dark-backgroundSecondary rounded-xl p-6 border border-dark-border"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <FontAwesomeIcon icon={faBullseye} className="text-green-400" />
                Next Milestones
              </h3>
              <button
                onClick={() => navigate('/career-roadmap')}
                className="text-[#71ADBA] hover:text-white transition-colors text-sm"
              >
                View Roadmap →
              </button>
            </div>
            <div className="space-y-4">
              {dashboardData.careerMilestones.map((milestone, index) => (
                <div key={index} className="bg-dark-background rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="text-white font-medium text-sm">{milestone.title}</h4>
                    <div className={`text-xs px-2 py-1 rounded ${getPriorityColor(milestone.priority)} bg-current/20`}>
                      {milestone.priority.toUpperCase()}
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{milestone.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${milestone.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-green-400">{milestone.impact}</span>
                    <div className="flex items-center gap-1 text-gray-400">
                      <FontAwesomeIcon icon={faClock} />
                      <span>{milestone.deadline}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Pro Features - Now More Personalized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <FontAwesomeIcon icon={faRocket} className="text-[#71ADBA]" />
            Your Pro Toolkit
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {proFeatures.filter(feature => 
              feature.title.includes('AI Assistant') ? user?.accountType === 'PREMIUM' : true
            ).map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`rounded-xl p-6 border transition-all duration-300 cursor-pointer group hover:shadow-lg ${
                  feature.isPremium 
                    ? 'bg-gradient-to-br from-[#71ADBA]/10 to-[#9C71BA]/10 border-[#71ADBA]/40 hover:border-[#71ADBA] hover:shadow-[#71ADBA]/30' 
                    : 'bg-dark-backgroundSecondary border-dark-border hover:border-[#71ADBA] hover:shadow-[#71ADBA]/20'
                }`}
                onClick={feature.action}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{feature.icon}</div>
                  <div className="flex flex-col items-end gap-1">
                    {feature.isPremium && (
                      <span className="text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded font-semibold">
                        ✨ PRO
                      </span>
                    )}
                    {feature.isBeta && (
                      <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded font-semibold">
                        🧪 BETA
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-[#71ADBA] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm mb-3">
                  {feature.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#71ADBA]">{feature.usage}</span>
                  <div className="flex items-center gap-2 text-[#71ADBA] group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">Open</span>
                    <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Founding Member Community CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-2xl p-8 border border-[#71ADBA]/30 text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            🏆 Connect with Fellow Founding Members
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join our exclusive Discord community, share career wins, get advice from peers, 
            and be the first to know about new features and opportunities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://discord.gg/jarvus', '_blank')}
              className="flex-1 py-3 px-6 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faDiscord} />
              Join Discord
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/refer-friend')}
              className="flex-1 py-3 px-6 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white rounded-lg font-semibold transition-all hover:opacity-90 flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faShare} />
              Refer Friends
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProDashboard; 