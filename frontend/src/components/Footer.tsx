import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const location = useLocation();

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

  // Determine background theme based on current page
  const getFooterTheme = () => {
    if (location.pathname === '/about') {
      return {
        background: 'bg-black',
        border: 'border-cyan-500/20',
        description: 'black theme for about page'
      };
    }
    
    // Default theme for landing page and other pages
    return {
      background: 'bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900',
      border: 'border-purple-500/20',
      description: 'purple theme for landing and other pages'
    };
  };

  const theme = getFooterTheme();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) return;

    try {
      // Analytics tracking
      Analytics.track('newsletter_signup', {
        email: email,
        source: 'footer',
        timestamp: new Date().toISOString()
      });

      // Here you would typically send to your backend/email service
      console.log('Newsletter signup:', email);
      
      setIsSubmitted(true);
      setEmail('');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error('Newsletter signup error:', error);
    }
  };

  const handleSocialClick = (platform: string) => {
    Analytics.track('footer_social_click', {
      platform,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <footer className={`relative ${theme.background} border-t ${theme.border} overflow-hidden`}>
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
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Large floating orbs */}
        <motion.div 
          className="absolute top-10 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.8, 0.4],
            x: [0, -25, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Mouse-following particle */}
      <motion.div
        className="absolute w-2 h-2 bg-cyan-400 rounded-full pointer-events-none opacity-30"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
        }}
      />

      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Section */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex items-center space-x-3 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div 
                className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center"
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(0, 255, 255, 0.3)',
                    '0 0 30px rgba(0, 255, 255, 0.5)',
                    '0 0 20px rgba(0, 255, 255, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FontAwesomeIcon icon={faRobot} className="text-white text-lg" />
              </motion.div>
              <h3 className="text-2xl font-bold text-white">JARVUS</h3>
            </motion.div>
            
            <motion.p 
              className="text-gray-400 text-sm mb-6 leading-relaxed"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              AI-powered career guidance, personalized roadmaps, and intelligent decision-making tools.
            </motion.p>
            
            {/* Floating Social Icons */}
            <div className="flex space-x-4">
              {[
                { icon: faGlobe, href: "https://linkedin.com", platform: "linkedin" },
                { icon: faEnvelope, href: "https://twitter.com", platform: "twitter" },
                { icon: faRobot, href: "https://discord.com", platform: "discord" }
              ].map((social, index) => (
                <motion.a
                  key={social.platform}
                  href={social.href}
                  onClick={() => handleSocialClick(social.platform)}
                  className="w-10 h-10 bg-slate-800/50 border border-cyan-500/30 rounded-lg flex items-center justify-center hover:border-cyan-400/50 transition-all backdrop-blur-sm group"
                  whileHover={{ 
                    scale: 1.1,
                    y: -2,
                    boxShadow: '0 10px 20px rgba(0, 255, 255, 0.3)'
                  }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    y: [0, -3, 0],
                  }}
                  transition={{
                    y: { 
                      duration: 2 + index * 0.3, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.2 
                    }
                  }}
                >
                  <FontAwesomeIcon 
                    icon={social.icon} 
                    className="text-gray-400 group-hover:text-cyan-400 transition-colors" 
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <motion.h4 
              className="text-lg font-semibold text-white mb-6 flex items-center"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <FontAwesomeIcon icon={faChartLine} className="text-cyan-400 mr-2" />
              Quick Links
            </motion.h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "Career Quiz", href: "/quiz" },
                { label: "Career Roadmap", href: "/career-roadmap" },
                { label: "Major Selection", href: "/onboarding" },
                { label: "Resume Builder", href: "/resume-builder" },
                { label: "Resume Review", href: "/resume-review" }
              ].map((link, index) => (
                <motion.li 
                  key={link.label}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link 
                    to={link.href}
                    className="text-gray-400 hover:text-cyan-400 transition-colors text-sm flex items-center group"
                  >
                    <motion.span
                      className="w-1 h-1 bg-cyan-400 rounded-full mr-2 opacity-0 group-hover:opacity-100"
                      animate={{ scale: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: index * 0.1 }}
                    />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* JARVUS AI Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.h4 
              className="text-lg font-semibold text-white mb-6 flex items-center"
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <FontAwesomeIcon icon={faRobot} className="text-cyan-400 mr-2" />
              </motion.div>
              JARVUS AI Preview
            </motion.h4>
            
            <div className="space-y-4">
              {[
                { icon: faBrain, title: "Smart Career Guidance", subtitle: "AI-powered recommendations" },
                { icon: faMicrophone, title: "Voice Interaction", subtitle: "Speak naturally to AI" },
                { icon: faVolumeHigh, title: "AI Voice Responses", subtitle: "Natural speech synthesis" },
                { icon: faCog, title: "Personality Modes", subtitle: "4 unique AI personalities" }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex items-center space-x-3 p-3 bg-slate-800/30 rounded-lg border border-cyan-500/20 backdrop-blur-sm"
                  whileHover={{ 
                    backgroundColor: 'rgba(0, 255, 255, 0.05)',
                    borderColor: 'rgba(0, 255, 255, 0.3)'
                  }}
                  animate={{
                    y: [0, -1, 0],
                  }}
                  transition={{
                    y: { 
                      duration: 3 + index * 0.2, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.3 
                    }
                  }}
                >
                  <motion.div 
                    className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0"
                    animate={{ 
                      boxShadow: [
                        '0 0 10px rgba(0, 255, 255, 0.3)',
                        '0 0 20px rgba(0, 255, 255, 0.5)',
                        '0 0 10px rgba(0, 255, 255, 0.3)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    <FontAwesomeIcon icon={feature.icon} className="text-white text-sm" />
                  </motion.div>
                  <div>
                    <div className="text-white text-sm font-medium">{feature.title}</div>
                    <div className="text-gray-400 text-xs">{feature.subtitle}</div>
                  </div>
                </motion.div>
              ))}
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link 
                  to="/ai-assistant"
                  className="block w-full text-center py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold transition-all hover:shadow-lg hover:shadow-cyan-500/25"
                >
                  <FontAwesomeIcon icon={faRocket} className="mr-2" />
                  Try JARVUS AI Now →
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Founding Member Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="bg-slate-800/30 rounded-xl p-6 border border-cyan-500/20 backdrop-blur-sm relative overflow-hidden"
              whileHover={{ borderColor: 'rgba(0, 255, 255, 0.4)' }}
            >
              {/* Floating badge */}
              <motion.div 
                className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1 rounded-full"
                animate={{ 
                  y: [0, -2, 0],
                  boxShadow: [
                    '0 0 10px rgba(255, 193, 7, 0.3)',
                    '0 0 20px rgba(255, 193, 7, 0.5)',
                    '0 0 10px rgba(255, 193, 7, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                👑 EXCLUSIVE
              </motion.div>

              <motion.div 
                className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent text-xs font-semibold mb-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Limited Spots
              </motion.div>
              
              <h4 className="text-xl font-bold text-white mb-3 leading-tight">
                Help Shape the Future of
                <motion.span 
                  className="block text-cyan-400"
                  animate={{ y: [0, -1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  Career Intelligence
                </span>
              </h4>
              
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Join our exclusive founding member community and co-create the next generation of AI-powered career tools.
              </p>
              
              <ul className="text-gray-400 text-xs space-y-2 mb-6">
                <motion.li 
                  className="flex items-center"
                  animate={{ x: [0, 2, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                >
                  <span className="w-1 h-1 bg-cyan-400 rounded-full mr-2" />
                  Early access to JARVUS AI features
                </motion.li>
                <motion.li 
                  className="flex items-center"
                  animate={{ x: [0, 2, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <span className="w-1 h-1 bg-cyan-400 rounded-full mr-2" />
                  Behind-the-scenes AI development updates
                </motion.li>
                <motion.li 
                  className="flex items-center"
                  animate={{ x: [0, 2, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                >
                  <span className="w-1 h-1 bg-cyan-400 rounded-full mr-2" />
                  Direct input on AI assistant roadmap
                </motion.li>
              </ul>
              
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <motion.input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email for exclusive access"
                  className="w-full px-3 py-2 bg-slate-700/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:border-cyan-400/50 transition-all backdrop-blur-sm"
                  whileFocus={{ 
                    borderColor: 'rgba(0, 255, 255, 0.5)',
                    boxShadow: '0 0 10px rgba(0, 255, 255, 0.2)'
                  }}
                />
                
                <motion.button
                  type="submit"
                  disabled={isSubmitted}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 px-4 rounded-lg font-semibold text-sm disabled:opacity-50 transition-all"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 5px 15px rgba(0, 255, 255, 0.3)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  animate={isSubmitted ? { 
                    backgroundColor: ['#10b981', '#06b6d4', '#10b981']
                  } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <FontAwesomeIcon icon={faRocket} className="mr-2" />
                  {isSubmitted ? 'Welcome Aboard!' : 'Become a Founding Member'}
                </motion.button>
              </form>
              
              <motion.p 
                className="text-center text-gray-500 text-xs mt-3"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Join 500+ founding members shaping the future
              </motion.p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div 
          className="mt-16 pt-8 border-t border-cyan-500/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div 
              className="text-gray-400 text-sm"
              animate={{ y: [0, -1, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              © 2024 JARVUS. All rights reserved. Built with 💙 for ambitious professionals.
            </motion.div>
            
            <motion.div 
              className="flex space-x-6 text-sm"
              animate={{ y: [0, -1, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
              <Link to="/privacy" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Contact
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
