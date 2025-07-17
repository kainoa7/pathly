import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BusinessIcon from '@mui/icons-material/Business';
import ComputerIcon from '@mui/icons-material/Computer';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

interface NewsItem {
  id: string;
  category: 'Tech' | 'Business' | 'Finance' | 'Education' | 'Careers';
  title: string;
  summary: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: string;
  likes: number;
  comments: number;
  isBookmarked: boolean;
  isLiked: boolean;
  tags: string[];
  impact: 'High' | 'Medium' | 'Low';
  relevanceScore: number;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  publishedAt: string;
  likes: number;
  isLiked: boolean;
  replies?: Comment[];
}

const CategoryIcon = ({ category }: { category: string }) => {
  const iconMap = {
    'Tech': <ComputerIcon className="w-5 h-5" />,
    'Business': <BusinessIcon className="w-5 h-5" />,
    'Finance': <AccountBalanceIcon className="w-5 h-5" />,
    'Education': <SchoolIcon className="w-5 h-5" />,
    'Careers': <WorkIcon className="w-5 h-5" />
  };
  
  return iconMap[category as keyof typeof iconMap] || <TrendingUpIcon className="w-5 h-5" />;
};

const NewsFeeds = ({ isPreview = false, isLocked = false }: { isPreview?: boolean; isLocked?: boolean }) => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [showComments, setShowComments] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');

  const categories = ['All', 'Tech', 'Business', 'Finance', 'Education', 'Careers'];

  // Mock news data - in real app this would come from API
  const mockNews: NewsItem[] = [
    {
      id: '1',
      category: 'Tech',
      title: 'AI Engineer Salaries Jump 47% as Demand Skyrockets',
      summary: 'New market data shows AI engineering roles commanding premium salaries as companies race to implement AI solutions.',
      content: 'Recent market analysis reveals that AI engineering positions have seen unprecedented salary growth...',
      author: 'Sarah Chen',
      publishedAt: '2 hours ago',
      readTime: '3 min read',
      likes: 234,
      comments: 47,
      isBookmarked: false,
      isLiked: false,
      tags: ['AI', 'Salaries', 'Tech Jobs'],
      impact: 'High',
      relevanceScore: 95
    },
    {
      id: '2', 
      category: 'Business',
      title: 'Remote Work Policy Changes Affecting Entry-Level Hiring',
      summary: 'Major corporations are shifting remote work policies, creating new opportunities for recent graduates.',
      content: 'The latest corporate policy changes are reshaping how companies approach entry-level hiring...',
      author: 'Michael Rodriguez',
      publishedAt: '4 hours ago',
      readTime: '5 min read',
      likes: 189,
      comments: 32,
      isBookmarked: true,
      isLiked: true,
      tags: ['Remote Work', 'Entry Level', 'Corporate Policy'],
      impact: 'High',
      relevanceScore: 88
    },
    {
      id: '3',
      category: 'Finance',
      title: 'Student Loan Forgiveness Updates Impact Career Choices',
      summary: 'New student loan policies are influencing how graduates approach career planning and salary negotiations.',
      content: 'Recent changes to student loan forgiveness programs are having unexpected effects on career decisions...',
      author: 'Jennifer Wu',
      publishedAt: '6 hours ago',
      readTime: '4 min read',
      likes: 156,
      comments: 28,
      isBookmarked: false,
      isLiked: false,
      tags: ['Student Loans', 'Career Planning', 'Finance'],
      impact: 'Medium',
      relevanceScore: 82
    },
    {
      id: '4',
      category: 'Careers',
      title: 'Skills-Based Hiring Overtakes Degree Requirements',
      summary: 'Companies increasingly prioritize demonstrable skills over traditional degree requirements in hiring.',
      content: 'A significant shift in hiring practices shows companies focusing more on practical skills...',
      author: 'David Kim',
      publishedAt: '8 hours ago',
      readTime: '6 min read',
      likes: 298,
      comments: 65,
      isBookmarked: false,
      isLiked: true,
      tags: ['Hiring Trends', 'Skills', 'Education'],
      impact: 'High',
      relevanceScore: 91
    },
    {
      id: '5',
      category: 'Education',
      title: 'Bootcamps vs. Traditional CS Degrees: New ROI Analysis',
      summary: 'Comprehensive analysis reveals surprising insights about return on investment for different education paths.',
      content: 'Our latest research comparing coding bootcamps to traditional computer science degrees...',
      author: 'Lisa Park',
      publishedAt: '10 hours ago',
      readTime: '7 min read',
      likes: 178,
      comments: 41,
      isBookmarked: true,
      isLiked: false,
      tags: ['Education', 'Bootcamps', 'ROI'],
      impact: 'Medium',
      relevanceScore: 79
    }
  ];

  const mockComments: { [key: string]: Comment[] } = {
    '1': [
      {
        id: 'c1',
        author: 'Alex Thompson',
        content: 'This aligns with what I\'m seeing in the market. Just got three AI engineer offers and they\'re all 40%+ above my current salary.',
        publishedAt: '1 hour ago',
        likes: 23,
        isLiked: false
      },
      {
        id: 'c2',
        author: 'Maya Patel',
        content: 'Great analysis! Would love to see similar data for ML engineers and data scientists.',
        publishedAt: '45 minutes ago',
        likes: 12,
        isLiked: true
      }
    ],
    '2': [
      {
        id: 'c3',
        author: 'Jordan Lee',
        content: 'Finally! My company just went fully remote for new grads. Game changer for talent acquisition.',
        publishedAt: '2 hours ago',
        likes: 18,
        isLiked: false
      }
    ]
  };

  const filteredNews = selectedCategory === 'All' 
    ? mockNews 
    : mockNews.filter(item => item.category === selectedCategory);

  const displayedNews = isPreview ? filteredNews.slice(0, 3) : filteredNews;

  const handleLike = (newsId: string) => {
    if (isLocked) return;
    // In real app, update like status via API
    console.log(`Liked article ${newsId}`);
  };

  const handleBookmark = (newsId: string) => {
    if (isLocked) return;
    // In real app, update bookmark status via API
    console.log(`Bookmarked article ${newsId}`);
  };

  const handleComment = (newsId: string) => {
    if (isLocked) return;
    setShowComments(showComments === newsId ? null : newsId);
  };

  const submitComment = (newsId: string) => {
    if (isLocked || !newComment.trim()) return;
    // In real app, submit comment via API
    console.log(`Comment on ${newsId}: ${newComment}`);
    setNewComment('');
  };

  if (isLocked) {
    return (
      <div className="relative">
        {/* Blurred Content Preview */}
        <div className="filter blur-sm pointer-events-none">
          <div className="space-y-4">
            {displayedNews.slice(0, 2).map((item) => (
              <div key={item.id} className="bg-[#1a2234]/50 rounded-lg p-4 border border-[#71ADBA]/20">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${
                    item.category === 'Tech' ? 'from-blue-500/20 to-cyan-500/20' :
                    item.category === 'Business' ? 'from-green-500/20 to-emerald-500/20' :
                    item.category === 'Finance' ? 'from-yellow-500/20 to-orange-500/20' :
                    item.category === 'Education' ? 'from-purple-500/20 to-pink-500/20' :
                    'from-red-500/20 to-rose-500/20'
                  }`}>
                    <CategoryIcon category={item.category} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{item.summary}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>{item.author}</span>
                      <span>{item.publishedAt}</span>
                      <span>{item.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lock Overlay */}
        <div className="absolute inset-0 bg-[#1a2234]/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <div className="text-center p-8">
            <LockIcon className="w-16 h-16 text-[#71ADBA] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">
              🗞️ Daily Career News & Insights
            </h3>
            <p className="text-gray-300 mb-4">
              Pro users get daily career news updates, market insights, and can join the discussion with comments and likes.
            </p>
            <div className="space-y-2 text-sm text-gray-400 mb-6">
              <div>✨ Daily news from Tech, Business, Finance sectors</div>
              <div>💬 Join discussions with career-focused professionals</div>
              <div>📌 Bookmark articles for later reading</div>
              <div>🔥 Get personalized news based on your career interests</div>
            </div>
            <button
              onClick={() => window.location.href = '/signup/pro'}
              className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              Unlock Career News Feed
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {!isPreview && (
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-2">
            🗞️ Daily Career News & Insights
          </h2>
          <p className="text-gray-300">
            Stay ahead with the latest career-focused news, market insights, and professional discussions.
          </p>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === category
                ? 'bg-[#71ADBA] text-white'
                : 'bg-[#1a2234]/50 text-gray-300 hover:bg-[#1a2234]/80'
            }`}
          >
            {category !== 'All' && <CategoryIcon category={category} />}
            <span className={category !== 'All' ? 'ml-2' : ''}>{category}</span>
          </button>
        ))}
      </div>

      {/* News Feed */}
      <div className="space-y-6">
        <AnimatePresence>
          {displayedNews.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1a2234]/50 rounded-lg p-6 border border-[#71ADBA]/20 hover:border-[#71ADBA]/40 transition-colors"
            >
              {/* Article Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r flex-shrink-0 ${
                  item.category === 'Tech' ? 'from-blue-500/20 to-cyan-500/20 text-blue-400' :
                  item.category === 'Business' ? 'from-green-500/20 to-emerald-500/20 text-green-400' :
                  item.category === 'Finance' ? 'from-yellow-500/20 to-orange-500/20 text-yellow-400' :
                  item.category === 'Education' ? 'from-purple-500/20 to-pink-500/20 text-purple-400' :
                  'from-red-500/20 to-rose-500/20 text-red-400'
                }`}>
                  <CategoryIcon category={item.category} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.category === 'Tech' ? 'bg-blue-500/20 text-blue-300' :
                      item.category === 'Business' ? 'bg-green-500/20 text-green-300' :
                      item.category === 'Finance' ? 'bg-yellow-500/20 text-yellow-300' :
                      item.category === 'Education' ? 'bg-purple-500/20 text-purple-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {item.category}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.impact === 'High' ? 'bg-red-500/20 text-red-300' :
                      item.impact === 'Medium' ? 'bg-orange-500/20 text-orange-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}>
                      {item.impact} Impact
                    </span>
                    <span className="text-[#71ADBA] text-xs font-medium">
                      {item.relevanceScore}% relevant to you
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 cursor-pointer hover:text-[#71ADBA] transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-3">
                    {item.summary}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <PersonIcon className="w-4 h-4" />
                      <span>{item.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <AccessTimeIcon className="w-4 h-4" />
                      <span>{item.publishedAt}</span>
                    </div>
                    <span>{item.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Article Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[#71ADBA]/10">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(item.id)}
                    className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    {item.isLiked ? (
                      <FavoriteIcon className="w-5 h-5 text-red-400" />
                    ) : (
                      <FavoriteBorderIcon className="w-5 h-5" />
                    )}
                    <span>{item.likes}</span>
                  </button>
                  
                  <button
                    onClick={() => handleComment(item.id)}
                    className="flex items-center gap-2 text-gray-400 hover:text-[#71ADBA] transition-colors"
                  >
                    <ChatBubbleOutlineIcon className="w-5 h-5" />
                    <span>{item.comments}</span>
                  </button>
                  
                  <button
                    onClick={() => handleBookmark(item.id)}
                    className="flex items-center gap-2 text-gray-400 hover:text-[#EDEAB1] transition-colors"
                  >
                    {item.isBookmarked ? (
                      <BookmarkIcon className="w-5 h-5 text-[#EDEAB1]" />
                    ) : (
                      <BookmarkBorderIcon className="w-5 h-5" />
                    )}
                  </button>
                  
                  <button className="flex items-center gap-2 text-gray-400 hover:text-[#9C71BA] transition-colors">
                    <ShareIcon className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-[#71ADBA]/10 text-[#71ADBA] text-xs rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Comments Section */}
              <AnimatePresence>
                {showComments === item.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-[#71ADBA]/10"
                  >
                    {/* Comment Input */}
                    <div className="mb-4">
                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-[#71ADBA] rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1">
                          <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Join the discussion..."
                            className="w-full bg-[#1a2234]/50 border border-[#71ADBA]/20 rounded-lg p-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-[#71ADBA]/50"
                            rows={3}
                          />
                          <div className="flex justify-end mt-2">
                            <button
                              onClick={() => submitComment(item.id)}
                              disabled={!newComment.trim()}
                              className="bg-[#71ADBA] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#9C71BA] transition-colors disabled:opacity-50"
                            >
                              Comment
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Existing Comments */}
                    {mockComments[item.id]?.map((comment) => (
                      <div key={comment.id} className="flex gap-3 mb-4">
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {comment.author.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="bg-[#1a2234]/30 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-white font-medium text-sm">{comment.author}</span>
                              <span className="text-gray-400 text-xs">{comment.publishedAt}</span>
                            </div>
                            <p className="text-gray-300 text-sm">{comment.content}</p>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                            <button className="hover:text-red-400 transition-colors">
                              ❤️ {comment.likes}
                            </button>
                            <button className="hover:text-[#71ADBA] transition-colors">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {isPreview && (
        <div className="text-center mt-6">
          <button
            onClick={() => window.location.href = '/signup/pro'}
            className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-8 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
          >
            View All News & Join Discussions
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsFeeds; 