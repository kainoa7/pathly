import type { QuizQuestion } from '../types/quizTypes';

// High School Questions - Focused on exploration and interest discovery
export const highSchoolQuestions: QuizQuestion[] = [
  {
    id: 'hs1',
    question: 'Which high school subjects genuinely interest you? 📚',
    type: 'interest',
    options: [
      { text: 'Math, Science, Computer Programming', value: 'stem', weight: 1 },
      { text: 'Art, Music, Creative Writing', value: 'creative', weight: 1 },
      { text: 'History, Psychology, English', value: 'humanities', weight: 1 },
      { text: 'Business, Economics, Leadership', value: 'business', weight: 1 }
    ]
  },
  {
    id: 'hs2',
    question: 'What do you do when you have free time after school? 🎮',
    type: 'interest',
    options: [
      { text: 'Code, play video games, or tinker with tech', value: 'tech', weight: 1 },
      { text: 'Draw, make music, or create content', value: 'creative', weight: 1 },
      { text: 'Read, write, or research topics I\'m curious about', value: 'analytical', weight: 1 },
      { text: 'Hang out with friends or help others', value: 'social', weight: 1 }
    ]
  },
  {
    id: 'hs3',
    question: 'Which extracurricular activities sound most appealing? 🏫',
    type: 'interest',
    options: [
      { text: 'Robotics Club, Coding Bootcamp, Science Fair', value: 'tech_activities', weight: 1 },
      { text: 'Drama Club, Art Club, School Newspaper', value: 'creative_activities', weight: 1 },
      { text: 'Debate Team, Model UN, Academic Decathlon', value: 'academic_activities', weight: 1 },
      { text: 'Student Council, Volunteer Work, Peer Tutoring', value: 'leadership_activities', weight: 1 }
    ]
  },
  {
    id: 'hs4',
    question: 'When you imagine your ideal college experience, what excites you most? 🎓',
    type: 'goals',
    options: [
      { text: 'Learning cutting-edge technology and innovation', value: 'innovation', weight: 1 },
      { text: 'Exploring creative expression and artistic skills', value: 'artistic', weight: 1 },
      { text: 'Deep thinking and intellectual discussions', value: 'intellectual', weight: 1 },
      { text: 'Building networks and leadership opportunities', value: 'networking', weight: 1 }
    ]
  },
  {
    id: 'hs5',
    question: 'How do you handle challenging problems or projects? 🤔',
    type: 'work_style',
    options: [
      { text: 'Break it down step-by-step with logical thinking', value: 'analytical', weight: 1 },
      { text: 'Get creative and think outside the box', value: 'creative_problem', weight: 1 },
      { text: 'Research thoroughly and gather all the facts', value: 'research_oriented', weight: 1 },
      { text: 'Collaborate with others and get different perspectives', value: 'collaborative', weight: 1 }
    ]
  }
];

// College Questions - Focused on major selection and career preparation
export const collegeQuestions: QuizQuestion[] = [
  {
    id: 'col1',
    question: 'Which college courses have you enjoyed most so far? 📖',
    type: 'interest',
    options: [
      { text: 'STEM courses (Math, Science, Engineering)', value: 'stem_courses', weight: 1 },
      { text: 'Creative courses (Art, Design, Media)', value: 'creative_courses', weight: 1 },
      { text: 'Liberal Arts (Literature, Philosophy, History)', value: 'liberal_arts', weight: 1 },
      { text: 'Business/Social courses (Economics, Psychology)', value: 'business_social', weight: 1 }
    ]
  },
  {
    id: 'col2',
    question: 'What type of internship or job would excite you most? 💼',
    type: 'career',
    options: [
      { text: 'Tech company or startup environment', value: 'tech_internship', weight: 1 },
      { text: 'Creative agency or media company', value: 'creative_internship', weight: 1 },
      { text: 'Research lab or academic institution', value: 'research_internship', weight: 1 },
      { text: 'Corporate office or consulting firm', value: 'business_internship', weight: 1 }
    ]
  },
  {
    id: 'col3',
    question: 'When working on group projects, what role do you naturally take? 👥',
    type: 'work_style',
    options: [
      { text: 'Technical lead - handling the complex problem-solving', value: 'technical_lead', weight: 1 },
      { text: 'Creative director - bringing innovative ideas', value: 'creative_lead', weight: 1 },
      { text: 'Project manager - organizing and coordinating', value: 'project_manager', weight: 1 },
      { text: 'Researcher - gathering information and analyzing', value: 'researcher', weight: 1 }
    ]
  },
  {
    id: 'col4',
    question: 'What motivates you most about your future career? 🎯',
    type: 'motivation',
    options: [
      { text: 'Building innovative solutions to real problems', value: 'innovation_driven', weight: 1 },
      { text: 'Expressing creativity and making beautiful things', value: 'creativity_driven', weight: 1 },
      { text: 'Making a positive impact on society', value: 'impact_driven', weight: 1 },
      { text: 'Financial success and career advancement', value: 'success_driven', weight: 1 }
    ]
  },
  {
    id: 'col5',
    question: 'Which work environment would help you thrive? 🏢',
    type: 'environment',
    options: [
      { text: 'Fast-paced tech environment with latest tools', value: 'tech_environment', weight: 1 },
      { text: 'Creative studio with artistic freedom', value: 'creative_environment', weight: 1 },
      { text: 'Structured corporate setting with clear goals', value: 'corporate_environment', weight: 1 },
      { text: 'Flexible remote work with autonomy', value: 'flexible_environment', weight: 1 }
    ]
  }
];

// Graduated (Gap Year) Questions - Focused on practical next steps
export const graduatedQuestions: QuizQuestion[] = [
  {
    id: 'grad1',
    question: 'What\'s been your biggest interest since graduating? 🌟',
    type: 'interest',
    options: [
      { text: 'Learning tech skills and online courses', value: 'self_taught_tech', weight: 1 },
      { text: 'Pursuing creative projects and hobbies', value: 'creative_pursuits', weight: 1 },
      { text: 'Working and gaining real-world experience', value: 'work_experience', weight: 1 },
      { text: 'Traveling and exploring different cultures', value: 'exploration', weight: 1 }
    ]
  },
  {
    id: 'grad2',
    question: 'What\'s your main concern about choosing a college major? 😰',
    type: 'concerns',
    options: [
      { text: 'Will it lead to good job opportunities?', value: 'job_security', weight: 1 },
      { text: 'Will I actually enjoy the coursework?', value: 'enjoyment', weight: 1 },
      { text: 'Is it worth the time and money investment?', value: 'roi_concerns', weight: 1 },
      { text: 'Will I be able to handle the difficulty?', value: 'difficulty_concerns', weight: 1 }
    ]
  },
  {
    id: 'grad3',
    question: 'If you started college tomorrow, what would you want to focus on? 🎯',
    type: 'priorities',
    options: [
      { text: 'Getting practical skills for immediate job market', value: 'practical_skills', weight: 1 },
      { text: 'Exploring my passions and interests deeply', value: 'passion_exploration', weight: 1 },
      { text: 'Building a strong network and connections', value: 'networking_focus', weight: 1 },
      { text: 'Getting the degree as efficiently as possible', value: 'efficiency_focus', weight: 1 }
    ]
  },
  {
    id: 'grad4',
    question: 'What type of learning style works best for you? 📚',
    type: 'learning',
    options: [
      { text: 'Hands-on projects and real applications', value: 'hands_on', weight: 1 },
      { text: 'Creative exploration and experimentation', value: 'creative_learning', weight: 1 },
      { text: 'Structured curriculum and clear milestones', value: 'structured_learning', weight: 1 },
      { text: 'Self-paced online learning and flexibility', value: 'flexible_learning', weight: 1 }
    ]
  },
  {
    id: 'grad5',
    question: 'What would make you feel most confident about your major choice? ✅',
    type: 'validation',
    options: [
      { text: 'Seeing clear career paths and salary data', value: 'data_driven', weight: 1 },
      { text: 'Talking to people who love their work in that field', value: 'peer_validation', weight: 1 },
      { text: 'Trying out courses or projects in that area first', value: 'experience_driven', weight: 1 },
      { text: 'Understanding how it aligns with my personality', value: 'personality_fit', weight: 1 }
    ]
  }
];

// Legacy export for backward compatibility
export const quizQuestions: QuizQuestion[] = highSchoolQuestions; 