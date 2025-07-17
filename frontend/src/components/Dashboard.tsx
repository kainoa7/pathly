import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      // Not logged in, redirect to login
      navigate('/login');
      return;
    }

    // Route based on account type
    switch (user.accountType) {
      case 'EXPLORER':
        // Redirect Explorer users to their landing page first
        navigate('/');
        break;
      case 'PRO':
      case 'PREMIUM':
        navigate('/pro-dashboard');
        break;
      default:
        // Default to their landing page
        navigate('/');
        break;
    }
  }, [isAuthenticated, user, navigate]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen bg-dark-background flex items-center justify-center">
      <div className="text-white text-xl">Redirecting to your dashboard...</div>
    </div>
  );
};

export default Dashboard; 