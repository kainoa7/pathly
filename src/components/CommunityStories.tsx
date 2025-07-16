import { motion } from 'framer-motion';
import { useState } from 'react';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';

const CommunityStories = () => {
  const stories = [
    {
      name: "Alex Chen",
      title: "From Biology to Software Engineering",
      company: "Google",
      story: "Switched majors in my junior year. Pathly helped me navigate the transition and land my dream role.",
      achievement: "150k Starting Salary",
      icon: SchoolIcon,
      color: "from-[#71ADBA] to-[#9C71BA]"
    },
    {
      name: "Maya Patel",
      title: "Self-taught to FAANG",
      company: "Netflix",
      story: "No CS degree, just determination. Found my community here and crushed the interviews.",
      achievement: "4 Competing Offers",
      icon: WorkIcon,
      color: "from-[#9C71BA] to-[#EDEAB1]"
    },
    {
      name: "Jordan Taylor",
      title: "Career Pivot Success",
      company: "Microsoft",
      story: "Made the switch from marketing to product management. The mentorship was game-changing.",
      achievement: "40% Salary Increase",
      icon: TrendingUpIcon,
      color: "from-[#EDEAB1] to-[#71ADBA]"
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
            Success Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] bg-clip-text text-transparent">
            Real Stories, Real Results
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See how members of our community transformed their careers and achieved their goals.
          </p>
        </motion.div>

        {/* Success Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.name}
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
              
              {/* Achievement Badge */}
              <div className="absolute top-4 right-4 bg-[#71ADBA]/20 px-3 py-1 rounded-full flex items-center gap-1">
                <StarIcon className="w-4 h-4 text-[#EDEAB1]" />
                <span className="text-sm text-[#EDEAB1]">{story.achievement}</span>
              </div>

              <div className="relative z-10">
                <div className={`bg-gradient-to-r ${story.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <story.icon className="w-6 h-6 text-[#0f172a]" />
                </div>
                <h3 className="text-xl font-semibold text-[#EDEAB1] mb-2">{story.name}</h3>
                <h4 className="text-[#71ADBA] font-medium mb-3">{story.title}</h4>
                <p className="text-gray-400 mb-4">{story.story}</p>
                <p className="text-sm text-[#9C71BA]">Now at {story.company}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Inspiration Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-xl text-[#EDEAB1] italic">
            "Your success story could be next. Ready to start?"
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityStories; 