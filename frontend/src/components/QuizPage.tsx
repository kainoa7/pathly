import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { QuizAnswer, QuizState, QuizQuestion } from '../types/quizTypes';
import { calculateMajorMatches } from '../utils/quizLogic';
import { motion } from 'framer-motion';
import { highSchoolQuestions, collegeQuestions, graduatedQuestions } from '../data/quizQuestions';

interface QuizPageProps {
  quizType: 'highschool' | 'college' | 'graduated';
}

const QuizPage = ({ quizType }: QuizPageProps) => {
  const navigate = useNavigate();
  
  // Get the appropriate question set based on quiz type
  const getQuestions = (type: string): QuizQuestion[] => {
    switch (type) {
      case 'highschool':
        return highSchoolQuestions;
      case 'college':
        return collegeQuestions;
      case 'graduated':
        return graduatedQuestions;
      default:
        return highSchoolQuestions;
    }
  };

  const questions = getQuestions(quizType);
  
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionId: questions[0]?.id || '',
    answers: [],
    majorMatches: [],
    completed: false
  });

  // Get total questions from the selected question set
  const TOTAL_QUESTIONS = questions.length;

  const handleAnswer = (value: string, weight: number) => {
    const newAnswer: QuizAnswer = {
      questionId: quizState.currentQuestionId,
      value,
      weight
    };

    const newAnswers = [...quizState.answers, newAnswer];
    
    // Get the next question index
    const currentIndex = questions.findIndex(q => q.id === quizState.currentQuestionId);
    const nextQuestion = currentIndex < questions.length - 1 ? questions[currentIndex + 1] : null;

    if (nextQuestion) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionId: nextQuestion.id,
        answers: newAnswers
      }));
    } else {
      // Quiz is complete - navigate to demo results based on quiz type
      const matches = calculateMajorMatches(newAnswers);
      setQuizState(prev => ({
        ...prev,
        answers: newAnswers,
        majorMatches: matches,
        completed: true
      }));
      
      // Navigate to different demo results based on the quiz type
      navigate(`/results/${quizType}`, { 
        state: { 
          matches, 
          quizType, 
          answers: newAnswers 
        } 
      });
    }
  };

  // Get current question from the selected question set
  const currentQuestionIndex = Math.max(0, questions.findIndex(q => q.id === quizState.currentQuestionId));
  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white py-12 px-4 flex items-center justify-center">
        <div className="text-xl">Loading quiz questions...</div>
      </div>
    );
  }

  // Get title based on quiz type
  const getQuizTitle = (type: string): string => {
    switch (type) {
      case 'highschool':
        return 'High School Career Explorer';
      case 'college':
        return 'College Major Finder';
      case 'graduated':
        return 'Next Steps Planning';
      default:
        return 'Career Quiz';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1e293b] rounded-lg p-8 shadow-xl"
        >
          {/* Quiz Title */}
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-[#EDEAB1] mb-2">
              {getQuizTitle(quizType)}
            </h1>
          </div>

          {/* Question Counter */}
          <div className="text-center mb-6">
            <span className="text-[#71ADBA] text-lg">
              Question {currentQuestionIndex + 1} of {TOTAL_QUESTIONS}
            </span>
          </div>

          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-transparent bg-clip-text">
            {currentQuestion.question}
          </h2>

          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={option.value}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleAnswer(option.value, option.weight)}
                className="w-full p-4 text-left rounded-lg bg-[#2d3a4f] hover:bg-[#374357] transition-colors duration-200 flex items-center space-x-3"
              >
                <div className="w-6 h-6 rounded-full border-2 border-[#71ADBA] flex items-center justify-center">
                  <span className="text-sm">{String.fromCharCode(65 + index)}</span>
                </div>
                <span className="text-lg">{option.text}</span>
              </motion.button>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mt-8">
            <div className="bg-[#374357] rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizPage; 