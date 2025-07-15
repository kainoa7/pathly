import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import CompanyLogos from './CompanyLogos';
import TestimonialSection from './TestimonialSection';
import HowItWorks from './HowItWorks';
import SuccessCounter from './SuccessCounter';
import EmailSignup from './EmailSignup';
import { useEffect, useState } from 'react';
import Analytics from '../utils/analytics';

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

      {/* Testimonials Section */}
      <TestimonialSection />
    </div>
  );
};

export default LandingPage; 