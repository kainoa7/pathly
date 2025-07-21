import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUniversity, 
  faPalette,
  faBriefcase,
  faUsers,
  faRocket,
  faEye,
  faRedo,
  faChalkboardTeacher
} from '@fortawesome/free-solid-svg-icons';

const CollegeResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExploding, setIsExploding] = useState(true);

  // Get data from navigation state
  const { answers } = location.state || {};

  useEffect(() => {
    const timer = setTimeout(() => setIsExploding(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Demo results specifically for college students
  const results = {
    title: "Time to Declare Your Major! 📋",
    subtitle: "Based on your college experience so far...",
    topCareerPath: "UX/UI Design",
    matchScore: 91,
    growth: "13% Strong",
    salary: "$65,000-110,000",
    description: "Your creative and analytical skills are perfect for user experience design!",
    personalityFit: "You're a creative problem-solver who understands people and technology. UX design values empathy, creativity, and systematic thinking.",
    
    // College-specific guidance
    majorSteps: [
      "🎨 Declare a major in Design, Psychology, or Computer Science with UX focus",
      "📚 Take courses in Human-Computer Interaction and User Research",
      "🖥️ Learn design tools like Figma, Sketch, and Adobe Creative Suite",
      "👥 Join design clubs or start a UX/UI student organization"
    ],
    
    internshipPrep: [
      "💼 Apply for UX internships at tech companies (Google, Apple, Spotify)",
      "📱 Build a portfolio with 3-5 case studies of design projects",
      "🎓 Consider a UX bootcamp or design certification program",
      "🤝 Network with designers through LinkedIn and design meetups"
    ],
    
    requiredCourses: [
      { name: "Human-Computer Interaction", credits: 3, priority: "High" },
      { name: "Psychology of Design", credits: 3, priority: "High" },
      { name: "Web Development Basics", credits: 3, priority: "Medium" },
      { name: "Data Analysis for UX", credits: 3, priority: "Medium" }
    ],
    
    topCompanies: [
      { name: "Google", role: "UX Designer", salary: "$95k-130k" },
      { name: "Apple", role: "Product Designer", salary: "$100k-140k" },
      { name: "Airbnb", role: "UX Researcher", salary: "$85k-120k" },
      { name: "Spotify", role: "UI Designer", salary: "$80k-115k" }
    ],
    
    timeline: "2 more years + strong portfolio + internship = ready for $65k+ UX role",
    
    portfolioProjects: [
      "📱 Redesign a popular mobile app's user flow",
      "🌐 Create a website for a local business",
      "🎮 Design an interface for a gaming app",
      "📊 Build a data visualization dashboard"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white py-12 px-4">
      {isExploding && (
        <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <ConfettiExplosion
            force={0.8}
            duration={3000}
            particleCount={100}
            width={1600}
          />
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full mb-6">
            <FontAwesomeIcon icon={faUniversity} className="text-purple-400" />
            <span className="text-purple-300 font-medium">COLLEGE DEMO RESULT</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#71ADBA] to-[#EDEAB1] bg-clip-text text-transparent mb-4">
            {results.title}
          </h1>
          <p className="text-xl text-gray-400">
            {results.subtitle}
          </p>
        </motion.div>

        {/* Main Result Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1e293b] rounded-lg p-8 mb-8 border border-[#71ADBA]/20"
        >
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎨</div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#EDEAB1] mb-4">
              {results.topCareerPath}
            </h2>
            <div className="text-5xl font-bold text-white mb-6">
              {results.matchScore}% Match
            </div>
            <p className="text-lg text-gray-300 mb-6">
              {results.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-[#2d3a4f] px-4 py-2 rounded-lg">
                📈 {results.growth} Growth
              </div>
              <div className="bg-[#2d3a4f] px-4 py-2 rounded-lg">
                💰 {results.salary}/year
              </div>
            </div>
          </div>

          {/* Personality Fit */}
          <div className="bg-[#2d3a4f] rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-[#71ADBA] mb-3">🧠 Why This Fits You</h3>
            <p className="text-gray-300">{results.personalityFit}</p>
          </div>
        </motion.div>

        {/* College Action Plan */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#1e293b] rounded-lg p-6 border border-[#71ADBA]/20"
          >
            <h3 className="text-2xl font-bold text-[#71ADBA] mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faChalkboardTeacher} />
              Academic Plan
            </h3>
            <div className="space-y-3">
              {results.majorSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-[#EDEAB1] font-bold">{index + 1}.</span>
                  <span className="text-gray-300">{step}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#1e293b] rounded-lg p-6 border border-[#71ADBA]/20"
          >
            <h3 className="text-2xl font-bold text-[#71ADBA] mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faBriefcase} />
              Career Preparation
            </h3>
            <div className="space-y-3">
              {results.internshipPrep.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-[#EDEAB1] font-bold">{index + 1}.</span>
                  <span className="text-gray-300">{step}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Required Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#1e293b] rounded-lg p-6 mb-8 border border-[#71ADBA]/20"
        >
          <h3 className="text-2xl font-bold text-[#71ADBA] mb-6 text-center">📚 Recommended Courses to Take</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {results.requiredCourses.map((course, index) => (
              <div key={index} className="bg-[#2d3a4f] rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-bold text-white">{course.name}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    course.priority === 'High' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {course.priority}
                  </span>
                </div>
                <p className="text-[#71ADBA] text-sm">{course.credits} credits</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Target Companies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-[#1e293b] rounded-lg p-6 mb-8 border border-[#71ADBA]/20"
        >
          <h3 className="text-2xl font-bold text-[#71ADBA] mb-6 text-center">🏢 Target Companies & Roles</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {results.topCompanies.map((company, index) => (
              <div key={index} className="bg-[#2d3a4f] rounded-lg p-4">
                <h4 className="text-lg font-bold text-white">{company.name}</h4>
                <p className="text-[#71ADBA] text-sm">{company.role}</p>
                <p className="text-gray-400 text-sm">{company.salary}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Portfolio Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-[#1e293b] rounded-lg p-6 mb-8 border border-[#71ADBA]/20"
        >
          <h3 className="text-2xl font-bold text-[#71ADBA] mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faPalette} />
            Portfolio Project Ideas
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {results.portfolioProjects.map((project, index) => (
              <div key={index} className="flex items-center gap-3 bg-[#2d3a4f] rounded p-3">
                <span className="text-gray-300">{project}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-[#1e293b] rounded-lg p-6 mb-8 border border-[#71ADBA]/20"
        >
          <h3 className="text-2xl font-bold text-[#71ADBA] mb-3">⏰ Your Success Timeline</h3>
          <p className="text-gray-300 text-lg">{results.timeline}</p>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-[#1e293b] rounded-lg p-8 border border-[#71ADBA]/20 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            This is what JARVUS AI could do for every college student! 🎨
          </h3>
          <p className="text-gray-300 mb-6">
            Imagine getting this level of personalized guidance for major declaration, course selection, 
            and career preparation based on your actual college experience. Should we build it?
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/jarvus-ai-demo')}
              className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              <FontAwesomeIcon icon={faRocket} className="mr-2" />
              Try Full AI Demo
            </button>
            <button
              onClick={() => navigate('/vision')}
              className="border border-[#71ADBA] text-[#71ADBA] px-6 py-3 rounded-lg font-semibold hover:bg-[#71ADBA] hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faEye} className="mr-2" />
              See Our Vision
            </button>
            <button
              onClick={() => navigate('/onboarding')}
              className="border border-gray-500 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-500 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faRedo} className="mr-2" />
              Try Another Path
            </button>
          </div>
        </motion.div>

        {/* Beta Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="text-center mt-8"
        >
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <p className="text-orange-300 text-sm">
              🧪 <strong>Demo Result:</strong> This shows what JARVUS AI could provide for college students - 
              major guidance, course recommendations, internship prep, and career planning.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CollegeResultsPage; 