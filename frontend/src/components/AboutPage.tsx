import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRocket, 
  faGraduationCap, 
  faChartLine, 
  faBrain,
  faUsers,
  faNewspaper,
  faUniversity,
  faLightbulb,
  faTrophy,
  faHeart,
  faFire,
  faStar,
  faArrowRight,
  faQuoteLeft,
  faCheck,
  faZap,
  faMagic,
  faBullseye,
  faDiamond
} from '@fortawesome/free-solid-svg-icons';

const AboutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeFeature, setActiveFeature] = useState(0);
  const [stats, setStats] = useState({ users: 3247, matches: 8923, success: 94 });

  // Animate stats counter
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        users: prev.users + Math.floor(Math.random() * 3),
        matches: prev.matches + Math.floor(Math.random() * 5),
        success: Math.min(99, prev.success + Math.floor(Math.random() * 2))
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const platformFeatures = [
    {
      icon: faBrain,
      title: "AI-Powered Career Matching",
      description: "Smart algorithms analyze your interests, skills, and goals to find your perfect career path",
      highlight: "15+ industries covered",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: faNewspaper,
      title: "Daily News Hub (Pro)",
      description: "Stay ahead with curated news on Tech, Business, Finance, Sports & AI with social features",
      highlight: "Pro feature",
      color: "from-green-500 to-blue-600"
    },
    {
      icon: faUniversity,
      title: "University Directory",
      description: "Search 3,000+ universities with insider insights and student marketplace for dorm essentials",
      highlight: "Coming soon",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: faChartLine,
      title: "Live Market Analytics",
      description: "Real-time job market trends, salary data, and skill demand tracking",
      highlight: "Updated daily",
      color: "from-purple-500 to-pink-600"
    }
  ];

  const successStories = [
    {
      name: "Sarah Chen",
      before: "Lost CS student",
      after: "Google SWE Intern",
      quote: "Kaiyl helped me realize my passion for AI. Got my dream internship in 6 months!",
      impact: "$8,400 scholarship"
    },
    {
      name: "Marcus Johnson",
      before: "Undecided major",
      after: "Finance at Goldman",
      quote: "The career matching was spot-on. Switched to finance and landed at Goldman Sachs.",
      impact: "$120k starting salary"
    },
    {
      name: "Emma Rodriguez",
      before: "Failed pre-med",
      after: "UX Designer at Meta",
      quote: "Thought I was stuck in medicine. Kaiyl showed me design - now I'm at Meta!",
      impact: "Career pivot success"
    }
  ];

  const platformStats = [
    { icon: faUsers, number: stats.users, label: "Active Students", suffix: "+" },
    { icon: faTrophy, number: stats.matches, label: "Career Matches", suffix: "+" },
    { icon: faHeart, number: stats.success, label: "Success Rate", suffix: "%" },
    { icon: faUniversity, number: 150, label: "Universities", suffix: "+" }
  ];

  return (
    <div className="min-h-screen bg-dark-background overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#71ADBA]/5"
            initial={{ y: 100, opacity: 0 }}
            animate={{ 
              y: -100, 
              opacity: [0, 0.5, 0],
              rotate: 360
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear"
            }}
            style={{
              left: Math.random() * 100 + '%',
              fontSize: Math.random() * 20 + 15 + 'px'
            }}
          >
            {['🎯', '🚀', '💡', '📊', '🎓', '💰', '⭐', '🔥'][Math.floor(Math.random() * 8)]}
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 rounded-full border border-[#71ADBA]/30"
          >
            <FontAwesomeIcon icon={faFire} className="text-orange-400" />
            <span className="text-[#EDEAB1] font-semibold">The Career Platform That Actually Works</span>
            <FontAwesomeIcon icon={faFire} className="text-orange-400" />
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] bg-clip-text text-transparent">
              Stop Guessing.
            </span>
            <br />
            <span className="text-white">Start Thriving.</span>
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Kaiyl is the AI-powered career platform that turns confused students into confident professionals. 
            <span className="text-[#EDEAB1] font-semibold"> No more "What should I major in?" anxiety.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(user ? '/dashboard' : '/signup/explorer')}
              className="px-8 py-4 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-xl text-white text-lg font-semibold hover:shadow-lg hover:shadow-[#71ADBA]/25 transition-all"
            >
              <FontAwesomeIcon icon={faRocket} className="mr-2" />
              {user ? 'Go to Dashboard' : 'Start Free Today'}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/demo')}
              className="px-8 py-4 border border-[#71ADBA] rounded-xl text-[#71ADBA] text-lg font-semibold hover:bg-[#71ADBA]/10 transition-all"
            >
              See How It Works
            </motion.button>
          </div>
        </motion.div>

        {/* Live Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {platformStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-[#1a2234]/60 rounded-xl p-6 border border-[#71ADBA]/20 text-center"
            >
              <FontAwesomeIcon icon={stat.icon} className="text-[#71ADBA] text-2xl mb-3" />
              <div className="text-3xl font-bold text-white mb-1">
                {stat.number}{stat.suffix}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* What Makes Us Different */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What Makes Kaiyl Different?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're not just another career quiz. We're your personal career strategist.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                onHoverStart={() => setActiveFeature(index)}
                className="bg-[#1a2234]/60 rounded-xl p-6 border border-[#71ADBA]/20 hover:border-[#71ADBA]/40 transition-all group cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <FontAwesomeIcon icon={feature.icon} className="text-white text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 text-sm mb-3">{feature.description}</p>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EDEAB1]/10 rounded-full">
                  <FontAwesomeIcon icon={faStar} className="text-[#EDEAB1] text-xs" />
                  <span className="text-[#EDEAB1] text-xs font-medium">{feature.highlight}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Success Stories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Real Students, Real Success
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Don't just take our word for it. Here's how Kaiyl changed these students' lives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.2 }}
                className="bg-gradient-to-br from-[#1a2234]/80 to-[#0f1419]/80 rounded-xl p-6 border border-[#71ADBA]/20 relative overflow-hidden"
              >
                <div className="absolute top-4 right-4">
                  <FontAwesomeIcon icon={faQuoteLeft} className="text-[#71ADBA]/20 text-3xl" />
                </div>
                
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-white">{story.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>{story.before}</span>
                    <FontAwesomeIcon icon={faArrowRight} className="text-[#71ADBA]" />
                    <span className="text-[#EDEAB1] font-medium">{story.after}</span>
                  </div>
                </div>

                <p className="text-gray-300 mb-4 italic">"{story.quote}"</p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} className="text-yellow-400 text-sm" />
                    ))}
                  </div>
                  <div className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-medium">
                    {story.impact}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Explorer vs Pro Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Choose Your Adventure
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Start free with Explorer, or unlock everything with Pro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Explorer */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-[#1a2234]/60 rounded-2xl p-8 border border-[#71ADBA]/20 relative"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Explorer</h3>
                <div className="text-3xl font-bold text-[#71ADBA] mb-4">FREE</div>
                <p className="text-gray-300">Perfect for getting started</p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "AI Career Matching Quiz",
                  "Basic University Search", 
                  "General Career Insights",
                  "Community Access",
                  "Mobile Responsive"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <FontAwesomeIcon icon={faCheck} className="text-green-400" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate('/signup/explorer')}
                className="w-full py-3 border border-[#71ADBA] text-[#71ADBA] rounded-xl font-semibold hover:bg-[#71ADBA]/10 transition-all"
              >
                Start Free
              </button>
            </motion.div>

            {/* Pro */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-[#71ADBA]/20 to-[#9C71BA]/20 rounded-2xl p-8 border border-[#71ADBA]/40 relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 rounded-full text-sm font-bold">
                  🔥 MOST POPULAR
                </div>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                <div className="text-3xl font-bold text-[#EDEAB1] mb-4">FREE</div>
                <p className="text-gray-300">For serious career builders</p>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Explorer",
                  "Daily News Hub with Social Features",
                  "Advanced Career Analytics", 
                  "University Marketplace Access",
                  "Priority Support",
                  "Exclusive Community",
                  "Activity Dashboard"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <FontAwesomeIcon icon={faCheck} className="text-[#EDEAB1]" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => navigate(user?.accountType === 'EXPLORER' ? '/upgrade-to-pro' : '/signup/pro')}
                className="w-full py-3 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#71ADBA]/25 transition-all"
              >
                <FontAwesomeIcon icon={faZap} className="mr-2" />
                Upgrade to Pro
              </button>
            </motion.div>
          </div>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-2xl p-8 sm:p-12 border border-[#71ADBA]/20 text-center mb-20"
        >
          <FontAwesomeIcon icon={faBullseye} className="text-[#71ADBA] text-4xl mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-6">
            We believe every student deserves clarity, not confusion. Every dreamer deserves direction, not dead ends. 
            Kaiyl exists to turn your biggest questions into your biggest breakthroughs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Career Clarity', 'Real Impact', 'Student-First', 'Always Free'].map((value, i) => (
              <div key={i} className="px-4 py-2 bg-[#71ADBA]/20 rounded-full text-[#EDEAB1] font-medium">
                <FontAwesomeIcon icon={faDiamond} className="mr-2" />
                {value}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#71ADBA] to-[#EDEAB1] bg-clip-text text-transparent mb-6">
            Ready to Stop Wondering "What If?"
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join {stats.users}+ students who've found their path. Your future self will thank you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(user ? '/dashboard' : '/signup/explorer')}
              className="px-8 py-4 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-xl text-white text-lg font-semibold hover:shadow-lg hover:shadow-[#71ADBA]/25 transition-all"
            >
              <FontAwesomeIcon icon={faMagic} className="mr-2" />
              {user ? 'Continue Journey' : 'Start Your Journey'}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/onboarding')}
              className="px-8 py-4 border border-[#71ADBA] rounded-xl text-[#71ADBA] text-lg font-semibold hover:bg-[#71ADBA]/10 transition-all"
            >
              Take Career Quiz
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage; 