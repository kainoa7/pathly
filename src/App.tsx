import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import OnboardingPage from './components/OnboardingPage';
import QuizPage from './components/QuizPage';
import ResultsPage from './components/ResultsPage';
import ComingSoonPage from './components/ComingSoonPage';
import AnnouncementsPage from './components/AnnouncementsPage';
import PricingPage from './components/PricingPage';
import LoginPage from './components/LoginPage';
import FloatingCTA from './components/FloatingCTA';
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
import InternshipPage from './components/InternshipPage';
import FeedbackSection from './components/FeedbackSection';
import FeedbackPage from './components/FeedbackPage';
import HowItWorks from './components/HowItWorks';
import HowItWorksPage from './components/HowItWorksPage';
import PlatformGuidePage from './components/PlatformGuidePage';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/tech-stack" element={<TechStackPage />} />
          <Route path="/system-design" element={<SystemDesignPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/platform-guide" element={<HowItWorksPage />} />
          <Route path="/quiz" element={<QuizPage quizType="college" />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/campus-life" element={<CampusLifePage />} />
          <Route path="/internships" element={<InternshipPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/coming-soon" element={
            <ComingSoonPage 
              title="Feature Coming Soon"
              description="We're working hard to bring you this feature. Stay tuned for updates!"
              icon="🚀"
            />
          } />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
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
      <FeedbackSection />
      <Footer />
      <FloatingCTA />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTop />
          <AppLayout />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
