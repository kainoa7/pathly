import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faComments, 
  faHeart, 
  faThumbsUp, 
  faThumbsDown,
  faTimes,
  faPaperPlane,
  faCheck
} from '@fortawesome/free-solid-svg-icons';

interface FeedbackWidgetProps {
  onSubmit?: (feedback: any) => void;
}

type VoteType = 'LOVE_IT' | 'WOULD_USE' | 'NOT_INTERESTED' | null;

const FeedbackWidget: React.FC<FeedbackWidgetProps> = ({ onSubmit }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVote, setSelectedVote] = useState<VoteType>(null);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const voteOptions = [
    {
      type: 'LOVE_IT' as VoteType,
      icon: faHeart,
      label: 'Love it!',
      color: 'text-red-400',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-500/50',
      hoverColor: 'hover:bg-red-500/30'
    },
    {
      type: 'WOULD_USE' as VoteType,
      icon: faThumbsUp,
      label: 'Would use',
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/50',
      hoverColor: 'hover:bg-green-500/30'
    },
    {
      type: 'NOT_INTERESTED' as VoteType,
      icon: faThumbsDown,
      label: 'Not interested',
      color: 'text-gray-400',
      bgColor: 'bg-gray-500/20',
      borderColor: 'border-gray-500/50',
      hoverColor: 'hover:bg-gray-500/30'
    }
  ];

  const handleSubmit = async () => {
    if (!selectedVote) return;

    setIsSubmitting(true);
    
    try {
      const feedbackData = {
        voteType: selectedVote,
        feedback: comment.trim() || null,
        createdAt: new Date().toISOString(),
        ipAddress: 'client-ip', // This would be handled by backend
        userId: null // Anonymous for now
      };

      // Try to submit to backend
      try {
        const response = await fetch('/api/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(feedbackData)
        });

        if (response.ok) {
          console.log('Feedback submitted to backend');
        } else {
          throw new Error('Backend submission failed');
        }
      } catch (error) {
        console.warn('Backend unavailable, storing locally');
        
        // Fallback to localStorage
        const existingFeedback = JSON.parse(localStorage.getItem('platformFeedback') || '[]');
        const newFeedback = {
          ...feedbackData,
          id: Date.now().toString()
        };
        existingFeedback.push(newFeedback);
        localStorage.setItem('platformFeedback', JSON.stringify(existingFeedback));
      }

      // Call optional callback
      if (onSubmit) {
        onSubmit(feedbackData);
      }

      setIsSubmitted(true);
      
      // Auto-close after success
      setTimeout(() => {
        setIsOpen(false);
        setIsSubmitted(false);
        setSelectedVote(null);
        setComment('');
      }, 2000);

    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedVote(null);
    setComment('');
    setIsSubmitted(false);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faComments} className="text-xl" />
        </motion.button>
      )}

      {/* Feedback Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
            className="fixed bottom-6 right-6 w-80 bg-slate-900/95 backdrop-blur-sm border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500/20 to-purple-600/20 border-b border-gray-700 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faComments} className="text-pink-400" />
                  <h3 className="font-semibold text-white">Quick Feedback</h3>
                </div>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <p className="text-gray-300 text-sm mt-1">What do you think of JARVUS?</p>
            </div>

            {/* Content */}
            <div className="p-4">
              {!isSubmitted ? (
                <>
                  {/* Vote Options */}
                  <div className="space-y-2 mb-4">
                    {voteOptions.map((option) => (
                      <motion.button
                        key={option.type}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedVote(option.type)}
                        className={`w-full p-3 rounded-lg border transition-all duration-200 flex items-center gap-3 ${
                          selectedVote === option.type
                            ? `${option.bgColor} ${option.borderColor} ring-2 ring-offset-2 ring-offset-slate-900`
                            : `bg-slate-800/50 border-gray-600 ${option.hoverColor}`
                        }`}
                      >
                        <FontAwesomeIcon 
                          icon={option.icon} 
                          className={`${option.color} ${selectedVote === option.type ? 'text-lg' : ''}`} 
                        />
                        <span className="text-white font-medium">{option.label}</span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Comment Box */}
                  <div className="mb-4">
                    <label className="block text-gray-300 text-sm mb-2">
                      Additional thoughts? (optional)
                    </label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Share your thoughts..."
                      className="w-full p-3 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none resize-none"
                      rows={3}
                      maxLength={500}
                    />
                    <div className="text-right text-xs text-gray-500 mt-1">
                      {comment.length}/500
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: selectedVote ? 1.02 : 1 }}
                    whileTap={{ scale: selectedVote ? 0.98 : 1 }}
                    onClick={handleSubmit}
                    disabled={!selectedVote || isSubmitting}
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                      selectedVote && !isSubmitting
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-400 hover:to-purple-500 shadow-lg'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faPaperPlane} />
                        Submit Feedback
                      </>
                    )}
                  </motion.button>
                </>
              ) : (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-6"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <FontAwesomeIcon icon={faCheck} className="text-2xl text-green-400" />
                  </motion.div>
                  <h4 className="text-white font-semibold mb-2">Thank you!</h4>
                  <p className="text-gray-300 text-sm">Your feedback helps us improve JARVUS.</p>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeedbackWidget; 