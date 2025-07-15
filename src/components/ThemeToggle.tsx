import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-full transition-colors duration-300
                dark:bg-[#1a2234] dark:hover:bg-[#1a2234]/80
                bg-blue-50 hover:bg-blue-100"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 180 : 0,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {theme === 'dark' ? (
          <LightModeIcon className="w-6 h-6 text-[#71ADBA]" />
        ) : (
          <DarkModeIcon className="w-6 h-6 text-blue-600" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle; 