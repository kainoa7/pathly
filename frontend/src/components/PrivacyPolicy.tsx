import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-[#71ADBA]">Privacy Policy</h1>
        <p className="text-gray-400 mb-4">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Welcome to Nextly</h2>
            <p className="mb-4">
              Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use Nextly's services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Basic profile information (name, email)</li>
              <li>Educational background and preferences</li>
              <li>Career interests and goals</li>
              <li>Quiz responses and assessment results</li>
              <li>Usage data and interaction with our platform</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personalize your career guidance experience</li>
              <li>Improve our recommendations and matching algorithms</li>
              <li>Send relevant updates and opportunities</li>
              <li>Analyze and improve our services</li>
              <li>Ensure platform security and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Data Protection</h2>
            <p className="mb-4">
              We implement industry-standard security measures to protect your personal information. Your data is encrypted in transit and at rest.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Your Rights</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Request data correction or deletion</li>
              <li>Opt-out of marketing communications</li>
              <li>Export your data</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Cookies and Tracking</h2>
            <p className="mb-4">
              We use cookies and similar technologies to improve your experience and analyze platform usage. You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">Contact Us</h2>
            <p className="mb-4">
              If you have questions about this Privacy Policy or your personal data, please contact us at:
              <br />
              <a href="mailto:nextly.help@gmail.com" className="text-[#71ADBA] hover:underline">
                nextly.help@gmail.com
              </a>
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy; 