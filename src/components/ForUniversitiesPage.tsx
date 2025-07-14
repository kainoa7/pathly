import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/Groups';
import InsightsIcon from '@mui/icons-material/Insights';
import HandshakeIcon from '@mui/icons-material/Handshake';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const ForUniversitiesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1a2234] rounded-2xl p-8 shadow-xl"
        >
          <h1 className="text-4xl font-bold mb-8 text-[#71ADBA]">Partner in Student Success</h1>
          
          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Growing Together</h2>
              <p className="mb-6">
                Join us in nurturing the next generation of leaders. At Pathly, we believe in 
                creating a supportive ecosystem where universities and students thrive together. 
                Let's build a brighter future for education, one student at a time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Why Partner With Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0f172a] p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <GroupsIcon className="text-[#71ADBA] w-6 h-6" />
                    <h3 className="text-xl font-semibold text-[#71ADBA]">Student Success</h3>
                  </div>
                  <p>
                    Help your students find their perfect path with our personalized guidance
                    system, leading to higher satisfaction and retention rates.
                  </p>
                </div>
                <div className="bg-[#0f172a] p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <InsightsIcon className="text-[#71ADBA] w-6 h-6" />
                    <h3 className="text-xl font-semibold text-[#71ADBA]">Data Insights</h3>
                  </div>
                  <p>
                    Access valuable insights about student interests and career trends to
                    better support your academic programs and career services.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">The Pathly Advantage</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0f172a] p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <HandshakeIcon className="text-[#71ADBA] w-6 h-6" />
                    <h3 className="text-xl font-semibold text-[#71ADBA]">Seamless Integration</h3>
                  </div>
                  <p>
                    Our platform integrates smoothly with your existing systems, providing
                    a unified experience for your students and staff.
                  </p>
                </div>
                <div className="bg-[#0f172a] p-6 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUpIcon className="text-[#71ADBA] w-6 h-6" />
                    <h3 className="text-xl font-semibold text-[#71ADBA]">Measurable Impact</h3>
                  </div>
                  <p>
                    Track student engagement, major selection trends, and career outcomes
                    with our comprehensive analytics dashboard.
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
                <h2 className="text-2xl font-semibold mb-4 text-[#EDEAB1]">Join Our Community</h2>
                <p className="text-gray-300 mb-6">
                  Let's work together to create brighter futures for your students.
                </p>
                <button
                  onClick={() => navigate('/contact')}
                  className="px-8 py-3 bg-[#71ADBA] text-white rounded-lg hover:bg-[#5C919C] transition-colors text-lg font-medium"
                >
                  Partner With Us
                </button>
              </motion.div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForUniversitiesPage; 