import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCircle } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

interface NotificationBellProps {
  onClick?: () => void;
  className?: string;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ onClick, className = '' }) => {
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const isPro = user?.accountType === 'PRO' || user?.accountType === 'PREMIUM';

  // Fetch unread notification count
  const fetchUnreadCount = async () => {
    if (!isPro || !user) return;

    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${apiUrl}/api/notifications/unread-count`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-user-id': user.id,
          'x-account-type': user.accountType
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (error) {
      console.error('Error fetching unread count:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch unread count on mount and set up interval
  useEffect(() => {
    if (isPro) {
      fetchUnreadCount();
      
      // Refresh every 30 seconds
      const interval = setInterval(fetchUnreadCount, 30000);
      return () => clearInterval(interval);
    }
  }, [isPro, user?.id]);

  // Update count when user changes
  useEffect(() => {
    if (isPro) {
      fetchUnreadCount();
    } else {
      setUnreadCount(0);
    }
  }, [user?.accountType]);

  if (!isPro) {
    return null;
  }

  return (
    <motion.button
      onClick={onClick}
      className={`relative p-2 text-gray-300 hover:text-white transition-colors ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Bell Icon */}
      <FontAwesomeIcon icon={faBell} className="text-lg" />
      
      {/* Unread Count Badge */}
      <AnimatePresence>
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Flashing Red Dot for New Notifications */}
      <AnimatePresence>
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [1, 0.7, 1]
            }}
            exit={{ scale: 0 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-0.5 -right-0.5 w-3 h-3"
          >
            <FontAwesomeIcon 
              icon={faCircle} 
              className="text-red-400 text-xs animate-pulse" 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading indicator */}
      {loading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-full h-full border border-gray-500 border-t-white rounded-full opacity-30"
        />
      )}
    </motion.button>
  );
};

export default NotificationBell; 