import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import Analytics from '../utils/analytics';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [memberCount, setMemberCount] = useState(500);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  // Fetch member count on component mount
  useEffect(() => {
    const fetchMemberCount = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/founding-members/count`);
        if (response.ok) {
          const data = await response.json();
          setMemberCount(data.count);
        }
      } catch (error) {
        console.error('Error fetching member count:', error);
      }
    };
    
    fetchMemberCount();
  }, []);

  const handleFoundingMemberSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setMessage('Please enter your email address');
      setMessageType('error');
      return;
    }

    setIsSubmitting(true);
    setMessage('');
    
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/founding-members/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage(data.message || 'Welcome to the founding member community!');
        setMessageType('success');
        setEmail('');
        setMemberCount(prev => prev + 1);
        Analytics.trackInteraction('footer', 'founding_member_signup_success');
      } else {
        setMessage(data.message || 'Something went wrong. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setMessage('Network error. Please check your connection and try again.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialClick = (platform: string) => {
    Analytics.trackInteraction('footer', `social_click_${platform}`);
  };

  return (
    <footer className="relative bg-dark-background text-white py-16 px-4 overflow-hidden mt-auto border-t border-[#71ADBA]/10">
      {/* Gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-full blur-[100px] transform -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-[#9C71BA]/10 to-[#71ADBA]/10 rounded-full blur-[100px] transform translate-y-1/2"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {/* Company Info */}
        <div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3 mb-6 group"
          >
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <img 
                src="/logo.png" 
                alt="Kaiyl Logo" 
                className="w-full h-full relative z-10 drop-shadow-[0_0_10px_rgba(113,173,186,0.3)]"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] bg-clip-text text-transparent">
              K<span className="text-[#71ADBA]">ai</span>yl
            </span>
          </motion.div>
          <p className="text-gray-300 mb-6">
            Empowering students to make informed career decisions through data-driven guidance and personalized roadmaps.
          </p>
          <div className="flex space-x-4">
            <motion.a
              href="https://linkedin.com/company/kaiyl"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSocialClick('linkedin')}
              className="p-2 rounded-lg bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 hover:from-[#71ADBA]/20 hover:to-[#9C71BA]/20 border border-[#71ADBA]/20 transition-all"
            >
              <LinkedInIcon className="text-[#71ADBA]" />
            </motion.a>
            <motion.a
              href="https://twitter.com/kaiyl"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSocialClick('twitter')}
              className="p-2 rounded-lg bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 hover:from-[#71ADBA]/20 hover:to-[#9C71BA]/20 border border-[#71ADBA]/20 transition-all"
            >
              <TwitterIcon className="text-[#71ADBA]" />
            </motion.a>
            <motion.a
              href="https://instagram.com/kaiyl"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSocialClick('instagram')}
              className="p-2 rounded-lg bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 hover:from-[#71ADBA]/20 hover:to-[#9C71BA]/20 border border-[#71ADBA]/20 transition-all"
            >
              <InstagramIcon className="text-[#71ADBA]" />
            </motion.a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] bg-clip-text text-transparent">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <Link to="/about" className="text-gray-300 hover:text-[#71ADBA] transition-colors">About Us</Link>
            </li>
            <li>
              <Link to="/onboarding" className="text-gray-300 hover:text-[#71ADBA] transition-colors">Career Quiz</Link>
            </li>
            <li>
              <Link to="/career-roadmap" className="text-gray-300 hover:text-[#71ADBA] transition-colors">Career Roadmap</Link>
            </li>
            <li>
              <Link to="/major-selection" className="text-gray-300 hover:text-[#71ADBA] transition-colors">Major Selection</Link>
            </li>
            <li>
              <Link to="/resume-builder" className="text-gray-300 hover:text-[#71ADBA] transition-colors">Resume Builder</Link>
            </li>
            <li>
              <Link to="/resume-review" className="text-gray-300 hover:text-[#71ADBA] transition-colors">Resume Review</Link>
            </li>
          </ul>
        </div>

        {/* Coming Soon Features */}
        <div>
          <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] bg-clip-text text-transparent">Coming Soon</h3>
          <ul className="space-y-4">
            <motion.li 
              whileHover={{ x: 5 }}
              className="flex items-center space-x-3 p-2 rounded-lg bg-gradient-to-r from-[#71ADBA]/5 to-[#9C71BA]/5 hover:from-[#71ADBA]/10 hover:to-[#9C71BA]/10 transition-colors"
            >
              <TipsAndUpdatesIcon className="text-[#71ADBA]" />
              <span className="text-gray-300">Smart Career Guidance</span>
            </motion.li>
            <motion.li 
              whileHover={{ x: 5 }}
              className="flex items-center space-x-3 p-2 rounded-lg bg-gradient-to-r from-[#71ADBA]/5 to-[#9C71BA]/5 hover:from-[#71ADBA]/10 hover:to-[#9C71BA]/10 transition-colors"
            >
              <PeopleIcon className="text-[#71ADBA]" />
              <span className="text-gray-300">Mentor Matching</span>
            </motion.li>
            <motion.li 
              whileHover={{ x: 5 }}
              className="flex items-center space-x-3 p-2 rounded-lg bg-gradient-to-r from-[#71ADBA]/5 to-[#9C71BA]/5 hover:from-[#71ADBA]/10 hover:to-[#9C71BA]/10 transition-colors"
            >
              <SchoolIcon className="text-[#71ADBA]" />
              <span className="text-gray-300">University Reviews</span>
            </motion.li>
            <motion.li 
              whileHover={{ x: 5 }}
              className="flex items-center space-x-3 p-2 rounded-lg bg-gradient-to-r from-[#71ADBA]/5 to-[#9C71BA]/5 hover:from-[#71ADBA]/10 hover:to-[#9C71BA]/10 transition-colors"
            >
              <WorkspacePremiumIcon className="text-[#71ADBA]" />
              <span className="text-gray-300">Pro Career Tools</span>
            </motion.li>
          </ul>
        </div>

        {/* Founding Members */}
        <div className="relative">
          {/* Premium glow effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#71ADBA]/20 to-[#EDEAB1]/20 rounded-xl blur-lg opacity-75"></div>
          
          <div className="relative bg-gradient-to-br from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-xl p-6 border border-[#EDEAB1]/30">
            {/* Exclusive badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-full">
                🌟 EXCLUSIVE
              </span>
              <span className="text-xs text-[#EDEAB1] font-medium">Limited Spots</span>
            </div>
            
            <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-[#EDEAB1] via-[#71ADBA] to-[#9C71BA] bg-clip-text text-transparent">
              Help Shape the Future of Career Guidance
            </h3>
            <p className="text-gray-300 mb-2 text-sm leading-relaxed">
              Join our exclusive founding member community and co-create the next generation of career tools.
            </p>
            <div className="text-xs text-[#71ADBA] mb-4 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 bg-[#71ADBA] rounded-full"></span>
                <span>Early access to new features</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 bg-[#71ADBA] rounded-full"></span>
                <span>Behind-the-scenes development updates</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1 h-1 bg-[#71ADBA] rounded-full"></span>
                <span>Direct input on product roadmap</span>
              </div>
            </div>
            
            <form onSubmit={handleFoundingMemberSignup} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email for exclusive access"
                className="w-full px-4 py-3 rounded-lg bg-[#0a0f1a]/80 border border-[#EDEAB1]/30 text-white placeholder-gray-400 focus:outline-none focus:border-[#EDEAB1]/60 focus:ring-2 focus:ring-[#EDEAB1]/20 transition-all"
                disabled={isSubmitting}
              />
              <motion.button
                type="submit"
                whileHover={!isSubmitting ? { scale: 1.03, boxShadow: "0 0 25px rgba(237, 234, 177, 0.4)" } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#EDEAB1] via-[#71ADBA] to-[#9C71BA] text-black font-bold hover:opacity-95 transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                      Joining...
                    </>
                  ) : (
                    <>
                      🚀 Become a Founding Member
                    </>
                  )}
                </span>
              </motion.button>
              
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-xs text-center p-2 rounded ${
                    messageType === 'success' 
                      ? 'text-green-400 bg-green-400/10 border border-green-400/20' 
                      : 'text-red-400 bg-red-400/10 border border-red-400/20'
                  }`}
                >
                  {message}
                </motion.div>
              )}
              
              <p className="text-xs text-gray-500 text-center">
                Join {memberCount.toLocaleString()}+ founding members shaping the future
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-16 pt-8 border-t border-[#71ADBA]/10 text-center relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Kaiyl. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-[#71ADBA] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#71ADBA] transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-[#71ADBA] transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 