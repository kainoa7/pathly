import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRocket, 
  faGraduationCap, 
  faChartLine, 
  faBrain,
  faUsers,
  faNewspaper,
  faUniversity,
  faLightbulb,
  faTrophy,
  faHeart,
  faFire,
  faStar,
  faArrowRight,
  faQuoteLeft,
  faCheck,
  faZap,
  faMagic,
  faBullseye,
  faDiamond,
  faRobot,
  faMicrophone,
  faVolumeHigh,
  faWaveSquare,
  faEye,
  faShield,
  faCog
} from '@fortawesome/free-solid-svg-icons';

const AboutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeFeature, setActiveFeature] = useState(0);
  const [stats, setStats] = useState({ users: 3247, matches: 8923, success: 94 });

  // Mouse tracking for floating effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 300 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 300 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Animate stats counter
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        users: prev.users + Math.floor(Math.random() * 3),
        matches: prev.matches + Math.floor(Math.random() * 5),
        success: Math.min(99, prev.success + Math.floor(Math.random() * 2))
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const platformFeatures = [
    {
      icon: faRobot,
      title: "JARVUS AI Assistant",
      description: "Premium AI assistant with voice interaction, personality modes, and intelligent conversations",
      highlight: "Premium feature",
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: faBrain,
      title: "AI-Powered Career Matching",
      description: "Smart algorithms analyze your interests, skills, and goals to find your perfect career path",
      highlight: "15+ industries covered",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: faNewspaper,
      title: "Daily News Hub (Pro)",
      description: "Stay ahead with curated news on Tech, Business, Finance, Sports & AI with social features",
      highlight: "Pro feature",
      color: "from-green-500 to-blue-600"
    },
    {
      icon: faUniversity,
      title: "University Directory",
      description: "Search 3,000+ universities with insider insights and student marketplace for dorm essentials",
      highlight: "Coming soon",
      color: "from-orange-500 to-red-600"
    }
  ];

  const aiFeatures = [
    {
      icon: faMicrophone,
      title: "Voice Interaction",
      description: "Speak naturally to JARVUS with advanced speech recognition",
      demo: "Try: 'What's on my calendar?'"
    },
    {
      icon: faVolumeHigh,
      title: "AI Voice Responses",
      description: "JARVUS speaks back with natural, human-like voice synthesis",
      demo: "ElevenLabs powered"
    },
    {
      icon: faCog,
      title: "Personality Modes",
      description: "Choose from Professional, Balanced, Casual, or Energetic personalities",
      demo: "4 unique AI personalities"
    },
    {
      icon: faBrain,
      title: "Smart Context",
      description: "Remembers your conversation history for intelligent follow-ups",
      demo: "Conversation memory"
    }
  ];

  const successStories = [
    {
      name: "Sarah Chen",
      before: "Lost CS student",
      after: "Google SWE Intern",
      quote: "JARVUS AI helped me realize my passion for AI. Got my dream internship in 6 months!",
      impact: "$8,400 scholarship"
    },
    {
      name: "Marcus Johnson",
      before: "Undecided major",
      after: "Finance at Goldman",
      quote: "The career matching was spot-on. Switched to finance and landed at Goldman Sachs.",
      impact: "$120k starting salary"
    },
    {
      name: "Emma Rodriguez",
      before: "Failed pre-med",
      after: "UX Designer at Meta",
      quote: "Thought I was stuck in medicine. JARVUS showed me design - now I'm at Meta!",
      impact: "Career pivot success"
    }
  ];

  const platformStats = [
    { icon: faUsers, number: stats.users, label: "Active Students", suffix: "+" },
    { icon: faTrophy, number: stats.matches, label: "Career Matches", suffix: "+" },
    { icon: faHeart, number: stats.success, label: "Success Rate", suffix: "%" },
    { icon: faUniversity, number: 150, label: "Universities", suffix: "+" }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Futuristic Animated Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 h-0.5 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.5, 0.5],
                x: [0, Math.random() * 30 - 15, 0],
                y: [0, Math.random() * 30 - 15, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Mouse-Following Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`mouse-${i}`}
              className="absolute w-1 h-1 bg-cyan-300 rounded-full"
              style={{
                x: smoothMouseX,
                y: smoothMouseY,
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        {/* Large Floating Glow Effects */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.6, 0.3, 0.6],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: [0, -5, 0]
            }}
            transition={{ 
              scale: { delay: 0.3, duration: 0.5 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
            className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-slate-900/40 border border-cyan-500/30 rounded-full backdrop-blur-sm"
          >
            <FontAwesomeIcon icon={faRobot} className="text-cyan-400" />
            <span className="text-white font-semibold">Meet JARVUS - Your AI Career Assistant</span>
            <FontAwesomeIcon icon={faRobot} className="text-cyan-400" />
          </motion.div>

          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              The Future of Career
            </span>
            <br />
            <span className="text-white">Intelligence is Here.</span>
          </motion.h1>

          <motion.p 
            className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            JARVUS is the AI-powered career platform that turns confused students into confident professionals. 
            <span className="text-cyan-400 font-semibold"> Talk to your AI assistant, get personalized guidance.</span>
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(user ? '/dashboard' : '/signup/explorer')}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white text-lg font-semibold transition-all"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <FontAwesomeIcon icon={faRocket} className="mr-2" />
              {user ? 'Meet JARVUS AI' : 'Start Free Today'}
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.05,
                borderColor: 'rgba(0, 255, 255, 0.8)',
                backgroundColor: 'rgba(0, 255, 255, 0.1)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/demo')}
              className="px-8 py-4 border border-cyan-500/50 rounded-xl text-cyan-400 text-lg font-semibold transition-all backdrop-blur-sm"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              See How It Works
            </motion.button>
          </div>
        </motion.div>

        {/* Live Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {platformStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                y: [0, -5, 0],
              }}
              transition={{ 
                opacity: { delay: 0.6 + index * 0.1 },
                scale: { delay: 0.6 + index * 0.1 },
                y: { 
                  duration: 3 + index * 0.3, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: index * 0.1 
                }
              }}
              whileHover={{ 
                scale: 1.05,
                y: -8,
                boxShadow: '0 15px 30px rgba(0, 255, 255, 0.2)'
              }}
              className="bg-slate-900/40 border border-cyan-500/20 rounded-xl p-6 text-center backdrop-blur-sm hover:border-cyan-400/40 transition-all relative overflow-hidden"
            >
              {/* Floating Background Glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-xl"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.01, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2
                }}
              />
              
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.3
                }}
              >
                <FontAwesomeIcon icon={stat.icon} className="text-cyan-400 text-2xl mb-3 relative z-10" />
              </motion.div>
              <div className="text-3xl font-bold text-white mb-1 relative z-10">
                {stat.number}{stat.suffix}
            </div>
              <div className="text-gray-400 text-sm relative z-10">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* What Makes Us Different */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              What Makes JARVUS Different?
            </motion.h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're not just another career quiz. We're your personal AI-powered career strategist.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: [0, -8, 0],
                }}
                transition={{ 
                  opacity: { delay: 0.8 + index * 0.1 },
                  y: { 
                    duration: 3.5 + index * 0.4, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: index * 0.3 
                  }
                }}
                onHoverStart={() => setActiveFeature(index)}
                whileHover={{ 
                  scale: 1.05, 
                  y: -12,
                  boxShadow: '0 20px 40px rgba(0, 255, 255, 0.2)'
                }}
                className="bg-slate-900/40 border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/40 transition-all group cursor-pointer backdrop-blur-sm relative overflow-hidden"
              >
                {/* Floating Background Glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.01, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.4
                  }}
                />

          <motion.div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform relative z-10`}
                  animate={{
                    rotate: [0, 5, -5, 0],
                    y: [0, -3, 0],
                  }}
                  transition={{
                    rotate: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 },
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }
                  }}
                >
                  <FontAwesomeIcon icon={feature.icon} className="text-white text-xl" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-3 relative z-10">{feature.title}</h3>
                <p className="text-gray-300 text-sm mb-3 relative z-10">{feature.description}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-400/10 rounded-full relative z-10">
                  <FontAwesomeIcon icon={faStar} className="text-cyan-400 text-xs" />
                  <span className="text-cyan-400 text-xs font-medium">{feature.highlight}</span>
              </div>
              </motion.div>
            ))}
            </div>
        </motion.div>

        {/* Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              Real Students, Real Success
            </motion.h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Don't just take our word for it. Here's how JARVUS changed these students' lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: [0, -6, 0],
                }}
                transition={{ 
                  opacity: { delay: 1.0 + index * 0.2 },
                  y: { 
                    duration: 4 + index * 0.3, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: index * 0.2 
                  }
                }}
                whileHover={{ 
                  scale: 1.03,
                  y: -10,
                  boxShadow: '0 25px 50px rgba(0, 255, 255, 0.15)'
                }}
                className="bg-slate-900/40 border border-cyan-500/20 rounded-xl p-6 relative overflow-hidden backdrop-blur-sm hover:border-cyan-400/40 transition-all"
              >
                {/* Floating Background Glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-xl"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.01, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                />

                <div className="absolute top-4 right-4 relative z-10">
                  <motion.div
                    animate={{
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.3
                    }}
                  >
                    <FontAwesomeIcon icon={faQuoteLeft} className="text-cyan-400/40 text-3xl" />
                  </motion.div>
                      </div>
                
                <div className="mb-4 relative z-10">
                  <h3 className="text-xl font-semibold text-white">{story.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{story.before}</span>
                    <FontAwesomeIcon icon={faArrowRight} className="text-cyan-400" />
                    <span className="text-cyan-400 font-medium">{story.after}</span>
                      </div>
                    </div>
                    
                <p className="text-gray-300 mb-4 italic relative z-10">"{story.quote}"</p>

                <div className="flex items-center justify-between relative z-10">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                                key={i}
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 20, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.1
                        }}
                      >
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400 text-sm" />
                      </motion.div>
                    ))}
                  </div>
                  <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-medium border border-green-500/30">
                    {story.impact}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Explorer vs Pro Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              Choose Your Adventure
            </motion.h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Start free with Explorer, or unlock the full JARVUS AI experience with Pro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Explorer */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                y: [0, -5, 0]
              }}
              transition={{ 
                opacity: { delay: 0.2 },
                x: { delay: 0.2 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              whileHover={{ 
                scale: 1.02,
                y: -8,
                boxShadow: '0 25px 50px rgba(0, 255, 255, 0.15)'
              }}
              className="bg-slate-900/40 border border-cyan-500/20 rounded-2xl p-8 relative backdrop-blur-sm hover:border-cyan-400/40 transition-all overflow-hidden"
            >
              {/* Floating Background Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.01, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <div className="text-center mb-6 relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">Explorer</h3>
                <div className="text-3xl font-bold text-cyan-400 mb-4">FREE</div>
                <p className="text-gray-300">Perfect for getting started</p>
              </div>

              <ul className="space-y-3 mb-8 relative z-10">
                {[
                  "AI Career Matching Quiz",
                  "Basic University Search", 
                  "General Career Insights",
                  "Community Access",
                  "Mobile Responsive"
                ].map((feature, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-center gap-3 text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <FontAwesomeIcon icon={faCheck} className="text-green-400" />
                    {feature}
                  </motion.li>
                ))}
              </ul>

              <motion.button
                onClick={() => navigate('/signup/explorer')}
                className="w-full py-3 border border-cyan-500/50 text-cyan-400 rounded-xl font-semibold hover:bg-cyan-500/10 transition-all backdrop-blur-sm relative z-10"
                whileHover={{ 
                  scale: 1.02,
                  borderColor: 'rgba(0, 255, 255, 0.8)',
                  backgroundColor: 'rgba(0, 255, 255, 0.1)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                Start Free
              </motion.button>
            </motion.div>

            {/* Pro */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                y: [0, -5, 0]
              }}
              transition={{ 
                opacity: { delay: 0.4 },
                x: { delay: 0.4 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
              }}
              whileHover={{ 
                scale: 1.02,
                y: -8,
                boxShadow: '0 25px 50px rgba(0, 255, 255, 0.25)'
              }}
              className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/40 rounded-2xl p-8 relative backdrop-blur-sm hover:border-cyan-400/60 transition-all overflow-hidden"
            >
              {/* Enhanced Floating Background Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl"
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <motion.div 
                className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold">
                  🤖 AI POWERED
                </div>
              </motion.div>

              <div className="text-center mb-6 relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <div className="text-3xl font-bold text-cyan-400 mb-4">FREE</div>
                <p className="text-gray-300">For serious career builders + AI access</p>
              </div>

              <ul className="space-y-3 mb-8 relative z-10">
                {[
                  "Everything in Explorer",
                  "🤖 JARVUS AI Assistant with Voice",
                  "Daily News Hub with Social Features",
                  "Advanced Career Analytics", 
                  "University Marketplace Access",
                  "Priority Support",
                  "Exclusive Community"
                ].map((feature, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-center gap-3 text-gray-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                  >
                    <FontAwesomeIcon icon={faCheck} className="text-cyan-400" />
                    {feature}
                  </motion.li>
                ))}
              </ul>

          <motion.button
                onClick={() => navigate(user?.accountType === 'EXPLORER' ? '/upgrade-to-pro' : '/signup/pro')}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold transition-all relative z-10"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <FontAwesomeIcon icon={faRobot} className="mr-2" />
                {user?.accountType === 'EXPLORER' ? 'Upgrade to Pro' : 'Get AI Access'}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mb-20"
        >
          <motion.div
            className="bg-slate-900/40 border border-cyan-500/30 rounded-2xl p-8 sm:p-12 text-center backdrop-blur-sm relative overflow-hidden"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{
              boxShadow: '0 0 50px rgba(0, 255, 255, 0.2)',
              borderColor: 'rgba(0, 255, 255, 0.5)'
            }}
          >
            {/* Floating Background Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-2xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.01, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.1, 1],
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <FontAwesomeIcon icon={faBullseye} className="text-cyan-400 text-4xl mb-6 relative z-10" />
            </motion.div>
            
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-white mb-6 relative z-10"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Our Mission
            </motion.h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-6 relative z-10">
              We believe every student deserves clarity, not confusion. Every dreamer deserves direction, not dead ends. 
              JARVUS exists to turn your biggest questions into your biggest breakthroughs through the power of AI.
            </p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              {['AI-Powered', 'Real Impact', 'Student-First', 'Always Free'].map((value, i) => (
                <motion.div 
                  key={i} 
                  className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-400 font-medium backdrop-blur-sm"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -2, 0]
                  }}
                  transition={{
                    opacity: { delay: 1.4 + i * 0.1 },
                    scale: { delay: 1.4 + i * 0.1 },
                    y: { duration: 2 + i * 0.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }
                  }}
            whileHover={{ scale: 1.05 }}
                >
                  <FontAwesomeIcon icon={faDiamond} className="mr-2" />
                  {value}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-center"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Ready to Meet Your AI Assistant?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          >
            Join {stats.users}+ students who've found their path with JARVUS AI. Your future self will thank you.
          </motion.p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(user ? (user.accountType === 'PRO' ? '/ai-assistant' : '/dashboard') : '/signup/explorer')}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white text-lg font-semibold transition-all"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <FontAwesomeIcon icon={faRobot} className="mr-2" />
              {user ? (user.accountType === 'PRO' ? 'Talk to JARVUS' : 'Continue Journey') : 'Start Your Journey'}
            </motion.button>
            
            <motion.button
              whileHover={{ 
                scale: 1.05,
                borderColor: 'rgba(0, 255, 255, 0.8)',
                backgroundColor: 'rgba(0, 255, 255, 0.1)'
              }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/onboarding')}
              className="px-8 py-4 border border-cyan-500/50 rounded-xl text-cyan-400 text-lg font-semibold transition-all backdrop-blur-sm"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              Take Career Quiz
            </motion.button>
          </div>
        </motion.div>

        {/* JARVUS AI Assistant Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              Meet JARVUS AI Assistant
            </motion.h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your personal AI assistant with voice interaction, intelligent conversations, and premium features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ 
                  opacity: 1, 
                  y: [0, -8, 0],
                }}
                transition={{
                  opacity: { delay: index * 0.1 },
                  y: { 
                    duration: 3 + index * 0.5, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: index * 0.2 
                  }
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -12,
                  boxShadow: '0 20px 40px rgba(0, 255, 255, 0.2)'
                }}
                className="bg-slate-900/40 border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm hover:border-cyan-400/40 transition-all group relative overflow-hidden"
              >
                {/* Floating Background Glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [1, 1.01, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3
                  }}
                />

                <motion.div 
                  className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-all"
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                >
                  <FontAwesomeIcon icon={feature.icon} className="text-white text-xl" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 text-sm mb-3">{feature.description}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-400/10 rounded-full">
                  <FontAwesomeIcon icon={faStar} className="text-cyan-400 text-xs" />
                  <span className="text-cyan-400 text-xs font-medium">{feature.demo}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* AI Demo Preview */}
          <motion.div
            className="bg-slate-900/40 border border-cyan-500/30 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            whileHover={{
              boxShadow: '0 0 40px rgba(0, 255, 255, 0.3)',
              borderColor: 'rgba(0, 255, 255, 0.5)'
            }}
          >
            {/* Floating Background Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-2xl"
              animate={{
                opacity: [0.2, 0.4, 0.2],
                scale: [1, 1.01, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <div className="relative z-10 text-center">
              <motion.div
                className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(0, 255, 255, 0.3)',
                    '0 0 40px rgba(0, 255, 255, 0.6)',
                    '0 0 20px rgba(0, 255, 255, 0.3)'
                  ],
                  y: [0, -10, 0]
                }}
                transition={{ 
                  boxShadow: { duration: 2, repeat: Infinity },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <FontAwesomeIcon icon={faRobot} className="text-white text-3xl" />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-white mb-4">Ready to Meet Your AI Assistant?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Experience the future of career guidance with JARVUS - your intelligent AI companion that understands, 
                remembers, and evolves with your needs.
              </p>
              
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 0 30px rgba(0, 255, 255, 0.6)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(user?.accountType === 'PRO' ? '/ai-assistant' : '/upgrade-to-pro')}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white text-lg font-semibold transition-all"
              >
                <FontAwesomeIcon icon={faRobot} className="mr-2" />
                {user?.accountType === 'PRO' ? 'Talk to JARVUS Now' : 'Upgrade for AI Access'}
          </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage; 