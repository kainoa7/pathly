import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import NewsFeeds from './NewsFeeds';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InsightsIcon from '@mui/icons-material/Insights';
import GroupIcon from '@mui/icons-material/Group';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import WarningIcon from '@mui/icons-material/Warning';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const ExplorerDashboard = () => {
  const navigate = useNavigate();
  const [currentIntel, setCurrentIntel] = useState(0);
  const [careerReadiness, setCareerReadiness] = useState(67);
  const [dailyStreak, setDailyStreak] = useState(3);
  const [showUrgentAlert, setShowUrgentAlert] = useState(true);

  // Daily Career Intel (rotating content)
  const dailyIntel = [
    {
      headline: "🚨 DAILY JOB ALERT: 247 new AI positions posted in last 24hrs",
      description: "Pro users got instant alerts when these dropped. Companies are hiring NOW - applications close fast!",
      action: "Get Daily Job Alerts",
      urgency: "high",
      proTeaser: "Pro users never miss breaking job market news"
    },
    {
      headline: "📈 MARKET UPDATE: Remote roles offering $15K signing bonuses",
      description: "Daily job market intel shows companies desperately competing for talent. Pro users knew first.",
      action: "Subscribe to Daily Updates", 
      urgency: "medium",
      proTeaser: "Get exclusive job market insider news daily"
    },
    {
      headline: "⚡ BREAKING: Your personality type is in 3x higher demand today",
      description: "Job market shifts daily - Pro users get personalized alerts when their skills are trending.",
      action: "Get Personalized Job Alerts",
      urgency: "low",
      proTeaser: "Daily personalized job market intelligence"
    }
  ];

  // Trending Career Data
  const trendingCareers = [
    { name: "AI/ML Engineer", growth: "+127%", salary: "$130K", demand: "🔥 Hot" },
    { name: "UX Designer", growth: "+64%", salary: "$95K", demand: "📈 Rising" },
    { name: "Data Scientist", growth: "+89%", salary: "$120K", demand: "🔥 Hot" },
    { name: "Product Manager", growth: "+45%", salary: "$140K", demand: "📈 Rising" }
  ];

  // Social Proof Data
  const socialStats = [
    { metric: "2,847", label: "Students explored careers today" },
    { metric: "156", label: "Got job offers this week" },
    { metric: "89%", label: "Feel more confident about their future" },
    { metric: "3.2x", label: "More likely to land dream jobs" }
  ];

  // Daily Opportunities (time-sensitive)
  const dailyOpportunities = [
    {
      title: "Google SWE Internship Applications Open",
      deadline: "2 days left",
      match: "94% match",
      type: "internship",
      urgent: true
    },
    {
      title: "$5K Scholarship for STEM Students",
      deadline: "5 days left", 
      match: "87% match",
      type: "scholarship",
      urgent: false
    },
    {
      title: "Tesla Info Session - Virtual",
      deadline: "Tonight 7PM",
      match: "91% match", 
      type: "event",
      urgent: true
    }
  ];

  // Auto-rotate daily intel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIntel((prev) => (prev + 1) % dailyIntel.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Simulate progress increase on interactions
  const increaseProgress = () => {
    if (careerReadiness < 85) {
      setCareerReadiness(prev => prev + Math.floor(Math.random() * 3) + 1);
    }
  };

  const explorerFeatures = [
    {
      title: 'AI-Powered Career Quiz',
      description: 'Adaptive quiz with personality insights and career matching',
      icon: '🧠',
      available: true,
      action: () => {
        increaseProgress();
        navigate('/adaptive-quiz');
      }
    },
    {
      title: 'Major Recommendations', 
      description: 'Get personalized major suggestions based on your profile',
      icon: '🎓',
      available: true,
      action: () => {
        increaseProgress();
        navigate('/major-selection');
      }
    },
    {
      title: 'Basic Career Insights',
      description: 'View fundamental career path information',
      icon: '💡',
      available: true,
      action: () => {
        increaseProgress();
        navigate('/career-insights');
      }
    }
  ];

  return (
    <div className="min-h-screen bg-dark-background pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Urgent Alert Banner */}
        <AnimatePresence>
          {showUrgentAlert && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-lg p-4 mb-6 relative"
            >
              <button
                onClick={() => setShowUrgentAlert(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-white"
              >
                ×
              </button>
              <div className="flex items-center gap-3">
                <WarningIcon className="text-red-400" />
                <div>
                  <h3 className="text-white font-semibold">🚨 Missing Daily Job Market Intel!</h3>
                  <p className="text-gray-300 text-sm">Pro users get daily job alerts & market news. You've missed 47 opportunities this week. Don't fall behind!</p>
                </div>
                <button
                  onClick={() => navigate('/upgrade-to-pro')}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors whitespace-nowrap"
                >
                  Upgrade to Pro
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header with Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1]">
            Daily Job Market Intel & Alerts 🚨
          </h1>
          
          {/* Progress & Streak */}
          <div className="flex justify-center items-center gap-8 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#71ADBA]">{careerReadiness}%</div>
              <div className="text-sm text-gray-400">Career Ready</div>
              <div className="w-20 h-2 bg-gray-700 rounded-full mt-1">
                <div 
                  className="h-2 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-full transition-all duration-500"
                  style={{ width: `${careerReadiness}%` }}
                />
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-[#EDEAB1]">{dailyStreak} 🔥</div>
              <div className="text-sm text-gray-400">Day Streak</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">#47</div>
              <div className="text-sm text-gray-400">vs Peers</div>
            </div>
          </div>
        </motion.div>

        {/* Pro Upgrade Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 rounded-xl p-6 border-2 border-[#EDEAB1]/40 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                ⚡ LIMITED TIME
              </span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                  <span className="text-[#EDEAB1]">🚀</span>
                  Ready to Unlock Pro Features?
                </h3>
                <p className="text-gray-300 mb-4">
                  Complete your profile and access daily news, advanced analytics, university directory, and exclusive Pro content.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-[#71ADBA]/20 text-[#71ADBA] px-3 py-1 rounded-full text-sm">📰 Daily News Hub</span>
                  <span className="bg-[#9C71BA]/20 text-[#9C71BA] px-3 py-1 rounded-full text-sm">📊 Analytics Hub</span>
                  <span className="bg-[#EDEAB1]/20 text-[#EDEAB1] px-3 py-1 rounded-full text-sm">🎓 University Directory</span>
                  <span className="bg-[#71ADBA]/20 text-[#71ADBA] px-3 py-1 rounded-full text-sm">💾 Save Articles</span>
                </div>
              </div>
              
              <div className="text-center">
                <button
                  onClick={() => navigate('/upgrade-to-pro')}
                  className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform shadow-lg"
                >
                  Upgrade to Pro →
                </button>
                <p className="text-xs text-gray-400 mt-2">
                  Just complete your profile • No payment required yet
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Daily Career Intel Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-xl p-6 border border-[#71ADBA]/20 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                LIVE
              </span>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIntel}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-bold text-white mb-2">
                  {dailyIntel[currentIntel].headline}
                </h3>
                <p className="text-gray-300 mb-4">
                  {dailyIntel[currentIntel].description}
                </p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => navigate('/upgrade-to-pro')}
                    className="bg-[#71ADBA] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#9C71BA] transition-colors"
                  >
                    Upgrade to Pro
                  </button>
                  <div className="text-xs text-[#EDEAB1] font-medium">
                    💎 {dailyIntel[currentIntel].proTeaser}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center mt-4 gap-2">
              {dailyIntel.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIntel(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentIntel ? 'bg-[#71ADBA]' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trending Careers This Week */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <TrendingUpIcon className="text-[#71ADBA]" />
              Hot Job Markets This Week 🔥
            </h2>
            <button
              onClick={() => navigate('/upgrade-to-pro')}
              className="text-[#71ADBA] hover:text-[#9C71BA] transition-colors text-sm"
            >
              Upgrade to Pro →
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {trendingCareers.slice(0, 4).map((career, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-[#1a2234]/50 rounded-lg p-4 border border-[#71ADBA]/20 hover:border-[#71ADBA]/40 transition-colors cursor-pointer"
                onClick={() => navigate('/upgrade-to-pro')}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-white">{career.name}</h3>
                  <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded">
                    {career.demand}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Growth: <span className="text-green-400">{career.growth}</span></span>
                  <span>Avg: <span className="text-[#EDEAB1]">{career.salary}</span></span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Time-Sensitive Opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <AccessTimeIcon className="text-red-400" />
              Today's Job Alerts ⚡
            </h2>
            <div className="text-sm text-gray-400">Live job market updates</div>
          </div>
          
          <div className="space-y-3">
            {dailyOpportunities.map((opp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`bg-[#1a2234]/50 rounded-lg p-4 border transition-colors cursor-pointer ${
                  opp.urgent 
                    ? 'border-red-500/30 hover:border-red-500/50' 
                    : 'border-[#71ADBA]/20 hover:border-[#71ADBA]/40'
                }`}
                onClick={() => navigate('/upgrade-to-pro')}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-white">{opp.title}</h3>
                      {opp.urgent && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold animate-pulse">
                          URGENT
                        </span>
                      )}
                    </div>
                    <div className="flex gap-4 text-sm">
                      <span className="text-red-400">⏰ {opp.deadline}</span>
                      <span className="text-green-400">✨ {opp.match}</span>
                      <span className="text-[#71ADBA] capitalize">📍 {opp.type}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                    Pro Only
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-4">
            <button
              onClick={() => navigate('/upgrade-to-pro')}
              className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              Upgrade to Pro - Free
            </button>
          </div>
        </motion.div>

        {/* Daily Career News Preview - Locked for Explorer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              🗞️ Daily Career News & Discussions
            </h2>
            <div className="flex items-center gap-2">
              <span className="bg-[#71ADBA] text-white px-2 py-1 rounded text-xs font-bold">PRO ONLY</span>
              <span className="text-sm text-gray-400">Updated hourly</span>
            </div>
          </div>
          
          <div className="mb-4">
            <NewsFeeds isPreview={true} isLocked={true} />
          </div>
          
          <div className="bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 rounded-xl p-6 border border-[#71ADBA]/30">
            <h3 className="text-lg font-bold text-white mb-2">
              Missing Out on Career Conversations 💬
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Pro users are discussing today's biggest career opportunities, salary trends, and industry insights. Join 2,000+ professionals in daily conversations that matter for your career.
            </p>
            <div className="grid grid-cols-3 gap-4 mb-4 text-xs text-gray-400">
              <div className="text-center">
                <div className="text-lg font-bold text-[#71ADBA]">47</div>
                <div>New articles today</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-[#EDEAB1]">320</div>
                <div>Comments today</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-green-400">89%</div>
                <div>Career relevance</div>
              </div>
            </div>
            <div className="text-center">
              <button
                onClick={() => navigate('/upgrade-to-pro')}
                className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                Upgrade to Pro
              </button>
            </div>
          </div>
        </motion.div>

        {/* Social Proof Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            What Happened Today 📈
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {socialStats.map((stat, index) => (
              <div key={index} className="text-center bg-[#1a2234]/30 rounded-lg p-4 border border-[#71ADBA]/10">
                <div className="text-2xl font-bold text-[#71ADBA] mb-1">{stat.metric}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Your Available Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Your Explorer Tools</h2>
          <div className="grid md:grid-cols-3 gap-6">
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
                  Continue Journey
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final Upgrade Push */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 rounded-xl p-8 border border-[#71ADBA]/30 text-center"
        >
          <WorkspacePremiumIcon className="w-16 h-16 text-[#71ADBA] mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">
            Don't Miss What's Happening in the Job Market! 📰
          </h3>
          <p className="text-gray-300 mb-4">
            You're missing daily job alerts & market intel that Pro users get. They're landing opportunities 3x faster!
          </p>
          <div className="flex justify-center items-center gap-6 mb-6">
            <div className="text-sm text-gray-400">
              🚨 Daily job market alerts & breaking news<br/>
              💎 No credit card required<br/>
              🔥 Don't miss out on what's happening daily
            </div>
          </div>
          <button
            onClick={() => navigate('/upgrade-to-pro')}
            className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-8 py-3 rounded-lg text-lg font-bold hover:scale-105 transition-transform"
          >
            Upgrade to Pro - Free
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ExplorerDashboard; 