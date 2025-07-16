import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import StorageIcon from '@mui/icons-material/Storage';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import CloudIcon from '@mui/icons-material/Cloud';
import ApiIcon from '@mui/icons-material/Api';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';

const SystemDesignPage = () => {
  const [selectedSection, setSelectedSection] = useState('architecture');
  const navigate = useNavigate();

  const sections = {
    architecture: {
      title: "System Architecture",
      icon: ArchitectureIcon,
      content: `Pathly follows a clean separation between frontend and backend with a modern full-stack architecture:

• React frontend with TypeScript for type safety
• Node.js + Express backend for API endpoints
• Prisma ORM for database management and migrations
• RESTful API design with proper error handling
• Context-based state management for user sessions
• Modular component architecture for maintainability`
    },
    database: {
      title: "Database Design",
      icon: StorageIcon,
      content: `Our database strategy focuses on user-centric design with scalable schema:

• SQLite for development with easy migration to PostgreSQL
• Prisma ORM for type-safe database operations
• Comprehensive user profiles with account types (Explorer, Pro, Premium)
• Career quiz results and major recommendations storage
• Skill demand tracking and career timeline data
• AI impact analysis for future-proofing career advice
• Automated migrations and schema version control`
    },
    security: {
      title: "Security Architecture",
      icon: SecurityIcon,
      content: `Security is built into every layer of our application:

• JWT-based authentication with secure token storage
• bcrypt password hashing with salt rounds
• Role-based access control (Explorer, Pro, Premium tiers)
• Protected routes preventing unauthorized access
• Input validation on both client and server sides
• Secure environment variable management
• HTTPS enforcement and secure headers`
    },
    performance: {
      title: "Performance Optimization",
      icon: SpeedIcon,
      content: `We prioritize fast, responsive user experiences:

• Vite for lightning-fast development and builds
• React lazy loading and code splitting
• Efficient state management with Context API
• Local storage for persistent user preferences
• Optimized database queries with Prisma
• Framer Motion for smooth animations
• Compressed assets and efficient bundling`
    },
    cloud: {
      title: "Development & Infrastructure",
      icon: CloudIcon,
      content: `Our development workflow emphasizes reliability and efficiency:

• Git-based version control with GitHub
• Hot module replacement for instant development feedback
• Prisma Studio for visual database management
• Environment-based configuration management
• Structured folder organization for scalability
• Local development with production-ready architecture
• Easy deployment with environment portability`
    },
    api: {
      title: "API Design",
      icon: ApiIcon,
      content: `Our API follows REST principles with modern best practices:

• RESTful endpoints with clear resource naming
• Comprehensive input validation and sanitization
• Structured error responses with proper HTTP status codes
• Authentication middleware for protected routes
• User signup and authentication endpoints
• Health check endpoints for monitoring
• Type-safe request/response handling with TypeScript
• Modular route organization for maintainability`
    }
  };

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1a2234] to-[#0f172a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/about')}
            className="flex items-center gap-2 text-[#71ADBA] hover:text-[#EDEAB1] transition-colors duration-300"
          >
            <ArrowBackIcon className="w-6 h-6" />
            <span>Back to About</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] bg-clip-text text-transparent">
            System Design & Architecture
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how Pathly is engineered to be reliable, secure, and user-focused
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {Object.entries(sections).map(([key, section]) => {
              const Icon = section.icon;
              return (
                <motion.button
                  key={key}
                  onClick={() => setSelectedSection(key)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center gap-4
                    ${selectedSection === key 
                      ? 'bg-[#71ADBA]/20 border border-[#71ADBA]/40' 
                      : 'bg-[#1a2234]/50 hover:bg-[#1a2234] border border-transparent'}`}
                >
                  <div className="p-2 bg-[#71ADBA]/10 rounded-lg">
                    <Icon className="w-6 h-6 text-[#71ADBA]" />
                  </div>
                  <span className="text-[#EDEAB1] font-medium">{section.title}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Content Area */}
          <motion.div
            key={selectedSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:col-span-2 bg-[#1a2234]/50 backdrop-blur-lg rounded-xl p-8 border border-[#71ADBA]/20"
          >
            <div className="flex items-center gap-4 mb-8">
              {sections[selectedSection].icon && (
                <div className="p-3 bg-[#71ADBA]/10 rounded-lg">
                  {React.createElement(sections[selectedSection].icon, {
                    className: "w-8 h-8 text-[#71ADBA]"
                  })}
                </div>
              )}
              <h2 className="text-3xl font-bold text-[#EDEAB1]">
                {sections[selectedSection].title}
              </h2>
            </div>
            <div className="prose prose-invert max-w-none">
              <div className="text-gray-300 whitespace-pre-line text-lg leading-relaxed">
                {sections[selectedSection].content}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SystemDesignPage; 