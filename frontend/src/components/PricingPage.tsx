import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PricingCard from './pricing/PricingCard';
import FeatureTable from './pricing/FeatureTable';
import BetaSignupForm from './BetaSignupForm';
import { PRICING_TIERS, FEATURES, FOUNDING_MEMBER_BENEFITS, FAQS } from '../data/pricingData';

const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const handleWaitlist = () => {
    setShowWaitlist(true);
  };

  return (
    <div className="min-h-screen bg-dark-background">
      {/* Spacer for header */}
      <div className="h-20 sm:h-24" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full px-6 py-3">
              <span className="text-yellow-400 font-bold">🏆 FOUNDING MEMBER OPPORTUNITY</span>
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="text-white">Become a </span>
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Founding Member
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            <span className="text-yellow-400 font-semibold">Get Pro Free Forever</span> and shape the future of AI-powered career guidance. 
            Join an exclusive community of early supporters revolutionizing how students navigate their careers.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {PRICING_TIERS.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PricingCard tier={tier} onWaitlist={handleWaitlist} />
            </motion.div>
          ))}
        </div>

        {/* Founding Member Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 border border-[#71ADBA]/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              What Founding Members Get:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {FOUNDING_MEMBER_BENEFITS.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl mb-3">{benefit.icon}</div>
                  <h3 className="text-white font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-300 text-sm">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Feature Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Compare All Features
          </h2>
          <FeatureTable features={FEATURES} />
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
          <div className="space-y-4 max-w-4xl mx-auto">
            {FAQS.map((faq, index) => (
              <div key={index} className="border border-[#71ADBA]/20 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center bg-[#1a2234]/30 hover:bg-[#1a2234]/50 transition-colors"
                >
                  <span className="text-lg font-semibold text-white">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: expandedFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-[#71ADBA]"
                  >
                    ↓
                  </motion.div>
                </button>
                {expandedFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 text-gray-300 bg-[#0f1419]/30"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
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
              Join thousands of students discovering their perfect careers with JARVUS.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <button
                onClick={() => navigate('/signup/explorer')}
                className="flex-1 py-3 rounded-xl border-2 border-[#71ADBA] text-[#71ADBA] hover:bg-[#71ADBA] hover:text-white transition-all duration-300 font-semibold"
              >
                Start Free
              </button>
              
              <button
                onClick={() => navigate('/signup/pro')}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white hover:opacity-90 transition-all duration-300 font-semibold"
              >
                🏆 Join Founding Members
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Waitlist Modal */}
      {showWaitlist && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <BetaSignupForm
              source="pricing_page_waitlist"
              onSuccess={() => setShowWaitlist(false)}
              onClose={() => setShowWaitlist(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingPage; 