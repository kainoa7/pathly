import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTimes, 
  faCheck, 
  faCheckDouble, 
  faExclamationTriangle,
  faInfo,
  faRocket,
  faBullhorn,
  faUsers,
  faWrench,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'APP_UPDATE' | 'FEATURE_ANNOUNCEMENT' | 'COMMUNITY_NEWS' | 'MAINTENANCE' | 'GENERAL';
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
  createdAt: string;
  expiresAt?: string;
  isRead: boolean;
  readAt?: string;
}

interface NotificationsCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onNotificationRead?: () => void;
}

const NotificationsCenter: React.FC<NotificationsCenterProps> = ({ 
  isOpen, 
  onClose, 
  onNotificationRead 
}) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [markingAllRead, setMarkingAllRead] = useState(false);

  const isPro = user?.accountType === 'PRO' || user?.accountType === 'PREMIUM';

  // Fetch notifications
  const fetchNotifications = async () => {
    if (!isPro || !user) return;

    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${apiUrl}/api/notifications`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-user-id': user.id,
          'x-account-type': user.accountType
        }
      });

      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications || []);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    if (!user) return;

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${apiUrl}/api/notifications/${notificationId}/read`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-user-id': user.id,
          'x-account-type': user.accountType
        }
      });

      if (response.ok) {
        // Update local state
        setNotifications(prev => prev.map(notif => 
          notif.id === notificationId 
            ? { ...notif, isRead: true, readAt: new Date().toISOString() }
            : notif
        ));
        onNotificationRead?.();
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    if (!user) return;

    try {
      setMarkingAllRead(true);
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const token = localStorage.getItem('authToken');
      
      const response = await fetch(`${apiUrl}/api/notifications/mark-all-read`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-user-id': user.id,
          'x-account-type': user.accountType
        }
      });

      if (response.ok) {
        // Update local state
        setNotifications(prev => prev.map(notif => ({
          ...notif,
          isRead: true,
          readAt: new Date().toISOString()
        })));
        onNotificationRead?.();
      }
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    } finally {
      setMarkingAllRead(false);
    }
  };

  // Fetch notifications when opened
  useEffect(() => {
    if (isOpen && isPro) {
      fetchNotifications();
    }
  }, [isOpen, isPro]);

  // Get icon for notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'APP_UPDATE':
        return faRocket;
      case 'FEATURE_ANNOUNCEMENT':
        return faBullhorn;
      case 'COMMUNITY_NEWS':
        return faUsers;
      case 'MAINTENANCE':
        return faWrench;
      default:
        return faInfo;
    }
  };

  // Get color scheme for notification type
  const getNotificationColors = (type: string, priority: string) => {
    if (priority === 'URGENT') {
      return 'border-red-500/50 bg-red-500/10 text-red-300';
    }
    if (priority === 'HIGH') {
      return 'border-orange-500/50 bg-orange-500/10 text-orange-300';
    }
    
    switch (type) {
      case 'APP_UPDATE':
        return 'border-blue-500/50 bg-blue-500/10 text-blue-300';
      case 'FEATURE_ANNOUNCEMENT':
        return 'border-green-500/50 bg-green-500/10 text-green-300';
      case 'COMMUNITY_NEWS':
        return 'border-purple-500/50 bg-purple-500/10 text-purple-300';
      case 'MAINTENANCE':
        return 'border-yellow-500/50 bg-yellow-500/10 text-yellow-300';
      default:
        return 'border-gray-500/50 bg-gray-500/10 text-gray-300';
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) {
      return 'Just now';
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Notification Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-dark-backgroundSecondary border-l border-dark-border z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-dark-border bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] flex items-center justify-center">
                    <FontAwesomeIcon icon={faBullhorn} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Notifications</h2>
                    <p className="text-sm text-gray-400">
                      {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>

              {/* Mark all read button */}
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  disabled={markingAllRead}
                  className="w-full py-2 px-4 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <FontAwesomeIcon icon={faCheckDouble} />
                  {markingAllRead ? 'Marking all read...' : 'Mark all as read'}
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center h-32">
                  <div className="w-8 h-8 border-2 border-[#71ADBA]/30 border-t-[#71ADBA] rounded-full animate-spin"></div>
                </div>
              ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center px-6">
                  <div className="text-6xl mb-4">🔔</div>
                  <h3 className="text-lg font-semibold text-white mb-2">No notifications yet</h3>
                  <p className="text-gray-400">
                    You'll receive app updates and important announcements here.
                  </p>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  {notifications.map((notification, index) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-lg ${
                        notification.isRead 
                          ? 'border-gray-700/50 bg-gray-700/10' 
                          : getNotificationColors(notification.type, notification.priority)
                      }`}
                      onClick={() => !notification.isRead && markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          notification.isRead ? 'bg-gray-600' : 'bg-gradient-to-r from-[#71ADBA] to-[#9C71BA]'
                        }`}>
                          <FontAwesomeIcon 
                            icon={getNotificationIcon(notification.type)} 
                            className="text-white text-sm" 
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`font-semibold ${
                              notification.isRead ? 'text-gray-300' : 'text-white'
                            }`}>
                              {notification.title}
                            </h4>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            )}
                          </div>
                          
                          <p className={`text-sm mb-2 ${
                            notification.isRead ? 'text-gray-400' : 'text-gray-300'
                          }`}>
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <FontAwesomeIcon icon={faClock} />
                              {formatDate(notification.createdAt)}
                            </span>
                            
                            {notification.priority === 'HIGH' && (
                              <span className="px-2 py-0.5 bg-orange-500/20 text-orange-300 text-xs rounded-full">
                                High Priority
                              </span>
                            )}
                            {notification.priority === 'URGENT' && (
                              <span className="px-2 py-0.5 bg-red-500/20 text-red-300 text-xs rounded-full">
                                Urgent
                              </span>
                            )}
                          </div>

                          {notification.isRead && notification.readAt && (
                            <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                              <FontAwesomeIcon icon={faCheck} />
                              Read {formatDate(notification.readAt)}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-dark-border bg-dark-background/50">
              <p className="text-xs text-gray-500 text-center">
                🔔 Pro exclusive notifications • Updates every 30 seconds
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationsCenter; 