import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LandingPage from './LandingPage';
import ExplorerLandingPage from './ExplorerLandingPage';
import ProLandingPage from './ProLandingPage';

const SmartLandingPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If authenticated and PREMIUM, redirect to AI Assistant
    if (isAuthenticated && user && user.accountType === 'PREMIUM') {
      navigate('/ai-assistant');
    }
  }, [isAuthenticated, user, navigate]);

  // If not authenticated, show the general landing page
  if (!isAuthenticated || !user) {
    return <LandingPage />;
  }

  // If authenticated, route based on account type
  switch (user.accountType) {
    case 'EXPLORER':
      return <ExplorerLandingPage />;
    
    case 'PRO':
      // Pro users get their exclusive premium landing experience
      return <ProLandingPage />;
    
    case 'PREMIUM':
      // This will be redirected by useEffect, but show loading in the meantime
      return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="text-white text-xl">Loading AI Assistant...</div>
        </div>
      );
    
    default:
      return <LandingPage />;
  }
};

export default SmartLandingPage; 