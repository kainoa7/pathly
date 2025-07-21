import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRocket, 
  faCheck, 
  faSpinner,
  faTimes,
  faUser,
  faEnvelope,
  faGraduationCap,
  faBrain
} from '@fortawesome/free-solid-svg-icons';

interface BetaSignupFormProps {
  source?: string;
  onSuccess?: () => void;
  onClose?: () => void;
  quizResults?: any;
}

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  currentStatus: string;
  interestArea: string;
  university: string;
  graduationYear: string;
  phoneNumber: string;
  howHeardAboutUs: string;
  specificInterests: string;
}

const BetaSignupForm: React.FC<BetaSignupFormProps> = ({ 
  source = 'unknown',
  onSuccess,
  onClose,
  quizResults 
}) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    currentStatus: '',
    interestArea: '',
    university: '',
    graduationYear: '',
    phoneNumber: '',
    howHeardAboutUs: '',
    specificInterests: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const currentStatusOptions = [
    { value: 'high_school_freshman', label: 'High School Freshman' },
    { value: 'high_school_sophomore', label: 'High School Sophomore' },
    { value: 'high_school_junior', label: 'High School Junior' },
    { value: 'high_school_senior', label: 'High School Senior' },
    { value: 'college_freshman', label: 'College Freshman' },
    { value: 'college_sophomore', label: 'College Sophomore' },
    { value: 'college_junior', label: 'College Junior' },
    { value: 'college_senior', label: 'College Senior' },
    { value: 'recent_graduate', label: 'Recent Graduate (within 2 years)' },
    { value: 'working_professional', label: 'Working Professional' },
    { value: 'career_changer', label: 'Looking to Change Careers' },
    { value: 'gap_year', label: 'Taking a Gap Year' },
    { value: 'other', label: 'Other' }
  ];

  const interestAreaOptions = [
    { value: 'technology', label: 'Technology & Engineering' },
    { value: 'business', label: 'Business & Entrepreneurship' },
    { value: 'healthcare', label: 'Healthcare & Medicine' },
    { value: 'education', label: 'Education & Teaching' },
    { value: 'creative', label: 'Creative Arts & Design' },
    { value: 'finance', label: 'Finance & Economics' },
    { value: 'science', label: 'Science & Research' },
    { value: 'law', label: 'Law & Government' },
    { value: 'social_services', label: 'Social Services & Non-profit' },
    { value: 'trades', label: 'Skilled Trades' },
    { value: 'unsure', label: 'Not Sure Yet' },
    { value: 'other', label: 'Other' }
  ];

  const howHeardOptions = [
    { value: 'social_media', label: 'Social Media' },
    { value: 'friend_referral', label: 'Friend/Family Referral' },
    { value: 'search_engine', label: 'Google/Search Engine' },
    { value: 'university', label: 'University/School' },
    { value: 'career_counselor', label: 'Career Counselor' },
    { value: 'online_article', label: 'Online Article/Blog' },
    { value: 'advertisement', label: 'Advertisement' },
    { value: 'other', label: 'Other' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submitData = {
        ...formData,
        source,
        quizResults: quizResults ? JSON.stringify(quizResults) : undefined
      };

      const response = await fetch('/api/beta-signups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign up');
      }

      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-8 text-center"
      >
        <FontAwesomeIcon icon={faCheck} className="text-green-400 text-4xl mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">Welcome to JARVUS Beta! 🎉</h3>
        <p className="text-gray-300 mb-4">
          Thank you for signing up! We'll notify you as soon as JARVUS AI launches.
        </p>
        <p className="text-sm text-green-400">
          Keep an eye on your inbox for exclusive updates and early access.
        </p>
        {onClose && (
          <button
            onClick={onClose}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 transition-colors"
          >
            Continue
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/95 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-8 max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <FontAwesomeIcon icon={faRocket} className="text-cyan-400 text-3xl mb-4" />
        <h2 className="text-3xl font-bold text-white mb-2">Get Early Access to JARVUS AI</h2>
        <p className="text-gray-300">
          Be among the first to experience the AI career mentor that gets you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 font-medium mb-2">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
              placeholder="Your first name"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
              placeholder="Your last name"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-300 font-medium mb-2">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
            placeholder="your.email@example.com"
          />
        </div>

        {/* Current Status */}
        <div>
          <label className="block text-gray-300 font-medium mb-2">
            <FontAwesomeIcon icon={faGraduationCap} className="mr-2" />
            Current Status *
          </label>
          <select
            name="currentStatus"
            value={formData.currentStatus}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
          >
            <option value="">Select your current status</option>
            {currentStatusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Interest Area */}
        <div>
          <label className="block text-gray-300 font-medium mb-2">
            <FontAwesomeIcon icon={faBrain} className="mr-2" />
            Area of Interest
          </label>
          <select
            name="interestArea"
            value={formData.interestArea}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
          >
            <option value="">Select an area of interest (optional)</option>
            {interestAreaOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* University & Grad Year */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 font-medium mb-2">
              University/School
            </label>
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
              placeholder="Your school name"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Graduation Year
            </label>
            <input
              type="text"
              name="graduationYear"
              value={formData.graduationYear}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
              placeholder="e.g., 2025"
            />
          </div>
        </div>

        {/* How heard about us */}
        <div>
          <label className="block text-gray-300 font-medium mb-2">
            How did you hear about JARVUS?
          </label>
          <select
            name="howHeardAboutUs"
            value={formData.howHeardAboutUs}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors"
          >
            <option value="">Select an option (optional)</option>
            {howHeardOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Specific Interests */}
        <div>
          <label className="block text-gray-300 font-medium mb-2">
            What are you most interested in? (Optional)
          </label>
          <textarea
            name="specificInterests"
            value={formData.specificInterests}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none transition-colors resize-none"
            placeholder="Tell us what you're hoping to get out of JARVUS..."
          />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400">
            {error}
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <FontAwesomeIcon icon={faSpinner} className="mr-2 animate-spin" />
                Signing Up...
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faRocket} className="mr-2" />
                Get Early Access
              </>
            )}
          </button>
          
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-4 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default BetaSignupForm; 