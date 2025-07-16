import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
      buttonVariant: 'outline'
    },
    {
      name: 'Pro',
      description: 'For serious career planning',
      price: '$4.99',
      originalPrice: '$9.99',
      interval: '/month',
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
      buttonText: 'Get 50% Off Now',
      buttonVariant: 'primary',
      highlight: true
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
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="pt-32 pb-16 text-center"
      >
        <h1 className="text-6xl font-bold text-white mb-6">
          Invest in Your Future
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Join thousands of students who have already found their perfect career path.
          Choose the plan that works best for you.
        </p>
      </motion.div>

      {/* Pricing Cards */}
      <section className="py-20 bg-dark-background text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-5xl font-bold mb-4">Choose Your Path to Success</h2>
              <p className="text-xl text-gray-300">
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
              <button className="w-full py-3 rounded-lg border-2 border-dark-primary text-dark-primary hover:bg-dark-primary hover:text-white transition-all duration-300">
                Get Started
              </button>
            </div>

            {/* Pro Card */}
            <div className="rounded-2xl bg-gradient-to-b from-[#71ADBA]/10 to-[#9C71BA]/10 p-8 border-2 border-[#71ADBA] transform hover:-translate-y-1 transition-all duration-300 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#71ADBA] text-white px-4 py-1 rounded-full text-sm">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-gray-400 mb-6">For serious career planning</p>
              <div className="mb-8">
                <span className="text-4xl font-bold">$4.99</span>
                <span className="text-gray-400">/month</span>
                <span className="ml-2 line-through text-gray-500">$9.99</span>
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
              <button className="w-full py-3 rounded-lg bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white hover:opacity-90 transition-all duration-300">
                Get 50% Off Now
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