import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faHeart, 
  faThumbsUp, 
  faThumbsDown,
  faUsers,
  faRefresh,
  faComments,
  faExclamationTriangle,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

interface FeedbackStats {
  totalVotes: number;
  breakdown: {
    LOVE_IT: number;
    WOULD_USE: number;
    NOT_INTERESTED: number;
  };
  percentages: {
    LOVE_IT: number;
    WOULD_USE: number;
    NOT_INTERESTED: number;
  };
  engagementScore: number;
  positiveVotes: number;
  recommendation: string;
}

interface FeedbackComment {
  id: string;
  voteType: string;
  feedback: string;
  createdAt: string;
  ipAddress: string;
  user?: {
    firstName: string;
    lastName: string;
    email: string;
    accountType: string;
  } | null;
}

const AdminPlatformFeedback = () => {
  const [stats, setStats] = useState<FeedbackStats | null>(null);
  const [comments, setComments] = useState<FeedbackComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      
      try {
        // Load stats
        const statsResponse = await fetch(`${apiUrl}/api/feedback/stats`);
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        }

        // Load recent feedback comments
        const commentsResponse = await fetch(`${apiUrl}/api/feedback/recent`, {
          headers: {
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            'x-admin-auth': 'true', // Add admin authentication header
            'Content-Type': 'application/json'
          }
        });
        if (commentsResponse.ok) {
          const commentsData = await commentsResponse.json();
          setComments(commentsData.feedback || []);
        }
        return;
      } catch (apiError) {
        console.warn('API failed, using local storage fallback for admin panel');
      }
      
      // Fallback to local storage
      const existingVotes = JSON.parse(localStorage.getItem('platformFeedback') || '[]');
      
      // Calculate stats from local storage
      const breakdown = { LOVE_IT: 0, WOULD_USE: 0, NOT_INTERESTED: 0 };
      const commentsWithFeedback = [];
      
      existingVotes.forEach(vote => {
        if (breakdown.hasOwnProperty(vote.voteType)) {
          breakdown[vote.voteType as keyof typeof breakdown]++;
        }
        
        if (vote.feedback && vote.feedback.trim()) {
          commentsWithFeedback.push({
            id: vote.id,
            voteType: vote.voteType,
            feedback: vote.feedback,
            createdAt: vote.createdAt,
            ipAddress: vote.ipAddress,
            user: vote.userId === 'current-user' ? {
              firstName: 'Demo',
              lastName: 'User',
              email: 'demo@kaiyl.com',
              accountType: 'PRO'
            } : null
          });
        }
      });
      
      const totalVotes = existingVotes.length;
      const positiveVotes = breakdown.LOVE_IT + breakdown.WOULD_USE;
      const engagementScore = totalVotes > 0 ? Math.round((positiveVotes / totalVotes) * 100) : 0;
      
      setStats({
        totalVotes,
        breakdown,
        percentages: {
          LOVE_IT: totalVotes > 0 ? Math.round((breakdown.LOVE_IT / totalVotes) * 100) : 0,
          WOULD_USE: totalVotes > 0 ? Math.round((breakdown.WOULD_USE / totalVotes) * 100) : 0,
          NOT_INTERESTED: totalVotes > 0 ? Math.round((breakdown.NOT_INTERESTED / totalVotes) * 100) : 0
        },
        engagementScore,
        positiveVotes,
        recommendation: engagementScore >= 70 ? 'Continue Development' : 
                       engagementScore >= 50 ? 'Improve & Iterate' : 
                       'Gathering Feedback'
      });
      
      setComments(commentsWithFeedback.reverse()); // Most recent first
      
    } catch (error) {
      console.error('Failed to load platform feedback data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'Continue Development':
        return { icon: faCheckCircle, color: 'text-green-500' };
      case 'Improve & Iterate':
        return { icon: faExclamationTriangle, color: 'text-yellow-500' };
      case 'Major Changes Needed':
        return { icon: faExclamationTriangle, color: 'text-red-500' };
      default:
        return { icon: faChartLine, color: 'text-gray-500' };
    }
  };

  const getVoteTypeConfig = (voteType: string) => {
    switch (voteType) {
      case 'LOVE_IT':
        return { icon: faHeart, color: 'text-red-500', label: 'Love it!', bg: 'bg-red-100' };
      case 'WOULD_USE':
        return { icon: faThumbsUp, color: 'text-green-500', label: 'Would use', bg: 'bg-green-100' };
      case 'NOT_INTERESTED':
        return { icon: faThumbsDown, color: 'text-gray-500', label: 'Not interested', bg: 'bg-gray-100' };
      default:
        return { icon: faUsers, color: 'text-blue-500', label: 'Unknown', bg: 'bg-blue-100' };
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Feedback Analytics</h1>
          <p className="text-gray-600">Monitor user engagement and platform reception</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <FontAwesomeIcon 
            icon={faRefresh} 
            className={refreshing ? 'animate-spin' : ''} 
          />
          Refresh
        </motion.button>
      </div>

      {stats && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Votes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalVotes}</p>
                </div>
                <FontAwesomeIcon icon={faUsers} className="text-2xl text-blue-500" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Engagement Score</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.engagementScore}%</p>
                </div>
                <FontAwesomeIcon icon={faChartLine} className="text-2xl text-green-500" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Positive Votes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.positiveVotes}</p>
                </div>
                <FontAwesomeIcon icon={faThumbsUp} className="text-2xl text-emerald-500" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Recommendation</p>
                  <p className="text-sm font-bold text-gray-900">{stats.recommendation}</p>
                </div>
                <FontAwesomeIcon 
                  icon={getRecommendationIcon(stats.recommendation).icon} 
                  className={`text-2xl ${getRecommendationIcon(stats.recommendation).color}`} 
                />
              </div>
            </motion.div>
          </div>

          {/* Vote Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FontAwesomeIcon icon={faChartLine} />
              Vote Breakdown
            </h3>
            
            <div className="space-y-4">
              {Object.entries(stats.breakdown).map(([voteType, count]) => {
                const config = getVoteTypeConfig(voteType);
                const percentage = stats.percentages[voteType as keyof typeof stats.percentages];
                
                return (
                  <div key={voteType} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${config.bg}`}>
                        <FontAwesomeIcon icon={config.icon} className={config.color} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{config.label}</p>
                        <p className="text-sm text-gray-600">{count} votes</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{percentage}%</p>
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            voteType === 'LOVE_IT' ? 'bg-red-500' :
                            voteType === 'WOULD_USE' ? 'bg-green-500' :
                            'bg-gray-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}

      {/* Recent Comments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
          <FontAwesomeIcon icon={faComments} />
          Recent Feedback Comments ({comments.length})
        </h3>
        
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No feedback comments yet</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => {
              const config = getVoteTypeConfig(comment.voteType);
              
              return (
                <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded ${config.bg}`}>
                        <FontAwesomeIcon icon={config.icon} className={`${config.color} text-sm`} />
                      </div>
                      <span className="font-medium text-gray-900">{config.label}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-3 italic">"{comment.feedback}"</p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div>
                      {comment.user ? (
                        <span>
                          {comment.user.firstName} {comment.user.lastName} 
                          <span className="ml-1 px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded">
                            {comment.user.accountType}
                          </span>
                        </span>
                      ) : (
                        <span>Anonymous User</span>
                      )}
                    </div>
                    <div>
                      IP: {comment.ipAddress.substring(0, 10)}...
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Recommendations */}
      {stats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`rounded-xl shadow-sm border p-6 ${
            stats.engagementScore >= 70 
              ? 'bg-green-50 border-green-200' 
              : stats.engagementScore >= 50 
                ? 'bg-yellow-50 border-yellow-200'
                : 'bg-red-50 border-red-200'
          }`}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FontAwesomeIcon 
              icon={getRecommendationIcon(stats.recommendation).icon} 
              className={getRecommendationIcon(stats.recommendation).color} 
            />
            Platform Status: {stats.recommendation}
          </h3>
          
          <div className="space-y-2 text-sm">
            {stats.engagementScore >= 70 && (
              <div>
                <p className="text-green-700 font-medium">🎉 Excellent reception! Users love the platform.</p>
                <p className="text-green-600">• Continue developing new features</p>
                <p className="text-green-600">• Focus on user retention and growth</p>
                <p className="text-green-600">• Consider expanding marketing efforts</p>
              </div>
            )}
            
            {stats.engagementScore >= 50 && stats.engagementScore < 70 && (
              <div>
                <p className="text-yellow-700 font-medium">⚠️ Mixed feedback. Room for improvement.</p>
                <p className="text-yellow-600">• Analyze negative feedback for improvement areas</p>
                <p className="text-yellow-600">• A/B test new features with users</p>
                <p className="text-yellow-600">• Focus on core value proposition</p>
              </div>
            )}
            
            {stats.engagementScore < 50 && (
              <div>
                <p className="text-red-700 font-medium">🚨 Poor reception. Significant changes needed.</p>
                <p className="text-red-600">• Review core platform concept</p>
                <p className="text-red-600">• Conduct user interviews for deeper insights</p>
                <p className="text-red-600">• Consider pivoting or major feature overhaul</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AdminPlatformFeedback; 