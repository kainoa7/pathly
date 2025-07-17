import type { AdaptiveQuizQuestion, AdaptiveQuizAnswer } from '../types/adaptiveQuiz';

export const adaptiveQuizQuestions: AdaptiveQuizQuestion[] = [
  // Student Lifecycle Detection - Always shown first
  {
    id: 'student_lifecycle',
    question: 'What best describes your current situation? 🎯',
    type: 'goals',
    category: 'general',
    insights: ['student_lifecycle', 'urgency_level'],
    options: [
      { 
        text: 'High school student preparing for college', 
        value: 'high_school', 
        weight: 1,
        personalityTrait: 'future_planner',
        nextQuestionPath: 'hs_college_direction'
      },
      { 
        text: 'Current college student', 
        value: 'college_current', 
        weight: 1,
        personalityTrait: 'college_navigator',
        nextQuestionPath: 'college_satisfaction'
      },
      { 
        text: 'Considering switching majors', 
        value: 'college_switching', 
        weight: 1,
        personalityTrait: 'path_explorer',
        nextQuestionPath: 'college_satisfaction'
      },
      { 
        text: 'Recent graduate looking for work', 
        value: 'recent_graduate', 
        weight: 1,
        personalityTrait: 'career_launcher',
        nextQuestionPath: 'grad_job_search_stage'
      },
      { 
        text: 'Working professional seeking career change', 
        value: 'career_changer', 
        weight: 1,
        personalityTrait: 'career_changer',
        nextQuestionPath: 'career_change_motivation'
      },
      { 
        text: 'Exploring alternatives to traditional college', 
        value: 'non_college', 
        weight: 1,
        personalityTrait: 'alternative_learner',
        nextQuestionPath: 'non_college_direction'
      }
    ]
  },

  // High School Specific Questions
  {
    id: 'hs_college_direction',
    question: 'What draws you most to the idea of college? 🎓',
    type: 'goals',
    category: 'general',
    prerequisites: ['student_lifecycle'],
    showCondition: (answers) => answers.some(a => a.questionId === 'student_lifecycle' && a.value === 'high_school'),
    insights: ['college_motivation', 'learning_style'],
    options: [
      { 
        text: 'Learning from experts and diving deep into subjects', 
        value: 'academic_depth', 
        weight: 1,
        personalityTrait: 'academic_learner',
        nextQuestionPath: 'hs_subject_interest'
      },
      { 
        text: 'Meeting people and experiencing campus life', 
        value: 'social_experience', 
        weight: 1,
        personalityTrait: 'social_connector',
        nextQuestionPath: 'core_interests'
      },
      { 
        text: 'Building skills for a specific career path', 
        value: 'career_focused', 
        weight: 1,
        personalityTrait: 'goal_oriented',
        nextQuestionPath: 'core_interests'
      },
      { 
        text: 'Exploring different fields before choosing', 
        value: 'exploration', 
        weight: 1,
        personalityTrait: 'curious_explorer',
        nextQuestionPath: 'core_interests'
      }
    ]
  },

  {
    id: 'hs_subject_interest',
    question: 'Which type of classes make you lose track of time? ⏰',
    type: 'interest',
    category: 'general',
    prerequisites: ['hs_college_direction'],
    showCondition: (answers) => answers.some(a => a.questionId === 'hs_college_direction' && a.value === 'academic_depth'),
    options: [
      { text: 'Math, Science, Engineering - solving complex problems', value: 'stem', weight: 2, personalityTrait: 'analytical_mind', nextQuestionPath: 'core_interests' },
      { text: 'Literature, History, Philosophy - understanding human experiences', value: 'humanities', weight: 2, personalityTrait: 'thoughtful_analyst', nextQuestionPath: 'core_interests' },
      { text: 'Art, Music, Creative Writing - expressing ideas creatively', value: 'arts', weight: 2, personalityTrait: 'creative_soul', nextQuestionPath: 'core_interests' },
      { text: 'Psychology, Sociology - understanding how people think', value: 'social_sciences', weight: 2, personalityTrait: 'people_understander', nextQuestionPath: 'core_interests' },
      { text: 'Business, Economics - understanding how systems work', value: 'business', weight: 2, personalityTrait: 'systems_thinker', nextQuestionPath: 'core_interests' }
    ]
  },

  // College Student Specific Questions
  {
    id: 'college_satisfaction',
    question: 'How do you feel about your current major/path? 🤔',
    type: 'goals',
    category: 'general',
    prerequisites: ['student_lifecycle'],
    showCondition: (answers) => answers.some(a => a.questionId === 'student_lifecycle' && ['college_current', 'college_switching'].includes(a.value)),
    options: [
      { text: 'Love it! Just want to optimize my career prospects', value: 'satisfied_optimizing', weight: 1, nextQuestionPath: 'core_interests' },
      { text: 'It\'s okay, but I wonder what else is out there', value: 'curious_about_alternatives', weight: 1, nextQuestionPath: 'core_interests' },
      { text: 'Struggling to see how this leads to a career I want', value: 'career_disconnect', weight: 1, nextQuestionPath: 'core_interests' },
      { text: 'Considering switching - this isn\'t right for me', value: 'considering_switch', weight: 1, nextQuestionPath: 'core_interests' }
    ]
  },

  // Graduate Specific Questions
  {
    id: 'grad_job_search_stage',
    question: 'Where are you in your job search journey? 🚀',
    type: 'goals',
    category: 'general',
    prerequisites: ['student_lifecycle'],
    showCondition: (answers) => answers.some(a => a.questionId === 'student_lifecycle' && a.value === 'recent_graduate'),
    options: [
      { text: 'Just graduated, haven\'t started looking yet', value: 'just_started', weight: 1, nextQuestionPath: 'core_interests' },
      { text: 'Actively applying but not getting responses', value: 'struggling_applications', weight: 1, nextQuestionPath: 'core_interests' },
      { text: 'Getting interviews but no offers', value: 'interview_stage', weight: 1, nextQuestionPath: 'core_interests' },
      { text: 'Considering graduate school instead', value: 'grad_school_option', weight: 1, nextQuestionPath: 'core_interests' }
    ]
  },

  // Career Changer Questions
  {
    id: 'career_change_motivation',
    question: 'What\'s driving your desire for career change? 💭',
    type: 'goals',
    category: 'general',
    prerequisites: ['student_lifecycle'],
    showCondition: (answers) => answers.some(a => a.questionId === 'student_lifecycle' && a.value === 'career_changer'),
    options: [
      { text: 'Want more meaningful/purposeful work', value: 'seeking_purpose', weight: 1, nextQuestionPath: 'core_interests' },
      { text: 'Current field lacks growth opportunities', value: 'seeking_growth', weight: 1, nextQuestionPath: 'core_interests' },
      { text: 'Discovered new interests/passions', value: 'new_interests', weight: 1, nextQuestionPath: 'core_interests' },
      { text: 'Want better work-life balance', value: 'lifestyle_change', weight: 1, nextQuestionPath: 'core_interests' }
    ]
  },

  // Alternative Path Questions
  {
    id: 'non_college_direction',
    question: 'What appeals to you about non-traditional paths? 🛤️',
    type: 'goals',
    category: 'general',
    prerequisites: ['student_lifecycle'],
    showCondition: (answers) => answers.some(a => a.questionId === 'student_lifecycle' && a.value === 'non_college'),
    options: [
      { text: 'Learning practical skills for immediate employment', value: 'practical_skills', weight: 1, nextQuestionPath: 'core_interests' },
      { text: 'Starting my own business/entrepreneurship', value: 'entrepreneurship', weight: 1, nextQuestionPath: 'core_interests' },
      { text: 'Trade work - working with my hands', value: 'trades', weight: 1, nextQuestionPath: 'core_interests' },
      { text: 'Creative pursuits and freelancing', value: 'creative_freelance', weight: 1, nextQuestionPath: 'core_interests' }
    ]
  },

  // Universal Interest Discovery (shown after scenario-specific questions)
  {
    id: 'core_interests',
    question: 'What type of activities energize you most? ⚡',
    type: 'interest',
    category: 'general',
    insights: ['energy_source', 'work_style'],
    options: [
      { 
        text: 'Analyzing data and solving complex problems', 
        value: 'analytical', 
        weight: 1,
        personalityTrait: 'analytical_thinker',
        nextQuestionPath: 'work_environment'
      },
      { 
        text: 'Creating, designing, and bringing ideas to life', 
        value: 'creative', 
        weight: 1,
        personalityTrait: 'creative_mind',
        nextQuestionPath: 'work_environment'
      },
      { 
        text: 'Helping, teaching, and connecting with people', 
        value: 'people_focused', 
        weight: 1,
        personalityTrait: 'people_person',
        nextQuestionPath: 'work_environment'
      },
      { 
        text: 'Leading projects and building strategies', 
        value: 'leadership', 
        weight: 1,
        personalityTrait: 'natural_leader',
        nextQuestionPath: 'work_environment'
      },
      { 
        text: 'Working with my hands and building things', 
        value: 'hands_on', 
        weight: 1,
        personalityTrait: 'practical_builder',
        nextQuestionPath: 'work_environment'
      }
    ]
  },

  // Work Environment Preferences
  {
    id: 'work_environment',
    question: 'What work environment helps you thrive? 🌟',
    type: 'work_environment',
    category: 'general',
    insights: ['work_style', 'environment_preference'],
    options: [
      { text: 'Quiet spaces where I can focus deeply', value: 'focused_environment', weight: 1, personalityTrait: 'deep_thinker' },
      { text: 'Collaborative spaces with lots of interaction', value: 'collaborative', weight: 1, personalityTrait: 'team_player' },
      { text: 'Dynamic environments with variety and change', value: 'dynamic', weight: 1, personalityTrait: 'adaptable' },
      { text: 'Structured environments with clear processes', value: 'structured', weight: 1, personalityTrait: 'process_oriented' },
      { text: 'Flexible/remote work with autonomy', value: 'flexible', weight: 1, personalityTrait: 'self_directed' }
    ]
  },

  // Tech Deep Dive Path
  {
    id: 'tech_deep_dive',
    question: 'When working with technology, what draws you in? 💻',
    type: 'interest',
    category: 'tech',
    prerequisites: ['start_interest'],
    showCondition: (answers) => answers.some(a => a.value === 'analytical'),
    insights: ['tech_preference', 'problem_solving_style'],
    options: [
      { 
        text: 'Building apps and websites people use daily', 
        value: 'web_dev', 
        weight: 2,
        personalityTrait: 'user_focused_developer'
      },
      { 
        text: 'Working with data to find hidden patterns', 
        value: 'data_science', 
        weight: 2,
        personalityTrait: 'data_detective'
      },
      { 
        text: 'Creating systems that can think and learn', 
        value: 'ai_ml', 
        weight: 2,
        personalityTrait: 'ai_pioneer'
      },
      { 
        text: 'Securing systems from cyber threats', 
        value: 'cybersecurity', 
        weight: 2,
        personalityTrait: 'digital_guardian'
      }
    ]
  },

  // Creative Exploration Path
  {
    id: 'creative_exploration',
    question: 'How do you like to express your creativity? 🎨',
    type: 'interest',
    category: 'creative',
    prerequisites: ['start_interest'],
    showCondition: (answers) => answers.some(a => a.value === 'creative'),
    insights: ['creative_style', 'artistic_medium'],
    options: [
      { 
        text: 'Visual design that tells a story', 
        value: 'visual_design', 
        weight: 2,
        personalityTrait: 'visual_storyteller'
      },
      { 
        text: 'Writing that moves and inspires people', 
        value: 'writing', 
        weight: 2,
        personalityTrait: 'word_artist'
      },
      { 
        text: 'Digital experiences that feel magical', 
        value: 'ux_design', 
        weight: 2,
        personalityTrait: 'experience_architect'
      },
      { 
        text: 'Marketing campaigns that capture attention', 
        value: 'creative_marketing', 
        weight: 2,
        personalityTrait: 'brand_innovator'
      }
    ]
  },

  // Social Path
  {
    id: 'social_path',
    question: 'What kind of impact do you want to make on people? 🤝',
    type: 'goals',
    category: 'social',
    prerequisites: ['start_interest'],
    showCondition: (answers) => answers.some(a => a.value === 'empathetic'),
    insights: ['helping_style', 'social_impact_preference'],
    options: [
      { 
        text: 'Help individuals overcome personal challenges', 
        value: 'therapy_counseling', 
        weight: 2,
        personalityTrait: 'emotional_healer'
      },
      { 
        text: 'Educate and inspire the next generation', 
        value: 'education', 
        weight: 2,
        personalityTrait: 'knowledge_sharer'
      },
      { 
        text: 'Fight for justice and social change', 
        value: 'social_justice', 
        weight: 2,
        personalityTrait: 'change_advocate'
      },
      { 
        text: 'Research to understand human behavior', 
        value: 'research_psychology', 
        weight: 2,
        personalityTrait: 'human_scientist'
      }
    ]
  },

  // Business Track
  {
    id: 'business_track',
    question: 'What type of business challenge excites you most? 💼',
    type: 'interest',
    category: 'business',
    prerequisites: ['start_interest'],
    showCondition: (answers) => answers.some(a => a.value === 'leadership'),
    insights: ['business_strength', 'leadership_style'],
    options: [
      { 
        text: 'Growing startups from idea to success', 
        value: 'entrepreneurship', 
        weight: 2,
        personalityTrait: 'startup_founder'
      },
      { 
        text: 'Analyzing data to drive smart decisions', 
        value: 'business_analytics', 
        weight: 2,
        personalityTrait: 'data_strategist'
      },
      { 
        text: 'Managing finances and investments', 
        value: 'finance', 
        weight: 2,
        personalityTrait: 'financial_wizard'
      },
      { 
        text: 'Building brands that people love', 
        value: 'marketing_branding', 
        weight: 2,
        personalityTrait: 'brand_builder'
      }
    ]
  },

  // Work Environment Questions (Adaptive based on previous answers)
  {
    id: 'work_environment',
    question: 'What work environment brings out your best? 🏢',
    type: 'work_environment',
    category: 'general',
    insights: ['work_style', 'collaboration_preference'],
    options: [
      { 
        text: 'Quiet space where I can focus deeply', 
        value: 'independent', 
        weight: 1,
        personalityTrait: 'deep_thinker'
      },
      { 
        text: 'Collaborative team with lots of energy', 
        value: 'team_oriented', 
        weight: 1,
        personalityTrait: 'team_player'
      },
      { 
        text: 'Fast-paced startup with constant change', 
        value: 'dynamic', 
        weight: 1,
        personalityTrait: 'change_embracer'
      },
      { 
        text: 'Established company with clear structure', 
        value: 'structured', 
        weight: 1,
        personalityTrait: 'stability_seeker'
      }
    ]
  },

  // Learning Style (Shown based on interest patterns)
  {
    id: 'learning_style',
    question: 'How do you learn best? 📚',
    type: 'learning_style',
    category: 'general',
    insights: ['learning_preference', 'skill_development'],
    options: [
      { 
        text: 'Hands-on projects and real experience', 
        value: 'practical', 
        weight: 1,
        personalityTrait: 'hands_on_learner'
      },
      { 
        text: 'Theory and research-based knowledge', 
        value: 'theoretical', 
        weight: 1,
        personalityTrait: 'academic_mind'
      },
      { 
        text: 'Learning from mentors and experts', 
        value: 'mentorship', 
        weight: 1,
        personalityTrait: 'wisdom_seeker'
      },
      { 
        text: 'Trial and error with quick feedback', 
        value: 'experimental', 
        weight: 1,
        personalityTrait: 'experimental_learner'
      }
    ]
  },

  // Goal-oriented questions (Adaptive based on career path)
  {
    id: 'career_goals',
    question: 'What does career success look like to you? 🎯',
    type: 'goals',
    category: 'general',
    insights: ['success_definition', 'motivation_drivers'],
    options: [
      { 
        text: 'High income and financial security', 
        value: 'financial_success', 
        weight: 1,
        personalityTrait: 'wealth_motivated'
      },
      { 
        text: 'Making a positive impact on the world', 
        value: 'impact_focused', 
        weight: 1,
        personalityTrait: 'purpose_driven'
      },
      { 
        text: 'Recognition as an expert in my field', 
        value: 'expertise_recognition', 
        weight: 1,
        personalityTrait: 'mastery_seeker'
      },
      { 
        text: 'Work-life balance and flexibility', 
        value: 'work_life_balance', 
        weight: 1,
        personalityTrait: 'balance_focused'
      }
    ]
  },

  // Challenge preference (Shown later in quiz)
  {
    id: 'challenge_preference',
    question: 'What type of challenges energize you? ⚡',
    type: 'personality',
    category: 'general',
    insights: ['challenge_appetite', 'problem_solving_style'],
    options: [
      { 
        text: 'Complex puzzles that require deep thinking', 
        value: 'analytical_challenges', 
        weight: 1,
        personalityTrait: 'puzzle_solver'
      },
      { 
        text: 'People problems that need creative solutions', 
        value: 'interpersonal_challenges', 
        weight: 1,
        personalityTrait: 'people_solver'
      },
      { 
        text: 'Technical problems with clear solutions', 
        value: 'technical_challenges', 
        weight: 1,
        personalityTrait: 'technical_solver'
      },
      { 
        text: 'Strategic challenges with big picture impact', 
        value: 'strategic_challenges', 
        weight: 1,
        personalityTrait: 'strategic_thinker'
      }
    ]
  }
];

// Helper function to get next question based on adaptive logic
export const getNextQuestion = (
  currentQuestionId: string, 
  selectedOption: string, 
  allAnswers: AdaptiveQuizAnswer[]
): string | null => {
  const currentQuestion = adaptiveQuizQuestions.find(q => q.id === currentQuestionId);
  const selectedOptionData = currentQuestion?.options.find(opt => opt.value === selectedOption);
  
  // Check if option has specific next question path
  if (selectedOptionData?.nextQuestionPath) {
    return selectedOptionData.nextQuestionPath;
  }
  
  // Find next available question that meets prerequisites and conditions
  const answeredQuestionIds = allAnswers.map(a => a.questionId);
  const remainingQuestions = adaptiveQuizQuestions.filter(q => 
    !answeredQuestionIds.includes(q.id)
  );
  
  for (const question of remainingQuestions) {
    // Check prerequisites
    if (question.prerequisites) {
      const prerequisitesMet = question.prerequisites.every(prereq => 
        answeredQuestionIds.includes(prereq)
      );
      if (!prerequisitesMet) continue;
    }
    
    // Check show condition
    if (question.showCondition && !question.showCondition(allAnswers)) {
      continue;
    }
    
    return question.id;
  }
  
  return null; // Quiz complete
}; 