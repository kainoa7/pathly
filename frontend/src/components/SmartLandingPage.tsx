import React from 'react';
import { useAuth } from '../context/AuthContext';
import LandingPage from './LandingPage';
import ExplorerLandingPage from './ExplorerLandingPage';
import ProLandingPage from './ProLandingPage';

const SmartLandingPage = () => {
  const { isAuthenticated, user } = useAuth();

  // If not authenticated, show the general landing page
  if (!isAuthenticated || !user) {
    return <LandingPage />;
  }

  // If authenticated, route based on account type
  switch (user.accountType) {
    case 'EXPLORER':
      return <ExplorerLandingPage />;
    
    case 'PRO':
    case 'PREMIUM':
      // Pro users get their exclusive premium landing experience
      return <ProLandingPage />;
    
    default:
      return <LandingPage />;
  }
};

export default SmartLandingPage; 