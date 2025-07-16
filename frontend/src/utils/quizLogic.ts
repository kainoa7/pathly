import type { QuizQuestion, QuizAnswer, MajorMatch } from '../types/quizTypes';
import { quizQuestions } from '../data/quizQuestions';
import { majorsData } from '../data/majorsData';

export const getNextQuestion = (currentQuestionId: string, answers: QuizAnswer[]): QuizQuestion | null => {
  // If no current question, return the first question
  if (!currentQuestionId) {
    return quizQuestions[0];
  }

  // Find the index of the current question
  const currentIndex = quizQuestions.findIndex(q => q.id === currentQuestionId);
  
  // If we found the current question and it's not the last one, return the next question
  if (currentIndex >= 0 && currentIndex < quizQuestions.length - 1) {
    return quizQuestions[currentIndex + 1];
  }

  // If we're at the last question or something went wrong, return null
  return null;
};

export const calculateMajorMatches = (answers: QuizAnswer[]): MajorMatch[] => {
  const majorScores = new Map<string, { score: number; reasons: string[] }>();
  
  // Initialize scores for all majors
  majorsData.forEach(major => {
    majorScores.set(major.id, { score: 0, reasons: [] });
  });

  // Process each answer
  answers.forEach(answer => {
    const question = quizQuestions.find(q => q.id === answer.questionId);
    const selectedOption = question?.options.find(o => o.value === answer.value);
    
    if (selectedOption) {
      // If the option directly matches majors
      if (selectedOption.majorMatch) {
        selectedOption.majorMatch.forEach(majorId => {
          const current = majorScores.get(majorId);
          if (current) {
            current.score += selectedOption.weight;
            current.reasons.push(`Matches your interest in ${selectedOption.text}`);
          }
        });
      }

      // Special handling for education level
      if (question?.type === 'education') {
        majorsData.forEach(major => {
          const current = majorScores.get(major.id);
          if (current && major.educationLevel === answer.value) {
            current.score += selectedOption.weight;
            current.reasons.push(`Matches your preferred education level`);
          }
        });
      }
    }
  });

  // Convert to array and sort by score
  return Array.from(majorScores.entries())
    .map(([majorId, { score, reasons }]) => ({
      majorId,
      matchScore: score,
      matchReasons: reasons
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
};

export const isQuizComplete = (answers: QuizAnswer[]): boolean => {
  // Quiz is complete when we have answers for all questions
  return answers.length === quizQuestions.length;
}; 