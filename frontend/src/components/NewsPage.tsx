import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import InfoIcon from '@mui/icons-material/Info';

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  imageUrl?: string;
  sourceUrl?: string;
  sourceName?: string;
  authorName?: string;
  publishedAt: string;
  stats: {
    upvotes: number;
    downvotes: number;
    likes: number;
    comments: number;
    score: number;
  };
  userVote?: 'UPVOTE' | 'DOWNVOTE' | 'LIKE' | null;
  saved?: boolean;
  aiInsight?: {
    type: 'SKILL_ALERT' | 'CAREER_OPPORTUNITY' | 'INDUSTRY_TREND' | 'ROLE_RELEVANT' | 'SALARY_IMPACT';
    message: string;
    relevanceScore: number;
    actionable: boolean;
  };
}

interface NewsComment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    accountType: string;
  };
  replies?: NewsComment[];
}

const NewsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [comments, setComments] = useState<NewsComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  const categories = [
    { value: 'ALL', label: 'All News', icon: '��' },
    { value: 'AI_INSIGHTS', label: 'AI Insights', icon: '🤖', special: true },
    { value: 'TECH', label: 'Technology', icon: '💻' },
    { value: 'BUSINESS', label: 'Business', icon: '💼' },
    { value: 'FINANCE', label: 'Finance', icon: '💰' },
    { value: 'SPORTS', label: 'Sports', icon: '⚽' },
    { value: 'AI', label: 'AI', icon: '🤖' }
  ];

  const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

  useEffect(() => {
    fetchNews();
  }, [selectedCategory]);

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowTooltip(null);
    };

    if (showTooltip) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showTooltip]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const categoryParam = selectedCategory === 'ALL' ? '' : `?category=${selectedCategory}`;
      const response = await fetch(`${apiUrl}/api/news${categoryParam}`, {
        headers: {
          'x-account-type': user?.accountType || '',
          'x-user-id': user?.id || ''
        }
      });

      if (response.ok) {
        const data = await response.json();
        
        // Mock source names for credibility
        const mockSources = ['Reuters', 'TechCrunch', 'Bloomberg', 'Forbes', 'The Verge', 'Wired', 'MIT Technology Review', 'Harvard Business Review'];
        
        // Generate AI insights for each article
        const articlesWithInsights = data.articles.map((article: NewsArticle) => {
          const aiInsight = generateAIInsight(article, user);
          const sourceName = article.sourceName || mockSources[Math.floor(Math.random() * mockSources.length)];
          return {
            ...article,
            sourceName,
            aiInsight
          };
        });
        
        setArticles(articlesWithInsights);
      } else {
        console.error('Failed to fetch news');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (articleId: string, voteType: 'UPVOTE' | 'DOWNVOTE' | 'LIKE') => {
    try {
      const response = await fetch(`${apiUrl}/api/news/${articleId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-account-type': user?.accountType || '',
          'x-user-id': user?.id || ''
        },
        body: JSON.stringify({ voteType })
      });

      if (response.ok) {
        // Refresh the news to get updated vote counts
        fetchNews();
        if (selectedArticle?.id === articleId) {
          fetchArticleDetails(articleId);
        }
      }
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const handleSave = async (articleId: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/news/${articleId}/save`, {
        method: 'POST',
        headers: {
          'x-account-type': user?.accountType || '',
          'x-user-id': user?.id || ''
        }
      });

      if (response.ok) {
        const result = await response.json();
        // Update the article's saved status in the current list
        setArticles(articles.map(article => 
          article.id === articleId 
            ? { ...article, saved: result.saved }
            : article
        ));
        
        // Update selected article if it's the same one
        if (selectedArticle?.id === articleId) {
          setSelectedArticle({ ...selectedArticle, saved: result.saved });
        }
      }
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const fetchArticleDetails = async (articleId: string) => {
    try {
      const response = await fetch(`${apiUrl}/api/news/${articleId}`, {
        headers: {
          'x-account-type': user?.accountType || '',
          'x-user-id': user?.id || ''
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedArticle(data);
        setComments(data.comments || []);
      }
    } catch (error) {
      console.error('Error fetching article details:', error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !selectedArticle) return;

    try {
      const response = await fetch(`${apiUrl}/api/news/${selectedArticle.id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-account-type': user?.accountType || '',
          'x-user-id': user?.id || ''
        },
        body: JSON.stringify({ content: newComment })
      });

      if (response.ok) {
        setNewComment('');
        fetchArticleDetails(selectedArticle.id);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const openArticle = (article: NewsArticle) => {
    setSelectedArticle(article);
    setShowArticleModal(true);
    fetchArticleDetails(article.id);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getEngagementLevel = (score: number) => {
    if (score >= 50) return { level: 'Viral', color: 'text-yellow-400', bg: 'bg-yellow-400/20' };
    if (score >= 20) return { level: 'Trending', color: 'text-green-400', bg: 'bg-green-400/20' };
    if (score >= 10) return { level: 'Popular', color: 'text-blue-400', bg: 'bg-blue-400/20' };
    if (score >= 3) return { level: 'Active', color: 'text-purple-400', bg: 'bg-purple-400/20' };
    if (score >= 0) return { level: 'New', color: 'text-gray-400', bg: 'bg-gray-400/20' };
    return { level: 'Controversial', color: 'text-red-400', bg: 'bg-red-400/20' };
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  // AI Career Insights Generator (simulated for demo)
  const generateAIInsight = (article: NewsArticle, userProfile?: any) => {
    if (!user) return null;

    // Simulated AI insights based on article content and user profile
    const insights = [
      {
        type: 'SKILL_ALERT' as const,
        message: `The ${article.category.toLowerCase()} skills mentioned in this article are trending 23% higher in job postings for ${user.accountType === 'PRO' ? 'senior' : 'entry-level'} roles.`,
        relevanceScore: 85,
        actionable: true,
        trigger: ['TECH', 'AI']
      },
      {
        type: 'CAREER_OPPORTUNITY' as const,
        message: `Companies mentioned in this article are actively hiring for Product Management roles - your target career path.`,
        relevanceScore: 92,
        actionable: true,
        trigger: ['BUSINESS', 'TECH']
      },
      {
        type: 'INDUSTRY_TREND' as const,
        message: `This trend could impact your industry. Consider how it affects your current role strategy.`,
        relevanceScore: 78,
        actionable: false,
        trigger: ['FINANCE', 'BUSINESS']
      },
      {
        type: 'ROLE_RELEVANT' as const,
        message: `This development is directly relevant to software engineering roles you've shown interest in.`,
        relevanceScore: 88,
        actionable: true,
        trigger: ['TECH', 'AI']
      },
      {
        type: 'SALARY_IMPACT' as const,
        message: `Professionals with knowledge of this technology earn 15% more on average in your target market.`,
        relevanceScore: 95,
        actionable: true,
        trigger: ['TECH', 'AI', 'BUSINESS']
      }
    ];

    // Filter insights based on article category and user engagement
    const relevantInsights = insights.filter(insight => 
      insight.trigger.includes(article.category) && 
      insight.relevanceScore >= 75
    );

    if (relevantInsights.length === 0) return null;

    // Return the most relevant insight
    return relevantInsights.reduce((best, current) => 
      current.relevanceScore > best.relevanceScore ? current : best
    );
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'SKILL_ALERT': return '🚀';
      case 'CAREER_OPPORTUNITY': return '💼';
      case 'INDUSTRY_TREND': return '📈';
      case 'ROLE_RELEVANT': return '🎯';
      case 'SALARY_IMPACT': return '💰';
      default: return '🤖';
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'SKILL_ALERT': return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400';
      case 'CAREER_OPPORTUNITY': return 'from-green-500/20 to-emerald-500/20 border-green-500/30 text-green-400';
      case 'INDUSTRY_TREND': return 'from-purple-500/20 to-violet-500/20 border-purple-500/30 text-purple-400';
      case 'ROLE_RELEVANT': return 'from-orange-500/20 to-amber-500/20 border-orange-500/30 text-orange-400';
      case 'SALARY_IMPACT': return 'from-yellow-500/20 to-gold-500/20 border-yellow-500/30 text-yellow-400';
      default: return 'from-gray-500/20 to-slate-500/20 border-gray-500/30 text-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-background flex items-center justify-center">
        <div className="text-white text-xl">Loading news...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-background pt-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a2234] to-[#2a3441] border-b border-[#71ADBA]/20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-4xl">📰</div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white">Daily News Hub</h1>
              <p className="text-gray-400">Stay informed with curated news and community discussions</p>
            </div>
            <button
              onClick={() => navigate('/saved-articles')}
              className="flex items-center gap-2 px-4 py-2 bg-[#71ADBA]/20 hover:bg-[#71ADBA]/30 border border-[#71ADBA]/40 hover:border-[#71ADBA]/60 rounded-lg transition-all text-[#71ADBA] hover:text-white"
            >
              <BookmarkIcon />
              <span>My Saved Articles</span>
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const articlesWithInsights = articles.filter(article => article.aiInsight);
              const isAIInsights = category.value === 'AI_INSIGHTS';
              const isSelected = selectedCategory === category.value;
              
              return (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all relative ${
                    isSelected
                      ? isAIInsights 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                        : 'bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white'
                      : isAIInsights
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-400 hover:from-blue-500/30 hover:to-purple-600/30 border border-blue-500/30 hover:border-blue-400/50'
                        : 'bg-dark-backgroundSecondary text-gray-300 hover:bg-[#71ADBA]/20'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.label}</span>
                  {isAIInsights && (
                    <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-semibold">
                      {articlesWithInsights.length}
                    </span>
                  )}
                  {isAIInsights && !isSelected && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {(() => {
          const displayArticles = selectedCategory === 'AI_INSIGHTS' 
            ? articles.filter(article => article.aiInsight)
            : articles;
            
          return displayArticles.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">
                {selectedCategory === 'AI_INSIGHTS' ? '🤖' : '📰'}
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {selectedCategory === 'AI_INSIGHTS' 
                  ? 'No AI insights available' 
                  : 'No news available'
                }
              </h2>
              <p className="text-gray-400">
                {selectedCategory === 'AI_INSIGHTS'
                  ? 'Try switching to other categories to see articles with personalized career insights!'
                  : 'Check back later for updates!'
                }
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayArticles.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-dark-backgroundSecondary rounded-lg border border-dark-border hover:border-[#71ADBA]/50 transition-all duration-300 overflow-hidden cursor-pointer group"
                onClick={() => openArticle(article)}
              >
                {/* Article Image */}
                {article.imageUrl && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Category & Time */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-[#71ADBA]/20 text-[#71ADBA] px-2 py-1 rounded text-xs font-medium">
                      {categories.find(c => c.value === article.category)?.icon} {article.category}
                    </span>
                    <div className="flex items-center gap-1 text-gray-400 text-xs">
                      <AccessTimeIcon sx={{ fontSize: 14 }} />
                      {formatTimeAgo(article.publishedAt)}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-[#71ADBA] transition-colors">
                    {article.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {article.summary}
                  </p>

                  {/* AI Career Insight */}
                  {article.aiInsight && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className={`mb-4 p-3 rounded-lg bg-gradient-to-r ${getInsightColor(article.aiInsight.type)} border backdrop-blur-sm`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="text-lg flex-shrink-0 mt-0.5">
                          {getInsightIcon(article.aiInsight.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold uppercase tracking-wider opacity-90">
                              {article.aiInsight.type === 'SKILL_ALERT' && 'Skill Alert'}
                              {article.aiInsight.type === 'CAREER_OPPORTUNITY' && 'For You'}
                              {article.aiInsight.type === 'INDUSTRY_TREND' && 'Industry Impact'}
                              {article.aiInsight.type === 'ROLE_RELEVANT' && 'Career Relevant'}
                              {article.aiInsight.type === 'SALARY_IMPACT' && 'Salary Insight'}
                            </span>
                            <div className="flex items-center gap-1">
                              <div className="w-1 h-1 bg-current rounded-full opacity-50"></div>
                              <span className="text-xs opacity-70">{article.aiInsight.relevanceScore}% match</span>
                            </div>
                          </div>
                          <p className="text-sm leading-relaxed opacity-90">
                            {article.aiInsight.message}
                          </p>
                          {article.aiInsight.actionable && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                // Could navigate to relevant career tools
                                console.log('Navigate to career action for:', article.aiInsight?.type);
                              }}
                              className="mt-2 text-xs font-medium opacity-80 hover:opacity-100 transition-opacity underline decoration-dotted"
                            >
                              Take Action →
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Engagement Score Badge */}
                  <div className="mb-4">
                    {(() => {
                      const engagement = getEngagementLevel(article.stats.score);
                      return (
                        <div className="flex items-center justify-between">
                          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${engagement.bg} border border-current/30`}>
                            <TrendingUpIcon className={`${engagement.color}`} sx={{ fontSize: 16 }} />
                            <span className={`text-sm font-semibold ${engagement.color}`}>
                              {engagement.level}
                            </span>
                            <span className="text-xs text-gray-400">
                              {article.stats.upvotes - article.stats.downvotes}
                            </span>
                          </div>
                          <div 
                            className="relative cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowTooltip(showTooltip === article.id ? null : article.id);
                            }}
                          >
                            <InfoIcon className="text-gray-400 hover:text-gray-300 transition-colors" sx={{ fontSize: 16 }} />
                            {showTooltip === article.id && (
                              <div className="absolute right-0 top-6 w-64 p-3 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-50">
                                <div className="text-xs text-gray-300 leading-relaxed">
                                  <div className="font-semibold text-white mb-1">Score Calculation:</div>
                                  <div>Simple: Upvotes - Downvotes</div>
                                  <div className="mt-2 text-gray-400">
                                    {article.stats.upvotes} upvotes - {article.stats.downvotes} downvotes = {article.stats.upvotes - article.stats.downvotes}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Interactive Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-dark-border">
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVote(article.id, 'UPVOTE');
                        }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                          article.userVote === 'UPVOTE'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-gray-700/50 text-gray-400 hover:bg-green-500/10 hover:text-green-400 border border-transparent hover:border-green-500/20'
                        }`}
                      >
                        <ThumbUpIcon sx={{ fontSize: 18 }} />
                        <span className="text-sm font-medium">{formatNumber(article.stats.upvotes)}</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVote(article.id, 'DOWNVOTE');
                        }}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                          article.userVote === 'DOWNVOTE'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-gray-700/50 text-gray-400 hover:bg-red-500/10 hover:text-red-400 border border-transparent hover:border-red-500/20'
                        }`}
                      >
                        <ThumbDownIcon sx={{ fontSize: 18 }} />
                        <span className="text-sm font-medium">{formatNumber(article.stats.downvotes)}</span>
                      </motion.button>
                      
                      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-700/30 text-gray-400 border border-gray-600/30">
                        <CommentIcon sx={{ fontSize: 18 }} />
                        <span className="text-sm font-medium">{formatNumber(article.stats.comments)}</span>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSave(article.id);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                        article.saved
                          ? 'bg-[#71ADBA]/20 text-[#71ADBA] border border-[#71ADBA]/30'
                          : 'bg-gray-700/50 text-gray-400 hover:bg-[#71ADBA]/10 hover:text-[#71ADBA] border border-transparent hover:border-[#71ADBA]/20'
                      }`}
                      title={article.saved ? 'Remove from saved' : 'Save article'}
                    >
                      {article.saved ? (
                        <BookmarkIcon sx={{ fontSize: 18 }} />
                      ) : (
                        <BookmarkBorderIcon sx={{ fontSize: 18 }} />
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );
      })()}
    </div>

      {/* Article Modal */}
      {showArticleModal && selectedArticle && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-backgroundSecondary rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-dark-border">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">{selectedArticle.title}</h2>
                <button
                  onClick={() => setShowArticleModal(false)}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                <span>By {selectedArticle.authorName}</span>
                <span>{formatTimeAgo(selectedArticle.publishedAt)}</span>
                {selectedArticle.sourceName && (
                  <span className="flex items-center gap-1">
                    <span>•</span>
                    <span className="text-[#71ADBA]">Source: {selectedArticle.sourceName}</span>
                  </span>
                )}
              </div>
            </div>

            {/* AI Career Insight - Moved to Top for Maximum Impact */}
            {selectedArticle.aiInsight && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`m-6 p-6 rounded-xl bg-gradient-to-r ${getInsightColor(selectedArticle.aiInsight.type)} border backdrop-blur-sm`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl flex-shrink-0 mt-1">
                    {getInsightIcon(selectedArticle.aiInsight.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-bold uppercase tracking-wider">
                        {selectedArticle.aiInsight.type === 'SKILL_ALERT' && '🚀 Skill Alert'}
                        {selectedArticle.aiInsight.type === 'CAREER_OPPORTUNITY' && '💼 Career Opportunity'}
                        {selectedArticle.aiInsight.type === 'INDUSTRY_TREND' && '📈 Industry Impact'}
                        {selectedArticle.aiInsight.type === 'ROLE_RELEVANT' && '🎯 Highly Relevant'}
                        {selectedArticle.aiInsight.type === 'SALARY_IMPACT' && '💰 Salary Intelligence'}
                      </span>
                      <div className="bg-white/20 px-2 py-1 rounded-full">
                        <span className="text-xs font-semibold">{selectedArticle.aiInsight.relevanceScore}% match</span>
                      </div>
                    </div>
                    <p className="text-base leading-relaxed mb-4">
                      {selectedArticle.aiInsight.message}
                    </p>
                    {selectedArticle.aiInsight.actionable && (
                      <div className="flex gap-3">
                        <button 
                          onClick={() => {
                            // Navigate to relevant career tools based on insight type
                            switch (selectedArticle.aiInsight?.type) {
                              case 'SKILL_ALERT':
                                console.log('Navigate to skill tracker');
                                break;
                              case 'CAREER_OPPORTUNITY':
                                console.log('Navigate to job opportunities');
                                break;
                              case 'SALARY_IMPACT':
                                console.log('Navigate to salary analytics');
                                break;
                              default:
                                console.log('Navigate to career dashboard');
                            }
                          }}
                          className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition-all duration-200 border border-white/20 hover:border-white/40"
                        >
                          Explore This Opportunity
                        </button>
                        <button 
                          onClick={() => {
                            console.log('Save insight for later');
                          }}
                          className="px-4 py-2 bg-transparent hover:bg-white/10 rounded-lg text-sm font-medium transition-all duration-200 border border-white/20 hover:border-white/40"
                        >
                          Save Insight
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Modal Content */}
            <div className="p-6">
              {selectedArticle.imageUrl && (
                <img
                  src={selectedArticle.imageUrl}
                  alt={selectedArticle.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}
              
              <div className="prose prose-invert max-w-none mb-6">
                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {selectedArticle.content}
                </p>
              </div>

              {/* Engagement & Voting Section */}
              <div className="space-y-4 p-6 bg-dark-background rounded-lg mb-6">
                {/* Engagement Score */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {(() => {
                      const engagement = getEngagementLevel(selectedArticle.stats.upvotes - selectedArticle.stats.downvotes);
                      return (
                        <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full ${engagement.bg} border border-current/30`}>
                          <TrendingUpIcon className={`${engagement.color}`} sx={{ fontSize: 20 }} />
                          <span className={`text-lg font-bold ${engagement.color}`}>
                            {engagement.level}
                          </span>
                          <span className="text-sm text-gray-400">
                            Score: {selectedArticle.stats.upvotes - selectedArticle.stats.downvotes}
                          </span>
                        </div>
                      );
                    })()}
                  </div>
                  <div 
                    className="relative cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowTooltip(showTooltip === 'modal' ? null : 'modal');
                    }}
                  >
                    <InfoIcon className="text-gray-400 hover:text-gray-300 transition-colors" sx={{ fontSize: 20 }} />
                    {showTooltip === 'modal' && (
                      <div className="absolute right-0 top-8 w-72 p-4 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50">
                        <div className="text-sm text-gray-300 leading-relaxed">
                          <div className="font-semibold text-white mb-2">Score Calculation:</div>
                          <div>Simple: Upvotes - Downvotes</div>
                          <div className="mt-2 text-gray-400">
                            {selectedArticle.stats.upvotes} upvotes - {selectedArticle.stats.downvotes} downvotes = {selectedArticle.stats.upvotes - selectedArticle.stats.downvotes}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Simplified Voting Buttons */}
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleVote(selectedArticle.id, 'UPVOTE')}
                    className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all font-medium ${
                      selectedArticle.userVote === 'UPVOTE'
                        ? 'bg-green-500/20 text-green-400 border-2 border-green-500/40 shadow-lg shadow-green-500/20'
                        : 'bg-gray-700/50 text-gray-300 hover:bg-green-500/10 hover:text-green-400 border-2 border-transparent hover:border-green-500/30'
                    }`}
                  >
                    <ThumbUpIcon sx={{ fontSize: 20 }} />
                    <span className="text-lg">{formatNumber(selectedArticle.stats.upvotes)}</span>
                    <span className="text-sm opacity-80">Upvotes</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleVote(selectedArticle.id, 'DOWNVOTE')}
                    className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all font-medium ${
                      selectedArticle.userVote === 'DOWNVOTE'
                        ? 'bg-red-500/20 text-red-400 border-2 border-red-500/40 shadow-lg shadow-red-500/20'
                        : 'bg-gray-700/50 text-gray-300 hover:bg-red-500/10 hover:text-red-400 border-2 border-transparent hover:border-red-500/30'
                    }`}
                  >
                    <ThumbDownIcon sx={{ fontSize: 20 }} />
                    <span className="text-lg">{formatNumber(selectedArticle.stats.downvotes)}</span>
                    <span className="text-sm opacity-80">Downvotes</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSave(selectedArticle.id)}
                    className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all font-medium ${
                      selectedArticle.saved
                        ? 'bg-[#71ADBA]/20 text-[#71ADBA] border-2 border-[#71ADBA]/40 shadow-lg shadow-[#71ADBA]/20'
                        : 'bg-gray-700/50 text-gray-300 hover:bg-[#71ADBA]/10 hover:text-[#71ADBA] border-2 border-transparent hover:border-[#71ADBA]/30'
                    }`}
                    title={selectedArticle.saved ? 'Remove from saved' : 'Save article'}
                  >
                    {selectedArticle.saved ? (
                      <BookmarkIcon sx={{ fontSize: 20 }} />
                    ) : (
                      <BookmarkBorderIcon sx={{ fontSize: 20 }} />
                    )}
                    <span className="text-sm opacity-80">{selectedArticle.saved ? 'Saved' : 'Save'}</span>
                  </motion.button>
                </div>
              </div>

              {/* Comments Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">
                  Comments ({comments.length})
                </h3>
                
                {/* Add Comment */}
                <div className="space-y-3">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="w-full p-3 bg-dark-background border border-dark-border rounded-lg text-white placeholder-gray-400 resize-none"
                    rows={3}
                  />
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Post Comment
                  </button>
                </div>

                {/* Comments List */}
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-dark-background p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-white">
                            {comment.user.firstName} {comment.user.lastName}
                          </span>
                          <span className="bg-[#71ADBA]/20 text-[#71ADBA] px-2 py-1 rounded text-xs">
                            {comment.user.accountType}
                          </span>
                        </div>
                        <span className="text-gray-400 text-xs">
                          {formatTimeAgo(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-300">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPage; 