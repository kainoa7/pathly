import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface PricingTier {
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  interval?: string;
  features: string[];
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
      question: "Can I switch plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
    },
    {
      question: "Is there a student discount?",
      answer: "Yes! Our Pro plan is currently offered at a special student rate."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, and digital payment methods."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, you can cancel your subscription at any time. No hidden fees or commitments."
    }
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          className="border border-dark-border rounded-lg overflow-hidden hover:border-dark-primary transition-colors duration-300"
          initial={false}
        >
          <button
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            className="w-full px-6 py-4 text-left flex justify-between items-center"
          >
            <span className="text-xl font-semibold">{faq.question}</span>
            <motion.svg
              animate={{ rotate: expandedIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-6 h-6 text-dark-primary"
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
                <div className="px-6 pb-4 text-gray-300">
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
  // Simulate analytics for FOMO
  const [viewers, setViewers] = useState<number>(23);
  const [spotsLeft, setSpotsLeft] = useState<number>(28);

  // Optionally, randomize viewers/spots for more realism
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setViewers(20 + Math.floor(Math.random() * 10));
  //     setSpotsLeft(25 + Math.floor(Math.random() * 10));
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  const pricingTiers: PricingTier[] = [
    {
      name: 'Explorer',
      description: 'Perfect for getting started',
      price: 'Free',
      features: [
        'Basic Career Quiz',
        'Major Recommendations',
        'Basic Career Insights',
        'Top 3 Major Trends',
        'Limited AI Job Impact Reports'
      ],
      buttonText: 'Get Started',
      buttonVariant: 'outline',
      buttonLink: '/signup/explorer'
    },
    {
      name: 'Pro',
      description: 'For serious career planning',
      price: 'Free',
      features: [
        'Everything in Explorer',
        'Real-time Major Popularity Charts',
        'AI Impact Analysis by Industry',
        'Personalized Notifications',
        'Interactive Career Timeline',
        'Skill Demand Tracker',
        'Major Switching Compatibility Score',
        'Course Success Predictor',
        'Salary Trend Visualizations',
        'Weekly Industry Updates'
      ],
      buttonText: 'Join Free Now',
      buttonVariant: 'primary',
      highlight: true,
      buttonLink: '/signup/pro'
    },
    {
      name: 'Premium',
      description: 'Full career development suite',
      price: 'Coming Soon',
      features: [
        'Everything in Pro',
        'Advanced Analytics Dashboard',
        'Custom Career Path Simulator',
        'AI-Powered Study Schedule',
        'Personalized Success Metrics',
        'Real-time Industry Alerts',
        'Interactive Skills Graph',
        'Course Completion Tracking',
        'Major Change Impact Calculator',
        'Priority Feature Access',
        'Custom Report Generation'
      ],
      buttonText: 'Coming Soon',
      buttonVariant: 'primary'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-background">
      {/* Spacer for header */}
      <div className="h-20 sm:h-24" />
      {/* FOMO/analytics banner below header */}
      <div className="flex justify-center items-center gap-3 mb-6">
        <span className="relative flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500"></span>
        </span>
        <span className="text-lg font-bold text-[#71ADBA] drop-shadow-sm">
          {viewers} students viewing this page now
        </span>
      </div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pb-10 text-center"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1]">
          Unlock Your Future
        </h1>
        <p className="text-xl text-[#71ADBA] max-w-2xl mx-auto mb-2 font-semibold">
          Save time. Save money. Get career clarity—fast.
        </p>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Join now and get lifetime access to premium features for free. Limited spots available!
        </p>
      </motion.div>

      {/* Section: Save time & money */}
      <div className="text-center mb-8">
        <span className="inline-block bg-gradient-to-r from-[#71ADBA]/20 to-[#EDEAB1]/20 text-[#71ADBA] font-bold px-6 py-2 rounded-full text-lg shadow-md">
          Don’t miss out—students using Pathly save hours and avoid costly mistakes choosing their major and career.
        </span>
      </div>

      {/* Pricing Cards */}
      <section className="py-10 bg-dark-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1]">
                Choose Your Path
              </h2>
              <p className="text-lg text-[#71ADBA]">
                Get started for free or upgrade to Pro for advanced features. Premium tier coming soon!
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {/* Explorer Card */}
            <div className="rounded-2xl bg-dark-backgroundSecondary p-8 border border-dark-border hover:border-dark-primary transition-all duration-300">
              <h3 className="text-2xl font-bold mb-2">Explorer</h3>
              <p className="text-gray-400 mb-6">Perfect for getting started</p>
              <div className="mb-8">
                <span className="text-4xl font-bold">Free</span>
              </div>
              <ul className="space-y-4 mb-8">
                {pricingTiers[0].features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate(pricingTiers[0].buttonLink || '#')}
                className="w-full py-3 rounded-lg border-2 border-dark-primary text-dark-primary hover:bg-dark-primary hover:text-white transition-all duration-300"
              >
                Get Started
              </button>
            </div>

            {/* Pro Card */}
            <div className="rounded-2xl bg-gradient-to-b from-[#71ADBA]/10 to-[#9C71BA]/10 p-8 border-2 border-[#71ADBA] transform hover:-translate-y-1 transition-all duration-300 relative shadow-xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#71ADBA] text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide shadow-md">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-[#71ADBA] font-semibold mb-2">Save time & money. Lifetime access. Limited free spots!</p>
              <div className="mb-2 flex items-center justify-center gap-2">
                <span className="text-2xl font-bold text-gray-400 line-through">$4.99</span>
                <span className="text-4xl font-extrabold text-[#71ADBA] ml-2 drop-shadow">Free</span>
              </div>
              <div className="mb-4 text-center">
                <span className="inline-block bg-gradient-to-r from-[#71ADBA]/20 to-[#EDEAB1]/20 text-[#EDEAB1] px-4 py-1 rounded-full text-base font-bold shadow">Lifetime access</span>
              </div>
              <ul className="space-y-4 mb-8">
                {pricingTiers[1].features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-[#71ADBA] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate(pricingTiers[1].buttonLink || '#')}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white text-xl font-bold hover:opacity-90 transition-all duration-300 shadow-lg"
              >
                Join Free Now
              </button>
            </div>

            {/* Premium Card */}
            <div className="rounded-2xl bg-gradient-to-b from-[#9C71BA]/10 to-[#71ADBA]/10 p-8 border border-[#9C71BA] transform hover:-translate-y-1 transition-all duration-300">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#9C71BA] text-white px-4 py-1 rounded-full text-sm">
                Coming Soon
              </div>
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <p className="text-gray-400 mb-6">Full career development suite</p>
              <div className="mb-8">
                <span className="text-2xl font-bold text-[#EDEAB1]">Coming Soon</span>
              </div>
              <ul className="space-y-4 mb-8">
                {pricingTiers[2].features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-[#9C71BA] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button disabled className="w-full py-3 rounded-lg bg-gradient-to-r from-[#9C71BA] to-[#71ADBA] text-white opacity-75 cursor-not-allowed transition-all duration-300">
                Coming Soon
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-dark-background text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            <FAQSection />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage; 