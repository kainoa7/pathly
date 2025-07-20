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
  faEye
} from '@fortawesome/free-solid-svg-icons';

interface PricingTier {
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  interval?: string;
  features: { name: string; status?: 'new' | 'hot' | 'coming-soon' | 'ai' }[];
  buttonText: string;
  buttonVariant: 'outline' | 'primary' | 'premium';
  highlight?: boolean;
  buttonLink?: string;
  tier: 'basic' | 'pro' | 'premium';
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
    // Here you would typically send feedback to your backend
    console.log('Feedback submitted:', { feedback, interest, email });
    setSubmitted(true);
    
    // Close modal after 2 seconds and navigate to demo
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
          <h3 className="text-xl font-bold text-[#FFD700]">JARVUS AI Preview Interest</h3>
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
                    required
                  />
                  <span className="text-green-400">Very interested - I'd pay for this!</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="somewhat-interested"
                    checked={interest === 'somewhat-interested'}
                    onChange={(e) => setInterest(e.target.value as any)}
                    className="mr-2"
                  />
                  <span className="text-yellow-400">Somewhat interested - need to see more</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="not-interested"
                    checked={interest === 'not-interested'}
                    onChange={(e) => setInterest(e.target.value as any)}
                    className="mr-2"
                  />
                  <span className="text-gray-400">Not interested - just curious</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email (optional - for early access updates)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Any specific feedback or questions?
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 h-20"
                placeholder="What would make JARVUS AI perfect for your career?"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black font-bold py-3 rounded-lg hover:scale-105 transition-transform"
            >
              Submit & View Preview
            </button>
          </form>
        ) : (
          <div className="text-center py-4">
            <div className="text-green-400 text-4xl mb-3">✅</div>
            <h4 className="text-xl font-bold text-white mb-2">Thank you!</h4>
            <p className="text-gray-300 mb-4">Your feedback helps us build better AI for careers.</p>
            <p className="text-[#FFD700]">Redirecting to JARVUS AI preview...</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const FAQSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What makes JARVUS AI Premium special?",
      answer: "JARVUS AI is the world's first career-focused AI assistant. It reads your Gmail, analyzes career opportunities, builds perfect resumes with live AI enhancement, optimizes your calendar for interview success, and provides real-time salary negotiation advice. Think AI intelligence specifically designed for your career advancement."
    },
    {
      question: "How does the AI Gmail integration work?",
      answer: "JARVUS AI connects to your Gmail (with your permission) and automatically analyzes career-related emails. It scores job offers (Meta: 10/10, Netflix: 9/10), suggests negotiation tactics with real market data, and provides action items like 'Ask for signing bonus given your React expertise.'"
    },
    {
      question: "What's the Resume AI Enhancement?",
      answer: "Watch your resume transform in real-time! JARVUS AI takes basic bullets like 'Worked on frontend development' and enhances them to 'Built responsive React components serving 50k+ users, improving page load speeds by 40% and user engagement by 25%.' Your ATS score can jump from 73% to 94%."
    },
    {
      question: "How does Calendar AI work?",
      answer: "JARVUS AI detects scheduling conflicts (like Tuesday 2 PM double-booking: Coffee with Sam vs Netflix Interview) and provides smart suggestions: 'Move coffee with Sam to 4 PM to keep Netflix interview at optimal time slot.' It also blocks interview prep time automatically."
    },
    {
      question: "What's included in Career Intelligence?",
      answer: "JARVUS analyzes your interview compatibility (94% match with Meta), provides salary insights (L4 Engineer $155k-$175k base), offers negotiation tips, and gives company-specific interview prep. It's like having a career coach with access to real-time market data."
    },
    {
      question: "Is the voice interface really advanced?",
      answer: "Yes! JARVUS AI responds to natural language: 'JARVUS, what's my schedule Tuesday?' or 'JARVUS, optimize my work experience section.' The interface is designed to feel like having an AI assistant focused on accelerating your career."
    },
    {
      question: "Why is JARVUS AI Premium coming soon?",
      answer: "We're perfecting the technology and gathering feedback from early preview users. This represents months of AI development that could transform how professionals advance their careers. Early feedback helps us build the best possible experience."
    },
    {
      question: "Can I upgrade from Pro to JARVUS AI Premium?",
      answer: "Absolutely! Pro users get priority access and special upgrade pricing. You can start with Pro to experience our platform, then upgrade to JARVUS AI when it launches."
    }
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          className="border border-[#71ADBA]/20 rounded-lg overflow-hidden hover:border-[#71ADBA]/40 transition-colors duration-300"
          initial={false}
        >
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
  // Simulate analytics for FOMO
  const [viewers, setViewers] = useState<number>(89);
  const [proUsers, setProUsers] = useState<number>(3247);
  const [jarvusUsers, setJarvusUsers] = useState<number>(156);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const pricingTiers: PricingTier[] = [
    {
      name: 'Explorer',
      description: 'Perfect for getting started',
      price: 'Free',
      tier: 'basic',
      features: [
        { name: 'AI Career Matching Quiz' },
        { name: 'Basic University Search' },
        { name: 'General Career Insights' },
        { name: 'Community Access' },
        { name: 'Mobile Responsive Design' },
        { name: 'Static Resume Templates' },
        { name: 'Basic Interview Prep' }
      ],
      buttonText: 'Start Free',
      buttonVariant: 'outline',
      buttonLink: '/signup/explorer'
    },
    {
      name: 'Pro',
      description: 'For serious career builders',
      price: 'Free',
      originalPrice: '$29/month',
      tier: 'pro',
      features: [
        { name: 'Everything in Explorer' },
        { name: 'Daily News Hub with Social Features', status: 'hot' },
        { name: 'Save & Bookmark Articles', status: 'hot' },
        { name: 'Voting & Comments System', status: 'hot' },
        { name: 'Major Salary Comparison Tool', status: 'new' },
        { name: 'Career Analytics Dashboard', status: 'new' },
        { name: 'Interview Question Bank', status: 'new' },
        { name: 'Exclusive Founding Member Community', status: 'hot' },
        { name: 'Priority Support' },
        { name: 'University Directory & Marketplace', status: 'coming-soon' },
        { name: 'Demo Access to JARVUS Concepts', status: 'coming-soon' }
      ],
      buttonText: user?.accountType === 'EXPLORER' ? 'Upgrade to Pro' : 'Get Pro Free',
      buttonVariant: 'primary',
      highlight: true,
      buttonLink: user?.accountType === 'EXPLORER' ? '/upgrade-to-pro' : '/signup/pro'
    },
    {
      name: 'JARVUS AI Premium',
      description: 'Advanced AI for your career',
      price: 'Coming Soon',
      interval: '',
      tier: 'premium',
      features: [
        { name: 'Everything in Pro' },
        { name: 'JARVUS AI Assistant', status: 'ai' },
        { name: 'Gmail AI Analysis & Priority Scoring', status: 'ai' },
        { name: 'Live Resume AI Enhancement (73%→94% ATS)', status: 'ai' },
        { name: 'Calendar AI Optimization & Conflict Detection', status: 'ai' },
        { name: 'Career Intelligence with Salary Insights', status: 'ai' },
        { name: 'Voice Commands: "JARVUS, what\'s my schedule?"', status: 'ai' },
        { name: 'Company-Specific Interview Prep (Meta, Google)', status: 'ai' },
        { name: 'Real-time Salary Negotiation Advice', status: 'ai' },
        { name: 'AI Career Path Predictions', status: 'ai' },
        { name: 'Priority AI Processing' },
        { name: 'Early Access to New AI Features' },
        { name: 'Exclusive JARVUS Community' },
        { name: 'Lifetime Access (Early Adopter)' }
      ],
      buttonText: 'Coming Soon',
      buttonVariant: 'premium',
      highlight: true,
      buttonLink: '#'
    }
  ];

  const getFeatureBadge = (status?: string) => {
    switch (status) {
      case 'new':
        return <span className="ml-1 px-1 py-0.5 bg-blue-500/20 text-blue-400 text-[8px] rounded font-bold uppercase tracking-wider">NEW</span>;
      case 'hot':
        return <span className="ml-1 px-1 py-0.5 bg-red-500/20 text-red-400 text-[8px] rounded font-bold">🔥</span>;
      case 'ai':
        return <span className="ml-1 px-1 py-0.5 bg-purple-500/20 text-purple-400 text-[8px] rounded font-bold uppercase tracking-wider">AI</span>;
      case 'coming-soon':
        return <span className="ml-1 px-1 py-0.5 bg-yellow-500/20 text-yellow-400 text-[8px] rounded font-bold uppercase tracking-wider">SOON</span>;
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
        return "w-full py-3 rounded-lg bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white hover:from-[#5d9ca8] hover:to-[#8660a8] transition-all duration-300 font-semibold";
      case 'premium':
        return "w-full py-3 rounded-lg bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF6347] text-black hover:scale-105 transition-all duration-300 font-bold text-lg shadow-lg";
      default:
        return "w-full py-3 rounded-lg bg-gray-600 text-white hover:bg-gray-500 transition-all duration-300 font-semibold";
    }
  };

  const getCardClass = (tier: string, highlight?: boolean) => {
    if (tier === 'premium') {
      return "rounded-2xl bg-gradient-to-br from-[#FFD700]/10 via-[#FFA500]/10 to-[#FF6347]/10 p-8 border-2 border-[#FFD700]/50 hover:border-[#FFD700]/80 transition-all duration-300 shadow-2xl shadow-[#FFD700]/20 transform hover:scale-105 relative";
    }
    if (highlight) {
      return "rounded-2xl bg-[#1a2234]/60 p-8 border-2 border-[#71ADBA]/50 hover:border-[#71ADBA]/80 transition-all duration-300 transform hover:scale-102";
    }
    return "rounded-2xl bg-[#1a2234]/60 p-8 border border-[#71ADBA]/20 hover:border-[#71ADBA]/40 transition-all duration-300";
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
          <span className="text-lg font-bold text-[#71ADBA]">
            {viewers} students viewing pricing now
          </span>
        </div>
        <div className="flex items-center gap-3">
          <FontAwesomeIcon icon={faUsers} className="text-[#EDEAB1]" />
          <span className="text-lg font-bold text-[#EDEAB1]">
            {proUsers}+ Pro members
          </span>
        </div>
        <div className="flex items-center gap-3">
          <FontAwesomeIcon icon={faRobot} className="text-[#FFD700]" />
          <span className="text-lg font-bold text-[#FFD700]">
            {jarvusUsers}+ testing JARVUS AI preview
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pb-10 text-center px-4"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4">
          <span className="bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#FFD700] bg-clip-text text-transparent">
            Unleash Your Career Potential
          </span>
        </h1>
        <p className="text-xl text-[#71ADBA] max-w-3xl mx-auto mb-4 font-semibold">
          From basic tools to concept demos for future AI features
        </p>
        <p className="text-lg text-gray-300 max-w-4xl mx-auto mb-6">
          Start free with Explorer, upgrade to Pro for advanced features, or help us test JARVUS AI concepts - your feedback shapes what we build next.
        </p>
      </motion.div>

      {/* JARVUS AI Highlight Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-6xl mx-auto mb-12 px-4"
      >
        <div className="bg-gradient-to-r from-[#FFD700]/10 via-[#FFA500]/10 to-[#FF6347]/10 rounded-2xl p-6 border-2 border-[#FFD700]/30 shadow-xl shadow-[#FFD700]/20">
          <h3 className="text-center text-2xl font-bold text-[#FFD700] mb-4">
            <FontAwesomeIcon icon={faEye} className="mr-3" />
            JARVUS AI Concepts - What We're Considering Building
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-center">
            <div className="flex flex-col items-center gap-2 p-3 bg-[#FFD700]/5 rounded-lg">
              <FontAwesomeIcon icon={faEnvelope} className="text-[#FFD700] text-2xl" />
              <span className="text-sm text-gray-300">Gmail AI Analysis</span>
              <span className="text-xs text-[#FFD700]">Concept Demo</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-[#FFA500]/5 rounded-lg">
              <FontAwesomeIcon icon={faFileText} className="text-[#FFA500] text-2xl" />
              <span className="text-sm text-gray-300">AI Resume Builder</span>
              <span className="text-xs text-[#FFA500]">Future Feature</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-[#FF6347]/5 rounded-lg">
              <FontAwesomeIcon icon={faCalendarDays} className="text-[#FF6347] text-2xl" />
              <span className="text-sm text-gray-300">Calendar AI</span>
              <span className="text-xs text-[#FF6347]">Mockup Only</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-[#9C71BA]/5 rounded-lg">
              <FontAwesomeIcon icon={faBrain} className="text-[#9C71BA] text-2xl" />
              <span className="text-sm text-gray-300">Career Intelligence</span>
              <span className="text-xs text-[#9C71BA]">Planned Feature</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-[#71ADBA]/5 rounded-lg">
              <FontAwesomeIcon icon={faMicrophone} className="text-[#71ADBA] text-2xl" />
              <span className="text-sm text-gray-300">Voice Commands</span>
              <span className="text-xs text-[#71ADBA]">Vision Demo</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Pricing Cards */}
      <section className="py-10 bg-dark-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {pricingTiers.map((tier, index) => (
              <motion.div 
                key={tier.name}
                whileHover={{ scale: tier.tier === 'premium' ? 1.05 : 1.02 }}
                className={getCardClass(tier.tier, tier.highlight)}
              >
                {tier.tier === 'premium' && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black px-4 py-2 rounded-full text-sm font-bold flex items-center">
                      <FontAwesomeIcon icon={faCrown} className="mr-2" />
                      MOST ADVANCED
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className={`text-2xl font-bold mb-2 ${tier.tier === 'premium' ? 'text-[#FFD700]' : 'text-white'}`}>
                    {tier.name}
                  </h3>
                  <p className="text-gray-400 mb-4">{tier.description}</p>
                  <div className="flex items-center justify-center gap-2">
                    <div className={`text-4xl font-bold ${tier.tier === 'premium' ? 'text-[#FFD700]' : 'text-[#71ADBA]'}`}>
                      {tier.price}
                    </div>
                    {tier.interval && (
                      <span className="text-gray-400 text-lg">{tier.interval}</span>
                    )}
                  </div>
                  {tier.originalPrice && (
                    <div className="text-gray-500 line-through text-sm mt-1">
                      Originally {tier.originalPrice}
                    </div>
                  )}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <FontAwesomeIcon 
                        icon={faCheck} 
                        className={`mr-3 mt-0.5 flex-shrink-0 ${tier.tier === 'premium' ? 'text-[#FFD700]' : 'text-green-400'}`} 
                      />
                      <div className="flex-1 flex flex-wrap items-center">
                        <span className="text-gray-300 text-sm leading-relaxed">{feature.name}</span>
                        {getFeatureBadge(feature.status)}
                      </div>
                    </li>
                  ))}
                </ul>
                
                {tier.tier === 'premium' ? (
                  <div className="space-y-3">
                    <button
                      onClick={handlePremiumClick}
                      className={getButtonClass(tier.buttonVariant, tier.tier)}
                    >
                      <FontAwesomeIcon icon={faRocket} className="mr-2" />
                      {tier.buttonText}
                    </button>
                    <button
                      onClick={() => navigate('/jarvus-ai-demo')}
                      className="w-full py-3 rounded-lg border-2 border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700] hover:text-black transition-all duration-300 font-semibold"
                    >
                      <FontAwesomeIcon icon={faEye} className="mr-2" />
                      Check Out Preview
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => navigate(tier.buttonLink || '#')}
                    className={getButtonClass(tier.buttonVariant, tier.tier)}
                  >
                    {tier.tier === 'premium' && <FontAwesomeIcon icon={faRocket} className="mr-2" />}
                    {tier.buttonText}
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* JARVUS AI Demo Preview */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="py-16 bg-gradient-to-r from-[#FFD700]/5 via-[#FFA500]/5 to-[#FF6347]/5"
      >
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#FFD700] mb-6">
            See JARVUS AI In Action
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Watch how JARVUS AI analyzes a Meta job offer, optimizes your resume, and provides salary negotiation advice - all in real-time.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-[#FFD700]/10 rounded-lg p-4 border border-[#FFD700]/30">
              <FontAwesomeIcon icon={faEnvelope} className="text-[#FFD700] text-3xl mb-3" />
              <h4 className="text-white font-semibold mb-2">Email Analysis</h4>
              <p className="text-gray-400 text-sm">Meta offer scored 10/10 priority with negotiation insights</p>
            </div>
            <div className="bg-[#FFA500]/10 rounded-lg p-4 border border-[#FFA500]/30">
              <FontAwesomeIcon icon={faFileText} className="text-[#FFA500] text-3xl mb-3" />
              <h4 className="text-white font-semibold mb-2">Resume Enhancement</h4>
              <p className="text-gray-400 text-sm">ATS score improved from 73% to 94% instantly</p>
            </div>
            <div className="bg-[#FF6347]/10 rounded-lg p-4 border border-[#FF6347]/30">
              <FontAwesomeIcon icon={faBrain} className="text-[#FF6347] text-3xl mb-3" />
              <h4 className="text-white font-semibold mb-2">Salary Intelligence</h4>
              <p className="text-gray-400 text-sm">L4 Engineer market rates and negotiation tactics</p>
            </div>
            <div className="bg-[#9C71BA]/10 rounded-lg p-4 border border-[#9C71BA]/30">
              <FontAwesomeIcon icon={faMicrophone} className="text-[#9C71BA] text-3xl mb-3" />
              <h4 className="text-white font-semibold mb-2">Voice Commands</h4>
              <p className="text-gray-400 text-sm">"JARVUS, what's my schedule Tuesday?"</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/jarvus-ai-demo')}
            className="bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF6347] text-black font-bold py-4 px-8 rounded-lg text-xl shadow-lg"
          >
            <FontAwesomeIcon icon={faRocket} className="mr-3" />
            Experience JARVUS AI Demo
          </motion.button>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <section className="py-16 bg-dark-background">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center text-white mb-8">
              Frequently Asked Questions
            </h2>
            <FAQSection />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage; 