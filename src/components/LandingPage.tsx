import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CompanyLogos from './CompanyLogos';
import TestimonialSection from './TestimonialSection';
import HowItWorks from './HowItWorks';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="main-content flex items-center justify-center min-h-[calc(100vh-5rem)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl text-center"
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 relative group"
          >
            <div className="absolute inset-0 bg-[#71ADBA] blur-3xl opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
            <img 
              src="/logo.png" 
              alt="PathFinder Logo" 
              className="w-40 h-40 mx-auto relative z-10 hover:rotate-12 transition-transform duration-300" 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              <span className="heading-gradient">Lost in the career maze? 🤔</span>
              <br />
              <span className="text-4xl md:text-6xl">We got you! ✨</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-[#71ADBA] mb-8 leading-relaxed"
            >
              No cap - finding your perfect career path shouldn't be this hard.
              <br />
              <span className="text-[#EDEAB1]">Let's level up your future together! 🚀</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => navigate('/onboarding')}
                  className="btn btn-primary group inline-flex items-center text-lg"
                >
                  <span className="group-hover:scale-110 transition-transform">🎯</span>
                  <span className="mx-2">Start Your Journey</span>
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="py-12 px-4"
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="glass-panel p-6 text-center">
            <h3 className="text-4xl font-bold text-[#EDEAB1] mb-2">73%</h3>
            <p className="text-gray-400">of Gen Z feeling lost about their career path</p>
          </div>
          <div className="glass-panel p-6 text-center">
            <h3 className="text-4xl font-bold text-[#EDEAB1] mb-2">2X</h3>
            <p className="text-gray-400">faster path to finding your dream career</p>
          </div>
          <div className="glass-panel p-6 text-center">
            <h3 className="text-4xl font-bold text-[#EDEAB1] mb-2">10K+</h3>
            <p className="text-gray-400">students already found their path</p>
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Company Logos Section */}
      <CompanyLogos />

      {/* Testimonials Section */}
      <TestimonialSection />

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="py-16 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold heading-gradient mb-8">
            Ready to unlock your future? 🔓
          </h2>
          <p className="text-xl text-[#71ADBA] mb-8">
            Join thousands of students who found their path with PathFinder
            <br />
            <span className="text-[#EDEAB1]">Your dream career is just a few clicks away!</span>
          </p>
          <button
            onClick={() => navigate('/onboarding')}
            className="btn btn-primary group inline-flex items-center text-lg"
          >
            <span className="group-hover:scale-110 transition-transform">🎯</span>
            <span className="mx-2">Get Started</span>
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </button>
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage; 