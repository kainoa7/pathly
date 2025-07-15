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

const LandingPage = () => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    });
  }, [controls]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-navy-900 to-navy-950 overflow-hidden">
      {/* Background animations */}
      <BackgroundAnimation />
      
      {/* Active Users Counter - Fixed positioning */}
      <div className="fixed top-20 right-4 sm:right-6 lg:right-8 z-50">
        <ActiveUsersBanner />
      </div>

      {/* Early Access Banner */}
      <div className="relative z-10 w-full backdrop-blur-sm mt-16">
        <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
          <div className="pr-16 sm:text-center sm:px-16">
            <p className="font-medium text-white">
              <span className="md:hidden">Early access now live!</span>
              <span className="hidden md:inline">Big news! We're excited to announce early access is now live.</span>
              <span className="block sm:ml-2 sm:inline-block">
                <a href="#signup" className="text-white font-semibold underline">
                  Learn more<span aria-hidden="true"> &rarr;</span>
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          <div className="text-center mt-8 mb-16">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-8"
              style={{
                background: "linear-gradient(to right, #71ADBA, #9C71BA, #BA71AD)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Find Your Dream Career Path
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 mb-12"
            >
              AI-powered guidance to help you make moves fr fr 🚀
            </motion.p>
          </div>

          {/* Stats Carousel */}
          <div className="flex justify-center mb-16">
            <div className="w-full max-w-lg">
              <QuickStatsCarousel />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => navigate('/onboarding')}
            >
              Start Your Journey
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-navy-800/50 backdrop-blur-sm text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => navigate('/about')}
            >
              Learn More
            </motion.button>
          </div>
        </div>

        {/* Company Logos Section */}
        <div className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(113,173,186,0.03)] to-transparent pointer-events-none" />
          <CompanyLogos />
        </div>

        {/* How It Works Section */}
        <div className="relative">
          <HowItWorks />
        </div>

        {/* Testimonials Section */}
        <div className="relative py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(156,113,186,0.03)] to-transparent pointer-events-none" />
          <InteractiveTestimonial />
        </div>

        {/* Community Stories Section */}
        <div className="relative py-20">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(113,173,186,0.03)] to-transparent pointer-events-none" />
          <CommunityStories />
        </div>

        {/* Waitlist Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(156,113,186,0.03)] to-transparent pointer-events-none" />
          <WaitlistSection />
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 