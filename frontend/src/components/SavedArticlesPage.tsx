import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';

interface SavedArticle {
  savedAt: string;
  article: {
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
    saved: boolean;
  };
}

const SavedArticlesPage = () => {
  const { user } = useAuth();
  const [savedArticles, setSavedArticles] = useState<SavedArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');

  const categories = [
    { value: 'ALL', label: 'All Categories', icon: '📰' },
    { value: 'TECH', label: 'Technology', icon: '💻' },
    { value: 'BUSINESS', label: 'Business', icon: '💼' },
    { value: 'FINANCE', label: 'Finance', icon: '💰' },
    { value: 'SPORTS', label: 'Sports', icon: '⚽' },
    { value: 'AI', label: 'AI', icon: '🤖' }
  ];

  const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

  useEffect(() => {
    fetchSavedArticles();
  }, [filterCategory]);

  const fetchSavedArticles = async () => {
    try {
      setLoading(true);
      const categoryParam = filterCategory === 'ALL' ? '' : `?category=${filterCategory}`;
      const response = await fetch(`${apiUrl}/api/news/saved${categoryParam}`, {
        headers: {
          'x-account-type': user?.accountType || '',
          'x-user-id': user?.id || ''
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSavedArticles(data.savedArticles);
      } else {
        console.error('Failed to fetch saved articles');
      }
    } catch (error) {
      console.error('Error fetching saved articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsave = async (articleId: string) => {
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
        if (!result.saved) {
          // Remove from saved articles list
          setSavedArticles(savedArticles.filter(saved => saved.article.id !== articleId));
        }
      }
    } catch (error) {
      console.error('Error unsaving article:', error);
    }
  };

  const filteredArticles = savedArticles.filter(saved => {
    const article = saved.article;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const formatSavedDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-background flex items-center justify-center">
        <div className="text-white text-xl">Loading saved articles...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#1a2234] to-[#2a3441] border-b border-[#71ADBA]/20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-4xl">📚</div>
            <div>
              <h1 className="text-3xl font-bold text-white">My Saved Articles</h1>
              <p className="text-gray-400">Your personal collection of bookmarked news articles</p>
            </div>
            <div className="ml-auto bg-[#71ADBA]/20 px-4 py-2 rounded-lg">
              <span className="text-[#71ADBA] font-semibold">{filteredArticles.length} articles saved</span>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search saved articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-backgroundSecondary border border-dark-border rounded-lg text-white placeholder-gray-400 focus:border-[#71ADBA] focus:outline-none"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <FilterListIcon className="text-gray-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-dark-backgroundSecondary border border-dark-border rounded-lg px-4 py-3 text-white focus:border-[#71ADBA] focus:outline-none"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.icon} {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Saved Articles */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {savedArticles.length === 0 ? 'No saved articles yet' : 'No articles match your search'}
            </h2>
            <p className="text-gray-400">
              {savedArticles.length === 0 
                ? 'Start saving articles from the news feed to build your personal collection!'
                : 'Try adjusting your search terms or filters.'
              }
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((saved) => {
              const article = saved.article;
              return (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-dark-backgroundSecondary rounded-lg border border-dark-border hover:border-[#71ADBA]/50 transition-all duration-300 overflow-hidden group"
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
                    {/* Category & Save Info */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-[#71ADBA]/20 text-[#71ADBA] px-2 py-1 rounded text-xs font-medium">
                        {categories.find(c => c.value === article.category)?.icon} {article.category}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-gray-400">
                          Saved {formatTimeAgo(saved.savedAt)}
                        </div>
                        <button
                          onClick={() => handleUnsave(article.id)}
                          className="text-[#71ADBA] hover:text-red-400 transition-colors"
                          title="Remove from saved"
                        >
                          <DeleteIcon sx={{ fontSize: 16 }} />
                        </button>
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

                    {/* Author & Time */}
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                      <span>By {article.authorName}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <AccessTimeIcon sx={{ fontSize: 12 }} />
                        {formatTimeAgo(article.publishedAt)}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-dark-border">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-gray-400">
                          <ThumbUpIcon sx={{ fontSize: 14 }} />
                          <span className="text-xs">{article.stats.upvotes}</span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-gray-400">
                          <FavoriteIcon sx={{ fontSize: 14 }} />
                          <span className="text-xs">{article.stats.likes}</span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-gray-400">
                          <CommentIcon sx={{ fontSize: 14 }} />
                          <span className="text-xs">{article.stats.comments}</span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Score: {article.stats.score}
                      </div>
                    </div>

                    {/* Saved Date */}
                    <div className="mt-3 pt-3 border-t border-dark-border/50">
                      <div className="flex items-center gap-2 text-xs text-[#71ADBA]">
                        <BookmarkIcon sx={{ fontSize: 12 }} />
                        <span>Saved on {formatSavedDate(saved.savedAt)}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedArticlesPage; 