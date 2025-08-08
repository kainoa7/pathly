import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
  Alert,
  Chip,
  Avatar,
  Button,
} from '@mui/material';
import {
  TrendingUp as TrendingIcon,
  Schedule as ScheduleIcon,
  Article as ArticleIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface PersonalizedArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  publishedAt: string;
  relevance: number;
}

interface ForYouListProps {
  className?: string;
}

export const ForYouList: React.FC<ForYouListProps> = ({ className }) => {
  const [articles, setArticles] = useState<PersonalizedArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPersonalizedNews();
  }, []);

  const fetchPersonalizedNews = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('Not authenticated');
        return;
      }

      const response = await fetch('/api/news/for-you?limit=10', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      } else {
        throw new Error(`Failed to fetch personalized news: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching personalized news:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch news');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'TECH': '#3B82F6',
      'AI': '#8B5CF6',
      'BUSINESS': '#10B981',
      'FINANCE': '#F59E0B',
      'SPORTS': '#EF4444',
    };
    return colors[category] || '#6B7280';
  };

  const getRelevanceReason = (article: PersonalizedArticle) => {
    if (article.relevance >= 3) return 'Highly relevant to your interests';
    if (article.relevance >= 2) return 'Matches your interests';
    if (article.relevance >= 1) return 'Related to your profile';
    return 'Latest updates';
  };

  if (isLoading) {
    return (
      <Card className={`${className || ''}`}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="text" width="40%" height={32} />
          </Box>
          {[...Array(5)].map((_, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'start', gap: 2 }}>
                <Skeleton variant="circular" width={40} height={40} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="80%" height={24} />
                  <Skeleton variant="text" width="100%" height={20} />
                  <Skeleton variant="text" width="60%" height={20} />
                  <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                    <Skeleton variant="rectangular" width={60} height={20} />
                    <Skeleton variant="rectangular" width={80} height={20} />
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`${className || ''}`}>
        <CardContent>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Button variant="outlined" onClick={() => fetchPersonalizedNews()}>
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (articles.length === 0) {
    return (
      <Card className={`${className || ''} border-dashed`}>
        <CardContent>
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <ArticleIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Personalized Content Yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Complete your onboarding to get personalized news recommendations based on your interests and goals.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${className || ''}`}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrendingIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h6" component="h2">
              New For You
            </Typography>
          </Box>
          <Button
            size="small"
            startIcon={<RefreshIcon />}
            onClick={() => fetchPersonalizedNews(true)}
            disabled={refreshing}
            sx={{ ml: 'auto' }}
          >
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'start', 
                  gap: 2,
                  p: 2,
                  borderRadius: 1,
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                    cursor: 'pointer'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: getCategoryColor(article.category),
                    width: 40,
                    height: 40,
                    fontSize: '14px'
                  }}
                >
                  {article.category.slice(0, 2)}
                </Avatar>
                
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography 
                    variant="subtitle1" 
                    component="h3"
                    sx={{ 
                      fontWeight: 600,
                      mb: 0.5,
                      lineHeight: 1.3,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {article.title}
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      mb: 1,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: 1.4
                    }}
                  >
                    {article.summary}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <ScheduleIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {formatDate(article.publishedAt)}
                      </Typography>
                    </Box>
                    
                    <Typography variant="caption" color="text.secondary">
                      •
                    </Typography>
                    
                    <Typography variant="caption" color="text.secondary">
                      {article.source}
                    </Typography>
                    
                    {article.relevance > 0 && (
                      <>
                        <Typography variant="caption" color="text.secondary">
                          •
                        </Typography>
                        <Chip
                          label={getRelevanceReason(article)}
                          size="small"
                          variant="outlined"
                          color="primary"
                          sx={{ 
                            height: 20,
                            fontSize: '10px',
                            '& .MuiChip-label': { px: 1 }
                          }}
                        />
                      </>
                    )}
                  </Box>
                </Box>
              </Box>
            </motion.div>
          ))}
        </Box>
        
        {articles.length >= 10 && (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button variant="outlined" href="/news">
              View All News
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};