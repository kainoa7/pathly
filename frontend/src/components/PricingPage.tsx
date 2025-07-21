import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheck, 
  faFire, 
  faStar, 
  faNewspaper,
  faUniversity,
  faChartLine,
  faBrain,
  faUsers,
  faRocket,
  faGem,
  faEnvelope,
  faCalendarDays,
  faFileText,
  faCog,
  faMicrophone,
  faRobot,
  faCrown,
  faTimes,
  faEye,
  faShield,
  faLightbulb
} from '@fortawesome/free-solid-svg-icons';

interface PricingTier {
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  interval?: string;
  buttonText: string;
  buttonVariant: 'outline' | 'primary' | 'premium';
  highlight?: boolean;
  buttonLink?: string;
  tier: 'basic' | 'pro' | 'premium';
  badge?: string;
}

interface Feature {
  name: string;
  explorer: boolean | 'partial';
  pro: boolean | 'partial';
  premium: boolean | 'partial';
  status?: 'new' | 'hot' | 'coming-soon' | 'ai';
}

interface FAQItem {
  question: string;
  answer: string;
}

// Feedback Modal Component
const FeedbackModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [feedback, setFeedback] = useState('');
  const [interest, setInterest] = useState<'very-interested' | 'somewhat-interested' | 'not-interested' | ''>('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Feedback submitted:', { feedback, interest, email });
    setSubmitted(true);
    
    setTimeout(() => {
      onClose();
      navigate('/jarvus-ai-demo');
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-[#1a2234] rounded-2xl p-6 max-w-md w-full border border-[#FFD700]/30"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-[#FFD700]">Join JARVUS AI Waitlist</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                How interested are you in JARVUS AI for your career?
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="very-interested"
                    checked={interest === 'very-interested'}
                    onChange={(e) => setInterest(e.target.value as any)}
                    className="mr-2"
                  />
                  <span className="text-white">Very interested - I need this now!</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="somewhat-interested"
                    checked={interest === 'somewhat-interested'}
                    onChange={(e) => setInterest(e.target.value as any)}
                    className="mr-2"
                  />
                  <span className="text-white">Somewhat interested - looks promising</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="not-interested"
                    checked={interest === 'not-interested'}
                    onChange={(e) => setInterest(e.target.value as any)}
                    className="mr-2"
                  />
                  <span className="text-white">Not interested - just curious</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email (optional - for waitlist updates)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-[#FFD700]"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                What would you most want JARVUS AI to help you with?
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-[#FFD700] h-20 resize-none"
                placeholder="Career guidance, resume help, interview prep..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-[#FFD700] text-black font-semibold rounded hover:bg-[#FFD700]/80 transition-colors"
            >
              Join Waitlist
            </button>
          </form>
        ) : (
          <div className="text-center py-8">
            <FontAwesomeIcon icon={faCheck} className="text-green-400 text-4xl mb-4" />
            <h4 className="text-xl font-bold text-white mb-2">Thank you!</h4>
            <p className="text-gray-300">We'll keep you updated on JARVUS AI development.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const FAQAccordion: React.FC<{ faqs: FAQItem[] }> = ({ faqs }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div key={index} className="border border-[#71ADBA]/20 rounded-xl overflow-hidden">
          <button
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            className="w-full px-6 py-4 text-left flex justify-between items-center bg-[#1a2234]/30 hover:bg-[#1a2234]/50 transition-colors"
          >
            <span className="text-lg font-semibold text-white">{faq.question}</span>
            <motion.svg
              animate={{ rotate: expandedIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-6 text-[#71ADBA]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
          </button>
          <AnimatePresence>
            {expandedIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-6 pb-4 text-gray-300 bg-[#0f1419]/30">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

const PricingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [viewers, setViewers] = useState<number>(89);
  const [proUsers, setProUsers] = useState<number>(3247);
  const [foundingMembers, setFoundingMembers] = useState<number>(156);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const pricingTiers: PricingTier[] = [
    {
      name: 'Explorer',
      description: 'Perfect for getting started',
      price: 'Free',
      tier: 'basic',
      buttonText: 'Start Free',
      buttonVariant: 'outline',
      buttonLink: '/signup/explorer'
    },
    {
      name: 'Pro',
      description: 'Become a Founding Member',
      price: 'Free Forever',
      originalPrice: '$29/month',
      tier: 'pro',
      buttonText: user?.accountType === 'EXPLORER' ? 'Become Founding Member' : 'Join Founding Members',
      buttonVariant: 'primary',
      highlight: true,
      buttonLink: user?.accountType === 'EXPLORER' ? '/upgrade-to-pro' : '/signup/pro',
      badge: '🏆 FOUNDING MEMBER'
    },
    {
      name: 'JARVUS AI',
      description: 'AI-powered career assistant',
      price: 'Coming Soon',
      interval: '',
      tier: 'premium',
      buttonText: 'Join Waitlist',
      buttonVariant: 'premium',
      highlight: true,
      buttonLink: '#',
      badge: '🤖 AI POWERED'
    }
  ];

  const features: Feature[] = [
    { name: 'AI Career Matching Quiz', explorer: true, pro: true, premium: true },
    { name: 'Basic University Search', explorer: true, pro: true, premium: true },
    { name: 'Community Access', explorer: true, pro: true, premium: true },
    { name: 'Mobile Responsive Design', explorer: true, pro: true, premium: true },
    { name: 'Static Resume Templates', explorer: true, pro: true, premium: true },
    { name: 'Basic Interview Prep', explorer: true, pro: true, premium: true },
    
    { name: 'Daily News Hub with Social Features', explorer: false, pro: true, premium: true, status: 'hot' },
    { name: 'Save & Bookmark Articles', explorer: false, pro: true, premium: true },
    { name: 'Voting & Comments System', explorer: false, pro: true, premium: true },
    { name: 'Major Salary Comparison Tool', explorer: false, pro: true, premium: true, status: 'new' },
    { name: 'Career Analytics Dashboard', explorer: false, pro: true, premium: true, status: 'new' },
    { name: 'Interview Question Bank', explorer: false, pro: true, premium: true, status: 'new' },
    { name: '🏆 Founding Member Community', explorer: false, pro: true, premium: true, status: 'hot' },
    { name: 'Priority Support', explorer: false, pro: true, premium: true },
    { name: 'University Directory & Marketplace', explorer: false, pro: 'partial', premium: true, status: 'coming-soon' },
    
    { name: 'AI Career Assistant (JARVUS)', explorer: false, pro: false, premium: true, status: 'ai' },
    { name: 'Gmail Integration & Priority Scoring', explorer: false, pro: false, premium: true, status: 'ai' },
    { name: 'AI Resume Enhancement (73%→94% ATS)', explorer: false, pro: false, premium: true, status: 'ai' },
    { name: 'Calendar AI Optimization', explorer: false, pro: false, premium: true, status: 'ai' },
    { name: 'Voice Commands: "JARVUS, what\'s my schedule?"', explorer: false, pro: false, premium: true, status: 'ai' },
    { name: 'Company-Specific Interview Prep', explorer: false, pro: false, premium: true, status: 'ai' },
    { name: 'Real-time Salary Negotiation Advice', explorer: false, pro: false, premium: true, status: 'ai' },
    { name: 'AI Career Path Predictions', explorer: false, pro: false, premium: true, status: 'ai' },
    { name: 'Priority AI Processing', explorer: false, pro: false, premium: true },
    { name: 'Early Access to New AI Features', explorer: false, pro: false, premium: true },
    { name: 'Lifetime Access (Early Adopter)', explorer: false, pro: false, premium: true }
  ];

  const faqs: FAQItem[] = [
    {
      question: "What makes being a Founding Member special?",
      answer: "Founding Members get Pro features free forever, exclusive access to our private community, direct input on new features, and special recognition as early supporters who helped shape JARVUS. You're not just a user—you're part of the founding story."
    },
    {
      question: "How does JARVUS AI work?",
      answer: "JARVUS AI is your personal career assistant that integrates with Gmail, analyzes job opportunities, enhances resumes with AI, optimizes your calendar, and provides real-time career guidance. It's like having a career coach and personal assistant in one."
    },
    {
      question: "When will JARVUS AI be available?",
      answer: "We're currently developing JARVUS AI based on feedback from our Founding Members. Join the waitlist to be among the first to access the beta and help shape the final product."
    },
    {
      question: "Can I upgrade from Explorer to Pro?",
      answer: "Absolutely! Current Explorer users can upgrade to become Founding Members and get Pro features free forever. This offer is limited to early supporters."
    },
    {
      question: "Is the 'Free Forever' offer really permanent?",
      answer: "Yes! Founding Members lock in Pro features for life. As we grow and add new features, Founding Members maintain their special status and access."
    },
    {
      question: "What if I'm not satisfied?",
      answer: "We're confident you'll love JARVUS, but if you're not completely satisfied, just let us know. We're committed to making sure every Founding Member has an amazing experience."
    }
  ];

  const getFeatureBadge = (status?: string) => {
    switch (status) {
      case 'new':
        return <span className="ml-2 px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded font-bold uppercase tracking-wider">NEW</span>;
      case 'hot':
        return <span className="ml-2 px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded font-bold">🔥</span>;
      case 'ai':
        return <span className="ml-2 px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded font-bold uppercase tracking-wider">AI</span>;
      case 'coming-soon':
        return <span className="ml-2 px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded font-bold uppercase tracking-wider">SOON</span>;
      default:
        return null;
    }
  };

  const handlePremiumClick = () => {
    setShowFeedbackModal(true);
  };

  const getButtonClass = (variant: string, tier: string) => {
    switch (variant) {
      case 'outline':
        return "w-full py-3 rounded-lg border-2 border-[#71ADBA] text-[#71ADBA] hover:bg-[#71ADBA] hover:text-white transition-all duration-300 font-semibold";
      case 'primary':
        return "w-full py-4 rounded-lg bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white hover:from-[#5d9ca8] hover:to-[#8660a8] transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl";
      case 'premium':
        return "w-full py-4 rounded-lg bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF6347] text-black hover:scale-105 transition-all duration-300 font-bold text-lg shadow-lg";
      default:
        return "w-full py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-500 transition-all duration-300 font-semibold";
    }
  };

  const getCardClass = (tier: string, highlight?: boolean) => {
    if (tier === 'premium') {
      return "rounded-2xl bg-gradient-to-br from-[#FFD700]/10 via-[#FFA500]/10 to-[#FF6347]/10 p-8 border-2 border-[#FFD700]/50 hover:border-[#FFD700]/80 transition-all duration-300 shadow-2xl shadow-[#FFD700]/20 transform hover:scale-105 relative";
    }
    if (highlight) {
      return "rounded-2xl bg-gradient-to-br from-[#71ADBA]/5 via-[#9C71BA]/5 to-[#71ADBA]/5 p-8 border-2 border-[#71ADBA]/50 hover:border-[#71ADBA]/80 transition-all duration-300 shadow-xl transform hover:scale-102 relative";
    }
    return "rounded-2xl bg-[#1a2234]/60 p-8 border border-[#71ADBA]/20 hover:border-[#71ADBA]/40 transition-all duration-300";
  };

  const renderFeatureValue = (value: boolean | 'partial') => {
    if (value === true) {
      return <FontAwesomeIcon icon={faCheck} className="text-green-400" />;
    } else if (value === 'partial') {
      return <span className="text-yellow-400 text-sm">Partial</span>;
    } else {
      return <FontAwesomeIcon icon={faTimes} className="text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-background">
      {/* Feedback Modal */}
      <FeedbackModal 
        isOpen={showFeedbackModal} 
        onClose={() => setShowFeedbackModal(false)} 
      />

      {/* Spacer for header */}
      <div className="h-20 sm:h-24" />
      
      {/* Live Stats Banner */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8 px-4">
        <div className="flex items-center gap-3">
          <span className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
          </span>
          <span className="text-green-400 font-semibold">{viewers} people viewing pricing</span>
        </div>
        <div className="flex items-center gap-3">
          <FontAwesomeIcon icon={faUsers} className="text-[#71ADBA]" />
          <span className="text-[#71ADBA] font-semibold">{proUsers} Pro users</span>
        </div>
        <div className="flex items-center gap-3">
          <FontAwesomeIcon icon={faCrown} className="text-[#FFD700]" />
          <span className="text-[#FFD700] font-semibold">{foundingMembers} Founding Members</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 border border-[#FFD700]/30 rounded-full px-6 py-3">
              <span className="text-[#FFD700] font-bold text-lg">
                🏆 FOUNDING MEMBER OPPORTUNITY 🏆
              </span>
            </div>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Become a </span>
            <span className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#71ADBA] bg-clip-text text-transparent">
              Founding Member
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            <span className="text-[#FFD700] font-semibold">Get Pro Free Forever</span> and shape the future of AI-powered career guidance. 
            Join an exclusive community of early supporters who believe in revolutionizing how students navigate their careers.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 border border-[#71ADBA]/30 rounded-2xl p-6 max-w-2xl mx-auto"
          >
            <p className="text-[#71ADBA] font-semibold text-lg mb-2">
              🚀 What Founding Members Get:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-white">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faShield} className="text-[#FFD700]" />
                <span>Pro Free Forever</span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUsers} className="text-[#FFD700]" />
                <span>Exclusive Community</span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faLightbulb} className="text-[#FFD700]" />
                <span>Shape JARVUS Future</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={getCardClass(tier.tier, tier.highlight)}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                    {tier.badge}
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-gray-300 mb-4">{tier.description}</p>
                
                <div className="mb-6">
                  {tier.originalPrice && (
                    <div className="text-gray-400 line-through text-lg mb-1">{tier.originalPrice}</div>
                  )}
                  <div className="text-4xl font-bold text-white mb-2">
                    {tier.price}
                    {tier.interval && <span className="text-lg text-gray-400">/{tier.interval}</span>}
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (tier.tier === 'premium') {
                      handlePremiumClick();
                    } else if (tier.buttonLink) {
                      navigate(tier.buttonLink);
                    }
                  }}
                  className={getButtonClass(tier.buttonVariant, tier.tier)}
                >
                  {tier.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Compare All Features
          </h2>
          
          <div className="bg-[#1a2234]/60 rounded-2xl overflow-hidden border border-[#71ADBA]/20">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-4 p-6 bg-[#0f1419]/50 border-b border-[#71ADBA]/20">
              <div className="text-white font-semibold">Features</div>
              <div className="text-center text-white font-semibold">Explorer</div>
              <div className="text-center text-white font-semibold">Pro</div>
              <div className="text-center text-white font-semibold">JARVUS AI</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-[#71ADBA]/10">
              {features.map((feature, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 p-4 hover:bg-[#71ADBA]/5 transition-colors">
                  <div className="text-gray-300 flex items-center">
                    {feature.name}
                    {getFeatureBadge(feature.status)}
                  </div>
                  <div className="text-center">
                    {renderFeatureValue(feature.explorer)}
                  </div>
                  <div className="text-center">
                    {renderFeatureValue(feature.pro)}
                  </div>
                  <div className="text-center">
                    {renderFeatureValue(feature.premium)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Special Founding Member CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-[#FFD700]/10 via-[#FFA500]/10 to-[#71ADBA]/10 border border-[#FFD700]/30 rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              🏆 Limited Time: Founding Member Status
            </h2>
            <p className="text-xl text-gray-300 mb-6 max-w-3xl mx-auto">
              Be part of JARVUS history. Founding Members don't just get Pro features free forever—they help shape the product, 
              get exclusive access to new features, and join a special community of career innovators.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#1a2234]/60 rounded-xl p-6">
                <FontAwesomeIcon icon={faShield} className="text-[#FFD700] text-3xl mb-3" />
                <h3 className="text-white font-semibold mb-2">Lifetime Access</h3>
                <p className="text-gray-300 text-sm">Pro features free forever, no matter how we grow</p>
              </div>
              <div className="bg-[#1a2234]/60 rounded-xl p-6">
                <FontAwesomeIcon icon={faUsers} className="text-[#FFD700] text-3xl mb-3" />
                <h3 className="text-white font-semibold mb-2">Exclusive Community</h3>
                <p className="text-gray-300 text-sm">Private Discord, direct access to founders, special events</p>
              </div>
              <div className="bg-[#1a2234]/60 rounded-xl p-6">
                <FontAwesomeIcon icon={faLightbulb} className="text-[#FFD700] text-3xl mb-3" />
                <h3 className="text-white font-semibold mb-2">Product Input</h3>
                <p className="text-gray-300 text-sm">Your feedback directly shapes JARVUS development</p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/signup/pro')}
              className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#71ADBA] text-black px-12 py-4 rounded-xl font-bold text-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              🏆 Become a Founding Member Now
            </motion.button>
            
            <p className="text-gray-400 mt-4 text-sm">
              Join {foundingMembers} other visionaries who are shaping the future of career guidance
            </p>
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Frequently Asked Questions
          </h2>
          <FAQAccordion faqs={faqs} />
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="bg-[#1a2234]/60 rounded-2xl p-8 border border-[#71ADBA]/20">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Choose your path and join thousands of students discovering their perfect careers with JARVUS.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/signup/explorer')}
                className="flex-1 py-3 rounded-lg border-2 border-[#71ADBA] text-[#71ADBA] hover:bg-[#71ADBA] hover:text-white transition-all duration-300 font-semibold"
              >
                Start Free
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/signup/pro')}
                className="flex-1 py-3 rounded-lg bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white hover:from-[#5d9ca8] hover:to-[#8660a8] transition-all duration-300 font-semibold"
              >
                🏆 Join Founding Members
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage; 