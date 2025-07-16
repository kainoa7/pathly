import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HandshakeIcon from '@mui/icons-material/Handshake';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CloseIcon from '@mui/icons-material/Close';
import InternshipAlerts from './InternshipAlerts';
import { useAuth } from '../context/AuthContext';

const InternshipsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleAlertSignup = () => {
    if (isAuthenticated) {
      // If user is authenticated, show success message
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000); // Hide success message after 3 seconds
    } else {
      // If user is not authenticated, show auth modal
      setShowAuthModal(true);
    }
  };

  return (
    <div className="min-h-screen page-container bg-gradient-to-br from-[#0f172a] via-[#1a2234] to-[#0f172a]">
      <div className="max-w-6xl mx-auto pt-8 sm:pt-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 px-4 sm:px-6 lg:px-8"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-[#71ADBA]/20 text-[#71ADBA] text-sm font-medium mb-6">
            New Feature
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] bg-clip-text text-transparent">
            Find Your Dream Internship
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
            Launch your career with internships at top companies. Get matched with opportunities that align with your goals.
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            <div className="bg-[#1a2234]/50 backdrop-blur-lg rounded-xl p-6 border border-[#71ADBA]/20">
              <div className="text-3xl font-bold text-[#71ADBA] mb-2">500+</div>
              <div className="text-gray-300">Active Internships</div>
            </div>
            <div className="bg-[#1a2234]/50 backdrop-blur-lg rounded-xl p-6 border border-[#71ADBA]/20">
              <div className="text-3xl font-bold text-[#9C71BA] mb-2">50+</div>
              <div className="text-gray-300">Partner Companies</div>
            </div>
            <div className="bg-[#1a2234]/50 backdrop-blur-lg rounded-xl p-6 border border-[#71ADBA]/20">
              <div className="text-3xl font-bold text-[#EDEAB1] mb-2">1000+</div>
              <div className="text-gray-300">Success Stories</div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1a2234]/50 backdrop-blur-lg rounded-xl p-6 sm:p-8 border border-[#71ADBA]/20"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-[#71ADBA]/10 rounded-lg">
                <WorkIcon className="w-6 h-6 text-[#71ADBA]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#EDEAB1]">Internship Matching</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Get matched with internships that align with your skills, interests, and career goals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1a2234]/50 backdrop-blur-lg rounded-xl p-6 sm:p-8 border border-[#71ADBA]/20"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-[#71ADBA]/10 rounded-lg">
                <TrendingUpIcon className="w-6 h-6 text-[#71ADBA]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#EDEAB1]">Application Tracking</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Track your applications, interviews, and follow-ups all in one place.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#1a2234]/50 backdrop-blur-lg rounded-xl p-6 sm:p-8 border border-[#71ADBA]/20"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-[#71ADBA]/10 rounded-lg">
                <HandshakeIcon className="w-6 h-6 text-[#71ADBA]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#EDEAB1]">Company Connections</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Connect directly with companies looking for interns in your field.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#1a2234]/50 backdrop-blur-lg rounded-xl p-6 sm:p-8 border border-[#71ADBA]/20"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-[#71ADBA]/10 rounded-lg">
                <RocketLaunchIcon className="w-6 h-6 text-[#71ADBA]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-[#EDEAB1]">Interview Prep</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Get ready for interviews with company-specific tips and practice questions.
            </p>
          </motion.div>
        </div>

        {/* Internship Alerts Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-xl" />
          <div className="relative">
            <InternshipAlerts onSubmit={handleAlertSignup} />
          </div>
        </div>

        {/* For Companies Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 backdrop-blur-sm p-8 sm:p-12 rounded-xl border border-[#71ADBA]/20 text-center max-w-4xl mx-auto mt-16 mb-16"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-[#EDEAB1] mb-4">
            Looking to Hire Interns?
          </h3>
          <p className="text-gray-300 text-lg mb-8">
            Connect with talented students and recent graduates. Post your internship opportunities and find the perfect candidates.
          </p>
          <button
            onClick={() => navigate('/for-companies')}
            className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white rounded-xl font-semibold hover:opacity-90 transition-all transform hover:scale-105"
          >
            Post Internship Opportunities
          </button>
        </motion.div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a2234] rounded-xl p-6 sm:p-8 max-w-md w-full relative shadow-xl">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <CloseIcon />
            </button>
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔔</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Create an Account</h3>
              <p className="text-gray-300">
                To receive internship alerts and access more features, you'll need to create a free account.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  setShowAuthModal(false);
                  navigate('/signup');
                }}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white rounded-xl font-semibold hover:opacity-90 transition-all transform hover:scale-105"
              >
                Sign Up
              </button>
              <button
                onClick={() => {
                  setShowAuthModal(false);
                  navigate('/login');
                }}
                className="flex-1 px-6 py-3 bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-600 transition-all transform hover:scale-105"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up">
          <div className="flex items-center gap-2">
            <span className="text-xl">✓</span>
            <p>Successfully signed up for alerts!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InternshipsPage; 