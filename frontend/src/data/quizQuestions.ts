import type { QuizQuestion } from '../types/quizTypes';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What subjects interest you most in school? 📚',
    type: 'interest',
    options: [
      { text: 'Math and Computer Science', value: 'stem', weight: 1 },
      { text: 'Art and Design', value: 'art', weight: 1 },
      { text: 'Business and Economics', value: 'business', weight: 1 },
      { text: 'Social Sciences', value: 'social', weight: 1 }
    ]
  },
  {
    id: 'q2',
    question: 'What do you enjoy doing in your free time? 🎮',
    type: 'interest',
    options: [
      { text: 'Playing video games or coding', value: 'tech', weight: 1 },
      { text: 'Creating art or music', value: 'creative', weight: 1 },
      { text: 'Reading or writing', value: 'literary', weight: 1 },
      { text: 'Helping or teaching others', value: 'helping', weight: 1 }
    ]
  },
  {
    id: 'q3',
    question: 'Which school clubs interest you most? 🏫',
    type: 'interest',
    options: [
      { text: 'Robotics or Computer Club', value: 'tech_club', weight: 1 },
      { text: 'Art Club or Theater', value: 'art_club', weight: 1 },
      { text: 'Student Government', value: 'leadership', weight: 1 },
      { text: 'Volunteer Club', value: 'service', weight: 1 }
    ]
  },
  {
    id: 'q4',
    question: 'How do you prefer to learn new things? 📖',
    type: 'learning',
    options: [
      { text: 'Hands-on practice', value: 'practical', weight: 1 },
      { text: 'Reading and research', value: 'theoretical', weight: 1 },
      { text: 'Group discussions', value: 'collaborative', weight: 1 },
      { text: 'Visual demonstrations', value: 'visual', weight: 1 }
    ]
  },
  {
    id: 'q5',
    question: 'What type of problems do you enjoy solving? 🤔',
    type: 'interest',
    options: [
      { text: 'Technical and logical puzzles', value: 'technical', weight: 1 },
      { text: 'Creative challenges', value: 'creative_problems', weight: 1 },
      { text: 'People and social issues', value: 'social_problems', weight: 1 },
      { text: 'Business and strategy', value: 'business_problems', weight: 1 }
    ]
  },
  {
    id: 'q6',
    question: 'What role do you usually take in group projects? 👥',
    type: 'work_style',
    options: [
      { text: 'Leader and organizer', value: 'leader', weight: 1 },
      { text: 'Creative contributor', value: 'creative_role', weight: 1 },
      { text: 'Technical specialist', value: 'technical_role', weight: 1 },
      { text: 'Researcher', value: 'research_role', weight: 1 }
    ]
  },
  {
    id: 'q7',
    question: 'What kind of work environment appeals to you? 🏢',
    type: 'environment',
    options: [
      { text: 'Tech startup or company', value: 'tech_company', weight: 1 },
      { text: 'Creative studio', value: 'creative_studio', weight: 1 },
      { text: 'Traditional office', value: 'office', weight: 1 },
      { text: 'Community or educational setting', value: 'community', weight: 1 }
    ]
  },
  {
    id: 'q8',
    question: 'What\'s most important to you in a future career? 💼',
    type: 'goals',
    options: [
      { text: 'High income potential', value: 'income', weight: 1 },
      { text: 'Creative freedom', value: 'creativity', weight: 1 },
      { text: 'Helping others', value: 'impact', weight: 1 },
      { text: 'Work-life balance', value: 'balance', weight: 1 }
    ]
  },
  {
    id: 'q9',
    question: 'What type of projects excite you most? 🚀',
    type: 'interest',
    options: [
      { text: 'Building new technologies', value: 'tech_projects', weight: 1 },
      { text: 'Creating art or media', value: 'art_projects', weight: 1 },
      { text: 'Organizing events', value: 'event_projects', weight: 1 },
      { text: 'Research projects', value: 'research_projects', weight: 1 }
    ]
  },
  {
    id: 'q10',
    question: 'How do you like to express yourself? 🎨',
    type: 'expression',
    options: [
      { text: 'Through technology', value: 'tech_expression', weight: 1 },
      { text: 'Through art or design', value: 'art_expression', weight: 1 },
      { text: 'Through writing', value: 'writing_expression', weight: 1 },
      { text: 'Through speaking', value: 'verbal_expression', weight: 1 }
    ]
  },
  {
    id: 'q11',
    question: 'What skills would you like to develop? 🌱',
    type: 'skills',
    options: [
      { text: 'Technical and programming', value: 'tech_skills', weight: 1 },
      { text: 'Creative and artistic', value: 'art_skills', weight: 1 },
      { text: 'Leadership and management', value: 'leadership_skills', weight: 1 },
      { text: 'Communication and people skills', value: 'people_skills', weight: 1 }
    ]
  },
  {
    id: 'q12',
    question: 'What type of challenges motivate you? 💪',
    type: 'motivation',
    options: [
      { text: 'Solving complex problems', value: 'problem_solving', weight: 1 },
      { text: 'Creating something new', value: 'creation', weight: 1 },
      { text: 'Leading teams', value: 'leadership', weight: 1 },
      { text: 'Helping people overcome difficulties', value: 'helping', weight: 1 }
    ]
  },
  {
    id: 'q13',
    question: 'What kind of impact do you want to make? 🌍',
    type: 'impact',
    options: [
      { text: 'Technological innovation', value: 'tech_impact', weight: 1 },
      { text: 'Cultural or artistic', value: 'cultural_impact', weight: 1 },
      { text: 'Social change', value: 'social_impact', weight: 1 },
      { text: 'Economic development', value: 'economic_impact', weight: 1 }
    ]
  },
  {
    id: 'q14',
    question: 'How do you approach learning new skills? 📝',
    type: 'learning',
    options: [
      { text: 'Structured and systematic', value: 'structured', weight: 1 },
      { text: 'Creative and experimental', value: 'experimental', weight: 1 },
      { text: 'Social and collaborative', value: 'collaborative', weight: 1 },
      { text: 'Independent research', value: 'independent', weight: 1 }
    ]
  },
  {
    id: 'q15',
    question: 'What type of tools do you enjoy using? 🛠️',
    type: 'tools',
    options: [
      { text: 'Digital and technical', value: 'digital_tools', weight: 1 },
      { text: 'Creative and artistic', value: 'creative_tools', weight: 1 },
      { text: 'Communication tools', value: 'communication_tools', weight: 1 },
      { text: 'Analytical tools', value: 'analytical_tools', weight: 1 }
    ]
  },
  {
    id: 'q16',
    question: 'What interests you about college? 🎓',
    type: 'education',
    options: [
      { text: 'Learning advanced skills', value: 'skills', weight: 1 },
      { text: 'Creative opportunities', value: 'opportunities', weight: 1 },
      { text: 'Meeting new people', value: 'networking', weight: 1 },
      { text: 'Research possibilities', value: 'research', weight: 1 }
    ]
  },
  {
    id: 'q17',
    question: 'How do you prefer to work? 💻',
    type: 'work_style',
    options: [
      { text: 'Independently on focused tasks', value: 'independent', weight: 1 },
      { text: 'Collaboratively in teams', value: 'team', weight: 1 },
      { text: 'Mix of both', value: 'flexible', weight: 1 },
      { text: 'Leading projects', value: 'leadership', weight: 1 }
    ]
  },
  {
    id: 'q18',
    question: 'What type of recognition motivates you? 🏆',
    type: 'motivation',
    options: [
      { text: 'Technical achievements', value: 'technical_recognition', weight: 1 },
      { text: 'Creative accomplishments', value: 'creative_recognition', weight: 1 },
      { text: 'Leadership success', value: 'leadership_recognition', weight: 1 },
      { text: 'Making a difference', value: 'impact_recognition', weight: 1 }
    ]
  },
  {
    id: 'q19',
    question: 'How many years of college interests you? 📚',
    type: 'education',
    options: [
      { text: '2 years (Associate\'s)', value: '2year', weight: 1 },
      { text: '4 years (Bachelor\'s)', value: '4year', weight: 1 },
      { text: '6+ years (Master\'s/PhD)', value: 'graduate', weight: 1 },
      { text: 'Not sure yet', value: 'undecided', weight: 1 }
    ]
  },
  {
    id: 'q20',
    question: 'What\'s your ideal work location? 🌆',
    type: 'environment',
    options: [
      { text: 'Big tech hub city', value: 'tech_city', weight: 1 },
      { text: 'Creative urban center', value: 'creative_city', weight: 1 },
      { text: 'Traditional business district', value: 'business_district', weight: 1 },
      { text: 'Community-focused setting', value: 'community_setting', weight: 1 }
    ]
  }
]; 