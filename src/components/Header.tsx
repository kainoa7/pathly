import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DescriptionIcon from '@mui/icons-material/Description';
import RouteIcon from '@mui/icons-material/Route';
import CreateIcon from '@mui/icons-material/Create';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import LanguageIcon from '@mui/icons-material/Language';
import WorkIcon from '@mui/icons-material/Work';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const services = [
    {
      title: 'Resume Builder',
      description: 'Create a professional resume that stands out',
      icon: <CreateIcon className="w-5 h-5" />,
      path: '/services/resume-builder'
    },
    {
      title: 'Resume Review',
      description: 'Get expert feedback on your existing resume',
      icon: <DescriptionIcon className="w-5 h-5" />,
      path: '/services/resume-review'
    },
    {
      title: 'Career Roadmap',
      description: 'Personalized guide to your dream career',
      icon: <RouteIcon className="w-5 h-5" />,
      path: '/services/career-roadmap'
    },
    {
      title: 'Interview Templates',
      description: 'Major-specific interview prep templates',
      icon: <QuestionAnswerIcon className="w-5 h-5" />,
      path: '/services/interview-templates'
    },
    {
      title: 'Website Builder',
      description: 'Custom websites for your portfolio or business',
      icon: <LanguageIcon className="w-5 h-5" />,
      path: '/services/website-builder'
    }
  ];

  const navigationItems = [
    { label: 'About', path: '/about' },
    { 
      label: 'Services',
      path: '#',
      children: [
        { label: 'Career Roadmap', path: '/services/career-roadmap' },
        { label: 'Resume Builder', path: '/services/resume-builder' },
        { label: 'Resume Review', path: '/services/resume-review' }
      ]
    },
    { label: 'Campus Life', path: '/campus-life' },
    { label: 'Internships', path: '/internships', badge: 'New' },
    { label: 'Feedback', path: '/feedback' }
  ];

  return (
    <header className="bg-[#0f172a] py-3 px-6 sticky top-0 z-50 border-b border-gray-800">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110">
            <div className="absolute inset-0 bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-300"></div>
            <img 
              src="/logo.svg" 
              alt="Pathly Logo" 
              className="w-full h-full relative z-10 drop-shadow-[0_0_10px_rgba(113,173,186,0.3)] group-hover:drop-shadow-[0_0_15px_rgba(156,113,186,0.4)] transition-all duration-300"
            />
          </div>
          <span className="pathly-logo text-2xl bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] bg-clip-text text-transparent font-bold group-hover:opacity-90 transition-opacity">
            Pathly
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/about" className="text-gray-300 hover:text-[#71ADBA] transition-colors py-2">
            About
          </Link>
          
          {/* Services Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsServicesOpen(true)}
            onMouseLeave={() => setIsServicesOpen(false)}
          >
            <button 
              className="flex items-center text-gray-300 hover:text-[#71ADBA] transition-colors py-2"
            >
              <span>Services</span>
              <KeyboardArrowDownIcon className={`w-5 h-5 ml-1 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            
            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-72 bg-[#1a1f36] rounded-xl shadow-xl border border-gray-700 overflow-hidden"
                >
                  <div className="p-2">
                    {services.map((service, index) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        className="flex items-start space-x-4 p-3 hover:bg-[#2d3a4f] rounded-lg transition-colors"
                      >
                        <div className="p-2 bg-[#71ADBA]/10 rounded-lg text-[#71ADBA]">
                          {service.icon}
                        </div>
                        <div>
                          <div className="text-white font-medium">{service.title}</div>
                          <div className="text-sm text-gray-400">{service.description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link to="/campus-life" className="text-gray-300 hover:text-[#71ADBA] transition-colors py-2">
            Campus Life
          </Link>

          <Link to="/internships" className="flex items-center text-gray-300 hover:text-[#71ADBA] transition-colors py-2">
            <span>Internships</span>
            <div className="ml-2 px-2 py-0.5 text-xs bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-full">
              New
            </div>
          </Link>

          <Link
            to="/announcements"
            className="flex items-center space-x-1 text-gray-300 hover:text-[#71ADBA] transition-colors py-2"
          >
            <NotificationsActiveIcon className="w-5 h-5" />
            <span>Announcements</span>
          </Link>

          <Link
            to="/pricing"
            className="flex items-center space-x-1 text-gray-300 hover:text-[#71ADBA] transition-colors py-2"
          >
            <WorkspacePremiumIcon className="w-5 h-5" />
            <span>Premium</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          {isOpen ? (
            <CloseIcon className="w-6 h-6 text-gray-300" />
          ) : (
            <MenuIcon className="w-6 h-6 text-gray-300" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="py-4 space-y-2">
              <Link
                to="/about"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              {services.map((service) => (
                <Link
                  key={service.path}
                  to={service.path}
                  className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {service.title}
                </Link>
              ))}
              <Link
                to="/campus-life"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Campus Life
              </Link>
              <Link
                to="/internships"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center">
                  <span>Internships</span>
                  <div className="ml-2 px-2 py-0.5 text-xs bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-full">
                    New
                  </div>
                </div>
              </Link>
              <Link
                to="/announcements"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Announcements
              </Link>
              <Link
                to="/pricing"
                className="block px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Premium
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header; 