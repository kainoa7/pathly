import React, { useState } from 'react';

interface FeedbackPollProps {
  onVote: (isInterested: boolean) => void;
}

const FeedbackPoll: React.FC<FeedbackPollProps> = ({ onVote }) => {
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (isInterested: boolean) => {
    setHasVoted(true);
    onVote(isInterested);
  };

  if (hasVoted) {
    return (
      <div className="bg-gray-800/50 p-6 rounded-lg text-center backdrop-blur-sm">
        <p className="text-blue-300 font-medium">Thanks for your feedback! We're working hard to help you explore your future campus life.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 p-8 rounded-lg shadow-md backdrop-blur-sm">
      <h3 className="text-xl font-semibold mb-4 text-center text-white">
        Would you like to explore what life is like at your potential future schools?
      </h3>
      <p className="text-gray-300 mb-6 text-center">
        We're developing a feature to help you discover campus life before making your decision.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button
          onClick={() => handleVote(true)}
          className="px-6 py-3 bg-[#71ADBA] text-white rounded-full hover:bg-[#71ADBA]/80 transition-colors"
        >
          Yes, help me explore campus life!
        </button>
        <button
          onClick={() => handleVote(false)}
          className="px-6 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
        >
          No, I already know enough
        </button>
      </div>
    </div>
  );
};

export default FeedbackPoll; 