import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PsychologyIcon from '@mui/icons-material/Psychology';
import RouteIcon from '@mui/icons-material/Route';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import GroupsIcon from '@mui/icons-material/Groups';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TimelineIcon from '@mui/icons-material/Timeline';
import BuildIcon from '@mui/icons-material/Build';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CodeIcon from '@mui/icons-material/Code';

const PlatformGuidePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "Career Discovery",
      description: "Find your perfect career path through our AI-powered matching system",
      icon: RocketLaunchIcon,
      details: [
        { text: "Personalized career quiz", icon: PsychologyIcon, link: "/quiz" },
        { text: "AI-driven recommendations", icon: AutoGraphIcon, link: "/tech-stack" },
        { text: "Industry insights", icon: WorkIcon, link: "/career-roadmap" }
      ]
    },
    {
      title: "Skill Development",
      description: "Build the skills you need to succeed in your chosen career",
      icon: BuildIcon,
      details: [
        { text: "Interactive tutorials", icon: MenuBookIcon, link: "/interview-templates" },
        { text: "Technical training", icon: CodeIcon, link: "/tech-stack" },
        { text: "Soft skills workshops", icon: GroupsIcon, link: "/community-stories" }
      ]
    },
    {
      title: "Career Planning",
      description: "Create your roadmap to success with expert guidance",
      icon: RouteIcon,
      details: [
        { text: "Custom roadmaps", icon: TimelineIcon, link: "/career-roadmap" },
        { text: "Progress tracking", icon: AutoGraphIcon, link: "/career-roadmap" },
        { text: "Goal setting", icon: EmojiEventsIcon, link: "/onboarding" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A1020] text-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a2234] to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] mb-6">
              Your Guide to Success
            </h1>
            <p className="text-xl text-[#71ADBA] max-w-2xl mx-auto">
              Discover how Nextly helps you navigate your career journey with personalized guidance and support 🚀
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="mb-20"
            >
              <div className="flex items-center gap-4 mb-8">
                <feature.icon className="w-8 h-8 text-[#EDEAB1]" />
                <h2 className="text-3xl font-bold">{feature.title}</h2>
              </div>
              <p className="text-[#71ADBA] text-xl mb-8 max-w-2xl">
                {feature.description}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {feature.details.map((detail, detailIndex) => (
                  <motion.div
                    key={detailIndex}
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#1a2234] p-6 rounded-xl border border-[#71ADBA]/20 cursor-pointer group"
                    onClick={() => navigate(detail.link)}
                  >
                    <detail.icon className="w-12 h-12 text-[#EDEAB1] mb-4" />
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      {detail.text}
                      <ArrowForwardIcon className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-transparent to-[#1a2234]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1a2234] p-8 rounded-2xl border border-[#71ADBA]/20"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Journey?</h2>
            <p className="text-[#71ADBA] mb-8">Join thousands of students who found their dream career with Nextly</p>
            <motion.button
              onClick={() => navigate('/onboarding')}
              className="px-8 py-4 bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] rounded-xl text-dark-background font-semibold text-lg hover:opacity-90 transition-opacity"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PlatformGuidePage; 