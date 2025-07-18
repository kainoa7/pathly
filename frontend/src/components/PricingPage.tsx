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
  faGem
} from '@fortawesome/free-solid-svg-icons';

interface PricingTier {
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  interval?: string;
  features: { name: string; status?: 'new' | 'hot' | 'coming-soon' }[];
  buttonText: string;
  buttonVariant: 'outline' | 'primary';
  highlight?: boolean;
  buttonLink?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What's included in the Pro plan?",
      answer: "Pro includes everything in Explorer PLUS our exclusive Daily News Hub with social features, Major Salary Comparison Tool with 10-year projections, Career Analytics Dashboard, and Founding Member Community access. All features are fully functional and ready to use!"
    },
    {
      question: "How does the News Hub work?",
      answer: "Our Pro News Hub curates daily articles across Tech, Business, Finance, Sports, and AI. You can vote on articles, leave comments, save favorites, and see what other Pro users are engaging with. It's like Reddit meets career development!"
    },
    {
      question: "What's the University Directory feature?",
      answer: "Coming soon for Pro users! Search 3,000+ universities with insider insights, plus a student-to-student marketplace for buying/selling dorm essentials at 60-70% off retail. Pro users can vote on which features we prioritize!"
    },
    {
      question: "Is the Pro plan really free?",
      answer: "Yes! We're currently offering Pro for free to build our community. This won't last forever, so join now to lock in lifetime access to these premium features."
    },
    {
      question: "Can I switch between plans?",
      answer: "Absolutely! You can start with Explorer and upgrade to Pro anytime. Once you're Pro, you'll have access to all premium features immediately."
    },
    {
      question: "When will Premium launch?",
      answer: "Premium is coming soon with even more advanced features like AI-powered study schedules, custom career simulations, and priority feature access. Pro users will get early access and special pricing!"
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
  const [viewers, setViewers] = useState<number>(47);
  const [proUsers, setProUsers] = useState<number>(2834);

  const pricingTiers: PricingTier[] = [
    {
      name: 'Explorer',
      description: 'Perfect for getting started',
      price: 'Free',
      features: [
        { name: 'AI Career Matching Quiz' },
        { name: 'Basic University Search' },
        { name: 'General Career Insights' },
        { name: 'Community Access' },
        { name: 'Mobile Responsive Design' }
      ],
      buttonText: 'Start Free',
      buttonVariant: 'outline',
      buttonLink: '/signup/explorer'
    },
    {
      name: 'Pro',
      description: 'For serious career builders',
      price: 'Free',
      features: [
        { name: 'Everything in Explorer' },
        { name: 'Daily News Hub with Social Features', status: 'hot' },
        { name: 'Save & Bookmark Articles', status: 'hot' },
        { name: 'Voting & Comments System', status: 'hot' },
        { name: 'Major Salary Comparison Tool', status: 'new' },
        { name: 'Career Analytics Dashboard', status: 'new' },
        { name: 'Exclusive Founding Member Community', status: 'hot' },
        { name: 'Priority Support' },
        { name: 'University Directory & Marketplace', status: 'coming-soon' }
      ],
      buttonText: user?.accountType === 'EXPLORER' ? 'Upgrade to Pro' : 'Get Pro Free',
      buttonVariant: 'primary',
      highlight: true,
      buttonLink: user?.accountType === 'EXPLORER' ? '/upgrade-to-pro' : '/signup/pro'
    },
    {
      name: 'Premium',
      description: 'Ultimate career development suite',
      price: 'Coming Soon',
      features: [
        { name: 'Everything in Pro' },
        { name: 'AI-Powered Study Schedules', status: 'coming-soon' },
        { name: 'Custom Career Path Simulator', status: 'coming-soon' },
        { name: 'Personalized Success Metrics', status: 'coming-soon' },
        { name: 'Real-time Industry Alerts', status: 'coming-soon' },
        { name: 'Advanced Analytics Dashboard', status: 'coming-soon' },
        { name: 'Custom Report Generation', status: 'coming-soon' },
        { name: 'Early Feature Access', status: 'coming-soon' },
        { name: '1-on-1 Career Coaching', status: 'coming-soon' }
      ],
      buttonText: 'Coming Soon',
      buttonVariant: 'primary'
    }
  ];

  const getFeatureBadge = (status?: string) => {
    switch (status) {
      case 'new':
        return <span className="ml-2 px-2 py-0.5 bg-blue-500/20 text-blue-300 text-xs rounded-full">NEW</span>;
      case 'hot':
        return <span className="ml-2 px-2 py-0.5 bg-red-500/20 text-red-300 text-xs rounded-full">🔥 HOT</span>;
      case 'coming-soon':
        return <span className="ml-2 px-2 py-0.5 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">Soon</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dark-background">
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
            {proUsers}+ Pro members and growing
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
          <span className="bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] bg-clip-text text-transparent">
            Choose Your Career Journey
          </span>
        </h1>
        <p className="text-xl text-[#71ADBA] max-w-3xl mx-auto mb-4 font-semibold">
          From confused student to confident professional
        </p>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          Start free with Explorer or unlock exclusive Pro features. Limited-time free Pro access available!
        </p>
      </motion.div>

      {/* Pro Highlights Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-4xl mx-auto mb-12 px-4"
      >
        <div className="bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-2xl p-6 border border-[#71ADBA]/30">
          <h3 className="text-center text-xl font-bold text-white mb-4">
            <FontAwesomeIcon icon={faFire} className="text-orange-400 mr-2" />
            What's Live in Pro Right Now
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faNewspaper} className="text-[#71ADBA]" />
              <span className="text-gray-300">Daily News Hub</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faChartLine} className="text-[#71ADBA]" />
              <span className="text-gray-300">Activity Dashboard</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faUniversity} className="text-[#71ADBA]" />
              <span className="text-gray-300">University Voting</span>
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
            {/* Explorer Card */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl bg-[#1a2234]/60 p-8 border border-[#71ADBA]/20 hover:border-[#71ADBA]/40 transition-all duration-300"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{pricingTiers[0].name}</h3>
                <p className="text-gray-400 mb-4">{pricingTiers[0].description}</p>
                <div className="text-4xl font-bold text-[#71ADBA]">{pricingTiers[0].price}</div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {pricingTiers[0].features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <FontAwesomeIcon icon={faCheck} className="text-green-400 mr-3" />
                    <span className="text-gray-300">{feature.name}</span>
                    {getFeatureBadge(feature.status)}
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => navigate(pricingTiers[0].buttonLink || '#')}
                className="w-full py-3 rounded-lg border-2 border-[#71ADBA] text-[#71ADBA] hover:bg-[#71ADBA] hover:text-white transition-all duration-300 font-semibold"
              >
                {pricingTiers[0].buttonText}
              </button>
            </motion.div>

            {/* Pro Card */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl bg-gradient-to-b from-[#71ADBA]/20 to-[#9C71BA]/20 p-8 border-2 border-[#71ADBA] transform hover:-translate-y-1 transition-all duration-300 relative shadow-2xl"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-6 py-2 rounded-full text-sm font-bold tracking-wide shadow-lg">
                <FontAwesomeIcon icon={faStar} className="mr-1" />
                MOST POPULAR
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{pricingTiers[1].name}</h3>
                <p className="text-[#EDEAB1] font-semibold mb-4">{pricingTiers[1].description}</p>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-gray-400 line-through">$9.99/mo</span>
                  <span className="text-4xl font-extrabold text-[#EDEAB1]">{pricingTiers[1].price}</span>
                </div>
                <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-1 rounded-full text-sm font-bold">
                  🔥 Limited Time Free Access
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {pricingTiers[1].features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <FontAwesomeIcon icon={faCheck} className="text-[#EDEAB1] mr-3" />
                    <span className="text-gray-300">{feature.name}</span>
                    {getFeatureBadge(feature.status)}
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => navigate(pricingTiers[1].buttonLink || '#')}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white text-lg font-bold hover:opacity-90 transition-all duration-300 shadow-lg"
              >
                <FontAwesomeIcon icon={faRocket} className="mr-2" />
                {pricingTiers[1].buttonText}
              </button>
            </motion.div>

            {/* Premium Card */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="rounded-2xl bg-gradient-to-b from-[#9C71BA]/10 to-[#71ADBA]/10 p-8 border border-[#9C71BA]/40 transition-all duration-300 relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#9C71BA] text-white px-4 py-2 rounded-full text-sm font-bold">
                COMING SOON
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{pricingTiers[2].name}</h3>
                <p className="text-gray-400 mb-4">{pricingTiers[2].description}</p>
                <div className="text-3xl font-bold text-[#9C71BA]">{pricingTiers[2].price}</div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {pricingTiers[2].features.map((feature, index) => (
                  <li key={index} className="flex items-center opacity-70">
                    <FontAwesomeIcon icon={faCheck} className="text-[#9C71BA] mr-3" />
                    <span className="text-gray-300">{feature.name}</span>
                    {getFeatureBadge(feature.status)}
                  </li>
                ))}
              </ul>
              
              <button 
                disabled 
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#9C71BA] to-[#71ADBA] text-white opacity-50 cursor-not-allowed font-semibold"
              >
                {pricingTiers[2].buttonText}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-16 bg-[#0f1419]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why Pro Users Love Kaiyl
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Real features, real impact, real results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: faNewspaper,
                title: "Daily News Hub",
                description: "Curated Tech, Business, Finance, Sports & AI news with voting, comments, and saves",
                status: "🔥 Live Now"
              },
              {
                icon: faChartLine,
                title: "Activity Dashboard", 
                description: "Track your engagement, comments, votes, and saved articles with beautiful analytics",
                status: "✨ New Feature"
              },
              {
                icon: faUniversity,
                title: "University Directory",
                description: "Vote on upcoming features like 3,000+ university search and student marketplace",
                status: "🗳️ Vote Now"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.2 }}
                className="bg-[#1a2234]/60 rounded-xl p-6 border border-[#71ADBA]/20 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={feature.icon} className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 mb-4">{feature.description}</p>
                <div className="inline-block bg-[#71ADBA]/20 text-[#71ADBA] px-3 py-1 rounded-full text-sm font-medium">
                  {feature.status}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-dark-background text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-[#71ADBA] to-[#EDEAB1] bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <FAQSection />
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10">
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Level Up Your Career Game?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join {proUsers}+ students who've unlocked their potential with Pro features
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate(user?.accountType === 'EXPLORER' ? '/upgrade-to-pro' : '/signup/pro')}
                className="px-8 py-4 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-xl text-white text-lg font-semibold hover:shadow-lg hover:shadow-[#71ADBA]/25 transition-all"
              >
                <FontAwesomeIcon icon={faRocket} className="mr-2" />
                {user?.accountType === 'EXPLORER' ? 'Upgrade to Pro' : 'Get Pro Access Free'}
              </button>
              <button
                onClick={() => navigate('/demo')}
                className="px-8 py-4 border border-[#71ADBA] rounded-xl text-[#71ADBA] text-lg font-semibold hover:bg-[#71ADBA]/10 transition-all"
              >
                See Features Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage; 