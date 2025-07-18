import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faTimes, 
  faChevronDown,
  faUser,
  faCog,
  faSignOutAlt,
  faNewspaper,
  faUniversity,
  faChartLine,
  faCrown,
  faStar,
  faRocket,
  faBell,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shouldShowHeader, setShouldShowHeader] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0.95, 0.98]);
  const headerBlur = useTransform(scrollY, [0, 100], ["blur(8px)", "blur(16px)"]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0.1, 0.3]);
  
  const profileRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        setShouldShowHeader(true);
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY > lastScrollY) {
        setShouldShowHeader(false);
      } else {
        setShouldShowHeader(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Handle click outside profile dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getUserInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getAccountTypeConfig = (accountType: string) => {
    switch (accountType) {
      case 'PRO':
        return {
          gradient: 'from-[#71ADBA] to-[#9C71BA]',
          ring: 'ring-[#71ADBA]/30',
          badge: 'PRO',
          icon: faStar,
          glow: 'shadow-[0_0_20px_rgba(113,173,186,0.3)]'
        };
      case 'PREMIUM':
        return {
          gradient: 'from-yellow-400 to-orange-500',
          ring: 'ring-yellow-400/30',
          badge: 'PREMIUM',
          icon: faCrown,
          glow: 'shadow-[0_0_20px_rgba(251,191,36,0.3)]'
        };
      default:
        return {
          gradient: 'from-gray-500 to-gray-600',
          ring: 'ring-gray-500/20',
          badge: 'EXPLORER',
          icon: faSearch,
          glow: 'shadow-[0_0_10px_rgba(107,114,128,0.2)]'
        };
    }
  };

  const isPro = user?.accountType === 'PRO' || user?.accountType === 'PREMIUM';

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: shouldShowHeader ? 0 : -100 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <motion.div 
        style={{
          backgroundColor: `rgba(15, 20, 25, ${headerOpacity.get()})`,
          backdropFilter: headerBlur,
          WebkitBackdropFilter: headerBlur,
        }}
        className="border-b border-white/10"
      >
        <motion.div 
          className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#71ADBA]/20 to-transparent"
          style={{ opacity: borderOpacity }}
        />
        
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity"
                  whileHover={{ scale: 1.1 }}
                />
                <img 
                  src="/logo.svg" 
                  alt="Kaiyl" 
                  className="h-8 w-auto relative z-10" 
                />
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <motion.span 
                  className="ml-2 sm:ml-3 text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] bg-clip-text text-transparent"
                  whileHover={{ scale: 1.02 }}
                >
                  Kaiyl
                </motion.span>
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gradient-to-r from-emerald-400 to-emerald-600 text-white text-xs font-bold rounded-full shadow-lg"
                >
                  BETA
                </motion.span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <Link 
                to="/about" 
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                About
              </Link>
              
              <Link 
                to="/quiz" 
                className="text-gray-300 hover:text-white transition-colors font-medium flex items-center gap-2"
              >
                Career Quiz
                <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full font-semibold">
                  Free
                </span>
              </Link>

              {isPro && (
                <>
                  <Link 
                    to="/news" 
                    className="text-gray-300 hover:text-[#71ADBA] transition-colors font-medium flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faNewspaper} className="text-sm" />
                    <span className="hidden lg:inline">News Hub</span>
                    <span className="lg:hidden">News</span>
                    <span className="px-2 py-0.5 bg-[#71ADBA]/20 text-[#71ADBA] text-xs rounded-full font-semibold">
                      Pro
                    </span>
                  </Link>
                  
                  <Link 
                    to="/activity-dashboard" 
                    className="text-gray-300 hover:text-[#9C71BA] transition-colors font-medium flex items-center gap-2"
                  >
                    <FontAwesomeIcon icon={faChartLine} className="text-sm" />
                    <span className="hidden lg:inline">Analytics</span>
                  </Link>
                </>
              )}

              <Link 
                to="/pricing" 
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                Pricing
              </Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              
              {/* User Account */}
              {isAuthenticated && user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 lg:space-x-3 group"
                  >
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${getAccountTypeConfig(user.accountType).gradient} ${getAccountTypeConfig(user.accountType).glow} flex items-center justify-center text-white font-bold transition-all duration-300 group-hover:scale-105`}>
                        {getUserInitials(user.firstName, user.lastName)}
                      </div>
                      <div className={`absolute -inset-1 rounded-xl ring-2 ${getAccountTypeConfig(user.accountType).ring} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                      <div className="absolute -top-1 -right-1">
                        <FontAwesomeIcon 
                          icon={getAccountTypeConfig(user.accountType).icon} 
                          className={`text-xs ${user.accountType === 'PRO' ? 'text-[#EDEAB1]' : user.accountType === 'PREMIUM' ? 'text-yellow-300' : 'text-gray-400'}`}
                        />
                      </div>
                    </div>
                    
                    <div className="hidden lg:block text-left">
                      <div className="text-sm font-semibold text-white">
                        {user.firstName}
                      </div>
                      <div className="text-xs text-gray-400">
                        {getAccountTypeConfig(user.accountType).badge}
                      </div>
                    </div>
                    
                    <FontAwesomeIcon 
                      icon={faChevronDown} 
                      className={`text-gray-400 text-xs transform transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  <AnimatePresence>
                    {isProfileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute top-full right-0 w-72 mt-3 bg-[#1a2234] rounded-xl border border-[#71ADBA]/20 shadow-2xl backdrop-blur-xl"
                      >
                        {/* Profile Header */}
                        <div className="p-4 border-b border-[#71ADBA]/10">
                          <div className="flex items-center space-x-3">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getAccountTypeConfig(user.accountType).gradient} flex items-center justify-center text-white font-bold`}>
                              {getUserInitials(user.firstName, user.lastName)}
                            </div>
                            <div>
                              <div className="font-semibold text-white">
                                {user.firstName} {user.lastName}
                              </div>
                              <div className="text-sm text-gray-400">
                                {user.email}
                              </div>
                              <div className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                                user.accountType === 'PRO' 
                                  ? 'bg-[#71ADBA]/20 text-[#71ADBA]' 
                                  : user.accountType === 'PREMIUM'
                                    ? 'bg-yellow-500/20 text-yellow-300'
                                    : 'bg-gray-500/20 text-gray-400'
                              }`}>
                                <FontAwesomeIcon icon={getAccountTypeConfig(user.accountType).icon} />
                                {getAccountTypeConfig(user.accountType).badge}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="p-2">
                          <Link
                            to="/dashboard"
                            onClick={() => setIsProfileOpen(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#71ADBA]/10 transition-colors text-gray-300 hover:text-white"
                          >
                            <FontAwesomeIcon icon={faUser} className="text-sm" />
                            Dashboard
                          </Link>

                          {isPro && (
                            <>
                              <Link
                                to="/news"
                                onClick={() => setIsProfileOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#71ADBA]/10 transition-colors text-gray-300 hover:text-white"
                              >
                                <FontAwesomeIcon icon={faNewspaper} className="text-sm" />
                                News Hub
                                <span className="ml-auto px-2 py-0.5 bg-[#71ADBA]/20 text-[#71ADBA] text-xs rounded-full font-semibold">
                                  Pro
                                </span>
                              </Link>
                              
                              <Link
                                to="/activity-dashboard"
                                onClick={() => setIsProfileOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#71ADBA]/10 transition-colors text-gray-300 hover:text-white"
                              >
                                <FontAwesomeIcon icon={faChartLine} className="text-sm" />
                                Activity Dashboard
                              </Link>

                              <Link
                                to="/saved-articles"
                                onClick={() => setIsProfileOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#71ADBA]/10 transition-colors text-gray-300 hover:text-white"
                              >
                                <FontAwesomeIcon icon={faBell} className="text-sm" />
                                Saved Articles
                              </Link>
                            </>
                          )}

                          <button
                            onClick={() => {
                              toggleTheme();
                              setIsProfileOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#71ADBA]/10 transition-colors text-gray-300 hover:text-white"
                          >
                            <FontAwesomeIcon icon={faCog} className="text-sm" />
                            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                          </button>

                          <div className="border-t border-[#71ADBA]/10 my-2"></div>

                          {user.accountType === 'EXPLORER' && (
                            <Link
                              to="/signup/pro"
                              onClick={() => setIsProfileOpen(false)}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white hover:opacity-90 transition-opacity"
                            >
                              <FontAwesomeIcon icon={faRocket} className="text-sm" />
                              Upgrade to Pro
                            </Link>
                          )}

                          <button
                            onClick={() => {
                              logout();
                              setIsProfileOpen(false);
                              navigate('/');
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/10 transition-colors text-gray-300 hover:text-red-400"
                          >
                            <FontAwesomeIcon icon={faSignOutAlt} className="text-sm" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-white transition-colors font-medium text-sm lg:text-base"
                  >
                    Login
                  </Link>
                  <Link
                    to="/pricing"
                    className="px-3 py-1.5 lg:px-4 lg:py-2 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity text-sm lg:text-base"
                  >
                    Get Started
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-gray-300 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-xl" />
              </button>
            </div>
          </div>
        </nav>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1a2234]/95 backdrop-blur-xl border-t border-[#71ADBA]/20"
          >
            <div className="px-4 py-6 space-y-4">
              
              {/* User Profile (Mobile) */}
              {isAuthenticated && user && (
                <div className="bg-[#71ADBA]/10 rounded-xl p-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getAccountTypeConfig(user.accountType).gradient} flex items-center justify-center text-white font-bold`}>
                      {getUserInitials(user.firstName, user.lastName)}
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-sm text-gray-400">{user.email}</div>
                      <div className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs font-semibold ${
                        user.accountType === 'PRO' 
                          ? 'bg-[#71ADBA]/20 text-[#71ADBA]' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        <FontAwesomeIcon icon={getAccountTypeConfig(user.accountType).icon} />
                        {getAccountTypeConfig(user.accountType).badge}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Links */}
              <div className="space-y-2">
                {isAuthenticated && user ? (
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-3 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white font-semibold rounded-lg"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center py-3 border border-[#71ADBA] text-[#71ADBA] font-semibold rounded-lg"
                    >
                      Login
                    </Link>
                    <Link
                      to="/pricing"
                      onClick={() => setIsOpen(false)}
                      className="block w-full text-center py-3 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white font-semibold rounded-lg"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>

              <div className="border-t border-[#71ADBA]/20 pt-4 space-y-3">
                <Link
                  to="/about"
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  About
                </Link>
                <Link
                  to="/quiz"
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Career Quiz
                </Link>
                
                {isPro && (
                  <>
                    <Link
                      to="/news"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <FontAwesomeIcon icon={faNewspaper} />
                      News Hub
                    </Link>
                    <Link
                      to="/activity-dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <FontAwesomeIcon icon={faChartLine} />
                      Analytics
                    </Link>
                  </>
                )}
                
                <Link
                  to="/pricing"
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-300 hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </div>

              {isAuthenticated && user && (
                <div className="border-t border-[#71ADBA]/20 pt-4">
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                      navigate('/');
                    }}
                    className="block w-full text-left text-red-400 hover:text-red-300 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header; 