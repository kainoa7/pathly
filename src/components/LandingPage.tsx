import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useAnimation } from 'framer-motion';
import CompanyLogos from './CompanyLogos';
import InteractiveTestimonial from './InteractiveTestimonial';
import HowItWorks from './HowItWorks';
import CommunityStories from './CommunityStories';
import ActiveUsersBanner from './ActiveUsersBanner';
import QuickStatsCarousel from './QuickStatsCarousel';
import BackgroundAnimation from './BackgroundAnimation';
import UserActivityToast from './UserActivityToast';
import RemainingSpots from './RemainingSpots';
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

  return (
    <span className="text-[#EDEAB1]">{currentText}<span className="animate-pulse">|</span></span>
  );
};

const FloatingSuccessSnippet = ({ text, initialDelay = 0, position = { x: 0, y: 0 } }: { 
  text: string; 
  initialDelay?: number;
  position: { x: number; y: number };
}) => (
  <motion.div
    initial={{ opacity: 0, x: position.x, y: position.y }}
    animate={{ 
      opacity: [0, 1, 1, 0],
      x: [position.x, position.x + 30, position.x - 30, position.x],
      y: [position.y, position.y - 60, position.y - 100, position.y - 140],
    }}
    transition={{ 
      duration: 25,
      times: [0, 0.2, 0.8, 1],
      repeat: Infinity,
      delay: initialDelay,
      ease: "easeInOut"
    }}
    className="absolute bg-[#1a2234]/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-[#71ADBA]/20 shadow-lg"
  >
    <div className="flex items-center gap-2">
      <EmojiPeopleIcon className="w-5 h-5 text-[#EDEAB1]" />
      <span className="text-gray-300 text-sm whitespace-nowrap">{text}</span>
    </div>
  </motion.div>
);

const TrendingCareer = ({ career, delay = 0, position = { x: 0, y: 0 } }: { 
  career: string; 
  delay?: number;
  position?: { x: number; y: number };
}) => (
  <motion.div
    initial={{ opacity: 0, x: position.x, y: position.y }}
    animate={{ 
      opacity: [0.3, 0.6, 0.3],
      x: [position.x, position.x - 20, position.x],
      y: [position.y, position.y - 40, position.y],
      scale: [0.9, 1, 0.9]
    }}
    transition={{ 
      duration: 20,
      times: [0, 0.5, 1],
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    className="absolute inline-flex items-center gap-2 bg-[#1a2234]/60 backdrop-blur-sm px-6 py-3 rounded-2xl border border-[#71ADBA]/10 shadow-lg"
  >
    <WhatshotIcon className="w-5 h-5 text-[#EDEAB1]" />
    <span className="text-gray-300">{career}</span>
  </motion.div>
);

const WaitlistSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      Analytics.trackInteraction('waitlist_form', 'signup_submitted');
    } catch (error) {
      console.error('Error submitting to waitlist:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-navy-800/30">
      {/* Floating avatars in the background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [-20, 0, -20],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -left-4 top-1/4 w-12 h-12 rounded-full bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] blur-sm"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -right-4 top-1/3 w-10 h-10 rounded-full bg-gradient-to-r from-[#9C71BA] to-[#EDEAB1] blur-sm"
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto text-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] bg-clip-text text-transparent">
            Feeling stuck on your career path?
          </h2>
          <p className="text-xl text-gray-300">
            You're not alone. We've been there – trying to figure out what's next, 
            wondering if you're making the right choices.
          </p>
          <p className="text-lg text-[#EDEAB1]">
            To celebrate our 1000+ success stories, we're giving the next wave of students <span className="font-semibold">free access to all pro features</span> 🎉
          </p>
        </motion.div>

        <div className="max-w-md mx-auto relative">
          {!isSubmitted ? (
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 rounded-xl bg-navy-900/50 border border-[#71ADBA]/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#71ADBA]/50 transition-all duration-300 group-hover:border-[#71ADBA]/30"
                  required
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                className="relative w-full px-6 py-4 rounded-xl bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#71ADBA]/20 disabled:opacity-50 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={isHovered ? { x: '100%' } : { x: '-100%' }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                <span className="relative">
                  {isSubmitting ? 'Securing your spot...' : 'Get Early Access →'}
                </span>
              </motion.button>

              <div className="flex flex-col items-center space-y-3 text-sm">
                <div className="flex items-center justify-center space-x-2 text-gray-400">
                  <LockIcon className="w-4 h-4" />
                                     <span>Join the community that helped 1,000+ students land their dream roles</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RemainingSpots />
                </div>
              </div>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-navy-900/50 border border-[#71ADBA]/20 rounded-xl p-8 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#71ADBA]/10 via-[#9C71BA]/10 to-[#EDEAB1]/10"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <div className="relative">
                <h3 className="text-2xl font-bold text-[#EDEAB1] mb-4">
                  🎉 You're in!
                </h3>
                <p className="text-gray-300">
                  We'll let you know the moment your free pro access is ready. 
                  Get ready to unlock your potential!
                </p>
                <div className="flex justify-center space-x-6 mt-6">
                  <motion.a
                    href="https://twitter.com/pathly"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#EDEAB1] transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </motion.a>
                  <motion.a
                    href="https://instagram.com/pathly"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-[#EDEAB1] transition-colors"
                    whileHover={{ scale: 1.1 }}
                  >
                    <InstagramIcon className="w-6 h-6" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

const ScrollIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2, duration: 1 }}
    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
    onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
  >
    <span className="text-gray-400 text-sm">Scroll to explore</span>
    <motion.div
      animate={{
        y: [0, 10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="w-6 h-6 text-[#EDEAB1]"
    >
      ↓
    </motion.div>
  </motion.div>
);

const GrowingText = () => {
  const [text, setText] = useState('');
  const fullText = "Start growing.";
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.span
      className="block text-6xl md:text-8xl font-bold relative inline-block"
      animate={{
        scale: [1, 1.02, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.span
        className="bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] bg-clip-text text-transparent relative z-10 inline-block"
        animate={{
          textShadow: [
            "0 0 20px rgba(113, 173, 186, 0.8)",
            "0 0 40px rgba(156, 113, 186, 0.8)",
            "0 0 20px rgba(113, 173, 186, 0.8)"
          ]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {text}
        <motion.span 
          className="inline-block w-[3px] h-[1em] bg-[#EDEAB1] ml-1"
          animate={{
            opacity: [1, 0, 1],
            height: ["0.8em", "1em", "0.8em"]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.span>
      {/* Glowing background effect */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-xl opacity-50"
        style={{
          background: "radial-gradient(circle, rgba(113,173,186,0.3) 0%, rgba(156,113,186,0.3) 50%, rgba(237,234,177,0.3) 100%)"
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.span>
  );
};

interface AnimatedTextProps {
  text: string;
  delay?: number;
  gradient?: boolean;
  className?: string;
}

const AnimatedText = ({ text, delay = 0, gradient = false, className = "" }: AnimatedTextProps) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let currentIndex = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 100);
      
      return () => clearInterval(interval);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [text, delay]);

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: delay / 1000, ease: "easeOut" }}
    >
      <motion.span
        className={`inline-block ${gradient ? 'bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] bg-clip-text text-transparent' : 'text-white'} pb-4`}
        animate={gradient ? {
          textShadow: [
            "0 0 20px rgba(113, 173, 186, 0.4)",
            "0 0 40px rgba(156, 113, 186, 0.4)",
            "0 0 20px rgba(113, 173, 186, 0.4)"
          ]
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {displayText}
      </motion.span>
      {displayText.length < text.length && (
        <motion.span 
          className={`inline-block w-[3px] h-[1em] ${gradient ? 'bg-[#EDEAB1]' : 'bg-white'} ml-1`}
          animate={{
            opacity: [1, 0, 1],
            height: ["0.8em", "1em", "0.8em"]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      {gradient && (
        <motion.div
          className="absolute inset-0 -z-10 rounded-xl opacity-50 pb-4"
          style={{
            background: "radial-gradient(circle, rgba(113,173,186,0.2) 0%, rgba(156,113,186,0.2) 50%, rgba(237,234,177,0.2) 100%)"
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
};

const AnimatedTagline = () => {
  return (
    <motion.div
      className="relative text-center space-y-8 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <AnimatedText 
        text="Stop scrolling." 
        className="text-5xl md:text-6xl font-bold"
        delay={0}
      />
      <AnimatedText 
        text="Start growing." 
        className="text-6xl md:text-7xl font-bold"
        delay={1000}
        gradient={true}
      />
    </motion.div>
  );
};

interface FloatingElement {
  type: 'success' | 'feature';
  text: string;
  icon: string;
  position: { x: number; y: number };
}

const LandingPage = () => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [userCount, setUserCount] = useState(3224); // Current active users

  const painPoints = [
    "tired of random career TikToks? 🤔",
    "feeling lost about your future? 😮‍💨",
    "want a career that actually hits? ⚡️"
  ];

  const trendingCareers = [
    "AI Developer 🤖",
    "Content Creator 📱",
    "Data Scientist 📊",
    "UX Designer 🎨"
  ];

  const messagePool = {
    success: [
      { text: "Alex switched majors and landed a 150k offer", icon: "🎯" },
      { text: "Maya got into her dream company today!", icon: "🌟" },
      { text: "Sam found their perfect tech role in 2 weeks", icon: "⚡" },
      { text: "Jordan increased their salary by 40%", icon: "💰" },
      { text: "Ava got accepted to her top-choice program", icon: "🎓" },
      { text: "Leo landed 3 interviews in his first week", icon: "🚀" },
      { text: "Kim discovered her passion in UX design", icon: "💡" },
      { text: "Dev got promoted after 6 months", icon: "📈" }
    ],
    feature: [
      { text: "AI-powered personalized roadmap", icon: "🤖" },
      { text: "1-on-1 career mentorship", icon: "👥" },
      { text: "Resume builder with AI feedback", icon: "📝" },
      { text: "Interview practice with AI", icon: "🎯" },
      { text: "Personalized skill assessments", icon: "📊" },
      { text: "Industry expert networking", icon: "🌐" },
      { text: "Career path visualization", icon: "🗺️" },
      { text: "Salary insights & negotiation tips", icon: "💼" }
    ]
  };

  // Fixed positions with better spacing to prevent overlapping
  const positions = [
    { x: -420, y: 180 },  // Far left top
    { x: 420, y: 220 },   // Far right top
    { x: -380, y: 380 },  // Left middle
    { x: 380, y: 420 },   // Right middle
    { x: -400, y: 580 },  // Left bottom
    { x: 400, y: 620 }    // Right bottom
  ];

  // Function to get random messages
  const getRandomMessages = () => {
    const messages: FloatingElement[] = [];
    const usedIndices = { success: new Set(), feature: new Set() };

    positions.forEach((pos, i) => {
      const type = i % 2 === 0 ? 'success' : 'feature';
      const pool = messagePool[type];
      let randomIndex;
      
      do {
        randomIndex = Math.floor(Math.random() * pool.length);
      } while (usedIndices[type].has(randomIndex));
      
      usedIndices[type].add(randomIndex);
      const message = pool[randomIndex];
      
      messages.push({
        type,
        text: message.text,
        icon: message.icon,
        position: pos
      });
    });

    return messages;
  };

  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>(getRandomMessages());

  // Refresh messages periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingElements(getRandomMessages());
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    });
  }, [controls]);

  return (
    <div className="relative bg-gradient-to-b from-navy-900 to-navy-950 overflow-x-hidden">
      {/* Background animations */}
      <BackgroundAnimation />
      
      {/* Activity Toasts */}
      <UserActivityToast />

      {/* User Counters - Only active users counter now */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-7xl mx-auto relative">
          <div className="absolute top-24 right-4 sm:right-6 lg:right-8">
            <ActiveUsersBanner initialCount={userCount} />
          </div>
        </div>
      </div>

      {/* Hero Section - Full Screen */}
      <div className="min-h-screen relative flex flex-col justify-center items-center">
        {/* Main Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center relative max-w-4xl mx-auto">
            {/* Floating Background Elements */}
            <div className="absolute inset-0 overflow-visible pointer-events-none">
              {/* Mixed Floating Elements */}
              {floatingElements.map((element, index) => (
                <motion.div
                  key={`${element.text}-${index}`}
                  initial={{ opacity: 0, x: element.position.x, y: element.position.y }}
                  animate={{ 
                    opacity: [0, 1, 1, 0],
                    x: [
                      element.position.x, 
                      element.position.x + (index % 2 ? 40 : -40), 
                      element.position.x - (index % 2 ? -40 : 40), 
                      element.position.x
                    ],
                    y: [
                      element.position.y, 
                      element.position.y - 80, 
                      element.position.y - 120, 
                      element.position.y - 160
                    ],
                  }}
                  transition={{ 
                    duration: 25,
                    times: [0, 0.2, 0.8, 1],
                    repeat: Infinity,
                    delay: index * 7,
                    ease: "easeInOut"
                  }}
                  className="absolute backdrop-blur-sm px-6 py-3 rounded-2xl border shadow-lg bg-[#1a2234]/80 border-[#71ADBA]/20"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#EDEAB1]">
                      {element.icon}
                    </span>
                    <span className="text-gray-300 text-sm whitespace-nowrap">
                      {element.text}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Rest of the content */}
            {/* Career Cards - Positioned further in background */}
            {trendingCareers.map((career, index) => (
              <TrendingCareer
                key={career}
                career={career}
                delay={index * 5 + 3}
                position={positions[index]}
              />
            ))}

            {/* AI Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16 relative z-10"
            >
              <span className="inline-flex items-center gap-2 bg-[#1a2234]/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-[#71ADBA]/20 shadow-lg">
                <AutoGraphIcon className="w-5 h-5 text-[#EDEAB1]" />
                <span className="text-gray-300">AI-powered career guidance that actually works</span>
              </span>
            </motion.div>

            {/* Main Content */}
            <div className="relative z-20">
              <AnimatedTagline />

              <motion.div 
                className="text-xl md:text-2xl text-gray-300 mb-16"
              >
                <TypewriterText texts={painPoints} />
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  onClick={() => navigate('/quiz')}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white font-semibold hover:opacity-90 transition-all shadow-lg flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  <span>Find Your Path</span>
                  <span className="text-2xl">→</span>
                </button>
                <button
                  onClick={() => navigate('/how-it-works')}
                  className="px-8 py-4 rounded-2xl bg-[#1a2234]/80 backdrop-blur-sm border border-[#71ADBA]/20 text-white font-semibold hover:bg-[#1a2234] transition-all shadow-lg w-full sm:w-auto"
                >
                  See How it Works
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <ScrollIndicator />
      </div>

      {/* Content Sections - Now only shown after scroll */}
      <div className="relative z-10">
        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative py-20"
        >
          <HowItWorks />
        </motion.div>

        {/* Company Logos Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="py-16 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(113,173,186,0.03)] to-transparent pointer-events-none" />
          <CompanyLogos />
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative py-20"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(156,113,186,0.03)] to-transparent pointer-events-none" />
          <InteractiveTestimonial />
        </motion.div>

        {/* Community Stories Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative py-20"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(113,173,186,0.03)] to-transparent pointer-events-none" />
          <CommunityStories />
        </motion.div>

        {/* Waitlist Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(156,113,186,0.03)] to-transparent pointer-events-none" />
          <WaitlistSection />
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage; 