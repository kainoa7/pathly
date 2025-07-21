import { useLocation, useNavigate, useParams } from 'react-router-dom';
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

// Demo results for different quiz types
const getDemoResults = (quizType: string) => {
  switch (quizType) {
    case 'highschool':
      return {
        title: "Perfect! We Found Your Path 🎯",
        subtitle: "Based on your interests, here's what we discovered...",
        topCareerPath: "Software Development",
        matchScore: 94,
        growth: "23% Rapid",
        salary: "$75,000-120,000",
        description: "Your love for problem-solving and tech makes you perfect for coding!",
        nextSteps: [
          "📚 Focus on Computer Science or similar major",
          "💻 Start learning Python or JavaScript this summer",
          "🏫 Look for colleges with strong CS programs",
          "🚀 Build a simple app or website as a portfolio project"
        ],
        colleges: ["Stanford", "MIT", "UC Berkeley", "Carnegie Mellon"],
        timeline: "4 years college + internships = ready for $75k+ starting salary",
        personalityFit: "Analytical problem-solver who loves creating solutions"
      };
    
    case 'college':
      return {
        title: "Time to Declare Your Major! 📋",
        subtitle: "Based on your college experience so far...",
        topCareerPath: "UX/UI Design",
        matchScore: 91,
        growth: "13% Strong",
        salary: "$65,000-110,000",
        description: "Your creative and analytical skills are perfect for user experience design!",
        nextSteps: [
          "🎨 Declare a major in Design, Psychology, or Computer Science",
          "💼 Apply for UX internships at tech companies",
          "📱 Build a portfolio with app/website designs",
          "🎓 Take courses in user research and interaction design"
        ],
        companies: ["Google", "Apple", "Airbnb", "Spotify"],
        timeline: "2 more years + portfolio + internship = ready for $65k+ job",
        personalityFit: "Creative problem-solver who understands people and technology"
      };
    
    case 'graduated':
      return {
        title: "Your Next Chapter Awaits! 📖",
        subtitle: "Here's the perfect major for your goals...",
        topCareerPath: "Digital Marketing",
        matchScore: 89,
        growth: "10% Steady",
        salary: "$45,000-85,000",
        description: "Your interests align perfectly with the growing digital marketing field!",
        nextSteps: [
          "🎓 Consider a Marketing or Communications major",
          "💻 Start with online courses in Google Ads & Social Media",
          "📊 Learn analytics tools like Google Analytics",
          "🏢 Look for entry-level marketing internships"
        ],
        paths: ["2-year degree", "4-year degree", "Bootcamp + certifications"],
        timeline: "2-4 years education + certifications = ready for $45k+ career",
        personalityFit: "Social communicator who understands trends and people"
      };
    
    default:
      return getDemoResults('highschool');
  }
};

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quizType: urlQuizType } = useParams<{ quizType: string }>();
  const { user } = useAuth();
  const [isExploding, setIsExploding] = useState(true);

  // Get quiz type from URL params first, then fall back to location state
  const { matches, quizType: stateQuizType, answers } = location.state || {};
  const quizType = urlQuizType || stateQuizType || 'highschool';
  
  const demoResults = getDemoResults(quizType);

  useEffect(() => {
    // Track that user completed quiz
    Analytics.trackInteraction('quiz', 'completed', { quizType });
    
    // Stop confetti after 3 seconds
    const timer = setTimeout(() => setIsExploding(false), 3000);
    return () => clearTimeout(timer);
  }, [quizType]);

  const handleSignup = () => {
    Analytics.trackInteraction('results', 'signup_clicked', { quizType });
    navigate('/signup/explorer');
  };

  const handleTryDemo = () => {
    Analytics.trackInteraction('results', 'demo_clicked', { quizType });
    navigate('/jarvus-ai-demo');
  };

  const handleRetakeQuiz = () => {
    navigate('/onboarding');
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

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#71ADBA] to-[#EDEAB1] bg-clip-text text-transparent mb-4">
            {demoResults.title}
          </h1>
          <p className="text-xl text-gray-400">
            {demoResults.subtitle}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full">
            <span className="text-green-400 text-sm">✨ DEMO RESULT</span>
          </div>
        </motion.div>

        {/* Main Result Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1e293b] rounded-lg p-8 mb-8 border border-[#71ADBA]/20"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#EDEAB1] mb-4">
              {demoResults.topCareerPath}
            </h2>
            <div className="text-6xl font-bold text-white mb-6">
              {demoResults.matchScore}% Match
            </div>
            <p className="text-lg text-gray-300 mb-6">
              {demoResults.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="bg-[#2d3a4f] px-4 py-2 rounded-lg">
                📈 {demoResults.growth} Growth
              </div>
              <div className="bg-[#2d3a4f] px-4 py-2 rounded-lg">
                💰 {demoResults.salary}/year
              </div>
            </div>
          </div>

          {/* Personality Fit */}
          <div className="bg-[#2d3a4f] rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-[#71ADBA] mb-3">🧠 Why You're Perfect for This</h3>
            <p className="text-gray-300">{demoResults.personalityFit}</p>
          </div>

          {/* Next Steps */}
          <div className="bg-[#2d3a4f] rounded-lg p-6 mb-6">
            <h3 className="text-xl font-bold text-[#71ADBA] mb-4">🎯 Your Next Steps</h3>
            <div className="space-y-3">
              {demoResults.nextSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="text-[#EDEAB1] font-bold">{index + 1}.</span>
                  <span className="text-gray-300">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-[#2d3a4f] rounded-lg p-6">
            <h3 className="text-xl font-bold text-[#71ADBA] mb-3">⏰ Your Timeline to Success</h3>
            <p className="text-gray-300">{demoResults.timeline}</p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-[#1e293b] rounded-lg p-8 border border-[#71ADBA]/20 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            This is just a demo of what JARVUS AI could do! 🤖
          </h3>
          <p className="text-gray-300 mb-6">
            Imagine getting personalized career guidance like this, but with real data about your personality, 
            interests, and the current job market. Help us decide if we should build it!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleTryDemo}
              className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              🤖 Try Full AI Demo
            </button>
            <button
              onClick={() => navigate('/vision')}
              className="border border-[#71ADBA] text-[#71ADBA] px-6 py-3 rounded-lg font-semibold hover:bg-[#71ADBA] hover:text-white transition-colors"
            >
              👀 See What We're Building
            </button>
            <button
              onClick={handleRetakeQuiz}
              className="border border-gray-500 text-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-500 hover:text-white transition-colors"
            >
              🔄 Try Another Path
            </button>
          </div>
        </motion.div>

        {/* Beta Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8"
        >
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
            <p className="text-orange-300 text-sm">
              🧪 <strong>Beta Testing:</strong> This is a demo result to show what JARVUS AI could provide. 
              Real results would be based on advanced AI analysis of your actual responses and current market data.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResultsPage; 