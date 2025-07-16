import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import LockIcon from '@mui/icons-material/Lock';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email: string) => {
    const validDomains = ['.com', '.edu', '.org', '.net', '.gov', '.io', '.dev'];
    const hasValidDomain = validDomains.some(domain => email.toLowerCase().endsWith(domain));
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }
    
    if (!hasValidDomain) {
      setEmailError('Please use a valid email domain (e.g. .com, .edu, .org)');
      return false;
    }

    setEmailError('');
    return true;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail) {
      validateEmail(newEmail);
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // TODO: Implement actual login logic here
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Login attempted with:', { email, password });
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-navy-800/30">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [-20, 0, -20],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -left-4 top-1/4 w-12 h-12 rounded-full bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] blur-sm"
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -right-4 top-1/3 w-10 h-10 rounded-full bg-gradient-to-r from-[#9C71BA] to-[#EDEAB1] blur-sm"
        />
      </div>

      <div className="max-w-md w-full space-y-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mt-6 text-center text-3xl font-bold bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] bg-clip-text text-transparent">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Don't have an account?{' '}
            <Link
              to="/pricing"
              className="font-medium text-[#EDEAB1] hover:text-[#71ADBA] transition-colors"
            >
              Get started free →
            </Link>
          </p>
        </motion.div>

        <motion.form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="rounded-lg bg-[#1a2234]/90 p-6 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="mt-1 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#1E2537] border border-[#71ADBA]/20 text-white font-medium placeholder-gray-400 focus:outline-none focus:border-[#71ADBA]/50 transition-all duration-300"
                  placeholder="Enter your email"
                />
                {emailError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute text-sm text-red-400 mt-1"
                  >
                    {emailError}
                  </motion.p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#1E2537] border border-[#71ADBA]/20 text-white font-medium placeholder-gray-400 focus:outline-none focus:border-[#71ADBA]/50 transition-all duration-300"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-[#71ADBA] focus:ring-[#71ADBA]"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-[#EDEAB1] hover:text-[#71ADBA] transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 rounded-lg bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white font-medium hover:opacity-95 transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    ⚡️
                  </motion.div>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#71ADBA]/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#1a2234] text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2.5 px-4 rounded-lg bg-[#1E2537] border border-[#71ADBA]/20 text-sm font-medium text-gray-300 hover:bg-[#1E2537]/80 transition-all duration-300"
                >
                  <GoogleIcon className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2.5 px-4 rounded-lg bg-[#1E2537] border border-[#71ADBA]/20 text-sm font-medium text-gray-300 hover:bg-[#1E2537]/80 transition-all duration-300"
                >
                  <GitHubIcon className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2.5 px-4 rounded-lg bg-[#1E2537] border border-[#71ADBA]/20 text-sm font-medium text-gray-300 hover:bg-[#1E2537]/80 transition-all duration-300"
                >
                  <LinkedInIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.form>

        <div className="flex items-center justify-center space-x-2 text-sm text-gray-400 mt-8">
          <LockIcon className="w-4 h-4" />
          <span>Your data is securely encrypted</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 