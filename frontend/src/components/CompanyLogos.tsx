import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const features = [
  {
    title: "Start From Zero",
    description: "No experience? Perfect! Everyone starts somewhere. We'll guide you from day one.",
    icon: EmojiPeopleIcon,
    color: "rgba(113, 173, 186, 0.3)" // Jarvus blue glow
  },
  {
    title: "Learn By Doing",
    description: "Gain real experience through guided projects and internships tailored to beginners.",
    icon: SchoolIcon,
    color: "rgba(237, 234, 177, 0.3)" // Yellow glow
  },
  {
    title: "Grow Step by Step",
    description: "Follow our proven roadmap from beginner to professional. No rushing, just steady progress.",
    icon: TrendingUpIcon,
    color: "rgba(156, 113, 186, 0.3)" // Purple glow
  },
  {
    title: "Get Recognized",
    description: "Build a portfolio that showcases your growth and makes employers take notice.",
    icon: WorkspacePremiumIcon,
    color: "rgba(113, 173, 186, 0.3)" // Jarvus blue glow
  }
];

const CompanyLogos = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const navigate = useNavigate();

  return (
    <section className="py-16 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#71ADBA] via-[#EDEAB1] to-[#9C71BA] bg-clip-text text-transparent">
              No Experience? No Problem!
            </span>
          </h2>
          <p className="text-gray-300 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
            Everyone starts as a beginner. We're here to help you take your first steps with confidence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative bg-[#1a1f36] rounded-xl p-6 border border-white/10
                         hover:border-[#71ADBA]/20 hover:bg-[#1a1f36]/80 transition-all duration-300
                         h-full flex flex-col items-center text-center"
                style={{
                  boxShadow: `0 0 20px ${feature.color}`,
                }}
              >
                {/* Glow effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, ${feature.color} 0%, transparent 70%)`,
                  }}
                />
                
                <div className="relative z-10 mb-4">
                  <feature.icon className="w-12 h-12 text-[#EDEAB1]" />
                </div>

                <h3 className="text-xl font-semibold text-[#71ADBA] mb-3 relative z-10">
                  {feature.title}
                </h3>

                <p className="text-gray-300 relative z-10">
                  {feature.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-[#EDEAB1] text-lg mb-6">
            Join thousands of students who started from zero and found their path to success
          </p>
          <motion.button
            onClick={() => navigate('/onboarding')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-8 py-3 rounded-lg
                     shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyLogos; 