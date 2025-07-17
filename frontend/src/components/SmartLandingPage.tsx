import React from 'react';
import { useAuth } from '../context/AuthContext';
import LandingPage from './LandingPage';
import ExplorerLandingPage from './ExplorerLandingPage';

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
      // Pro users can see the general landing page with full features unlocked
      // Or we could create a ProLandingPage later
      return <LandingPage />;
    
    default:
      return <LandingPage />;
  }
};

export default SmartLandingPage; 