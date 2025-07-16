interface CareerPath {
  role: string;
  company: string;
  match: number;
  salary: string;
  logo: string;
  requiredSkills: string[];
  majorPaths: string[];
  description: string;
}

interface RoadmapStep {
  title: string;
  duration: string;
  description: string;
  skills: string[];
  resources: string[];
}

// Career paths with detailed information
export const careerPaths: Record<string, CareerPath> = {
  techBuilder: {
    role: "Software Engineer",
    company: "Google",
    match: 95,
    salary: "$150K+",
    logo: "/company-logos/google.svg",
    requiredSkills: ["Programming", "Problem Solving", "System Design", "Algorithms"],
    majorPaths: ["Computer Science", "Software Engineering", "Computer Engineering"],
    description: "Build and maintain Google's core products and infrastructure."
  },
  dataAnalyst: {
    role: "Data Scientist",
    company: "Tesla",
    match: 88,
    salary: "$130K+",
    logo: "/company-logos/tesla.svg",
    requiredSkills: ["Statistics", "Machine Learning", "Python", "Data Analysis"],
    majorPaths: ["Data Science", "Statistics", "Applied Mathematics"],
    description: "Drive Tesla's autonomous vehicle development through data analysis."
  },
  productManager: {
    role: "Product Manager",
    company: "Microsoft",
    match: 92,
    salary: "$140K+",
    logo: "/company-logos/microsoft.svg",
    requiredSkills: ["Strategy", "User Experience", "Market Analysis", "Leadership"],
    majorPaths: ["Business Administration", "Computer Science", "Product Design"],
    description: "Lead product development for Microsoft's cloud services."
  },
  designInnovator: {
    role: "UX Designer",
    company: "Apple",
    match: 90,
    salary: "$125K+",
    logo: "/company-logos/apple.svg",
    requiredSkills: ["UI Design", "User Research", "Prototyping", "Visual Design"],
    majorPaths: ["Interaction Design", "Digital Media", "Human-Computer Interaction"],
    description: "Create intuitive and beautiful experiences for Apple products."
  }
};

// Sample roadmap steps for each career path
export const careerRoadmaps: Record<string, RoadmapStep[]> = {
  techBuilder: [
    {
      title: "Foundation Building",
      duration: "Year 1",
      description: "Master programming fundamentals and computer science basics",
      skills: ["Python", "Java", "Data Structures"],
      resources: ["CS50", "LeetCode", "CodeAcademy"]
    },
    {
      title: "Specialization",
      duration: "Year 2",
      description: "Focus on web development and system design",
      skills: ["React", "Node.js", "Databases"],
      resources: ["Frontend Masters", "System Design Primer"]
    },
    {
      title: "Professional Growth",
      duration: "Year 3+",
      description: "Build real-world projects and prepare for tech interviews",
      skills: ["System Architecture", "Tech Leadership"],
      resources: ["GitHub Projects", "Tech Interview Handbook"]
    }
  ],
  dataAnalyst: [
    {
      title: "Data Foundations",
      duration: "Year 1",
      description: "Learn statistics and data analysis basics",
      skills: ["Statistics", "Python", "SQL"],
      resources: ["Khan Academy", "DataCamp"]
    },
    {
      title: "Advanced Analytics",
      duration: "Year 2",
      description: "Master machine learning and big data tools",
      skills: ["Machine Learning", "Big Data", "Deep Learning"],
      resources: ["Coursera ML", "Fast.ai"]
    },
    {
      title: "Industry Application",
      duration: "Year 3+",
      description: "Apply skills to real-world data problems",
      skills: ["Data Engineering", "MLOps"],
      resources: ["Kaggle", "Cloud Certifications"]
    }
  ]
};

// Function to match career paths based on answers
export const matchCareerPaths = (answers: string[]): string[] => {
  const matches: Record<string, number> = {
    techBuilder: 0,
    dataAnalyst: 0,
    productManager: 0,
    designInnovator: 0
  };

  // Question 1: Interests
  if (answers[0] === "Building and creating things") {
    matches.techBuilder += 2;
    matches.designInnovator += 1;
  } else if (answers[0] === "Analyzing data and solving problems") {
    matches.dataAnalyst += 2;
    matches.techBuilder += 1;
  } else if (answers[0] === "Working with and helping people") {
    matches.productManager += 2;
    matches.designInnovator += 1;
  } else if (answers[0] === "Leading and organizing projects") {
    matches.productManager += 2;
    matches.techBuilder += 1;
  }

  // Question 2: Role preferences
  if (answers[1] === "The creative problem solver") {
    matches.techBuilder += 2;
    matches.designInnovator += 1;
  } else if (answers[1] === "The detailed planner") {
    matches.dataAnalyst += 2;
    matches.productManager += 1;
  } else if (answers[1] === "The team motivator") {
    matches.productManager += 2;
    matches.designInnovator += 1;
  } else if (answers[1] === "The project coordinator") {
    matches.productManager += 2;
    matches.techBuilder += 1;
  }

  // Question 3: Work environment
  if (answers[2] === "Fast-paced startup") {
    matches.techBuilder += 1;
    matches.productManager += 1;
  } else if (answers[2] === "Established tech company") {
    matches.dataAnalyst += 1;
    matches.techBuilder += 1;
  } else if (answers[2] === "Creative agency") {
    matches.designInnovator += 2;
    matches.productManager += 1;
  } else if (answers[2] === "Research institution") {
    matches.dataAnalyst += 2;
    matches.techBuilder += 1;
  }

  // Sort matches by score and return top paths
  return Object.entries(matches)
    .sort(([, a], [, b]) => b - a)
    .map(([path]) => path)
    .slice(0, 3);
}; 