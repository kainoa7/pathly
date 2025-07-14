import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WorkIcon from '@mui/icons-material/Work';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { majorsData } from '../data/majorsData';

const getMarketStatusEmoji = (status: 'high-demand' | 'competitive' | 'oversaturated') => {
  switch (status) {
    case 'high-demand':
      return '🔥';
    case 'competitive':
      return '⚠️';
    case 'oversaturated':
      return '❗';
  }
};

const getMarketStatusColor = (status: 'high-demand' | 'competitive' | 'oversaturated') => {
  switch (status) {
    case 'high-demand':
      return 'bg-green-100 text-green-800';
    case 'competitive':
      return 'bg-yellow-100 text-yellow-800';
    case 'oversaturated':
      return 'bg-red-100 text-red-800';
  }
};

const getCompetitionSummary = (openings: number, graduates: number) => {
  const ratio = graduates / openings;
  if (ratio < 0.8) return 'More jobs available than graduates — great outlook!';
  if (ratio <= 1.2) return 'Balanced job market with good opportunities.';
  if (ratio <= 2) return 'Somewhat competitive, but opportunities exist.';
  return `Highly competitive, with ${ratio.toFixed(1)} graduates per opening.`;
};

const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    recommendedPaths,
    answers,
    isHighSchool,
    isCollege,
    selectedMajor,
    skipQuiz,
    currentMajor,
    interests,
    isSwitching,
    hasMatches,
    selectedEducation,
    selectedGoal
  } = location.state || {};

  // Helper function to get recommended majors based on different scenarios
  const getRecommendedMajors = () => {
    if (skipQuiz && selectedMajor) {
      // User has already chosen a major
      const major = majorsData.find(m => m.id === selectedMajor);
      return major ? [major] : [];
    } else if (isSwitching && interests) {
      // User is switching majors - filter based on interests
      return majorsData
        .filter(major => 
          major.name !== currentMajor && 
          interests.some(interest => 
            major.interests.includes(interest)
          )
        )
        .slice(0, 3);
    } else if (recommendedPaths && recommendedPaths.length > 0) {
      // Quiz-based recommendations
      return recommendedPaths
        .map(id => majorsData.find(m => m.id === id))
        .filter(Boolean);
    } else {
      // No recommendations found
      return [];
    }
  };

  const recommendedMajors = getRecommendedMajors();

  const getPageTitle = () => {
    if (skipQuiz) {
      return "Career Paths for Your Major";
    } else if (isSwitching) {
      return "Recommended Alternative Majors";
    } else if (isCollege) {
      return "Recommended College Majors";
    } else {
      return "Your Career Path Recommendations";
    }
  };

  const getPageDescription = () => {
    if (!hasMatches && !skipQuiz) {
      return "We're still training our algorithm for your unique profile! Your combination of interests, goals, and education preferences is distinctive. Check back soon for more personalized matches, or try adjusting your preferences to explore different paths.";
    } else if (skipQuiz) {
      return "Here are potential career paths based on your chosen major. Explore each option to learn more about the opportunities ahead.";
    } else if (isSwitching) {
      return `Based on your current major in ${currentMajor} and your new interests, here are some alternative paths you might want to consider.`;
    } else if (isCollege) {
      return "Based on your college experience and interests, these majors could be great fits for your academic journey.";
    } else {
      const educationText = selectedEducation === '2year' ? 'shorter programs' :
                           selectedEducation === '4year' ? 'bachelor\'s programs' :
                           'advanced degree programs';
      const goalText = selectedGoal === 'Make a high income' ? 'high-earning potential' :
                      selectedGoal === 'Make a difference/help others' ? 'meaningful impact' :
                      selectedGoal === 'Be creative' ? 'creative expression' :
                      'stable career growth';
      
      return `Based on your interests and preference for ${educationText} with a focus on ${goalText}, we've identified these career paths that align with your profile.`;
    }
  };

  const getBackPath = () => {
    if (skipQuiz) {
      return '/major-selection';
    } else if (isSwitching) {
      return '/switching-major';
    } else if (isCollege) {
      return '/quiz/college';
    } else {
      return '/quiz/highschool';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-12 space-y-4 sm:space-y-0">
          <button
            onClick={() => navigate(getBackPath())}
            className="p-2 rounded-full text-[#71ADBA] hover:text-[#EDEAB1] transition-colors duration-200 w-fit"
          >
            <ArrowBackIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={() => navigate('/')}
            className="btn btn-secondary w-fit"
          >
            Return to Home
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold heading-gradient mb-4 sm:mb-6">
            {getPageTitle()}
          </h1>
          <p className="text-lg sm:text-xl text-[#71ADBA] max-w-3xl mx-auto">
            {getPageDescription()}
          </p>
        </motion.div>

        {recommendedMajors.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {recommendedMajors.map((major) => (
              <motion.div key={major.id} variants={itemVariants}>
                <div className="h-full glass-panel hover:bg-white/10 transition-all duration-200 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2 sm:gap-0">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#EDEAB1]">{major.name}</h2>
                    <span className="px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-[#71ADBA] to-[#EDEAB1] text-[#0f172a] whitespace-nowrap">
                      {major.educationLevel === '2year' ? '2-Year Program' :
                       major.educationLevel === '4year' ? "Bachelor's" :
                       "Master's+"}
                    </span>
                  </div>

                  {/* Job Market Overview Card */}
                  <div className="card mb-4 sm:mb-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2 sm:gap-0">
                      <h3 className="text-base sm:text-lg font-semibold text-[#EDEAB1]">Job Market Overview</h3>
                      <span className="px-3 py-1 text-sm font-medium rounded-full bg-white/10 text-[#EDEAB1] whitespace-nowrap">
                        {getMarketStatusEmoji(major.jobMarket.marketStatus)} {major.jobMarket.marketStatus.replace('-', ' ').charAt(0).toUpperCase() + major.jobMarket.marketStatus.slice(1)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-[#71ADBA]">Starting Salary</p>
                        <p className="text-base sm:text-lg font-bold text-white">{major.jobMarket.startingSalary}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-[#71ADBA]">Growth Rate</p>
                        <p className="text-base sm:text-lg font-bold text-white">{major.jobMarket.growthRate}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-[#71ADBA]">Annual Openings</p>
                        <p className="text-base sm:text-lg font-bold text-white">{major.jobMarket.annualOpenings.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-[#71ADBA]">Annual Graduates</p>
                        <p className="text-base sm:text-lg font-bold text-white">{major.jobMarket.annualGraduates.toLocaleString()}</p>
                      </div>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-gray-400 italic">
                      {getCompetitionSummary(major.jobMarket.annualOpenings, major.jobMarket.annualGraduates)}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6">{major.description}</p>

                  <div className="space-y-4 sm:space-y-6">
                    {major.careers.map((career) => (
                      <div key={career.title} className="space-y-3 sm:space-y-4">
                        <div className="flex items-center space-x-2">
                          <div className="p-2 rounded-lg bg-gradient-to-r from-[#71ADBA] to-[#EDEAB1]">
                            <WorkIcon className="text-[#0f172a] w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          <h3 className="text-lg sm:text-xl font-semibold text-[#EDEAB1]">
                            {career.title}
                          </h3>
                        </div>
                        <div className="pl-10">
                          <div className="flex items-center space-x-2 mb-2">
                            <AttachMoneyIcon className="text-[#71ADBA] w-4 h-4" />
                            <span className="text-sm sm:text-base text-gray-300">
                              {career.salary}
                            </span>
                          </div>
                          <p className="text-sm sm:text-base text-gray-400">
                            {career.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <p className="text-[#71ADBA] text-lg">
              No matches found. Try adjusting your preferences or check back later for more options.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ResultsPage; 