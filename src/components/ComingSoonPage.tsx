import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ComingSoonPageProps {
  title: string;
  description: string;
  icon?: string;
}

const ComingSoonPage = ({ title, description, icon = '🚀' }: ComingSoonPageProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full text-center"
      >
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-6xl mb-6"
        >
          {icon}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#71ADBA] via-white to-[#EDEAB1] text-transparent bg-clip-text"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-300 mb-8"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="bg-[#1a1f36] p-6 rounded-xl w-full max-w-md">
            <h3 className="text-[#EDEAB1] font-semibold mb-4">Get Early Access</h3>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-[#2d3a4f] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#71ADBA]"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-lg text-white font-medium"
              >
                Notify Me
              </motion.button>
            </div>
          </div>

          <motion.button
            onClick={() => navigate(-1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-[#71ADBA] hover:text-[#9C71BA] transition-colors"
          >
            ← Go Back
          </motion.button>
        </motion.div>

        {/* Animated background elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 50,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0"
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-gradient-to-br from-[#71ADBA]/10 to-[#9C71BA]/10 blur-3xl"
                style={{
                  width: `${Math.random() * 400 + 200}px`,
                  height: `${Math.random() * 400 + 200}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ComingSoonPage; 