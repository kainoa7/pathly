import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FeedbackIcon from '@mui/icons-material/Feedback';
import CloseIcon from '@mui/icons-material/Close';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SendIcon from '@mui/icons-material/Send';

const FeedbackSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'suggestion' | 'issue' | 'praise' | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', { type: feedbackType, text: feedbackText });
    setSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
      setFeedbackType(null);
      setFeedbackText('');
    }, 2000);
  };

  return (
    <>
      {/* Hidden button for triggering feedback modal */}
      <button
        onClick={() => setIsOpen(true)}
        data-feedback-trigger
        className="hidden"
      />

      {/* Feedback Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1a1f36] rounded-xl p-6 max-w-lg w-full relative border border-[#71ADBA]/20"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <CloseIcon />
              </button>

              {submitted ? (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-[#EDEAB1] text-xl font-semibold mb-4"
                  >
                    Thank you for your feedback! 🎉
                  </motion.div>
                  <p className="text-gray-400">
                    Your input helps us make Nextly better for everyone.
                  </p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-[#EDEAB1] mb-6">
                    Help Us Improve Nextly
                  </h2>

                  {/* Feedback Type Selection */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <button
                      onClick={() => setFeedbackType('suggestion')}
                      className={`p-4 rounded-lg border transition-all duration-300 flex flex-col items-center gap-2
                                ${feedbackType === 'suggestion' 
                                  ? 'border-[#71ADBA] bg-[#71ADBA]/10' 
                                  : 'border-gray-700 hover:border-[#71ADBA]/50'}`}
                    >
                      <EmojiEmotionsIcon className="text-[#EDEAB1]" />
                      <span className="text-sm text-gray-300">Suggestion</span>
                    </button>
                    <button
                      onClick={() => setFeedbackType('issue')}
                      className={`p-4 rounded-lg border transition-all duration-300 flex flex-col items-center gap-2
                                ${feedbackType === 'issue' 
                                  ? 'border-[#71ADBA] bg-[#71ADBA]/10' 
                                  : 'border-gray-700 hover:border-[#71ADBA]/50'}`}
                    >
                      <SentimentNeutralIcon className="text-[#EDEAB1]" />
                      <span className="text-sm text-gray-300">Issue</span>
                    </button>
                    <button
                      onClick={() => setFeedbackType('praise')}
                      className={`p-4 rounded-lg border transition-all duration-300 flex flex-col items-center gap-2
                                ${feedbackType === 'praise' 
                                  ? 'border-[#71ADBA] bg-[#71ADBA]/10' 
                                  : 'border-gray-700 hover:border-[#71ADBA]/50'}`}
                    >
                      <SentimentVeryDissatisfiedIcon className="text-[#EDEAB1]" />
                      <span className="text-sm text-gray-300">Praise</span>
                    </button>
                  </div>

                  {/* Feedback Text Input */}
                  <div className="mb-6">
                    <textarea
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      placeholder="Tell us what you think... Your feedback helps us improve!"
                      className="w-full h-32 bg-[#1a1f36] border border-gray-700 rounded-lg p-4 text-white 
                               placeholder-gray-500 focus:border-[#71ADBA] focus:ring-1 focus:ring-[#71ADBA] 
                               transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    onClick={handleSubmit}
                    disabled={!feedbackType || !feedbackText.trim()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 rounded-lg flex items-center justify-center gap-2
                              ${(!feedbackType || !feedbackText.trim())
                                ? 'bg-gray-700 cursor-not-allowed'
                                : 'bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] hover:shadow-lg'}`}
                  >
                    <SendIcon className="w-5 h-5" />
                    <span>Submit Feedback</span>
                  </motion.button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FeedbackSection; 