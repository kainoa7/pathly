import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import PeopleIcon from '@mui/icons-material/People';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SchoolIcon from '@mui/icons-material/School';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { useState } from 'react';

const AboutPage = () => {
  const navigate = useNavigate();
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const teamValues = [
    {
      icon: PeopleIcon,
      title: "Student-First Approach",
      description: "Every feature and decision is made with students' success in mind",
      detailedDescription: "We understand that every student's journey is unique. Our platform adapts to your individual needs, learning style, and career aspirations. Whether you're a first-year student or about to graduate, we're here to support your personal growth and success."
    },
    {
      icon: RocketLaunchIcon,
      title: "Innovation Focus",
      description: "Constantly evolving our platform with cutting-edge technology",
      detailedDescription: "Using AI-powered recommendations, real-time industry data, and personalized learning paths, we're revolutionizing how students discover and prepare for their dream careers. Our tech stack is always evolving to provide you with the best tools for success."
    },
    {
      icon: SchoolIcon,
      title: "Educational Excellence",
      description: "Committed to providing accurate, up-to-date career guidance",
      detailedDescription: "Our career guidance is backed by extensive research, partnerships with leading universities, and continuous updates from industry experts. We ensure you have access to the most current and relevant information for making informed decisions about your future."
    },
    {
      icon: AutoGraphIcon,
      title: "Personalized Growth",
      description: "Tailored pathways for your unique career journey",
      detailedDescription: "Your success story is unique, and your career path should reflect that. We analyze your interests, skills, and goals to create custom roadmaps, connecting you with opportunities that align perfectly with your aspirations. No one-size-fits-all approaches here!"
    }
  ];

  return (
    <div className="page-container bg-gradient-to-br from-[#0f172a] via-[#1a2234] to-[#0f172a]">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] bg-clip-text text-transparent">
            About Pathly
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We're on a mission to revolutionize career guidance for the next generation.
          </p>
        </motion.div>

        {/* Tech Stack & System Design Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/tech-stack')}
            className="bg-[#1a2234]/50 backdrop-blur-lg rounded-xl p-8 border border-[#71ADBA]/20 cursor-pointer group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-[#71ADBA]/10 rounded-lg group-hover:bg-[#71ADBA]/20 transition-colors">
                <CodeIcon className="w-6 h-6 text-[#71ADBA]" />
              </div>
              <h2 className="text-2xl font-semibold text-[#EDEAB1]">Our Tech Stack</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Explore the cutting-edge technologies powering Pathly's platform and features.
            </p>
            <span className="text-[#71ADBA] group-hover:underline">Learn more →</span>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/system-design')}
            className="bg-[#1a2234]/50 backdrop-blur-lg rounded-xl p-8 border border-[#71ADBA]/20 cursor-pointer group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-[#71ADBA]/10 rounded-lg group-hover:bg-[#71ADBA]/20 transition-colors">
                <ArchitectureIcon className="w-6 h-6 text-[#71ADBA]" />
              </div>
              <h2 className="text-2xl font-semibold text-[#EDEAB1]">System Design</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Discover how we've built a scalable, secure, and efficient platform.
            </p>
            <span className="text-[#71ADBA] group-hover:underline">Learn more →</span>
          </motion.div>
        </motion.div>

        {/* Team Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-[#EDEAB1] mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="relative h-[300px] perspective-1000"
                  onMouseEnter={() => setFlippedCard(index)}
                  onMouseLeave={() => setFlippedCard(null)}
                >
                  <motion.div
                    className="w-full h-full"
                    animate={{
                      rotateY: flippedCard === index ? 180 : 0,
                    }}
                    transition={{ duration: 0.6 }}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Front of card */}
                    <div
                      className={`absolute w-full h-full bg-[#1a2234]/50 backdrop-blur-lg rounded-xl p-6 border border-[#71ADBA]/20
                                backface-hidden transition-all duration-300 ${flippedCard === index ? 'opacity-0' : 'opacity-100'}`}
                    >
                      <div className="p-3 bg-[#71ADBA]/10 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-[#71ADBA]" />
                      </div>
                      <h3 className="text-xl font-semibold text-[#EDEAB1] mb-2">{value.title}</h3>
                      <p className="text-gray-300">{value.description}</p>
                    </div>

                    {/* Back of card */}
                    <div
                      className={`absolute w-full h-full bg-[#1a2234]/50 backdrop-blur-lg rounded-xl p-6 border border-[#71ADBA]/20
                                backface-hidden transition-all duration-300 transform rotateY-180
                                ${flippedCard === index ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <p className="text-gray-300 leading-relaxed h-full flex items-center">
                        {value.detailedDescription}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-[#EDEAB1] mb-6">Ready to Start Your Journey?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have found their perfect career path with Pathly.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/onboarding')}
            className="px-8 py-4 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-xl text-white font-semibold 
                     hover:shadow-lg hover:shadow-[#71ADBA]/20 transition-all"
          >
            Begin Your Story With Us
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage; 