import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
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
import LoginIcon from '@mui/icons-material/Login';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shouldShowHeader, setShouldShowHeader] = useState(true);
  const [isSignUpHovered, setIsSignUpHovered] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(var(--background-start-rgb), 0)", "rgba(var(--background-start-rgb), 0.85)"]
  );
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(0px)", "blur(8px)"]
  );
  const borderOpacity = useTransform(
    scrollY,
    [0, 100],
    [0, 0.8]
  );
  const textOpacity = useTransform(
    scrollY,
    [0, 100],
    [0.85, 1]
  );
  
  // Add refs for dropdown containers
  const servicesRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Always show header at the top of the page
      if (currentScrollY < 100) {
        setShouldShowHeader(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setShouldShowHeader(false);
      } else {
        // Scrolling up
        setShouldShowHeader(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Services dropdown
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
      // Profile dropdown
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get user initials for profile display
  const getUserInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  // Get account type styling
  const getAccountTypeStyle = (accountType: string) => {
    switch (accountType) {
      case 'PRO':
        return {
          ring: 'ring-4 ring-gradient-to-r from-[#71ADBA] to-[#9C71BA] ring-opacity-75',
          bg: 'bg-gradient-to-r from-[#71ADBA] to-[#9C71BA]',
          glow: 'shadow-lg shadow-[#71ADBA]/30',
          badge: '✨ PRO'
        };
      case 'PREMIUM':
        return {
          ring: 'ring-4 ring-yellow-400 ring-opacity-75',
          bg: 'bg-gradient-to-r from-yellow-400 to-orange-500',
          glow: 'shadow-lg shadow-yellow-400/30',
          badge: '👑 PREMIUM'
        };
      default: // EXPLORER
        return {
          ring: 'ring-4 ring-gray-400 ring-opacity-50',
          bg: 'bg-gradient-to-r from-gray-400 to-gray-600',
          glow: 'shadow-lg shadow-gray-400/20',
          badge: '🔍 EXPLORER'
        };
    }
  };

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
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: shouldShowHeader ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
        WebkitBackdropFilter: backdropBlur,
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-bg"
    >
      <motion.div 
        className="h-[1px] w-full bg-light-border dark:bg-dark-border"
        style={{ opacity: borderOpacity }}
      />
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Main Navigation */}
          <motion.div className="flex items-center" style={{ opacity: textOpacity }}>
            <Link 
              to="/" 
              className="flex items-center group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <img 
                  src="/logo.svg" 
                  alt="Kaiyl" 
                  className="h-8 w-auto relative z-10 drop-shadow-[0_0_10px_rgba(113,173,186,0.3)]" 
                />
              </div>
              <motion.span 
                className="ml-2 text-xl font-bold bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] bg-clip-text text-transparent font-outfit tracking-tight drop-shadow-sm"
                whileHover={{ scale: 1.02 }}
              >
                K<motion.span 
                  className="text-[#71ADBA] inline-block"
                  animate={{ 
                    y: [0, -3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  ai
                </motion.span>yl
              </motion.span>
            </Link>
            <div className="hidden md:flex md:ml-10 space-x-8">
              <Link 
                to="/about" 
                className="nav-link font-cabinet font-medium text-base hover:text-light-primary dark:hover:text-dark-primary transition-colors"
              >
                About
              </Link>
              <div className="relative" ref={servicesRef}>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="nav-link font-cabinet font-medium text-base flex items-center hover:text-light-primary dark:hover:text-dark-primary transition-colors"
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
                            className="flex items-start p-3 hover:bg-light-border/50 dark:hover:bg-dark-border/50 rounded-lg group transition-colors"
                          >
                            <service.icon className="w-5 h-5 mt-0.5 text-light-primary dark:text-dark-primary" />
                            <div className="ml-3">
                              <div className="font-cabinet font-medium text-light-text dark:text-dark-text group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors">
                                {service.name}
                              </div>
                              <div className="text-sm font-space text-light-textSoft dark:text-dark-textSoft">
                                {service.description}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link 
                to="/campus-life" 
                className="nav-link font-cabinet font-medium text-base hover:text-light-primary dark:hover:text-dark-primary transition-colors"
              >
                Campus Life
              </Link>
              <Link 
                to="/internships" 
                className="nav-link font-cabinet font-medium text-base hover:text-light-primary dark:hover:text-dark-primary transition-colors flex items-center"
              >
                Career Discovery
                <motion.span 
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="ml-1 text-xs bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-2 py-0.5 rounded-full"
                >
                  New
                </motion.span>
              </Link>
            </div>
          </motion.div>

          {/* Right Side Navigation */}
          <motion.div 
            className="hidden md:flex md:items-center md:space-x-6"
            style={{ opacity: textOpacity }}
          >
            {/* Account Section */}
            {isAuthenticated && user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 nav-link group"
                >
                  <div className="relative">
                    <div className={`w-10 h-10 rounded-full ${getAccountTypeStyle(user.accountType).bg} ${getAccountTypeStyle(user.accountType).glow} flex items-center justify-center text-white font-semibold text-sm transition-all duration-300 group-hover:scale-105`}>
                      {getUserInitials(user.firstName, user.lastName)}
                    </div>
                    <div className={`absolute -inset-1 rounded-full ${getAccountTypeStyle(user.accountType).ring} animate-pulse`}></div>
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="text-sm font-medium text-light-text dark:text-dark-text">
                      {user.firstName} {user.lastName}
                    </div>
                    <div className="text-xs text-light-textSoft dark:text-dark-textSoft">
                      {getAccountTypeStyle(user.accountType).badge}
                    </div>
                  </div>
                  <KeyboardArrowDownIcon className={`transform transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full right-0 w-64 mt-2 bg-light-background dark:bg-dark-backgroundSecondary rounded-lg shadow-lg border border-light-border dark:border-dark-border"
                    >
                      <div className="p-2">
                        <div className="px-3 py-2 border-b border-light-border dark:border-dark-border">
                          <div className="font-medium text-light-text dark:text-dark-text">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-light-textSoft dark:text-dark-textSoft">
                            {user.email}
                          </div>
                          <div className="text-xs mt-1 px-2 py-1 rounded-full bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 text-[#71ADBA] dark:text-[#71ADBA] inline-block">
                            {getAccountTypeStyle(user.accountType).badge}
                          </div>
                        </div>
                        <Link
                          to="/dashboard"
                          className="flex items-center p-3 hover:bg-light-border/50 dark:hover:bg-dark-border/50 rounded-lg"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <PersonIcon className="w-5 h-5 text-light-primary dark:text-dark-primary" />
                          <span className="ml-3 text-light-text dark:text-dark-text">Dashboard</span>
                        </Link>
                        <button
                          onClick={() => {
                            toggleTheme();
                            setIsProfileOpen(false);
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
                        <div className="border-t border-light-border dark:border-dark-border my-1"></div>
                        <button
                          onClick={() => {
                            logout();
                            setIsProfileOpen(false);
                            window.location.href = '/';
                          }}
                          className="w-full flex items-center p-3 hover:bg-light-border/50 dark:hover:bg-dark-border/50 rounded-lg text-red-500"
                        >
                          <LoginIcon className="w-5 h-5" />
                          <span className="ml-3">Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="nav-link font-cabinet font-medium text-base hover:text-light-primary dark:hover:text-dark-primary transition-colors flex items-center"
                >
                  <LoginIcon className="w-5 h-5 mr-1" />
                  Login
                </Link>
                <div className="relative">
                <Link
                  to="/pricing"
                    onMouseEnter={() => setIsSignUpHovered(true)}
                    onMouseLeave={() => setIsSignUpHovered(false)}
                    className="relative px-5 py-2 rounded-lg bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white font-medium hover:opacity-95 transition-all duration-300"
                >
                  <span className="relative z-10">Sign Up</span>
                    <AnimatePresence>
                      {isSignUpHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute top-full right-0 mt-1 whitespace-nowrap bg-[#1E2537] px-3 py-1.5 rounded-lg text-sm text-[#EDEAB1] font-medium"
                        >
                          🚀 Get started free — takes 10 sec
                        </motion.div>
                      )}
                    </AnimatePresence>
                </Link>
              </div>
              </>
            )}
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary transition-colors"
            >
              {isOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-light-background dark:bg-dark-background border-t border-light-border dark:border-dark-border"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isAuthenticated && user ? (
                <>
                  <div className="px-3 py-4 bg-light-border/20 dark:bg-dark-border/20 rounded-lg mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-full ${getAccountTypeStyle(user.accountType).bg} ${getAccountTypeStyle(user.accountType).glow} flex items-center justify-center text-white font-semibold`}>
                          {getUserInitials(user.firstName, user.lastName)}
                        </div>
                        <div className={`absolute -inset-1 rounded-full ${getAccountTypeStyle(user.accountType).ring} animate-pulse`}></div>
                      </div>
                      <div>
                        <div className="font-medium text-light-text dark:text-dark-text">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-light-textSoft dark:text-dark-textSoft">
                          {user.email}
                        </div>
                        <div className="text-xs mt-1 px-2 py-1 rounded-full bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 text-[#71ADBA] inline-block">
                          {getAccountTypeStyle(user.accountType).badge}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    className="mobile-nav-link w-full flex items-center justify-center bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Go to Dashboard
                  </Link>
                  <div className="border-t border-light-border dark:border-dark-border my-2"></div>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="mobile-nav-link w-full flex items-center justify-center bg-light-border/20 dark:bg-dark-border/20"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/pricing"
                    className="mobile-nav-link w-full flex items-center justify-center bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white"
                  >
                    Sign Up
                  </Link>
                  <div className="border-t border-light-border dark:border-dark-border my-2"></div>
                </>
              )}
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
              {isAuthenticated && user ? (
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                    window.location.href = '/';
                  }}
                  className="mobile-nav-link w-full text-left text-red-500"
                >
                  <div className="flex items-center">
                    <LoginIcon className="w-5 h-5" />
                    <span className="ml-3">Sign Out</span>
                  </div>
                </button>
              ) : null}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header; 