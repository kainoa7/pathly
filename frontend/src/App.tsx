import React from 'react';
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider, useParams, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import SmartLandingPage from './components/SmartLandingPage';
import ExplorerLandingPage from './components/ExplorerLandingPage';
import AboutPage from './components/AboutPage';
import OnboardingPage from './components/OnboardingPage';
import QuizPage from './components/QuizPage';
import ResultsPage from './components/ResultsPage';
import ComingSoonPage from './components/ComingSoonPage';
import AnnouncementsPage from './components/AnnouncementsPage';
import PricingPage from './components/PricingPage';
import LoginPage from './components/LoginPage';
import SignupExplorer from './components/SignupExplorer';
import SignupPro from './components/SignupPro';
import UpgradeToProPage from './components/UpgradeToProPage';
import AnalyticsPage from './components/AnalyticsPage';
import ExplorerDashboard from './components/ExplorerDashboard';
import ProDashboard from './components/ProDashboard';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import ResumeBuilder from './pages/services/ResumeBuilder';
import ResumeReview from './pages/services/ResumeReview';
import CareerRoadmap from './pages/services/CareerRoadmap';
import DemoPage from './components/DemoPage';
import BreakingIntoTechPage from './components/BreakingIntoTechPage';
import DiscordWaitlistPage from './components/DiscordWaitlistPage';
import ComingSoonFeaturePage from './components/ComingSoonFeaturePage';
import Analytics from './utils/analytics';
import ActiveUsersBanner from './components/ActiveUsersBanner';
import TechStackPage from './components/TechStackPage';
import SystemDesignPage from './components/SystemDesignPage';
import InterviewTemplatesPage from './components/InterviewTemplatesPage';
import WebsiteServicePage from './components/WebsiteServicePage';
import CampusLifePage from './components/CampusLifePage';
import CareerDiscoveryPage from './components/InternshipPage';
import FeedbackSection from './components/FeedbackSection';
import FeedbackPage from './components/FeedbackPage';
import HowItWorks from './components/HowItWorks';
import HowItWorksPage from './components/HowItWorksPage';
import PlatformGuidePage from './components/PlatformGuidePage';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AdminLayout from './components/AdminLayout';
import AdaptiveQuizPage from './components/AdaptiveQuizPage';
import NewsPage from './components/NewsPage';
import SavedArticlesPage from './components/SavedArticlesPage';
import UserActivityDashboard from './components/UserActivityDashboard';
import PlatformFeedbackWidget from './components/PlatformFeedbackWidget';
import AIAssistantInterface from './components/AIAssistantInterface';

// Add QuizPageWrapper component
const QuizPageWrapper = () => {
  const { type } = useParams();
  
  // Map route params to quiz types
  const getQuizType = (paramType: string | undefined): 'highschool' | 'college' => {
    switch (paramType) {
      case 'highschool':
        return 'highschool';
      case 'graduated':
      case 'college':
      default:
        return 'college';
    }
  };
  
  return <QuizPage quizType={getQuizType(type)} />;
};

function AppLayout() {
  const location = useLocation();
  const hideHeader = location.pathname === '/ai-assistant';

  return (
    <div className={`${hideHeader ? '' : 'p-2 sm:p-4 lg:p-6'} min-h-screen ${hideHeader ? 'bg-slate-900' : 'bg-black/5 dark:bg-black/20'}`}>
      <div className={`${hideHeader ? '' : 'simple-border'} min-h-screen`}>
        <div className={`${hideHeader ? '' : 'simple-border-content'} flex flex-col min-h-screen ${hideHeader ? 'bg-slate-900' : 'bg-light-background dark:bg-dark-background'} text-light-text dark:text-dark-text`}>
          {!hideHeader && <Header />}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<SmartLandingPage />} />
              <Route path="/explorer-landing" element={
                <ProtectedRoute requiredAccountType="EXPLORER">
                  <ExplorerLandingPage />
                </ProtectedRoute>
              } />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/tech-stack" element={<TechStackPage />} />
              <Route path="/system-design" element={<SystemDesignPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/platform-guide" element={<HowItWorksPage />} />
              <Route path="/quiz" element={<QuizPage quizType="college" />} />
              <Route path="/quiz/:type" element={<QuizPageWrapper />} />
              <Route path="/adaptive-quiz" element={<AdaptiveQuizPage />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/campus-life" element={<CampusLifePage />} />
              <Route path="/internships" element={<CareerDiscoveryPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup/explorer" element={<SignupExplorer />} />
              <Route path="/signup/pro" element={<SignupPro />} />
              <Route path="/upgrade-to-pro" element={
                <ProtectedRoute requiredAccountType="EXPLORER">
                  <UpgradeToProPage />
                </ProtectedRoute>
              } />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/explorer-dashboard" element={
                <ProtectedRoute requiredAccountType="EXPLORER">
                  <ExplorerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/pro-dashboard" element={
                <ProtectedRoute allowedAccountTypes={['PRO', 'PREMIUM']}>
                  <ProDashboard />
                </ProtectedRoute>
              } />
              <Route path="/news" element={
                <ProtectedRoute allowedAccountTypes={['PRO', 'PREMIUM']}>
                  <NewsPage />
                </ProtectedRoute>
              } />
              <Route path="/saved-articles" element={
                <ProtectedRoute allowedAccountTypes={['PRO', 'PREMIUM']}>
                  <SavedArticlesPage />
                </ProtectedRoute>
              } />
              <Route path="/analytics" element={
                <ProtectedRoute allowedAccountTypes={['PRO', 'PREMIUM']}>
                  <AnalyticsPage />
                </ProtectedRoute>
              } />
              <Route path="/ai-assistant" element={
                <ProtectedRoute allowedAccountTypes={['PREMIUM']}>
                  <AIAssistantInterface />
                </ProtectedRoute>
              } />
              <Route path="/jarvus-ai-demo" element={<AIAssistantInterface />} />
              <Route path="/activity-dashboard" element={
                <ProtectedRoute allowedAccountTypes={['PRO', 'PREMIUM']}>
                  <UserActivityDashboard />
                </ProtectedRoute>
              } />
              <Route path="/announcements" element={<AnnouncementsPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/breaking-into-tech" element={<BreakingIntoTechPage />} />
              <Route path="/demo" element={<DemoPage />} />
              <Route path="/coming-soon" element={
                <ComingSoonPage 
                  title="Feature Coming Soon"
                  description="We're working hard to bring you this feature. Stay tuned for updates!"
                  icon="🚀"
                />
              } />
              <Route path="/resume-builder" element={<ResumeBuilder />} />
              <Route path="/resume-review" element={<ResumeReview />} />
              <Route path="/career-roadmap" element={<CareerRoadmap />} />
              <Route path="/interview-templates" element={<InterviewTemplatesPage />} />
              <Route path="/website-service" element={<WebsiteServicePage />} />
              <Route path="/waitlist" element={<DiscordWaitlistPage />} />
              <Route path="/coming-soon-feature" element={<ComingSoonFeaturePage />} />
              <Route path="/feedback" element={<FeedbackPage />} />
            </Routes>
          </main>
          {!hideHeader && <FeedbackSection />}
          {!hideHeader && <Footer />}
          <PlatformFeedbackWidget />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
    <ThemeProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Routes>
          {/* Admin routes - no header/footer */}
          <Route path="/admin/*" element={<AdminLayout />} />
          
          {/* Main app routes - with header/footer */}
          <Route path="/*" element={<AppLayout />} />
        </Routes>
      </Router>
    </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
