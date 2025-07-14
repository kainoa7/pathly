import { motion } from 'framer-motion';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PsychologyIcon from '@mui/icons-material/Psychology';
import RouteIcon from '@mui/icons-material/Route';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const HowItWorks = () => {
  const steps = [
    {
      icon: RocketLaunchIcon,
      title: "Take the vibe check ✨",
      description: "Quick quiz to understand your interests, skills, and goals - no pressure!",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: PsychologyIcon,
      title: "Get matched fr fr 🎯",
      description: "Our AI matches you with careers that actually fit your personality",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: RouteIcon,
      title: "See your roadmap 🗺️",
      description: "Get a personalized path to your dream career - we'll show you the way!",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: EmojiEventsIcon,
      title: "Level up your future 🚀",
      description: "Access resources, tips, and strategies to make it happen",
      color: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section className="py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 heading-gradient">
          How it works
        </h2>
        <p className="text-xl text-center text-gray-400 mb-16">
          Four simple steps to your dream career - no cap! 💯
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="glass-panel p-6 relative z-10 h-full">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} p-4 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#EDEAB1] mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-400">
                    {step.description}
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#71ADBA] to-[#EDEAB1] opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300" />
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
            className="inline-block"
          >
            <div className="glass-panel p-6 max-w-2xl mx-auto">
              <p className="text-lg text-[#EDEAB1] mb-2">🔥 Fun fact</p>
              <p className="text-gray-400">
                Over 70% of Gen Z wants to start their own business or work remotely.
                We'll help you find the path that matches your dreams!
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HowItWorks; 