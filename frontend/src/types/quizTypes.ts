export interface Career {
  title: string;
  description: string;
  averageSalary: string;
  skills: string[];
}

export interface JobMarketData {
  startingSalary: string;
  growthRate: string;
  annualOpenings: number;
  annualGraduates: number;
  marketStatus: 'high-demand' | 'competitive' | 'oversaturated';
}

export interface Major {
  id: string;
  name: string;
  description: string;
  hasRoadmap: boolean;
  careers: Career[];
  interests: string[];
  category: 'tech' | 'business' | 'social' | 'creative';
  educationLevel: '2year' | '4year' | 'masters';
  goals: string[];
  jobMarket: JobMarketData;
}

export interface QuizOption {
  text: string;
  value: string;
  leadsTo?: string;
  majorMatch?: string[];
  weight: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: string;
  options: QuizOption[];
  dependsOn?: {
    questionId: string;
    value: string;
  };
}

export interface QuizAnswer {
  questionId: string;
  value: string;
  weight: number;
}

export interface MajorMatch {
  majorId: string;
  matchScore: number;
  matchReasons: string[];
}

export interface QuizState {
  currentQuestionId: string;
  answers: QuizAnswer[];
  majorMatches: MajorMatch[];
  completed: boolean;
} 