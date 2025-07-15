import { motion } from 'framer-motion';
import { useState } from 'react';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ForumIcon from '@mui/icons-material/Forum';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const CommunityStories = () => {
  const [selectedStory, setSelectedStory] = useState(null);

  const milestones = [
    {
      count: "500+",
      label: "Active Members",
      icon: PeopleIcon,
      color: "from-[#71ADBA] to-[#9C71BA]"
    },
    {
      count: "89%",
      label: "Success Rate",
      icon: EmojiEventsIcon,
      color: "from-[#9C71BA] to-[#EDEAB1]"
    },
    {
      count: "150+",
      label: "Career Transitions",
      icon: WorkspacePremiumIcon,
      color: "from-[#EDEAB1] to-[#71ADBA]"
    }
  ];

  const communityUpdates = [
    {
      title: "Weekly Peer Support Sessions",
      description: "Join our supportive community every Wednesday for peer-to-peer mentoring. Share challenges, celebrate wins, and grow together.",
      icon: ForumIcon,
      tag: "Community",
      date: "Every Wednesday"
    },
    {
      title: "New Member Welcome Program",
      description: "Get paired with an experienced community member who'll help you navigate your first steps in tech.",
      icon: GroupAddIcon,
      tag: "Mentorship",
      date: "Ongoing"
    },
    {
      title: "Monthly Success Celebrations",
      description: "We celebrate every win - from landing first interviews to accepting dream job offers. Your success is our success!",
      icon: CelebrationIcon,
      tag: "Celebrations",
      date: "Monthly"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-4 py-1 rounded-full text-sm font-medium mb-4 inline-block">
            Our Community
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] bg-clip-text text-transparent">
            More Than Just a Platform
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join a supportive community of peers who understand your journey. We're all in this together.
          </p>
        </motion.div>

        {/* Community Milestones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1a1f36]/40 backdrop-blur-sm rounded-xl p-8 border border-[#71ADBA]/20"
            >
              <div className={`bg-gradient-to-r ${milestone.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4`}>
                <milestone.icon className="w-8 h-8 text-[#0f172a]" />
              </div>
              <h3 className="text-4xl font-bold text-[#EDEAB1] mb-2">{milestone.count}</h3>
              <p className="text-gray-400">{milestone.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Community Updates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {communityUpdates.map((update, index) => (
            <motion.div
              key={update.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-[#1a1f36]/40 backdrop-blur-sm rounded-xl p-8 border border-[#71ADBA]/20 
                       hover:border-[#71ADBA]/40 transition-all duration-300 relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#71ADBA]/5 to-[#9C71BA]/5 
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Tag */}
              <div className="absolute top-4 right-4 bg-[#71ADBA]/20 px-3 py-1 rounded-full">
                <span className="text-sm text-[#71ADBA]">{update.tag}</span>
              </div>

              <div className="relative z-10">
                <update.icon className="w-10 h-10 text-[#EDEAB1] mb-4" />
                <h3 className="text-xl font-semibold text-[#EDEAB1] mb-3">{update.title}</h3>
                <p className="text-gray-400 mb-4">{update.description}</p>
                <p className="text-[#71ADBA] text-sm">{update.date}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-xl text-[#EDEAB1] mb-6">
            Ready to be part of something bigger?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-8 py-3 rounded-xl
                     shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Join Our Community
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityStories; 