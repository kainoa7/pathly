import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import EventIcon from '@mui/icons-material/Event';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const CampusLifePage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container bg-gradient-to-br from-[#0f172a] via-[#1a2234] to-[#0f172a]">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] bg-clip-text text-transparent">
            Campus Life
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Make the most of your college experience with our comprehensive guide to campus life.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1a2234]/50 backdrop-blur-lg rounded-xl p-8 border border-[#71ADBA]/20"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-[#71ADBA]/10 rounded-lg">
                <SchoolIcon className="w-6 h-6 text-[#71ADBA]" />
              </div>
              <h2 className="text-2xl font-semibold text-[#EDEAB1]">Academic Success</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Tips and strategies for excelling in your classes, managing your time, and building strong study habits.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1a2234]/50 backdrop-blur-lg rounded-xl p-8 border border-[#71ADBA]/20"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-[#71ADBA]/10 rounded-lg">
                <GroupsIcon className="w-6 h-6 text-[#71ADBA]" />
              </div>
              <h2 className="text-2xl font-semibold text-[#EDEAB1]">Student Organizations</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Find and join clubs, organizations, and groups that match your interests and career goals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#1a2234]/50 backdrop-blur-lg rounded-xl p-8 border border-[#71ADBA]/20"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-[#71ADBA]/10 rounded-lg">
                <EventIcon className="w-6 h-6 text-[#71ADBA]" />
              </div>
              <h2 className="text-2xl font-semibold text-[#EDEAB1]">Campus Events</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Stay updated on campus events, workshops, and networking opportunities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#1a2234]/50 backdrop-blur-lg rounded-xl p-8 border border-[#71ADBA]/20"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-[#71ADBA]/10 rounded-lg">
                <EmojiEventsIcon className="w-6 h-6 text-[#71ADBA]" />
              </div>
              <h2 className="text-2xl font-semibold text-[#EDEAB1]">Student Success Stories</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Get inspired by stories of students who've made the most of their campus experience.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CampusLifePage; 