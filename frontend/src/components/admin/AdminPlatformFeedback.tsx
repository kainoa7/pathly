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
  faCheckCircle,
  faChartBar,
  faCalendar,
  faQuoteLeft
} from '@fortawesome/free-solid-svg-icons';
import AdminNav from '../AdminNav';

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
      
      try {
        // Load stats
        const statsResponse = await fetch('/api/feedback/stats');
        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        }

        // Load recent feedback comments
        const commentsResponse = await fetch('/api/feedback/recent', {
          headers: {
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            'x-admin-auth': 'true',
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
              email: 'demo@jarvus.com',
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
      
      setComments(commentsWithFeedback.reverse());
      
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

  const getRecommendationConfig = (recommendation: string) => {
    switch (recommendation) {
      case 'Continue Development':
        return { 
          icon: faCheckCircle, 
          color: 'text-green-400',
          bgColor: 'from-green-500/10 to-emerald-500/10',
          borderColor: 'border-green-500/30',
          textColor: 'text-green-300'
        };
      case 'Improve & Iterate':
        return { 
          icon: faExclamationTriangle, 
          color: 'text-yellow-400',
          bgColor: 'from-yellow-500/10 to-orange-500/10',
          borderColor: 'border-yellow-500/30',
          textColor: 'text-yellow-300'
        };
      default:
        return { 
          icon: faChartLine, 
          color: 'text-cyan-400',
          bgColor: 'from-cyan-500/10 to-blue-500/10',
          borderColor: 'border-cyan-500/30',
          textColor: 'text-cyan-300'
        };
    }
  };

  const getVoteTypeConfig = (voteType: string) => {
    switch (voteType) {
      case 'LOVE_IT':
        return { 
          icon: faHeart, 
          color: 'text-red-400', 
          label: 'Love it!', 
          bg: 'bg-red-500/20',
          borderColor: 'border-red-500/30'
        };
      case 'WOULD_USE':
        return { 
          icon: faThumbsUp, 
          color: 'text-green-400', 
          label: 'Would use', 
          bg: 'bg-green-500/20',
          borderColor: 'border-green-500/30'
        };
      case 'NOT_INTERESTED':
        return { 
          icon: faThumbsDown, 
          color: 'text-gray-400', 
          label: 'Not interested', 
          bg: 'bg-gray-500/20',
          borderColor: 'border-gray-500/30'
        };
      default:
        return { 
          icon: faUsers, 
          color: 'text-blue-400', 
          label: 'Unknown', 
          bg: 'bg-blue-500/20',
          borderColor: 'border-blue-500/30'
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <AdminNav title="Platform Feedback" description="Loading feedback analytics..." />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <FontAwesomeIcon icon={faComments} className="text-4xl text-pink-400 mb-4 animate-pulse" />
            <p className="text-gray-300">Loading feedback data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminNav 
        title="Platform Feedback" 
        description="Monitor user engagement and platform reception" 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Actions */}
        <div className="flex justify-end mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50 transition-colors"
          >
            <FontAwesomeIcon 
              icon={faRefresh} 
              className={refreshing ? 'animate-spin' : ''} 
            />
            Refresh Data
          </motion.button>
        </div>

        {stats && (
          <>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 font-medium mb-1">Total Votes</p>
                    <p className="text-3xl font-bold text-white">{stats.totalVotes}</p>
                  </div>
                  <FontAwesomeIcon icon={faUsers} className="text-2xl text-blue-400" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 font-medium mb-1">Engagement Score</p>
                    <p className="text-3xl font-bold text-white">{stats.engagementScore}%</p>
                  </div>
                                                        <FontAwesomeIcon icon={faChartBar} className="text-2xl text-green-400" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 font-medium mb-1">Positive Votes</p>
                    <p className="text-3xl font-bold text-white">{stats.positiveVotes}</p>
                  </div>
                  <FontAwesomeIcon icon={faThumbsUp} className="text-2xl text-purple-400" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`bg-gradient-to-br ${getRecommendationConfig(stats.recommendation).bgColor} border ${getRecommendationConfig(stats.recommendation).borderColor} rounded-xl p-6`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 font-medium mb-1">Status</p>
                    <p className={`text-sm font-bold ${getRecommendationConfig(stats.recommendation).textColor}`}>
                      {stats.recommendation}
                    </p>
                  </div>
                  <FontAwesomeIcon 
                    icon={getRecommendationConfig(stats.recommendation).icon} 
                    className={`text-2xl ${getRecommendationConfig(stats.recommendation).color}`} 
                  />
                </div>
              </motion.div>
            </div>

            {/* Vote Breakdown Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-900/50 rounded-xl p-6 mb-8"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FontAwesomeIcon icon={faChartLine} className="text-cyan-400" />
                Vote Breakdown
              </h3>
              
              <div className="space-y-6">
                {Object.entries(stats.breakdown).map(([voteType, count]) => {
                  const config = getVoteTypeConfig(voteType);
                  const percentage = stats.percentages[voteType as keyof typeof stats.percentages];
                  
                  return (
                    <div key={voteType} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${config.bg} border ${config.borderColor}`}>
                          <FontAwesomeIcon icon={config.icon} className={`${config.color} text-lg`} />
                        </div>
                        <div>
                          <p className="font-medium text-white text-lg">{config.label}</p>
                          <p className="text-gray-400">{count} votes</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white mb-2">{percentage}%</p>
                        <div className="w-32 bg-gray-700 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-500 ${
                              voteType === 'LOVE_IT' ? 'bg-gradient-to-r from-red-500 to-pink-500' :
                              voteType === 'WOULD_USE' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                              'bg-gradient-to-r from-gray-500 to-gray-600'
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
          className="bg-slate-900/50 rounded-xl p-6 mb-8"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <FontAwesomeIcon icon={faComments} className="text-pink-400" />
            Recent Feedback Comments ({comments.length})
          </h3>
          
          {comments.length === 0 ? (
            <div className="text-center py-12">
              <FontAwesomeIcon icon={faComments} className="text-4xl text-gray-600 mb-4" />
              <p className="text-gray-400 text-lg">No feedback comments yet</p>
              <p className="text-gray-500 text-sm">User feedback will appear here when submitted</p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment, index) => {
                const config = getVoteTypeConfig(comment.voteType);
                
                return (
                  <motion.div 
                    key={comment.id} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-slate-800/50 border ${config.borderColor} rounded-lg p-4 hover:bg-slate-800/70 transition-colors`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${config.bg}`}>
                          <FontAwesomeIcon icon={config.icon} className={`${config.color}`} />
                        </div>
                        <span className="font-medium text-white">{config.label}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <FontAwesomeIcon icon={faCalendar} />
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 mb-4">
                      <FontAwesomeIcon icon={faQuoteLeft} className="text-gray-500 mt-1" />
                      <p className="text-gray-300 italic flex-1">"{comment.feedback}"</p>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        {comment.user ? (
                          <>
                            <span className="text-gray-300">
                              {comment.user.firstName} {comment.user.lastName}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              comment.user.accountType === 'PRO' ? 'bg-purple-500/20 text-purple-300' :
                              comment.user.accountType === 'PREMIUM' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-blue-500/20 text-blue-300'
                            }`}>
                              {comment.user.accountType}
                            </span>
                          </>
                        ) : (
                          <span className="text-gray-500">Anonymous User</span>
                        )}
                      </div>
                      <div className="text-gray-500">
                        IP: {comment.ipAddress.substring(0, 10)}...
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Recommendations Panel */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`bg-gradient-to-br ${getRecommendationConfig(stats.recommendation).bgColor} border ${getRecommendationConfig(stats.recommendation).borderColor} rounded-xl p-6`}
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FontAwesomeIcon 
                icon={getRecommendationConfig(stats.recommendation).icon} 
                className={getRecommendationConfig(stats.recommendation).color} 
              />
              Platform Status: {stats.recommendation}
            </h3>
            
            <div className="space-y-3">
              {stats.engagementScore >= 70 && (
                <div className="space-y-2">
                  <p className="text-green-300 font-medium text-lg">🎉 Excellent reception! Users love the platform.</p>
                  <div className="space-y-1 text-green-400">
                    <p>• Continue developing new features</p>
                    <p>• Focus on user retention and growth</p>
                    <p>• Consider expanding marketing efforts</p>
                  </div>
                </div>
              )}
              
              {stats.engagementScore >= 50 && stats.engagementScore < 70 && (
                <div className="space-y-2">
                  <p className="text-yellow-300 font-medium text-lg">⚠️ Mixed feedback. Room for improvement.</p>
                  <div className="space-y-1 text-yellow-400">
                    <p>• Analyze negative feedback for improvement areas</p>
                    <p>• A/B test new features with users</p>
                    <p>• Focus on core value proposition</p>
                  </div>
                </div>
              )}
              
              {stats.engagementScore < 50 && (
                <div className="space-y-2">
                  <p className="text-red-300 font-medium text-lg">🚨 Poor reception. Significant changes needed.</p>
                  <div className="space-y-1 text-red-400">
                    <p>• Review core platform concept</p>
                    <p>• Conduct user interviews for deeper insights</p>
                    <p>• Consider pivoting or major feature overhaul</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminPlatformFeedback; 