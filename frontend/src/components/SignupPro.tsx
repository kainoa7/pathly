import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SignupPro = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
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

  // Password strength validation
  const validatePassword = (password: string) => {
    const errors = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    
    return errors;
  };

  // Get password strength indicator
  const getPasswordStrength = (password: string) => {
    const errors = validatePassword(password);
    if (password.length === 0) return { strength: 'none', color: 'bg-gray-300' };
    if (errors.length > 3) return { strength: 'weak', color: 'bg-red-500' };
    if (errors.length > 1) return { strength: 'medium', color: 'bg-yellow-500' };
    return { strength: 'strong', color: 'bg-green-500' };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setErrors([]);

    // Client-side validation
    const validationErrors = [];
    
    if (!formData.firstName.trim()) {
      validationErrors.push('First name is required');
    }
    
    if (!formData.lastName.trim()) {
      validationErrors.push('Last name is required');
    }
    
    if (!formData.email.trim()) {
      validationErrors.push('Email is required');
    }
    
    if (!formData.university.trim()) {
      validationErrors.push('University is required');
    }
    
    if (!formData.graduationYear.trim()) {
      validationErrors.push('Graduation year is required');
    }
    
    if (!formData.password) {
      validationErrors.push('Password is required');
    }
    
    if (formData.password !== formData.confirmPassword) {
      validationErrors.push('Passwords do not match');
    }

    // Validate password strength
    const passwordErrors = validatePassword(formData.password);
    validationErrors.push(...passwordErrors);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          accountType: 'PRO' // Set account type to PRO
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Success - login user and redirect to pro dashboard
        login(data.user);
        navigate('/pro-dashboard');
      } else {
        // Handle error - show server errors
        setErrors(data.errors || [data.message || 'Failed to create account. Please try again.']);
      }
    } catch (err) {
      setErrors(['Network error. Please check your connection and try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGitHubSignup = async () => {
    try {
      // TODO: Implement GitHub OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/onboarding');
    } catch (err) {
      setErrors(['Failed to sign up with GitHub. Please try again.']);
    }
  };

  return (
    <div className="min-h-screen bg-dark-background pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto px-4 sm:px-6"
      >
        <div className="text-center mb-8">
          <div className="inline-block mb-4 px-4 py-1 rounded-full bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20">
            <span className="text-[#71ADBA] font-semibold">🚨 Limited Time Offer</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1]">
            Create Pro Account
          </h1>
          <p className="text-[#71ADBA]">Get lifetime access to all Pro features—free!</p>
        </div>

        <div className="bg-gradient-to-b from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-2xl p-8 shadow-xl border-2 border-[#71ADBA]">
          {/* GitHub Sign Up Button */}
          <button
            onClick={handleGitHubSignup}
            className="w-full py-3 px-4 rounded-lg border border-[#71ADBA] bg-dark-background text-white hover:bg-[#71ADBA]/10 transition-colors flex items-center justify-center gap-3 mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Sign up with GitHub
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#71ADBA]/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-dark-background text-gray-400">or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-dark-background border border-dark-border text-white focus:outline-none focus:border-[#71ADBA] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg bg-dark-background border border-dark-border text-white focus:outline-none focus:border-[#71ADBA] transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-dark-background border border-dark-border text-white focus:outline-none focus:border-[#71ADBA] transition-colors"
              />
            </div>

            <div>
              <label htmlFor="university" className="block text-sm font-medium text-gray-300 mb-1">
                University
              </label>
              <input
                type="text"
                id="university"
                name="university"
                required
                value={formData.university}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-dark-background border border-dark-border text-white focus:outline-none focus:border-[#71ADBA] transition-colors"
                placeholder="e.g. Stanford University"
              />
            </div>

            <div>
              <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-300 mb-1">
                Expected Graduation Year
              </label>
              <input
                type="text"
                id="graduationYear"
                name="graduationYear"
                required
                value={formData.graduationYear}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-dark-background border border-dark-border text-white focus:outline-none focus:border-[#71ADBA] transition-colors"
                placeholder="e.g. 2025"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-dark-background border border-dark-border text-white focus:outline-none focus:border-[#71ADBA] transition-colors"
              />
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrength(formData.password).color}`} 
                           style={{width: formData.password.length === 0 ? '0%' : 
                                          getPasswordStrength(formData.password).strength === 'weak' ? '33%' :
                                          getPasswordStrength(formData.password).strength === 'medium' ? '66%' : '100%'}}></div>
                    </div>
                    <span className="text-xs text-gray-400 capitalize">{getPasswordStrength(formData.password).strength}</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    Password must contain: 8+ characters, uppercase, lowercase, number, special character
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-dark-background border border-dark-border text-white focus:outline-none focus:border-[#71ADBA] transition-colors"
              />
            </div>

            {errors.length > 0 && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <div className="text-red-400 text-sm font-medium mb-1">Please fix the following issues:</div>
                <ul className="list-disc list-inside text-red-400 text-sm space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Pro Account...</span>
                </div>
              ) : (
                'Create Pro Account'
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-[#71ADBA] hover:text-[#9C71BA] transition-colors"
            >
              Log in
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPro; 