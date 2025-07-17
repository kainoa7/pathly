export interface AdaptiveQuizOption {
  text: string;
  value: string;
  weight: number;
  nextQuestionPath?: string; // For branching logic
  personalityTrait?: string; // Maps to personality insights
}

export interface AdaptiveQuizQuestion {
  id: string;
  question: string;
  type: 'interest' | 'personality' | 'goals' | 'learning_style' | 'work_environment';
  category: 'tech' | 'business' | 'social' | 'creative' | 'general';
  options: AdaptiveQuizOption[];
  prerequisites?: string[]; // Questions that must be answered first
  showCondition?: (answers: AdaptiveQuizAnswer[]) => boolean; // Conditional question logic
  insights?: string[]; // Personality insights this question reveals
}

export interface AdaptiveQuizAnswer {
  questionId: string;
  value: string;
  weight: number;
  personalityTrait?: string;
  timestamp: Date;
}

export interface PersonalityInsight {
  trait: string;
  score: number; // 0-100
  description: string;
  icon: string;
  strengths: string[];
  careers: string[];
}

export interface AdaptiveQuizState {
  currentQuestionId: string;
  answers: AdaptiveQuizAnswer[];
  personalityProfile: PersonalityInsight[];
  majorMatches: any[]; // Keep your existing major matching
  completed: boolean;
  progress: number; // 0-100
  adaptivePath: string[]; // Track which questions were shown
}

export interface QuizAnalytics {
  totalQuestions: number;
  questionsAnswered: number;
  timeSpent: number;
  personalityTypes: string[];
  topMajorCategories: string[];
} 