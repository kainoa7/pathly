import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import Analytics from '../utils/analytics';

interface LocationState {
  featureName: string;
  featureDescription: string;
  featureIcon: string;
}

const ComingSoonFeaturePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const state = location.state as LocationState;
  const { featureName, featureDescription, featureIcon } = state || {
    featureName: 'This Feature',
    featureDescription: 'We\'re working on something exciting!',
    featureIcon: '🚀'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Track signup attempt
    Analytics.trackInteraction('coming_soon', `${featureName.toLowerCase()}_signup`);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setShowSuccess(true);
    setIsSubmitting(false);
    
    // Reset form after 2 seconds
    setTimeout(() => {
      setEmail('');
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-6xl mb-6">{featureIcon}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {featureName} is Coming Soon!
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            {featureDescription}
          </p>
        </motion.div>

        {/* Sign Up Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 max-w-xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6">
            <NotificationsActiveIcon className="text-[#71ADBA] text-2xl" />
            <h2 className="text-2xl font-semibold text-white">Get Notified</h2>
          </div>
          <p className="text-gray-300 mb-8">
            Be the first to know when {featureName} launches. Sign up for exclusive updates and early access.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#71ADBA] transition-colors"
                required
              />
            </div>
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-6 py-3 rounded-lg font-medium text-white 
                         bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] 
                         hover:opacity-90 transition-opacity
                         flex items-center justify-center gap-2
                         ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RocketLaunchIcon className="w-5 h-5" />
              {isSubmitting ? 'Signing up...' : 'Notify Me'}
            </motion.button>
            {showSuccess && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-green-400 mt-4"
              >
                Thanks! We'll keep you updated.
              </motion.p>
            )}
          </form>
        </motion.div>

        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ← Go back
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoonFeaturePage; 