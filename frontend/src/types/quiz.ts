export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'slider' | 'ranking';
  options?: QuizOption[];
  sliderConfig?: {
    min: number;
    max: number;
    step: number;
    labels: { [key: number]: string };
  };
  rankingItems?: string[];
  category: QuestionCategory;
  educationLevel: EducationLevel[];
}

export interface QuizOption {
  text: string;
  value: string;
  icon?: string;
}

export type QuestionCategory = 
  | 'interests'      // What interests you?
  | 'skills'         // What are you good at?
  | 'values'         // What matters to you?
  | 'environment'    // Where do you want to work?
  | 'goals'          // What are your career goals?
  | 'personality'    // How do you work best?
  | 'challenges'     // What challenges interest you?
  | 'lifestyle';     // What lifestyle do you want?

export type EducationLevel = '2year' | '4year' | 'masters';

export interface QuizState {
  currentQuestion: number;
  answers: {
    questionId: string;
    answer: string | number | string[];
    timestamp: number;
  }[];
  educationLevel: EducationLevel;
  startTime: number;
}

export interface QuizResult {
  primaryMatches: string[];    // Top matching majors
  secondaryMatches: string[];  // Secondary matches
  matchScores: {              // Detailed scoring
    [majorId: string]: {
      overallScore: number;
      categoryScores: {
        [category in QuestionCategory]: number;
      };
    };
  };
  suggestedPathways: {        // Different educational pathways
    twoYear: string[];
    fourYear: string[];
    masters: string[];
  };
} 