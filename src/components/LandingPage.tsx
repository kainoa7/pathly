import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import CompanyLogos from './CompanyLogos';
import TestimonialSection from './TestimonialSection';
import HowItWorks from './HowItWorks';
import SuccessCounter from './SuccessCounter';
import EmailSignup from './EmailSignup';
import CommunityStories from './CommunityStories';
import ActiveUsersBanner from './ActiveUsersBanner';
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
  const [isHovered, setIsHovered] = useState(false);
  
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
    <div className="page-container bg-gradient-to-br from-[#0f172a] via-[#1a2234] to-[#0f172a] overflow-hidden">
      {/* Active Users Banner */}
      <div className="absolute top-[calc(var(--header-height)+1rem)] right-4 z-50 md:right-6">
        <ActiveUsersBanner />
      </div>

      {/* Early Access Banner */}
      <div className="early-access-banner flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          className="inline-flex items-center bg-gradient-to-r from-[#71ADBA] to-[#EDEAB1] 
                     rounded-full px-6 py-3 shadow-lg shadow-[#71ADBA]/20
                     hover:shadow-[#71ADBA]/40 transition-all duration-300"
        >
          <span className="text-[#1a1f36] font-semibold text-base md:text-lg">
            <span className="mr-2">🚀</span>
            Early Access Now Available - Limited Time Only!
          </span>
        </motion.div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-16 px-4 sm:px-6 lg:px-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] bg-clip-text text-transparent leading-tight"
          >
            Don't Let Others Decide<br className="hidden sm:block" /> Your Future Career
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-8"
          >
            Join <span className="text-[#EDEAB1]">1,000+ early adopters</span> who found their dream career path.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => navigate('/onboarding')}
              className="w-full sm:w-auto px-8 py-4 bg-[#71ADBA] text-white rounded-xl font-semibold hover:bg-[#5C919C] transition-colors shadow-lg hover:shadow-xl hover:shadow-[#71ADBA]/20"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate('/how-it-works')}
              className="w-full sm:w-auto px-8 py-4 bg-[#1a2234] text-white rounded-xl font-semibold hover:bg-[#1a2234]/80 transition-colors border border-[#71ADBA]/20"
            >
              Learn More
            </button>
          </motion.div>
        </motion.div>

        {/* Rest of the content */}
        {/* Statistics Section - Moved below hero */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="bg-[#1a1f36]/40 backdrop-blur-sm p-8 rounded-xl border border-[#71ADBA]/20">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-bold text-[#71ADBA] mb-4"
                >
                  76%
                </motion.div>
                <p className="text-gray-300 text-lg">
                  of students are unsure about their career path
                </p>
              </div>

              <div className="bg-[#1a1f36]/40 backdrop-blur-sm p-8 rounded-xl border border-[#71ADBA]/20">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-5xl font-bold text-[#71ADBA] mb-4"
                >
                  48%
                </motion.div>
                <p className="text-gray-300 text-lg">
                  switch majors due to lack of guidance
                </p>
              </div>

              <div className="bg-[#1a1f36]/40 backdrop-blur-sm p-8 rounded-xl border border-[#71ADBA]/20">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-5xl font-bold text-[#71ADBA] mb-4"
                >
                  83%
                </motion.div>
                <p className="text-gray-300 text-lg">
                  wish they had better career guidance early on
                </p>
              </div>
            </motion.div>

            {/* Solution Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-12 text-center max-w-3xl mx-auto"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
                You're not alone in this journey.
              </h2>
              <p className="text-gray-300 text-lg">
                In today's competitive job market, making the right career choice is harder than ever. 
                That's why we've built Pathly - your AI-powered career guidance companion that understands 
                your unique potential.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Rest of the sections */}
        <CompanyLogos />
        <TestimonialSection />
        <HowItWorks />
        <SuccessCounter />
        <EmailSignup />
        <CommunityStories />
      </div>
    </div>
  );
};

export default LandingPage; 