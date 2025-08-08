import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Upgrade as UpgradeIcon,
  Email as EmailIcon,
  Description as DocumentIcon,
  Rocket as RocketIcon,
  Star as StarIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../state/user';
import { track } from '../../lib/analytics';

interface QuickActionsProps {
  className?: string;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ className }) => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [applicationKitModalOpen, setApplicationKitModalOpen] = useState(false);

  const handleUpgrade = async () => {
    track('Upgrade Clicked', { source: 'dashboard' });

    if (!user) {
      navigate('/login');
      return;
    }

    if (user.accountType === 'EXPLORER') {
      navigate('/pricing');
    } else {
      // Already have Pro/Premium, show billing portal
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch('/api/billing/create-portal-session', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          window.location.href = data.url;
        } else {
          console.error('Failed to create billing portal session');
          navigate('/pricing');
        }
      } catch (error) {
        console.error('Error creating billing portal session:', error);
        navigate('/pricing');
      }
    }
  };

  const handleConnectGmail = () => {
    track('Gmail Connect Clicked', { source: 'dashboard' });
    // Navigate to mock connect page
    navigate('/coming-soon?feature=gmail-integration');
  };

  const handleApplicationKit = () => {
    track('Application Kit CTA Clicked', { source: 'dashboard' });
    
    if (user?.accountType === 'PREMIUM') {
      // Navigate to application kit feature (placeholder)
      navigate('/coming-soon?feature=application-kit');
    } else {
      setApplicationKitModalOpen(true);
    }
  };

  const getUpgradeButtonText = () => {
    if (!user) return 'Sign Up to Upgrade';
    
    switch (user.accountType) {
      case 'EXPLORER':
        return 'Upgrade to Pro';
      case 'PRO':
        return 'Upgrade to Premium';
      case 'PREMIUM':
        return 'Manage Billing';
      default:
        return 'Upgrade Account';
    }
  };

  const getUpgradeButtonColor = () => {
    if (!user || user.accountType === 'EXPLORER') {
      return 'primary';
    }
    return 'success';
  };

  const actions = [
    {
      id: 'upgrade',
      title: getUpgradeButtonText(),
      description: user?.accountType === 'PREMIUM' 
        ? 'Manage your Premium subscription'
        : user?.accountType === 'PRO'
        ? 'Unlock Premium features with AI assistance'
        : 'Access Pro features and news feed',
      icon: <UpgradeIcon />,
      color: getUpgradeButtonColor(),
      onClick: handleUpgrade,
      disabled: false,
    },
    {
      id: 'gmail',
      title: 'Connect Gmail (Beta)',
      description: 'Get AI-powered email insights and summaries',
      icon: <EmailIcon />,
      color: 'info' as const,
      onClick: handleConnectGmail,
      disabled: false,
      badge: 'Beta',
    },
    {
      id: 'app-kit',
      title: 'Generate Application Kit',
      description: 'AI-powered resume, cover letter, and interview prep',
      icon: <DocumentIcon />,
      color: 'secondary' as const,
      onClick: handleApplicationKit,
      disabled: false,
      premium: user?.accountType !== 'PREMIUM',
    },
  ];

  return (
    <>
      <Card className={`${className || ''}`}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
            <RocketIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h6" component="h2">
              Quick Actions
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {actions.map((action, index) => (
              <Grid item xs={12} sm={6} md={4} key={action.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      border: '1px solid',
                      borderColor: 'divider',
                      '&:hover': {
                        borderColor: `${action.color}.main`,
                        transform: 'translateY(-2px)',
                        boxShadow: 3,
                      },
                      transition: 'all 0.2s ease',
                      opacity: action.disabled ? 0.6 : 1,
                    }}
                    onClick={action.onClick}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Avatar
                          sx={{
                            bgcolor: `${action.color}.main`,
                            width: 32,
                            height: 32,
                          }}
                        >
                          {action.icon}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {action.title}
                          </Typography>
                          {action.badge && (
                            <Chip
                              label={action.badge}
                              size="small"
                              color={action.color}
                              variant="outlined"
                              sx={{ height: 16, fontSize: '10px', ml: 1 }}
                            />
                          )}
                          {action.premium && (
                            <Chip
                              label="Premium"
                              size="small"
                              color="warning"
                              variant="filled"
                              sx={{ height: 16, fontSize: '10px', ml: 1 }}
                            />
                          )}
                        </Box>
                      </Box>
                      
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          fontSize: '12px',
                          lineHeight: 1.3,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {action.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Application Kit Premium Modal */}
      <Dialog
        open={applicationKitModalOpen}
        onClose={() => setApplicationKitModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <StarIcon sx={{ color: 'warning.main' }} />
          Premium Feature Required
          <Button
            onClick={() => setApplicationKitModalOpen(false)}
            sx={{ ml: 'auto', minWidth: 'auto', p: 0.5 }}
          >
            <CloseIcon />
          </Button>
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <DocumentIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              AI-Powered Application Kit
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Generate personalized resumes, cover letters, and interview preparation materials using advanced AI tailored to your profile and target roles.
            </Typography>
            
            <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1, mt: 2, mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Premium Features Include:
              </Typography>
              <Typography variant="body2" component="ul" sx={{ textAlign: 'left', pl: 2 }}>
                <li>AI-generated resumes for specific job postings</li>
                <li>Personalized cover letter templates</li>
                <li>Interview question preparation</li>
                <li>Skills gap analysis and recommendations</li>
                <li>ATS-optimized formatting</li>
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={() => setApplicationKitModalOpen(false)}
            variant="outlined"
          >
            Maybe Later
          </Button>
          <Button
            onClick={() => {
              setApplicationKitModalOpen(false);
              handleUpgrade();
            }}
            variant="contained"
            startIcon={<UpgradeIcon />}
          >
            Upgrade to Premium
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};