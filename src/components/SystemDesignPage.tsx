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
      content: `Our system follows a microservices architecture pattern, with distinct services for user management, career guidance, and content delivery. This approach allows for:

• Independent scaling of services based on demand
• Improved fault isolation
• Easier maintenance and updates
• Better team autonomy and development velocity`
    },
    database: {
      title: "Database Design",
      icon: StorageIcon,
      content: `We utilize a hybrid database approach:

• MongoDB for user profiles and career data
• Redis for caching and real-time features
• Elasticsearch for powerful career search capabilities
• Regular backups and data redundancy`
    },
    security: {
      title: "Security Architecture",
      icon: SecurityIcon,
      content: `Security is paramount in our design:

• JWT-based authentication
• Role-based access control (RBAC)
• Data encryption at rest and in transit
• Regular security audits and penetration testing
• GDPR and CCPA compliance measures`
    },
    performance: {
      title: "Performance Optimization",
      icon: SpeedIcon,
      content: `We ensure optimal performance through:

• CDN for static content delivery
• Aggressive caching strategies
• Load balancing across multiple regions
• Database query optimization
• Regular performance monitoring and optimization`
    },
    cloud: {
      title: "Cloud Infrastructure",
      icon: CloudIcon,
      content: `Our cloud-native infrastructure includes:

• AWS for core infrastructure
• Auto-scaling based on demand
• Multi-region deployment
• Disaster recovery procedures
• Continuous monitoring and alerting`
    },
    api: {
      title: "API Design",
      icon: ApiIcon,
      content: `Our API architecture follows REST principles:

• Versioned endpoints
• Rate limiting
• Comprehensive documentation
• GraphQL for complex data queries
• WebSocket for real-time features`
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
            Explore how we've built Pathly to be scalable, secure, and efficient
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