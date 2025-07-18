import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import WorkIcon from '@mui/icons-material/Work';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useEffect } from 'react';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    });
  }, [controls]);

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
      case 'other':
        // Navigate to feedback page or open contact form
        navigate('/feedback', {
          state: {
            from: 'onboarding',
            message: 'We\'d love to hear about your specific situation so we can better serve students like you!'
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
      action: 'highschool',
      gradient: 'from-[#71ADBA] to-[#9C71BA]'
    },
    {
      id: 'graduated',
      title: 'Graduated high school, need guidance',
      description: 'Get help planning your next steps and exploring possibilities',
      icon: EmojiPeopleIcon,
      action: 'graduated',
      gradient: 'from-[#9C71BA] to-[#EDEAB1]'
    },
    {
      id: 'college',
      title: 'In college, haven\'t picked a major',
      description: 'Discover majors that match your interests and goals',
      icon: AccountBalanceIcon,
      action: 'college',
      gradient: 'from-[#EDEAB1] to-[#71ADBA]'
    },
    {
      id: 'chosen',
      title: 'I\'ve already chosen my major',
      description: 'See career paths for your chosen major',
      icon: WorkIcon,
      action: 'chosen',
      gradient: 'from-[#71ADBA] to-[#EDEAB1]'
    },
    {
      id: 'switching',
      title: 'Thinking about switching majors',
      description: 'Explore alternative paths that might be a better fit',
      icon: SwapHorizIcon,
      action: 'switching',
      gradient: 'from-[#9C71BA] to-[#71ADBA]'
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
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1020] pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-[#71ADBA]/10 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-[#EDEAB1]/10 to-transparent rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12 ml-4 sm:ml-8 lg:ml-16"
      >
        <button
          onClick={() => navigate('/')}
          className="p-3 rounded-full bg-[#1a2234]/50 text-[#71ADBA] hover:text-[#EDEAB1] hover:bg-[#1a2234]/80 
                   transition-all duration-300 backdrop-blur-sm border border-[#71ADBA]/20 hover:border-[#71ADBA]/40"
        >
          <ArrowBackIcon className="w-6 h-6" />
        </button>
      </motion.div>

      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1]">
            Where are you in your education journey?
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 w-24 mx-auto bg-gradient-to-r from-[#71ADBA] to-[#EDEAB1] rounded-full mb-6"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center text-[#71ADBA] text-xl mb-16"
        >
          Select your current status to get personalized guidance
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6"
        >
          {options.map((option, index) => {
            const Icon = option.icon;
            return (
              <motion.div
                key={option.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="transform-gpu"
              >
                <div
                  onClick={() => handleSelection(option.action)}
                  className="relative overflow-hidden rounded-2xl cursor-pointer group"
                >
                  {/* Card container with glass effect */}
                  <div className="relative bg-[#1a2234] border border-[#71ADBA]/20 p-6 sm:p-8 
                               transition-all duration-500 group-hover:border-[#71ADBA]/40 group-hover:bg-[#1a2234]/80">
                    {/* Glow effect */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${option.gradient} opacity-10 blur-xl`}></div>
                    </motion.div>

                    <div className="relative flex items-center gap-8">
                      {/* Icon container */}
                      <div className={`flex-shrink-0 p-4 rounded-2xl bg-gradient-to-r ${option.gradient}
                                    shadow-lg group-hover:shadow-[#71ADBA]/30 transition-all duration-500`}>
                        <Icon className="text-[#1a2234] w-8 h-8 transform group-hover:rotate-12 transition-all duration-500" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-white group-hover:text-[#EDEAB1] transition-colors duration-300">
                          {option.title}
                        </h3>
                        <p className="mt-2 text-lg text-[#71ADBA] group-hover:text-[#71ADBA]/80 transition-colors duration-300">
                          {option.description}
                        </p>
                      </div>

                      {/* Arrow indicator */}
                      <motion.div
                        initial={{ x: 10, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                        className="flex-shrink-0"
                      >
                        <svg className="w-8 h-8 text-[#EDEAB1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Don't see your option section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 text-[#71ADBA] hover:text-[#EDEAB1] transition-colors duration-300 cursor-pointer group"
               onClick={() => handleSelection('other')}>
            <HelpOutlineIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-lg font-medium underline decoration-[#71ADBA]/30 hover:decoration-[#EDEAB1]/60 transition-all duration-300">
              Don't see your option? Let us know!
            </span>
          </div>
          <p className="mt-2 text-sm text-[#71ADBA]/70">
            We're constantly improving our platform based on student feedback
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default OnboardingPage; 