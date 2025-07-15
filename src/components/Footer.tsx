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
    <footer className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white py-16 px-4 overflow-hidden mt-auto">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[100%] opacity-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 300 + 50}px`,
                height: `${Math.random() * 300 + 50}px`,
                background: `radial-gradient(circle, rgba(113,173,186,0.3) 0%, rgba(156,113,186,0.1) 100%)`,
                transform: `rotate(${Math.random() * 360}deg)`,
                animation: `float ${Math.random() * 10 + 10}s infinite linear`
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {/* Company Info */}
        <div>
          <div className="flex items-center space-x-3 mb-4 group">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 rounded-full blur-lg"></div>
              <img 
                src="/logo.svg" 
                alt="Pathly Logo" 
                className="w-full h-full relative z-10 drop-shadow-[0_0_10px_rgba(113,173,186,0.3)]"
              />
            </div>
            <span className="pathly-logo text-2xl bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] bg-clip-text text-transparent font-bold">
              Pathly
            </span>
          </div>
          <p className="text-gray-300 mb-4">
            Empowering students to make informed career decisions through data-driven guidance and personalized roadmaps.
          </p>
          <div className="flex space-x-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSocialClick('linkedin')}
              className="text-gray-400 hover:text-[#71ADBA] transition-colors"
            >
              <LinkedInIcon />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSocialClick('twitter')}
              className="text-gray-400 hover:text-[#71ADBA] transition-colors"
            >
              <TwitterIcon />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSocialClick('instagram')}
              className="text-gray-400 hover:text-[#71ADBA] transition-colors"
            >
              <InstagramIcon />
            </motion.a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about" className="text-gray-300 hover:text-[#71ADBA] transition-colors">About Us</Link>
            </li>
            <li>
              <Link to="/onboarding" className="text-gray-300 hover:text-[#71ADBA] transition-colors">Career Quiz</Link>
            </li>
            <li>
              <Link to="/services/career-roadmap" className="text-gray-300 hover:text-[#71ADBA] transition-colors">Career Roadmap</Link>
            </li>
            <li>
              <Link to="/major-selection" className="text-gray-300 hover:text-[#71ADBA] transition-colors">Major Selection</Link>
            </li>
            <li>
              <Link to="/services/resume-builder" className="text-gray-300 hover:text-[#71ADBA] transition-colors">Resume Builder</Link>
            </li>
            <li>
              <Link to="/services/resume-review" className="text-gray-300 hover:text-[#71ADBA] transition-colors">Resume Review</Link>
            </li>
          </ul>
        </div>

        {/* Coming Soon Features */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Coming Soon</h3>
          <ul className="space-y-4">
            <li className="flex items-center space-x-2">
              <TipsAndUpdatesIcon className="text-[#71ADBA]" />
              <span className="text-gray-300">Smart Career Guidance</span>
            </li>
            <li className="flex items-center space-x-2">
              <PeopleIcon className="text-[#71ADBA]" />
              <span className="text-gray-300">Mentor Matching</span>
            </li>
            <li className="flex items-center space-x-2">
              <SchoolIcon className="text-[#71ADBA]" />
              <span className="text-gray-300">University Reviews</span>
            </li>
            <li className="flex items-center space-x-2">
              <WorkspacePremiumIcon className="text-[#71ADBA]" />
              <span className="text-gray-300">Pro Career Tools</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
          <p className="text-gray-300 mb-4">Get the latest career insights and updates.</p>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#71ADBA]"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-2 w-full px-4 py-2 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-lg font-medium"
              onClick={() => Analytics.trackInteraction('footer', 'newsletter_subscribe')}
            >
              Subscribe
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-16 pt-8 pb-20 md:pb-8 border-t border-gray-700 text-center relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Pathly. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-[#71ADBA] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#71ADBA] transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-[#71ADBA] transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes float {
            0% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(20px, 20px) rotate(180deg); }
            100% { transform: translate(0, 0) rotate(360deg); }
          }
        `}
      </style>
    </footer>
  );
};

export default Footer; 