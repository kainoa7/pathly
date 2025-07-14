import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import OnboardingPage from './components/OnboardingPage';
import QuizPage from './components/QuizPage';
import CollegeQuizPage from './components/CollegeQuizPage';
import MajorSelectionPage from './components/MajorSelectionPage';
import SwitchingMajorPage from './components/SwitchingMajorPage';
import ResultsPage from './components/ResultsPage';
import CareerRoadmapPage from './components/CareerRoadmapPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import ContactPage from './components/ContactPage';
import ForStudentsPage from './components/ForStudentsPage';
import ForUniversitiesPage from './components/ForUniversitiesPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/quiz/highschool" element={<QuizPage />} />
            <Route path="/quiz/college" element={<CollegeQuizPage />} />
            <Route path="/major-selection" element={<MajorSelectionPage />} />
            <Route path="/switching-major" element={<SwitchingMajorPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/roadmap/:careerId" element={<CareerRoadmapPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/for-students" element={<ForStudentsPage />} />
            <Route path="/for-universities" element={<ForUniversitiesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
