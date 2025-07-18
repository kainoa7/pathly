import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

interface VoteData {
  yes: number;
  no: number;
  userVote: 'yes' | 'no' | null;
}

const MobileAppVoting = () => {
  const [voteData, setVoteData] = useState<VoteData>({
    yes: 2354, // Starting number
    no: 54,   // Starting number
    userVote: null
  });
  const [isLoading, setIsLoading] = useState(false);

  const GOAL = 5000;

  useEffect(() => {
    // Load current vote statistics and user's vote from API
    const loadVoteData = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
        
        // Get current vote statistics
        const statsResponse = await fetch(`${apiUrl}/api/mobile-app-votes/stats`);
        if (statsResponse.ok) {
          const { stats } = await statsResponse.json();
          setVoteData(prev => ({
            ...prev,
            yes: stats.yes,
            no: stats.no
          }));
        }
        
        // Get user's current vote
        const userVoteResponse = await fetch(`${apiUrl}/api/mobile-app-votes/my-vote`);
        if (userVoteResponse.ok) {
          const { vote } = await userVoteResponse.json();
          setVoteData(prev => ({
            ...prev,
            userVote: vote
          }));
        }
        
      } catch (error) {
        console.error('Error loading vote data:', error);
        // Fallback to localStorage for offline functionality
        const savedData = localStorage.getItem('mobileAppVotes');
        const savedUserVote = localStorage.getItem('userMobileAppVote');
        
        if (savedData) {
          const parsed = JSON.parse(savedData);
          setVoteData(prev => ({
            ...prev,
            yes: parsed.yes || 2354,
            no: parsed.no || 54,
            userVote: savedUserVote as 'yes' | 'no' | null
          }));
        }
      }
    };
    
    loadVoteData();
  }, []);

  const handleVote = async (vote: 'yes' | 'no') => {
    if (voteData.userVote || isLoading) return;

    setIsLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      
      // Submit vote to backend
      const response = await fetch(`${apiUrl}/api/mobile-app-votes/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vote })
      });

      if (response.ok) {
        // Update local state with new vote
        const newVoteData = {
          yes: vote === 'yes' ? voteData.yes + 1 : voteData.yes,
          no: vote === 'no' ? voteData.no + 1 : voteData.no,
          userVote: vote
        };

        setVoteData(newVoteData);
        
        // Also save to localStorage for offline fallback
        localStorage.setItem('mobileAppVotes', JSON.stringify({
          yes: newVoteData.yes,
          no: newVoteData.no
        }));
        localStorage.setItem('userMobileAppVote', vote);
        
      } else {
        const errorData = await response.json();
        console.error('Vote submission failed:', errorData.message);
        
        // Handle "already voted" case
        if (response.status === 400) {
          // User has already voted, just update UI
          setVoteData(prev => ({ ...prev, userVote: vote }));
          localStorage.setItem('userMobileAppVote', vote);
        }
      }

    } catch (error) {
      console.error('Error voting:', error);
      
      // Fallback to localStorage only
      const newVoteData = {
        yes: vote === 'yes' ? voteData.yes + 1 : voteData.yes,
        no: vote === 'no' ? voteData.no + 1 : voteData.no,
        userVote: vote
      };

      setVoteData(newVoteData);
      localStorage.setItem('mobileAppVotes', JSON.stringify({
        yes: newVoteData.yes,
        no: newVoteData.no
      }));
      localStorage.setItem('userMobileAppVote', vote);
      
    } finally {
      setIsLoading(false);
    }
  };

  const totalVotes = voteData.yes + voteData.no;
  const progressPercentage = Math.min((voteData.yes / GOAL) * 100, 100);
  const yesPercentage = Math.round((voteData.yes / totalVotes) * 100);

  return (
    <div className="space-y-4">
      {/* Question */}
      <div className="text-center">
        <p className="text-white font-medium mb-1">Would you use a Kaiyl mobile app?</p>
        <p className="text-xs text-gray-400">Help us decide if we should build it!</p>
      </div>

      {/* Voting Buttons */}
      <div className="flex gap-3">
        <motion.button
          onClick={() => handleVote('yes')}
          disabled={!!voteData.userVote || isLoading}
          whileHover={{ scale: voteData.userVote ? 1 : 1.05 }}
          whileTap={{ scale: voteData.userVote ? 1 : 0.95 }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
            voteData.userVote === 'yes'
              ? 'bg-green-500/20 border-green-400 text-green-400 border-2'
              : voteData.userVote === 'no'
              ? 'bg-gray-500/20 border-gray-500 text-gray-500 border cursor-not-allowed'
              : 'bg-green-500/10 border-green-400/50 text-green-400 border hover:bg-green-500/20 hover:border-green-400'
          }`}
        >
          <ThumbUpIcon className="w-5 h-5" />
          <span>{isLoading && voteData.userVote !== 'yes' ? '...' : 'Yes!'}</span>
        </motion.button>

        <motion.button
          onClick={() => handleVote('no')}
          disabled={!!voteData.userVote || isLoading}
          whileHover={{ scale: voteData.userVote ? 1 : 1.05 }}
          whileTap={{ scale: voteData.userVote ? 1 : 0.95 }}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all ${
            voteData.userVote === 'no'
              ? 'bg-red-500/20 border-red-400 text-red-400 border-2'
              : voteData.userVote === 'yes'
              ? 'bg-gray-500/20 border-gray-500 text-gray-500 border cursor-not-allowed'
              : 'bg-red-500/10 border-red-400/50 text-red-400 border hover:bg-red-500/20 hover:border-red-400'
          }`}
        >
          <ThumbDownIcon className="w-5 h-5" />
          <span>{isLoading && voteData.userVote !== 'no' ? '...' : 'No'}</span>
        </motion.button>
      </div>

      {/* Progress toward goal */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-400">
          <span>{voteData.yes.toLocaleString()} / {GOAL.toLocaleString()} votes needed</span>
          <span>{progressPercentage.toFixed(1)}%</span>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-green-500 to-[#71ADBA] h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
        
        <div className="text-center">
          <p className="text-xs text-[#EDEAB1]">
            🎯 {GOAL - voteData.yes > 0 
              ? `${(GOAL - voteData.yes).toLocaleString()} more votes to start development!`
              : '🚀 Goal reached! Development approved!'
            }
          </p>
        </div>
      </div>

      {/* Vote breakdown */}
      <div className="flex justify-between text-xs text-gray-400 pt-2 border-t border-gray-600/30">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Yes: {voteData.yes.toLocaleString()} ({yesPercentage}%)
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          No: {voteData.no.toLocaleString()} ({100 - yesPercentage}%)
        </span>
      </div>

      {/* Thank you message */}
      {voteData.userVote && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-2"
        >
          <p className="text-sm text-[#EDEAB1]">
            {voteData.userVote === 'yes' 
              ? '🙏 Thanks for your vote! We\'ll keep you updated on development.'
              : '👍 Thanks for the feedback! Your input helps us prioritize features.'
            }
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default MobileAppVoting; 