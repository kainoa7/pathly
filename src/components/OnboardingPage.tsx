import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import WorkIcon from '@mui/icons-material/Work';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';

const OnboardingPage = () => {
  const navigate = useNavigate();

  const handleSelection = (selection: string) => {
    switch (selection) {
      case 'highschool':
        navigate('/quiz/highschool');
        break;
      case 'graduated':
        navigate('/quiz/graduated');
        break;
      case 'college':
        navigate('/quiz/college');
        break;
      case 'chosen':
        navigate('/major-selection');
        break;
      case 'switching':
        navigate('/switching-major', {
          state: {
            title: "Major Switching Guide Coming Soon",
            description: "We're building a comprehensive guide to help you explore alternative paths that might be a better fit for your interests and goals.",
            icon: "🔄"
          }
        });
        break;
      default:
        navigate('/quiz/highschool');
    }
  };

  const options = [
    {
      id: 'highschool',
      title: 'In high school, unsure about major',
      description: 'Explore options and find what interests you most',
      icon: SchoolIcon,
      action: 'highschool'
    },
    {
      id: 'graduated',
      title: 'Graduated high school, need guidance',
      description: 'Get help planning your next steps and exploring possibilities',
      icon: EmojiPeopleIcon,
      action: 'graduated'
    },
    {
      id: 'college',
      title: 'In college, haven\'t picked a major',
      description: 'Discover majors that match your interests and goals',
      icon: AccountBalanceIcon,
      action: 'college'
    },
    {
      id: 'chosen',
      title: 'I\'ve already chosen my major',
      description: 'See career paths for your chosen major',
      icon: WorkIcon,
      action: 'chosen'
    },
    {
      id: 'switching',
      title: 'Thinking about switching majors',
      description: 'Explore alternative paths that might be a better fit',
      icon: SwapHorizIcon,
      action: 'switching'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] via-[#1a1f36] to-[#0f172a] pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-[#71ADBA]/10 to-transparent rounded-full blur-3xl transform rotate-12 animate-pulse"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-[#EDEAB1]/10 to-transparent rounded-full blur-3xl transform -rotate-12 animate-pulse"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-3xl mx-auto mb-8"
      >
        <button
          onClick={() => navigate('/')}
          className="p-3 rounded-full bg-[#1a1f36]/50 text-[#71ADBA] hover:text-[#EDEAB1] hover:bg-[#1a1f36]/80 
                   transition-all duration-300 backdrop-blur-sm border border-white/10"
        >
          <ArrowBackIcon className="w-6 h-6" />
        </button>
      </motion.div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          <span className="bg-gradient-to-r from-[#71ADBA] via-[#EDEAB1] to-[#71ADBA] bg-clip-text text-transparent 
                         bg-[length:200%_auto] animate-gradient">
            Where are you in your education journey?
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-gray-400 text-lg mb-16"
        >
          Select your current status to get personalized guidance
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6"
        >
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <motion.div key={option.id} variants={itemVariants}>
                <div
                  onClick={() => handleSelection(option.action)}
                  className="relative overflow-hidden rounded-2xl cursor-pointer group"
                >
                  {/* Card container with glass effect */}
                  <div className="relative bg-[#1a1f36]/40 backdrop-blur-xl border border-white/10 
                               p-6 sm:p-8 hover:bg-[#1a1f36]/60 transition-all duration-500 
                               group-hover:border-[#71ADBA]/30">
                    {/* Glow effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#71ADBA]/20 to-[#EDEAB1]/20 blur-2xl"></div>
                    </div>

                    <div className="relative flex items-center gap-8">
                      {/* Icon container */}
                      <div className="flex-shrink-0 p-4 rounded-2xl bg-gradient-to-br from-[#71ADBA] to-[#EDEAB1] 
                                    shadow-lg group-hover:shadow-[#71ADBA]/30 transition-all duration-500 
                                    group-hover:scale-105">
                        <Icon className="text-[#0f172a] w-8 h-8 transform group-hover:rotate-12 transition-all duration-500" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold bg-gradient-to-r from-white to-white/90 
                                     bg-clip-text text-transparent group-hover:from-[#EDEAB1] group-hover:to-[#71ADBA] 
                                     transition-all duration-300">
                          {option.title}
                        </h3>
                        <p className="mt-2 text-lg text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          {option.description}
                        </p>
                      </div>

                      {/* Arrow indicator */}
                      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transform translate-x-4 
                                    group-hover:translate-x-0 transition-all duration-500">
                        <svg className="w-8 h-8 text-[#71ADBA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default OnboardingPage; 