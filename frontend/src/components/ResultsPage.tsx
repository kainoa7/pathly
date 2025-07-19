import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ConfettiExplosion from 'react-confetti-explosion';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Analytics from '../utils/analytics';

// Results Preview Component (shown to non-authenticated users)
const ResultsPreview = ({ results, onSignup }: { results: any; onSignup: () => void }) => {
  const [isExploding, setIsExploding] = useState(true);

  return (
    <div className="page-container">
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

      <div className="main-content max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold heading-gradient mb-4">
            We Found Your Path! 🎉
          </h1>
          <p className="text-xl text-gray-400">
            You're a perfect match for an exciting career field...
          </p>
        </motion.div>

        {/* Preview Result Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-8 mb-12 relative overflow-hidden"
        >
          {/* Blur Overlay */}
          <div className="absolute inset-0 backdrop-blur-sm bg-black/30 z-20 flex items-center justify-center">
            <div className="text-center">
              <LockIcon className="w-16 h-16 text-[#EDEAB1] mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Unlock Your Full Results</h3>
              <p className="text-gray-300 mb-6">See your complete career analysis, salary insights, and personalized roadmap</p>
              <button
                onClick={onSignup}
                className="btn btn-primary px-8 py-3 text-lg"
              >
                <EmailIcon className="mr-2" />
                Sign Up Free - See My Results
              </button>
            </div>
          </div>

          {/* Blurred Content Behind */}
          <div className="relative z-10 filter blur-sm">
            <div className="flex flex-col items-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[#EDEAB1] mb-4">
                {results.topCareerPath}
              </h2>
              <div className="text-7xl font-bold text-white mb-6">
                {results.matchScore}% Match
              </div>
              <div className="flex gap-4 mb-8">
                <div className="glass-effect px-4 py-2">
                  🚀 {results.growth} Growth
                </div>
                <div className="glass-effect px-4 py-2">
                  💰 {results.salary}/year
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <div className="glass-panel p-6 mb-8">
            <p className="text-lg text-gray-300 mb-4">
              🎯 <span className="text-[#EDEAB1] font-semibold">Join 10,000+ students</span> who discovered their perfect career path
            </p>
            <div className="flex justify-center gap-8 text-sm text-gray-400">
              <span>✅ Personalized Career Roadmap</span>
              <span>✅ Salary & Growth Insights</span>
              <span>✅ Top Company Targets</span>
            </div>
          </div>
          
          <p className="text-sm text-gray-500">
            Free forever • No spam • Join the Jarvus community
          </p>
        </motion.div>
      </div>
    </div>
  );
};

// Full Results Component (shown to authenticated users)
const FullResults = ({ results }: { results: any }) => {
  const navigate = useNavigate();
  const [isExploding, setIsExploding] = useState(true);

  return (
    <div className="page-container">
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

      <div className="main-content max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold heading-gradient mb-4">
            We Found Your Path! 🎉
          </h1>
          <p className="text-xl text-gray-400">
            Based on your unique personality and goals, we think you'd crush it in:
          </p>
        </motion.div>

        {/* Main Result Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-8 mb-12 relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex flex-col items-center">
              <h2 className="text-3xl md:text-4xl font-bold text-[#EDEAB1] mb-4">
                {results.topCareerPath}
              </h2>
              <div className="text-7xl font-bold text-white mb-6">
                {results.matchScore}% Match
              </div>
              <div className="flex gap-4 mb-8">
                <div className="glass-effect px-4 py-2">
                  🚀 {results.growth} Growth
                </div>
                <div className="glass-effect px-4 py-2">
                  💰 {results.salary}/year
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#71ADBA] mb-4">
                Key Skills You'll Develop:
              </h3>
              <div className="flex flex-wrap gap-2">
                {results.skills.map((skill: string, index: number) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="px-4 py-2 rounded-full bg-white/10 text-[#EDEAB1]"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#71ADBA] mb-4">
                Education Pathways:
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass-effect p-4">
                  <p className="text-[#EDEAB1] font-semibold mb-2">Recommended</p>
                  <p>{results.education.recommended}</p>
                </div>
                <div className="glass-effect p-4">
                  <p className="text-[#EDEAB1] font-semibold mb-2">Alternative</p>
                  <p>{results.education.alternative}</p>
                </div>
              </div>
            </div>

            {/* Companies */}
            <div>
              <h3 className="text-xl font-semibold text-[#71ADBA] mb-4">
                Top Companies Hiring:
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {results.companies.map((company: string, index: number) => (
                  <motion.div
                    key={company}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="glass-effect p-4 text-center"
                  >
                    <img
                      src={`/company-logos/${company.toLowerCase()}.png`}
                      alt={company}
                      className="h-8 mx-auto mb-2"
                    />
                    <p className="text-[#EDEAB1]">{company}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold heading-gradient text-center mb-8">
            Your Next Steps 🎯
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {results.nextSteps.map((step: any, index: number) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                  className="glass-panel p-6 hover:scale-[1.02] transition-transform duration-300 cursor-pointer group"
                  onClick={() => navigate(`/roadmap/${step.action.toLowerCase()}`)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#71ADBA] to-[#EDEAB1] p-0.5">
                      <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-[#EDEAB1]" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#EDEAB1] mb-1">
                        {step.title}
                      </h3>
                      <p className="text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Share Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => {/* Add share functionality */}}
            className="btn btn-primary group"
          >
            <span className="group-hover:scale-110 transition-transform">🚀</span>
            <span className="mx-2">Share Your Results</span>
            <span className="group-hover:translate-x-2 transition-transform">→</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Track results view
    Analytics.trackCareerPathView(results.topCareerPath);
  }, []);

  // Mock results based on answers
  const results = {
    topCareerPath: "Software Engineering",
    matchScore: 95,
    salary: "$105,000",
    growth: "15%",
    skills: ["Problem Solving", "Coding", "System Design", "Communication"],
    companies: ["Google", "Microsoft", "Amazon", "Meta"],
    education: {
      recommended: "Bachelor's in Computer Science",
      alternative: "Coding Bootcamp + Side Projects",
    },
    nextSteps: [
      {
        title: "Start Learning",
        description: "Begin with Python or JavaScript fundamentals",
        icon: SchoolIcon,
        action: "View Resources"
      },
      {
        title: "Build Projects",
        description: "Create a portfolio to showcase your skills",
        icon: RocketLaunchIcon,
        action: "Project Ideas"
      },
      {
        title: "Network",
        description: "Connect with professionals in the field",
        icon: WorkIcon,
        action: "Find Events"
      },
      {
        title: "Track Progress",
        description: "Set milestones and track your journey",
        icon: TrendingUpIcon,
        action: "View Roadmap"
      }
    ]
  };

  const handleSignup = () => {
    // Store results in localStorage so they persist after signup
    localStorage.setItem('pendingResults', JSON.stringify(results));
    navigate('/signup/explorer', { 
      state: { 
        from: '/results',
        message: 'Complete your signup to unlock your full career analysis!' 
      } 
    });
  };

  // Show preview if user is not authenticated
  if (!user) {
    return <ResultsPreview results={results} onSignup={handleSignup} />;
  }

  // Show full results if user is authenticated
  return <FullResults results={results} />;
};

export default ResultsPage; 