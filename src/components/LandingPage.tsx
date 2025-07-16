import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useAnimation } from 'framer-motion';
import CompanyLogos from './CompanyLogos';
import InteractiveTestimonial from './InteractiveTestimonial';
import HowItWorks from './HowItWorks';
import CommunityStories from './CommunityStories';
import ActiveUsersBanner from './ActiveUsersBanner';
import QuickStatsCarousel from './QuickStatsCarousel';
import BackgroundAnimation from './BackgroundAnimation';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // TODO: Implement actual waitlist API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
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
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] bg-clip-text text-transparent"
        >
          Ready to be part of something bigger?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
        >
          Join our exclusive community of ambitious students and professionals
        </motion.p>

        {/* Waitlist Form */}
        <div className="max-w-md mx-auto">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 rounded-xl bg-navy-900/50 border border-[#71ADBA]/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#71ADBA]/50"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </button>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                <LockIcon className="w-4 h-4" />
                <span>Join 1,000+ students who found their dream career</span>
              </div>
              <div className="mt-4 inline-block bg-[#5865F2]/20 backdrop-blur-sm px-4 py-2 rounded-full border border-[#5865F2]/30">
                <span className="text-[#EDEAB1]">🔥 Only 50 spots remaining today!</span>
              </div>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-navy-900/50 border border-[#71ADBA]/20 rounded-xl p-8"
            >
              <h3 className="text-2xl font-bold text-[#EDEAB1] mb-4">🎉 You're on the list!</h3>
              <p className="text-gray-300">
                We'll notify you as soon as your spot is ready. In the meantime, follow us on social media for updates!
              </p>
              <div className="flex justify-center space-x-6 mt-6">
                <motion.a
                  href="https://instagram.com/pathly"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-xl border border-[#71ADBA]/20"
                >
                  <InstagramIcon className="w-6 h-6 text-[#EDEAB1]" />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/company/pathly"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-xl border border-[#71ADBA]/20"
                >
                  <LinkedInIcon className="w-6 h-6 text-[#EDEAB1]" />
                </motion.a>
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

const LandingPage = () => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const [userCount] = useState(Math.floor(Math.random() * (1500 - 1200) + 1200));

  const painPoints = [
    "tired of random career TikToks? 🤔",
    "feeling lost about your future? 😮‍💨",
    "need real guidance, not cap? 💯",
    "want a career that actually hits? ⚡️"
  ];

  const trendingCareers = [
    "AI Developer 🤖",
    "Content Creator 📱",
    "Data Scientist 📊",
    "UX Designer 🎨"
  ];

  // Mix of success stories and platform features
  interface FloatingElement {
    type: 'success' | 'feature';
    text: string;
    icon: string;
    position: { x: number; y: number };
  }

  // Larger pool of messages to randomly select from
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

  // Fixed positions with good spacing
  const positions = [
    { x: -420, y: 120 },  // Far left top
    { x: 420, y: 160 },   // Far right top
    { x: -380, y: 320 },  // Left middle
    { x: 380, y: 280 },   // Right middle
    { x: -400, y: 480 },  // Left bottom
    { x: 400, y: 440 }    // Right bottom
  ];

  // Function to get random messages
  const getRandomMessages = () => {
    const messages: FloatingElement[] = [];
    const usedIndices = { success: new Set(), feature: new Set() };

    positions.forEach((pos, i) => {
      const type = i % 2 === 0 ? 'success' : 'feature';
      const pool = messagePool[type];
      let randomIndex;
      
      // Find an unused message
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
      
      {/* Active Users Counter - Fixed positioning */}
      <div className="fixed top-24 right-4 sm:right-6 lg:right-8 z-50">
        <ActiveUsersBanner />
      </div>

      {/* Hero Section - Full Screen */}
      <div className="min-h-screen relative flex flex-col justify-center items-center">
        {/* Early Access Banner */}
        <div className="absolute top-0 left-0 right-0 z-10 backdrop-blur-sm bg-[#1a2234]/50 border-b border-[#71ADBA]/10">
          <div className="max-w-7xl mx-auto py-3 px-4">
            <div className="text-center">
              <p className="font-medium text-white flex items-center justify-center gap-3">
                <span className="inline-flex items-center gap-2">
                  <WhatshotIcon className="w-5 h-5 text-[#EDEAB1]" />
                  <span>{userCount}+ students found their path today!</span>
                </span>
              </p>
            </div>
          </div>
        </div>

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
                  className="absolute bg-[#1a2234]/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-[#71ADBA]/20 shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[#EDEAB1]">{element.icon}</span>
                    <span className="text-gray-300 text-sm whitespace-nowrap">{element.text}</span>
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
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-8"
                style={{
                  background: "linear-gradient(to right, #71ADBA, #9C71BA, #BA71AD)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 40px rgba(113, 173, 186, 0.3), 0 0 20px rgba(156, 113, 186, 0.2)",
                  filter: "drop-shadow(0 0 8px rgba(113, 173, 186, 0.2))"
                }}
              >
                Stop scrolling.<br />Start growing.
              </motion.h1>

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

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center gap-2 text-gray-400"
              >
                <PeopleIcon className="w-5 h-5" />
                <span>{userCount}+ students already found their path today</span>
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