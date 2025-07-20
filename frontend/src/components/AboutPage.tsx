import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRocket, 
  faEye,
  faCheck,
  faArrowRight,
  faBrain,
  faUsers,
  faQuoteLeft
} from '@fortawesome/free-solid-svg-icons';

const AboutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats] = useState({ users: 3252, feedback: 847 });

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CS Student",
      quote: "The JARVUS concept looks incredible. If they build this, it could really help students like me!",
      feedback: "Build it!"
    },
    {
      name: "Marcus Johnson", 
      role: "Recent Grad",
      quote: "This demo shows so much potential. The AI career assistant market definitely needs this.",
      feedback: "Market validation"
    },
    {
      name: "Emma Rodriguez",
      role: "Career Counselor", 
      quote: "As a professional counselor, I see huge value in this concept. Students would love it.",
      feedback: "Expert endorsement"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Simple Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10">
        
        {/* Beta Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full">
            <FontAwesomeIcon icon={faEye} className="text-orange-400 text-sm" />
            <span className="text-orange-300 font-medium text-sm">JARVUS BETA • Testing Market Interest</span>
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Should We Build
            </span>
            <br />
            <span className="text-white">JARVUS AI?</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            We're testing the market for an AI career assistant that could revolutionize how students find their path. 
            <span className="text-cyan-400 font-semibold"> Try our demo and help us decide.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/jarvus-ai-demo')}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white text-lg font-semibold"
            >
              <FontAwesomeIcon icon={faRocket} className="mr-2" />
              Try Demo Interface
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/vision')}
              className="px-8 py-4 border border-cyan-500/50 rounded-xl text-cyan-400 text-lg font-semibold"
            >
              See Our Vision
            </motion.button>
          </div>

          {/* Simple Stats */}
          <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-1">{stats.users}+</div>
              <div className="text-gray-400 text-sm">Demo Testers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">{stats.feedback}+</div>
              <div className="text-gray-400 text-sm">Feedback Responses</div>
            </div>
          </div>
        </motion.div>

        {/* What We're Testing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">What JARVUS Could Be</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-cyan-500/20">
              <FontAwesomeIcon icon={faBrain} className="text-cyan-400 text-2xl mb-3" />
              <h3 className="text-xl font-semibold mb-2">AI Career Assistant</h3>
              <p className="text-gray-300">Personalized guidance, resume optimization, and interview prep powered by advanced AI.</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-6 border border-green-500/20">
              <FontAwesomeIcon icon={faUsers} className="text-green-400 text-2xl mb-3" />
              <h3 className="text-xl font-semibold mb-2">Student-First Platform</h3>
              <p className="text-gray-300">Built specifically for students, by people who understand the modern career journey.</p>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">What People Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-900/50 rounded-xl p-6 border border-gray-600/30"
              >
                <FontAwesomeIcon icon={faQuoteLeft} className="text-cyan-400 mb-3" />
                <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                  <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                    {testimonial.feedback}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-slate-900/50 rounded-xl p-8 border border-cyan-500/20"
        >
          <h2 className="text-3xl font-bold mb-4">Help Shape JARVUS</h2>
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            Your feedback determines whether we build the full platform. Try our demo and let us know what you think.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/jarvus-ai-demo')}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white text-lg font-semibold"
          >
            <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
            Try Demo Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage; 