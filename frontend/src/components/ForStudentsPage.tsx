import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PsychologyIcon from '@mui/icons-material/Psychology';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const ForStudentsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1a2234] rounded-2xl p-8 shadow-xl"
        >
          <h1 className="text-4xl font-bold mb-8 text-[#71ADBA]">Your Journey Starts Here</h1>
          
          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">A Place Just for You</h2>
              <p className="mb-6">
                Welcome to your sanctuary of possibilities! Here at K<span className="text-[#71ADBA]">ai</span>yl, we understand that 
                choosing your path isn't just about picking a major – it's about discovering who 
                you are and who you want to become. Let's explore this journey together, one 
                step at a time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">How We Support Your Dreams</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0f172a] p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <SchoolIcon className="text-[#71ADBA] w-6 h-6" />
                    <h3 className="text-xl font-semibold text-[#71ADBA]">Personalized Guidance</h3>
                  </div>
                  <p>
                    Our intuitive platform understands your unique interests and aspirations,
                    guiding you to discover majors and careers that truly resonate with your heart.
                  </p>
                </div>
                <div className="bg-[#0f172a] p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <PsychologyIcon className="text-[#71ADBA] w-6 h-6" />
                    <h3 className="text-xl font-semibold text-[#71ADBA]">Smart Insights</h3>
                  </div>
                  <p>
                    Get personalized recommendations based on your interests, strengths, and dreams.
                    We're here to illuminate the path that's uniquely yours.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Your Path to Success</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0f172a] p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <RocketLaunchIcon className="text-[#71ADBA] w-6 h-6" />
                    <h3 className="text-xl font-semibold text-[#71ADBA]">Clear Direction</h3>
                  </div>
                  <p>
                    From choosing your major to landing your dream internship, we provide
                    step-by-step guidance to help you reach your goals with confidence.
                  </p>
                </div>
                <div className="bg-[#0f172a] p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <EmojiEventsIcon className="text-[#71ADBA] w-6 h-6" />
                    <h3 className="text-xl font-semibold text-[#71ADBA]">Ongoing Support</h3>
                  </div>
                  <p>
                    Your journey doesn't end with choosing a major. We're here to support you
                    through every milestone, celebration, and challenge along the way.
                  </p>
                </div>
              </div>
            </section>

            <section className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#0f172a] p-8 rounded-xl"
              >
                <h2 className="text-2xl font-semibold mb-4 text-[#EDEAB1]">Ready to Begin Your Journey?</h2>
                <p className="text-gray-300 mb-6">
                  Your future is waiting to unfold. Let's discover it together!
                </p>
                <button
                  onClick={() => navigate('/onboarding')}
                  className="px-8 py-3 bg-[#71ADBA] text-white rounded-lg hover:bg-[#5C919C] transition-colors text-lg font-medium"
                >
                  Start Your Path
                </button>
              </motion.div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForStudentsPage; 