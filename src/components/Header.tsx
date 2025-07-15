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
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const services = [
    {
      name: 'Resume Builder',
      icon: DescriptionIcon,
      path: '/resume-builder',
      description: 'Create a professional resume'
    },
    {
      name: 'Career Roadmap',
      icon: RouteIcon,
      path: '/career-roadmap',
      description: 'Plan your career journey'
    },
    {
      name: 'Resume Review',
      icon: CreateIcon,
      path: '/resume-review',
      description: 'Get expert feedback'
    },
    {
      name: 'Interview Prep',
      icon: QuestionAnswerIcon,
      path: '/interview-templates',
      description: 'Practice with real questions'
    },
    {
      name: 'Website Builder',
      icon: LanguageIcon,
      path: '/website-service',
      description: 'Create your portfolio'
    },
    {
      name: 'Job Board',
      icon: WorkIcon,
      path: '/coming-soon-feature',
      description: 'Find your next role'
    }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-light-background/80 dark:bg-dark-background/80 backdrop-blur-lg border-b border-light-border dark:border-dark-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Pathly" className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-light-text dark:text-dark-text">Pathly</span>
            </Link>
            <div className="hidden md:flex md:ml-10 space-x-8">
              <Link to="/about" className="nav-link">About</Link>
              <div className="relative">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="nav-link flex items-center"
                >
                  Services
                  <KeyboardArrowDownIcon className={`ml-1 transform transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 w-64 mt-2 bg-light-background dark:bg-dark-backgroundSecondary rounded-lg shadow-lg border border-light-border dark:border-dark-border"
                    >
                      <div className="p-2">
                        {services.map((service) => (
                          <Link
                            key={service.name}
                            to={service.path}
                            onClick={() => setIsServicesOpen(false)}
                            className="flex items-start p-3 hover:bg-light-border/50 dark:hover:bg-dark-border/50 rounded-lg"
                          >
                            <service.icon className="w-5 h-5 mt-0.5 text-light-primary dark:text-dark-primary" />
                            <div className="ml-3">
                              <div className="text-light-text dark:text-dark-text font-medium">{service.name}</div>
                              <div className="text-sm text-light-textSoft dark:text-dark-textSoft">{service.description}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link to="/campus-life" className="nav-link">Campus Life</Link>
              <Link to="/internships" className="nav-link">
                Internships
                <span className="ml-1 text-xs bg-light-primary dark:bg-dark-primary text-white px-2 py-0.5 rounded-full">New</span>
              </Link>
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/announcements" className="nav-link">
              <NotificationsActiveIcon className="w-6 h-6" />
            </Link>
            <Link to="/pricing" className="nav-link">
              <WorkspacePremiumIcon className="w-6 h-6" />
              <span className="ml-2">Premium</span>
            </Link>
            <div className="relative">
              <button
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="nav-link flex items-center"
              >
                <SettingsIcon className="w-6 h-6" />
              </button>
              <AnimatePresence>
                {isSettingsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 w-48 mt-2 bg-light-background dark:bg-dark-backgroundSecondary rounded-lg shadow-lg border border-light-border dark:border-dark-border"
                  >
                    <div className="p-2">
                      <button
                        onClick={() => {
                          toggleTheme();
                          setIsSettingsOpen(false);
                        }}
                        className="w-full flex items-center p-3 hover:bg-light-border/50 dark:hover:bg-dark-border/50 rounded-lg"
                      >
                        {theme === 'dark' ? (
                          <LightModeIcon className="w-5 h-5 text-light-primary dark:text-dark-primary" />
                        ) : (
                          <DarkModeIcon className="w-5 h-5 text-light-primary dark:text-dark-primary" />
                        )}
                        <span className="ml-3 text-light-text dark:text-dark-text">
                          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                        </span>
                      </button>
                      <Link
                        to="/profile"
                        className="w-full flex items-center p-3 hover:bg-light-border/50 dark:hover:bg-dark-border/50 rounded-lg"
                        onClick={() => setIsSettingsOpen(false)}
                      >
                        <PersonIcon className="w-5 h-5 text-light-primary dark:text-dark-primary" />
                        <span className="ml-3 text-light-text dark:text-dark-text">Profile</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary"
            >
              {isOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-light-background dark:bg-dark-background border-t border-light-border dark:border-dark-border"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/about" className="mobile-nav-link">About</Link>
              <Link to="/campus-life" className="mobile-nav-link">Campus Life</Link>
              <Link to="/internships" className="mobile-nav-link">
                Internships
                <span className="ml-2 text-xs bg-light-primary dark:bg-dark-primary text-white px-2 py-0.5 rounded-full">New</span>
              </Link>
              <div className="border-t border-light-border dark:border-dark-border my-2"></div>
              {services.map((service) => (
                <Link
                  key={service.name}
                  to={service.path}
                  onClick={() => setIsOpen(false)}
                  className="mobile-nav-link"
                >
                  <div className="flex items-center">
                    <service.icon className="w-5 h-5 text-light-primary dark:text-dark-primary" />
                    <span className="ml-3">{service.name}</span>
                  </div>
                </Link>
              ))}
              <div className="border-t border-light-border dark:border-dark-border my-2"></div>
              <Link to="/announcements" className="mobile-nav-link">
                <div className="flex items-center">
                  <NotificationsActiveIcon className="w-5 h-5 text-light-primary dark:text-dark-primary" />
                  <span className="ml-3">Announcements</span>
                </div>
              </Link>
              <Link to="/pricing" className="mobile-nav-link">
                <div className="flex items-center">
                  <WorkspacePremiumIcon className="w-5 h-5 text-light-primary dark:text-dark-primary" />
                  <span className="ml-3">Premium</span>
                </div>
              </Link>
              <button
                onClick={() => {
                  toggleTheme();
                  setIsOpen(false);
                }}
                className="mobile-nav-link w-full text-left"
              >
                <div className="flex items-center">
                  {theme === 'dark' ? (
                    <LightModeIcon className="w-5 h-5 text-light-primary dark:text-dark-primary" />
                  ) : (
                    <DarkModeIcon className="w-5 h-5 text-light-primary dark:text-dark-primary" />
                  )}
                  <span className="ml-3">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </div>
              </button>
              <Link to="/profile" className="mobile-nav-link">
                <div className="flex items-center">
                  <PersonIcon className="w-5 h-5 text-light-primary dark:text-dark-primary" />
                  <span className="ml-3">Profile</span>
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header; 