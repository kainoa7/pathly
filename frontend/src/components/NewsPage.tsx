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

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  imageUrl?: string;
  sourceUrl?: string;
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

  const categories = [
    { value: 'ALL', label: 'All News', icon: '📰' },
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
        setArticles(data.articles);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-background flex items-center justify-center">
        <div className="text-white text-xl">Loading news...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-background">
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
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  selectedCategory === category.value
                    ? 'bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white'
                    : 'bg-dark-backgroundSecondary text-gray-300 hover:bg-[#71ADBA]/20'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📰</div>
            <h2 className="text-2xl font-bold text-white mb-2">No news available</h2>
            <p className="text-gray-400">Check back later for updates!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
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

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-dark-border">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVote(article.id, 'UPVOTE');
                        }}
                        className="flex items-center gap-1 text-gray-400 hover:text-green-400 transition-colors"
                      >
                        <ThumbUpIcon sx={{ fontSize: 16 }} />
                        <span className="text-xs">{article.stats.upvotes}</span>
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVote(article.id, 'LIKE');
                        }}
                        className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <FavoriteIcon sx={{ fontSize: 16 }} />
                        <span className="text-xs">{article.stats.likes}</span>
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSave(article.id);
                        }}
                        className={`flex items-center gap-1 transition-colors ${
                          article.saved 
                            ? 'text-[#71ADBA] hover:text-[#71ADBA]/80' 
                            : 'text-gray-400 hover:text-[#71ADBA]'
                        }`}
                        title={article.saved ? 'Remove from saved' : 'Save article'}
                      >
                        {article.saved ? (
                          <BookmarkIcon sx={{ fontSize: 16 }} />
                        ) : (
                          <BookmarkBorderIcon sx={{ fontSize: 16 }} />
                        )}
                      </button>
                      
                      <div className="flex items-center gap-1 text-gray-400">
                        <CommentIcon sx={{ fontSize: 16 }} />
                        <span className="text-xs">{article.stats.comments}</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      Score: {article.stats.score}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
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
              </div>
            </div>

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

              {/* Voting Section */}
              <div className="flex items-center gap-4 p-4 bg-dark-background rounded-lg mb-6">
                <button
                  onClick={() => handleVote(selectedArticle.id, 'UPVOTE')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    selectedArticle.userVote === 'UPVOTE'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-green-600'
                  }`}
                >
                  <ThumbUpIcon />
                  <span>{selectedArticle.stats.upvotes}</span>
                </button>
                
                <button
                  onClick={() => handleVote(selectedArticle.id, 'DOWNVOTE')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    selectedArticle.userVote === 'DOWNVOTE'
                      ? 'bg-red-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-red-600'
                  }`}
                >
                  <ThumbDownIcon />
                  <span>{selectedArticle.stats.downvotes}</span>
                </button>
                
                <button
                  onClick={() => handleVote(selectedArticle.id, 'LIKE')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    selectedArticle.userVote === 'LIKE'
                      ? 'bg-pink-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-pink-600'
                  }`}
                >
                  <FavoriteIcon />
                  <span>{selectedArticle.stats.likes}</span>
                </button>
                
                <button
                  onClick={() => handleSave(selectedArticle.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    selectedArticle.saved
                      ? 'bg-[#71ADBA] text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-[#71ADBA]'
                  }`}
                  title={selectedArticle.saved ? 'Remove from saved' : 'Save article'}
                >
                  {selectedArticle.saved ? (
                    <BookmarkIcon />
                  ) : (
                    <BookmarkBorderIcon />
                  )}
                  <span>{selectedArticle.saved ? 'Saved' : 'Save'}</span>
                </button>
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