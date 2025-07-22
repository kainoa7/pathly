// Pricing Page Data - Types
export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  period?: string;
  buttonText: string;
  buttonStyle: 'outline' | 'primary' | 'premium';
  route?: string;
  action?: string;
  isPopular?: boolean;
  badge?: string;
}

export interface Feature {
  name: string;
  explorer: boolean;
  pro: boolean;
  premium: boolean;
  isNew?: boolean;
  isAI?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'explorer',
    name: 'Explorer',
    description: 'Perfect for getting started',
    price: 'Free',
    buttonText: 'Start Free',
    buttonStyle: 'outline',
    route: '/signup/explorer'
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Become a Founding Member',
    price: 'Free Forever',
    originalPrice: '$29/month',
    buttonText: 'Join Founding Members',
    buttonStyle: 'primary',
    route: '/signup/pro',
    isPopular: true,
    badge: '🏆 FOUNDING MEMBER'
  },
  {
    id: 'premium',
    name: 'JARVUS AI',
    description: 'AI-powered career assistant',
    price: 'Coming Soon',
    buttonText: 'Join Waitlist',
    buttonStyle: 'premium',
    action: 'waitlist',
    badge: '🤖 AI POWERED'
  }
];

export const FEATURES: Feature[] = [
  { name: 'Career Matching Quiz', explorer: true, pro: true, premium: true },
  { name: 'University Search', explorer: true, pro: true, premium: true },
  { name: 'Community Access', explorer: true, pro: true, premium: true },
  { name: 'Basic Resume Templates', explorer: true, pro: true, premium: true },
  { name: 'Interview Prep', explorer: true, pro: true, premium: true },
  
  { name: 'Daily News Hub', explorer: false, pro: true, premium: true, isNew: true },
  { name: 'Save & Bookmark Articles', explorer: false, pro: true, premium: true },
  { name: 'Salary Comparison Tool', explorer: false, pro: true, premium: true, isNew: true },
  { name: 'Career Analytics Dashboard', explorer: false, pro: true, premium: true, isNew: true },
  { name: 'Interview Question Bank', explorer: false, pro: true, premium: true },
  { name: 'Founding Member Community', explorer: false, pro: true, premium: true },
  { name: 'Priority Support', explorer: false, pro: true, premium: true },
  
  { name: 'AI Career Assistant', explorer: false, pro: false, premium: true, isAI: true },
  { name: 'Gmail Integration', explorer: false, pro: false, premium: true, isAI: true },
  { name: 'AI Resume Enhancement', explorer: false, pro: false, premium: true, isAI: true },
  { name: 'Calendar Optimization', explorer: false, pro: false, premium: true, isAI: true },
  { name: 'Voice Commands', explorer: false, pro: false, premium: true, isAI: true },
  { name: 'Interview Prep AI', explorer: false, pro: false, premium: true, isAI: true },
  { name: 'Salary Negotiation Advice', explorer: false, pro: false, premium: true, isAI: true }
];

export const FOUNDING_MEMBER_BENEFITS = [
  {
    icon: '🎯',
    title: 'Lifetime Pro Access',
    description: 'All Pro features free forever'
  },
  {
    icon: '👥',
    title: 'Exclusive Community',
    description: 'Private Discord with founders'
  },
  {
    icon: '🧠',
    title: 'Shape JARVUS Future',
    description: 'Direct input on new features'
  }
];

export const FAQS = [
  {
    question: "What makes being a Founding Member special?",
    answer: "Founding Members get Pro features free forever, exclusive community access, and direct input on JARVUS development. You're part of our founding story."
  },
  {
    question: "When will JARVUS AI be available?",
    answer: "We're developing JARVUS AI based on Founding Member feedback. Join the waitlist to be first in line for the beta."
  },
  {
    question: "Is the 'Free Forever' offer really permanent?",
    answer: "Yes! Founding Members lock in Pro features for life. As we grow, Founding Members maintain their special status."
  },
  {
    question: "Can I upgrade from Explorer to Pro?",
    answer: "Absolutely! Current Explorer users can upgrade to Founding Member status and get Pro features free forever."
  }
]; 