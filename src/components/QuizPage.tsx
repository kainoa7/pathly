import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import BrushIcon from '@mui/icons-material/Brush';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import ScienceIcon from '@mui/icons-material/Science';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const QuizPage = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const questions = [
    {
      question: "What's your vibe when solving problems? 🤔",
      options: [
        { icon: CodeIcon, text: "Breaking down complex problems step by step", value: "analytical" },
        { icon: BrushIcon, text: "Finding creative and unique solutions", value: "creative" },
        { icon: BusinessIcon, text: "Leading a team to find solutions together", value: "leadership" },
        { icon: PeopleIcon, text: "Helping others overcome their challenges", value: "helping" }
      ]
    },
    {
      question: "Your ideal Friday night looks like... 🌙",
      options: [
        { icon: CodeIcon, text: "Coding a cool side project", value: "tech" },
        { icon: MusicNoteIcon, text: "Creating something artistic", value: "arts" },
        { icon: BusinessIcon, text: "Planning your future startup", value: "business" },
        { icon: PeopleIcon, text: "Hanging with friends and meeting new people", value: "social" }
      ]
    },
    {
      question: "What gets you excited to learn? 📚",
      options: [
        { icon: ScienceIcon, text: "Science and technology advances", value: "stem" },
        { icon: BrushIcon, text: "Art and design trends", value: "creative" },
        { icon: BusinessIcon, text: "Business and market trends", value: "business" },
        { icon: PeopleIcon, text: "Understanding human behavior", value: "social" }
      ]
    },
    {
      question: "When working on a group project, you usually... 👥",
      options: [
        { icon: CodeIcon, text: "Handle the technical details and planning", value: "analytical" },
        { icon: BrushIcon, text: "Come up with innovative ideas", value: "creative" },
        { icon: BusinessIcon, text: "Take charge and delegate tasks", value: "leadership" },
        { icon: PeopleIcon, text: "Make sure everyone's voice is heard", value: "social" }
      ]
    },
    {
      question: "What kind of YouTube videos do you binge? 🎥",
      options: [
        { icon: ScienceIcon, text: "Tech reviews and science experiments", value: "stem" },
        { icon: MusicNoteIcon, text: "DIY crafts and art tutorials", value: "arts" },
        { icon: BusinessIcon, text: "Entrepreneurship and success stories", value: "business" },
        { icon: PeopleIcon, text: "Lifestyle vlogs and social commentary", value: "social" }
      ]
    },
    {
      question: "Your dream internship would be at... 💼",
      options: [
        { icon: CodeIcon, text: "A cutting-edge tech company", value: "tech" },
        { icon: BrushIcon, text: "A creative design studio", value: "creative" },
        { icon: BusinessIcon, text: "A fast-growing startup", value: "business" },
        { icon: PeopleIcon, text: "A non-profit helping others", value: "helping" }
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    setIsTransitioning(true);
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setIsTransitioning(false);
      } else {
        // Quiz completed
        navigate('/results', { state: { answers: newAnswers } });
      }
    }, 500);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="page-container">
      {/* Progress Bar */}
      <div className="fixed top-20 left-0 w-full h-1.5 bg-white/10 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-[#71ADBA] to-[#EDEAB1]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <div className="main-content max-w-2xl mx-auto pt-24 md:pt-32">
        {/* Question Counter */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <span className="text-[#EDEAB1] text-lg">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </motion.div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold heading-gradient mb-8">
              {questions[currentQuestion].question}
            </h2>

            {/* Options */}
            <div className="grid gap-6 md:gap-8">
              {questions[currentQuestion].options.map((option, index) => {
                const Icon = option.icon;
                return (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => !isTransitioning && handleAnswer(option.value)}
                    className="group relative glass-panel p-6 md:p-8 text-left transition-all duration-300
                             hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(113,173,186,0.2)]"
                    disabled={isTransitioning}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#71ADBA] to-[#EDEAB1] p-0.5">
                        <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6 text-[#EDEAB1]" />
                        </div>
                      </div>
                      <span className="text-xl text-white group-hover:text-[#EDEAB1] transition-colors duration-300">
                        {option.text}
                      </span>
                    </div>
                    
                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#71ADBA]/10 to-[#EDEAB1]/10 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Skip Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <button
            onClick={() => handleAnswer('skip')}
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            Skip this question →
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizPage; 