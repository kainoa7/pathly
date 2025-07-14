import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import WorkIcon from '@mui/icons-material/Work';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const OnboardingPage = () => {
  const navigate = useNavigate();

  const handleSelection = (selection: string) => {
    switch (selection) {
      case 'highschool':
        navigate('/quiz/highschool');
        break;
      case 'college':
        navigate('/quiz/college');
        break;
      case 'chosen':
        navigate('/major-selection');
        break;
      case 'switching':
        navigate('/switching-major');
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
          className="grid gap-6"
        >
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <motion.div key={option.id} variants={itemVariants}>
                <div
                  onClick={() => handleSelection(option.action)}
                  className="card hover:scale-[1.02] cursor-pointer group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gradient-to-r from-[#71ADBA] to-[#EDEAB1] rounded-xl shadow-lg group-hover:shadow-[#71ADBA]/30">
                      <Icon className="text-[#0f172a] w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#EDEAB1] group-hover:text-white transition-colors duration-200">
                        {option.title}
                      </h3>
                      <p className="mt-2 text-gray-400 group-hover:text-[#71ADBA] transition-colors duration-200">
                        {option.description}
                      </p>
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