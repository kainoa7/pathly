import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { AdaptiveQuizState, AdaptiveQuizAnswer } from '../types/adaptiveQuiz';
import { adaptiveQuizQuestions, getNextQuestion } from '../data/adaptiveQuizQuestions';
import { 
  calculatePersonalityProfile, 
  generatePersonalityInsights,
  generateCareerRecommendations,
  calculateQuizAnalytics 
} from '../utils/personalityAnalysis';
import { calculateMajorMatches } from '../utils/quizLogic';

const AdaptiveQuizPage = () => {
  const navigate = useNavigate();
  const [startTime] = useState(new Date());
  const [quizState, setQuizState] = useState<AdaptiveQuizState>({
    currentQuestionId: 'student_lifecycle',
    answers: [],
    personalityProfile: [],
    majorMatches: [],
    completed: false,
    progress: 0,
    adaptivePath: ['student_lifecycle']
  });

  const [showInsights, setShowInsights] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQuestion = adaptiveQuizQuestions.find(q => q.id === quizState.currentQuestionId);
  const estimatedTotalQuestions = 6; // Adaptive, so estimate

  useEffect(() => {
    // Update progress based on answers and estimated total
    const progress = (quizState.answers.length / estimatedTotalQuestions) * 100;
    setQuizState(prev => ({ ...prev, progress: Math.min(progress, 95) }));
  }, [quizState.answers.length]);

  const handleAnswer = async (value: string, weight: number) => {
    if (!currentQuestion) return;

    setIsTransitioning(true);

    const newAnswer: AdaptiveQuizAnswer = {
      questionId: quizState.currentQuestionId,
      value,
      weight,
      personalityTrait: currentQuestion.options.find(opt => opt.value === value)?.personalityTrait,
      timestamp: new Date()
    };

    const newAnswers = [...quizState.answers, newAnswer];
    const nextQuestionId = getNextQuestion(quizState.currentQuestionId, value, newAnswers);

    // Show real-time insights every few questions
    if (newAnswers.length >= 3 && !showInsights) {
      const insights = generatePersonalityInsights(newAnswers);
      if (insights.length > 0) {
        setShowInsights(true);
        setTimeout(() => setShowInsights(false), 3000);
      }
    }

    if (nextQuestionId) {
      // Continue quiz
      setTimeout(() => {
        setQuizState(prev => ({
          ...prev,
          currentQuestionId: nextQuestionId,
          answers: newAnswers,
          adaptivePath: [...prev.adaptivePath, nextQuestionId]
        }));
        setIsTransitioning(false);
      }, 500);
    } else {
      // Quiz complete
      const personalityProfile = calculatePersonalityProfile(newAnswers);
      const majorMatches = calculateMajorMatches(newAnswers);
      const analytics = calculateQuizAnalytics(newAnswers, startTime);

      setTimeout(() => {
        setQuizState(prev => ({
          ...prev,
          answers: newAnswers,
          personalityProfile,
          majorMatches,
          completed: true,
          progress: 100
        }));
        setIsTransitioning(false);
      }, 500);
    }
  };

  const handleRetakeQuiz = () => {
    setQuizState({
      currentQuestionId: 'student_lifecycle',
      answers: [],
      personalityProfile: [],
      majorMatches: [],
      completed: false,
      progress: 0,
      adaptivePath: ['student_lifecycle']
    });
    setShowInsights(false);
  };

  if (quizState.completed) {
    return <QuizResults quizState={quizState} onRetake={handleRetakeQuiz} />;
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-dark-background flex items-center justify-center">
        <div className="text-white text-xl">Loading quiz...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-background pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Progress</span>
            <span className="text-sm text-gray-400">{Math.round(quizState.progress)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${quizState.progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Real-time Insights */}
        <AnimatePresence>
          {showInsights && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-4 mb-6 border border-blue-500/30"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🧠</span>
                <div>
                  <h4 className="text-white font-semibold">Insight Detected!</h4>
                  <p className="text-gray-300 text-sm">
                    {generatePersonalityInsights(quizState.answers)[0]}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: isTransitioning ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isTransitioning ? 50 : -50 }}
            transition={{ duration: 0.3 }}
            className="bg-[#1a2234]/90 rounded-lg p-8 border border-red-500/20"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                {currentQuestion.question}
              </h2>
              <p className="text-gray-400">
                Question {quizState.answers.length + 1} • {currentQuestion.type.replace('_', ' ')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => (
                <motion.button
                  key={option.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleAnswer(option.value, option.weight)}
                  disabled={isTransitioning}
                  className="p-6 text-left rounded-lg bg-[#1E2537] border border-red-500/20 text-white hover:border-red-500/50 hover:bg-[#252B3B] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl mt-1">
                      {option.personalityTrait ? '✨' : '📝'}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-2">{option.text}</h4>
                      {option.personalityTrait && (
                        <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">
                          Personality Insight
                        </span>
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Question Category Indicator */}
            <div className="mt-6 text-center">
              <span className="inline-block bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs">
                {currentQuestion.category} • {currentQuestion.type.replace('_', ' ')}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Adaptive Path Indicator */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-sm">
            Adaptive Quiz • Questions tailored to your responses
          </p>
          <div className="flex justify-center space-x-2 mt-2">
            {quizState.adaptivePath.map((questionId, index) => (
              <div
                key={questionId}
                className={`w-2 h-2 rounded-full ${
                  index < quizState.answers.length ? 'bg-red-500' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Student Lifecycle Scenarios
interface StudentScenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  proFeatures: string[];
  urgency: 'high' | 'medium' | 'low';
}

const getStudentScenario = (answers: any[]): StudentScenario => {
  // Detect student scenario from the lifecycle question
  const lifecycleAnswer = answers.find(a => a.questionId === 'student_lifecycle');
  const scenarios: StudentScenario[] = [
    {
      id: 'high_school',
      title: 'High School Student',
      description: 'Preparing for college and career decisions',
      icon: '📚',
      proFeatures: [
        'College major recommendations with acceptance rates',
        'Scholarship opportunity alerts',
        'SAT/ACT study plans aligned to your career goals',
        'Early internship program access'
      ],
      urgency: 'high'
    },
    {
      id: 'college_current',
      title: 'Current College Student',
      description: 'Navigating college and planning for post-graduation',
      icon: '🎓',
      proFeatures: [
        'Internship matching with top companies',
        'Course planning for your ideal career path',
        'Networking opportunities with industry professionals',
        'Resume building with industry-specific templates'
      ],
      urgency: 'high'
    },
    {
      id: 'college_switching',
      title: 'Considering Switching Majors',
      description: 'Unsure about current path and exploring alternatives',
      icon: '🔄',
      proFeatures: [
        'Detailed transfer credit analysis',
        'Major switching timeline and cost analysis',
        'Career outcome comparisons between majors',
        '1-on-1 counseling with academic advisors'
      ],
      urgency: 'high'
    },
    {
      id: 'recent_graduate',
      title: 'Recent Graduate',
      description: 'Looking to land your first job or career change',
      icon: '🚀',
      proFeatures: [
        'Job application tracking and optimization',
        'Interview preparation with real company questions',
        'Salary negotiation coaching',
        'Professional networking event invitations'
      ],
      urgency: 'high'
    },
    {
      id: 'career_changer',
      title: 'Career Changer',
      description: 'Looking to transition to a new field',
      icon: '💼',
      proFeatures: [
        'Skills gap analysis and learning roadmap',
        'Industry transition coaching',
        'Portfolio building guidance',
        'Certification and bootcamp recommendations'
      ],
      urgency: 'medium'
    },
    {
      id: 'non_college',
      title: 'Alternative Path Explorer',
      description: 'Considering non-traditional education routes',
      icon: '🛤️',
      proFeatures: [
        'Trade school and apprenticeship matching',
        'Online certification pathway planning',
        'Entrepreneurship and freelancing guidance',
        'Skills-based career roadmaps'
      ],
      urgency: 'medium'
    }
  ];

  // Find matching scenario based on lifecycle answer
  if (lifecycleAnswer) {
    const matchingScenario = scenarios.find(s => s.id === lifecycleAnswer.value);
    if (matchingScenario) return matchingScenario;
  }

  // Default to college_current if no lifecycle answer found
  return scenarios[1];
};

// Enhanced Quiz Results Component
const QuizResults: React.FC<{ 
  quizState: AdaptiveQuizState; 
  onRetake: () => void;
}> = ({ quizState, onRetake }) => {
  const navigate = useNavigate();
  const insights = generatePersonalityInsights(quizState.answers);
  const careerRecommendations = generateCareerRecommendations(quizState.personalityProfile, quizState.answers);
  const studentScenario = getStudentScenario(quizState.answers);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  return (
    <div className="min-h-screen bg-dark-background pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Your Career Personality Profile 🎯
          </h1>
          <p className="text-xl text-gray-300">
            Discover your unique strengths and ideal career paths
          </p>
          
          {/* Student Scenario Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 rounded-full px-4 py-2 border border-[#71ADBA]/30 mt-4"
          >
            <span className="text-2xl">{studentScenario.icon}</span>
            <span className="text-[#71ADBA] font-medium">{studentScenario.title}</span>
          </motion.div>
        </motion.div>

        {/* Personality Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Your Top Personality Traits</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizState.personalityProfile.slice(0, 3).map((trait, index) => (
              <motion.div
                key={trait.trait}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-[#1a2234]/90 rounded-lg p-6 border border-[#71ADBA]/20"
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{trait.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{trait.trait}</h3>
                  <p className="text-gray-400 text-sm mb-4">{trait.description}</p>
                  
                  {/* Strength Score */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-400">Strength</span>
                      <span className="text-xs text-[#71ADBA]">{trait.score}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${trait.score}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                      />
                    </div>
                  </div>

                  {/* Top Strengths */}
                  <div className="text-left">
                    <h4 className="text-sm font-medium text-white mb-2">Key Strengths:</h4>
                    <div className="flex flex-wrap gap-1">
                      {trait.strengths.slice(0, 2).map(strength => (
                        <span
                          key={strength}
                          className="bg-[#71ADBA]/20 text-[#71ADBA] px-2 py-1 rounded text-xs"
                        >
                          {strength}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Career Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Recommended Careers for You</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {careerRecommendations.slice(0, 6).map((career, index) => (
              <motion.div
                key={career}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-[#1a2234]/90 rounded-lg p-4 border border-[#71ADBA]/20 hover:border-[#71ADBA]/40 transition-colors"
              >
                <h3 className="text-white font-medium">{career}</h3>
                <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded mt-2 inline-block">
                  {85 + index * 2}% Match
                </span>
              </motion.div>
            ))}
          </div>
          
          {/* More Careers Teaser */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 mb-3">
              + {Math.max(0, careerRecommendations.length - 6)} more career matches waiting for you
            </p>
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="text-[#71ADBA] hover:text-[#9C71BA] transition-colors font-medium"
            >
              Unlock all career matches with Pro →
            </button>
          </div>
        </motion.div>

        {/* Upgrade to Pro Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-lg p-8 border border-[#71ADBA]/30">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">
                Want the full picture? Upgrade to Pro 🚀
              </h2>
              <p className="text-gray-300">
                Get personalized roadmaps and guidance tailored to your {studentScenario.title.toLowerCase()} journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-white">🎯 What you'll get:</h3>
                {studentScenario.proFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <div className="bg-[#1a2234]/50 rounded-lg p-4 border border-[#71ADBA]/20">
                  <h4 className="text-white font-medium mb-2">🔥 Limited Time Offer</h4>
                  <p className="text-[#EDEAB1] text-sm mb-3">
                    Get Pro features free for 30 days. No credit card required.
                  </p>
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="line-through text-gray-500">$29/month</span>
                    <span className="text-green-400 font-semibold">FREE</span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">Limited Time</span>
                  </div>
                </div>
                
                <button
                  onClick={() => navigate('/signup/pro')}
                  className="w-full bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                >
                  Get Pro Free for 30 Days
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Save Results / Account Creation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-12"
        >
          <div className="bg-[#1a2234]/90 rounded-lg p-6 border border-[#71ADBA]/20">
            <h3 className="text-lg font-bold text-white mb-4">💾 Save Your Results</h3>
            <p className="text-gray-300 mb-4">
              Create a free Explorer account to save your personality profile and career recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate('/signup/explorer')}
                className="bg-[#71ADBA] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#9C71BA] transition-colors"
              >
                Save Results (Free Account)
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`I discovered my career personality on Kaiyl! My top trait is ${quizState.personalityProfile[0]?.trait}. Take the quiz: ${window.location.origin}/adaptive-quiz`);
                  alert('Results copied to clipboard!');
                }}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-500 transition-colors"
              >
                📋 Share Results
              </button>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center space-y-4 pb-12"
        >
          <div className="space-x-4">
            <button
              onClick={onRetake}
              className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-500 transition-colors"
            >
              Retake Quiz
            </button>
            <button
              onClick={() => navigate('/')}
              className="border border-[#71ADBA] text-[#71ADBA] px-8 py-3 rounded-lg font-semibold hover:bg-[#71ADBA] hover:text-white transition-colors"
            >
              Explore More
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdaptiveQuizPage; 