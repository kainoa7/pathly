import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  const navigate = useNavigate();
  
  return (
    <header className="fixed w-full z-50 bg-opacity-50 backdrop-blur-lg bg-[#0f172a] h-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-[#71ADBA] blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <img 
                src="/logo.png" 
                alt="PathFinder Logo" 
                className="w-12 h-12 relative z-10" 
              />
            </motion.div>
            <span className="text-2xl font-bold text-[#71ADBA]">PathFinder</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-[#71ADBA] transition-colors">Home</Link>
            <Link to="/about" className="text-gray-300 hover:text-[#71ADBA] transition-colors">About</Link>
            <Link to="/for-students" className="text-gray-300 hover:text-[#71ADBA] transition-colors">For Students</Link>
            <Link to="/for-universities" className="text-gray-300 hover:text-[#71ADBA] transition-colors">For Universities</Link>
            <Link to="/contact" className="text-gray-300 hover:text-[#71ADBA] transition-colors">Contact</Link>
          </nav>

          <button
            onClick={() => navigate('/onboarding')}
            className="btn btn-primary hidden md:block"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 