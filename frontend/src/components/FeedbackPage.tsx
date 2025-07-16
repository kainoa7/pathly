import { motion } from 'framer-motion';
import FeedbackSection from './FeedbackSection';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const FeedbackPage = () => {
  const recentSuggestions = [
    {
      title: "Add video tutorials for each career path",
      votes: 156,
      status: "Under Review",
      category: "Content"
    },
    {
      title: "Integrate with LinkedIn for profile import",
      votes: 142,
      status: "Planned",
      category: "Integration"
    },
    {
      title: "Add mock interview practice sessions",
      votes: 98,
      status: "In Progress",
      category: "Feature"
    }
  ];

  const implementedFeatures = [
    {
      title: "Community mentorship program",
      description: "Connect with experienced professionals in your field",
      date: "March 2024"
    },
    {
      title: "Career path visualization",
      description: "Interactive roadmap for different career paths",
      date: "February 2024"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
            Community Voice
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] bg-clip-text text-transparent">
            Help Shape Nextly's Future
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your feedback drives our improvements. Share your ideas and see what features the community is excited about.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Recent Suggestions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#1a1f36]/40 backdrop-blur-sm rounded-xl p-8 border border-[#71ADBA]/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <TrendingUpIcon className="text-[#EDEAB1] w-6 h-6" />
              <h2 className="text-2xl font-bold text-[#EDEAB1]">Trending Suggestions</h2>
            </div>
            <div className="space-y-4">
              {recentSuggestions.map((suggestion, index) => (
                <motion.div
                  key={suggestion.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#1a1f36] rounded-lg p-4 border border-[#71ADBA]/10"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-[#EDEAB1] font-medium mb-1">{suggestion.title}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">{suggestion.category}</span>
                        <span className="text-sm px-2 py-0.5 rounded bg-[#71ADBA]/20 text-[#71ADBA]">
                          {suggestion.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[#EDEAB1]">
                      <ThumbUpIcon className="w-4 h-4" />
                      <span>{suggestion.votes}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recently Implemented */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#1a1f36]/40 backdrop-blur-sm rounded-xl p-8 border border-[#71ADBA]/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <CheckCircleIcon className="text-[#EDEAB1] w-6 h-6" />
              <h2 className="text-2xl font-bold text-[#EDEAB1]">Recently Implemented</h2>
            </div>
            <div className="space-y-4">
              {implementedFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#1a1f36] rounded-lg p-4 border border-[#71ADBA]/10"
                >
                  <h3 className="text-[#EDEAB1] font-medium mb-1">{feature.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{feature.description}</p>
                  <span className="text-sm text-[#71ADBA]">Added {feature.date}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Submit Feedback Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1f36]/40 backdrop-blur-sm rounded-xl p-8 border border-[#71ADBA]/20 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <LightbulbIcon className="text-[#EDEAB1] w-6 h-6" />
            <h2 className="text-2xl font-bold text-[#EDEAB1]">Share Your Ideas</h2>
          </div>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Have a suggestion for how we can make Nextly better? We'd love to hear it! Click the button below to share your feedback.
          </p>
          <motion.button
            onClick={() => document.querySelector<HTMLButtonElement>('[data-feedback-trigger]')?.click()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-8 py-3 rounded-xl
                     shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Submit Feedback
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default FeedbackPage; 