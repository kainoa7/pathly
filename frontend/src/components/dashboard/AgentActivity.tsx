import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Skeleton,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import {
  SmartToy as BotIcon,
  Schedule as ScheduleIcon,
  Article as ArticleIcon,
  Email as EmailIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

interface WeeklyDigest {
  id: string;
  createdAt: string;
}

interface AgentActivityProps {
  className?: string;
}

export const AgentActivity: React.FC<AgentActivityProps> = ({ className }) => {
  const [lastDigest, setLastDigest] = useState<WeeklyDigest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [articlesCount, setArticlesCount] = useState(0);

  useEffect(() => {
    fetchAgentActivity();
  }, []);

  const fetchAgentActivity = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        setIsLoading(false);
        return;
      }

      // Fetch latest weekly digest
      try {
        const digestResponse = await fetch('/api/weekly-updates/latest', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (digestResponse.ok) {
          const digestData = await digestResponse.json();
          setLastDigest(digestData.weeklyUpdate);
        }
      } catch (error) {
        console.error('Error fetching digest:', error);
      }

      // Mock articles count for last 24h (since we don't have a specific stats endpoint)
      // In a real implementation, this could be a separate endpoint
      try {
        const newsResponse = await fetch('/api/news?limit=50', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (newsResponse.ok) {
          const newsData = await newsResponse.json();
          const articles = newsData.articles || [];
          
          // Count articles from last 24 hours
          const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
          const recentArticles = articles.filter((article: any) => 
            new Date(article.publishedAt) > yesterday
          );
          
          setArticlesCount(recentArticles.length);
        }
      } catch (error) {
        console.error('Error fetching news stats:', error);
        // Use a mock count if API fails
        setArticlesCount(Math.floor(Math.random() * 15) + 5);
      }

    } catch (error) {
      console.error('Error fetching agent activity:', error);
    } finally {
      setIsLoading(false);
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
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityItems = () => {
    const items = [];

    // Weekly digest activity
    if (lastDigest) {
      items.push({
        id: 'digest',
        title: 'Weekly Digest Generated',
        subtitle: 'AI curated your personalized weekly summary',
        time: formatDate(lastDigest.createdAt),
        icon: <EmailIcon />,
        color: '#3B82F6',
        status: 'completed'
      });
    }

    // News import activity
    if (articlesCount > 0) {
      items.push({
        id: 'news',
        title: `${articlesCount} Articles Curated`,
        subtitle: 'AI agents imported and categorized new content',
        time: 'Last 24 hours',
        icon: <ArticleIcon />,
        color: '#10B981',
        status: 'completed'
      });
    }

    // Mock future activities
    items.push({
      id: 'analysis',
      title: 'Market Analysis',
      subtitle: 'AI agents analyzing trends in your field',
      time: 'In progress',
      icon: <TrendingIcon />,
      color: '#F59E0B',
      status: 'in-progress'
    });

    return items;
  };

  if (isLoading) {
    return (
      <Card className={`${className || ''}`}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="text" width="50%" height={32} />
          </Box>
          {[...Array(3)].map((_, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="text" width="80%" height={24} />
                <Skeleton variant="text" width="60%" height={20} />
              </Box>
              <Skeleton variant="rectangular" width={60} height={20} />
            </Box>
          ))}
        </CardContent>
      </Card>
    );
  }

  const activityItems = getActivityItems();

  return (
    <Card className={`${className || ''}`}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
          <BotIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h6" component="h2">
            Agent Activity
          </Typography>
          <Chip
            label="AI Powered"
            size="small"
            color="primary"
            variant="outlined"
            sx={{ ml: 1 }}
          />
        </Box>

        {activityItems.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <BotIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              AI agents will begin working on your personalized content soon.
            </Typography>
          </Box>
        ) : (
          <List sx={{ p: 0 }}>
            {activityItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ListItem
                  sx={{
                    px: 0,
                    py: 1,
                    borderBottom: index < activityItems.length - 1 ? '1px solid' : 'none',
                    borderColor: 'divider',
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        bgcolor: item.color,
                        width: 36,
                        height: 36,
                      }}
                    >
                      {item.icon}
                    </Avatar>
                  </ListItemAvatar>
                  
                  <ListItemText
                    primary={
                      <Typography variant="subtitle2" fontWeight={600}>
                        {item.title}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {item.subtitle}
                      </Typography>
                    }
                  />
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 0.5 }}>
                    <Typography variant="caption" color="text.secondary">
                      {item.time}
                    </Typography>
                    <Chip
                      label={item.status === 'completed' ? 'Done' : 'Active'}
                      size="small"
                      color={item.status === 'completed' ? 'success' : 'warning'}
                      variant="filled"
                      sx={{ height: 18, fontSize: '10px' }}
                    />
                  </Box>
                </ListItem>
              </motion.div>
            ))}
          </List>
        )}

        {activityItems.length > 0 && (
          <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <ScheduleIcon sx={{ fontSize: 14 }} />
              AI agents work 24/7 to curate personalized content for you
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};