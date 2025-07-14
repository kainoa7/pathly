import { motion } from 'framer-motion';

const TermsOfService = () => {
  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-[#71ADBA]">Terms of Service</h1>
        <p className="text-gray-400 mb-4">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-gray-300">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">1. Agreement to Terms</h2>
            <p className="mb-4">
              By accessing or using Pathly, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">2. Description of Service</h2>
            <p className="mb-4">
              Pathly provides career guidance and educational pathway recommendations through our platform. Our services include personalized assessments, career matching, and educational resources.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">3. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Use the service for lawful purposes only</li>
              <li>Respect intellectual property rights</li>
              <li>Not engage in any harmful or disruptive behavior</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">4. Account Registration</h2>
            <p className="mb-4">
              You may need to create an account to use certain features. You are responsible for maintaining the confidentiality of your account and password.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">5. Intellectual Property</h2>
            <p className="mb-4">
              All content, features, and functionality on Pathly are owned by us and protected by copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">6. Disclaimer of Warranties</h2>
            <p className="mb-4">
              Our service is provided "as is" without warranties of any kind. We do not guarantee that our service will be uninterrupted, secure, or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">7. Limitation of Liability</h2>
            <p className="mb-4">
              Pathly shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">8. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">9. Contact Information</h2>
            <p className="mb-4">
              For questions about these Terms, please contact us at:
              <br />
              <a href="mailto:legal@pathly.com" className="text-[#71ADBA] hover:underline">
                legal@pathly.com
              </a>
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsOfService; 