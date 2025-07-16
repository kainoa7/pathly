import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { TextField, Autocomplete } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { majorsData, type Major } from '../data/majorsData';

interface Interest {
  id: string;
  label: string;
}

const interests: Interest[] = [
  { id: 'tech', label: 'Technology' },
  { id: 'science', label: 'Science' },
  { id: 'art', label: 'Art & Design' },
  { id: 'business', label: 'Business' },
  { id: 'health', label: 'Healthcare' },
  { id: 'education', label: 'Education' },
  { id: 'social', label: 'Social Sciences' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'environment', label: 'Environment' },
  { id: 'law', label: 'Law & Policy' },
];

const SwitchingMajorPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [currentMajor, setCurrentMajor] = useState<Major | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([]);
  const [showNoRoadmap, setShowNoRoadmap] = useState(false);

  const handleNext = () => {
    if (step === 1 && currentMajor) {
      setStep(2);
    } else if (step === 2 && selectedInterests.length > 0) {
      // Find recommended majors based on interests
      const recommendedMajors = majorsData.filter(major => 
        major.id !== currentMajor?.id && // Exclude current major
        selectedInterests.some(interest => 
          interest.id === major.id.split('-')[0] // Simple matching logic
        )
      );

      // Check if we have any majors with roadmaps
      const hasRoadmaps = recommendedMajors.some(major => major.hasRoadmap);

      if (hasRoadmaps) {
        navigate('/results', {
          state: {
            currentMajor: currentMajor?.name,
            interests: selectedInterests.map(i => i.id),
            isSwitching: true
          }
        });
      } else {
        setShowNoRoadmap(true);
      }
    }
  };

  const handleInterestToggle = (interest: Interest) => {
    setSelectedInterests(prev => {
      const isSelected = prev.find(i => i.id === interest.id);
      if (isSelected) {
        return prev.filter(i => i.id !== interest.id);
      } else {
        return [...prev, interest];
      }
    });
    setShowNoRoadmap(false);
  };

  const slideVariants = {
    enter: { x: 1000, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -1000, opacity: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-2xl mx-auto mb-8"
      >
        <button
          onClick={() => step === 1 ? navigate('/onboarding') : setStep(1)}
          className="p-2 rounded-full text-white hover:bg-white/20 transition-colors duration-200"
        >
          <ArrowBackIcon className="w-6 h-6" />
        </button>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="sync">
          {step === 1 ? (
            <motion.div
              key="step1"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                  What's your current major?
                </h1>
                <p className="text-gray-600 mb-8">
                  Tell us what you're studying now, and we'll help you explore other options
                  that might better match your interests.
                </p>

                <div className="space-y-6">
                  <Autocomplete
                    options={majorsData}
                    value={currentMajor}
                    onChange={(_, newValue) => setCurrentMajor(newValue)}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Current Major"
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
                    onClick={handleNext}
                    disabled={!currentMajor}
                    className="w-full py-4 px-6 text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-xl shadow-md hover:brightness-110 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100 disabled:hover:scale-100 transform transition-all duration-200"
                  >
                    Next
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                  What interests you now?
                </h1>
                <p className="text-gray-600 mb-8">
                  Select the areas that excite you the most. We'll use this to suggest
                  majors that might be a better fit.
                </p>

                <div className="space-y-8">
                  <div className="flex flex-wrap gap-3">
                    {interests.map((interest) => {
                      const isSelected = selectedInterests.find(i => i.id === interest.id);
                      return (
                        <button
                          key={interest.id}
                          onClick={() => handleInterestToggle(interest)}
                          className={`px-4 py-2 rounded-full text-lg font-medium transition-all duration-200 ${
                            isSelected 
                              ? 'bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-md hover:brightness-110 hover:scale-[1.02]' 
                              : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-fuchsia-300 hover:bg-fuchsia-50'
                          }`}
                        >
                          {interest.label}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={selectedInterests.length === 0}
                    className="w-full py-4 px-6 text-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-xl shadow-md hover:brightness-110 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100 disabled:hover:scale-100 transform transition-all duration-200"
                  >
                    Show Recommendations
                  </button>

                  {showNoRoadmap && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-fuchsia-50 rounded-xl border border-indigo-100 text-center"
                    >
                      <p className="text-gray-800 font-medium">
                        Coming soon — we're working on roadmaps for your recommended majors!
                      </p>
                      <p className="text-gray-600 text-sm mt-2">
                        Try selecting different interests or check back later for more options.
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
                    Select at least one interest to help us provide personalized major
                    recommendations that align with your new interests.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SwitchingMajorPage; 