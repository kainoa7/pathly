import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft,
  faChartLine,
  faNewspaper,
  faComments,
  faStar,
  faBell,
  faUsers,
  faSignOutAlt,
  faTachometerAlt,
  faRocket
} from '@fortawesome/free-solid-svg-icons';

interface AdminNavProps {
  title: string;
  description?: string;
  showBackButton?: boolean;
}

const AdminNav: React.FC<AdminNavProps> = ({ 
  title, 
  description = "Manage and monitor your platform", 
  showBackButton = true 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminLoginTime');
    navigate('/admin/login');
  };

  const navItems = [
    { path: '/admin/dashboard', icon: faTachometerAlt, label: 'Dashboard', color: 'from-blue-500 to-blue-600' },
    { path: '/admin/beta-signups', icon: faRocket, label: 'Beta Signups', color: 'from-green-500 to-green-600' },
    { path: '/admin/analytics', icon: faChartLine, label: 'Analytics', color: 'from-purple-500 to-purple-600' },
    { path: '/admin/news', icon: faNewspaper, label: 'News', color: 'from-cyan-500 to-cyan-600' },
    { path: '/admin/feedback', icon: faComments, label: 'Feedback', color: 'from-pink-500 to-pink-600' },
    { path: '/admin/founding-members', icon: faStar, label: 'Members', color: 'from-yellow-500 to-orange-500' },
    { path: '/admin/notifications', icon: faBell, label: 'Notifications', color: 'from-indigo-500 to-purple-600' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/95 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Row */}
        <div className="flex items-center justify-between py-4">
          {/* Left Side - Back Button & Title */}
          <div className="flex items-center space-x-4">
            {showBackButton && location.pathname !== '/admin/dashboard' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/admin/dashboard')}
                className="flex items-center space-x-2 px-3 py-2 bg-slate-800 text-gray-300 rounded-lg hover:bg-slate-700 hover:text-white transition-all duration-200"
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                <span className="hidden sm:inline">Back</span>
              </motion.button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-white">{title}</h1>
              <p className="text-sm text-gray-400">{description}</p>
            </div>
          </div>

          {/* Right Side - User & Logout */}
          <div className="flex items-center space-x-3">
            <div className="text-right mr-3">
              <p className="text-sm font-medium text-white">Admin</p>
              <p className="text-xs text-gray-400">JARVUS AI</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              <span className="hidden sm:inline">Logout</span>
            </motion.button>
          </div>
        </div>

        {/* Navigation Row */}
        <div className="flex items-center space-x-1 pb-4 overflow-x-auto">
          {navItems.map((item) => (
            <motion.button
              key={item.path}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(item.path)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                isActive(item.path)
                  ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                  : 'text-gray-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <FontAwesomeIcon icon={item.icon} />
              <span>{item.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminNav; 