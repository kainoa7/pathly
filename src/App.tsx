import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import AboutPage from './components/AboutPage';
import OnboardingPage from './components/OnboardingPage';
import QuizPage from './components/QuizPage';
import CollegeQuizPage from './components/CollegeQuizPage';
import MajorSelectionPage from './components/MajorSelectionPage';
import SwitchingMajorPage from './components/SwitchingMajorPage';
import ResultsPage from './components/ResultsPage';
import CareerRoadmapPage from './components/CareerRoadmapPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
