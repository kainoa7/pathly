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
import MobileAppVoting from './MobileAppVoting';
import RemainingSpots from './RemainingSpots';
import CommunityGrowthSection from './CommunityGrowthSection';
import NewsFeeds from './NewsFeeds';
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
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const validDomains = ['.com', '.edu', '.org', '.net', '.gov', '.io', '.dev'];
    const hasValidDomain = validDomains.some(domain => email.toLowerCase().endsWith(domain));
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    
    if (!hasValidDomain) {
      setEmailError('Please use a valid email domain (e.g. .com, .edu, .org)');
      return false;
    }

    setEmailError('');
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail) {
      validateEmail(newEmail);
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      return;
    }

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
            JARVUS AI is in beta — help us build the career discovery platform you actually want to use 🚀
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
                  onChange={handleEmailChange}
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 rounded-xl bg-[#1a2234]/90 border border-[#71ADBA]/20 text-white font-medium placeholder-gray-400 focus:outline-none focus:border-[#71ADBA]/50 transition-all duration-300 group-hover:border-[#71ADBA]/30 caret-white"
                  required
                />
                {emailError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-6 left-0 text-sm text-red-400"
                  >
                    {emailError}
                  </motion.div>
                )}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || !!emailError}
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
                <a 
                  href="https://twitter.com/jarvus" 
                  className="text-white/70 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-lg">
                    <path d="M24 4.557c-.883.398-1.836.657-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a 
                  href="https://instagram.com/jarvus" 
                  className="text-white/70 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                    <InstagramIcon className="w-6 h-6" />
                </a>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

const ScrollIndicator = () => {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
  <motion.div
      ref={ref}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2, duration: 1 }}
      style={{ opacity }}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-50 bg-[#1a2234]/90 backdrop-blur-md px-4 py-3 rounded-2xl border border-[#71ADBA]/20 hidden md:flex" // Hide on mobile, show on medium screens and up
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
};

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
  text: string;
  icon: string;
  position: {
    x: number;
    y: number;
  };
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

  // Message list matching UserActivityToast
  const messages = [
    { text: "Alex switched majors and landed a 150k offer", icon: "🎓" },
    { text: "Sarah found her dream internship", icon: "💼" },
    { text: "Mike discovered his career path", icon: "💡" },
    { text: "Emma matched with a mentor", icon: "👥" },
    { text: "James improved his resume score", icon: "💼" },
    { text: "Lisa got interview-ready", icon: "💡" },
    { text: "Maya got into her dream company today!", icon: "💼" },
    { text: "Anna found her perfect major", icon: "🎓" },
    { text: "Tom secured a tech interview", icon: "💼" },
    { text: "Rachel got career clarity", icon: "💡" }
  ];

  const positions = [
    { x: -420, y: 280 },
    { x: 420, y: 320 },
    { x: -380, y: 480 },
    { x: 380, y: 520 },
    { x: -400, y: 680 },
    { x: 400, y: 720 }
  ];

  // Function to get random messages
  const getRandomMessages = (): FloatingElement[] => {
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

  // Refresh messages every 7 seconds
  useEffect(() => {
    // Initial delay before starting
    const initialDelay = setTimeout(() => {
      setFloatingElements(getRandomMessages());
    }, 3000); // Show first message after 3 seconds

    // Update messages every 7 seconds
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
      
      {/* Activity Toasts */}
      <UserActivityToast />

      {/* Active Users Banner */}
      <ActiveUsersBanner className="hidden md:block" />

      <main className="relative z-10">
        {/* Hero Section - Full Screen */}
        <div className="min-h-screen relative flex flex-col justify-center items-center pt-32 pb-16">
          {/* Trending/Sidebar and background elements remain */}
          {/* Main Hero Content - SIMPLIFIED */}
          <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 relative text-center flex flex-col items-center justify-center" style={{ minHeight: '60vh' }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] text-center">
              Stuck picking a career?
            </h1>
            <div className="text-xl md:text-2xl text-[#71ADBA] font-semibold mb-6 text-center tracking-wide">
              We're building an AI career assistant that actually gets you.
            </div>
            <div className="text-lg md:text-xl text-gray-300 font-medium mb-12 h-24 flex items-center justify-center">
              <TypewriterText texts={[
                "No more endless Googling 'what career is right for me'",
                "Get matched with careers that fit your personality and goals",
                "Help us test if students actually want this AI career assistant"
              ]} />
            </div>
            {/* Primary CTA - Try the Demo */}
            <button
              onClick={() => navigate('/jarvus-ai-demo')}
              className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white text-xl font-bold shadow-lg hover:scale-105 transition-transform duration-200 mb-6"
            >
              <span role='img' aria-label='test' style={{ fontSize: '1.5rem', marginRight: '-0.25rem' }}>🧪</span>
              Try Our Demo — 2 Minutes
            </button>
            
            {/* Secondary CTA - Learn More */}
            <button
              onClick={() => navigate('/vision')}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-[#71ADBA] text-[#71ADBA] text-lg font-semibold hover:bg-[#71ADBA] hover:text-white transition-all duration-200 mb-6"
            >
              <span role='img' aria-label='eyes' style={{ fontSize: '1.2rem', marginRight: '-0.25rem' }}>👀</span>
              See What We're Building
            </button>
            
            <div className="mt-4 text-base text-[#EDEAB1] opacity-80 font-medium">
              We're testing the market — should we build this AI career assistant?
            </div>
            <div className="mt-4 flex items-center justify-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>2-minute demo</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>See career matches</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>Help shape the product</span>
              </div>
            </div>
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
          
          {/* Testimonials Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative py-24"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(156,113,186,0.03)] to-transparent pointer-events-none" />
            <InteractiveTestimonial />
          </motion.div>

          {/* Simple CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative py-24 bg-gradient-to-b from-[rgba(113,173,186,0.03)] to-transparent"
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Think this could help you? 🤔
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Try our demo and help us decide if we should build this AI career assistant
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                <button
                  onClick={() => navigate('/jarvus-ai-demo')}
                  className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-8 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform"
                >
                  🧪 Try Demo — 2 Minutes
                </button>
                <button
                  onClick={() => navigate('/vision')}
                  className="border border-[#71ADBA] text-[#71ADBA] px-8 py-3 rounded-full font-semibold hover:bg-[#71ADBA] hover:text-white transition-colors"
                >
                  👀 See What We're Building
                </button>
              </div>
              <div className="text-sm text-gray-400 mb-8">
                🧪 Testing market interest • 🎯 Your feedback shapes the product • ⚡ Takes 2 minutes
              </div>
              
              {/* Mobile App Interest Tracker - Enhanced Bottom Version */}
              <div className="mt-12 max-w-lg mx-auto">
                <div className="bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-2xl border border-[#71ADBA]/30 p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-white mb-3 flex items-center justify-center gap-3">
                      📱 Mobile App Coming Soon
                    </h3>
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <svg className="w-6 h-6 text-[#EDEAB1]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                        </svg>
                        <span className="text-lg text-[#EDEAB1] font-medium">iOS</span>
                      </div>
                      <span className="text-gray-400 text-lg">+</span>
                      <div className="flex items-center gap-2">
                        <svg className="w-6 h-6 text-[#EDEAB1]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                        </svg>
                        <span className="text-lg text-[#EDEAB1] font-medium">Android</span>
                      </div>
                    </div>
                    <p className="text-gray-300 font-medium">Help us decide if we should build it!</p>
                  </div>
                  <MobileAppVoting />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage; 