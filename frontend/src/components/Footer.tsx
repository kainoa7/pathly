import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import Analytics from '../utils/analytics';

const Footer = () => {
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

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] bg-clip-text text-transparent">Stay Updated</h3>
          <p className="text-gray-300 mb-6">Get the latest career insights and updates.</p>
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-[#71ADBA]/5 border border-[#71ADBA]/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#71ADBA]/50 transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white font-medium hover:opacity-90 transition-opacity"
              onClick={() => Analytics.trackInteraction('footer', 'newsletter_subscribe')}
            >
              Subscribe
            </motion.button>
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