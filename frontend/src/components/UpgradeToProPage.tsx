import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faRocket, faCheck, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const UpgradeToProPage = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    university: '',
    graduationYear: '',
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrors([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }

    setIsLoading(true);
    setErrors([]);

    // Client-side validation
    const validationErrors = [];
    
    if (!formData.university.trim()) {
      validationErrors.push('University is required for Pro accounts');
    }
    
    if (!formData.graduationYear.trim()) {
      validationErrors.push('Graduation year is required for Pro accounts');
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/auth/upgrade-to-pro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: user.email,
          university: formData.university,
          graduationYear: formData.graduationYear,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update user context with new Pro account
        login({ ...user, accountType: 'PRO', ...formData });
        
        // Redirect to Pro dashboard
        navigate('/pro-dashboard', {
          state: { 
            message: '🎉 Welcome to Pro! Your account has been upgraded successfully!' 
          }
        });
      } else {
        setErrors(data.errors || [data.message || 'Upgrade failed. Please try again.']);
      }
    } catch (err) {
      console.error('Network Error:', err);
      setErrors(['Network error. Please check your connection and try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  const proFeatures = [
    'Daily News Hub with Tech, Business, Finance updates',
    'Save & Bookmark Articles',
    'Comment & Vote on News Articles',
    'Major Salary Comparison Tool with 10-Year Projections',
    'Career Analytics Dashboard with Data Insights',
    'Exclusive Founding Member Community Access',
    'Priority Support',
    'University Directory & Student Marketplace (Coming Soon)'
  ];

  return (
    <div className="min-h-screen bg-dark-background pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto px-4 sm:px-6"
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>Back</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] flex items-center justify-center">
              <FontAwesomeIcon icon={faStar} className="text-white text-xl" />
            </div>
            <FontAwesomeIcon icon={faRocket} className="text-[#EDEAB1] text-2xl" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1]">
            Upgrade to Pro
          </h1>
          <p className="text-xl text-gray-400">
            Complete your profile to unlock all Pro features
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upgrade Form */}
          <div className="bg-dark-backgroundSecondary rounded-2xl p-8 shadow-xl border border-dark-border">
            <h2 className="text-2xl font-bold text-white mb-6">Complete Your Profile</h2>
            
            {/* Pre-filled User Info */}
            <div className="mb-6 p-4 bg-[#71ADBA]/10 rounded-lg border border-[#71ADBA]/20">
              <h3 className="text-sm font-medium text-[#71ADBA] mb-2">Your Account Info</h3>
              <div className="space-y-1 text-sm text-gray-300">
                <p><strong>Name:</strong> {user?.firstName} {user?.lastName}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Account:</strong> Explorer → Pro</p>
              </div>
            </div>
            
            {errors.length > 0 && (
              <div className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                {errors.map((error, index) => (
                  <p key={index} className="text-red-400 text-sm">{error}</p>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="university" className="block text-sm font-medium text-gray-300 mb-2">
                  University/College
                </label>
                <input
                  type="text"
                  id="university"
                  name="university"
                  value={formData.university}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-dark-background border border-dark-border text-white placeholder-gray-500 focus:ring-2 focus:ring-[#71ADBA] focus:border-transparent"
                  placeholder="e.g., Stanford University"
                  required
                />
              </div>

              <div>
                <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-300 mb-2">
                  Graduation Year
                </label>
                <input
                  type="text"
                  id="graduationYear"
                  name="graduationYear"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-dark-background border border-dark-border text-white placeholder-gray-500 focus:ring-2 focus:ring-[#71ADBA] focus:border-transparent"
                  placeholder="e.g., 2025"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white font-bold rounded-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Upgrading...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <FontAwesomeIcon icon={faRocket} />
                    Upgrade to Pro
                  </div>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                🔒 Your account will be upgraded immediately
              </p>
            </div>
          </div>

          {/* Pro Features List */}
          <div className="bg-gradient-to-br from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-2xl p-8 border border-[#71ADBA]/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <FontAwesomeIcon icon={faStar} className="text-[#EDEAB1]" />
              Pro Features
            </h3>
            
            <div className="space-y-4">
              {proFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center mt-0.5">
                    <FontAwesomeIcon icon={faCheck} className="text-white text-xs" />
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-[#EDEAB1]/10 rounded-lg border border-[#EDEAB1]/20">
              <p className="text-[#EDEAB1] text-sm text-center">
                <FontAwesomeIcon icon={faRocket} className="mr-2" />
                Join 1,000+ Pro members building their careers
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default UpgradeToProPage; 