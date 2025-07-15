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
        className="max-w-2xl mx-auto mb-8"
      >
        <button
          onClick={() => navigate('/')}
          className="p-2 rounded-full text-[#71ADBA] hover:text-[#EDEAB1] transition-colors duration-200"
        >
          <ArrowBackIcon className="w-6 h-6" />
        </button>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-center heading-gradient mb-12"
        >
          Where are you in your education journey?
        </motion.h1>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8"
        >
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <motion.div key={option.id} variants={itemVariants}>
                <div
                  onClick={() => handleSelection(option.action)}
                  className="relative overflow-hidden bg-[#1a1f36] rounded-2xl p-6 cursor-pointer group hover:bg-[#1a1f36]/80 
                           transition-all duration-300 border border-white/5 hover:border-[#71ADBA]/20"
                >
                  {/* Background glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#71ADBA]/10 to-[#EDEAB1]/10 blur-xl"></div>
                  </div>

                  <div className="relative flex items-center gap-6">
                    {/* Icon container with enhanced gradient */}
                    <div className="flex-shrink-0 p-4 rounded-xl bg-gradient-to-r from-[#71ADBA] to-[#EDEAB1] 
                                  shadow-lg group-hover:shadow-[#71ADBA]/30 transition-all duration-300">
                      <Icon className="text-[#0f172a] w-8 h-8 group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    {/* Content with enhanced typography and spacing */}
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold bg-gradient-to-r from-[#EDEAB1] to-[#71ADBA] 
                                   bg-clip-text text-transparent group-hover:from-white group-hover:to-white 
                                   transition-all duration-300">
                        {option.title}
                      </h3>
                      <p className="mt-3 text-lg text-gray-400 group-hover:text-[#71ADBA] transition-colors duration-200">
                        {option.description}
                      </p>
                    </div>

                    {/* Arrow indicator */}
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transform translate-x-2 
                                  group-hover:translate-x-0 transition-all duration-300">
                      <svg className="w-6 h-6 text-[#71ADBA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
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