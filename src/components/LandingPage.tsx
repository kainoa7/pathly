import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import CompanyLogos from './CompanyLogos';
import TestimonialSection from './TestimonialSection';
import HowItWorks from './HowItWorks';
import SuccessCounter from './SuccessCounter';
import EmailSignup from './EmailSignup';
import { useEffect, useState } from 'react';
import Analytics from '../utils/analytics';
import PeopleIcon from '@mui/icons-material/People';
import ForumIcon from '@mui/icons-material/Forum';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WorkIcon from '@mui/icons-material/Work';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const FloatingShape = ({ delay = 0, className = "" }) => (
  <motion.div
    className={`absolute rounded-full mix-blend-screen filter blur-xl ${className}`}
    animate={{
      y: ["0%", "-50%", "0%"],
      scale: [1, 1.2, 1],
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

const CommunitySection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] bg-clip-text text-transparent"
          >
            Join Our Growing Community
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Connect with peers, share experiences, and stay updated on the latest job market trends
          </motion.p>
        </div>

        {/* Community Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-[#1a1f36]/40 backdrop-blur-sm p-8 rounded-xl border border-[#71ADBA]/20"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-[#71ADBA]/10 rounded-lg">
                <PeopleIcon className="w-6 h-6 text-[#71ADBA]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#EDEAB1] mb-2">Peer Network</h3>
                <p className="text-gray-300">Connect with others in your field, share experiences, and build valuable relationships</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-[#1a1f36]/40 backdrop-blur-sm p-8 rounded-xl border border-[#71ADBA]/20"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-[#71ADBA]/10 rounded-lg">
                <ForumIcon className="w-6 h-6 text-[#71ADBA]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#EDEAB1] mb-2">Discussion Forums</h3>
                <p className="text-gray-300">Engage in meaningful discussions about career paths, industry trends, and job opportunities</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="bg-[#1a1f36]/40 backdrop-blur-sm p-8 rounded-xl border border-[#71ADBA]/20"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-[#71ADBA]/10 rounded-lg">
                <TrendingUpIcon className="w-6 h-6 text-[#71ADBA]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#EDEAB1] mb-2">Market Insights</h3>
                <p className="text-gray-300">Stay informed about the latest job market trends, salary data, and industry developments</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="bg-[#1a1f36]/40 backdrop-blur-sm p-8 rounded-xl border border-[#71ADBA]/20"
          >
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-[#71ADBA]/10 rounded-lg">
                <WorkIcon className="w-6 h-6 text-[#71ADBA]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#EDEAB1] mb-2">Job Board</h3>
                <p className="text-gray-300">Access exclusive job postings and opportunities shared by community members</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Discord Coming Soon Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 backdrop-blur-sm p-8 rounded-xl border border-[#71ADBA]/20 text-center max-w-2xl mx-auto mb-12"
        >
          <img src="/discord-logo.svg" alt="Discord" className="w-16 h-16 mx-auto mb-6" />
          <h3 className="text-2xl font-bold text-[#EDEAB1] mb-4">
            Discord Community Coming Soon!
          </h3>
          <p className="text-gray-300 mb-6">
            Be one of the first to join our exclusive Discord community. Limited spots available for early members!
          </p>
          <button
            onClick={() => navigate('/waitlist')}
            className="px-8 py-3 bg-[#5865F2] rounded-xl text-white font-semibold hover:bg-[#4752C4] transition-colors duration-300 flex items-center justify-center mx-auto"
          >
            <span>Join Waitlist</span>
            <span className="ml-2 text-sm bg-white/20 px-2 py-1 rounded">500 spots left</span>
          </button>
        </motion.div>

        {/* Social Media Platforms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <h3 className="text-2xl font-bold text-[#EDEAB1]">
              Join Our Social Community
            </h3>
            <span className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] px-2 py-0.5 rounded-full text-white text-sm font-medium">
              Just Launched!
            </span>
          </div>
          <p className="text-gray-300 mb-4">
            We're excited to announce our new social media presence! Be among the first to follow us and join our growing community.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            Early followers will get exclusive access to career resources and community events
          </p>
          <div className="flex justify-center space-x-6">
            <motion.a
              href="https://instagram.com/pathly"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="group p-4 bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-xl border border-[#71ADBA]/20 hover:border-[#71ADBA]/40 transition-colors duration-300 relative"
            >
              <InstagramIcon className="w-8 h-8 text-[#EDEAB1]" />
              <span className="absolute -top-2 -right-2 bg-[#71ADBA] px-1.5 py-0.5 rounded text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">New!</span>
            </motion.a>
            <motion.a
              href="https://linkedin.com/company/pathly"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="group p-4 bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-xl border border-[#71ADBA]/20 hover:border-[#71ADBA]/40 transition-colors duration-300 relative"
            >
              <LinkedInIcon className="w-8 h-8 text-[#EDEAB1]" />
              <span className="absolute -top-2 -right-2 bg-[#71ADBA] px-1.5 py-0.5 rounded text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">New!</span>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Mouse parallax effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const moveX = useTransform(mouseXSpring, [0, 1], [50, -50]);
  const moveY = useTransform(mouseYSpring, [0, 1], [50, -50]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;
      
      x.set(clientX / innerWidth);
      y.set(clientY / innerHeight);
      
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="main-content relative flex items-center justify-center min-h-[90vh] overflow-hidden">
        {/* Animated background shapes */}
        <FloatingShape className="w-[400px] h-[400px] bg-[#71ADBA]/20 left-[-100px] top-[20%]" delay={0} />
        <FloatingShape className="w-[300px] h-[300px] bg-[#EDEAB1]/20 right-[-50px] top-[10%]" delay={2} />
        <FloatingShape className="w-[350px] h-[350px] bg-[#9C71BA]/20 left-[10%] bottom-[-100px]" delay={4} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ x: moveX, y: moveY }}
          className="max-w-4xl text-center relative z-10 pt-8"
        >
          <div className="flex flex-col items-center justify-center space-y-8">
            {/* Early Access Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] px-4 py-1 rounded-full text-white text-sm font-medium shadow-lg"
            >
              🚀 Early Access Now Available - Limited Time Only!
            </motion.div>

            {/* Main Heading */}
            <div className="relative inline-block mb-8">
              <motion.span
                className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] opacity-75 blur-lg"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <h1 className="relative text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#71ADBA] via-white to-[#EDEAB1]">
                Don't Let Others Decide
                <br />
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Your Future Career 🚀
                </motion.span>
              </h1>
            </div>

            {/* Subheading */}
            <motion.p
              className="text-xl md:text-2xl text-gray-300 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Join <span className="text-[#EDEAB1] font-semibold">1,000+ early adopters</span> who already discovered their dream career path.
              <br />
              <span className="text-[#71ADBA]">Limited spots available</span> - Don't miss out!
            </motion.p>

            {/* Quick Value Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto mb-12"
            >
              <div className="bg-[#1a1f36]/40 backdrop-blur-sm p-6 rounded-xl border border-[#71ADBA]/20 hover:border-[#71ADBA]/40 transition-all duration-300">
                <div className="text-3xl mb-3">⚡️</div>
                <h3 className="text-[#EDEAB1] text-lg font-semibold mb-2">30-Second Assessment</h3>
                <p className="text-gray-400">Quick quiz to understand your perfect career match</p>
              </div>
              
              <div className="bg-[#1a1f36]/40 backdrop-blur-sm p-6 rounded-xl border border-[#71ADBA]/20 hover:border-[#71ADBA]/40 transition-all duration-300">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="text-[#EDEAB1] text-lg font-semibold mb-2">Instant Matches</h3>
                <p className="text-gray-400">Get matched with top companies and roles instantly</p>
              </div>
              
              <div className="bg-[#1a1f36]/40 backdrop-blur-sm p-6 rounded-xl border border-[#71ADBA]/20 hover:border-[#71ADBA]/40 transition-all duration-300">
                <div className="text-3xl mb-3">🗺️</div>
                <h3 className="text-[#EDEAB1] text-lg font-semibold mb-2">Career Roadmap</h3>
                <p className="text-gray-400">Get your free personalized career development plan</p>
              </div>
            </motion.div>

            {/* Primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="w-full max-w-2xl mx-auto text-center mt-12"
            >
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => navigate('/onboarding')}
                  className="px-8 py-4 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-xl text-white font-semibold text-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Career Journey →
                </motion.button>
                
                <motion.button
                  onClick={() => navigate('/demo')}
                  className="px-8 py-4 bg-[#1a1f36]/50 border border-[#71ADBA]/30 rounded-xl text-[#EDEAB1] font-semibold text-lg hover:bg-[#1a1f36]/70 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try Demo
                </motion.button>
              </div>
              
              <p className="text-gray-400 mt-4">
                Free forever • No credit card required • Start in 30 seconds
              </p>
            </motion.div>

            {/* Social Proof Section */}
            <div className="relative w-full max-w-md mx-auto mb-16">
              {/* User Avatars and Join Count */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center justify-center space-x-2 mb-16"
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] border-2 border-[#1a1f36]"
                    />
                  ))}
                </div>
                <span className="text-gray-400">
                  <span className="text-[#EDEAB1]">4 people</span> joined in the last hour
                </span>
              </motion.div>

              {/* Email Signup */}
              <div className="mt-8">
                <EmailSignup />
              </div>
            </div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              <div className="flex items-center space-x-2 bg-[#1a1f36]/50 px-4 py-2 rounded-full">
                <span className="text-[#EDEAB1]">✨</span>
                <span className="text-sm text-gray-300">100% Free Access</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#1a1f36]/50 px-4 py-2 rounded-full">
                <span className="text-[#EDEAB1]">🎯</span>
                <span className="text-sm text-gray-300">Personalized Roadmap</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#1a1f36]/50 px-4 py-2 rounded-full">
                <span className="text-[#EDEAB1]">🔒</span>
                <span className="text-sm text-gray-300">Early Access Perks</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Success Counter Section */}
      <SuccessCounter />

      {/* Company Logos Section */}
      <CompanyLogos />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Community Section */}
      <CommunitySection />

      {/* Testimonials Section */}
      <TestimonialSection />
    </div>
  );
};

export default LandingPage; 