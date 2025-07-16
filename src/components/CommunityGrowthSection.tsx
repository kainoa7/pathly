import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import CelebrationIcon from '@mui/icons-material/Celebration';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import WhatshotIcon from '@mui/icons-material/Whatshot';

const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  tag, 
  tagColor, 
  delay = 0 
}: { 
  title: string;
  description: string;
  icon: JSX.Element;
  tag: string;
  tagColor: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ scale: 1.02 }}
    className="bg-[#1a2234]/60 backdrop-blur-sm p-6 rounded-2xl border border-[#71ADBA]/20 relative overflow-hidden group"
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
      initial={{ x: '-100%' }}
      whileHover={{ x: '100%' }}
      transition={{ duration: 0.6 }}
    />
    
    <div className={`text-${tagColor} mb-2 flex items-center gap-2`}>
      <span className="text-sm font-medium">{tag}</span>
      <motion.div
        className={`w-2 h-2 rounded-full bg-${tagColor}`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
    
    <div className="flex items-start gap-4">
      <div className="mt-1">{icon}</div>
      <div>
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  </motion.div>
);

const CommunityGrowthSection = () => {
  const navigate = useNavigate();
  
  const features = [
    {
      title: "Weekly Peer Support Sessions",
      description: "Join our weekly vibe sessions every Wednesday! Share your wins, get advice, and connect with peers who get it. Real talk, no filters. 💯",
      icon: <PeopleIcon className="w-6 h-6 text-[#71ADBA]" />,
      tag: "Community",
      tagColor: "[#71ADBA]"
    },
    {
      title: "New Member Welcome Program",
      description: "Get matched with a peer mentor who's been there, done that. They'll help you navigate the tech scene and avoid the common L's. No cap! 🚀",
      icon: <WorkspacePremiumIcon className="w-6 h-6 text-[#9C71BA]" />,
      tag: "Mentorship",
      tagColor: "[#9C71BA]"
    },
    {
      title: "Monthly Success Celebrations",
      description: "We go all out celebrating your W's! From first interviews to dream job offers - your success = major hype in our community! 🎉",
      icon: <EmojiEventsIcon className="w-6 h-6 text-[#EDEAB1]" />,
      tag: "Celebrations",
      tagColor: "[#EDEAB1]"
    }
  ];

  const stats = [
    { label: "Active Members", value: "500+", icon: <PeopleIcon className="w-5 h-5" /> },
    { label: "Success Rate", value: "89%", icon: <TrendingUpIcon className="w-5 h-5" /> },
    { label: "Career Transitions", value: "150+", icon: <CelebrationIcon className="w-5 h-5" /> }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(113,173,186,0.03)] to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          <div className="inline-flex items-center gap-2 bg-[#1a2234]/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-[#71ADBA]/20 shadow-lg mb-8">
            <WhatshotIcon className="w-5 h-5 text-[#EDEAB1]" />
            <span className="text-gray-300">Join the fastest-growing tech career community</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-[#EDEAB1]">
            Level Up Your Career Game
          </h2>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            No more scrolling through random career advice. Get the real support, connections, and guidance you need to make it in tech.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mt-12 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#1a2234]/40 backdrop-blur-sm rounded-xl p-4 border border-[#71ADBA]/10"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="text-[#EDEAB1]">{stat.icon}</div>
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                delay={index * 0.2}
              />
            ))}
          </div>

          <motion.button
            onClick={() => navigate('/pricing')}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-12 px-8 py-4 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-xl text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative">Join Our Community</span>
          </motion.button>

          <p className="text-gray-400 text-sm mt-4">
            Limited spots available - secure your spot now! 🔥
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityGrowthSection; 