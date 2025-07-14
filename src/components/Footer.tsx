import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f172a] py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Pathly Logo" 
              className="w-8 h-8" 
            />
            <span className="text-gray-300">
              © {currentYear} Pathly. All rights reserved.
            </span>
          </div>
          
          <nav className="flex gap-6 text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-[#71ADBA] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#71ADBA] transition-colors">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-[#71ADBA] transition-colors">
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 