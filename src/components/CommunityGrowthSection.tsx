import { useEffect, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

const CommunityGrowthSection = () => {
  const [memberCount, setMemberCount] = useState(0);
  const controls = useAnimation();

  // Generate random member count between 4000-6000
  useEffect(() => {
    const randomCount = Math.floor(Math.random() * (6000 - 4000 + 1) + 4000);
    let current = 0;
    
    const interval = setInterval(() => {
      if (current < randomCount) {
        current += Math.floor((randomCount - current) / 10) + 1;
        setMemberCount(current > randomCount ? randomCount : current);
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Placeholder avatars with initials
  const avatars = [
    { initials: 'AJ', delay: 0 },
    { initials: 'KT', delay: 0.1 },
    { initials: 'SM', delay: 0.2 },
    { initials: 'RN', delay: 0.3 },
    { initials: 'LP', delay: 0.4 },
    { initials: 'DM', delay: 0.5 },
  ];

  const scrollToSignup = () => {
    const signupSection = document.getElementById('signup-section');
    if (signupSection) {
      signupSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-16 px-4 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Animated member count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
            Join {memberCount.toLocaleString()}+ others
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 mb-8"
        >
          The career platform trusted by Gen Z students & grads
        </motion.h2>

        {/* Floating avatars */}
        <div className="flex justify-center gap-2 mb-10">
          <AnimatePresence>
            {avatars.map((avatar, index) => (
              <motion.div
                key={avatar.initials}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: [0, -8, 0],
                  transition: {
                    y: {
                      repeat: Infinity,
                      duration: 2,
                      ease: "easeInOut",
                      delay: avatar.delay
                    },
                    opacity: {
                      duration: 0.4,
                      delay: avatar.delay
                    }
                  }
                }}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-medium shadow-lg"
              >
                {avatar.initials}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA Button */}
        <motion.button
          onClick={scrollToSignup}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="px-8 py-3 bg-sky-400 hover:bg-sky-500 text-white rounded-full font-medium shadow-xl hover:shadow-2xl transition-all duration-300 transform"
        >
          Join the Movement
        </motion.button>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-sky-300 to-indigo-300 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default CommunityGrowthSection; 