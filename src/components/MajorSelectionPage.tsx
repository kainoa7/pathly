import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TextField, Autocomplete } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { majorsData, type Major } from '../data/majorsData';

const MajorSelectionPage = () => {
  const navigate = useNavigate();
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);
  const [showNoRoadmap, setShowNoRoadmap] = useState(false);

  const handleSubmit = () => {
    if (selectedMajor) {
      if (selectedMajor.hasRoadmap) {
        navigate('/results', { 
          state: { 
            selectedMajor: selectedMajor.id,
            skipQuiz: true
          } 
        });
      } else {
        setShowNoRoadmap(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-2xl mx-auto mb-8"
      >
        <button
          onClick={() => navigate('/onboarding')}
          className="p-2 rounded-full text-white hover:bg-white/20 transition-colors duration-200"
        >
          <ArrowBackIcon className="w-6 h-6" />
        </button>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              Tell us about your major
            </h1>
            <p className="text-gray-600 mb-8">
              Select your current major to discover potential career paths and opportunities
              that align with your field of study.
            </p>

            <div className="space-y-6">
              <Autocomplete
                options={majorsData}
                value={selectedMajor}
                onChange={(_, newValue) => {
                  setSelectedMajor(newValue);
                  setShowNoRoadmap(false);
                }}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Your Major"
                    variant="outlined"
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgb(209 213 219)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgb(192 132 252)',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: 'rgb(192 132 252)',
                        },
                      },
                    }}
                  />
                )}
                className="mb-6"
              />

              <button
                onClick={handleSubmit}
                disabled={!selectedMajor}
                className="w-full py-4 px-6 text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-xl shadow-md hover:brightness-110 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100 disabled:hover:scale-100 transform transition-all duration-200"
              >
                Show Career Paths
              </button>

              {showNoRoadmap && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-fuchsia-50 rounded-xl border border-indigo-100 text-center"
                >
                  <p className="text-gray-800 font-medium">
                    Coming soon — we're working on a roadmap for {selectedMajor?.name}!
                  </p>
                  <p className="text-gray-600 text-sm mt-2">
                    In the meantime, try exploring another major or check back later.
                  </p>
                </motion.div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 p-4 bg-gradient-to-r from-indigo-50 to-fuchsia-50 rounded-xl border border-indigo-100"
            >
              <p className="text-sm text-gray-600">
                Don't see your major? Select the closest match, or choose "Undecided" to
                explore different paths. You can always explore other options later.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MajorSelectionPage; 