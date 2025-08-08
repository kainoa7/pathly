import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CompanyLogos from './CompanyLogos';
import HowItWorks from './HowItWorks';
import VideoShowcase from './VideoShowcase';
import BetaSignupForm from './BetaSignupForm';
import { useEffect, useState } from 'react';
import Analytics from '../utils/analytics';
import { track } from '../lib/analytics';

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

  return <span>{currentText}</span>;
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [showBetaSignup, setShowBetaSignup] = useState(false);

  const typewriterPhrases = [
    "Make companies choose you.",
    "Skip the job hunt struggle.", 
    "Get hired in weeks, not years.",
    "Beat 1,000+ other applicants.",
    "Turn your dreams into offers."
  ];

  // Track landing page view
  useEffect(() => {
    track('Landing Page Viewed', { 
      section: 'hero',
      user_type: 'anonymous'
    });
  }, []);

  return (
    <div className="relative overflow-hidden">
      
      {/* Seamless Multi-Section Background - spans entire page */}
      <div className="absolute inset-0 min-h-[400vh] bg-gradient-to-b from-gray-900 via-gray-850 via-gray-800 via-gray-850 to-gray-900"></div>
      
      {/* Global Background Elements that flow across all sections */}
      <div className="absolute inset-0 min-h-[400vh]">
        {/* Hero section background elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-[#71ADBA]/15 to-[#9C71BA]/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-gradient-to-r from-[#9C71BA]/15 to-[#71ADBA]/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#71ADBA]/8 to-[#9C71BA]/8 rounded-full blur-3xl"></div>
        
        {/* Transition elements between sections */}
        <div className="absolute top-[80vh] right-40 w-64 h-64 bg-gradient-to-r from-[#EDEAB1]/12 to-[#71ADBA]/12 rounded-full blur-3xl"></div>
        <div className="absolute top-[120vh] left-20 w-80 h-80 bg-gradient-to-r from-[#9C71BA]/10 to-[#EDEAB1]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-[160vh] right-10 w-48 h-48 bg-gradient-to-r from-[#71ADBA]/14 to-[#9C71BA]/14 rounded-full blur-3xl"></div>
        <div className="absolute top-[200vh] left-1/3 w-72 h-72 bg-gradient-to-r from-[#EDEAB1]/8 to-[#9C71BA]/8 rounded-full blur-3xl"></div>
        <div className="absolute top-[240vh] right-1/4 w-56 h-56 bg-gradient-to-r from-[#71ADBA]/10 to-[#EDEAB1]/10 rounded-full blur-3xl"></div>
      </div>
      
      <main className="relative z-10">
        {/* High-Converting Hero Section */}
        <div className="min-h-screen relative grid lg:grid-cols-2 gap-8 items-center pt-20 pb-16 px-6 max-w-7xl mx-auto">
          
          {/* Left Column - Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            
            {/* Brand + Typewriter Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <div className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight">
                <div className="text-white mb-2 text-4xl md:text-5xl lg:text-6xl">
                  <TypewriterText texts={typewriterPhrases} />
                  <span className="animate-pulse">|</span>
                </div>
                            <span className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] bg-clip-text text-transparent">
              Jarvus Gets You Hired.
            </span>
              </div>
            </motion.div>

            {/* Static Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              AI gives you an unfair advantage. While others guess their way through career choices, you get the exact roadmap to your dream job.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8"
            >
              <button
                onClick={() => {
                  track('Landing Page CTA Clicked', { 
                    button: 'Find My Career Now',
                    location: 'hero_section'
                  });
                  navigate('/signup-explorer');
                }}
                className="group relative px-8 py-4 text-lg font-bold text-white rounded-2xl bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] hover:from-[#5a9ba8] hover:to-[#8a5fa8] transform hover:scale-105 hover:shadow-2xl hover:shadow-[#71ADBA]/25 transition-all duration-300 w-full sm:w-auto"
              >
                                    <span className="relative z-10">Start Winning Now</span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#5a9ba8] to-[#8a5fa8] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button
                onClick={() => {
                  track('Landing Page CTA Clicked', { 
                    button: 'Show Me Proof',
                    location: 'hero_section'
                  });
                  navigate('/quiz');
                }}
                className="px-8 py-4 text-lg font-semibold text-white rounded-2xl border-2 border-gray-600 hover:border-[#71ADBA] hover:bg-[#71ADBA]/10 hover:shadow-lg hover:shadow-[#71ADBA]/20 transition-all duration-300 w-full sm:w-auto"
              >
                See How It Works
              </button>
            </motion.div>

            {/* Hero Stats Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mb-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="text-3xl md:text-4xl font-black text-[#71ADBA]">87%</div>
                  <div className="text-sm text-gray-400 font-medium">precision in career matching</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl md:text-4xl font-black text-[#9C71BA]">14 days</div>
                  <div className="text-sm text-gray-400 font-medium">average time to job offer</div>
                </div>
              </div>
            </motion.div>

            {/* Social Proof Strip */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-4"
            >
                                <div className="text-sm text-gray-400 font-medium">
                    Already hired at:
                  </div>
              
              {/* Company Logos */}
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 opacity-60">
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-black font-bold text-xs">AWS</span>
                </div>
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-black font-bold text-xs">TSLA</span>
                </div>
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-black font-bold text-xs">GOOGL</span>
                </div>
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-black font-bold text-xs">META</span>
                </div>
                <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                  <span className="text-black font-bold text-xs">MSFT</span>
                </div>
              </div>

              {/* Testimonial */}
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-cyan-500 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500 border-2 border-white"></div>
                </div>
                                  <div className="text-sm text-gray-300">
                    <span className="font-semibold text-white">Alex</span> got hired at Google in 14 days
                  </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Visual Hook */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="order-1 lg:order-2 flex justify-center items-center"
          >
            <div className="relative max-w-md w-full">
              {/* Placeholder Dashboard Screenshot */}
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700 transform hover:scale-105 transition-transform duration-500">
                
                {/* Mock Browser Bar */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>

                {/* Mock Dashboard Content */}
                <div className="space-y-4">
                  <div className="text-white font-bold text-lg">Your Career Dashboard</div>
                  
                  {/* Mock Progress Bar */}
                  <div className="space-y-2">
                    <div className="text-sm text-gray-400">Career Progress</div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] h-2 rounded-full w-3/4 animate-pulse"></div>
                    </div>
                  </div>

                  {/* Mock Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-800 rounded-lg p-3">
                      <div className="text-2xl font-bold text-[#71ADBA]">87%</div>
                      <div className="text-xs text-gray-400">Skills Match</div>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-3">
                      <div className="text-2xl font-bold text-[#9C71BA]">12</div>
                      <div className="text-xs text-gray-400">Opportunities</div>
                    </div>
                  </div>

                  {/* Mock Action Items */}
                  <div className="space-y-2">
                    <div className="text-sm text-gray-400">Next Steps</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Complete Python certification
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        Apply to 3 internships
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Network on LinkedIn
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-full p-3 shadow-lg animate-bounce">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>

              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 rounded-2xl blur-xl -z-10 transform scale-110"></div>
            </div>
          </motion.div>
        </div>

        {/* Content Sections with seamless transitions */}
        <div className="relative z-10">
          {/* How It Works Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-16"
          >
            <HowItWorks />
          </motion.div>
          
          {/* Company Logos Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-12"
          >
            <CompanyLogos />
          </motion.div>

          {/* Video Showcase Section */}
          <VideoShowcase />

          {/* Personalized CTA for Different User Types */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative py-24"
          >
            {/* Subtle section emphasis without breaking flow */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(113,173,186,0.02)] to-transparent"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                {/* Enhanced title with multiple background layers like our other sections */}
                <div className="relative inline-block">
                  <motion.span
                    className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-[#71ADBA] via-[#EDEAB1] to-[#9C71BA] opacity-20 blur-2xl"
                    animate={{
                      scale: [1, 1.15, 1],
                      rotate: [0, 360, 0],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.span
                    className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-[#9C71BA] via-[#71ADBA] to-[#EDEAB1] opacity-30 blur-xl"
                    animate={{
                      scale: [1.15, 1, 1.15],
                      rotate: [360, 0, 360],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  <h2 className="relative text-5xl md:text-6xl lg:text-7xl font-black py-4">
                    <span className="bg-gradient-to-r from-[#71ADBA] via-[#EDEAB1] to-[#9C71BA] bg-clip-text text-transparent">
                      Pick Your Power Move
                    </span>
                  </h2>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <p className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Stop applying everywhere. Start getting hired anywhere.
                  </p>
                  <div className="flex justify-center items-center gap-2 mt-6">
                    <div className="w-16 h-1 bg-gradient-to-r from-[#71ADBA] to-[#EDEAB1] rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-[#EDEAB1] rounded-full animate-bounce"></div>
                    <div className="w-16 h-1 bg-gradient-to-r from-[#EDEAB1] to-[#9C71BA] rounded-full animate-pulse"></div>
                  </div>
                </motion.div>
              </div>

              {/* Premium Personalized Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {[
                  {
                    title: "Current Students",
                    description: "Skip the career guessing game. Know exactly which path leads to your dream job.",
                    buttonText: "Get My Roadmap",
                    buttonAction: () => navigate('/signup/explorer'),
                    gradient: "from-[#71ADBA] to-[#9C71BA]",
                    bgGlow: "group-hover:shadow-[0_0_40px_-5px_rgba(113,173,186,0.4)]",
                    iconGradient: "from-[#71ADBA] to-[#9C71BA]"
                  },
                  {
                    title: "Career Changers", 
                    description: "Escape your dead-end job. Get the fastest route to a career you'll love.",
                    buttonText: "Plan My Escape",
                    buttonAction: () => navigate('/signup/pro'),
                    gradient: "from-[#EDEAB1] to-[#71ADBA]",
                    bgGlow: "group-hover:shadow-[0_0_40px_-5px_rgba(237,234,177,0.4)]",
                    iconGradient: "from-[#EDEAB1] to-[#71ADBA]"
                  },
                  {
                    title: "Active Job Seekers",
                    description: "Stop the endless applications. Get offers in weeks with our proven system.",
                    buttonText: "Get Hired Faster",
                    buttonAction: () => setShowBetaSignup(true),
                    gradient: "from-[#9C71BA] to-[#EDEAB1]",
                    bgGlow: "group-hover:shadow-[0_0_40px_-5px_rgba(156,113,186,0.4)]",
                    iconGradient: "from-[#9C71BA] to-[#EDEAB1]"
                  }
                ].map((option, index) => (
                  <motion.div
                    key={option.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    className="relative group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05, y: -8 }}
                      className={`relative p-8 rounded-2xl transition-all duration-500 transform-gpu ${option.bgGlow} 
                               h-full flex flex-col items-center text-center overflow-hidden min-h-[380px]`}
                    >
                      {/* Dynamic multi-layer background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-lg"></div>
                      
                      {/* Animated border gradient */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl opacity-50 group-hover:opacity-100 transition-all duration-500"
                        style={{
                          background: `linear-gradient(135deg, ${option.gradient.replace('from-', '').replace('to-', '').split(' ')[0]}, transparent, ${option.gradient.replace('from-', '').replace('to-', '').split(' ')[1]})`,
                          backgroundSize: '400% 400%',
                        }}
                        animate={{
                          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      
                      {/* Inner border */}
                      <div className="absolute inset-[2px] bg-gradient-to-br from-gray-900/98 via-gray-800/98 to-gray-900/98 rounded-[14px] backdrop-blur-lg"></div>
                      
                      {/* Floating particles */}
                      <motion.div
                        className="absolute top-6 right-6 w-2 h-2 bg-white/30 rounded-full"
                        animate={{
                          y: [0, -15, 0],
                          opacity: [0.3, 0.8, 0.3],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: index * 0.2,
                        }}
                      />
                      
                      <div className="relative z-10 flex-1 flex flex-col justify-between">
                        <div className="flex-1 flex flex-col items-center">
                          {/* Enhanced icon */}
                          <motion.div
                            className="relative mb-6"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                          >
                            {/* Icon background glow */}
                            <motion.div
                              className={`absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-r ${option.iconGradient} opacity-40 blur-xl`}
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.4, 0.7, 0.4],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                            
                            {/* Icon container */}
                            <div className={`relative w-16 h-16 rounded-full bg-gradient-to-r ${option.iconGradient} p-3 shadow-2xl flex items-center justify-center`}>
                              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                {index === 0 && <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L21 9l-9-6zM18.82 9L12 12.72 5.18 9 12 5.28 18.82 9zM17 16l-5 2.72L7 16v-3.73L12 15l5-2.73V16z"/>}
                                {index === 1 && <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>}
                                {index === 2 && <path d="M14 6V4h-4v2h4zM4 8v11h16V8H4zm16-2c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2V8c0-1.11.89-2 2-2h16z"/>}
                              </svg>
                            </div>
                            
                            {/* Number badge */}
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-white text-gray-900 rounded-full flex items-center justify-center text-xs font-black shadow-lg">
                              {index + 1}
                            </div>
                          </motion.div>

                          {/* Enhanced title */}
                          <motion.h3
                            className={`text-2xl md:text-2xl font-black mb-4 bg-gradient-to-r ${option.gradient} bg-clip-text text-transparent transform-gpu transition-transform duration-300 group-hover:scale-105`}
                          >
                            {option.title}
                          </motion.h3>

                          {/* Enhanced description */}
                          <motion.p 
                            className="text-lg text-gray-300 leading-relaxed font-medium transform-gpu transition-all duration-300 group-hover:text-white group-hover:scale-105 mb-8"
                            initial={{ opacity: 0.8 }}
                            whileHover={{ opacity: 1 }}
                          >
                            {option.description}
                          </motion.p>
                          
                          {/* Premium button */}
                          <motion.button
                            onClick={option.buttonAction}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full py-4 px-6 text-lg font-bold text-white rounded-xl bg-gradient-to-r ${option.gradient} hover:shadow-2xl hover:shadow-[${option.gradient.replace('from-', '').replace('to-', '').split(' ')[0]}]/30 transition-all duration-500 relative overflow-hidden`}
                          >
                            <span className="relative z-10">{option.buttonText}</span>
                            
                            {/* Button glow effect */}
                            <motion.div
                              className={`absolute inset-0 rounded-xl bg-gradient-to-r ${option.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                              animate={{
                                scale: [1, 1.02, 1],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Community Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-center"
              >
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative inline-flex items-center gap-8 px-8 py-6 rounded-2xl overflow-hidden backdrop-blur-lg"
                >
                  {/* Enhanced background with gradient border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-lg"></div>
                  <div className="absolute inset-[1px] bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 rounded-[15px]"></div>
                  
                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-60"
                    style={{
                      background: 'linear-gradient(90deg, #71ADBA, #9C71BA, #EDEAB1, #71ADBA)',
                      backgroundSize: '300% 300%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  <div className="relative z-10 flex items-center gap-8">
                    <div className="flex items-center gap-3 text-[#71ADBA]">
                      <motion.div 
                        className="w-3 h-3 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-full"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [1, 0.7, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <span className="font-bold text-lg">3,247 students getting hired right now</span>
                    </div>
                    <div className="text-gray-400 text-2xl">•</div>
                    <div className="text-gray-300 text-lg">
                      <span className="font-bold text-[#9C71BA]">156 offers</span> negotiated this week
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Simple CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="py-24"
          >
            <div className="max-w-4xl mx-auto px-6 text-center">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Your Competition Started Yesterday
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                3,247 students are already ahead of you. Every day you wait, they get further ahead.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/signup/explorer')}
                  className="px-8 py-4 border border-gray-600 text-white rounded-xl hover:border-[#71ADBA] hover:text-[#71ADBA] transition-all duration-300"
                >
                  Catch Up Now
                </button>
                <button
                  onClick={() => navigate('/pricing')}
                  className="px-8 py-4 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white rounded-xl hover:opacity-90 transition-all duration-300"
                >
                  Get Ahead Fast
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Beta Signup Modal */}
      {showBetaSignup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <BetaSignupForm
              source="landing_page_personalized_cta"
              onSuccess={() => {
                setShowBetaSignup(false);
              }}
              onClose={() => setShowBetaSignup(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage; 