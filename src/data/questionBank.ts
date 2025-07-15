import { QuizQuestion } from '../types/quiz';
import { 
  CodeIcon, BrushIcon, BusinessIcon, PeopleIcon, 
  ScienceIcon, MusicNoteIcon, BuildIcon, SchoolIcon,
  WorkIcon, HomeIcon, TrendingUpIcon, GroupsIcon
} from '@mui/icons-material';

export const questionBank: QuizQuestion[] = [
  // Interests Category
  {
    id: 'int_1',
    question: "What type of problems do you enjoy solving the most?",
    type: 'multiple-choice',
    category: 'interests',
    educationLevel: ['2year', '4year', 'masters'],
    options: [
      { text: "Technical puzzles and coding challenges", value: "technical", icon: "CodeIcon" },
      { text: "Creative and design challenges", value: "creative", icon: "BrushIcon" },
      { text: "Business and strategic problems", value: "business", icon: "BusinessIcon" },
      { text: "Social and interpersonal issues", value: "social", icon: "PeopleIcon" }
    ]
  },
  {
    id: 'int_2',
    question: "Rate your interest in research and discovery:",
    type: 'slider',
    category: 'interests',
    educationLevel: ['4year', 'masters'],
    sliderConfig: {
      min: 1,
      max: 5,
      step: 1,
      labels: {
        1: "Not interested",
        3: "Somewhat interested",
        5: "Very passionate"
      }
    }
  },
  // Skills Category
  {
    id: 'skill_1',
    question: "Rank these skills based on your current strengths:",
    type: 'ranking',
    category: 'skills',
    educationLevel: ['2year', '4year', 'masters'],
    rankingItems: [
      "Problem-solving",
      "Communication",
      "Creativity",
      "Technical ability",
      "Leadership"
    ]
  },
  // Values Category
  {
    id: 'val_1',
    question: "What matters most to you in your future career?",
    type: 'multiple-choice',
    category: 'values',
    educationLevel: ['2year', '4year', 'masters'],
    options: [
      { text: "Making a high income", value: "income", icon: "TrendingUpIcon" },
      { text: "Work-life balance", value: "balance", icon: "HomeIcon" },
      { text: "Making a difference", value: "impact", icon: "PeopleIcon" },
      { text: "Learning and growth", value: "growth", icon: "SchoolIcon" }
    ]
  }
];

// Helper function to get questions for a specific education level
export const getQuestionsByLevel = (level: string): QuizQuestion[] => {
  return questionBank.filter(q => q.educationLevel.includes(level));
};

// Helper function to get questions by category
export const getQuestionsByCategory = (category: string): QuizQuestion[] => {
  return questionBank.filter(q => q.category === category);
}; 