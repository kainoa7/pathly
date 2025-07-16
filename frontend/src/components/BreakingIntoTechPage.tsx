import { motion } from 'framer-motion';
import { useState } from 'react';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import CodeIcon from '@mui/icons-material/Code';
import BuildIcon from '@mui/icons-material/Build';
import GroupIcon from '@mui/icons-material/Group';
import TimelineIcon from '@mui/icons-material/Timeline';

const successStories = [
  {
    name: "Sarah Chen",
    role: "Software Engineer @ Google",
    background: "Non-CS Major",
    story: "Started with zero coding experience, self-taught through online courses while working full-time. Built projects on weekends, networked on Twitter, and landed her dream role after 14 months.",
    tips: ["Focus on fundamentals", "Build real projects", "Network actively"],
    path: "Self-taught → Bootcamp → Internship → Full-time SWE"
  },
  {
    name: "Marcus Johnson",
    role: "Product Manager @ Meta",
    background: "History Major",
    story: "Transitioned from teaching to tech through product management. Used his teaching experience to demonstrate leadership and user empathy.",
    tips: ["Leverage existing skills", "Learn PM fundamentals", "Practice product cases"],
    path: "Teacher → EdTech → APM Program → PM"
  },
  {
    name: "Priya Patel",
    role: "Data Engineer @ Netflix",
    background: "Career Switcher",
    story: "Former marketing analyst who taught herself SQL and Python. Created data pipelines for local businesses to build portfolio.",
    tips: ["Master SQL", "Build end-to-end projects", "Contribute to open source"],
    path: "Marketing → Data Analysis → Data Engineering"
  }
];

const resources = [
  {
    title: "Learning Platforms",
    items: [
      "LeetCode - Interview prep",
      "System Design Primer",
      "Full Stack Open",
      "MIT OpenCourseWare"
    ]
  },
  {
    title: "Project Ideas",
    items: [
      "Clone popular apps",
      "Build API integrations",
      "Create developer tools",
      "Contribute to open source"
    ]
  },
  {
    title: "Interview Prep",
    items: [
      "Data Structures & Algorithms",
      "System Design",
      "Behavioral Questions",
      "Mock Interviews"
    ]
  }
];

const BreakingIntoTechPage = () => {
  const [selectedStory, setSelectedStory] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#71ADBA] via-[#EDEAB1] to-[#71ADBA] bg-clip-text text-transparent">
            Breaking Into Big Tech
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real stories from people who successfully transitioned into tech roles at top companies.
            Learn from their experiences and get actionable advice for your journey.
          </p>
        </motion.div>

        {/* Success Stories */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-[#EDEAB1] mb-8 text-center">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-[#1a1f36]/50 backdrop-blur-sm rounded-xl p-6 border border-white/10
                         hover:border-[#71ADBA]/20 transition-all duration-300"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-white mb-1">{story.name}</h3>
                  <p className="text-[#71ADBA]">{story.role}</p>
                  <p className="text-sm text-gray-400">{story.background}</p>
                </div>
                <p className="text-gray-300 mb-4">{story.story}</p>
                <div className="space-y-2">
                  <p className="text-[#EDEAB1] font-medium">Key Tips:</p>
                  <ul className="list-disc list-inside text-gray-300 text-sm">
                    {story.tips.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-sm text-[#71ADBA]">Path: {story.path}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Resources Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-[#EDEAB1] mb-8 text-center">Essential Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resources.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-[#1a1f36]/50 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <h3 className="text-xl font-semibold text-[#71ADBA] mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-gray-300 flex items-center">
                      <span className="w-2 h-2 bg-[#71ADBA] rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-xl p-8"
        >
          <h2 className="text-2xl font-bold text-[#EDEAB1] mb-4">Ready to Start Your Journey?</h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Take our career assessment to get personalized recommendations and create your roadmap to success.
          </p>
          <motion.a
            href="/onboarding"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-xl text-white font-medium"
          >
            Start Your Tech Journey
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default BreakingIntoTechPage; 