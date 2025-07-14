import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import CompanyLogos from './CompanyLogos';
import TestimonialSection from './TestimonialSection';
import HowItWorks from './HowItWorks';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 pb-16">
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
            <div className="absolute inset-0 bg-[#71ADBA] blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
            <img 
              src="/logo.png" 
              alt="PathFinder Logo" 
              className="w-40 h-40 mx-auto relative z-10" 
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight heading-gradient"
          >
            Find Your Perfect Career Path
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-[#71ADBA] mb-12 leading-relaxed"
          >
            Discover the right major and career path that aligns with your passions, skills, and goals.
            Let us guide you to your future.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="space-y-4"
          >
            <button
              onClick={() => navigate('/onboarding')}
              className="btn btn-primary inline-flex items-center"
            >
              <img 
                src="/logo.png" 
                alt="" 
                className="w-8 h-8 mr-2" 
              />
              Start Your Journey
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Company Logos Section */}
      <CompanyLogos />

      {/* Testimonials Section */}
      <TestimonialSection />

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center text-[#71ADBA] py-8"
      >
        <p className="text-sm">
          Join thousands of students who found their path with PathFinder
        </p>
      </motion.div>
    </div>
  );
};

export default LandingPage; 