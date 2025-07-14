import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  const navigate = useNavigate();
  
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-opacity-50 backdrop-blur-md bg-[#0f172a] h-20 shadow-lg">
      <div className="max-w-7xl mx-auto h-full">
        <div className="flex justify-between items-center h-full px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative group isolate"
            >
              <div className="absolute inset-0 bg-[#71ADBA] blur-[6px] sm:blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <img 
                src="/logo.png" 
                alt="Pathly Logo" 
                className="w-10 h-10 sm:w-12 sm:h-12 relative z-10" 
              />
            </motion.div>
            <div className="relative">
              <motion.span 
                className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[#71ADBA] via-[#EDEAB1] to-[#71ADBA] bg-clip-text text-transparent
                           bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]
                           relative inline-block simpsons-font"
                whileHover={{ scale: 1.05 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 10 
                }}
              >
                Pathly
              </motion.span>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#71ADBA]/30">
                <div className="absolute inset-0 bg-gradient-to-r from-[#71ADBA] to-[#EDEAB1] transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100"></div>
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link to="/" className="text-gray-300 hover:text-[#71ADBA] transition-colors">Home</Link>
            <Link to="/about" className="text-gray-300 hover:text-[#71ADBA] transition-colors">About</Link>
            <Link to="/for-students" className="text-gray-300 hover:text-[#71ADBA] transition-colors">For Students</Link>
            <Link to="/for-universities" className="text-gray-300 hover:text-[#71ADBA] transition-colors">For Universities</Link>
            <Link to="/contact" className="text-gray-300 hover:text-[#71ADBA] transition-colors">Contact</Link>
          </nav>

          <button
            onClick={() => navigate('/onboarding')}
            className="hidden md:block px-4 py-2 bg-[#71ADBA] text-white rounded-lg hover:bg-[#5C919C] transition-colors"
          >
            Get Started
          </button>

          <button className="md:hidden p-2">
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 