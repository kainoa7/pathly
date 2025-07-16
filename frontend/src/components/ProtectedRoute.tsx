import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredAccountType?: 'EXPLORER' | 'PRO' | 'PREMIUM';
  allowedAccountTypes?: ('EXPLORER' | 'PRO' | 'PREMIUM')[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredAccountType,
  allowedAccountTypes 
}) => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      // Not logged in, redirect to login
      navigate('/login');
      return;
    }

    // Check if user has required account type
    if (requiredAccountType && user.accountType !== requiredAccountType) {
      // Wrong account type, redirect to their correct dashboard
      switch (user.accountType) {
        case 'EXPLORER':
          navigate('/explorer-dashboard');
          break;
        case 'PRO':
        case 'PREMIUM':
          navigate('/pro-dashboard');
          break;
        default:
          navigate('/explorer-dashboard');
          break;
      }
      return;
    }

    // Check if user's account type is in allowed list
    if (allowedAccountTypes && !allowedAccountTypes.includes(user.accountType)) {
      // Account type not allowed, redirect to their correct dashboard
      switch (user.accountType) {
        case 'EXPLORER':
          navigate('/explorer-dashboard');
          break;
        case 'PRO':
        case 'PREMIUM':
          navigate('/pro-dashboard');
          break;
        default:
          navigate('/explorer-dashboard');
          break;
      }
      return;
    }
  }, [isAuthenticated, user, navigate, requiredAccountType, allowedAccountTypes]);

  // Show loading while checking authentication
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-dark-background flex items-center justify-center">
        <div className="text-white text-xl">Redirecting...</div>
      </div>
    );
  }

  // Render children if all checks pass
  return <>{children}</>;
};

export default ProtectedRoute; 