import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import FloatingCTA from './components/FloatingCTA';
import ScrollToTop from './components/ScrollToTop';
import ResumeBuilder from './pages/services/ResumeBuilder';
import ResumeReview from './pages/services/ResumeReview';
import CareerRoadmap from './pages/services/CareerRoadmap';
import DemoPage from './components/DemoPage';
import BreakingIntoTechPage from './components/BreakingIntoTechPage';
import DiscordWaitlistPage from './components/DiscordWaitlistPage';
import Analytics from './utils/analytics';
import './App.css';
import InterviewTemplatesPage from './components/InterviewTemplatesPage';
import WebsiteServicePage from './components/WebsiteServicePage';
import CampusLifePage from './components/CampusLifePage';
import InternshipPage from './components/InternshipPage';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-[#0f172a]">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/breaking-into-tech" element={<BreakingIntoTechPage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="/quiz">
              <Route index element={<OnboardingPage />} />
              <Route path="highschool" element={<QuizPage quizType="highschool" />} />
              <Route path="college" element={<QuizPage quizType="college" />} />
              <Route path="graduated" element={
                <ComingSoonPage 
                  title="Post-High School Guidance Coming Soon"
                  description="We're creating a specialized guide to help recent high school graduates explore their options, whether it's college, trade school, gap year, or entering the workforce. Get personalized recommendations based on your interests and goals."
                  icon="🎓"
                />
              } />
            </Route>
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/announcements" element={<AnnouncementsPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/waitlist" element={<DiscordWaitlistPage />} />
            <Route path="/services/resume-builder" element={<ResumeBuilder />} />
            <Route path="/services/resume-review" element={<ResumeReview />} />
            <Route path="/services/career-roadmap" element={<CareerRoadmap />} />
            <Route path="/services/interview-templates" element={<InterviewTemplatesPage />} />
            <Route path="/services/website-builder" element={<WebsiteServicePage />} />
            <Route path="/campus-life" element={<CampusLifePage />} />
            <Route path="/internships" element={<InternshipPage />} />
          </Routes>
        </main>
        <FloatingCTA />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
