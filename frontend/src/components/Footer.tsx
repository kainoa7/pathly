import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRobot,
  faBrain,
  faChartLine,
  faMicrophone,
  faVolumeHigh,
  faCog,
  faQuoteLeft,
  faStar,
  faRocket,
  faEnvelope,
  faGlobe
} from '@fortawesome/free-solid-svg-icons';
import Analytics from '../utils/analytics';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [memberCount, setMemberCount] = useState(500);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

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

  // Fetch member count on component mount
  useEffect(() => {
    const fetchMemberCount = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/api/founding-members/count`);
        if (response.ok) {
          const data = await response.json();
          setMemberCount(data.count);
        }
      } catch (error) {
        console.error('Error fetching member count:', error);
      }
    };
    
    fetchMemberCount();
  }, []);

  const handleFoundingMemberSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage('Please enter your email address');
      setMessageType('error');
      return;
    }

    setIsSubmitting(true);
    setMessage('');
    
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/founding-members`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('🎉 Welcome to the founding members community!');
        setMessageType('success');
        setEmail('');
        setMemberCount(prev => prev + 1);
        
        // Track successful signup
        Analytics.track('founding_member_signup', {
          email: email.trim(),
          timestamp: new Date().toISOString()
        });
      } else {
        setMessage(data.message || 'Something went wrong. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('Network error. Please check your connection and try again.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialClick = (platform: string) => {
    Analytics.track('footer_social_click', {
      platform,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <footer className="relative bg-black border-t border-cyan-500/20 overflow-hidden">
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
          {[...Array(25)].map((_, i) => (
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
                x: [0, Math.random() * 20 - 10, 0],
                y: [0, Math.random() * 20 - 10, 0],
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
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`mouse-${i}`}
              className="absolute w-0.5 h-0.5 bg-cyan-300 rounded-full"
              style={{
                x: smoothMouseX,
                y: smoothMouseY,
              }}
              animate={{
                opacity: [0, 0.7, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
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
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 40, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: 1, 
              y: [0, -5, 0]
            }}
            transition={{ 
              opacity: { duration: 0.5 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <motion.div
              className="flex items-center space-x-3 mb-4 group"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div 
                className="relative w-10 h-10"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center relative z-10">
                  <FontAwesomeIcon icon={faRobot} className="text-white text-sm" />
                </div>
              </motion.div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                JARVUS
              </span>
            </motion.div>
            <p className="text-gray-300 mb-4 text-sm leading-relaxed">
              AI-powered career guidance, personalized roadmaps, and intelligent decision-making tools.
            </p>
            <div className="flex space-x-3">
              <motion.a
                href="https://linkedin.com/company/jarvus"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSocialClick('linkedin')}
                className="p-2 rounded-lg bg-slate-900/40 border border-cyan-500/20 hover:border-cyan-400/40 transition-all backdrop-blur-sm"
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>
              <motion.a
                href="https://twitter.com/jarvus"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSocialClick('twitter')}
                className="p-2 rounded-lg bg-slate-900/40 border border-cyan-500/20 hover:border-cyan-400/40 transition-all backdrop-blur-sm"
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                }}
              >
                <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </motion.a>
              <motion.a
                href="https://instagram.com/jarvus"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)'
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSocialClick('instagram')}
                className="p-2 rounded-lg bg-slate-900/40 border border-cyan-500/20 hover:border-cyan-400/40 transition-all backdrop-blur-sm"
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }}
              >
                <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.621 5.367 11.987 11.988 11.987 6.62 0 11.986-5.366 11.986-11.987C24.003 5.367 18.637.001 12.017.001zM8.449 16.988c-1.747 0-3.166-1.419-3.166-3.166s1.419-3.166 3.166-3.166 3.166 1.419 3.166 3.166-1.419 3.166-3.166 3.166zm7.718 0c-1.747 0-3.166-1.419-3.166-3.166s1.419-3.166 3.166-3.166 3.166 1.419 3.166 3.166-1.419 3.166-3.166 3.166z"/>
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: 1, 
              y: [0, -3, 0]
            }}
            transition={{ 
              opacity: { duration: 0.5, delay: 0.1 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
          >
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: "/about", label: "About Us" },
                { to: "/onboarding", label: "Career Quiz" },
                { to: "/career-roadmap", label: "Career Roadmap" },
                { to: "/major-selection", label: "Major Selection" },
                { to: "/resume-builder", label: "Resume Builder" },
                { to: "/resume-review", label: "Resume Review" }
              ].map((link, index) => (
                <motion.li
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Link 
                    to={link.to} 
                    className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center group text-sm"
                  >
                    <motion.span 
                      className="w-1 h-1 bg-cyan-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      animate={{
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* JARVUS AI Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: 1, 
              y: [0, -4, 0]
            }}
            transition={{ 
              opacity: { duration: 0.5, delay: 0.2 },
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            }}
          >
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent flex items-center gap-2">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                <FontAwesomeIcon icon={faRobot} className="text-cyan-400 text-base" />
              </motion.div>
              JARVUS AI Preview
            </h3>
            <ul className="space-y-3">
              {[
                { icon: faBrain, title: "Smart Career Guidance", subtitle: "AI-powered recommendations" },
                { icon: faMicrophone, title: "Voice Interaction", subtitle: "Speak naturally to AI" },
                { icon: faVolumeHigh, title: "AI Voice Responses", subtitle: "Natural speech synthesis" },
                { icon: faCog, title: "Personality Modes", subtitle: "4 unique AI personalities" }
              ].map((feature, index) => (
                <motion.li 
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    y: [0, -2, 0]
                  }}
                  transition={{ 
                    opacity: { delay: 0.3 + index * 0.1 },
                    x: { delay: 0.3 + index * 0.1 },
                    y: { duration: 3 + index * 0.3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }
                  }}
                  whileHover={{ 
                    x: 5,
                    scale: 1.02,
                    boxShadow: '0 5px 15px rgba(0, 255, 255, 0.1)'
                  }}
                  className="flex items-center space-x-3 p-2 rounded-lg bg-slate-900/40 border border-cyan-500/20 hover:border-cyan-400/40 transition-all backdrop-blur-sm relative overflow-hidden"
                >
                  {/* Floating Background Glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-lg"
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
                    animate={{
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2
                    }}
                  >
                    <FontAwesomeIcon icon={feature.icon} className="text-cyan-400 text-base relative z-10" />
                  </motion.div>
                  <div className="relative z-10">
                    <div className="text-gray-300 text-xs font-medium">{feature.title}</div>
                    <div className="text-gray-500 text-xs">{feature.subtitle}</div>
                  </div>
                </motion.li>
              ))}
            </ul>
            
            <motion.div 
              className="mt-4 p-3 rounded-lg bg-slate-900/40 border border-cyan-500/30 backdrop-blur-sm relative overflow-hidden"
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 0 25px rgba(0, 255, 255, 0.3)',
                borderColor: 'rgba(0, 255, 255, 0.5)'
              }}
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              {/* Floating Background Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-lg"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.01, 1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <Link 
                to="/ai-assistant" 
                className="text-center block text-cyan-400 font-medium hover:text-blue-400 transition-colors text-sm relative z-10"
              >
                <FontAwesomeIcon icon={faRocket} className="mr-2" />
                Try JARVUS AI Now →
              </Link>
            </motion.div>
          </motion.div>

          {/* Founding Members */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: 1, 
              y: [0, -6, 0]
            }}
            transition={{ 
              opacity: { duration: 0.5, delay: 0.3 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
            }}
          >
            {/* Premium glow effect */}
            <motion.div 
              className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-lg opacity-75"
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <div className="relative bg-slate-900/40 border border-cyan-500/30 rounded-xl p-4 backdrop-blur-sm overflow-hidden">
              {/* Floating Background Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-xl"
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

              {/* Exclusive badge */}
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <motion.span 
                  className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-full"
                  animate={{
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 0 10px rgba(255, 165, 0, 0.3)',
                      '0 0 20px rgba(255, 165, 0, 0.6)',
                      '0 0 10px rgba(255, 165, 0, 0.3)'
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  🤖 EXCLUSIVE
                </motion.span>
                <span className="text-xs text-cyan-400 font-medium">Limited Spots</span>
              </div>
              
              <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent relative z-10">
                Help Shape the Future of Career Intelligence
              </h3>
              <p className="text-gray-300 mb-3 text-xs leading-relaxed relative z-10">
                Join our exclusive founding member community and co-create the next generation of AI-powered career tools.
              </p>
              <div className="text-xs text-cyan-400 mb-3 space-y-1 relative z-10">
                {[
                  "Early access to JARVUS AI features",
                  "Behind-the-scenes AI development updates", 
                  "Direct input on AI assistant roadmap"
                ].map((benefit, index) => (
                  <motion.div 
                    key={benefit}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <motion.span 
                      className="w-1 h-1 bg-cyan-400 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.3
                      }}
                    />
                    <span>{benefit}</span>
                  </motion.div>
                ))}
              </div>
              
              <form onSubmit={handleFoundingMemberSignup} className="space-y-2 relative z-10">
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email for exclusive access"
                  className="w-full px-3 py-2 rounded-lg bg-black/60 border border-cyan-500/30 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 transition-all text-sm backdrop-blur-sm"
                  disabled={isSubmitting}
                  whileFocus={{
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
                    borderColor: 'rgba(0, 255, 255, 0.6)'
                  }}
                />
                <motion.button
                  type="submit"
                  whileHover={!isSubmitting ? { 
                    scale: 1.03, 
                    boxShadow: "0 0 25px rgba(0, 255, 255, 0.4)" 
                  } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold hover:opacity-95 transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                  disabled={isSubmitting}
                  animate={{
                    y: [0, -1, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isSubmitting ? (
                      <>
                        <motion.div 
                          className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Joining...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faRocket} />
                        Become a Founding Member
                      </>
                    )}
                  </span>
                </motion.button>
                
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-xs text-center p-2 rounded ${
                      messageType === 'success' 
                        ? 'text-green-400 bg-green-400/10 border border-green-400/20' 
                        : 'text-red-400 bg-red-400/10 border border-red-400/20'
                    }`}
                  >
                    {message}
                  </motion.div>
                )}
                
                <motion.p 
                  className="text-xs text-gray-500 text-center"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Join {memberCount.toLocaleString()}+ founding members shaping the future
                </motion.p>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="mt-8 pt-6 border-t border-cyan-500/20 text-center relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: [0, -2, 0]
          }}
          transition={{ 
            opacity: { duration: 0.5, delay: 0.4 },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }
          }}
        >
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-400 text-xs">
            <motion.p
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              &copy; {new Date().getFullYear()} JARVUS. All rights reserved.
            </motion.p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              {[
                { to: "/privacy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms of Service" },
                { to: "/contact", label: "Contact Us" }
              ].map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <Link 
                    to={link.to} 
                    className="hover:text-cyan-400 transition-colors relative group"
                  >
                    {link.label}
                    <motion.span
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"
                      whileHover={{ width: "100%" }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 