import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const TempPremiumUpgrade = () => {
  const { user, login } = useAuth();
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [message, setMessage] = useState('');

  const upgradeToPremium = async () => {
    if (!user) {
      setMessage('Please log in first');
      return;
    }

    setIsUpgrading(true);
    try {
      // Update the user object to Premium
      const updatedUser = {
        ...user,
        accountType: 'PREMIUM' as const
      };
      
      // Update localStorage and context
      login(updatedUser);
      localStorage.setItem('jarvus_user', JSON.stringify(updatedUser));
      
      setMessage('✅ Account upgraded to Premium! You can now access the AI Assistant.');
    } catch (error) {
      setMessage('❌ Failed to upgrade account');
    } finally {
      setIsUpgrading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-background pt-20">
      <div className="max-w-2xl mx-auto p-8">
        <div className="bg-gradient-to-b from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-2xl p-8 border-2 border-[#71ADBA]">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            🧪 Premium Account Upgrade (Dev Tool)
          </h1>
          
          {user ? (
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-gray-300 mb-2">Current Account:</p>
                <p className="text-white font-semibold">{user.firstName} {user.lastName}</p>
                <p className="text-[#71ADBA]">{user.email}</p>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold mt-2 ${
                  user.accountType === 'PREMIUM' 
                    ? 'bg-yellow-500 text-black' 
                    : user.accountType === 'PRO' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-500 text-white'
                }`}>
                  {user.accountType}
                </div>
              </div>

              {user.accountType !== 'PREMIUM' ? (
                <button
                  onClick={upgradeToPremium}
                  disabled={isUpgrading}
                  className="w-full py-3 px-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isUpgrading ? 'Upgrading...' : '🚀 Upgrade to Premium (Testing)'}
                </button>
              ) : (
                <div className="text-center">
                  <p className="text-green-400 mb-4">✅ You already have Premium access!</p>
                  <a
                    href="/ai-assistant"
                    className="inline-block py-3 px-6 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    🤖 Go to AI Assistant
                  </a>
                </div>
              )}

              {message && (
                <div className="p-4 bg-gray-700 rounded-lg text-center">
                  <p className="text-white">{message}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-300 mb-4">Please log in to upgrade your account</p>
              <a
                href="/login"
                className="inline-block py-3 px-6 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
              >
                Login
              </a>
            </div>
          )}

          <div className="mt-8 text-center text-sm text-gray-400">
            <p>⚠️ This is a development tool for testing purposes only.</p>
            <p>In production, Premium upgrades would require proper payment processing.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TempPremiumUpgrade;
