import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faBalanceScale, faShieldAlt, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing or using JARVUS ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service. JARVUS is currently in beta testing phase, and these terms apply to all beta users and future users of the platform.`
    },
    {
      title: "2. Description of Service",
      content: `JARVUS is an AI-powered career guidance platform designed to help students and professionals make informed career decisions. The Service includes but is not limited to: career matching algorithms, personality assessments, industry insights, news feeds, analytics dashboards, and AI-powered career assistance (when available). Please note that JARVUS is currently in beta testing and features may be limited or subject to change.`
    },
    {
      title: "3. User Accounts and Registration",
      content: `To access certain features of JARVUS, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for all activities that occur under your account. You agree to immediately notify JARVUS of any unauthorized use of your account.`
    },
    {
      title: "4. Beta Testing Disclaimer",
      content: `JARVUS is currently in beta testing phase. This means the Service may contain bugs, errors, or other issues. Features may be incomplete, experimental, or subject to change without notice. We make no guarantees about the availability, reliability, or performance of the Service during the beta period. Your use of the beta Service is at your own risk.`
    },
    {
      title: "5. User Conduct",
      content: `You agree not to: (a) use the Service for any unlawful purpose or in violation of any local, state, national, or international law; (b) violate, or encourage others to violate, any right of a third party; (c) interfere with security-related features of the Service; (d) interfere with the operation of the Service or any user's enjoyment of it; (e) attempt to gain unauthorized access to the Service or its related systems; (f) upload or transmit viruses or malicious code; (g) spam users or the Service.`
    },
    {
      title: "6. Privacy and Data Protection",
      content: `Your privacy is important to us. Our collection and use of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using JARVUS, you consent to the collection and use of your information as described in our Privacy Policy.`
    },
    {
      title: "7. Intellectual Property Rights",
      content: `The Service and its original content, features, and functionality are and will remain the exclusive property of JARVUS and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.`
    },
    {
      title: "8. Career Guidance Disclaimer",
      content: `JARVUS provides career guidance and suggestions based on algorithms and data analysis. This information is for educational and informational purposes only and should not be considered as professional career counseling or guarantee of employment outcomes. Career decisions should always consider multiple factors and, when appropriate, consultation with qualified career professionals.`
    },
    {
      title: "9. Disclaimers and Limitation of Liability",
      content: `THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. TO THE FULLEST EXTENT PERMITTED BY LAW, JARVUS DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED. IN NO EVENT SHALL JARVUS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFITS, DATA, OR USE, INCURRED BY YOU OR ANY THIRD PARTY.`
    },
    {
      title: "10. Changes to Terms",
      content: `We reserve the right to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.`
    },
    {
      title: "11. Contact Information",
      content: `If you have any questions about these Terms of Service, please contact us at legal@jarvus.ai or through our support channels within the application.`
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Simple background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-6"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
              <FontAwesomeIcon icon={faBalanceScale} className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">Terms of Service</h1>
              <p className="text-gray-400">Last updated: July 20, 2025</p>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-8">
            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon={faShieldAlt} className="text-blue-400 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-300 mb-1">Beta Service Notice</h3>
                <p className="text-sm text-gray-300">
                  JARVUS is currently in beta testing. These terms apply to all beta users and will be updated as we launch new features.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/50 rounded-xl p-6 border border-gray-600/30"
            >
              <h2 className="text-xl font-semibold text-white mb-4">{section.title}</h2>
              <p className="text-gray-300 leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-slate-900/50 rounded-xl p-6 border border-cyan-500/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <FontAwesomeIcon icon={faUserCheck} className="text-cyan-400" />
            <h3 className="text-lg font-semibold">Agreement</h3>
          </div>
          <p className="text-gray-300 mb-4">
            By using JARVUS, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </p>
          <p className="text-sm text-gray-400">
            For questions or concerns about these terms, please contact us at{' '}
            <a href="mailto:legal@jarvus.ai" className="text-cyan-400 hover:text-cyan-300">
              legal@jarvus.ai
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfService; 