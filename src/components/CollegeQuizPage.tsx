import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Question {
  id: number;
  text: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "Which college courses have you enjoyed the most so far?",
    options: [
      "Math and Computer Science courses",
      "Business and Economics courses",
      "Psychology and Social Science courses",
      "Arts and Humanities courses"
    ]
  },
  {
    id: 2,
    text: "What type of internship or part-time work interests you?",
    options: [
      "Technology and Software Development",
      "Business Analysis and Consulting",
      "Counseling and Social Services",
      "Creative and Design Work"
    ]
  },
  {
    id: 3,
    text: "What kind of impact do you want to make in your career?",
    options: [
      "Building innovative technologies",
      "Driving business growth and strategy",
      "Helping people improve their lives",
      "Creating meaningful experiences through art and design"
    ]
  }
];

const CollegeQuizPage = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [direction, setDirection] = useState(0);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);
    setDirection(1);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const mostCommonAnswer = newAnswers.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {} as Record<number, number>);

      const highestCount = Math.max(...Object.values(mostCommonAnswer));
      const recommendedPath = Object.keys(mostCommonAnswer).find(
        key => mostCommonAnswer[Number(key)] === highestCount
      );

      navigate('/results', { state: { recommendedPath, isCollege: true } });
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    } else {
      navigate('/onboarding');
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-2xl mx-auto mb-8"
      >
        <button
          onClick={goBack}
          className="p-2 rounded-full text-white hover:bg-white/20 transition-colors duration-200"
        >
          <ArrowBackIcon className="w-6 h-6" />
        </button>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center mt-2 text-white text-opacity-90">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
          >
            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                {question.text}
              </h2>
              <div className="grid gap-4">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full p-4 text-left rounded-xl border-2 border-gray-200 hover:border-fuchsia-500 hover:bg-fuchsia-50 transition-all duration-200 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-lg text-gray-800 group-hover:text-fuchsia-700">{option}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CollegeQuizPage; 