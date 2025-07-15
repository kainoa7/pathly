import { useState } from 'react';
import { motion } from 'framer-motion';

const EmailSignup = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual email signup
    setIsSubmitted(true);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {!isSubmitted ? (
        <motion.form
          onSubmit={handleSubmit}
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute -top-12 left-0 right-0 flex justify-center"
          >
            <div className="bg-[#1a1f36] px-4 py-2 rounded-full text-sm font-medium border border-[#EDEAB1]/20">
              <span className="text-[#EDEAB1]">🔥 Only 50 spots remaining today!</span>
            </div>
          </motion.div>
          
          <div className="flex gap-2 mt-16">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-xl bg-[#1a1f36] border border-[#71ADBA]/30 text-white placeholder-gray-400 focus:outline-none focus:border-[#71ADBA] transition-colors"
              required
            />
            <motion.button
              type="submit"
              className="px-6 py-4 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-xl text-white font-medium overflow-hidden relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-[#9C71BA] to-[#71ADBA]"
                initial={{ x: '-100%' }}
                animate={{ x: isHovered ? '100%' : '-100%' }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative">Join Waitlist →</span>
            </motion.button>
          </div>
          
          <motion.div
            className="mt-3 text-center text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="inline-flex items-center">
              <span className="mr-2">🔒</span>
              Join 1,000+ students who found their dream career
            </span>
          </motion.div>
        </motion.form>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-[#EDEAB1] mb-2">You're on the list!</h3>
          <p className="text-gray-400">We'll notify you when it's your turn to join.</p>
        </motion.div>
      )}
    </div>
  );
};

export default EmailSignup; 