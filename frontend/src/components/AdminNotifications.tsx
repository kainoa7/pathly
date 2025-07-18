import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faPlus, 
  faBell, 
  faEdit, 
  faTrash, 
  faEye,
  faEyeSlash,
  faRocket,
  faBullhorn,
  faUsers,
  faWrench,
  faInfo,
  faExclamationTriangle,
  faChartLine,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'APP_UPDATE' | 'FEATURE_ANNOUNCEMENT' | 'COMMUNITY_NEWS' | 'MAINTENANCE' | 'GENERAL';
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
  targetAudience: string;
  isActive: boolean;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
  analytics: {
    totalSent: number;
    totalRead: number;
    readRate: string;
    unreadCount: number;
  };
}

interface NotificationForm {
  title: string;
  message: string;
  type: 'APP_UPDATE' | 'FEATURE_ANNOUNCEMENT' | 'COMMUNITY_NEWS' | 'MAINTENANCE' | 'GENERAL';
  priority: 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
  targetAudience: 'PRO' | 'PREMIUM' | 'ALL_PRO';
  expiresAt: string;
}

const AdminNotifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingNotification, setEditingNotification] = useState<Notification | null>(null);
  const [analytics, setAnalytics] = useState({
    totalNotifications: 0,
    activeNotifications: 0,
    totalSent: 0,
    totalRead: 0,
    overallReadRate: '0',
    proUserCount: 0
  });

  const [form, setForm] = useState<NotificationForm>({
    title: '',
    message: '',
    type: 'GENERAL',
    priority: 'NORMAL',
    targetAudience: 'PRO',
    expiresAt: ''
  });

  // Check admin authentication
  useEffect(() => {
    const isAdminAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
      return;
    }

    fetchNotifications();
    fetchAnalytics();
  }, [navigate]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/notifications/admin', {
        headers: {
          'x-admin-auth': 'true'
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

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/notifications/admin/analytics', {
        headers: {
          'x-admin-auth': 'true'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAnalytics(data.analytics);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const handleCreateNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/notifications/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-auth': 'true'
        },
        body: JSON.stringify({
          ...form,
          expiresAt: form.expiresAt ? new Date(form.expiresAt).toISOString() : null
        })
      });

      if (response.ok) {
        setShowCreateForm(false);
        setForm({
          title: '',
          message: '',
          type: 'GENERAL',
          priority: 'NORMAL',
          targetAudience: 'PRO',
          expiresAt: ''
        });
        fetchNotifications();
        fetchAnalytics();
      }
    } catch (error) {
      console.error('Error creating notification:', error);
    }
  };

  const handleDeleteNotification = async (id: string) => {
    if (!confirm('Are you sure you want to delete this notification?')) return;

    try {
      const response = await fetch(`/api/notifications/admin/${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-auth': 'true'
        }
      });

      if (response.ok) {
        fetchNotifications();
        fetchAnalytics();
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const toggleNotificationStatus = async (notification: Notification) => {
    try {
      const response = await fetch(`/api/notifications/admin/${notification.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-auth': 'true'
        },
        body: JSON.stringify({
          ...notification,
          isActive: !notification.isActive
        })
      });

      if (response.ok) {
        fetchNotifications();
      }
    } catch (error) {
      console.error('Error updating notification:', error);
    }
  };

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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return 'text-red-500 bg-red-500/20 border-red-500/50';
      case 'HIGH':
        return 'text-orange-500 bg-orange-500/20 border-orange-500/50';
      case 'NORMAL':
        return 'text-blue-500 bg-blue-500/20 border-blue-500/50';
      case 'LOW':
        return 'text-gray-500 bg-gray-500/20 border-gray-500/50';
      default:
        return 'text-gray-500 bg-gray-500/20 border-gray-500/50';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-background pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-xl">Loading notifications...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-background pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <FontAwesomeIcon icon={faBell} className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Notification Management
                </h1>
                <p className="text-gray-400">Send updates and announcements to Pro users</p>
              </div>
            </div>
          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-dark-backgroundSecondary rounded-xl p-6 border border-dark-border"
            >
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faBell} className="text-blue-400 text-2xl" />
                <div>
                  <div className="text-2xl font-bold text-white">{analytics.totalNotifications}</div>
                  <div className="text-blue-200 text-sm">Total Notifications</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-dark-backgroundSecondary rounded-xl p-6 border border-dark-border"
            >
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faUsers} className="text-green-400 text-2xl" />
                <div>
                  <div className="text-2xl font-bold text-white">{analytics.proUserCount}</div>
                  <div className="text-green-200 text-sm">Pro Users</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-dark-backgroundSecondary rounded-xl p-6 border border-dark-border"
            >
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faPaperPlane} className="text-purple-400 text-2xl" />
                <div>
                  <div className="text-2xl font-bold text-white">{analytics.totalSent}</div>
                  <div className="text-purple-200 text-sm">Total Sent</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-dark-backgroundSecondary rounded-xl p-6 border border-dark-border"
            >
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faChartLine} className="text-yellow-400 text-2xl" />
                <div>
                  <div className="text-2xl font-bold text-white">{analytics.overallReadRate}%</div>
                  <div className="text-yellow-200 text-sm">Read Rate</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Create Notification Button */}
          <button
            onClick={() => setShowCreateForm(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} />
            Send New Notification
          </button>
        </motion.div>

        {/* Create/Edit Form Modal */}
        <AnimatePresence>
          {showCreateForm && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={() => setShowCreateForm(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="fixed inset-0 flex items-center justify-center z-50 p-4"
              >
                <div className="bg-dark-backgroundSecondary rounded-xl p-6 border border-dark-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <h2 className="text-2xl font-bold text-white mb-6">Send New Notification</h2>
                  
                  <form onSubmit={handleCreateNotification} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                      <input
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-background border border-dark-border rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                        placeholder="Notification title..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                      <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3 bg-dark-background border border-dark-border rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                        placeholder="Notification message..."
                        rows={4}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                        <select
                          value={form.type}
                          onChange={(e) => setForm({ ...form, type: e.target.value as any })}
                          className="w-full px-4 py-3 bg-dark-background border border-dark-border rounded-lg text-white focus:border-blue-400 focus:outline-none"
                        >
                          <option value="GENERAL">General</option>
                          <option value="APP_UPDATE">App Update</option>
                          <option value="FEATURE_ANNOUNCEMENT">Feature Announcement</option>
                          <option value="COMMUNITY_NEWS">Community News</option>
                          <option value="MAINTENANCE">Maintenance</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
                        <select
                          value={form.priority}
                          onChange={(e) => setForm({ ...form, priority: e.target.value as any })}
                          className="w-full px-4 py-3 bg-dark-background border border-dark-border rounded-lg text-white focus:border-blue-400 focus:outline-none"
                        >
                          <option value="LOW">Low</option>
                          <option value="NORMAL">Normal</option>
                          <option value="HIGH">High</option>
                          <option value="URGENT">Urgent</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Target Audience</label>
                        <select
                          value={form.targetAudience}
                          onChange={(e) => setForm({ ...form, targetAudience: e.target.value as any })}
                          className="w-full px-4 py-3 bg-dark-background border border-dark-border rounded-lg text-white focus:border-blue-400 focus:outline-none"
                        >
                          <option value="PRO">Pro Users Only</option>
                          <option value="PREMIUM">Premium Users Only</option>
                          <option value="ALL_PRO">All Pro & Premium</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Expires At (Optional)</label>
                        <input
                          type="datetime-local"
                          value={form.expiresAt}
                          onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
                          className="w-full px-4 py-3 bg-dark-background border border-dark-border rounded-lg text-white focus:border-blue-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                      >
                        Send Notification
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCreateForm(false)}
                        className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Notifications List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-dark-backgroundSecondary rounded-xl border border-dark-border overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-dark-border">
            <h2 className="text-xl font-bold text-white">Recent Notifications ({notifications.length})</h2>
          </div>
          
          {notifications.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="text-6xl mb-4">📢</div>
              <h3 className="text-xl font-bold text-white mb-2">No notifications sent yet</h3>
              <p className="text-gray-400">
                Create your first notification to communicate with Pro users.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-dark-border">
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 hover:bg-dark-background/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <FontAwesomeIcon 
                          icon={getNotificationIcon(notification.type)} 
                          className="text-white text-sm" 
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{notification.title}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(notification.priority)}`}>
                            {notification.priority}
                          </span>
                          {!notification.isActive && (
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-500/20 text-gray-400 border border-gray-500/50">
                              Inactive
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-300 mb-3">{notification.message}</p>
                        
                        <div className="flex items-center gap-6 text-sm text-gray-400">
                          <span>📤 Sent to {notification.analytics.totalSent} users</span>
                          <span>📖 {notification.analytics.totalRead} read ({notification.analytics.readRate}%)</span>
                          <span>📅 {formatDate(notification.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleNotificationStatus(notification)}
                        className={`p-2 rounded-lg transition-colors ${
                          notification.isActive 
                            ? 'text-green-400 hover:bg-green-500/20' 
                            : 'text-gray-400 hover:bg-gray-500/20'
                        }`}
                        title={notification.isActive ? 'Deactivate' : 'Activate'}
                      >
                        <FontAwesomeIcon icon={notification.isActive ? faEye : faEyeSlash} />
                      </button>
                      
                      <button
                        onClick={() => handleDeleteNotification(notification.id)}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                        title="Delete notification"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminNotifications; 