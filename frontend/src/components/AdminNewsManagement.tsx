import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import BarChartIcon from '@mui/icons-material/BarChart';
import ImageIcon from '@mui/icons-material/Image';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: 'TECH' | 'BUSINESS' | 'FINANCE' | 'SPORTS' | 'AI';
  imageUrl?: string;
  sourceUrl?: string;
  authorName?: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    comments: number;
    votes: number;
  };
}

interface Analytics {
  overview: {
    totalArticles: number;
    totalComments: number;
    totalVotes: number;
    avgCommentsPerArticle: string;
  };
  articlesByCategory: Array<{
    category: string;
    _count: { id: number };
  }>;
  topArticles: NewsArticle[];
  recentActivity: {
    newArticles: number;
    newComments: number;
    newVotes: number;
  };
}

const AdminNewsManagement = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);
  const [showAnalytics, setShowAnalytics] = useState(false);

  // Form state for creating/editing articles
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    summary: '',
    category: 'TECH' as const,
    imageUrl: '',
    sourceUrl: '',
    authorName: 'Admin'
  });

  const categories = [
    { value: 'TECH', label: 'Technology', icon: '💻' },
    { value: 'BUSINESS', label: 'Business', icon: '💼' },
    { value: 'FINANCE', label: 'Finance', icon: '💰' },
    { value: 'SPORTS', label: 'Sports', icon: '⚽' },
    { value: 'AI', label: 'AI', icon: '🤖' }
  ];

  const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

  useEffect(() => {
    fetchArticles();
    fetchAnalytics();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/news/admin/all?page=1&limit=50`, {
        headers: {
          'x-user-role': 'ADMIN'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setArticles(data.articles);
      } else {
        console.error('Failed to fetch articles');
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/news/admin/analytics`, {
        headers: {
          'x-user-role': 'ADMIN'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const handleCreateArticle = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/news/admin/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-role': 'ADMIN'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        setArticles([result.article, ...articles]);
        resetForm();
        setShowCreateModal(false);
        fetchAnalytics(); // Refresh analytics
      } else {
        const error = await response.json();
        alert(`Error creating article: ${error.message}`);
      }
    } catch (error) {
      console.error('Error creating article:', error);
      alert('Network error. Please try again.');
    }
  };

  const handleUpdateArticle = async () => {
    if (!editingArticle) return;

    try {
      const response = await fetch(`${apiUrl}/api/news/admin/${editingArticle.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-user-role': 'ADMIN'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        setArticles(articles.map(article => 
          article.id === editingArticle.id ? result.article : article
        ));
        resetForm();
        setEditingArticle(null);
      } else {
        const error = await response.json();
        alert(`Error updating article: ${error.message}`);
      }
    } catch (error) {
      console.error('Error updating article:', error);
      alert('Network error. Please try again.');
    }
  };

  const handleDeleteArticle = async (articleId: string, articleTitle: string) => {
    if (!confirm(`Are you sure you want to delete "${articleTitle}"? This will also delete all comments and votes. This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/news/admin/${articleId}`, {
        method: 'DELETE',
        headers: {
          'x-user-role': 'ADMIN'
        }
      });

      if (response.ok) {
        setArticles(articles.filter(article => article.id !== articleId));
        fetchAnalytics(); // Refresh analytics
        alert('Article deleted successfully');
      } else {
        const error = await response.json();
        alert(`Error deleting article: ${error.message}`);
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Network error. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      summary: '',
      category: 'TECH',
      imageUrl: '',
      sourceUrl: '',
      authorName: 'Admin'
    });
  };

  const openEditModal = (article: NewsArticle) => {
    setFormData({
      title: article.title,
      content: article.content,
      summary: article.summary,
      category: article.category,
      imageUrl: article.imageUrl || '',
      sourceUrl: article.sourceUrl || '',
      authorName: article.authorName || 'Admin'
    });
    setEditingArticle(article);
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'ALL' || article.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      TECH: 'bg-blue-500',
      BUSINESS: 'bg-green-500',
      FINANCE: 'bg-yellow-500',
      SPORTS: 'bg-red-500',
      AI: 'bg-purple-500'
    };
    return colors[category] || 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading news management...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                📰 News Management
              </h1>
              <p className="text-gray-400 mt-2">Manage news articles and monitor engagement</p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <BarChartIcon />
                Analytics
              </button>
              
              <button
                onClick={() => {
                  resetForm();
                  setShowCreateModal(true);
                }}
                className="bg-[#71ADBA] hover:bg-[#71ADBA]/80 px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <AddIcon />
                Create Article
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Panel */}
      {showAnalytics && analytics && (
        <div className="bg-gray-800 border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h2 className="text-xl font-bold mb-4">Analytics Overview</h2>
            
            <div className="grid md:grid-cols-4 gap-6 mb-6">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-2xl font-bold text-[#71ADBA]">{analytics.overview.totalArticles}</div>
                <div className="text-gray-400">Total Articles</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-400">{analytics.overview.totalComments}</div>
                <div className="text-gray-400">Total Comments</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-400">{analytics.overview.totalVotes}</div>
                <div className="text-gray-400">Total Votes</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-400">{analytics.overview.avgCommentsPerArticle}</div>
                <div className="text-gray-400">Avg Comments/Article</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Category Distribution */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Articles by Category</h3>
                <div className="space-y-2">
                  {analytics.articlesByCategory.map((item) => (
                    <div key={item.category} className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        {categories.find(c => c.value === item.category)?.icon} {item.category}
                      </span>
                      <span className="font-semibold">{item._count.id}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Last 7 Days</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>New Articles:</span>
                    <span className="font-semibold text-[#71ADBA]">{analytics.recentActivity.newArticles}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New Comments:</span>
                    <span className="font-semibold text-green-400">{analytics.recentActivity.newComments}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New Votes:</span>
                    <span className="font-semibold text-yellow-400">{analytics.recentActivity.newVotes}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-[#71ADBA] focus:outline-none"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <FilterListIcon className="text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-[#71ADBA] focus:outline-none"
            >
              <option value="ALL">All Categories</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.icon} {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid gap-6">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📰</div>
              <h2 className="text-2xl font-bold text-white mb-2">No articles found</h2>
              <p className="text-gray-400">Create your first news article to get started!</p>
            </div>
          ) : (
            filteredArticles.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`${getCategoryColor(article.category)} px-2 py-1 rounded text-xs font-medium text-white`}>
                          {categories.find(c => c.value === article.category)?.icon} {article.category}
                        </span>
                        <span className="text-gray-400 text-sm">
                          By {article.authorName} • {formatDate(article.publishedAt)}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                        {article.title}
                      </h3>
                      
                      <p className="text-gray-400 mb-4 line-clamp-2">
                        {article.summary}
                      </p>
                      
                      {article.imageUrl && (
                        <div className="mb-4">
                          <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        </div>
                      )}
                      
                      <div className="flex items-center gap-6 text-sm text-gray-400">
                        <span>💬 {article._count?.comments || 0} comments</span>
                        <span>👍 {article._count?.votes || 0} votes</span>
                        <span>Updated {formatDate(article.updatedAt)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => window.open(`/news`, '_blank')}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                        title="View Article"
                      >
                        <VisibilityIcon />
                      </button>
                      
                      <button
                        onClick={() => openEditModal(article)}
                        className="p-2 text-gray-400 hover:text-blue-400 hover:bg-gray-700 rounded-lg transition-colors"
                        title="Edit Article"
                      >
                        <EditIcon />
                      </button>
                      
                      <button
                        onClick={() => handleDeleteArticle(article.id, article.title)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
                        title="Delete Article"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || editingArticle) && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">
                {editingArticle ? 'Edit Article' : 'Create New Article'}
              </h2>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-gray-300 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#71ADBA] focus:outline-none"
                  placeholder="Enter article title..."
                />
              </div>

              {/* Category and Author */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-[#71ADBA] focus:outline-none"
                  >
                    {categories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.icon} {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Author Name</label>
                  <input
                    type="text"
                    value={formData.authorName}
                    onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                    className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#71ADBA] focus:outline-none"
                    placeholder="Author name..."
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-gray-300 mb-2">
                  <ImageIcon className="inline mr-2" />
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#71ADBA] focus:outline-none"
                  placeholder="https://example.com/image.jpg"
                />
                {formData.imageUrl && (
                  <div className="mt-2">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Summary */}
              <div>
                <label className="block text-gray-300 mb-2">Summary *</label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  rows={3}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#71ADBA] focus:outline-none resize-none"
                  placeholder="Brief summary for article cards..."
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-gray-300 mb-2">Content *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={12}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#71ADBA] focus:outline-none resize-none"
                  placeholder="Full article content..."
                />
              </div>

              {/* Source URL */}
              <div>
                <label className="block text-gray-300 mb-2">Source URL</label>
                <input
                  type="url"
                  value={formData.sourceUrl}
                  onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-[#71ADBA] focus:outline-none"
                  placeholder="https://source.com/article"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-6 border-t border-gray-700 flex justify-end gap-4">
              <button
                onClick={() => {
                  resetForm();
                  setShowCreateModal(false);
                  setEditingArticle(null);
                }}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <CancelIcon />
                Cancel
              </button>
              
              <button
                onClick={editingArticle ? handleUpdateArticle : handleCreateArticle}
                disabled={!formData.title || !formData.content || !formData.summary}
                className="px-6 py-2 bg-[#71ADBA] hover:bg-[#71ADBA]/80 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <SaveIcon />
                {editingArticle ? 'Update Article' : 'Create Article'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNewsManagement; 