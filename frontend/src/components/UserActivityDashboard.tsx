import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faComment, 
  faThumbsUp, 
  faThumbsDown, 
  faBookmark, 
  faArrowLeft,
  faChartBar,
  faCalendarWeek,
  faClock,
  faNewspaper
} from '@fortawesome/free-solid-svg-icons';

interface UserActivityStats {
  totalComments: number;
  totalVotes: number;
  totalSaved: number;
  commentsThisWeek: number;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  article: {
    id: string;
    title: string;
    category: string;
  };
}

interface Vote {
  id: string;
  type: 'UPVOTE' | 'DOWNVOTE';
  createdAt: string;
  article: {
    id: string;
    title: string;
    category: string;
  };
}

interface UserActivityData {
  stats: UserActivityStats;
  recentComments: Comment[];
  recentVotes: Vote[];
}

const UserActivityDashboard = () => {
  const navigate = useNavigate();
  const [activityData, setActivityData] = useState<UserActivityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUserActivity();
  }, []);

  const fetchUserActivity = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');

      if (!token || !userId) {
        setError('Authentication required');
        return;
      }

      const response = await fetch('http://localhost:3001/api/news/user/activity', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-user-id': userId,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user activity');
      }

      const data = await response.json();
      setActivityData(data);
    } catch (error) {
      console.error('Error fetching user activity:', error);
      setError('Failed to load activity data');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'TECH': 'bg-blue-500/20 text-blue-300',
      'BUSINESS': 'bg-green-500/20 text-green-300',
      'FINANCE': 'bg-yellow-500/20 text-yellow-300',
      'SPORTS': 'bg-red-500/20 text-red-300',
      'AI': 'bg-purple-500/20 text-purple-300'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-500/20 text-gray-300';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#71ADBA] mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your activity...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark-background pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={fetchUserActivity}
            className="px-4 py-2 bg-[#71ADBA] text-white rounded-lg hover:bg-[#5a8a94] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!activityData) return null;

  const { stats, recentComments, recentVotes } = activityData;

  return (
    <div className="min-h-screen bg-dark-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-[#71ADBA] hover:text-[#5a8a94] transition-colors mb-6"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to Dashboard
          </button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#71ADBA] to-[#9C71BA]">
              Your Activity Dashboard
            </h1>
            <p className="text-gray-300 text-lg">
              Track your engagement and participation across the platform
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {[
            { label: 'Total Comments', value: stats.totalComments, icon: faComment, color: 'text-blue-400' },
            { label: 'Total Votes', value: stats.totalVotes, icon: faThumbsUp, color: 'text-green-400' },
            { label: 'Saved Articles', value: stats.totalSaved, icon: faBookmark, color: 'text-yellow-400' },
            { label: 'Comments This Week', value: stats.commentsThisWeek, icon: faCalendarWeek, color: 'text-purple-400' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
              className="bg-[#1a2234] rounded-xl p-6 border border-[#71ADBA]/20"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <FontAwesomeIcon icon={stat.icon} className={`text-2xl ${stat.color}`} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Activity Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Comments */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#1a2234] rounded-xl p-6 border border-[#71ADBA]/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <FontAwesomeIcon icon={faComment} className="text-blue-400 text-xl" />
              <h2 className="text-2xl font-bold text-white">Recent Comments</h2>
            </div>
            
            {recentComments.length === 0 ? (
              <div className="text-center py-8">
                <FontAwesomeIcon icon={faComment} className="text-gray-500 text-3xl mb-4" />
                <p className="text-gray-400">No comments yet</p>
                <p className="text-sm text-gray-500 mt-2">Start engaging with articles to see your activity here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentComments.map((comment, index) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-[#0f1419] rounded-lg p-4 border border-[#71ADBA]/10"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(comment.article.category)}`}>
                        {comment.article.category}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <FontAwesomeIcon icon={faClock} />
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <h4 className="text-white font-medium mb-2 text-sm">{comment.article.title}</h4>
                    <p className="text-gray-300 text-sm">{comment.content}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Recent Votes */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#1a2234] rounded-xl p-6 border border-[#71ADBA]/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <FontAwesomeIcon icon={faThumbsUp} className="text-green-400 text-xl" />
              <h2 className="text-2xl font-bold text-white">Recent Votes</h2>
            </div>
            
            {recentVotes.length === 0 ? (
              <div className="text-center py-8">
                <FontAwesomeIcon icon={faThumbsUp} className="text-gray-500 text-3xl mb-4" />
                <p className="text-gray-400">No votes yet</p>
                <p className="text-sm text-gray-500 mt-2">Start voting on articles to see your activity here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentVotes.map((vote, index) => (
                  <motion.div
                    key={vote.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-[#0f1419] rounded-lg p-4 border border-[#71ADBA]/10"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(vote.article.category)}`}>
                          {vote.article.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <FontAwesomeIcon 
                            icon={vote.type === 'UPVOTE' ? faThumbsUp : faThumbsDown} 
                            className={vote.type === 'UPVOTE' ? 'text-green-400' : 'text-red-400'}
                          />
                          <span className={`text-xs font-medium ${vote.type === 'UPVOTE' ? 'text-green-400' : 'text-red-400'}`}>
                            {vote.type}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <FontAwesomeIcon icon={faClock} />
                        {formatDate(vote.createdAt)}
                      </span>
                    </div>
                    <h4 className="text-white font-medium text-sm">{vote.article.title}</h4>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Visit News Hub',
                description: 'Discover and engage with the latest articles',
                icon: faNewspaper,
                action: () => navigate('/news'),
                color: 'from-blue-500 to-blue-600'
              },
              {
                title: 'View Saved Articles',
                description: 'Access your bookmarked articles',
                icon: faBookmark,
                action: () => navigate('/saved-articles'),
                color: 'from-yellow-500 to-yellow-600'
              },
              {
                title: 'Activity Analytics',
                description: 'Detailed insights into your engagement',
                icon: faChartBar,
                action: () => {}, // Could link to a more detailed analytics page
                color: 'from-purple-500 to-purple-600'
              }
            ].map((action, index) => (
              <motion.button
                key={action.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                onClick={action.action}
                className="bg-[#1a2234] rounded-xl p-6 border border-[#71ADBA]/20 hover:border-[#71ADBA]/40 transition-all group"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <FontAwesomeIcon icon={action.icon} className="text-white text-xl" />
                </div>
                <h3 className="text-white font-semibold mb-2">{action.title}</h3>
                <p className="text-gray-400 text-sm">{action.description}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserActivityDashboard; 