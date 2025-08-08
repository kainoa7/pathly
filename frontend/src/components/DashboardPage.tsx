import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Box,
  Breadcrumbs,
  Link,
  Alert,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useUserStore } from '../state/user';
import { track } from '../lib/analytics';
import { WeeklyDigestCard } from './dashboard/WeeklyDigestCard';
import { ForYouList } from './dashboard/ForYouList';
import { QuickActions } from './dashboard/QuickActions';
import { AgentActivity } from './dashboard/AgentActivity';

const DashboardPage: React.FC = () => {
  const { user, isLoading: userLoading } = useUserStore();
  const [hasTrackedView, setHasTrackedView] = useState(false);

  useEffect(() => {
    // Track dashboard view once when data is loaded
    if (!userLoading && user && !hasTrackedView) {
      track('Dashboard Viewed');
      setHasTrackedView(true);
    }
  }, [user, userLoading, hasTrackedView]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getUserName = () => {
    if (!user) return 'there';
    return user.firstName || user.email.split('@')[0];
  };

  const getWelcomeMessage = () => {
    if (!user) return 'Welcome to your dashboard';
    
    if (!user.onboardingComplete) {
      return "Let's get you set up with personalized content";
    }

    return `${getGreeting()}, ${getUserName()}!`;
  };

  if (userLoading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard
          </Typography>
        </Box>
        {/* Loading skeleton would go here */}
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
          color="inherit"
          href="/"
        >
          <HomeIcon fontSize="inherit" />
          Home
        </Link>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <DashboardIcon fontSize="inherit" />
          Dashboard
        </Box>
      </Breadcrumbs>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            {getWelcomeMessage()}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Stay up to date with personalized insights and AI-curated content.
          </Typography>
        </Box>
      </motion.div>

      {/* Onboarding Alert */}
      {user && !user.onboardingComplete && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Alert 
            severity="info" 
            sx={{ mb: 3 }}
            action={
              <Link href="/onboarding" sx={{ textDecoration: 'none' }}>
                Complete Setup
              </Link>
            }
          >
            Complete your profile setup to get personalized news and recommendations.
          </Alert>
        </motion.div>
      )}

      {/* Dashboard Grid */}
      <Grid container spacing={3}>
        {/* Left Column - Main Content */}
        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}>
            {/* Weekly Digest */}
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <WeeklyDigestCard />
              </motion.div>
            </Grid>

            {/* For You News */}
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ForYouList />
              </motion.div>
            </Grid>
          </Grid>
        </Grid>

        {/* Right Column - Sidebar */}
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            {/* Quick Actions */}
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <QuickActions />
              </motion.div>
            </Grid>

            {/* Agent Activity */}
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <AgentActivity />
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Bottom CTA for Explorer Users */}
      {user?.accountType === 'EXPLORER' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Box 
            sx={{ 
              mt: 4, 
              p: 3, 
              textAlign: 'center',
              bgcolor: 'primary.main',
              color: 'white',
              borderRadius: 2,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}
          >
            <Typography variant="h6" gutterBottom>
              Ready to unlock your full potential? 🚀
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Upgrade to Pro for personalized news, career insights, and AI-powered tools.
            </Typography>
            <Link 
              href="/pricing" 
              sx={{ 
                color: 'white', 
                textDecoration: 'none',
                fontWeight: 'bold',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Explore Pro Features →
            </Link>
          </Box>
        </motion.div>
      )}
    </Container>
  );
};

export default DashboardPage;