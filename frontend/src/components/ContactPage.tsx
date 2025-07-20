import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt, 
  faClock,
  faRocket,
  faQuestionCircle,
  faBug,
  faLightbulb,
  faHeadset
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: 'general', message: '' });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: faEnvelope,
      title: "Email Support",
      description: "Get help within 24 hours",
      contact: "support@jarvus.ai",
      action: "mailto:support@jarvus.ai"
    },
    {
      icon: faQuestionCircle,
      title: "General Questions",
      description: "Questions about JARVUS features",
      contact: "hello@jarvus.ai",
      action: "mailto:hello@jarvus.ai"
    },
    {
      icon: faBug,
      title: "Bug Reports",
      description: "Report issues during beta testing",
      contact: "bugs@jarvus.ai", 
      action: "mailto:bugs@jarvus.ai"
    },
    {
      icon: faLightbulb,
      title: "Feature Requests",
      description: "Suggest new features for JARVUS",
      contact: "feedback@jarvus.ai",
      action: "mailto:feedback@jarvus.ai"
    }
  ];

  const subjectOptions = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'feedback', label: 'Feedback & Suggestions' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'feature', label: 'Feature Request' },
    { value: 'partnership', label: 'Partnership Opportunity' },
    { value: 'press', label: 'Press & Media' },
    { value: 'other', label: 'Other' }
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-6"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back
          </button>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <FontAwesomeIcon icon={faHeadset} className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold">Contact Us</h1>
                <p className="text-gray-400">We're here to help you succeed</p>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
              <div className="flex items-start gap-3">
                <FontAwesomeIcon icon={faRocket} className="text-blue-400 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-300 mb-1">Beta Support</h3>
                  <p className="text-sm text-gray-300">
                    During our beta phase, we typically respond within 24 hours. Your feedback helps us improve JARVUS!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-900/50 rounded-xl p-8 border border-gray-600/30"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 transition-all"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-cyan-400/50 transition-all"
                >
                  {subjectOptions.map(option => (
                    <option key={option.value} value={option.value} className="bg-slate-800">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 transition-all resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold disabled:opacity-50 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </span>
                ) : isSubmitted ? (
                  <span className="flex items-center justify-center gap-2">
                    <FontAwesomeIcon icon={faRocket} />
                    Message Sent!
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <FontAwesomeIcon icon={faEnvelope} />
                    Send Message
                  </span>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Other ways to reach us</h2>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.title}
                    href={method.action}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="block bg-slate-900/50 rounded-xl p-6 border border-gray-600/30 hover:border-cyan-500/50 transition-all group"
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FontAwesomeIcon icon={method.icon} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white mb-1">{method.title}</h3>
                        <p className="text-gray-400 text-sm mb-2">{method.description}</p>
                        <p className="text-cyan-400 font-medium">{method.contact}</p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Response Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 rounded-xl p-6 border border-green-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <FontAwesomeIcon icon={faClock} className="text-green-400" />
                <h3 className="text-lg font-semibold">Response Times</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">General Inquiries:</span>
                  <span className="text-green-400">Within 24 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Technical Support:</span>
                  <span className="text-green-400">Within 12 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Bug Reports:</span>
                  <span className="text-orange-400">Within 6 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Critical Issues:</span>
                  <span className="text-red-400">Within 2 hours</span>
                </div>
              </div>
            </motion.div>

            {/* Beta Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 rounded-xl p-6 border border-blue-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <FontAwesomeIcon icon={faRocket} className="text-blue-400" />
                <h3 className="text-lg font-semibold">Beta Feedback</h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                As a beta user, your feedback is invaluable! Don't hesitate to share your thoughts, 
                report bugs, or suggest improvements. We're building JARVUS together!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 