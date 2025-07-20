import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShieldAlt, faUserShield, faEye, faLock, faCookie } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "1. Information We Collect",
      icon: faEye,
      content: `We collect information you provide directly to us, such as when you create an account, fill out career assessments, or contact us for support. This includes: personal information (name, email, phone number), career and educational information, assessment responses, usage data, and device information. As JARVUS is in beta, we may collect additional feedback and testing data to improve our service.`
    },
    {
      title: "2. How We Use Your Information",
      icon: faUserShield,
      content: `We use your information to: provide and improve our career guidance services, personalize your experience and recommendations, analyze usage patterns and service effectiveness, send important updates about your account or our service, respond to your requests and provide customer support, conduct research and development for new features, and ensure the security and integrity of our platform.`
    },
    {
      title: "3. Information Sharing and Disclosure",
      icon: faShieldAlt,
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances: with your explicit consent, to comply with legal obligations, to protect our rights and safety, with service providers who assist us in operating our platform (under strict confidentiality agreements), and in the event of a merger or acquisition (with prior notice to users).`
    },
    {
      title: "4. Data Security",
      icon: faLock,
      content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption of data in transit and at rest, regular security assessments, access controls and authentication measures, and secure data storage practices. However, no internet transmission is completely secure, and we cannot guarantee absolute security.`
    },
    {
      title: "5. Cookies and Tracking Technologies",
      icon: faCookie,
      content: `We use cookies and similar tracking technologies to enhance your experience on JARVUS. These technologies help us: remember your preferences and settings, analyze how you use our service, provide personalized content and recommendations, and measure the effectiveness of our features. You can control cookie settings through your browser, though some features may not function properly if cookies are disabled.`
    },
    {
      title: "6. Data Retention",
      icon: faShieldAlt,
      content: `We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. Specifically: account information is retained while your account is active and for a reasonable period after deactivation, career assessment data is retained to provide ongoing insights and improve our algorithms, usage data may be retained in aggregated, anonymous form for research purposes, and you can request deletion of your data at any time (subject to legal requirements).`
    },
    {
      title: "7. Your Rights and Choices",
      icon: faUserShield,
      content: `You have the right to: access and review your personal information, correct inaccurate or incomplete information, delete your account and associated data, opt-out of promotional communications, export your data in a portable format, and object to certain processing activities. To exercise these rights, please contact us at privacy@jarvus.ai or through your account settings.`
    },
    {
      title: "8. Children's Privacy",
      icon: faShieldAlt,
      content: `JARVUS is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will take steps to delete such information promptly. If you believe we have collected information from a child under 13, please contact us immediately.`
    },
    {
      title: "9. International Data Transfers",
      icon: faLock,
      content: `If you are accessing JARVUS from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States where our servers are located. By using our service, you consent to the transfer of your information to the United States and other countries where we operate.`
    },
    {
      title: "10. Changes to This Privacy Policy",
      icon: faEye,
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website and, if you have an account, by sending you an email notification. Your continued use of JARVUS after the effective date constitutes acceptance of the updated policy.`
    },
    {
      title: "11. Contact Us",
      icon: faUserShield,
      content: `If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at: privacy@jarvus.ai, through our support system within the application, or by mail at our business address (available upon request). We are committed to addressing your privacy concerns promptly and transparently.`
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
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <FontAwesomeIcon icon={faShieldAlt} className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">Privacy Policy</h1>
              <p className="text-gray-400">Last updated: July 20, 2025</p>
            </div>
          </div>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-8">
            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon={faUserShield} className="text-green-400 mt-1" />
              <div>
                <h3 className="font-semibold text-green-300 mb-1">Your Privacy Matters</h3>
                <p className="text-sm text-gray-300">
                  We are committed to protecting your privacy and being transparent about how we collect, use, and protect your personal information.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Privacy Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/50 rounded-xl p-6 border border-gray-600/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-green-500 rounded-lg flex items-center justify-center">
                  <FontAwesomeIcon icon={section.icon} className="text-white text-sm" />
                </div>
                <h2 className="text-xl font-semibold text-white">{section.title}</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 bg-slate-900/50 rounded-xl p-6 border border-green-500/20"
        >
          <div className="flex items-center gap-3 mb-4">
            <FontAwesomeIcon icon={faUserShield} className="text-green-400" />
            <h3 className="text-lg font-semibold">Privacy Commitment</h3>
          </div>
          <p className="text-gray-300 mb-4">
            At JARVUS, we believe privacy is a fundamental right. We are committed to being transparent about our data practices and giving you control over your personal information.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400 mb-2">
                <strong className="text-white">Privacy Questions:</strong><br />
                <a href="mailto:privacy@jarvus.ai" className="text-green-400 hover:text-green-300">
                  privacy@jarvus.ai
                </a>
              </p>
            </div>
            <div>
              <p className="text-gray-400">
                <strong className="text-white">Data Requests:</strong><br />
                Submit through your account settings
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 