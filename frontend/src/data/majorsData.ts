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
  interests: string[]; // Maps to quiz answers
  category: 'tech' | 'business' | 'social' | 'creative';
  educationLevel: '2year' | '4year' | 'masters'; // Required education level
  goals: string[]; // Maps to post-college goals
  jobMarket: JobMarketData;
}

export const majorsData: Major[] = [
  {
    id: 'cs',
    name: 'Computer Science',
    description: 'Learn to solve complex problems through programming and computational thinking',
    hasRoadmap: true,
    category: 'tech',
    educationLevel: '4year',
    goals: ['Make a high income', 'Have job stability'],
    interests: ['Technical and logical problems', 'Independently with computers/technology', 'Math and Science'],
    jobMarket: {
      startingSalary: '$75,000',
      growthRate: '+15% over 10 years',
      annualOpenings: 120000,
      annualGraduates: 65000,
      marketStatus: 'high-demand'
    },
    careers: [
      {
        title: 'Software Engineer',
        description: 'Design and develop software applications and systems',
        averageSalary: '$105,000/year',
        skills: ['Programming', 'Problem Solving', 'System Design', 'Algorithms']
      },
      {
        title: 'Data Scientist',
        description: 'Analyze complex data sets to help guide business decisions',
        averageSalary: '$115,000/year',
        skills: ['Machine Learning', 'Statistics', 'Python', 'Data Analysis']
      }
    ]
  },
  {
    id: 'webdev',
    name: 'Web Development',
    description: 'Learn to create modern web applications and websites',
    hasRoadmap: true,
    category: 'tech',
    educationLevel: '2year',
    goals: ['Make a high income', 'Have job stability'],
    interests: ['Technical and logical problems', 'Independently with computers/technology', 'Creative and artistic projects'],
    jobMarket: {
      startingSalary: '$65,000',
      growthRate: '+13% over 10 years',
      annualOpenings: 90000,
      annualGraduates: 45000,
      marketStatus: 'high-demand'
    },
    careers: [
      {
        title: 'Frontend Developer',
        description: 'Create user interfaces and interactive web experiences',
        averageSalary: '$85,000/year',
        skills: ['JavaScript', 'React', 'HTML/CSS', 'UI/UX']
      },
      {
        title: 'Full Stack Developer',
        description: 'Build both frontend and backend of web applications',
        averageSalary: '$95,000/year',
        skills: ['JavaScript', 'Node.js', 'Databases', 'API Development']
      }
    ]
  },
  {
    id: 'business',
    name: 'Business Administration',
    description: 'Develop skills in management, finance, and organizational leadership',
    hasRoadmap: true,
    category: 'business',
    educationLevel: '4year',
    goals: ['Make a high income', 'Have job stability'],
    interests: ['Business and organizational challenges', 'In teams leading projects', 'Business and Economics'],
    jobMarket: {
      startingSalary: '$55,000',
      growthRate: '+5% over 10 years',
      annualOpenings: 200000,
      annualGraduates: 380000,
      marketStatus: 'competitive'
    },
    careers: [
      {
        title: 'Business Analyst',
        description: 'Analyze business processes and recommend improvements',
        averageSalary: '$85,000/year',
        skills: ['Analysis', 'Project Management', 'Communication', 'Problem Solving']
      },
      {
        title: 'Management Consultant',
        description: 'Help organizations improve their performance',
        averageSalary: '$95,000/year',
        skills: ['Strategy', 'Leadership', 'Problem Solving', 'Communication']
      }
    ]
  },
  {
    id: 'psych',
    name: 'Psychology',
    description: 'Study human behavior and mental processes to help improve lives',
    hasRoadmap: true,
    category: 'social',
    educationLevel: 'masters',
    goals: ['Make a difference/help others'],
    interests: ['Understanding and helping people', 'One-on-one with people', 'Psychology and Social Sciences'],
    jobMarket: {
      startingSalary: '$45,000',
      growthRate: '+3% over 10 years',
      annualOpenings: 45000,
      annualGraduates: 120000,
      marketStatus: 'oversaturated'
    },
    careers: [
      {
        title: 'Clinical Psychologist',
        description: 'Help individuals overcome emotional and behavioral challenges',
        averageSalary: '$82,000/year',
        skills: ['Counseling', 'Assessment', 'Communication', 'Empathy']
      },
      {
        title: 'Research Psychologist',
        description: 'Study human behavior and cognitive processes',
        averageSalary: '$76,000/year',
        skills: ['Research Methods', 'Data Analysis', 'Critical Thinking', 'Scientific Writing']
      }
    ]
  },
  {
    id: 'design',
    name: 'Graphic Design',
    description: 'Create visual content that communicates ideas and messages effectively',
    hasRoadmap: true,
    category: 'creative',
    educationLevel: '4year',
    goals: ['Be creative', 'Have job stability'],
    interests: ['Creative and artistic projects', 'In creative collaborative environments', 'Arts and Humanities'],
    jobMarket: {
      startingSalary: '$48,000',
      growthRate: '+4% over 10 years',
      annualOpenings: 25000,
      annualGraduates: 35000,
      marketStatus: 'competitive'
    },
    careers: [
      {
        title: 'UI/UX Designer',
        description: 'Design user interfaces and experiences for digital products',
        averageSalary: '$85,000/year',
        skills: ['Visual Design', 'User Research', 'Prototyping', 'Adobe Creative Suite']
      },
      {
        title: 'Brand Designer',
        description: 'Create visual identities and branding materials for companies',
        averageSalary: '$75,000/year',
        skills: ['Typography', 'Color Theory', 'Brand Strategy', 'Adobe Creative Suite']
      }
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Develop strategies to promote products and services to target audiences',
    hasRoadmap: true,
    category: 'business',
    educationLevel: '4year',
    goals: ['Make a high income', 'Be creative'],
    interests: ['Business and organizational challenges', 'In creative collaborative environments', 'Business and Economics'],
    jobMarket: {
      startingSalary: '$60,000',
      growthRate: '+8% over 10 years',
      annualOpenings: 150000,
      annualGraduates: 200000,
      marketStatus: 'competitive'
    },
    careers: [
      {
        title: 'Digital Marketing Manager',
        description: 'Plan and execute online marketing campaigns',
        averageSalary: '$80,000/year',
        skills: ['Social Media', 'Analytics', 'Content Strategy', 'SEO']
      },
      {
        title: 'Brand Manager',
        description: 'Develop and maintain brand strategy and positioning',
        averageSalary: '$90,000/year',
        skills: ['Brand Strategy', 'Market Research', 'Project Management', 'Communication']
      }
    ]
  },
  {
    id: 'socialwork',
    name: 'Social Work',
    description: 'Help individuals and communities overcome challenges and improve their lives',
    hasRoadmap: true,
    category: 'social',
    educationLevel: 'masters',
    goals: ['Make a difference/help others'],
    interests: ['Understanding and helping people', 'One-on-one with people', 'Psychology and Social Sciences'],
    jobMarket: {
      startingSalary: '$50,000',
      growthRate: '+6% over 10 years',
      annualOpenings: 50000,
      annualGraduates: 70000,
      marketStatus: 'competitive'
    },
    careers: [
      {
        title: 'Clinical Social Worker',
        description: 'Provide therapy and support services to individuals and families',
        averageSalary: '$60,000/year',
        skills: ['Counseling', 'Case Management', 'Crisis Intervention', 'Empathy']
      },
      {
        title: 'Community Social Worker',
        description: 'Develop and implement community programs and services',
        averageSalary: '$55,000/year',
        skills: ['Program Development', 'Community Outreach', 'Grant Writing', 'Advocacy']
      }
    ]
  },
  {
    id: 'datasci',
    name: 'Data Science',
    description: 'Apply statistical and computational methods to extract insights from data',
    hasRoadmap: true,
    category: 'tech',
    educationLevel: 'masters',
    goals: ['Make a high income', 'Have job stability'],
    interests: ['Technical and logical problems', 'Independently with computers/technology', 'Math and Science'],
    jobMarket: {
      startingSalary: '$100,000',
      growthRate: '+10% over 10 years',
      annualOpenings: 80000,
      annualGraduates: 40000,
      marketStatus: 'high-demand'
    },
    careers: [
      {
        title: 'Data Scientist',
        description: 'Analyze complex datasets to solve business problems',
        averageSalary: '$120,000/year',
        skills: ['Machine Learning', 'Statistics', 'Python', 'Big Data']
      },
      {
        title: 'Data Analyst',
        description: 'Transform data into actionable insights',
        averageSalary: '$85,000/year',
        skills: ['SQL', 'Data Visualization', 'Statistical Analysis', 'Excel']
      }
    ]
  },
  {
    id: 'multimedia',
    name: 'Multimedia Arts',
    description: 'Create engaging digital content across various media platforms',
    hasRoadmap: true,
    category: 'creative',
    educationLevel: '4year',
    goals: ['Be creative', 'Have job stability'],
    interests: ['Creative and artistic projects', 'In creative collaborative environments', 'Arts and Humanities'],
    jobMarket: {
      startingSalary: '$55,000',
      growthRate: '+7% over 10 years',
      annualOpenings: 30000,
      annualGraduates: 40000,
      marketStatus: 'competitive'
    },
    careers: [
      {
        title: 'Motion Graphics Designer',
        description: 'Create animated graphics and visual effects',
        averageSalary: '$70,000/year',
        skills: ['After Effects', 'Animation', '3D Modeling', 'Video Editing']
      },
      {
        title: 'Digital Content Creator',
        description: 'Produce engaging multimedia content for various platforms',
        averageSalary: '$65,000/year',
        skills: ['Video Production', 'Photography', 'Social Media', 'Storytelling']
      }
    ]
  },
  {
    id: 'it-support',
    name: 'IT Support',
    description: 'Learn to manage and troubleshoot computer systems and networks',
    hasRoadmap: true,
    category: 'tech',
    educationLevel: '2year',
    goals: ['Make a high income', 'Have job stability'],
    interests: ['Technical and logical problems', 'Independently with computers/technology', 'Math and Science'],
    jobMarket: {
      startingSalary: '$45,000',
      growthRate: '+8% over 10 years',
      annualOpenings: 65000,
      annualGraduates: 35000,
      marketStatus: 'high-demand'
    },
    careers: [
      {
        title: 'IT Support Specialist',
        description: 'Provide technical support and troubleshooting for computer systems',
        averageSalary: '$52,000/year',
        skills: ['Troubleshooting', 'Network Support', 'Customer Service', 'System Administration']
      },
      {
        title: 'Help Desk Technician',
        description: 'Assist users with technical issues and maintain computer systems',
        averageSalary: '$45,000/year',
        skills: ['Technical Support', 'Problem Solving', 'Communication', 'Hardware/Software']
      }
    ]
  },
  {
    id: 'dental-hygiene',
    name: 'Dental Hygiene',
    description: 'Provide preventive dental care and educate patients about oral health',
    hasRoadmap: true,
    category: 'social',
    educationLevel: '2year',
    goals: ['Make a high income', 'Make a difference/help others'],
    interests: ['Understanding and helping people', 'One-on-one with people', 'Math and Science'],
    jobMarket: {
      startingSalary: '$70,000',
      growthRate: '+9% over 10 years',
      annualOpenings: 18000,
      annualGraduates: 8000,
      marketStatus: 'high-demand'
    },
    careers: [
      {
        title: 'Dental Hygienist',
        description: 'Clean teeth and examine patients for oral diseases',
        averageSalary: '$77,000/year',
        skills: ['Dental Care', 'Patient Education', 'Clinical Skills', 'Communication']
      }
    ]
  },
  {
    id: 'medical-assistant',
    name: 'Medical Assisting',
    description: 'Support healthcare providers and assist with patient care',
    hasRoadmap: true,
    category: 'social',
    educationLevel: '2year',
    goals: ['Make a difference/help others', 'Have job stability'],
    interests: ['Understanding and helping people', 'One-on-one with people', 'Math and Science'],
    jobMarket: {
      startingSalary: '$35,000',
      growthRate: '+16% over 10 years',
      annualOpenings: 100000,
      annualGraduates: 45000,
      marketStatus: 'high-demand'
    },
    careers: [
      {
        title: 'Medical Assistant',
        description: 'Perform clinical and administrative duties in healthcare settings',
        averageSalary: '$38,000/year',
        skills: ['Patient Care', 'Medical Records', 'Clinical Procedures', 'Administrative Skills']
      }
    ]
  },
  {
    id: 'clinical-psych',
    name: 'Clinical Psychology',
    description: 'Diagnose and treat mental, emotional, and behavioral disorders',
    hasRoadmap: true,
    category: 'social',
    educationLevel: 'masters',
    goals: ['Make a difference/help others'],
    interests: ['Understanding and helping people', 'One-on-one with people', 'Psychology and Social Sciences'],
    jobMarket: {
      startingSalary: '$65,000',
      growthRate: '+6% over 10 years',
      annualOpenings: 25000,
      annualGraduates: 20000,
      marketStatus: 'competitive'
    },
    careers: [
      {
        title: 'Clinical Psychologist',
        description: 'Provide therapy and mental health treatment',
        averageSalary: '$85,000/year',
        skills: ['Psychotherapy', 'Assessment', 'Diagnosis', 'Treatment Planning']
      }
    ]
  },
  {
    id: 'professor',
    name: 'University Professor',
    description: 'Teach and conduct research at the college level',
    hasRoadmap: true,
    category: 'social',
    educationLevel: 'masters',
    goals: ['Make a difference/help others', 'Be creative'],
    interests: ['Understanding and helping people', 'In teams leading projects', 'Psychology and Social Sciences'],
    jobMarket: {
      startingSalary: '$60,000',
      growthRate: '+2% over 10 years',
      annualOpenings: 15000,
      annualGraduates: 25000,
      marketStatus: 'oversaturated'
    },
    careers: [
      {
        title: 'Professor',
        description: 'Teach courses and conduct academic research',
        averageSalary: '$80,000/year',
        skills: ['Teaching', 'Research', 'Publishing', 'Grant Writing']
      }
    ]
  }
]; 