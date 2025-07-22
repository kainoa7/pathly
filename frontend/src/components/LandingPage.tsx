import React, { useState } from 'react';
import BackgroundAnimation from './BackgroundAnimation';
import UserActivityToast from './UserActivityToast';
import ActiveUsersBanner from './ActiveUsersBanner';
import BetaSignupForm from './BetaSignupForm';
import FeedbackWidget from './FeedbackWidget';
import HeroSection from './landing/sections/HeroSection';
import ContentSections from './landing/sections/ContentSections';
import PersonalizedCTASection from './landing/sections/PersonalizedCTASection';
import Analytics from '../utils/analytics';

const LandingPage: React.FC = () => {
  const [showBetaSignup, setShowBetaSignup] = useState(false);

  const handleBetaSignup = () => {
    setShowBetaSignup(true);
  };

  const handleBetaSignupClose = () => {
    setShowBetaSignup(false);
  };

  return (
    <div className="relative min-h-screen bg-dark-background">
      <BackgroundAnimation />
      
      <UserActivityToast />
      <ActiveUsersBanner className="hidden md:block" />

      <main className="relative z-10">
        {/* Hero Section - Simplified */}
        <HeroSection />

        {/* Content Sections - Restored */}
        <ContentSections />

        {/* Personalized CTA Section - Restored */}
        <PersonalizedCTASection onBetaSignup={handleBetaSignup} />
      </main>

      {/* Beta Signup Modal */}
      {showBetaSignup && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <BetaSignupForm
              source="landing_page_personalized_cta"
              onSuccess={handleBetaSignupClose}
              onClose={handleBetaSignupClose}
            />
          </div>
        </div>
      )}

      {/* Feedback Widget */}
      <FeedbackWidget 
        onSubmit={(feedback) => {
          console.log('Feedback submitted:', feedback);
          Analytics.track('Feedback Submitted', {
            voteType: feedback.voteType,
            hasComment: !!feedback.feedback,
            source: 'landing_page_widget'
          });
        }}
      />
    </div>
  );
};

export default LandingPage; 