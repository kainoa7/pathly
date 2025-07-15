import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { QuizAnswer, QuizState, QuizQuestion } from '../types/quizTypes';
import { calculateMajorMatches } from '../utils/quizLogic';
import { motion } from 'framer-motion';
import { quizQuestions } from '../data/quizQuestions';

interface QuizPageProps {
  quizType: 'highschool' | 'college';
}

const QuizPage = ({ quizType }: QuizPageProps) => {
  const navigate = useNavigate();
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionId: quizQuestions[0]?.id || '', // Initialize with first question ID
    answers: [],
    majorMatches: [],
    completed: false
  });

  // Get total questions directly from the questions array
  const TOTAL_QUESTIONS = quizQuestions.length;

  const handleAnswer = (value: string, weight: number) => {
    const newAnswer: QuizAnswer = {
      questionId: quizState.currentQuestionId,
      value,
      weight
    };

    const newAnswers = [...quizState.answers, newAnswer];
    
    // Get the next question index
    const currentIndex = quizQuestions.findIndex(q => q.id === quizState.currentQuestionId);
    const nextQuestion = currentIndex < quizQuestions.length - 1 ? quizQuestions[currentIndex + 1] : null;

    if (nextQuestion) {
      setQuizState(prev => ({
        ...prev,
        currentQuestionId: nextQuestion.id,
        answers: newAnswers
      }));
    } else {
      // Quiz is complete
      const matches = calculateMajorMatches(newAnswers);
      setQuizState(prev => ({
        ...prev,
        answers: newAnswers,
        majorMatches: matches,
        completed: true
      }));
      navigate('/results', { state: { matches } });
    }
  };

  // Get current question directly from the array
  const currentQuestionIndex = Math.max(0, quizQuestions.findIndex(q => q.id === quizState.currentQuestionId));
  const currentQuestion = quizQuestions[currentQuestionIndex];

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white py-12 px-4 flex items-center justify-center">
        <div className="text-xl">Loading quiz questions...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1e293b] rounded-lg p-8 shadow-xl"
        >
          {/* Question Counter */}
          <div className="text-center mb-6">
            <span className="text-[#EDEAB1] text-lg">
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
                <span>{option.text}</span>
              </motion.button>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="mt-8">
            <div className="h-2 bg-[#2d3a4f] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] transition-all duration-300"
                style={{ 
                  width: `${((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100}%`
                }}
              />
            </div>
            <p className="text-center mt-2 text-gray-400">
              {Math.round(((currentQuestionIndex + 1) / TOTAL_QUESTIONS) * 100)}% Complete
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizPage; 