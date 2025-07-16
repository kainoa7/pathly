import { QuizState, QuizResult, QuestionCategory } from '../types/quiz';
import { Major } from '../data/majorsData';

interface MatchingWeights {
  interests: number;
  skills: number;
  values: number;
  environment: number;
  goals: number;
  personality: number;
  challenges: number;
  lifestyle: number;
}

const categoryWeights: MatchingWeights = {
  interests: 1.5,    // High weight as interests strongly predict satisfaction
  skills: 1.2,       // Important but can be developed
  values: 1.3,       // Strong predictor of long-term satisfaction
  environment: 1.0,  // Moderate importance
  goals: 1.4,        // High weight as it affects career trajectory
  personality: 1.1,  // Important for work style fit
  challenges: 0.9,   // Lower weight but still relevant
  lifestyle: 1.0     // Moderate importance
};

export const calculateMatches = (
  quizState: QuizState,
  majors: Major[]
): QuizResult => {
  const matchScores: QuizResult['matchScores'] = {};

  // Initialize scores for each major
  majors.forEach(major => {
    matchScores[major.id] = {
      overallScore: 0,
      categoryScores: {
        interests: 0,
        skills: 0,
        values: 0,
        environment: 0,
        goals: 0,
        personality: 0,
        challenges: 0,
        lifestyle: 0
      }
    };
  });

  // Process each answer
  quizState.answers.forEach(answer => {
    majors.forEach(major => {
      const score = calculateAnswerScore(answer, major);
      const category = getCategoryFromQuestionId(answer.questionId);
      
      if (category) {
        matchScores[major.id].categoryScores[category] += score;
      }
    });
  });

  // Calculate overall scores with weights
  majors.forEach(major => {
    let weightedSum = 0;
    let weightSum = 0;

    Object.entries(categoryWeights).forEach(([category, weight]) => {
      weightedSum += matchScores[major.id].categoryScores[category as QuestionCategory] * weight;
      weightSum += weight;
    });

    matchScores[major.id].overallScore = weightedSum / weightSum;
  });

  // Sort majors by score
  const sortedMajors = majors
    .map(major => ({
      id: major.id,
      score: matchScores[major.id].overallScore
    }))
    .sort((a, b) => b.score - a.score);

  // Group by education level
  const pathways: QuizResult['suggestedPathways'] = {
    twoYear: [],
    fourYear: [],
    masters: []
  };

  sortedMajors.forEach(({ id }) => {
    const major = majors.find(m => m.id === id);
    if (major) {
      switch (major.educationLevel) {
        case '2year':
          pathways.twoYear.push(id);
          break;
        case '4year':
          pathways.fourYear.push(id);
          break;
        case 'masters':
          pathways.masters.push(id);
          break;
      }
    }
  });

  return {
    primaryMatches: sortedMajors.slice(0, 3).map(m => m.id),
    secondaryMatches: sortedMajors.slice(3, 8).map(m => m.id),
    matchScores,
    suggestedPathways: pathways
  };
};

// Helper functions
const calculateAnswerScore = (
  answer: QuizState['answers'][0],
  major: Major
): number => {
  // This is a simplified version - we'll need to expand this based on
  // question types and major attributes
  return 0.5; // Placeholder
};

const getCategoryFromQuestionId = (id: string): QuestionCategory | null => {
  const prefix = id.split('_')[0];
  const categoryMap: { [key: string]: QuestionCategory } = {
    int: 'interests',
    skill: 'skills',
    val: 'values',
    env: 'environment',
    goal: 'goals',
    pers: 'personality',
    chal: 'challenges',
    life: 'lifestyle'
  };
  return categoryMap[prefix] || null;
}; 