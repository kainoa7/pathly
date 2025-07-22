// Landing Page Data Constants
export const FLOATING_MESSAGES = [
  { text: "Just got into Stanford CS!", icon: "🎓" },
  { text: "Tesla internship secured!", icon: "⚡" },
  { text: "96% ATS score achieved!", icon: "📈" },
  { text: "Meta interview scheduled!", icon: "💼" },
  { text: "Salary negotiated to $125k!", icon: "💰" },
  { text: "Google SWE offer received!", icon: "🚀" },
  { text: "Dream job at Netflix!", icon: "🎬" },
  { text: "Microsoft PM role landed!", icon: "💻" },
  { text: "Startup equity offer!", icon: "🌟" },
  { text: "Remote work approved!", icon: "🏠" }
];

export const FLOATING_POSITIONS = [
  { top: "15%", left: "10%" },
  { top: "25%", left: "85%" },
  { top: "45%", left: "15%" },
  { top: "60%", left: "80%" },
  { top: "75%", left: "20%" },
];

export const TYPEWRITER_TEXTS = [
  "Watch live as students land their dream jobs with JARVUS AI",
  "See real-time salary trends and career opportunities", 
  "Join the AI-powered career revolution happening right now"
];

export const INITIAL_STATS = {
  activeUsers: 1247,
  careersMatched: 8956,
  companiesPartners: 234,
  successRate: 94
};

export const LIVE_INSIGHTS = [
  {
    title: "AI Engineer roles up 156% this month",
    icon: "🚀",
    trend: "hot" as const,
    timestamp: "2 mins ago"
  },
  {
    title: "Remote positions reach all-time high",
    icon: "🏠", 
    trend: "rising" as const,
    timestamp: "5 mins ago"
  },
  {
    title: "Tech salary negotiations hitting $180k avg",
    icon: "💰",
    trend: "hot" as const,
    timestamp: "8 mins ago"
  }
];

export const QUICK_ACTIONS = [
  {
    title: "Take Career Quiz",
    description: "Discover your perfect career path",
    icon: "🎯",
    route: "/quiz",
    color: "from-blue-500/20 to-purple-500/20",
    border: "border-blue-500/30"
  },
  {
    title: "Explore Salaries", 
    description: "Compare career earnings",
    icon: "💰",
    route: "/analytics",
    color: "from-green-500/20 to-emerald-500/20",
    border: "border-green-500/30"
  },
  {
    title: "Company Research",
    description: "Find your dream workplace", 
    icon: "🏢",
    route: "/companies",
    color: "from-orange-500/20 to-red-500/20",
    border: "border-orange-500/30"
  }
];

export const USER_TYPES = [
  {
    id: "students",
    title: "Current Students",
    icon: "🎓",
    description: "Get AI-powered career guidance, major selection help, and internship strategies.",
    ctaText: "Start Free Journey",
    route: "/signup/explorer",
    gradient: "from-blue-500/10 to-purple-500/10",
    border: "border-blue-500/20",
    buttonGradient: "from-blue-500 to-purple-500"
  },
  {
    id: "career-changers", 
    title: "Career Changers",
    icon: "🔄",
    description: "Transition smoothly with AI insights, skill mapping, and industry analysis.",
    ctaText: "Unlock Pro Features",
    route: "/signup/pro",
    gradient: "from-green-500/10 to-emerald-500/10",
    border: "border-green-500/20", 
    buttonGradient: "from-green-500 to-emerald-500"
  },
  {
    id: "job-seekers",
    title: "Active Job Seekers", 
    icon: "💼",
    description: "Optimize applications, track opportunities, and ace interviews with AI.",
    ctaText: "Get Early Access",
    action: "beta-signup",
    gradient: "from-orange-500/10 to-red-500/10",
    border: "border-orange-500/20",
    buttonGradient: "from-orange-500 to-red-500"
  }
];

export const HERO_CONFIG = {
  title: "Your AI Career Command Center",
  subtitle: "Real-time career insights • Live job market data • AI-powered guidance",
  primaryCTA: {
    text: "🚀 Launch JARVUS AI",
    route: "/jarvus-ai-demo"
  }
};

export const COMMUNITY_STATS = {
  activeNow: "3,247 students active now",
  weeklyOffers: "156 offers negotiated this week"
}; 