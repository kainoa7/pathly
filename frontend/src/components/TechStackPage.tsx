import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TechStackPage = () => {
  const navigate = useNavigate();
  
  const techStack = {
    frontend: {
      title: "Frontend Development",
      icon: CodeIcon,
      technologies: [
        { name: "React 18", description: "Modern UI library with hooks and concurrent features" },
        { name: "TypeScript", description: "Static typing for enhanced code reliability" },
        { name: "Tailwind CSS", description: "Utility-first CSS with custom design system" },
        { name: "Framer Motion", description: "Advanced animations and micro-interactions" },
        { name: "Material UI", description: "Component library with icons and theming" },
        { name: "Vite", description: "Next-gen build tool with HMR and optimized bundling" },
        { name: "React Router", description: "Client-side routing with protected routes" }
      ]
    },
    design: {
      title: "Design System",
      icon: DesignServicesIcon,
      technologies: [
        { name: "Custom Components", description: "Reusable UI components with brand consistency" },
        { name: "Gradient Themes", description: "Beautiful color schemes and design tokens" },
        { name: "Responsive Design", description: "Mobile-first approach with Tailwind breakpoints" },
        { name: "Interactive Elements", description: "Hover states, animations, and user feedback" }
      ]
    },
    backend: {
      title: "Backend Infrastructure",
      icon: StorageIcon,
      technologies: [
        { name: "Node.js", description: "JavaScript runtime with Express.js framework" },
        { name: "Express.js", description: "Fast, minimalist web framework for Node.js" },
        { name: "Prisma ORM", description: "Type-safe database client with migrations" },
        { name: "SQLite", description: "Lightweight, file-based database for development" },
        { name: "bcryptjs", description: "Password hashing and security" },
        { name: "JWT", description: "JSON Web Tokens for authentication" }
      ]
    },
    cloud: {
      title: "Development & Deployment",
      icon: CloudIcon,
      technologies: [
        { name: "Git & GitHub", description: "Version control and collaborative development" },
        { name: "Local Development", description: "Hot reloading with Vite and Nodemon" },
        { name: "Environment Config", description: "Secure environment variable management" },
        { name: "Prisma Studio", description: "Database management and visualization" }
      ]
    },
    analytics: {
      title: "Analytics & Tracking",
      icon: AnalyticsIcon,
      technologies: [
        { name: "Mixpanel", description: "User behavior tracking and event analytics" },
        { name: "Custom Events", description: "Career quiz completion and signup tracking" },
        { name: "User Journey", description: "Funnel analysis and conversion optimization" },
        { name: "Real-time Metrics", description: "Live user activity and engagement data" }
      ]
    },
    security: {
      title: "Security & Authentication",
      icon: SecurityIcon,
      technologies: [
        { name: "JWT Authentication", description: "Secure token-based user sessions" },
        { name: "bcrypt Hashing", description: "Strong password encryption with salt rounds" },
        { name: "Input Validation", description: "Server-side validation and sanitization" },
        { name: "Protected Routes", description: "Role-based access control (RBAC)" },
        { name: "HTTPS Enforcement", description: "Secure data transmission" }
      ]
    },
    performance: {
      title: "Performance & UX",
      icon: SpeedIcon,
      technologies: [
        { name: "React Lazy Loading", description: "Dynamic imports and code splitting" },
        { name: "Context API", description: "Efficient state management" },
        { name: "Local Storage", description: "Persistent user preferences and session data" },
        { name: "Optimized Assets", description: "Compressed images and efficient bundling" },
        { name: "Fast Development", description: "Hot module replacement and instant updates" }
      ]
    },
    testing: {
      title: "Code Quality & Testing",
      icon: IntegrationInstructionsIcon,
      technologies: [
        { name: "TypeScript", description: "Compile-time error checking and type safety" },
        { name: "ESLint", description: "Code quality and style enforcement" },
        { name: "Prisma Migrations", description: "Database schema version control" },
        { name: "API Testing", description: "Manual endpoint testing and validation" }
      ]
    }
  };

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1a2234] to-[#0f172a]">
      <div className="max-w-7xl mx-auto">
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
            Our Technology Stack
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Built with modern, reliable technologies to deliver a seamless career guidance experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.entries(techStack).map(([key, section], index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#1a2234]/50 backdrop-blur-lg rounded-xl p-6 border border-[#71ADBA]/20 hover:border-[#71ADBA]/40 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-[#71ADBA]/10 rounded-lg">
                    <Icon className="w-6 h-6 text-[#71ADBA]" />
                  </div>
                  <h2 className="text-xl font-semibold text-[#EDEAB1]">{section.title}</h2>
                </div>
                <div className="space-y-4">
                  {section.technologies.map((tech, techIndex) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 + techIndex * 0.05 }}
                      className="p-4 bg-[#0f172a]/50 rounded-lg hover:bg-[#0f172a] transition-colors group"
                    >
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-semibold text-[#71ADBA] mb-1 group-hover:text-[#EDEAB1] transition-colors">
                          {tech.name}
                        </h3>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed">{tech.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TechStackPage; 