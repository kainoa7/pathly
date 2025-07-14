import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, IconButton, Button, Chip } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TimelineIcon from '@mui/icons-material/Timeline';
import { majorsData } from '../data/majorsData';

const CareerRoadmapPage = () => {
  const navigate = useNavigate();
  const { careerId } = useParams<{ careerId: string }>();

  const [majorId, careerSlug] = careerId?.split('-') || [];
  const careerTitle = careerSlug?.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');

  const major = majorsData.find(m => m.id === majorId);
  const career = major?.careers.find(c => c.title === careerTitle);

  if (!major || !career) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Career not found</h1>
          <Button
            variant="contained"
            onClick={() => navigate('/results')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Back to Results
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <IconButton
            onClick={() => navigate('/results')}
            className="hover:bg-white/50"
            size="large"
          >
            <ArrowBackIcon />
          </IconButton>

          <Button
            variant="outlined"
            onClick={() => navigate('/')}
            className="text-blue-600 border-blue-600 hover:bg-blue-50"
          >
            Return to Home
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <WorkIcon className="text-blue-600 text-3xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{career.title}</h1>
                <div className="flex items-center gap-2">
                  <SchoolIcon className="text-blue-600" />
                  <p className="text-xl text-blue-600">{major.name} Major</p>
                </div>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <TimelineIcon className="text-blue-600" />
                  Overview
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">{career.description}</p>
                <div className="mt-4 flex items-center gap-2">
                  <AttachMoneyIcon className="text-green-600" />
                  <p className="text-xl font-semibold text-green-600">
                    Average Salary: {career.averageSalary}
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {career.skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <Chip
                        label={skill}
                        className="bg-blue-50 text-blue-600 text-lg px-2 py-3"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Career Roadmap</h2>
                <div className="space-y-6">
                  {career.roadmap.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {index + 1}
                      </div>
                      <Card className="flex-grow p-4 bg-blue-50">
                        <p className="text-lg text-gray-800">{step}</p>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CareerRoadmapPage; 