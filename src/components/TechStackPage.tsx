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
        { name: "Material UI", description: "Component library with custom theme integration" },
        { name: "Vite", description: "Next-gen build tool with HMR and optimized bundling" }
      ]
    },
    design: {
      title: "Design System",
      icon: DesignServicesIcon,
      technologies: [
        { name: "Figma", description: "Collaborative design and prototyping platform" },
        { name: "Custom Components", description: "Reusable UI components with brand consistency" },
        { name: "Design Tokens", description: "Standardized design variables for theming" },
        { name: "Storybook", description: "Component documentation and visual testing" }
      ]
    },
    backend: {
      title: "Backend Infrastructure",
      icon: StorageIcon,
      technologies: [
        { name: "Node.js", description: "Event-driven runtime with Express.js framework" },
        { name: "MongoDB Atlas", description: "Cloud-hosted NoSQL database with aggregation pipeline" },
        { name: "Redis", description: "In-memory caching for session and real-time data" },
        { name: "GraphQL", description: "Flexible API queries with Apollo Server" },
        { name: "WebSocket", description: "Real-time communication for live features" }
      ]
    },
    cloud: {
      title: "Cloud Infrastructure",
      icon: CloudIcon,
      technologies: [
        { name: "AWS", description: "EC2, S3, CloudFront, and Route 53 integration" },
        { name: "Docker", description: "Containerization with multi-stage builds" },
        { name: "GitHub Actions", description: "CI/CD pipelines with automated testing" },
        { name: "Vercel", description: "Edge network deployment with automatic scaling" }
      ]
    },
    analytics: {
      title: "Analytics & Monitoring",
      icon: AnalyticsIcon,
      technologies: [
        { name: "Mixpanel", description: "User behavior tracking and funnel analysis" },
        { name: "Sentry", description: "Error tracking and performance monitoring" },
        { name: "LogRocket", description: "Session replay and debugging tools" },
        { name: "Custom Analytics", description: "Internal metrics dashboard for insights" }
      ]
    },
    security: {
      title: "Security & Authentication",
      icon: SecurityIcon,
      technologies: [
        { name: "JWT & OAuth", description: "Secure authentication with refresh tokens" },
        { name: "bcrypt", description: "Password hashing with salt rounds" },
        { name: "Helmet.js", description: "HTTP headers security with CSP" },
        { name: "reCAPTCHA", description: "Bot protection and form security" }
      ]
    },
    performance: {
      title: "Performance Optimization",
      icon: SpeedIcon,
      technologies: [
        { name: "React Query", description: "Smart data fetching with caching" },
        { name: "Code Splitting", description: "Dynamic imports and lazy loading" },
        { name: "Image Optimization", description: "Next-gen formats and responsive loading" },
        { name: "Service Workers", description: "Offline support and caching strategies" }
      ]
    },
    testing: {
      title: "Testing & Quality",
      icon: IntegrationInstructionsIcon,
      technologies: [
        { name: "Jest & RTL", description: "Unit and integration testing" },
        { name: "Cypress", description: "E2E testing with custom commands" },
        { name: "ESLint", description: "Code quality and style enforcement" },
        { name: "Husky", description: "Git hooks for pre-commit checks" }
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
            Built with modern, scalable technologies to deliver a seamless and secure experience
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