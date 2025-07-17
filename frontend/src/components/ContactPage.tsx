import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

// Validation functions
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidName = (name: string): boolean => {
  return name.trim().length >= 2;
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
    subscribe: true,
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateForm = (): boolean => {
    const errors = {
      name: '',
      email: '',
      subject: '',
      category: '',
      message: '',
    };
    let isValid = true;

    // Name validation
    if (!isValidName(formData.name)) {
      errors.name = 'Please enter a valid name (at least 2 characters)';
      isValid = false;
    }

    // Email validation
    if (!isValidEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Subject validation
    if (formData.subject.trim().length < 3) {
      errors.subject = 'Subject must be at least 3 characters long';
      isValid = false;
    }

    // Category validation
    if (!formData.category) {
      errors.category = 'Please select a category';
      isValid = false;
    }

    // Message validation
    if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    setFormErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate form before submission
    if (!validateForm()) {
      setError('Please fix the errors in the form');
      return;
    }

    setIsLoading(true);

    try {
      // First, send the message to ourselves using EmailJS
      const templateParams = {
        to_email: 'kaiyl.help@gmail.com',
        reply_to: formData.email.trim(),
        from_name: formData.name.trim(),
        from_email: 'kaiyl.help@gmail.com',
        subject: formData.subject.trim(),
        category: formData.category,
        message: formData.message.trim(),
        subscribe: formData.subscribe ? 'Yes' : 'No'
      };

      // Send email to our inbox
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      // Send an auto-response to the user
      const autoResponseParams = {
        to_email: formData.email.trim(),
        from_email: 'kaiyl.help@gmail.com',
        to_name: formData.name.trim(),
        subject: `Re: ${formData.subject.trim()}`,
        category: formData.category
      };

      // Send auto-response email
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_AUTORESPONSE_TEMPLATE_ID,
        autoResponseParams
      );

      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: '',
        subscribe: true
      });

      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      console.error('Error sending email:', err);
      setError('Failed to send message. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1a2234] rounded-2xl p-8 shadow-xl"
        >
          <h1 className="text-4xl font-bold mb-2 text-[#71ADBA]">Contact Us</h1>
          <p className="text-gray-400 mb-8">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/20 p-4 rounded-lg mb-6"
            >
              <p className="text-red-400">{error}</p>
            </motion.div>
          )}

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#71ADBA]/20 p-6 rounded-lg text-center"
            >
              <h3 className="text-2xl font-semibold text-[#71ADBA] mb-2">Thank You!</h3>
              <p className="text-gray-300">
                We've received your message and will get back to you at {formData.email} soon.
                {formData.subscribe && " We'll also keep you updated with our latest news!"}
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-[#0f172a] border ${formErrors.name ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:border-[#71ADBA] text-gray-300`}
                    placeholder="Your name"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-400">{formErrors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 bg-[#0f172a] border ${formErrors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:border-[#71ADBA] text-gray-300`}
                    placeholder="your@email.com"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-400">{formErrors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-2">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-[#0f172a] border ${formErrors.category ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:border-[#71ADBA] text-gray-300`}
                >
                  <option value="">Select a category</option>
                  <option value="general">General Inquiry</option>
                  <option value="career">Career Guidance</option>
                  <option value="university">University Partnership</option>
                  <option value="feedback">Feedback</option>
                  <option value="support">Technical Support</option>
                </select>
                {formErrors.category && (
                  <p className="mt-1 text-sm text-red-400">{formErrors.category}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 bg-[#0f172a] border ${formErrors.subject ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:border-[#71ADBA] text-gray-300`}
                  placeholder="What's this about?"
                />
                {formErrors.subject && (
                  <p className="mt-1 text-sm text-red-400">{formErrors.subject}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-2 bg-[#0f172a] border ${formErrors.message ? 'border-red-500' : 'border-gray-600'} rounded-lg focus:outline-none focus:border-[#71ADBA] text-gray-300 resize-none`}
                  placeholder="Tell us what you need help with..."
                />
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-400">{formErrors.message}</p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="subscribe"
                  name="subscribe"
                  checked={formData.subscribe}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 rounded border-gray-600 text-[#71ADBA] focus:ring-[#71ADBA] bg-[#0f172a]"
                />
                <label htmlFor="subscribe" className="ml-2 block text-sm text-gray-300">
                  Keep me updated with news and updates from K<span className="text-[#71ADBA]">ai</span>yl
                </label>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full px-6 py-3 bg-[#71ADBA] text-white rounded-lg font-medium transition-colors ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#5C919C]'
                }`}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          )}

          <div className="mt-8 pt-8 border-t border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-[#71ADBA] mb-2">Office Hours</h3>
                <p className="text-gray-400">
                  Monday - Friday<br />
                  9:00 AM - 5:00 PM PST
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#71ADBA] mb-2">Quick Response</h3>
                <p className="text-gray-400">
                  We aim to respond to all inquiries within 24-48 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage; 