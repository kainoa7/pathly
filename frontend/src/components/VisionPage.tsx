import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRobot, 
  faBrain,
  faMicrophone,
  faChartLine,
  faGraduationCap,
  faNewspaper,
  faUsers,
  faArrowRight,
  faLightbulb,
  faRocket,
  faEye,
  faCalendarAlt,
  faBookmark,
  faBell,
  faPlay
} from '@fortawesome/free-solid-svg-icons';

const VisionPage = () => {
  const navigate = useNavigate();
  const [selectedFeature, setSelectedFeature] = useState(0);

  const futureFeatures = [
    {
      icon: faRobot,
      title: "JARVUS AI Assistant",
      description: "Your personal career mentor that learns your goals, tracks your progress, and provides personalized guidance 24/7",
      timeline: "Phase 1 - Q4 2025",
      capabilities: [
        "Natural conversation about career goals",
        "Personalized action plans and recommendations", 
        "Progress tracking and milestone celebration",
        "Smart reminders for important deadlines"
      ],
      demo: "Voice-enabled chat interface with memory"
    },
    {
      icon: faBrain,
      title: "Smart Career Matching",
      description: "Advanced AI that analyzes your personality, skills, interests, and market trends to find your perfect career path",
      timeline: "Phase 2 - Q1 2026",
      capabilities: [
        "Comprehensive personality and skills assessment",
        "Real-time job market analysis and salary trends",
        "Personalized career roadmaps with skill gaps",
        "Success probability scoring for different paths"
      ],
      demo: "Interactive matching with live market data"
    },
    {
      icon: faChartLine,
      title: "Career Analytics Dashboard",
      description: "Data-driven insights about your career journey with predictive analytics and market intelligence",
      timeline: "Phase 2 - Q2 2026",
      capabilities: [
        "Personal career growth analytics",
        "Industry trend forecasting",
        "Skill demand predictions",
        "Salary progression modeling"
      ],
      demo: "Beautiful charts showing career trajectory"
    },
    {
      icon: faNewspaper,
      title: "Intelligent News Feed",
      description: "Curated career-relevant news that adapts to your interests and career goals",
      timeline: "Phase 3 - Q3 2026",
      capabilities: [
        "AI-curated industry news and trends",
        "Personalized learning recommendations",
        "Breaking news alerts for your field",
        "Social discussion threads with peers"
      ],
      demo: "Smart feed that learns your preferences"
    }
  ];

  const roadmapPhases = [
    {
      phase: "Beta Testing",
      timeline: "Now - Q3 2025",
      focus: "Market Validation",
      features: ["Demo Interface", "User Feedback", "Core Algorithm Development"],
      status: "current"
    },
    {
      phase: "Alpha Launch",
      timeline: "Q4 2025 - Q1 2026",
      focus: "Core AI Features",
      features: ["JARVUS AI Assistant", "Basic Career Matching", "User Profiles"],
      status: "planned"
    },
    {
      phase: "Public Beta",
      timeline: "Q2 2026",
      focus: "Advanced Features",
      features: ["Career Analytics", "News Integration", "Community Features"],
      status: "planned"
    },
    {
      phase: "Full Launch",
      timeline: "Q3 2026",
      focus: "Scale & Growth",
      features: ["Mobile Apps", "Enterprise Partnerships", "Global Expansion"],
      status: "vision"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1.5, 0.5],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full mb-8"
            animate={{ glow: [0, 20, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <FontAwesomeIcon icon={faEye} className="text-cyan-400" />
            <span className="text-cyan-300 font-medium">THE JARVUS VISION</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              The Future of
            </span>
            <br />
            <span className="text-white">Career Intelligence</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Imagine having a personal AI career mentor that understands you better than you understand yourself. 
            <span className="text-cyan-400 font-semibold"> That's where we're heading.</span>
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/jarvus-ai-demo')}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white text-lg font-semibold"
          >
            <FontAwesomeIcon icon={faPlay} className="mr-2" />
            Experience the Demo
          </motion.button>
        </motion.div>

        {/* Interactive Feature Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12">What JARVUS Will Become</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Feature List */}
            <div className="space-y-4">
              {futureFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedFeature(index)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedFeature === index 
                      ? 'bg-cyan-500/20 border-cyan-500/50 shadow-lg shadow-cyan-500/25' 
                      : 'bg-slate-900/50 border-gray-600/30 hover:border-cyan-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      selectedFeature === index ? 'bg-cyan-500' : 'bg-gray-700'
                    }`}>
                      <FontAwesomeIcon icon={feature.icon} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{feature.title}</h3>
                      <p className="text-xs text-cyan-400">{feature.timeline}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Feature Detail */}
            <div className="lg:col-span-2">
              <motion.div
                key={selectedFeature}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900/50 rounded-xl p-8 border border-cyan-500/20"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <FontAwesomeIcon icon={futureFeatures[selectedFeature].icon} className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{futureFeatures[selectedFeature].title}</h3>
                    <p className="text-cyan-400">{futureFeatures[selectedFeature].timeline}</p>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 text-lg">{futureFeatures[selectedFeature].description}</p>

                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Key Capabilities:</h4>
                  <ul className="space-y-2">
                    {futureFeatures[selectedFeature].capabilities.map((capability, index) => (
                      <motion.li
                        key={capability}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 text-gray-300"
                      >
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        {capability}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                  <p className="text-cyan-300 text-sm">
                    <FontAwesomeIcon icon={faLightbulb} className="mr-2" />
                    <strong>Demo Preview:</strong> {futureFeatures[selectedFeature].demo}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Development Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-bold text-center mb-12">Our Development Roadmap</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmapPhases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`relative p-6 rounded-xl border ${
                  phase.status === 'current' 
                    ? 'bg-cyan-500/20 border-cyan-500/50 shadow-lg shadow-cyan-500/25' 
                    : phase.status === 'planned'
                    ? 'bg-blue-500/10 border-blue-500/30'
                    : 'bg-slate-900/50 border-gray-600/30'
                }`}
              >
                {phase.status === 'current' && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-cyan-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                      CURRENT
                    </div>
                  </div>
                )}

                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">{phase.phase}</h3>
                  <p className="text-cyan-400 text-sm">{phase.timeline}</p>
                  <p className="text-gray-400 text-xs mt-1">{phase.focus}</p>
                </div>

                <ul className="space-y-2">
                  {phase.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        phase.status === 'current' ? 'bg-cyan-400' : 'bg-gray-500'
                      }`}></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why This Matters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20"
        >
          <div className="bg-slate-900/50 rounded-xl p-8 border border-cyan-500/20 text-center">
            <h2 className="text-3xl font-bold text-white mb-6">Why This Vision Matters</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-3xl font-bold text-cyan-400 mb-2">73%</div>
                <p className="text-gray-300">of students feel lost about their career path</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">$50K+</div>
                <p className="text-gray-300">average difference in starting salaries based on career choices</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">2.3M</div>
                <p className="text-gray-300">students graduate each year needing career guidance</p>
              </div>
            </div>

            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              JARVUS isn't just another career tool. It's a comprehensive AI-powered ecosystem designed to solve 
              the career confusion crisis and help students make informed decisions about their future.
            </p>
          </div>
        </motion.div>

        {/* Stay Updated CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-xl p-8 border border-cyan-500/20"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Be Part of the Future</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            JARVUS is being built based on real user feedback. Try our demo today and help shape 
            the future of career intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/jarvus-ai-demo')}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white text-lg font-semibold"
            >
              <FontAwesomeIcon icon={faRocket} className="mr-2" />
              Try Demo Now
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/signup/explorer')}
              className="px-8 py-4 border border-cyan-500/50 rounded-xl text-cyan-400 text-lg font-semibold"
            >
              <FontAwesomeIcon icon={faBell} className="mr-2" />
              Get Early Access
            </motion.button>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faUsers} />
              <span>3,252+ testing the demo</span>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faBookmark} />
              <span>Join the waitlist for updates</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VisionPage; 