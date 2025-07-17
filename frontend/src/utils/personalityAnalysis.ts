import type { AdaptiveQuizAnswer, PersonalityInsight } from '../types/adaptiveQuiz';

// Comprehensive personality trait definitions across all fields
export const personalityTraits: Record<string, PersonalityInsight> = {
  // Core analytical traits
  analytical_thinker: {
    trait: 'Analytical Thinker',
    score: 0,
    description: 'You excel at breaking down complex problems and finding logical solutions.',
    icon: '🧠',
    strengths: ['Problem solving', 'Critical thinking', 'Data analysis', 'Pattern recognition'],
    careers: ['Data Scientist', 'Research Analyst', 'Financial Analyst', 'Market Researcher', 'Lab Scientist', 'Engineer']
  },
  analytical_mind: {
    trait: 'Logical Problem Solver',
    score: 0,
    description: 'You thrive on systematic thinking and evidence-based reasoning.',
    icon: '🔬',
    strengths: ['Scientific method', 'Statistical analysis', 'Research skills', 'Detail orientation'],
    careers: ['Research Scientist', 'Biostatistician', 'Quality Analyst', 'Forensic Analyst', 'Actuary', 'Medical Researcher']
  },

  // Creative traits
  creative_mind: {
    trait: 'Creative Visionary',
    score: 0,
    description: 'You bring imagination and innovation to everything you touch.',
    icon: '🎨',
    strengths: ['Innovation', 'Artistic vision', 'Original thinking', 'Design sense'],
    careers: ['Graphic Designer', 'Art Director', 'Photographer', 'Interior Designer', 'Fashion Designer', 'Film Director']
  },
  creative_soul: {
    trait: 'Artistic Creator',
    score: 0,
    description: 'You express yourself through artistic mediums and creative storytelling.',
    icon: '🎭',
    strengths: ['Artistic expression', 'Creativity', 'Visual storytelling', 'Aesthetic sense'],
    careers: ['Artist', 'Writer', 'Musician', 'Animator', 'Creative Writer', 'Art Therapist']
  },

  // People-focused traits
  people_person: {
    trait: 'People Champion',
    score: 0,
    description: 'You understand people deeply and excel at building meaningful connections.',
    icon: '🤝',
    strengths: ['Empathy', 'Communication', 'Team building', 'Conflict resolution'],
    careers: ['Counselor', 'Teacher', 'Social Worker', 'HR Manager', 'Therapist', 'Coach']
  },
  people_understander: {
    trait: 'Human Behavior Expert',
    score: 0,
    description: 'You have deep insights into how people think, feel, and behave.',
    icon: '🧑‍🤝‍🧑',
    strengths: ['Psychology insight', 'Behavioral analysis', 'Social awareness', 'Emotional intelligence'],
    careers: ['Psychologist', 'Sociologist', 'Market Research Analyst', 'UX Researcher', 'Anthropologist', 'Social Scientist']
  },

  // Leadership traits
  natural_leader: {
    trait: 'Natural Leader',
    score: 0,
    description: 'You inspire others and have a talent for organizing and directing teams.',
    icon: '👑',
    strengths: ['Leadership', 'Strategic thinking', 'Decision making', 'Team motivation'],
    careers: ['CEO', 'Project Manager', 'Consultant', 'Entrepreneur', 'Department Head', 'Team Leader']
  },
  systems_thinker: {
    trait: 'Strategic Systems Thinker',
    score: 0,
    description: 'You see the big picture and understand how complex systems work together.',
    icon: '🏗️',
    strengths: ['Systems thinking', 'Strategic planning', 'Business analysis', 'Process optimization'],
    careers: ['Business Analyst', 'Operations Manager', 'Strategy Consultant', 'Process Engineer', 'Systems Analyst', 'Investment Banker']
  },

  // Practical/hands-on traits
  practical_builder: {
    trait: 'Practical Builder',
    score: 0,
    description: 'You love working with your hands and creating tangible results.',
    icon: '🔨',
    strengths: ['Hands-on skills', 'Practical problem solving', 'Manual dexterity', 'Building/construction'],
    careers: ['Carpenter', 'Electrician', 'Mechanic', 'Architect', 'Civil Engineer', 'Craftsperson']
  },
  thoughtful_analyst: {
    trait: 'Thoughtful Analyst',
    score: 0,
    description: 'You carefully consider multiple perspectives and think deeply about complex issues.',
    icon: '📖',
    strengths: ['Critical analysis', 'Research skills', 'Writing', 'Philosophical thinking'],
    careers: ['Historian', 'Journalist', 'Policy Analyst', 'Academic Researcher', 'Literary Critic', 'Philosopher']
  },
  user_focused_developer: {
    trait: 'User Experience Focus',
    score: 0,
    description: 'You combine technical skills with deep empathy for user needs.',
    icon: '👥',
    strengths: ['User empathy', 'Frontend development', 'Product thinking', 'Design collaboration'],
    careers: ['Frontend Developer', 'Product Manager', 'UX Engineer', 'Full Stack Developer']
  },
  data_detective: {
    trait: 'Data Detective',
    score: 0,
    description: 'You love uncovering hidden stories and insights within complex datasets.',
    icon: '🔍',
    strengths: ['Data analysis', 'Statistical thinking', 'Research skills', 'Business intelligence'],
    careers: ['Data Scientist', 'Business Analyst', 'Research Scientist', 'ML Engineer']
  },
  deep_thinker: {
    trait: 'Deep Thinker',
    score: 0,
    description: 'You thrive in focused environments where you can dive deep into complex problems.',
    icon: '🤔',
    strengths: ['Deep focus', 'Analytical skills', 'Independent work', 'Complex problem solving'],
    careers: ['Researcher', 'Software Architect', 'Academic', 'Technical Writer']
  },
  team_player: {
    trait: 'Collaborative Spirit',
    score: 0,
    description: 'You excel in team environments and bring out the best in others.',
    icon: '🏆',
    strengths: ['Teamwork', 'Communication', 'Project coordination', 'Relationship building'],
    careers: ['Project Manager', 'Scrum Master', 'Team Lead', 'Account Manager']
  },
  hands_on_learner: {
    trait: 'Practical Learner',
    score: 0,
    description: 'You learn best by doing and prefer real-world application over theory.',
    icon: '🛠️',
    strengths: ['Practical application', 'Quick implementation', 'Learning by doing', 'Real-world problem solving'],
    careers: ['Developer', 'Engineer', 'Technician', 'Consultant']
  },
  purpose_driven: {
    trait: 'Purpose-Driven',
    score: 0,
    description: 'You are motivated by making a meaningful impact on the world.',
    icon: '🌟',
    strengths: ['Mission focus', 'Social impact', 'Values alignment', 'Long-term thinking'],
    careers: ['Non-profit Leader', 'Social Entrepreneur', 'Teacher', 'Healthcare Professional']
  }
};

// Calculate personality scores based on quiz answers
export const calculatePersonalityProfile = (answers: AdaptiveQuizAnswer[]): PersonalityInsight[] => {
  const traitScores: Record<string, number> = {};
  
  // Initialize all traits with 0 score
  Object.keys(personalityTraits).forEach(trait => {
    traitScores[trait] = 0;
  });
  
  // Calculate scores based on answers
  answers.forEach(answer => {
    if (answer.personalityTrait && personalityTraits[answer.personalityTrait]) {
      traitScores[answer.personalityTrait] += answer.weight * 10; // Scale to 0-100
    }
  });
  
  // Get top personality traits (score > 0)
  const topTraits = Object.entries(traitScores)
    .filter(([_, score]) => score > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5) // Top 5 traits
    .map(([traitKey, score]) => ({
      ...personalityTraits[traitKey],
      score: Math.min(score, 100) // Cap at 100
    }));
  
  return topTraits;
};

// Generate personality insights based on answer patterns
export const generatePersonalityInsights = (answers: AdaptiveQuizAnswer[]): string[] => {
  const insights: string[] = [];
  const answerValues = answers.map(a => a.value);
  
  // Tech-oriented insights
  if (answerValues.includes('analytical') || answerValues.includes('web_dev') || answerValues.includes('data_science')) {
    insights.push('🔧 You have a strong technical mindset and enjoy solving logical problems');
  }
  
  // Creative insights
  if (answerValues.includes('creative') || answerValues.includes('visual_design') || answerValues.includes('ux_design')) {
    insights.push('🎨 Your creative nature drives you to build beautiful and meaningful experiences');
  }
  
  // People-focused insights
  if (answerValues.includes('empathetic') || answerValues.includes('team_oriented') || answerValues.includes('therapy_counseling')) {
    insights.push('👥 You excel at understanding and connecting with people on a deep level');
  }
  
  // Leadership insights
  if (answerValues.includes('leadership') || answerValues.includes('entrepreneurship') || answerValues.includes('strategic_challenges')) {
    insights.push('👑 You have natural leadership qualities and think strategically about big picture goals');
  }
  
  // Learning style insights
  if (answerValues.includes('practical')) {
    insights.push('🛠️ You prefer hands-on learning and real-world application over theoretical study');
  } else if (answerValues.includes('theoretical')) {
    insights.push('📚 You enjoy deep, research-based learning and theoretical frameworks');
  }
  
  // Work environment insights
  if (answerValues.includes('independent')) {
    insights.push('🧘 You do your best work in quiet, focused environments where you can think deeply');
  } else if (answerValues.includes('team_oriented')) {
    insights.push('🏆 You thrive in collaborative environments and bring out the best in team members');
  }
  
  // Goal-oriented insights
  if (answerValues.includes('impact_focused')) {
    insights.push('🌟 You are driven by making a meaningful difference rather than just personal gain');
  } else if (answerValues.includes('financial_success')) {
    insights.push('💰 You are motivated by financial security and building wealth for your future');
  }
  
  return insights;
};

// Comprehensive career database organized by field
const careersByField = {
  technology: [
    'Software Developer', 'Data Scientist', 'UX Designer', 'Cybersecurity Analyst', 
    'AI Engineer', 'Web Developer', 'Mobile App Developer', 'DevOps Engineer',
    'Product Manager', 'Technical Writer', 'IT Support Specialist', 'Database Administrator'
  ],
  healthcare: [
    'Doctor', 'Nurse', 'Physical Therapist', 'Mental Health Counselor', 'Pharmacist',
    'Medical Researcher', 'Healthcare Administrator', 'Occupational Therapist',
    'Dental Hygienist', 'Medical Technician', 'Speech Pathologist', 'Radiologic Technician'
  ],
  business: [
    'Marketing Manager', 'Financial Analyst', 'Business Consultant', 'Sales Representative',
    'Human Resources Manager', 'Operations Manager', 'Entrepreneur', 'Investment Banker',
    'Real Estate Agent', 'Supply Chain Manager', 'Business Development Manager', 'Accountant'
  ],
  education: [
    'Teacher', 'Professor', 'School Counselor', 'Educational Administrator', 'Librarian',
    'Curriculum Developer', 'Education Researcher', 'Special Education Teacher',
    'Adult Education Instructor', 'Training Specialist', 'Academic Advisor', 'Tutor'
  ],
  arts_media: [
    'Graphic Designer', 'Writer', 'Photographer', 'Musician', 'Actor', 'Film Director',
    'Journalist', 'Art Director', 'Social Media Manager', 'Content Creator',
    'Video Editor', 'Animator', 'Interior Designer', 'Fashion Designer'
  ],
  social_services: [
    'Social Worker', 'Therapist', 'Community Organizer', 'Non-profit Director',
    'Case Manager', 'Substance Abuse Counselor', 'Child Welfare Specialist',
    'Elder Care Coordinator', 'Crisis Intervention Specialist', 'Program Coordinator'
  ],
  science_research: [
    'Research Scientist', 'Lab Technician', 'Environmental Scientist', 'Biologist',
    'Chemist', 'Physicist', 'Anthropologist', 'Sociologist', 'Psychologist',
    'Market Researcher', 'Clinical Research Coordinator', 'Science Writer'
  ],
  trades_crafts: [
    'Electrician', 'Carpenter', 'Plumber', 'Mechanic', 'Welder', 'HVAC Technician',
    'Chef', 'Baker', 'Landscaper', 'Automotive Technician', 'Construction Manager',
    'Craftsperson', 'Jewelry Maker', 'Furniture Maker'
  ],
  legal_government: [
    'Lawyer', 'Paralegal', 'Policy Analyst', 'Government Administrator', 'Judge',
    'Legal Assistant', 'Compliance Officer', 'Legislative Aide', 'Court Reporter',
    'Immigration Officer', 'Public Defender', 'Corporate Counsel'
  ],
  hospitality_tourism: [
    'Hotel Manager', 'Event Planner', 'Travel Agent', 'Restaurant Manager',
    'Tour Guide', 'Cruise Director', 'Wedding Planner', 'Catering Manager',
    'Resort Activities Coordinator', 'Convention Planner', 'Flight Attendant'
  ]
};

// Generate diverse career recommendations based on personality profile and answers
export const generateCareerRecommendations = (personalityProfile: PersonalityInsight[], answers?: any[]): string[] => {
  const recommendations = new Set<string>();
  
  // Get careers from personality traits
  const traitCareers = personalityProfile.flatMap(trait => trait.careers);
  traitCareers.forEach(career => recommendations.add(career));
  
  // Add scenario-specific careers based on quiz answers
  if (answers) {
    const answerValues = answers.map(a => a.value);
    const lifecycleAnswer = answers.find(a => a.questionId === 'student_lifecycle')?.value;
    
    // High school students - focus on entry-level and growth careers
    if (lifecycleAnswer === 'high_school') {
      if (answerValues.includes('stem')) {
        careersByField.technology.slice(0, 3).forEach(career => recommendations.add(career));
        careersByField.science_research.slice(0, 3).forEach(career => recommendations.add(career));
      }
      if (answerValues.includes('humanities')) {
        careersByField.education.slice(0, 3).forEach(career => recommendations.add(career));
        careersByField.arts_media.slice(0, 3).forEach(career => recommendations.add(career));
      }
      if (answerValues.includes('arts')) {
        careersByField.arts_media.slice(0, 4).forEach(career => recommendations.add(career));
      }
      if (answerValues.includes('social_sciences')) {
        careersByField.social_services.slice(0, 3).forEach(career => recommendations.add(career));
        careersByField.healthcare.slice(0, 3).forEach(career => recommendations.add(career));
      }
      if (answerValues.includes('business')) {
        careersByField.business.slice(0, 4).forEach(career => recommendations.add(career));
      }
    }
    
    // College students - focus on internship-friendly careers
    else if (['college_current', 'college_switching'].includes(lifecycleAnswer)) {
      if (answerValues.includes('analytical')) {
        careersByField.technology.slice(0, 4).forEach(career => recommendations.add(career));
        careersByField.business.slice(0, 3).forEach(career => recommendations.add(career));
      }
      if (answerValues.includes('creative')) {
        careersByField.arts_media.slice(0, 4).forEach(career => recommendations.add(career));
      }
      if (answerValues.includes('people_focused')) {
        careersByField.education.slice(0, 3).forEach(career => recommendations.add(career));
        careersByField.social_services.slice(0, 3).forEach(career => recommendations.add(career));
      }
      if (answerValues.includes('leadership')) {
        careersByField.business.slice(0, 4).forEach(career => recommendations.add(career));
      }
    }
    
    // Recent graduates - focus on entry-level opportunities
    else if (lifecycleAnswer === 'recent_graduate') {
      if (answerValues.includes('analytical')) {
        careersByField.technology.slice(0, 3).forEach(career => recommendations.add(career));
        careersByField.science_research.slice(0, 2).forEach(career => recommendations.add(career));
      }
      if (answerValues.includes('creative')) {
        careersByField.arts_media.slice(0, 3).forEach(career => recommendations.add(career));
      }
      if (answerValues.includes('people_focused')) {
        careersByField.healthcare.slice(0, 2).forEach(career => recommendations.add(career));
        careersByField.education.slice(0, 2).forEach(career => recommendations.add(career));
      }
      if (answerValues.includes('leadership')) {
        careersByField.business.slice(0, 3).forEach(career => recommendations.add(career));
      }
    }
    
    // Career changers - focus on transferable skills
    else if (lifecycleAnswer === 'career_changer') {
      if (answerValues.includes('seeking_purpose')) {
        careersByField.social_services.slice(0, 4).forEach(career => recommendations.add(career));
        careersByField.education.slice(0, 3).forEach(career => recommendations.add(career));
      }
      if (answerValues.includes('seeking_growth')) {
        careersByField.technology.slice(0, 4).forEach(career => recommendations.add(career));
        careersByField.business.slice(0, 3).forEach(career => recommendations.add(career));
      }
      if (answerValues.includes('new_interests')) {
        careersByField.arts_media.slice(0, 3).forEach(career => recommendations.add(career));
        careersByField.science_research.slice(0, 2).forEach(career => recommendations.add(career));
      }
    }
    
    // Alternative path explorers - focus on non-traditional careers
    else if (lifecycleAnswer === 'non_college') {
      if (answerValues.includes('practical_skills')) {
        careersByField.trades_crafts.slice(0, 4).forEach(career => recommendations.add(career));
      }
      if (answerValues.includes('entrepreneurship')) {
        ['Entrepreneur', 'Business Owner', 'Freelancer', 'Consultant'].forEach(career => recommendations.add(career));
      }
      if (answerValues.includes('trades')) {
        careersByField.trades_crafts.slice(0, 6).forEach(career => recommendations.add(career));
      }
      if (answerValues.includes('creative_freelance')) {
        careersByField.arts_media.slice(0, 4).forEach(career => recommendations.add(career));
      }
    }
    
    // Add careers based on interests
    if (answerValues.includes('hands_on')) {
      careersByField.trades_crafts.slice(0, 3).forEach(career => recommendations.add(career));
    }
    
    // Work environment based additions
    if (answerValues.includes('collaborative')) {
      careersByField.business.slice(0, 2).forEach(career => recommendations.add(career));
      careersByField.education.slice(0, 2).forEach(career => recommendations.add(career));
    }
    if (answerValues.includes('focused_environment')) {
      careersByField.science_research.slice(0, 2).forEach(career => recommendations.add(career));
      careersByField.technology.slice(0, 2).forEach(career => recommendations.add(career));
    }
  }
  
  // Ensure we have a diverse set of recommendations
  const recommendationsArray = Array.from(recommendations);
  
  // If we don't have enough recommendations, add some from different fields
  if (recommendationsArray.length < 10) {
    const fieldsToSample = [
      careersByField.technology,
      careersByField.healthcare,
      careersByField.business,
      careersByField.education,
      careersByField.arts_media
    ];
    
    fieldsToSample.forEach(field => {
      field.slice(0, 2).forEach(career => {
        if (recommendationsArray.length < 15) {
          recommendations.add(career);
        }
      });
    });
  }
  
  return Array.from(recommendations).slice(0, 12);
};

// Calculate quiz completion insights
export const calculateQuizAnalytics = (answers: AdaptiveQuizAnswer[], startTime: Date): any => {
  const endTime = new Date();
  const timeSpent = Math.round((endTime.getTime() - startTime.getTime()) / 1000); // seconds
  
  const personalityTypes = [...new Set(answers
    .map(a => a.personalityTrait)
    .filter(Boolean))];
  
  const answerValues = answers.map(a => a.value);
  const categories = [];
  
  if (answerValues.some(v => ['analytical', 'web_dev', 'data_science', 'ai_ml'].includes(v))) {
    categories.push('Technology');
  }
  if (answerValues.some(v => ['creative', 'visual_design', 'writing', 'ux_design'].includes(v))) {
    categories.push('Creative');
  }
  if (answerValues.some(v => ['empathetic', 'therapy_counseling', 'education'].includes(v))) {
    categories.push('Social Impact');
  }
  if (answerValues.some(v => ['leadership', 'entrepreneurship', 'business_analytics'].includes(v))) {
    categories.push('Business');
  }
  
  return {
    totalQuestions: answers.length,
    questionsAnswered: answers.length,
    timeSpent,
    personalityTypes,
    topMajorCategories: categories
  };
}; 