import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import Analytics from '../utils/analytics';

const AnnouncementsPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Track signup attempt
    Analytics.trackInteraction('announcements', 'early_access_signup');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setShowSuccess(true);
    setIsSubmitting(false);
    
    // Navigate to sign up after 2 seconds
    setTimeout(() => {
      navigate('/signup');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Join the Future of Career Guidance
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get early access to Nextly and be part of shaping the future of career development.
              Sign up now for exclusive benefits and updates.
            </p>
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700"
          >
            <RocketLaunchIcon className="text-[#71ADBA] text-3xl mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Early Access</h3>
            <p className="text-gray-300">
              Be among the first to experience our innovative career guidance platform.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700"
          >
            <NotificationsActiveIcon className="text-[#71ADBA] text-3xl mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Priority Updates</h3>
            <p className="text-gray-300">
              Receive exclusive updates and announcements before anyone else.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700"
          >
            <WorkspacePremiumIcon className="text-[#71ADBA] text-3xl mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Premium Preview</h3>
            <p className="text-gray-300">
              Get a sneak peek at premium features during the beta phase.
            </p>
          </motion.div>
        </div>

        {/* Sign Up Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">
              Get Started Now
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#71ADBA] focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white font-medium rounded-lg disabled:opacity-50 transition-all duration-200"
              >
                {isSubmitting ? 'Processing...' : 'Join Early Access'}
              </motion.button>
            </form>

            {showSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg"
              >
                <p className="text-green-400 text-center">
                  Thanks for joining! Redirecting you to complete your profile...
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400">
            Join 1,000+ students already signed up for early access
          </p>
          <div className="flex justify-center items-center space-x-8 mt-6">
            {['google', 'microsoft', 'apple', 'meta', 'tesla'].map((company) => (
              <img
                key={company}
                src={`/logos/${company}.svg`}
                alt={company}
                className="h-6 opacity-50 grayscale hover:opacity-75 hover:grayscale-0 transition-all duration-300"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnnouncementsPage; 