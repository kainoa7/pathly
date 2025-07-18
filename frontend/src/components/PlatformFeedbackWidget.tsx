import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, 
  faThumbsUp, 
  faThumbsDown, 
  faTimes,
  faComment,
  faChartLine
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

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

interface UserVotes {
  votes: Array<{
    voteType: string;
    feedback: string | null;
    createdAt: string;
  }>;
}

const PlatformFeedbackWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVote, setSelectedVote] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [stats, setStats] = useState<FeedbackStats | null>(null);
  const [userVotes, setUserVotes] = useState<UserVotes | null>(null);
  const [showStats, setShowStats] = useState(false);
  const { isAuthenticated } = useAuth();

  // Load user's existing votes and stats
  useEffect(() => {
    loadUserVotes();
    loadStats();
  }, []);

  const loadUserVotes = async () => {
    try {
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      
      try {
        const response = await fetch(`${apiUrl}/api/feedback/my-vote`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        if (response.ok) {
          const data = await response.json();
          setUserVotes(data);
          return;
        }
      } catch (apiError) {
        console.warn('API failed, using local storage for user votes');
      }
      
      // Fallback to local storage
      const existingVotes = JSON.parse(localStorage.getItem('platformFeedback') || '[]');
      const userVotes = existingVotes.filter(v => 
        v.userId === (token ? 'current-user' : null) || v.ipAddress === 'local-demo'
      );
      setUserVotes({ votes: userVotes });
      
    } catch (error) {
      console.error('Failed to load user votes:', error);
      setUserVotes({ votes: [] });
    }
  };

  const loadStats = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      
      try {
        const response = await fetch(`${apiUrl}/api/feedback/stats`);
        if (response.ok) {
          const data = await response.json();
          setStats(data);
          return;
        }
      } catch (apiError) {
        console.warn('API failed, using local storage for stats');
      }
      
      // Fallback to local storage
      const existingVotes = JSON.parse(localStorage.getItem('platformFeedback') || '[]');
      const breakdown = { LOVE_IT: 0, WOULD_USE: 0, NOT_INTERESTED: 0 };
      existingVotes.forEach(vote => {
        if (breakdown.hasOwnProperty(vote.voteType)) {
          breakdown[vote.voteType as keyof typeof breakdown]++;
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
      
    } catch (error) {
      console.error('Failed to load stats:', error);
      setStats({
        totalVotes: 0,
        breakdown: { LOVE_IT: 0, WOULD_USE: 0, NOT_INTERESTED: 0 },
        percentages: { LOVE_IT: 0, WOULD_USE: 0, NOT_INTERESTED: 0 },
        engagementScore: 0,
        positiveVotes: 0,
        recommendation: 'Gathering Feedback'
      });
    }
  };

  const hasVoted = (voteType: string) => {
    return userVotes?.votes.some(vote => vote.voteType === voteType) || false;
  };

  const handleVote = async () => {
    if (!selectedVote || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      
      try {
        const response = await fetch(`${apiUrl}/api/feedback/vote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          body: JSON.stringify({
            voteType: selectedVote,
            feedback: feedback.trim() || null
          })
        });

        if (response.ok) {
          setShowThankYou(true);
          await loadUserVotes();
          await loadStats();
          setTimeout(() => {
            setIsOpen(false);
            setShowThankYou(false);
            setSelectedVote(null);
            setFeedback('');
          }, 2000);
          return;
        } else {
          const errorData = await response.json().catch(() => ({ error: 'Network error' }));
          console.error('API Error:', errorData);
          throw new Error(errorData.error || 'Server error');
        }
      } catch (apiError) {
        console.warn('API failed, using local storage fallback:', apiError);
        
        // Fallback to local storage for demo purposes
        const existingVotes = JSON.parse(localStorage.getItem('platformFeedback') || '[]');
        const newVote = {
          id: Date.now().toString(),
          voteType: selectedVote,
          feedback: feedback.trim() || null,
          createdAt: new Date().toISOString(),
          userId: token ? 'current-user' : null,
          ipAddress: 'local-demo'
        };
        
        existingVotes.push(newVote);
        localStorage.setItem('platformFeedback', JSON.stringify(existingVotes));
        
        // Update local state
        setUserVotes({ 
          votes: existingVotes.filter(v => v.userId === (token ? 'current-user' : null) || v.ipAddress === 'local-demo')
        });
        
        // Update stats
        const breakdown = { LOVE_IT: 0, WOULD_USE: 0, NOT_INTERESTED: 0 };
        existingVotes.forEach(vote => {
          if (breakdown.hasOwnProperty(vote.voteType)) {
            breakdown[vote.voteType as keyof typeof breakdown]++;
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
        
        setShowThankYou(true);
        setTimeout(() => {
          setIsOpen(false);
          setShowThankYou(false);
          setSelectedVote(null);
          setFeedback('');
        }, 2000);
      }
    } catch (error) {
      console.error('Vote submission error:', error);
      alert('Unable to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const voteOptions = [
    {
      type: 'LOVE_IT',
      label: '❤️ Love it!',
      description: 'This platform is amazing',
      color: 'from-red-500 to-pink-500',
      icon: faHeart
    },
    {
      type: 'WOULD_USE',
      label: '👍 Would use',
      description: 'I would definitely use this',
      color: 'from-green-500 to-emerald-500',
      icon: faThumbsUp
    },
    {
      type: 'NOT_INTERESTED',
      label: '👎 Not interested',
      description: 'Not for me right now',
      color: 'from-gray-500 to-slate-500',
      icon: faThumbsDown
    }
  ];

  // Don't show if user has voted all types
  const allVoteTypes = ['LOVE_IT', 'WOULD_USE', 'NOT_INTERESTED'];
  const hasVotedAll = allVoteTypes.every(type => hasVoted(type));

  if (hasVotedAll) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-24 right-6 z-40"
      >
        <button
          onClick={() => setShowStats(!showStats)}
          className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all"
        >
          <FontAwesomeIcon icon={faChartLine} className="text-lg" />
        </button>
        
        <AnimatePresence>
          {showStats && stats && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-16 right-0 w-80 bg-white dark:bg-[#1a2234] rounded-xl shadow-2xl border border-gray-200 dark:border-[#71ADBA]/20 p-6"
            >
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">Platform Feedback</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Community Response</p>
              </div>
              
              <div className="space-y-3">
                <div className="text-center p-3 bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-lg">
                  <div className="text-2xl font-bold text-[#71ADBA]">{stats.engagementScore}%</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Engagement Score</div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded">
                    <div className="font-bold text-red-600">{stats.breakdown.LOVE_IT}</div>
                    <div className="text-gray-600 dark:text-gray-400">Love it</div>
                  </div>
                  <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
                    <div className="font-bold text-green-600">{stats.breakdown.WOULD_USE}</div>
                    <div className="text-gray-600 dark:text-gray-400">Would use</div>
                  </div>
                  <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <div className="font-bold text-gray-600">{stats.breakdown.NOT_INTERESTED}</div>
                    <div className="text-gray-600 dark:text-gray-400">Not interested</div>
                  </div>
                </div>
                
                <div className="text-center text-xs text-gray-500">
                  Total: {stats.totalVotes} votes • {stats.recommendation}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="fixed bottom-24 right-6 z-40"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-medium"
        >
          <FontAwesomeIcon icon={faComment} />
          <span className="hidden sm:inline">Quick Feedback</span>
        </motion.button>
      </motion.div>

      {/* Feedback Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-[#1a2234] rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
            >
              {showThankYou ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-8"
                >
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                    Thank you!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Your feedback helps us improve Kaiyl
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        How do you feel about Kaiyl?
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Help us understand if we should continue building this platform
                      </p>
                    </div>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>

                  <div className="space-y-3 mb-6">
                    {voteOptions.map((option) => (
                      <motion.button
                        key={option.type}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedVote(option.type)}
                        disabled={hasVoted(option.type)}
                        className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                          selectedVote === option.type
                            ? `bg-gradient-to-r ${option.color} text-white border-transparent`
                            : hasVoted(option.type)
                            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 border-gray-200 dark:border-gray-700 cursor-not-allowed'
                            : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <FontAwesomeIcon icon={option.icon} className="text-lg" />
                          <div>
                            <div className="font-semibold">{option.label}</div>
                            <div className="text-sm opacity-80">{option.description}</div>
                            {hasVoted(option.type) && (
                              <div className="text-xs mt-1 opacity-60">✓ Already voted</div>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {selectedVote && !hasVoted(selectedVote) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Additional thoughts? (optional)
                        </label>
                        <textarea
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          placeholder="What would make Kaiyl better for you?"
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white resize-none"
                          rows={3}
                          maxLength={500}
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {feedback.length}/500 characters
                        </div>
                      </div>

                      <button
                        onClick={handleVote}
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                      </button>
                    </motion.div>
                  )}

                  {!isAuthenticated && (
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-xs text-blue-600 dark:text-blue-300">
                        💡 Your feedback is anonymous. Creating an account lets you track your input and get updates on improvements.
                      </p>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PlatformFeedbackWidget; 