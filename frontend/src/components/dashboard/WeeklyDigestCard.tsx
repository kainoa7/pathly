import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Collapse,
  Box,
  Skeleton,
  Alert,
  Chip,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CalendarToday as CalendarIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { track } from '../../lib/analytics';

interface WeeklyDigest {
  id: string;
  summary: string;
  html: string;
  createdAt: string;
  openedAt: string | null;
}

interface WeeklyDigestCardProps {
  className?: string;
}

export const WeeklyDigestCard: React.FC<WeeklyDigestCardProps> = ({ className }) => {
  const [digest, setDigest] = useState<WeeklyDigest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [markingAsOpened, setMarkingAsOpened] = useState(false);

  useEffect(() => {
    fetchLatestDigest();
  }, []);

  const fetchLatestDigest = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('Not authenticated');
        return;
      }

      const response = await fetch('/api/weekly-updates/latest', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 204) {
        // No digest available
        setDigest(null);
      } else if (response.ok) {
        const data = await response.json();
        setDigest(data.weeklyUpdate);
      } else {
        throw new Error(`Failed to fetch digest: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching weekly digest:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch digest');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExpand = async () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);

    // Track digest opened and mark as opened on first expand
    if (newExpanded && digest && !digest.openedAt) {
      track('Weekly Digest Opened');
      await markAsOpened();
    }
  };

  const markAsOpened = async () => {
    if (!digest || markingAsOpened) return;

    try {
      setMarkingAsOpened(true);
      const token = localStorage.getItem('accessToken');
      
      const response = await fetch(`/api/weekly-updates/${digest.id}/open`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setDigest(prev => prev ? { ...prev, openedAt: new Date().toISOString() } : null);
      }
    } catch (error) {
      console.error('Error marking digest as opened:', error);
    } finally {
      setMarkingAsOpened(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <Card className={`${className || ''}`}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="text" width="60%" height={32} />
          </Box>
          <Skeleton variant="text" width="100%" height={60} />
          <Skeleton variant="rectangular" width="30%" height={36} sx={{ mt: 2 }} />
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
          <Button variant="outlined" onClick={fetchLatestDigest}>
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!digest) {
    return (
      <Card className={`${className || ''} border-dashed`}>
        <CardContent>
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <CalendarIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No Weekly Digest Yet
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your personalized weekly digest will appear here once our AI agents have curated content based on your interests.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`${className || ''} ${!digest.openedAt ? 'ring-2 ring-blue-500/20' : ''}`}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarIcon sx={{ color: 'primary.main' }} />
              <Typography variant="h6" component="h2">
                Weekly Digest
              </Typography>
              {!digest.openedAt && (
                <Chip
                  label="New"
                  size="small"
                  color="primary"
                  variant="filled"
                />
              )}
            </Box>
            <Typography variant="caption" color="text.secondary">
              {formatDate(digest.createdAt)}
            </Typography>
          </Box>

          <Typography variant="body1" color="text.primary" sx={{ mb: 2, lineHeight: 1.6 }}>
            {digest.summary}
          </Typography>

          <Button
            variant={expanded ? "outlined" : "contained"}
            startIcon={expanded ? <ExpandMoreIcon sx={{ transform: 'rotate(180deg)' }} /> : <ViewIcon />}
            onClick={handleExpand}
            disabled={markingAsOpened}
            sx={{ mt: 1 }}
          >
            {expanded ? 'Collapse Details' : 'View Details'}
          </Button>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box sx={{ mt: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
              <div
                dangerouslySetInnerHTML={{ __html: digest.html }}
                style={{
                  fontSize: '14px',
                  lineHeight: '1.5',
                  color: '#333'
                }}
              />
            </Box>
          </Collapse>
        </CardContent>
      </Card>
    </motion.div>
  );
};