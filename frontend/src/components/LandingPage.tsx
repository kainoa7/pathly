import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useAnimation } from 'framer-motion';
import CompanyLogos from './CompanyLogos';
import HowItWorks from './HowItWorks';
import VideoShowcase from './VideoShowcase';
import ActiveUsersBanner from './ActiveUsersBanner';
import QuickStatsCarousel from './QuickStatsCarousel';
import BackgroundAnimation from './BackgroundAnimation';
import UserActivityToast from './UserActivityToast';
import MobileAppVoting from './MobileAppVoting';
import RemainingSpots from './RemainingSpots';
import CommunityGrowthSection from './CommunityGrowthSection';
import NewsFeeds from './NewsFeeds';
import BetaSignupForm from './BetaSignupForm';
import FeedbackWidget from './FeedbackWidget';
import { useEffect, useState, useRef } from 'react';
import Analytics from '../utils/analytics';
import PeopleIcon from '@mui/icons-material/People';
import ForumIcon from '@mui/icons-material/Forum';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WorkIcon from '@mui/icons-material/Work';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LockIcon from '@mui/icons-material/Lock';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import WhatshotIcon from '@mui/icons-material/Whatshot';

const FloatingShape = ({ delay = 0, className = "", scale = 1 }) => (
  <motion.div
    className={`absolute rounded-full mix-blend-screen filter blur-xl ${className}`}
    animate={{
      y: ["0%", "-50%", "0%"],
      scale: [scale, scale * 1.2, scale],
      opacity: [0.3, 0.5, 0.3]
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
  />
);

const GradientOrb = ({ className = "", initialPosition = { x: 0, y: 0 } }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) * 0.1);
    mouseY.set((e.clientY - centerY) * 0.1);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className={`absolute rounded-full opacity-30 mix-blend-screen filter blur-3xl ${className}`}
      style={{ x, y }}
      initial={initialPosition}
    />
  );
};

const TypewriterText = ({ texts }: { texts: string[] }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isDeleting) {
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        } else {
          setCurrentText(prev => prev.slice(0, -1));
        }
      } else {
        const fullText = texts[currentTextIndex];
        if (currentText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        } else {
          setCurrentText(prev => fullText.slice(0, prev.length + 1));
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts]);

  return <span>{currentText}</span>;
};

// Real-time Stats Component
const RealTimeStats = () => {
  const [stats, setStats] = useState({
    activeUsers: 1247,
    careersMatched: 8956,
    companiesPartners: 234,
    successRate: 94
  });

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
    >
      <div className="text-center">
        <motion.div
          key={stats.activeUsers}
          initial={{ scale: 1.2, color: "#71ADBA" }}
          animate={{ scale: 1, color: "#FFFFFF" }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold mb-2"
        >
          {stats.activeUsers.toLocaleString()}
        </motion.div>
        <div className="text-gray-400 text-sm">Active Students</div>
      </div>
      
      <div className="text-center">
        <motion.div
          key={stats.careersMatched}
          initial={{ scale: 1.2, color: "#9C71BA" }}
          animate={{ scale: 1, color: "#FFFFFF" }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold mb-2"
        >
          {stats.careersMatched.toLocaleString()}
        </motion.div>
        <div className="text-gray-400 text-sm">Careers Matched</div>
      </div>
      
      <div className="text-center">
        <motion.div
          key={stats.companiesPartners}
          initial={{ scale: 1.2, color: "#EDEAB1" }}
          animate={{ scale: 1, color: "#FFFFFF" }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold mb-2"
        >
          {stats.companiesPartners}+
        </motion.div>
        <div className="text-gray-400 text-sm">Partner Companies</div>
      </div>
      
      <div className="text-center">
        <motion.div
          key={stats.successRate}
          initial={{ scale: 1.2, color: "#71ADBA" }}
          animate={{ scale: 1, color: "#FFFFFF" }}
          transition={{ duration: 0.3 }}
          className="text-3xl font-bold mb-2"
        >
          {stats.successRate.toFixed(1)}%
        </motion.div>
        <div className="text-gray-400 text-sm">Success Rate</div>
      </div>
    </motion.div>
  );
};

// Live Career Insights Feed
const LiveCareerInsights = () => {
  const [insights] = useState([
    {
      title: "AI Engineer roles up 156% this month",
      icon: "🚀",
      trend: "hot",
      timestamp: "2 mins ago"
    },
    {
      title: "Remote positions reach all-time high",
      icon: "🏠",
      trend: "rising",
      timestamp: "5 mins ago"
    },
    {
      title: "Tech salary negotiations hitting $180k avg",
      icon: "💰",
      trend: "hot",
      timestamp: "8 mins ago"
    }
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5 }}
      className="bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-2xl p-6 border border-[#71ADBA]/20"
    >
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        📊 Live Career Market
      </h3>
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 + index * 0.2 }}
            className="flex items-center gap-3 p-3 bg-dark-background/50 rounded-lg"
          >
            <div className="text-2xl">{insight.icon}</div>
            <div className="flex-1">
              <div className="text-white font-medium text-sm">{insight.title}</div>
              <div className="text-gray-400 text-xs">{insight.timestamp}</div>
            </div>
            <div className={`px-2 py-1 rounded text-xs font-bold ${
              insight.trend === 'hot' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
            }`}>
              {insight.trend === 'hot' ? '🔥' : '📈'}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Personalized Quick Actions
const QuickActions = () => {
  const navigate = useNavigate();
  
  const actions = [
    {
      title: "Take Career Quiz",
      description: "Discover your perfect career path",
      icon: "🎯",
      action: () => navigate('/quiz'),
      color: "from-blue-500/20 to-purple-500/20",
      border: "border-blue-500/30"
    },
    {
      title: "Explore Salaries",
      description: "Compare career earnings",
      icon: "💰",
      action: () => navigate('/analytics'),
      color: "from-green-500/20 to-emerald-500/20",
      border: "border-green-500/30"
    },
    {
      title: "Company Research",
      description: "Find your dream workplace",
      icon: "🏢",
      action: () => navigate('/companies'),
      color: "from-orange-500/20 to-red-500/20",
      border: "border-orange-500/30"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {actions.map((action, index) => (
        <motion.button
          key={index}
          onClick={action.action}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-4 rounded-xl border transition-all duration-300 ${action.color} ${action.border} hover:border-opacity-60`}
        >
          <div className="text-3xl mb-2">{action.icon}</div>
          <h4 className="text-white font-semibold mb-1">{action.title}</h4>
          <p className="text-gray-400 text-sm">{action.description}</p>
        </motion.button>
      ))}
    </motion.div>
  );
};

const ScrollIndicator = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-50 bg-[#1a2234]/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-[#71ADBA]/20 hidden md:flex"
      onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
    >
      <span className="text-gray-400 text-sm">Scroll to explore</span>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-6 h-6 text-[#EDEAB1]"
      >
        ↓
      </motion.div>
    </motion.div>
  );
};

interface FloatingElement {
  text: string;
  icon: string;
  position: { top: string; left: string };
}

const LandingPage = () => {
  const navigate = useNavigate();
  const [showBetaSignup, setShowBetaSignup] = useState(false);
  const controls = useAnimation();

  // Dynamic floating messages
  const messages = [
    { text: "Just got into Stanford CS!", icon: "🎓" },
    { text: "Tesla internship secured!", icon: "⚡" },
    { text: "96% ATS score achieved!", icon: "📈" },
    { text: "Meta interview scheduled!", icon: "💼" },
    { text: "Salary negotiated to $125k!", icon: "💰" },
    { text: "Google SWE offer received!", icon: "🚀" },
    { text: "Dream job at Netflix!", icon: "🎬" },
    { text: "Microsoft PM role landed!", icon: "💻" },
    { text: "Startup equity offer!", icon: "🌟" },
    { text: "Remote work approved!", icon: "🏠" }
  ];

  const positions = [
    { top: "15%", left: "10%" },
    { top: "25%", left: "85%" },
    { top: "45%", left: "15%" },
    { top: "60%", left: "80%" },
    { top: "75%", left: "20%" },
  ];

  const getRandomMessages = () => {
    const elements: FloatingElement[] = [];
    const usedIndices = new Set<number>();
    
    positions.forEach((pos) => {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * messages.length);
      } while (usedIndices.has(randomIndex));
      
      usedIndices.add(randomIndex);
      elements.push({
        text: messages[randomIndex].text,
        icon: messages[randomIndex].icon,
        position: pos
      });
    });

    return elements;
  };

  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>(getRandomMessages());

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      setFloatingElements(getRandomMessages());
    }, 3000);

    const interval = setInterval(() => {
      setFloatingElements(getRandomMessages());
    }, 7000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    });
  }, [controls]);

  return (
    <div className="relative min-h-screen bg-dark-background">
      <BackgroundAnimation />
      
      <UserActivityToast />
      <ActiveUsersBanner className="hidden md:block" />

      <main className="relative z-10">
        {/* Enhanced Hero Section with Dashboard Elements */}
        <div className="min-h-screen relative flex flex-col justify-center items-center pt-32 pb-16">
          
          {/* Floating Success Messages */}
          {floatingElements.map((element, index) => (
            <motion.div
              key={index}
              className="absolute bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 backdrop-blur-sm px-4 py-2 rounded-full border border-[#71ADBA]/30 text-sm text-white hidden lg:block"
              style={{ top: element.position.top, left: element.position.left }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <span className="mr-2">{element.icon}</span>
              {element.text}
            </motion.div>
          ))}

          {/* Main Hero Content */}
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative text-center">
            
            {/* Hero Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1]"
            >
              Your AI Career Command Center
            </motion.h1>

            {/* Dynamic Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl text-[#71ADBA] font-semibold mb-8 tracking-wide"
            >
              Real-time career insights • Live job market data • AI-powered guidance
            </motion.div>

            {/* Live Stats */}
            <RealTimeStats />

            {/* Dynamic Typewriter */}
            <div className="text-lg md:text-xl text-gray-300 font-medium mb-12 h-16 flex items-center justify-center">
              <TypewriterText texts={[
                "Watch live as students land their dream jobs with JARVUS AI",
                "See real-time salary trends and career opportunities",
                "Join the AI-powered career revolution happening right now"
              ]} />
            </div>

            {/* Single Primary CTA */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              onClick={() => navigate('/jarvus-ai-demo')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-12 py-6 rounded-full bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white text-xl font-bold shadow-2xl hover:shadow-[#71ADBA]/25 transition-all duration-300 mb-12"
            >
              🚀 Launch JARVUS AI
            </motion.button>

            {/* Dashboard-like Quick Actions */}
            <QuickActions />
          </div>

          {/* Live Insights Sidebar */}
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-80 hidden xl:block">
            <LiveCareerInsights />
          </div>
        </div>

        {/* Content Sections */}
        <div className="relative z-10">
          {/* How It Works Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative py-24"
          >
            <HowItWorks />
          </motion.div>
          
          {/* Company Logos Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="py-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(113,173,186,0.03)] to-transparent pointer-events-none" />
            <CompanyLogos />
          </motion.div>
          
          {/* Video Showcase Section */}
          <VideoShowcase />

          {/* Personalized CTA for Different User Types */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative py-24 bg-gradient-to-b from-[rgba(113,173,186,0.03)] to-transparent"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Join Your Career Revolution 🎯
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  Choose your path to career success with JARVUS AI
                </p>
              </div>

              {/* Personalized Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {/* For Students */}
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl p-8 border border-blue-500/20 text-center">
                  <div className="text-5xl mb-4">🎓</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Current Students</h3>
                  <p className="text-gray-300 mb-6">Get AI-powered career guidance, major selection help, and internship strategies.</p>
                  <button
                    onClick={() => navigate('/signup/explorer')}
                    className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
                  >
                    Start Free Journey
                  </button>
                </div>

                {/* For Career Changers */}
                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl p-8 border border-green-500/20 text-center">
                  <div className="text-5xl mb-4">🔄</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Career Changers</h3>
                  <p className="text-gray-300 mb-6">Transition smoothly with AI insights, skill mapping, and industry analysis.</p>
                  <button
                    onClick={() => navigate('/signup/pro')}
                    className="w-full py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
                  >
                    Unlock Pro Features
                  </button>
                </div>

                {/* For Job Seekers */}
                <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl p-8 border border-orange-500/20 text-center">
                  <div className="text-5xl mb-4">💼</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Active Job Seekers</h3>
                  <p className="text-gray-300 mb-6">Optimize applications, track opportunities, and ace interviews with AI.</p>
                  <button
                    onClick={() => setShowBetaSignup(true)}
                    className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:opacity-90 transition-opacity"
                  >
                    Get Early Access
                  </button>
                </div>
              </div>

              {/* Community Stats */}
              <div className="text-center">
                <div className="inline-flex items-center gap-8 bg-dark-backgroundSecondary/50 backdrop-blur-sm px-8 py-4 rounded-2xl border border-[#71ADBA]/20">
                  <div className="flex items-center gap-2 text-[#71ADBA]">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="font-semibold">3,247 students active now</span>
                  </div>
                  <div className="text-gray-400">•</div>
                  <div className="text-gray-300">
                    <span className="font-semibold text-[#9C71BA]">156 offers</span> negotiated this week
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <ScrollIndicator />

      {/* Beta Signup Modal */}
      {showBetaSignup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <BetaSignupForm
              source="landing_page_personalized_cta"
              onSuccess={() => {
                setShowBetaSignup(false);
              }}
              onClose={() => setShowBetaSignup(false)}
            />
          </div>
        </div>
      )}

      {/* Feedback Widget */}
      <FeedbackWidget 
        onSubmit={(feedback) => {
          console.log('Feedback submitted:', feedback);
          Analytics.track('Feedback Submitted', {
            voteType: feedback.voteType,
            hasComment: !!feedback.feedback,
            source: 'landing_page_widget'
          });
        }}
      />
    </div>
  );
};

export default LandingPage; 