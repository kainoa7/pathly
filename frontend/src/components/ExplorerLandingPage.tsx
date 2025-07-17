import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import NewsFeeds from './NewsFeeds';
import BackgroundAnimation from './BackgroundAnimation';
import UserActivityToast from './UserActivityToast';
import ActiveUsersBanner from './ActiveUsersBanner';
import Analytics from '../utils/analytics';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import LockIcon from '@mui/icons-material/Lock';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GroupIcon from '@mui/icons-material/Group';
import InsightsIcon from '@mui/icons-material/Insights';

const ExplorerLandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState(2100); // 35 minutes in seconds
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Rotating testimonials
  const proTestimonials = [
    {
      name: "Sarah M.",
      role: "Data Scientist at Google",
      quote: "The daily job alerts helped me land my dream role. Pro users see opportunities 3 days before they go public!",
      savings: "$8,400/year"
    },
    {
      name: "Alex K.",
      role: "Product Manager at Microsoft",
      quote: "The career news feed kept me ahead of industry trends. I knew about the PM boom before anyone else.",
      increase: "40% salary bump"
    },
    {
      name: "Jordan P.",
      role: "AI Engineer at Tesla",
      quote: "Being part of the Pro discussions connected me with my current mentor. The community is everything!",
      value: "Priceless networking"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % proTestimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // What Explorer users are missing (locked features)
  const lockedFeatures = [
    {
      icon: "🗞️",
      title: "Daily Career News & Discussions",
      description: "Join 2,000+ professionals discussing job market trends, salary negotiations, and career opportunities",
      social: "320 comments today",
      fomo: "You missed 47 hot discussions this week"
    },
    {
      icon: "🚨",
      title: "Real-Time Job Market Alerts",
      description: "Get instant notifications when companies in your field are hiring, before jobs go public",
      social: "156 alerts sent today",
      fomo: "Pro users saw 23 jobs you missed"
    },
    {
      icon: "🎯",
      title: "AI Career Roadmap Generator",
      description: "Personalized step-by-step career paths based on current market demand and your skills",
      social: "89% success rate",
      fomo: "Your peers are 3x more likely to land dream jobs"
    },
    {
      icon: "💬",
      title: "Expert Mentorship Network",
      description: "Connect with industry professionals who've been where you want to go",
      social: "500+ verified mentors",
      fomo: "Students with mentors earn $15K more on average"
    },
    {
      icon: "📊",
      title: "Salary Intelligence Dashboard",
      description: "Real-time compensation data, negotiation scripts, and offer comparison tools",
      social: "Updated hourly",
      fomo: "Pro users negotiate 24% higher salaries"
    },
    {
      icon: "🎓",
      title: "Exclusive Industry Insider Events",
      description: "Weekly virtual sessions with hiring managers, founders, and career experts",
      social: "Next: Meta PM shares hiring secrets",
      fomo: "Last week's Tesla event had 800+ attendees"
    }
  ];

  return (
    <div className="relative min-h-screen bg-dark-background">
      <BackgroundAnimation />
      <UserActivityToast />
      <ActiveUsersBanner className="hidden md:block" />

      <main className="relative z-10">
        {/* Hero Section - Personalized for Explorer */}
        <div className="min-h-screen relative flex flex-col justify-center items-center pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
            
            {/* Urgency Timer */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/40 rounded-xl p-4 mb-8 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-white mb-2">
                  🔥 Limited Time: Free Pro Upgrade for Explorer Users!
                </h2>
                <div className="text-4xl font-bold text-red-400 mb-2">
                  {formatTime(timeLeft)}
                </div>
                <p className="text-gray-300">
                  ⏰ {Math.floor(timeLeft / 60)} minutes left on free upgrade • Join {user?.firstName || 'Student'} and 2,000+ professionals
                </p>
              </div>
            </motion.div>

            {/* Personalized Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1]">
                Hey {user?.firstName || 'Explorer'}! 👋
              </h1>
              <div className="text-2xl md:text-3xl text-white font-semibold mb-4">
                You're doing great with Explorer, but...
              </div>
              <div className="text-xl md:text-2xl text-[#71ADBA] font-medium">
                Pro users are landing opportunities <span className="text-[#EDEAB1] font-bold">3x faster</span> and earning <span className="text-green-400 font-bold">24% more</span>
              </div>
            </motion.div>

            {/* Rotating Testimonials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#1a2234]/50 rounded-xl p-6 border border-[#71ADBA]/20 mb-8 min-h-[160px] flex items-center"
            >
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="w-full text-center"
              >
                <div className="text-lg text-gray-300 mb-3 italic">
                  "{proTestimonials[currentTestimonial].quote}"
                </div>
                <div className="text-[#71ADBA] font-semibold">
                  {proTestimonials[currentTestimonial].name}, {proTestimonials[currentTestimonial].role}
                </div>
                <div className="text-green-400 font-bold text-sm mt-1">
                  💰 {proTestimonials[currentTestimonial].savings || proTestimonials[currentTestimonial].increase || proTestimonials[currentTestimonial].value}
                </div>
              </motion.div>
            </motion.div>

            {/* Primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="space-y-6"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => navigate('/signup/pro')}
                  className="inline-flex items-center gap-3 px-12 py-5 rounded-full bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white text-2xl font-bold shadow-lg hover:scale-105 transition-transform duration-200"
                >
                  <WorkspacePremiumIcon className="w-8 h-8" />
                  Upgrade to Pro - FREE Today
                </button>
                
                <button
                  onClick={() => navigate('/explorer-dashboard')}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full border-2 border-[#71ADBA] text-[#71ADBA] text-lg font-semibold hover:bg-[#71ADBA] hover:text-white transition-all duration-200"
                >
                  Check out Dashboard →
                </button>
              </div>
              
              <div className="text-sm text-gray-400">
                ✨ No credit card required • 🚀 Instant access to all Pro features
              </div>
            </motion.div>
          </div>
        </div>

        {/* What You're Missing Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative py-20 bg-gradient-to-b from-[rgba(113,173,186,0.03)] to-transparent"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                What You're Missing Out On 😱
              </h2>
              <p className="text-xl text-gray-300">
                While you've been exploring, Pro users have been securing their futures
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {lockedFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative bg-[#1a2234]/50 rounded-xl p-6 border border-[#71ADBA]/20 hover:border-[#71ADBA]/40 transition-colors group"
                >
                  {/* Lock Overlay */}
                  <div className="absolute top-4 right-4">
                    <LockIcon className="w-6 h-6 text-gray-400 group-hover:text-[#71ADBA] transition-colors" />
                  </div>
                  
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm">{feature.description}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded">
                      📊 {feature.social}
                    </div>
                    <div className="text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded">
                      😰 {feature.fomo}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => navigate('/signup/pro')}
                    className="w-full bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 border border-[#71ADBA]/30 text-[#71ADBA] px-4 py-2 rounded-lg font-semibold hover:bg-[#71ADBA]/30 transition-colors"
                  >
                    Unlock Feature
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* News Feed Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative py-20"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                🗞️ Career Discussions You're Missing
              </h2>
              <p className="text-xl text-gray-300">
                Pro users are having career-changing conversations right now
              </p>
            </div>

            <NewsFeeds isPreview={true} isLocked={true} />
          </div>
        </motion.div>

        {/* Social Proof & Urgency */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative py-20 bg-gradient-to-b from-[rgba(156,113,186,0.03)] to-transparent"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Why Pro Users Are Dominating 🏆
              </h2>
              <p className="text-xl text-gray-300">
                The data doesn't lie - Pro users are winning
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#71ADBA] mb-2">3x</div>
                <div className="text-gray-400">Faster job placement</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">24%</div>
                <div className="text-gray-400">Higher salaries</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#EDEAB1] mb-2">89%</div>
                <div className="text-gray-400">Land dream jobs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">2,000+</div>
                <div className="text-gray-400">Active professionals</div>
              </div>
            </div>

            {/* Final Push */}
            <div className="bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 rounded-xl p-8 border border-[#71ADBA]/30 text-center">
              <h3 className="text-3xl font-bold text-white mb-4">
                Don't Get Left Behind, {user?.firstName || 'Explorer'}! 🚨
              </h3>
              <p className="text-xl text-gray-300 mb-6">
                While you're waiting, Pro users are networking, learning, and landing opportunities.
                Your career can't wait - upgrade now before this offer expires!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-6">
                <button
                  onClick={() => navigate('/signup/pro')}
                  className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-12 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform"
                >
                  Claim Your Pro Upgrade - FREE
                </button>
                <button
                  onClick={() => navigate('/explorer-dashboard')}
                  className="border border-gray-500 text-gray-400 px-8 py-3 rounded-full font-semibold hover:border-gray-300 hover:text-gray-300 transition-colors"
                >
                  Maybe Later (Stay Explorer)
                </button>
              </div>
              
              <div className="text-sm text-gray-400">
                ⏰ Free upgrade expires in {formatTime(timeLeft)} • 💎 No credit card required
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ExplorerLandingPage; 