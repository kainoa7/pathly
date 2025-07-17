import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import PeopleIcon from '@mui/icons-material/People';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SchoolIcon from '@mui/icons-material/School';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { useState } from 'react';

const AboutPage = () => {
  const navigate = useNavigate();
  const [activeValue, setActiveValue] = useState<number | null>(null);

  const teamValues = [
    {
      icon: PeopleIcon,
      title: "Student-First",
      tagline: "Built by students, for students",
      points: [
        "Your success = our success",
        "24/7 support when you need it",
        "Community-driven features"
      ]
    },
    {
      icon: RocketLaunchIcon,
      title: "Future-Ready",
      tagline: "Cutting-edge tech that gets you",
      points: [
        "AI-powered guidance",
        "Real-time industry insights",
        "Trending career paths"
      ]
    },
    {
      icon: SchoolIcon,
      title: "Real Talk",
      tagline: "No sugarcoating, just facts",
      points: [
        "Honest career advice",
        "Real success stories",
        "Industry expert tips"
      ]
    },
    {
      icon: AutoGraphIcon,
      title: "Your Journey",
      tagline: "Because you're not like everyone else",
      points: [
        "Custom career roadmaps",
        "Skill-based matching",
        "Personal growth tracking"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1a2234] to-[#0f172a] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-[#71ADBA]/10 to-transparent rounded-full blur-3xl transform rotate-12 animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-[#9C71BA]/10 to-transparent rounded-full blur-3xl transform -rotate-12 animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-24 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] bg-clip-text text-transparent">
            About K<span className="text-[#71ADBA]">ai</span>yl
          </h1>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Your free companion in navigating life's biggest decisions. We're here to guide students and young adults who feel lost, helping you discover your path with confidence.
          </p>
        </motion.div>

        {/* Mission Statement Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-[#1a2234]/70 backdrop-blur-lg rounded-xl p-8 border border-[#71ADBA]/20 mb-24"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-4 bg-[#71ADBA]/10 rounded-full">
              <HandshakeIcon className="w-8 h-8 text-[#71ADBA]" />
            </div>
            <h2 className="text-3xl font-semibold text-[#EDEAB1]">Our Mission</h2>
          </div>
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              K<span className="text-[#71ADBA]">ai</span>yl exists for one simple reason: to be your trusted guide when you're feeling uncertain about your future. We understand the overwhelming pressure of making life-changing decisions about your education and career.
            </p>
            <div className="bg-[#71ADBA]/10 rounded-xl p-6 mb-6">
              <p className="text-2xl font-semibold text-[#EDEAB1] mb-4">
                100% Free Platform
              </p>
              <p className="text-lg text-gray-300">
                We believe everyone deserves access to quality career guidance. That's why all our services - from AI-powered recommendations to personalized roadmaps - are completely free to use.
              </p>
            </div>
            <p className="text-xl text-gray-300 leading-relaxed">
              Whether you're questioning your major, exploring career options, or seeking direction in life, we're here to help you find clarity and purpose in your journey.
            </p>
          </div>
        </motion.div>

        {/* Tech Stack & System Design Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/tech-stack')}
            className="bg-[#1a2234]/50 backdrop-blur-lg rounded-xl p-8 border border-[#71ADBA]/20 cursor-pointer group hover:shadow-[0_0_30px_rgba(113,173,186,0.2)] transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-[#71ADBA]/10 rounded-lg group-hover:bg-[#71ADBA]/20 transition-colors">
                <CodeIcon className="w-8 h-8 text-[#71ADBA] group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h2 className="text-2xl font-semibold text-[#EDEAB1] group-hover:scale-105 transition-transform duration-300">Our Tech Stack</h2>
            </div>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Explore the cutting-edge technologies powering K<span className="text-[#71ADBA]">ai</span>yl's platform and features.
            </p>
            <span className="text-[#71ADBA] group-hover:underline inline-flex items-center gap-2">
              Learn more 
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >→</motion.span>
            </span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/system-design')}
            className="bg-[#1a2234]/50 backdrop-blur-lg rounded-xl p-8 border border-[#71ADBA]/20 cursor-pointer group hover:shadow-[0_0_30px_rgba(113,173,186,0.2)] transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-[#71ADBA]/10 rounded-lg group-hover:bg-[#71ADBA]/20 transition-colors">
                <ArchitectureIcon className="w-8 h-8 text-[#71ADBA] group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <h2 className="text-2xl font-semibold text-[#EDEAB1] group-hover:scale-105 transition-transform duration-300">System Design</h2>
            </div>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Discover how we've built a scalable, secure, and efficient platform.
            </p>
            <span className="text-[#71ADBA] group-hover:underline inline-flex items-center gap-2">
              Learn more 
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >→</motion.span>
            </span>
          </motion.div>
        </motion.div>

        {/* Core Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-24"
        >
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-[#EDEAB1] to-[#71ADBA] bg-clip-text text-transparent">
            Our Core Values
          </h2>
          <p className="text-gray-300 text-xl text-center mb-16 max-w-2xl mx-auto">
            What makes us different? Here's the TL;DR ⚡️
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamValues.map((value, index) => (
              <motion.div
                key={value.title}
                className="relative"
                onHoverStart={() => setActiveValue(index)}
                onHoverEnd={() => setActiveValue(null)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-[#1a2234]/50 backdrop-blur-lg rounded-xl border border-[#71ADBA]/20 overflow-hidden h-[200px]">
                  <div className="p-6 h-full relative">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-[#EDEAB1] mb-3">
                          {value.title}
                        </h3>
                        <p className="text-gray-300 text-lg">
                          {value.tagline}
                        </p>
                      </div>
                      <div className="p-3 bg-[#71ADBA]/10 rounded-lg ml-4">
                        <value.icon className="w-8 h-8 text-[#71ADBA]" />
                      </div>
                    </div>
                    
                    <AnimatePresence>
                      {activeValue === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute inset-0 bg-[#1a2234]/95 backdrop-blur-sm p-6"
                        >
                          <ul className="space-y-3">
                            {value.points.map((point, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center text-gray-300"
                              >
                                <span className="text-[#71ADBA] mr-2">•</span>
                                {point}
                              </motion.li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-[#71ADBA] to-[#EDEAB1] bg-clip-text text-transparent mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of students who have found their perfect career path with K<span className="text-[#71ADBA]">ai</span>yl.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/onboarding')}
            className="px-8 py-4 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-xl text-white text-lg font-semibold 
                     hover:shadow-lg hover:shadow-[#71ADBA]/20 transition-all"
          >
            Begin Your Story With Us
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage; 