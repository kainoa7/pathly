import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const features = [
  {
    title: "Start Right",
    description: "Learn what actually gets you hired, not what schools teach.",
    icon: EmojiPeopleIcon,
    gradient: "from-[#71ADBA] to-[#9C71BA]",
    bgGlow: "group-hover:shadow-[0_0_40px_-5px_rgba(113,173,186,0.4)]"
  },
  {
    title: "Build Real Skills", 
    description: "Projects that make recruiters stop scrolling.",
    icon: SchoolIcon,
    gradient: "from-[#EDEAB1] to-[#71ADBA]",
    bgGlow: "group-hover:shadow-[0_0_40px_-5px_rgba(237,234,177,0.4)]"
  },
  {
    title: "Move Fast",
    description: "Get results in weeks while others take years.",
    icon: TrendingUpIcon,
    gradient: "from-[#9C71BA] to-[#EDEAB1]",
    bgGlow: "group-hover:shadow-[0_0_40px_-5px_rgba(156,113,186,0.4)]"
  },
  {
    title: "Stand Out",
    description: "Portfolio so impressive, companies reach out to you.",
    icon: WorkspacePremiumIcon,
    gradient: "from-[#71ADBA] to-[#9C71BA]",
    bgGlow: "group-hover:shadow-[0_0_40px_-5px_rgba(113,173,186,0.4)]"
  }
];

const CompanyLogos = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const navigate = useNavigate();

  return (
    <section className="relative py-20 px-4" ref={ref}>
      {/* Subtle section depth overlay without breaking the flow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-800/15 to-transparent" />
      
      {/* Minimal animated background orbs that complement global background */}
      <motion.div
        className="absolute top-40 left-40 w-72 h-72 bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 40, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-40 right-40 w-96 h-96 bg-gradient-to-r from-[#EDEAB1]/10 to-[#71ADBA]/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -35, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Enhanced title with multiple background layers */}
          <div className="relative inline-block">
            <motion.span
              className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-[#71ADBA] via-[#EDEAB1] to-[#9C71BA] opacity-20 blur-2xl"
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 360, 0],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.span
              className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-[#9C71BA] via-[#71ADBA] to-[#EDEAB1] opacity-30 blur-xl"
              animate={{
                scale: [1.15, 1, 1.15],
                rotate: [360, 0, 360],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <h2 className="relative text-5xl md:text-6xl lg:text-7xl font-black mb-6 py-4">
              <span className="bg-gradient-to-r from-[#71ADBA] via-[#EDEAB1] to-[#9C71BA] bg-clip-text text-transparent">
                Beginner? Perfect. You're Our Favorite.
              </span>
            </h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-2xl md:text-3xl font-bold text-white mb-4">
              We turn beginners into top candidates. No experience? No problem. You'll learn exactly what works.
            </p>
            <div className="flex justify-center items-center gap-2 mt-6">
              <div className="w-16 h-1 bg-gradient-to-r from-[#71ADBA] to-[#EDEAB1] rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-[#EDEAB1] rounded-full animate-bounce"></div>
              <div className="w-16 h-1 bg-gradient-to-r from-[#EDEAB1] to-[#9C71BA] rounded-full animate-pulse"></div>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -8 }}
                className={`relative p-8 rounded-2xl transition-all duration-500 transform-gpu ${feature.bgGlow} 
                         h-full flex flex-col items-center text-center overflow-hidden min-h-[320px]`}
              >
                {/* Dynamic multi-layer background */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-lg"></div>
                
                {/* Animated border gradient */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-50 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${feature.gradient.replace('from-', '').replace('to-', '').split(' ')[0]}, transparent, ${feature.gradient.replace('from-', '').replace('to-', '').split(' ')[1]})`,
                    backgroundSize: '400% 400%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                
                {/* Inner border */}
                <div className="absolute inset-[2px] bg-gradient-to-br from-gray-900/98 via-gray-800/98 to-gray-900/98 rounded-[14px] backdrop-blur-lg"></div>
                
                {/* Floating particles */}
                <motion.div
                  className="absolute top-6 right-6 w-2 h-2 bg-white/30 rounded-full"
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />
                <motion.div
                  className="absolute bottom-8 left-8 w-1 h-1 bg-white/40 rounded-full"
                  animate={{
                    x: [0, 12, 0],
                    opacity: [0.4, 0.9, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                />
                
                <div className="relative z-10 flex-1 flex flex-col justify-between">
                  <div className="flex-1 flex flex-col items-center">
                    {/* Enhanced icon with glow effect */}
                    <motion.div
                      className="relative mb-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {/* Icon background glow */}
                      <motion.div
                        className={`absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-r ${feature.gradient} opacity-40 blur-xl`}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.4, 0.7, 0.4],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      
                      {/* Icon container */}
                      <div className={`relative w-16 h-16 rounded-full bg-gradient-to-r ${feature.gradient} p-3 shadow-2xl`}>
                        <feature.icon className="w-full h-full text-white" />
                      </div>
                      
                      {/* Feature number badge */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white text-gray-900 rounded-full flex items-center justify-center text-xs font-black shadow-lg">
                        {index + 1}
                      </div>
                    </motion.div>

                    {/* Enhanced title */}
                    <motion.h3
                      className={`text-2xl md:text-2xl font-black mb-4 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent transform-gpu transition-transform duration-300 group-hover:scale-105`}
                    >
                      {feature.title}
                    </motion.h3>

                    {/* Enhanced description */}
                    <motion.p 
                      className="text-lg text-gray-300 leading-relaxed font-medium transform-gpu transition-all duration-300 group-hover:text-white group-hover:scale-105"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {feature.description}
                    </motion.p>
                  </div>

                  {/* Progress indicator */}
                  <motion.div
                    className="mt-6 flex justify-center"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                  >
                    <div className={`h-1 bg-gradient-to-r ${feature.gradient} rounded-full w-12 group-hover:w-20 transition-all duration-300`}></div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.p 
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            3,247 beginners already ahead of you
          </motion.p>
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.0 }}
          >
            They started with zero experience. Now they're getting hired at top companies.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <motion.button
              onClick={() => navigate('/signup-explorer')}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-10 py-5 text-xl font-bold text-white rounded-2xl bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] hover:from-[#5a9ba8] hover:to-[#8a5fa8] transform hover:shadow-2xl hover:shadow-[#71ADBA]/30 transition-all duration-500"
            >
              <span className="relative z-10">Join Them Now</span>
              
              {/* Button glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#5a9ba8] to-[#8a5fa8] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Floating sparkles */}
              <motion.div
                className="absolute -top-1 -right-1 w-2 h-2 bg-white/60 rounded-full"
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 0.5,
                }}
              />
              <motion.div
                className="absolute -bottom-1 -left-1 w-1 h-1 bg-white/40 rounded-full"
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: 1.0,
                }}
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyLogos; 