import { motion } from 'framer-motion';
import { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import StarIcon from '@mui/icons-material/Star';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Analytics from '../utils/analytics';

const PricingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentStatus: 'high-school', // or 'college'
    interests: [] as string[],
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Track form submission
    Analytics.trackInteraction('pricing', 'early_access_request');

    try {
      // In production, this would be your backend endpoint
      // For now, we'll use a mailto link
      const mailtoLink = `mailto:pathly.help@gmail.com?subject=Early Access Request - ${formData.studentStatus}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0AStudent Status: ${formData.studentStatus}%0D%0AInterests: ${formData.interests.join(', ')}%0D%0AMessage: ${formData.message}`;
      window.location.href = mailtoLink;
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error('Error sending form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCheckboxChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter(i => i !== value)
        : [...prev.interests, value]
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Choose Your Path to Success
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get 50% off during our early access period. Limited time offer for students ready to take control of their future.
            </p>
          </motion.div>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Free Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 border border-gray-700"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">Explorer</h3>
            <p className="text-gray-400 mb-6">Perfect for getting started</p>
            <div className="text-3xl font-bold text-white mb-8">Free</div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-300">
                <CheckIcon className="text-green-400 mr-2" />
                Basic Career Quiz
              </li>
              <li className="flex items-center text-gray-300">
                <CheckIcon className="text-green-400 mr-2" />
                Major Recommendations
              </li>
              <li className="flex items-center text-gray-300">
                <CheckIcon className="text-green-400 mr-2" />
                Basic Career Insights
              </li>
            </ul>
            <button
              onClick={() => Analytics.trackInteraction('pricing', 'select_free_tier')}
              className="w-full px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Get Started
            </button>
          </motion.div>

          {/* Pro Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-[#71ADBA]/10 to-[#9C71BA]/10 backdrop-blur-lg rounded-xl p-8 border border-[#71ADBA]/30 lg:scale-105 relative"
          >
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Pro</h3>
            <p className="text-gray-400 mb-6">For serious career planning</p>
            <div className="flex items-center mb-8">
              <span className="text-3xl font-bold text-white">$4.99</span>
              <span className="text-gray-400 ml-2">/month</span>
              <span className="ml-2 text-green-400 line-through text-sm">$9.99</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-300">
                <StarIcon className="text-[#71ADBA] mr-2" />
                Everything in Explorer
              </li>
              <li className="flex items-center text-gray-300">
                <StarIcon className="text-[#71ADBA] mr-2" />
                Detailed Career Roadmaps
              </li>
              <li className="flex items-center text-gray-300">
                <StarIcon className="text-[#71ADBA] mr-2" />
                Salary Insights & Trends
              </li>
              <li className="flex items-center text-gray-300">
                <StarIcon className="text-[#71ADBA] mr-2" />
                Industry Expert Tips
              </li>
              <li className="flex items-center text-gray-300">
                <StarIcon className="text-[#71ADBA] mr-2" />
                Resume Builder
              </li>
              <li className="flex items-center text-gray-300">
                <StarIcon className="text-[#71ADBA] mr-2" />
                Basic Interview Templates
              </li>
            </ul>
            <button
              onClick={() => Analytics.trackInteraction('pricing', 'select_pro_tier')}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Get 50% Off Now
            </button>
          </motion.div>

          {/* Premium Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 border border-gray-700"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">Premium</h3>
            <p className="text-gray-400 mb-6">Full career development suite</p>
            <div className="flex items-center mb-8">
              <span className="text-3xl font-bold text-white">$9.99</span>
              <span className="text-gray-400 ml-2">/month</span>
              <span className="ml-2 text-green-400 line-through text-sm">$19.99</span>
            </div>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center text-gray-300">
                <RocketLaunchIcon className="text-[#9C71BA] mr-2" />
                Everything in Pro
              </li>
              <li className="flex items-center text-gray-300">
                <RocketLaunchIcon className="text-[#9C71BA] mr-2" />
                <span>1-on-1 Career Coaching</span>
              </li>
              <li className="flex items-center text-gray-300">
                <RocketLaunchIcon className="text-[#9C71BA] mr-2" />
                <span>Advanced Interview Templates</span>
              </li>
              <li className="flex items-center text-gray-300">
                <RocketLaunchIcon className="text-[#9C71BA] mr-2" />
                <span>Mock Interview Sessions</span>
              </li>
              <li className="flex items-center text-gray-300">
                <RocketLaunchIcon className="text-[#9C71BA] mr-2" />
                <span>Private Discord Community</span>
              </li>
              <li className="flex items-center text-gray-300">
                <RocketLaunchIcon className="text-[#9C71BA] mr-2" />
                <span>Priority Support</span>
              </li>
            </ul>
            <button
              onClick={() => Analytics.trackInteraction('pricing', 'select_premium_tier')}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#9C71BA] to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Get 50% Off Now
            </button>
          </motion.div>
        </div>

        {/* Early Access Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 border border-gray-700">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">
              Get Early Access
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#71ADBA] focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#71ADBA] focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  I am a...
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="studentStatus"
                      value="high-school"
                      checked={formData.studentStatus === 'high-school'}
                      onChange={(e) => setFormData(prev => ({ ...prev, studentStatus: e.target.value }))}
                      className="mr-2"
                    />
                    <span className="text-gray-300">High School Student</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="studentStatus"
                      value="college"
                      checked={formData.studentStatus === 'college'}
                      onChange={(e) => setFormData(prev => ({ ...prev, studentStatus: e.target.value }))}
                      className="mr-2"
                    />
                    <span className="text-gray-300">College Student</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  I'm interested in... (select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {['Career Planning', 'Major Selection', 'Interview Prep', 'Resume Building'].map((interest) => (
                    <label key={interest} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleCheckboxChange(interest)}
                        className="mr-2"
                      />
                      <span className="text-gray-300">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message (optional)
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#71ADBA] focus:border-transparent"
                  placeholder="Tell us what you're looking for..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white font-medium rounded-lg disabled:opacity-50 transition-all duration-200"
              >
                {isSubmitting ? 'Sending...' : 'Request Early Access'}
              </motion.button>
            </form>

            {showSuccess && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg"
              >
                <p className="text-green-400 text-center">
                  Thanks! We'll be in touch soon about your early access.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage; 