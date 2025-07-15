import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HandshakeIcon from '@mui/icons-material/Handshake';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const InternshipsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container bg-gradient-to-br from-[#0f172a] via-[#1a2234] to-[#0f172a]">
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

        {/* Coming Soon Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-[#71ADBA]/20 text-center max-w-2xl mx-auto mt-12 sm:mt-16"
        >
          <h3 className="text-2xl font-bold text-[#EDEAB1] mb-4">
            More Features Coming Soon!
          </h3>
          <p className="text-gray-300 mb-6">
            We're working on adding more features to help you land your dream internship. Stay tuned!
          </p>
          <button
            onClick={() => navigate('/waitlist')}
            className="w-full sm:w-auto px-8 py-3 bg-[#71ADBA] text-white rounded-xl font-semibold hover:bg-[#5C919C] transition-colors"
          >
            Join Waitlist
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default InternshipsPage; 