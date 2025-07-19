import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignupPremium = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    university: '',
    graduationYear: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          accountType: 'PREMIUM' // Create PREMIUM account
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success - login user and redirect to pro dashboard
        login(data.user);
        navigate('/ai-assistant'); // Go directly to AI assistant
      } else {
        setError(data.message || 'Failed to create account');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-background pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto px-4"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🧪 Create Premium Test Account
          </h1>
          <p className="text-[#71ADBA]">For testing AI Assistant features</p>
        </div>

        <div className="bg-gradient-to-b from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-2xl p-8 shadow-xl border-2 border-[#71ADBA]">
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-dark-background border border-[#71ADBA]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#71ADBA] focus:outline-none"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-dark-background border border-[#71ADBA]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#71ADBA] focus:outline-none"
              />
            </div>
            
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-dark-background border border-[#71ADBA]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#71ADBA] focus:outline-none"
            />
            
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-dark-background border border-[#71ADBA]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#71ADBA] focus:outline-none"
            />
            
            <input
              type="text"
              name="university"
              placeholder="University (optional)"
              value={formData.university}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-background border border-[#71ADBA]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#71ADBA] focus:outline-none"
            />
            
            <input
              type="text"
              name="graduationYear"
              placeholder="Graduation Year (optional)"
              value={formData.graduationYear}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-dark-background border border-[#71ADBA]/30 rounded-lg text-white placeholder-gray-400 focus:border-[#71ADBA] focus:outline-none"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? 'Creating...' : '🚀 Create Premium Account'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPremium;
