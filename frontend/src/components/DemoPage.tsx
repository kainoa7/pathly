import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { careerPaths, careerRoadmaps, matchCareerPaths } from '../data/careerMatches';

const DemoPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [demoAnswers, setDemoAnswers] = useState<string[]>([]);
  const [selectedCareerPath, setSelectedCareerPath] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Sample demo questions to give users a feel for the assessment
  const demoQuestions = [
    {
      question: "What interests you more?",
      options: [
        "Building and creating things",
        "Analyzing data and solving problems",
        "Working with and helping people",
        "Leading and organizing projects"
      ]
    },
    {
      question: "In a group project, which role do you naturally take?",
      options: [
        "The creative problem solver",
        "The detailed planner",
        "The team motivator",
        "The project coordinator"
      ]
    },
    {
      question: "What's your ideal work environment?",
      options: [
        "Fast-paced startup",
        "Established tech company",
        "Creative agency",
        "Research institution"
      ]
    }
  ];

  const handleAnswer = async (answer: string) => {
    const newAnswers = [...demoAnswers, answer];
    setDemoAnswers(newAnswers);
    console.log('Current answers:', newAnswers);
    console.log('Current step:', currentStep);
    
    if (currentStep < demoQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
      console.log('Moving to next question:', currentStep + 1);
    } else {
      // Show processing state for last question
      setIsProcessing(true);
      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Force state update for the last question
      setCurrentStep(demoQuestions.length);
      setIsProcessing(false);
      console.log('Completed questions, showing results');
    }
  };

  // Move this outside of the render to avoid recalculation
  const matchedPaths = demoAnswers.length === demoQuestions.length 
    ? matchCareerPaths(demoAnswers)
    : [];
  
  console.log('Matched paths:', matchedPaths);

  const handleCareerSelect = (pathId: string) => {
    setSelectedCareerPath(pathId);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Demo Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] bg-clip-text text-transparent">
            Experience Nextly in Action
          </h1>
          <p className="text-xl text-gray-300">
            Try our quick 3-question demo to see how we match you with dream careers
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {isProcessing ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#71ADBA] mb-4"></div>
              <p className="text-[#EDEAB1] text-lg">Analyzing your responses...</p>
            </motion.div>
          ) : currentStep < demoQuestions.length ? (
          /* Question Section */
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-[#1a1f36]/40 backdrop-blur-sm rounded-xl p-8 border border-[#71ADBA]/20"
          >
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="h-2 bg-[#1a1f36] rounded-full">
                <div
                  className="h-full bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / demoQuestions.length) * 100}%` }}
                />
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Question {currentStep + 1} of {demoQuestions.length}
              </p>
            </div>

            {/* Question */}
            <h2 className="text-2xl font-semibold text-[#EDEAB1] mb-6">
              {demoQuestions[currentStep].question}
            </h2>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {demoQuestions[currentStep].options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="p-4 bg-[#1a1f36]/60 hover:bg-[#1a1f36]/80 border border-[#71ADBA]/30 
                           rounded-lg text-left text-gray-300 hover:text-white transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          /* Results Preview */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {!selectedCareerPath ? (
              <div className="bg-[#1a1f36]/40 backdrop-blur-sm rounded-xl p-8 border border-[#71ADBA]/20">
                <h2 className="text-2xl font-semibold text-[#EDEAB1] mb-6">
                  Your Top Career Matches (Demo Preview)
                </h2>
                
                <div className="space-y-4">
                  {matchedPaths.map((pathId, index) => {
                    const career = careerPaths[pathId];
                    return (
                      <motion.div
                        key={pathId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        onClick={() => handleCareerSelect(pathId)}
                        className="flex items-center justify-between p-4 bg-[#1a1f36]/60 rounded-lg border border-[#71ADBA]/30
                                 cursor-pointer hover:bg-[#1a1f36]/80 transition-all duration-300"
                      >
                        <div className="flex items-center space-x-4">
                          <img src={career.logo} alt={career.company} className="w-8 h-8" />
                          <div>
                            <h3 className="text-white font-semibold">{career.role}</h3>
                            <p className="text-gray-400">{career.company}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[#EDEAB1] font-semibold">{career.match}% Match</div>
                          <div className="text-gray-400">{career.salary}</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* New: Full Assessment Benefits */}
                <div className="mt-8 p-6 bg-[#1a1f36]/80 rounded-lg border border-[#71ADBA]/30">
                  <h3 className="text-lg font-semibold text-[#EDEAB1] mb-4">
                    Want More Accurate Matches?
                  </h3>
                  <p className="text-gray-300 mb-4">
                    This demo uses just 3 questions for a quick preview. Take our comprehensive assessment to:
                  </p>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Get 95% more accurate career matches",
                      "Discover 50+ potential career paths",
                      "Receive personalized skill recommendations",
                      "Access detailed salary insights",
                      "View complete education roadmaps"
                    ].map((benefit, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center text-gray-300"
                      >
                        <span className="text-[#71ADBA] mr-2">✓</span>
                        {benefit}
                      </motion.li>
                    ))}
                  </ul>
                  <motion.button
                    onClick={() => navigate('/onboarding')}
                    className="w-full px-6 py-3 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-lg 
                             text-white font-semibold hover:opacity-90 transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Take the Full Assessment →
                  </motion.button>
                </div>
              </div>
            ) : (
              /* Career Path Details */
              <div className="space-y-8">
                <div className="bg-[#1a1f36]/40 backdrop-blur-sm rounded-xl p-8 border border-[#71ADBA]/20">
                  <button 
                    onClick={() => setSelectedCareerPath(null)}
                    className="text-[#71ADBA] hover:text-[#EDEAB1] mb-4"
                  >
                    ← Back to matches
                  </button>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <img 
                      src={careerPaths[selectedCareerPath].logo} 
                      alt={careerPaths[selectedCareerPath].company} 
                      className="w-12 h-12"
                    />
                    <div>
                      <h2 className="text-2xl font-semibold text-[#EDEAB1]">
                        {careerPaths[selectedCareerPath].role}
                      </h2>
                      <p className="text-gray-400">{careerPaths[selectedCareerPath].company}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#71ADBA] mb-2">Description</h3>
                    <p className="text-gray-300">{careerPaths[selectedCareerPath].description}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#71ADBA] mb-2">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {careerPaths[selectedCareerPath].requiredSkills.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-[#1a1f36]/60 rounded-full text-gray-300 text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#71ADBA] mb-2">Recommended Majors</h3>
                    <div className="flex flex-wrap gap-2">
                      {careerPaths[selectedCareerPath].majorPaths.map((major) => (
                        <span key={major} className="px-3 py-1 bg-[#1a1f36]/60 rounded-full text-gray-300 text-sm">
                          {major}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Career Roadmap Preview */}
                  <div>
                    <h3 className="text-lg font-semibold text-[#71ADBA] mb-4">Career Roadmap Preview</h3>
                    <div className="relative">
                      <div className="absolute top-0 left-4 w-0.5 h-full bg-gradient-to-b from-[#71ADBA] to-[#9C71BA]" />
                      {careerRoadmaps[selectedCareerPath]?.slice(0, 1).map((step, index) => (
                        <div key={index} className="relative pl-10 pb-8">
                          <div className="absolute left-2 w-4 h-4 rounded-full bg-[#71ADBA]" />
                          <h4 className="text-[#EDEAB1] font-semibold mb-2">{step.title}</h4>
                          <p className="text-gray-400 text-sm mb-2">{step.duration}</p>
                          <p className="text-gray-300 mb-2">{step.description}</p>
                          <div className="flex flex-wrap gap-2 mb-2">
                            {step.skills.map((skill) => (
                              <span key={skill} className="px-2 py-1 bg-[#1a1f36]/60 rounded-full text-gray-400 text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                      <div className="relative pl-10 pb-8">
                        <div className="absolute left-2 w-4 h-4 rounded-full bg-[#9C71BA]" />
                        <div className="p-4 bg-[#1a1f36]/60 rounded-lg border border-[#71ADBA]/30">
                          <p className="text-[#EDEAB1] font-semibold mb-2">Want to see your full career roadmap?</p>
                          <p className="text-gray-300">Sign up to unlock:</p>
                          <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
                            <li>Complete 3-year career roadmap</li>
                            <li>Personalized learning resources</li>
                            <li>Progress tracking tools</li>
                            <li>Expert mentorship opportunities</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center"
            >
              <p className="text-xl text-gray-300 mb-6">
                Ready to find your perfect career match?
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <motion.button
                  onClick={() => navigate('/onboarding')}
                  className="px-8 py-4 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-xl 
                           text-white font-semibold text-lg hover:opacity-90 transition-all duration-300
                           flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Start Full Assessment</span>
                  <span className="ml-2 text-sm bg-white/20 px-2 py-1 rounded">20+ Questions</span>
                </motion.button>
                <motion.button
                  onClick={() => {
                    setCurrentStep(0);
                    setDemoAnswers([]);
                    setSelectedCareerPath(null);
                  }}
                  className="px-8 py-4 bg-[#1a1f36]/50 border border-[#71ADBA]/30 rounded-xl 
                           text-[#EDEAB1] font-semibold text-lg hover:bg-[#1a1f36]/70 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Try Demo Again
                </motion.button>
              </div>
              <div className="mt-6 text-gray-400 space-y-2">
                <p className="text-lg">Full assessment includes:</p>
                <p>• In-depth personality analysis</p>
                <p>• Detailed skill assessment</p>
                <p>• Educational pathway recommendations</p>
                <p>• Complete career roadmap</p>
              </div>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DemoPage; 