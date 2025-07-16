import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import QuizIcon from '@mui/icons-material/Quiz';
import CloseIcon from '@mui/icons-material/Close';
import Analytics from '../utils/analytics';

interface Major {
  name: string;
  type: 'masters' | 'bachelors' | 'associates' | 'no-degree';
  description: string;
  careers: string[];
  averageSalary: string;
  timeToComplete: string;
  skills: string[];
}

const majors: Major[] = [
  // Masters Degrees
  {
    name: 'Data Science & Analytics',
    type: 'masters',
    description: 'Advanced study of data analysis, machine learning, and statistical methods for extracting insights from complex datasets.',
    careers: ['Data Scientist', 'Machine Learning Engineer', 'Analytics Manager', 'Research Scientist'],
    averageSalary: '$90,000 - $180,000',
    timeToComplete: '1-2 years',
    skills: ['Machine Learning', 'Python/R', 'Big Data', 'Statistical Analysis']
  },
  {
    name: 'Business Administration (MBA)',
    type: 'masters',
    description: 'Advanced business education focusing on leadership, strategy, and organizational management.',
    careers: ['Executive Manager', 'Management Consultant', 'Investment Banker', 'Strategy Director'],
    averageSalary: '$100,000 - $200,000',
    timeToComplete: '2 years',
    skills: ['Leadership', 'Strategic Planning', 'Financial Management', 'Business Analytics']
  },
  {
    name: 'Computer Science',
    type: 'masters',
    description: 'Advanced study of computing theory, software development, and specialized areas like AI and cybersecurity.',
    careers: ['Software Architect', 'AI Researcher', 'Security Engineer', 'Technical Lead'],
    averageSalary: '$95,000 - $190,000',
    timeToComplete: '1-2 years',
    skills: ['Advanced Algorithms', 'Machine Learning', 'System Architecture', 'Research Methods']
  },
  {
    name: 'Clinical Psychology',
    type: 'masters',
    description: 'Advanced study of psychological theory and clinical practice for mental health treatment.',
    careers: ['Clinical Psychologist', 'Mental Health Director', 'Research Psychologist', 'Behavioral Specialist'],
    averageSalary: '$70,000 - $120,000',
    timeToComplete: '2-3 years',
    skills: ['Clinical Assessment', 'Psychotherapy', 'Research Methods', 'Diagnostic Evaluation']
  },
  {
    name: 'Engineering Management',
    type: 'masters',
    description: 'Combines technical expertise with business and management skills for leading engineering teams.',
    careers: ['Engineering Manager', 'Technical Director', 'Project Manager', 'Chief Technical Officer'],
    averageSalary: '$100,000 - $180,000',
    timeToComplete: '1-2 years',
    skills: ['Project Management', 'Technical Leadership', 'Risk Management', 'Strategic Planning']
  },

  // Bachelor's Degrees
  {
    name: 'Computer Science',
    type: 'bachelors',
    description: 'Study the theory and practice of computing, including programming, software development, and computer systems.',
    careers: ['Software Engineer', 'Data Scientist', 'Systems Architect'],
    averageSalary: '$85,000 - $150,000',
    timeToComplete: '4 years',
    skills: ['Programming', 'Problem Solving', 'Algorithm Design']
  },
  {
    name: 'Business Administration',
    type: 'bachelors',
    description: 'Learn fundamental business principles, management techniques, and organizational strategies.',
    careers: ['Business Manager', 'Marketing Director', 'Entrepreneur'],
    averageSalary: '$60,000 - $120,000',
    timeToComplete: '4 years',
    skills: ['Leadership', 'Strategic Planning', 'Financial Analysis']
  },
  {
    name: 'Psychology',
    type: 'bachelors',
    description: 'Study human behavior, mental processes, and psychological research methods.',
    careers: ['Counselor', 'HR Specialist', 'Research Assistant'],
    averageSalary: '$45,000 - $85,000',
    timeToComplete: '4 years',
    skills: ['Research', 'Communication', 'Critical Thinking']
  },
  {
    name: 'Mechanical Engineering',
    type: 'bachelors',
    description: 'Design and analyze mechanical systems, from robots to renewable energy solutions.',
    careers: ['Mechanical Engineer', 'Product Designer', 'Project Manager'],
    averageSalary: '$70,000 - $130,000',
    timeToComplete: '4 years',
    skills: ['CAD Design', 'Problem Solving', 'Mathematics']
  },
  {
    name: 'Marketing',
    type: 'bachelors',
    description: 'Learn to create and execute marketing strategies across digital and traditional channels.',
    careers: ['Marketing Manager', 'Brand Strategist', 'Social Media Director'],
    averageSalary: '$55,000 - $120,000',
    timeToComplete: '4 years',
    skills: ['Digital Marketing', 'Analytics', 'Content Creation']
  },
  {
    name: 'Biology',
    type: 'bachelors',
    description: 'Study life processes, organisms, and the interconnections between living things.',
    careers: ['Research Scientist', 'Lab Technician', 'Healthcare Professional'],
    averageSalary: '$50,000 - $95,000',
    timeToComplete: '4 years',
    skills: ['Lab Techniques', 'Research', 'Data Analysis']
  },
  {
    name: 'Graphic Design',
    type: 'bachelors',
    description: 'Create visual content for digital and print media using design principles and software.',
    careers: ['Graphic Designer', 'UI Designer', 'Art Director'],
    averageSalary: '$45,000 - $90,000',
    timeToComplete: '4 years',
    skills: ['Adobe Creative Suite', 'Typography', 'Visual Design']
  },
  {
    name: 'Finance',
    type: 'bachelors',
    description: 'Study financial markets, investment strategies, and corporate finance principles.',
    careers: ['Financial Analyst', 'Investment Banker', 'Portfolio Manager'],
    averageSalary: '$65,000 - $140,000',
    timeToComplete: '4 years',
    skills: ['Financial Modeling', 'Analysis', 'Risk Management']
  },

  // Associate's Degrees
  {
    name: 'Nursing',
    type: 'associates',
    description: 'Develop skills in patient care, medical procedures, and healthcare management.',
    careers: ['Registered Nurse', 'Healthcare Coordinator', 'Clinical Specialist'],
    averageSalary: '$65,000 - $95,000',
    timeToComplete: '2 years',
    skills: ['Patient Care', 'Medical Knowledge', 'Communication']
  },
  {
    name: 'Dental Hygiene',
    type: 'associates',
    description: 'Learn dental care procedures, patient education, and preventive dental practices.',
    careers: ['Dental Hygienist', 'Dental Assistant', 'Oral Health Educator'],
    averageSalary: '$70,000 - $100,000',
    timeToComplete: '2 years',
    skills: ['Dental Procedures', 'Patient Care', 'Health Education']
  },
  {
    name: 'Paralegal Studies',
    type: 'associates',
    description: 'Study legal procedures, research methods, and document preparation.',
    careers: ['Paralegal', 'Legal Assistant', 'Law Office Manager'],
    averageSalary: '$45,000 - $75,000',
    timeToComplete: '2 years',
    skills: ['Legal Research', 'Documentation', 'Organization']
  },
  {
    name: 'Medical Laboratory Technology',
    type: 'associates',
    description: 'Learn to perform laboratory tests and procedures in healthcare settings.',
    careers: ['Lab Technician', 'Medical Technologist', 'Clinical Laboratory Technician'],
    averageSalary: '$40,000 - $65,000',
    timeToComplete: '2 years',
    skills: ['Lab Procedures', 'Equipment Operation', 'Attention to Detail']
  },
  {
    name: 'Automotive Technology',
    type: 'associates',
    description: 'Study vehicle systems, repair procedures, and diagnostic techniques.',
    careers: ['Automotive Technician', 'Service Manager', 'Diagnostics Specialist'],
    averageSalary: '$35,000 - $70,000',
    timeToComplete: '2 years',
    skills: ['Mechanical Repair', 'Diagnostics', 'Problem Solving']
  },

  // No Degree Required
  {
    name: 'Web Development',
    type: 'no-degree',
    description: 'Learn to create and maintain websites and web applications through bootcamps and certifications.',
    careers: ['Web Developer', 'Frontend Developer', 'UX Designer'],
    averageSalary: '$50,000 - $100,000',
    timeToComplete: '6 months - 1 year',
    skills: ['HTML/CSS', 'JavaScript', 'Web Design']
  },
  {
    name: 'Digital Marketing',
    type: 'no-degree',
    description: 'Master social media, SEO, and digital advertising through certifications and hands-on experience.',
    careers: ['Social Media Manager', 'SEO Specialist', 'Content Marketer'],
    averageSalary: '$40,000 - $80,000',
    timeToComplete: '3-6 months',
    skills: ['Social Media', 'SEO', 'Content Strategy']
  },
  {
    name: 'UI/UX Design',
    type: 'no-degree',
    description: 'Learn user interface design, user experience principles, and design tools through bootcamps.',
    careers: ['UI Designer', 'UX Designer', 'Product Designer'],
    averageSalary: '$55,000 - $110,000',
    timeToComplete: '6 months - 1 year',
    skills: ['Figma', 'User Research', 'Prototyping']
  },
  {
    name: 'Sales',
    type: 'no-degree',
    description: 'Develop sales techniques, customer relationship management, and negotiation skills through training.',
    careers: ['Sales Representative', 'Account Manager', 'Business Development'],
    averageSalary: '$40,000 - $100,000+',
    timeToComplete: '1-3 months',
    skills: ['Negotiation', 'Communication', 'CRM Software']
  },
  {
    name: 'Project Management',
    type: 'no-degree',
    description: 'Learn project planning, team management, and agile methodologies through certifications.',
    careers: ['Project Manager', 'Scrum Master', 'Program Coordinator'],
    averageSalary: '$50,000 - $100,000',
    timeToComplete: '3-6 months',
    skills: ['Agile', 'Leadership', 'Organization']
  },
  {
    name: 'Data Analytics',
    type: 'no-degree',
    description: 'Master data analysis tools, visualization, and statistical methods through bootcamps.',
    careers: ['Data Analyst', 'Business Intelligence Analyst', 'Marketing Analyst'],
    averageSalary: '$45,000 - $90,000',
    timeToComplete: '3-6 months',
    skills: ['SQL', 'Python', 'Data Visualization']
  }
];

const educationLevels = [
  { value: 'all', label: 'All Education Levels' },
  { value: 'masters', label: 'Masters Degree' },
  { value: 'bachelors', label: 'Bachelors Degree' },
  { value: 'associates', label: 'Associates Degree' },
  { value: 'no-degree', label: 'No College Required' }
];

const MajorSelectionPage = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);

  const handleMajorClick = (major: Major) => {
    setSelectedMajor(major);
    Analytics.trackInteraction('major_selection', `view_major_${major.name.toLowerCase().replace(/\s+/g, '_')}`);
  };

  const handleTakeQuiz = () => {
    Analytics.trackInteraction('major_selection', 'start_quiz');
    navigate('/quiz');
  };

  const filteredMajors = majors.filter(major => {
    const matchesLevel = selectedLevel === 'all' || major.type === selectedLevel;
    const matchesSearch = major.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Explore Your Future Major
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover detailed information about different majors and find the perfect path for your career goals.
            </p>
          </motion.div>
        </div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-stretch">
            {/* Education Level Dropdown */}
            <div className="flex-1">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-[#71ADBA] focus:ring-2 focus:ring-[#71ADBA] focus:ring-opacity-50 transition-all"
              >
                {educationLevels.map(level => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Bar */}
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search majors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-xl bg-gray-800 text-white border border-gray-700 focus:border-[#71ADBA] focus:ring-2 focus:ring-[#71ADBA] focus:ring-opacity-50 transition-all"
              />
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </motion.div>

        {/* Quiz CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 rounded-xl p-8 mb-12 text-center"
        >
          <QuizIcon className="text-[#71ADBA] text-4xl mb-4" />
          <h2 className="text-2xl font-semibold text-white mb-4">
            Not Sure Which Major to Choose?
          </h2>
          <p className="text-gray-300 mb-6">
            Take our career quiz to discover majors that match your interests and goals.
          </p>
          <button
            onClick={handleTakeQuiz}
            className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            Take Career Quiz
          </button>
        </motion.div>

        {/* Results Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredMajors.map((major, index) => (
            <motion.div
              key={major.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleMajorClick(major)}
              className="bg-gray-800 rounded-xl p-6 cursor-pointer hover:bg-gray-700 transition-colors"
            >
              <h3 className="text-xl font-semibold text-white mb-2">{major.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{major.description}</p>
              <div className="flex items-center text-[#71ADBA] text-sm">
                <SchoolIcon className="w-4 h-4 mr-2" />
                <span>{major.timeToComplete}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Selected Major Modal */}
        <AnimatePresence>
          {selectedMajor && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-white">{selectedMajor.name}</h2>
                  <button
                    onClick={() => setSelectedMajor(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-300">{selectedMajor.description}</p>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Career Opportunities</h3>
                    <ul className="list-disc list-inside text-gray-300">
                      {selectedMajor.careers.map((career, index) => (
                        <li key={index}>{career}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Key Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedMajor.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-[#71ADBA]/20 text-[#71ADBA] px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-gray-300">
                    <div className="flex items-center">
                      <WorkIcon className="w-5 h-5 mr-2 text-[#71ADBA]" />
                      <span>Average Salary: {selectedMajor.averageSalary}</span>
                    </div>
                    <div className="flex items-center">
                      <SchoolIcon className="w-5 h-5 mr-2 text-[#71ADBA]" />
                      <span>Time: {selectedMajor.timeToComplete}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MajorSelectionPage; 