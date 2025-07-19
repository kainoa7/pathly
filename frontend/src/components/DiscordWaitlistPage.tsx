import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DiscordIcon from '@mui/icons-material/AlternateEmail';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const DiscordWaitlistPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [discordUsername, setDiscordUsername] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !discordUsername) {
      setErrorMessage('Please fill in all fields');
      setStatus('error');
      return;
    }

    setStatus('submitting');

    try {
      // Send email to jarvus.help@gmail.com using Formspree
      const response = await fetch('https://formspree.io/f/xgegkzrw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          discordUsername,
          _replyto: email,
          _subject: 'New Discord Community Waitlist Signup',
          message: `New waitlist signup:\nEmail: ${email}\nDiscord Username: ${discordUsername}`,
        }),
      });

      if (response.ok) {
        setStatus('success');
        // Clear form
        setEmail('');
        setDiscordUsername('');
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Failed to join waitlist. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-8">
            <img src="/discord-logo.svg" alt="Discord" className="w-20 h-20" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] bg-clip-text text-transparent">
            Join Our Discord Community
          </h1>
          <p className="text-xl text-gray-300">
            Be one of the first 500 members to join our exclusive career networking community
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1a1f36]/40 backdrop-blur-sm p-8 rounded-xl border border-[#71ADBA]/20"
        >
          {status === 'success' ? (
            <div className="text-center py-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex justify-center mb-6"
              >
                <CheckCircleIcon className="w-16 h-16 text-green-500" />
              </motion.div>
              <h2 className="text-2xl font-bold text-[#EDEAB1] mb-4">
                You're on the List!
              </h2>
              <p className="text-gray-300 mb-8">
                We'll notify you as soon as our Discord community launches.
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-[#1a1f36] rounded-xl text-[#EDEAB1] font-semibold hover:bg-[#1a1f36]/70 transition-all duration-300"
              >
                Back to Home
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-[#EDEAB1] font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1a1f36] border border-[#71ADBA]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#71ADBA] transition-colors"
                  placeholder="your@email.com"
                  disabled={status === 'submitting'}
                />
              </div>

              <div>
                <label htmlFor="discord" className="block text-[#EDEAB1] font-medium mb-2">
                  Discord Username
                </label>
                <div className="relative">
                  <DiscordIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#5865F2]" />
                  <input
                    type="text"
                    id="discord"
                    value={discordUsername}
                    onChange={(e) => setDiscordUsername(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-[#1a1f36] border border-[#71ADBA]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#71ADBA] transition-colors"
                    placeholder="username#0000"
                    disabled={status === 'submitting'}
                  />
                </div>
              </div>

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center space-x-2 text-red-400 bg-red-400/10 p-3 rounded-lg"
                >
                  <ErrorIcon className="w-5 h-5" />
                  <span>{errorMessage}</span>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full px-6 py-3 bg-[#5865F2] rounded-xl text-white font-semibold hover:bg-[#4752C4] transition-colors duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Joining...</span>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span>Join Waitlist</span>
                    <span className="ml-2 text-sm bg-white/20 px-2 py-1 rounded">500 spots left</span>
                  </div>
                )}
              </button>

              <p className="text-center text-gray-400 text-sm">
                By joining, you agree to receive email updates about our Discord community launch.
              </p>
            </form>
          )}
        </motion.div>

        {/* Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[
            {
              title: "Exclusive Access",
              description: "Be among the first to join our community"
            },
            {
              title: "Network Growth",
              description: "Connect with peers in your industry"
            },
            {
              title: "Career Resources",
              description: "Access guides, templates, and tools"
            },
            {
              title: "Job Opportunities",
              description: "Get early access to job postings"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-[#1a1f36]/20 p-6 rounded-xl border border-[#71ADBA]/10"
            >
              <h3 className="text-[#EDEAB1] font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default DiscordWaitlistPage; 