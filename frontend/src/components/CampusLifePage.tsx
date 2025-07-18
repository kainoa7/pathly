import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LockIcon from '@mui/icons-material/Lock';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import GroupIcon from '@mui/icons-material/Group';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import MapIcon from '@mui/icons-material/Map';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EventIcon from '@mui/icons-material/Event';

const CampusLifePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showProModal, setShowProModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(2159); // 35 minutes in seconds for urgency
  
  // University Directory Feature Voting State
  const [featureVotes, setFeatureVotes] = useState({ upvotes: 0, downvotes: 0 });
  const [userVote, setUserVote] = useState<'UPVOTE' | 'DOWNVOTE' | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [votingLoading, setVotingLoading] = useState(false);

  // Countdown timer for limited-time offer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const testimonials = [
    {
      text: "Thanks to Kaiyl Pro, I found the perfect dorm and study spots before even visiting campus! Saved me weeks of research.",
      author: "Sarah M.",
      school: "Stanford University",
      savings: "$1,200"
    },
    {
      text: "The real-time campus events and study group finder helped me make friends instantly. Best investment ever!",
      author: "Marcus T.",
      school: "UC Berkeley", 
      savings: "Priceless"
    },
    {
      text: "I avoided the overpriced campus housing thanks to Pro's cost breakdown. Found a better place for half the price!",
      author: "Emma K.",
      school: "NYU",
      savings: "$8,400/year"
    }
  ];

  const proFeatures = [
    {
      icon: <MapIcon className="w-6 h-6" />,
      title: "Live Campus Map",
      description: "Real-time crowd levels, best study spots, and hidden gems only locals know",
      preview: "📍 Library Level 3 - 12% capacity • Perfect for focused study",
      locked: true
    },
    {
      icon: <AttachMoneyIcon className="w-6 h-6" />,
      title: "True Cost Calculator", 
      description: "Actual living costs including hidden fees, best deals, and money-saving hacks",
      preview: "💰 Dorm vs Off-campus: Save $3,200/year with these insider tips",
      locked: true
    },
    {
      icon: <GroupIcon className="w-6 h-6" />,
      title: "Student Insider Network",
      description: "Connect with current students for real advice, roommate matching, and mentorship",
      preview: "🤝 127 students online now • 23 from your major",
      locked: true
    },
    {
      icon: <EventIcon className="w-6 h-6" />,
      title: "Exclusive Events Feed",
      description: "VIP access to parties, study groups, networking events, and job fairs",
      preview: "🎉 Google recruiter event tonight - 15 spots left",
      locked: true
    },
    {
      icon: <NotificationsActiveIcon className="w-6 h-6" />,
      title: "Smart Opportunity Alerts",
      description: "Get notified about internships, scholarships, research opportunities first",
      preview: "⚡ New $5K scholarship - deadline in 3 days - 97% match",
      locked: true
    },
    {
      icon: <TrendingUpIcon className="w-6 h-6" />,
      title: "Social Trend Analytics",
      description: "See what's actually popular on campus - clubs, events, study spots, dating trends",
      preview: "📈 Crypto Club membership up 340% this month",
      locked: true
    }
  ];

  const basicFeatures = [
    {
      icon: <LocalCafeIcon className="w-6 h-6 text-gray-400" />,
      title: "Basic Local Spots",
      description: "Limited info on 3-4 popular places near campus",
      available: true
    },
    {
      icon: <SchoolIcon className="w-6 h-6 text-gray-400" />,
      title: "General Campus Info",
      description: "Basic stats that you can find on any college website",
      available: true
    },
    {
      icon: <PeopleIcon className="w-6 h-6 text-gray-400" />,
      title: "Limited Community",
      description: "View only - can't connect with other students",
      available: true
    }
  ];

  const upgradeReasons = [
    "🔥 Other students are already using these insider secrets",
    "💎 Pro users land 3x more internship opportunities", 
    "🎯 Find your perfect study group in under 24 hours",
    "💰 Average Pro user saves $4,200 per year on college costs",
    "⚡ Get first access to exclusive campus events and networking"
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const isExplorer = user?.accountType === 'EXPLORER';
  const isPro = user?.accountType === 'PRO' || user?.accountType === 'PREMIUM';

  // Fetch feature votes and user's vote on component mount
  useEffect(() => {
    if (isPro) {
      fetchFeatureVotes();
      fetchUserVote();
    }
  }, [isPro]);

  const fetchFeatureVotes = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:3001/api/features/university-directory-marketplace/votes', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-user-id': localStorage.getItem('userId') || '',
          'x-account-type': user?.accountType || ''
        }
      });

      if (response.ok) {
        const data = await response.json();
        setFeatureVotes({
          upvotes: data.upvotes,
          downvotes: data.downvotes
        });
      }
    } catch (error) {
      console.error('Error fetching feature votes:', error);
    }
  };

  const fetchUserVote = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:3001/api/features/university-directory-marketplace/my-vote', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-user-id': localStorage.getItem('userId') || '',
          'x-account-type': user?.accountType || ''
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.hasVoted) {
          setUserVote(data.userVote.voteType);
          setHasVoted(true);
        }
      }
    } catch (error) {
      console.error('Error fetching user vote:', error);
    }
  };

  // Handle feature voting
  const handleVote = async (voteType: 'UPVOTE' | 'DOWNVOTE') => {
    if (votingLoading) return;
    
    setVotingLoading(true);
    
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:3001/api/features/vote', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-user-id': localStorage.getItem('userId') || '',
          'x-account-type': user?.accountType || '',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          featureName: 'university-directory-marketplace',
          voteType
        })
      });

      if (response.ok) {
        const data = await response.json();
        
        // Update local state
        if (hasVoted) {
          // User is changing their vote
          setFeatureVotes(prev => ({
            upvotes: userVote === 'UPVOTE' ? prev.upvotes - 1 : prev.upvotes,
            downvotes: userVote === 'DOWNVOTE' ? prev.downvotes - 1 : prev.downvotes
          }));
        }
        
        // Add new vote
        setFeatureVotes(prev => ({
          upvotes: voteType === 'UPVOTE' ? prev.upvotes + 1 : prev.upvotes,
          downvotes: voteType === 'DOWNVOTE' ? prev.downvotes + 1 : prev.downvotes
        }));
        
        setUserVote(voteType);
        setHasVoted(true);
      } else {
        const errorData = await response.json();
        console.error('Voting failed:', errorData);
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
    } finally {
      setVotingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-background">
      {/* Hero Section with Urgency */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[500px] flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #71ADBA 0%, #9C71BA 50%, #EDEAB1 100%)'
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Floating success elements */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-white/30"
            initial={{ y: 100, opacity: 0 }}
            animate={{ 
              y: -100, 
              opacity: [0, 1, 0],
              rotate: 360
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "linear"
            }}
            style={{
              left: Math.random() * 100 + '%',
              fontSize: Math.random() * 20 + 20 + 'px'
            }}
          >
            {['💎', '⚡', '🔥', '💰', '🎯', '✨'][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}

        <div className="relative text-center px-4 max-w-4xl mx-auto z-10 text-white">
          {isExplorer && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex items-center gap-2 bg-red-500/90 px-4 py-2 rounded-full mb-4 font-semibold"
            >
              <FlashOnIcon className="w-5 h-5" />
              LIMITED: Free Pro upgrade ends in {formatTime(timeLeft)}
            </motion.div>
          )}
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4"
          >
            {isExplorer ? "Unlock Campus Secrets" : "Explore Campus Life"}
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-6 sm:mb-8 px-4"
          >
            {isExplorer 
              ? "Get the insider access that 3,000+ students use to dominate college life"
              : "Discover what college life is really like with insider insights"
            }
          </motion.p>

          {isExplorer && (
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => navigate('/signup/pro')}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-full text-xl font-bold hover:scale-105 transition-transform shadow-2xl"
            >
              <WorkspacePremiumIcon className="w-6 h-6" />
              Claim Free Pro Access → Save $348/year
            </motion.button>
          )}
        </div>
      </motion.div>

                        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {isExplorer ? (
          <>
            {/* Success Story Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-white text-center mb-8">
                How Pro Users Are Winning at College 🏆
              </h2>
              
              <div className="relative bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-2xl p-8 border border-[#71ADBA]/20">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="text-center"
                  >
                    <div className="flex justify-center mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon key={i} className="w-6 h-6 text-yellow-400" />
                      ))}
                    </div>
                    <blockquote className="text-xl text-gray-300 mb-6 italic">
                      "{testimonials[currentTestimonial].text}"
                    </blockquote>
                    <div className="flex items-center justify-center gap-4">
                      <div>
                        <div className="font-semibold text-white">{testimonials[currentTestimonial].author}</div>
                        <div className="text-[#71ADBA]">{testimonials[currentTestimonial].school}</div>
                      </div>
                      <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-semibold">
                        Saved {testimonials[currentTestimonial].savings}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                <div className="flex justify-center mt-6 gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentTestimonial(i)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        i === currentTestimonial ? 'bg-[#71ADBA]' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* What You're Missing Out On */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-16"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  What You're Missing as an Explorer 😭
                </h2>
                <p className="text-xl text-gray-300">
                  While you're getting basic info, Pro users are accessing game-changing insider secrets
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Basic Explorer Features */}
                <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-gray-300 text-sm font-bold">FREE</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-300">Explorer Access (What You Have)</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {basicFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 opacity-70">
                        {feature.icon}
                        <div>
                          <h4 className="font-medium text-gray-400">{feature.title}</h4>
                          <p className="text-sm text-gray-500">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pro Features */}
                <div className="bg-gradient-to-br from-[#71ADBA]/20 to-[#9C71BA]/20 rounded-2xl p-6 border border-[#71ADBA]/30 relative overflow-hidden">
                  <div className="absolute top-4 right-4">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                      EXCLUSIVE
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-full flex items-center justify-center">
                      <WorkspacePremiumIcon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">Pro Access (What You Could Have)</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {proFeatures.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="text-[#71ADBA]">{feature.icon}</div>
                        <div>
                          <h4 className="font-medium text-white">{feature.title}</h4>
                          <p className="text-sm text-gray-300">{feature.description}</p>
                          <div className="text-xs text-[#EDEAB1] mt-1 font-medium">{feature.preview}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => navigate('/signup/pro')}
                    className="w-full mt-6 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white py-3 rounded-xl font-semibold hover:scale-[1.02] transition-transform"
                  >
                    Upgrade Now - Limited Time Free
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Pro Features Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-white text-center mb-12">
                Exclusive Pro Features You're Missing 💎
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {proFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="relative bg-[#1a2234]/50 rounded-xl p-6 border border-[#71ADBA]/20 hover:border-[#71ADBA]/40 transition-colors group cursor-pointer"
                    onClick={() => setShowProModal(true)}
                  >
                    <div className="absolute top-4 right-4 opacity-50">
                      <LockIcon className="w-5 h-5 text-gray-400" />
                    </div>
                    
                    <div className="text-[#71ADBA] mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300 text-sm mb-3">{feature.description}</p>
                    <div className="text-xs text-[#EDEAB1] font-medium bg-[#EDEAB1]/10 rounded-lg p-2">
                      Preview: {feature.preview}
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-[#71ADBA]/5 to-[#9C71BA]/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Why You Need This Now */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-16 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl p-8 border border-red-500/20"
            >
              <h2 className="text-3xl font-bold text-white text-center mb-8">
                Why Pro Users Are Dominating College (And You're Not) 🔥
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">While You're Struggling:</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-3">
                      <span className="text-red-400">❌</span>
                      Paying full price for everything (dorms, food, books)
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-red-400">❌</span>
                      Missing out on exclusive networking events
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-red-400">❌</span>
                      Studying alone in crowded, noisy spaces
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-red-400">❌</span>
                      Hearing about opportunities after they're gone
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Pro Users Are:</h3>
                  <ul className="space-y-3 text-gray-300">
                    {upgradeReasons.map((reason, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <span className="text-green-400">✅</span>
                        {reason.substring(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <button
                  onClick={() => navigate('/signup/pro')}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full text-xl font-bold hover:scale-105 transition-transform"
                >
                  <FlashOnIcon className="w-6 h-6" />
                  Don't Get Left Behind - Upgrade Free Now
                </button>
                <p className="text-sm text-gray-400 mt-2">
                  ⏰ {Math.floor(timeLeft / 60)} minutes left on free upgrade
                </p>
              </div>
            </motion.div>

            {/* Final CTA */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 rounded-2xl p-12 border border-[#71ADBA]/30"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Ready to Stop Missing Out? 🚀
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Join 3,000+ students who upgraded to Pro and are now crushing their college experience. 
                Don't spend another day getting basic info while others access insider secrets.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={() => navigate('/signup/pro')}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white rounded-full text-xl font-bold hover:scale-105 transition-transform"
                >
                  <WorkspacePremiumIcon className="w-6 h-6" />
                  Upgrade to Pro - Free Limited Time
                </button>
                
                <div className="text-center">
                  <div className="text-sm text-gray-400">⚡ Expires in {formatTime(timeLeft)}</div>
                  <div className="text-xs text-[#EDEAB1]">✨ No credit card required</div>
                </div>
              </div>
            </motion.div>
          </>
        ) : (
          // Non-authenticated or Pro users see original content
          <>
            {isPro && (
              <>
              {/* University Directory & Student Marketplace - Coming Soon Feature for Pro Users */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-16"
              >
                <div className="bg-gradient-to-br from-[#71ADBA]/20 to-[#9C71BA]/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-[#71ADBA]/30 relative overflow-hidden">
                  {/* Animated background elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-[#71ADBA]/10"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ 
                          y: -100, 
                          opacity: [0, 0.3, 0],
                          rotate: 360
                        }}
                        transition={{
                          duration: 12,
                          repeat: Infinity,
                          delay: i * 0.8,
                          ease: "linear"
                        }}
                        style={{
                          left: Math.random() * 100 + '%',
                          fontSize: Math.random() * 15 + 15 + 'px'
                        }}
                      >
                        {['🏫', '📚', '🛏️', '🍴', '💰', '🎓', '📱'][Math.floor(Math.random() * 7)]}
                      </motion.div>
                    ))}
                  </div>

                  {/* Coming Soon Badge */}
                  <div className="absolute top-6 right-6 z-10">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg"
                    >
                      🚀 COMING SOON
                    </motion.div>
                  </div>

                  <div className="relative z-10">
                    <div className="text-center mb-6 sm:mb-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="inline-flex flex-col sm:flex-row items-center gap-3 mb-4"
                      >
                                                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-xl sm:rounded-2xl flex items-center justify-center">
                            <span className="text-2xl sm:text-3xl">🏫</span>
                          </div>
                          <div className="text-center sm:text-left">
                            <h2 className="text-2xl sm:text-3xl font-bold text-white">University Directory</h2>
                            <p className="text-[#EDEAB1] font-medium">& Student Marketplace</p>
                          </div>
                      </motion.div>

                      <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
                        The ultimate platform for university discovery and student-to-student marketplace - exclusively for Pro members
                      </p>
                    </div>

                    {/* Feature Preview Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                      {/* University Directory */}
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-[#1a2234]/60 rounded-2xl p-6 border border-[#71ADBA]/20"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                            <span className="text-xl">🔍</span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-white">Smart University Search</h3>
                        </div>
                        <ul className="space-y-3 text-gray-300">
                          <li className="flex items-center gap-3">
                            <span className="text-blue-400">✨</span>
                            Search 3,000+ universities with AI-powered matching
                          </li>
                          <li className="flex items-center gap-3">
                            <span className="text-blue-400">✨</span>
                            Real student reviews and insider campus insights
                          </li>
                          <li className="flex items-center gap-3">
                            <span className="text-blue-400">✨</span>
                            Compare costs, programs, and campus life metrics
                          </li>
                          <li className="flex items-center gap-3">
                            <span className="text-blue-400">✨</span>
                            Virtual campus tours and dormitory previews
                          </li>
                        </ul>
                      </motion.div>

                      {/* Student Marketplace */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-[#1a2234]/60 rounded-2xl p-6 border border-[#71ADBA]/20"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
                            <span className="text-xl">💰</span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-white">Student-to-Student Marketplace</h3>
                        </div>
                        <ul className="space-y-3 text-gray-300">
                          <li className="flex items-center gap-3">
                            <span className="text-green-400">💡</span>
                            Buy/sell dorm essentials (microwaves, fridges, furniture)
                          </li>
                          <li className="flex items-center gap-3">
                            <span className="text-green-400">💡</span>
                            Textbook exchanges at 70% below retail prices
                          </li>
                          <li className="flex items-center gap-3">
                            <span className="text-green-400">💡</span>
                            Safe, verified transactions within university networks
                          </li>
                          <li className="flex items-center gap-3">
                            <span className="text-green-400">💡</span>
                            End-of-semester item handoffs to incoming students
                          </li>
                        </ul>
                      </motion.div>
                    </div>

                    {/* Example Listings Preview */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-[#0f1419]/60 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#71ADBA]/10 mb-6 sm:mb-8"
                    >
                                              <h4 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <span>📱</span>
                        Example Marketplace Listings
                      </h4>
                                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          { item: "Mini Fridge", price: "$45", original: "$120", seller: "Sarah @ NYU", savings: "62%" },
                          { item: "Microwave", price: "$25", original: "$80", seller: "Mike @ UCLA", savings: "69%" },
                          { item: "Desk Lamp Set", price: "$15", original: "$45", seller: "Emma @ MIT", savings: "67%" }
                        ].map((listing, index) => (
                          <div key={index} className="bg-[#1a2234]/40 rounded-lg p-4 border border-gray-700/50">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="text-white font-medium">{listing.item}</h5>
                              <span className="text-green-400 font-bold">{listing.price}</span>
                            </div>
                            <div className="text-xs text-gray-400 mb-2">
                              <span className="line-through">{listing.original}</span>
                              <span className="text-green-400 ml-2">Save {listing.savings}</span>
                            </div>
                            <div className="text-xs text-[#71ADBA]">{listing.seller}</div>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Voting Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="text-center"
                    >
                                              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                        Would you use this feature? 🤔
                      </h3>
                                              <p className="text-gray-300 mb-6 px-4 sm:px-0">
                        Help us prioritize development by voting! Your input shapes our roadmap.
                      </p>

                                              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-6">
                        {/* Upvote Button */}
                        <motion.button
                          whileHover={{ scale: votingLoading ? 1 : 1.05 }}
                          whileTap={{ scale: votingLoading ? 1 : 0.95 }}
                          onClick={() => handleVote('UPVOTE')}
                          disabled={votingLoading}
                          className={`flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold transition-all w-full sm:w-auto ${
                            userVote === 'UPVOTE' 
                              ? 'bg-green-500 text-white shadow-lg shadow-green-500/25' 
                              : votingLoading 
                                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                : 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
                          }`}
                        >
                          <span className="text-2xl">{votingLoading ? '⏳' : '👍'}</span>
                          <div className="text-left">
                            <div className="text-base sm:text-lg">Love it!</div>
                            <div className="text-xs sm:text-sm opacity-80">{featureVotes.upvotes} votes</div>
                          </div>
                        </motion.button>

                        {/* Downvote Button */}
                        <motion.button
                          whileHover={{ scale: votingLoading ? 1 : 1.05 }}
                          whileTap={{ scale: votingLoading ? 1 : 0.95 }}
                          onClick={() => handleVote('DOWNVOTE')}
                          disabled={votingLoading}
                          className={`flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold transition-all w-full sm:w-auto ${
                            userVote === 'DOWNVOTE' 
                              ? 'bg-red-500 text-white shadow-lg shadow-red-500/25' 
                              : votingLoading 
                                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                : 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                          }`}
                        >
                          <span className="text-2xl">{votingLoading ? '⏳' : '👎'}</span>
                          <div className="text-left">
                            <div className="text-base sm:text-lg">Not for me</div>
                            <div className="text-xs sm:text-sm opacity-80">{featureVotes.downvotes} votes</div>
                          </div>
                        </motion.button>
                      </div>

                      {/* Vote Results */}
                                              <div className="max-w-md mx-auto px-4 sm:px-0">
                        <div className="flex justify-between text-sm text-gray-400 mb-2">
                          <span>Community Interest</span>
                          <span>{Math.round((featureVotes.upvotes / (featureVotes.upvotes + featureVotes.downvotes)) * 100)}% positive</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ 
                              width: `${(featureVotes.upvotes / (featureVotes.upvotes + featureVotes.downvotes)) * 100}%` 
                            }}
                            transition={{ duration: 1, delay: 0.7 }}
                            className="h-full bg-gradient-to-r from-green-500 to-green-400"
                          />
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          {featureVotes.upvotes + featureVotes.downvotes} Pro members voted
                        </div>
                      </div>

                      {hasVoted && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-6 bg-[#EDEAB1]/10 border border-[#EDEAB1]/20 rounded-xl p-3 sm:p-4 mx-4 sm:mx-0"
                        >
                          <p className="text-[#EDEAB1] font-medium">
                            ✨ Thanks for your feedback! We'll notify you when this feature launches.
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              </>
            )}

            {!isPro && (
              <div className="text-center text-white">
                <h2 className="text-2xl font-bold mb-4">Sign up to explore campus life insights</h2>
                <button
                  onClick={() => navigate('/signup/explorer')}
                  className="px-6 py-3 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white rounded-lg font-semibold"
                >
                  Get Started Free
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Pro Modal */}
      <AnimatePresence>
        {showProModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setShowProModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1a2234] rounded-2xl p-8 max-w-2xl w-full border border-[#71ADBA]/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <WorkspacePremiumIcon className="w-16 h-16 text-[#71ADBA] mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-2">Unlock This Feature</h3>
                <p className="text-gray-300">
                  Upgrade to Pro to access exclusive campus insights that give you an unfair advantage
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-xl p-6 mb-6">
                <h4 className="text-white font-semibold mb-3">🔥 Limited Time: Pro Access Free</h4>
                <ul className="text-sm text-gray-300 space-y-2">
                  <li>✅ All premium campus insights unlocked</li>
                  <li>✅ Real-time opportunity alerts</li>
                  <li>✅ Student insider network access</li>
                  <li>✅ Cost-saving tools (avg. save $4,200/year)</li>
                </ul>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setShowProModal(false)}
                  className="flex-1 py-3 border border-gray-600 text-gray-300 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                >
                  Maybe Later
                </button>
                <button
                  onClick={() => {
                    setShowProModal(false);
                    navigate('/signup/pro');
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white rounded-xl font-semibold hover:scale-[1.02] transition-transform"
                >
                  Claim Free Access
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CampusLifePage; 