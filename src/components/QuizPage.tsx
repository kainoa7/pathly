import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { majorsData } from '../data/majorsData';

interface Question {
  id: number;
  text: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "What type of problems do you enjoy solving?",
    options: [
      "Technical and logical problems",
      "Business and organizational challenges",
      "Understanding and helping people",
      "Creative and artistic projects"
    ]
  },
  {
    id: 2,
    text: "How do you prefer to work?",
    options: [
      "Independently with computers/technology",
      "In teams leading projects",
      "One-on-one with people",
      "In creative collaborative environments"
    ]
  },
  {
    id: 3,
    text: "What subjects interest you most?",
    options: [
      "Math and Science",
      "Business and Economics",
      "Psychology and Social Sciences",
      "Arts and Humanities"
    ]
  },
  {
    id: 4,
    text: "What are your goals after college?",
    options: [
      "Make a high income",
      "Make a difference/help others",
      "Be creative",
      "Have job stability"
    ]
  },
  {
    id: 5,
    text: "How much schooling are you willing to pursue?",
    options: [
      "2 years (associate or bootcamp)",
      "4 years (bachelor's)",
      "Master's or higher"
    ]
  }
];

const QuizPage = () => {
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
      // Get the selected answers text
      const selectedAnswers = newAnswers.map((answerIndex, questionIndex) => 
        questions[questionIndex].options[answerIndex]
      );

      // Map education level answer to major requirement
      const educationMap: { [key: string]: '2year' | '4year' | 'masters' } = {
        "2 years (associate or bootcamp)": '2year',
        "4 years (bachelor's)": '4year',
        "Master's or higher": 'masters'
      };
      const selectedEducation = educationMap[selectedAnswers[4]];

      // Calculate category scores based on first 3 answers
      const categoryScores = {
        tech: 0,
        business: 0,
        social: 0,
        creative: 0
      };

      // Map first 3 answers to categories
      selectedAnswers.slice(0, 3).forEach(answer => {
        if (answer.includes('Technical') || answer.includes('computers') || answer.includes('Math and Science')) {
          categoryScores.tech++;
        }
        if (answer.includes('Business') || answer.includes('teams leading') || answer.includes('Economics')) {
          categoryScores.business++;
        }
        if (answer.includes('helping people') || answer.includes('One-on-one') || answer.includes('Social Sciences')) {
          categoryScores.social++;
        }
        if (answer.includes('Creative') || answer.includes('artistic') || answer.includes('Arts and Humanities')) {
          categoryScores.creative++;
        }
      });

      // Find the dominant categories (there might be ties)
      const maxScore = Math.max(...Object.values(categoryScores));
      const dominantCategories = Object.entries(categoryScores)
        .filter(([_, score]) => score === maxScore)
        .map(([category]) => category);

      // Get selected goal
      const selectedGoal = selectedAnswers[3];

      // Filter majors by education level first
      const educationFilteredMajors = majorsData.filter(major => {
        if (selectedEducation === 'masters') {
          // If user is willing to do masters, show all paths that typically require it
          return major.educationLevel === 'masters';
        } else if (selectedEducation === '4year') {
          // If user wants bachelor's, show 4-year and 2-year programs
          return major.educationLevel === '4year' || major.educationLevel === '2year';
        } else {
          // If user wants 2-year, only show 2-year programs
          return major.educationLevel === '2year';
        }
      });

      // Then score and sort the education-filtered majors
      const matchedMajors = educationFilteredMajors
        .map(major => ({
          major,
          matchScore: (
            // Base score from matching interests (first 3 answers)
            major.interests.filter(interest => 
              selectedAnswers.slice(0, 3).includes(interest)
            ).length * 2 + // Weight interest matches more heavily
            // Bonus points for matching category
            (dominantCategories.includes(major.category) ? 3 : 0) +
            // Points for matching goals
            (major.goals.includes(selectedGoal) ? 2 : 0)
          )
        }))
        .sort((a, b) => b.matchScore - a.matchScore)
        .filter(({ matchScore }) => matchScore > 4) // Require a minimum match score
        .map(({ major }) => major.id);

      navigate('/results', { 
        state: { 
          recommendedPaths: matchedMajors.slice(0, 3),
          answers: selectedAnswers,
          isHighSchool: true,
          hasMatches: matchedMajors.length > 0,
          selectedEducation,
          selectedGoal
        } 
      });
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
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-2xl mx-auto mb-4 sm:mb-8"
      >
        <button
          onClick={goBack}
          className="p-2 rounded-full text-[#71ADBA] hover:text-[#EDEAB1] transition-colors duration-200"
        >
          <ArrowBackIcon className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#71ADBA] to-[#EDEAB1] transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center mt-2 text-sm sm:text-base text-[#71ADBA]">
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
            <div className="glass-panel p-4 sm:p-8 mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold heading-gradient mb-6 sm:mb-8">
                {question.text}
              </h2>
              <div className="grid gap-3 sm:gap-4">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="card text-left p-4 hover:scale-[1.02] group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-[#EDEAB1] group-hover:text-white transition-colors duration-200">
                      {option}
                    </span>
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

export default QuizPage; 