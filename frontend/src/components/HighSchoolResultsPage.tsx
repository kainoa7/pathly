import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faLaptopCode,
  faCalendarAlt,
  faUniversity,
  faRocket,
  faEye,
  faRedo
} from '@fortawesome/free-solid-svg-icons';

const HighSchoolResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExploding, setIsExploding] = useState(true);

  // Get data from navigation state
  const { answers } = location.state || {};

  useEffect(() => {
    const timer = setTimeout(() => setIsExploding(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Demo results specifically for high school students
  const results = {
    title: "Perfect! We Found Your Path 🎯",
    subtitle: "Based on your high school interests, here's what we discovered...",
    topCareerPath: "Software Development",
    matchScore: 94,
    growth: "23% Rapid",
    salary: "$75,000-120,000",
    description: "Your analytical thinking and interest in technology make you perfect for a career in software development!",
    personalityFit: "You're a logical problem-solver who enjoys creating things and working with technology. The tech industry values these exact traits.",
    
    // High school specific guidance
    highSchoolSteps: [
      "📚 Take AP Computer Science, Calculus, and Physics",
      "💻 Learn Python or JavaScript through online courses",
      "🏆 Join robotics club or start a coding project",
      "📱 Build a simple app or website for your portfolio"
    ],
    
    collegePrep: [
      "🎯 Target Computer Science or Software Engineering majors",
      "🏫 Research schools with strong CS programs and tech industry connections",
      "📝 Highlight your tech projects and problem-solving skills in applications",
      "💰 Look into scholarships for STEM students"
    ],
    
    topColleges: [
      { name: "Stanford University", state: "CA", specialty: "AI & Startups" },
      { name: "MIT", state: "MA", specialty: "Innovation & Research" },
      { name: "UC Berkeley", state: "CA", specialty: "Open Source & Tech" },
      { name: "Carnegie Mellon", state: "PA", specialty: "Software Engineering" }
    ],
    
    timeline: "Next 4 years: Strong CS foundation + internships = $75k+ starting salary at graduation",
    
    summerActivities: [
      "🏕️ Attend coding bootcamps or summer programs",
      "🚀 Participate in hackathons",
      "👨‍💻 Shadow software engineers at local companies",
      "📖 Take online courses in programming"
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full mb-6">
            <FontAwesomeIcon icon={faGraduationCap} className="text-blue-400" />
            <span className="text-blue-300 font-medium">HIGH SCHOOL DEMO RESULT</span>
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
            <div className="text-6xl mb-4">💻</div>
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

        {/* High School Action Plan */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#1e293b] rounded-lg p-6 border border-[#71ADBA]/20"
          >
            <h3 className="text-2xl font-bold text-[#71ADBA] mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faLaptopCode} />
              Next Steps in High School
            </h3>
            <div className="space-y-3">
              {results.highSchoolSteps.map((step, index) => (
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
              <FontAwesomeIcon icon={faUniversity} />
              College Preparation
            </h3>
            <div className="space-y-3">
              {results.collegePrep.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-[#EDEAB1] font-bold">{index + 1}.</span>
                  <span className="text-gray-300">{step}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Top Colleges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#1e293b] rounded-lg p-6 mb-8 border border-[#71ADBA]/20"
        >
          <h3 className="text-2xl font-bold text-[#71ADBA] mb-6 text-center">🏆 Top CS Schools to Consider</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {results.topColleges.map((college, index) => (
              <div key={index} className="bg-[#2d3a4f] rounded-lg p-4">
                <h4 className="text-lg font-bold text-white">{college.name}</h4>
                <p className="text-[#71ADBA] text-sm">{college.state}</p>
                <p className="text-gray-400 text-sm">{college.specialty}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Summer Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-[#1e293b] rounded-lg p-6 mb-8 border border-[#71ADBA]/20"
        >
          <h3 className="text-2xl font-bold text-[#71ADBA] mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faCalendarAlt} />
            This Summer's Plan
          </h3>
          <div className="grid md:grid-cols-2 gap-3">
            {results.summerActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 bg-[#2d3a4f] rounded p-3">
                <span className="text-gray-300">{activity}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-[#1e293b] rounded-lg p-6 mb-8 border border-[#71ADBA]/20"
        >
          <h3 className="text-2xl font-bold text-[#71ADBA] mb-3">⏰ Your Success Timeline</h3>
          <p className="text-gray-300 text-lg">{results.timeline}</p>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-[#1e293b] rounded-lg p-8 border border-[#71ADBA]/20 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            This is what JARVUS AI could do for every high school student! 🚀
          </h3>
          <p className="text-gray-300 mb-6">
            Imagine getting this level of personalized guidance, but based on real analysis of your interests, 
            strengths, and the current college landscape. Should we build it?
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
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <p className="text-orange-300 text-sm">
              🧪 <strong>Demo Result:</strong> This shows what JARVUS AI could provide for high school students - 
              personalized college prep, course recommendations, and career planning based on your interests.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HighSchoolResultsPage; 