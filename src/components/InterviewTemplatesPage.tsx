import { useState } from 'react';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import CodeIcon from '@mui/icons-material/Code';
import BarChartIcon from '@mui/icons-material/BarChart';
import ScienceIcon from '@mui/icons-material/Science';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import Analytics from '../utils/analytics';

const InterviewTemplatesPage = () => {
  const [selectedMajor, setSelectedMajor] = useState('');

  const majors = [
    {
      id: 'cs',
      name: 'Computer Science',
      icon: <CodeIcon className="w-6 h-6" />,
      description: 'Software Engineering, Full-Stack Development, DevOps',
      templates: [
        'Data Structures & Algorithms',
        'System Design',
        'Object-Oriented Programming',
        'Web Technologies'
      ]
    },
    {
      id: 'business',
      name: 'Business',
      icon: <BarChartIcon className="w-6 h-6" />,
      description: 'Business Analysis, Product Management, Marketing',
      templates: [
        'Market Analysis',
        'Product Strategy',
        'Business Case Studies',
        'Financial Modeling'
      ]
    },
    {
      id: 'engineering',
      name: 'Engineering',
      icon: <ArchitectureIcon className="w-6 h-6" />,
      description: 'Mechanical, Electrical, Civil Engineering',
      templates: [
        'Technical Problem Solving',
        'Engineering Design Process',
        'Project Management',
        'Safety & Regulations'
      ]
    },
    {
      id: 'science',
      name: 'Science',
      icon: <ScienceIcon className="w-6 h-6" />,
      description: 'Biology, Chemistry, Physics, Research',
      templates: [
        'Research Methodology',
        'Lab Techniques',
        'Data Analysis',
        'Scientific Writing'
      ]
    }
  ];

  const handleMajorSelect = (majorId: string) => {
    setSelectedMajor(majorId);
    Analytics.trackInteraction('interview_templates', `select_major_${majorId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Major-Specific Interview Templates
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get access to curated interview questions and templates tailored to your major and dream role.
          </p>
        </motion.div>

        {/* Major Selection Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {majors.map((major) => (
            <motion.div
              key={major.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className={`
                cursor-pointer rounded-xl p-6 border transition-all
                ${selectedMajor === major.id
                  ? 'bg-gradient-to-br from-[#71ADBA]/20 to-[#9C71BA]/20 border-[#71ADBA]'
                  : 'bg-gray-800/50 border-gray-700 hover:border-[#71ADBA]/50'
                }
              `}
              onClick={() => handleMajorSelect(major.id)}
            >
              <div className="flex items-center mb-4">
                <div className={`
                  p-3 rounded-lg mr-4
                  ${selectedMajor === major.id
                    ? 'bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white'
                    : 'bg-gray-700 text-gray-300'
                  }
                `}>
                  {major.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">{major.name}</h3>
              </div>
              <p className="text-gray-400 mb-4">{major.description}</p>
              {selectedMajor === major.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-2"
                >
                  {major.templates.map((template, index) => (
                    <div
                      key={index}
                      className="flex items-center text-sm text-gray-300"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#71ADBA] mr-2" />
                      {template}
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800/50 rounded-xl p-8 border border-gray-700"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Pro Features</h2>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-300">
                <SchoolIcon className="text-[#71ADBA] mr-3" />
                Major-specific interview questions
              </li>
              <li className="flex items-center text-gray-300">
                <WorkIcon className="text-[#71ADBA] mr-3" />
                Entry-level position templates
              </li>
              <li className="flex items-center text-gray-300">
                <CodeIcon className="text-[#71ADBA] mr-3" />
                Technical interview preparation
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-xl p-8 border border-[#71ADBA]/30"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Premium Features</h2>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-300">
                <SchoolIcon className="text-[#9C71BA] mr-3" />
                Advanced interview scenarios
              </li>
              <li className="flex items-center text-gray-300">
                <WorkIcon className="text-[#9C71BA] mr-3" />
                Industry-specific case studies
              </li>
              <li className="flex items-center text-gray-300">
                <CodeIcon className="text-[#9C71BA] mr-3" />
                1-on-1 mock interviews
              </li>
            </ul>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Ready to ace your interviews?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Get access to our comprehensive interview preparation templates and start your journey to landing your dream role.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => Analytics.trackInteraction('interview_templates', 'select_pro')}
              className="px-8 py-3 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Get Pro Access
            </button>
            <button
              onClick={() => Analytics.trackInteraction('interview_templates', 'select_premium')}
              className="px-8 py-3 bg-gradient-to-r from-[#9C71BA] to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Get Premium Access
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InterviewTemplatesPage; 