import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import ExploreIcon from '@mui/icons-material/Explore';
import TimelineIcon from '@mui/icons-material/Timeline';

const CareerDiscoveryPage = () => {
  const navigate = useNavigate();

  const painPoints = [
    {
      emoji: "😰",
      title: "\"I have no idea what I want to do with my life\"",
      description: "Everyone else seems to have it figured out, but you're completely lost."
    },
    {
      emoji: "🤔",
      title: "\"Am I wasting time in the wrong major?\"", 
      description: "You're in college but questioning if this path is right for you."
    },
    {
      emoji: "😓",
      title: "\"I graduated and still don't know my next step\"",
      description: "Diploma in hand, but zero clarity on what career to pursue."
    },
    {
      emoji: "🎓",
      title: "\"Should I even go to college?\"",
      description: "High school is ending and you're pressured to choose, but nothing feels right."
    }
  ];

  const successStories = [
    {
      name: "Sarah, 19",
      before: "Switching majors for the 3rd time",
      after: "Found her perfect fit in UX Design",
      company: "Now interning at Tesla",
      timeframe: "3 weeks"
    },
    {
      name: "Marcus, 22", 
      before: "Graduated with no direction",
      after: "Discovered his passion for data science",
      company: "Landed $85k job at Microsoft",
      timeframe: "2 months"
    },
    {
      name: "Emma, 18",
      before: "Scared to pick a college major",
      after: "Confident in her CS path",
      company: "Got early admission to Stanford",
      timeframe: "1 month"
    }
  ];

  const features = [
    {
      icon: PsychologyIcon,
      title: "AI-Powered Career DNA Test",
      description: "Discover your hidden strengths and perfect career matches",
      locked: false
    },
    {
      icon: TimelineIcon,
      title: "Personalized Roadmap Builder", 
      description: "Step-by-step plan from where you are to your dream career",
      locked: true
    },
    {
      icon: TrendingUpIcon,
      title: "Future-Proof Career Insights",
      description: "See which careers are growing and which are declining",
      locked: true
    },
    {
      icon: WorkIcon,
      title: "Real Industry Insider Access",
      description: "Talk to actual professionals in fields you're considering",
      locked: true
    }
  ];

  return (
    <div className="min-h-screen bg-dark-background text-white">
      {/* Hero Section - Emotional Hook */}
      <section className="pt-24 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#71ADBA]/20 via-transparent to-[#9C71BA]/20"></div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] bg-clip-text text-transparent">
              Stop Feeling Lost About Your Future
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              While your friends seem to have it all figured out, you're stuck wondering 
              <span className="text-[#EDEAB1] font-semibold"> "What am I supposed to do with my life?" </span>
            </p>
            
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 mb-8 max-w-2xl mx-auto">
              <p className="text-red-300 font-semibold text-lg">
                ⚠️ Every day you wait is another day behind everyone else who's already started their journey
              </p>
            </div>

            <motion.button
              onClick={() => navigate('/pricing')}
              className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-12 py-4 rounded-lg text-xl font-bold hover:opacity-90 transition-all duration-300 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Find Your Path in 5 Minutes →
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">
            Do Any of These Sound Like You?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {painPoints.map((pain, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-dark-backgroundSecondary p-6 rounded-lg border border-gray-700 hover:border-[#71ADBA]/50 transition-colors"
              >
                <div className="text-4xl mb-4">{pain.emoji}</div>
                <h3 className="text-xl font-semibold text-[#EDEAB1] mb-3">{pain.title}</h3>
                <p className="text-gray-300">{pain.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-xl text-gray-300 mb-6">
              You're not alone. <span className="text-[#71ADBA] font-semibold">73% of students</span> change their major at least once.
            </p>
            <p className="text-lg text-red-300">
              But what if you could skip all that confusion and find your perfect path right now?
            </p>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            From Lost to Unstoppable
          </h2>
                     <p className="text-xl text-center text-gray-300 mb-12">
             Real students who found their path with <span className="font-bold bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] bg-clip-text text-transparent">K<span className="text-[#71ADBA]">ai</span>yl</span>
           </p>

          <div className="grid md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-br from-[#71ADBA]/10 to-[#9C71BA]/10 p-6 rounded-lg border border-[#71ADBA]/30"
              >
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#EDEAB1] mb-4">{story.name}</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-red-500/20 p-3 rounded">
                      <p className="text-red-300 text-sm font-semibold">BEFORE:</p>
                      <p className="text-white">{story.before}</p>
                    </div>
                    
                    <div className="text-2xl">⬇️</div>
                    
                    <div className="bg-green-500/20 p-3 rounded">
                      <p className="text-green-300 text-sm font-semibold">AFTER:</p>
                      <p className="text-white">{story.after}</p>
                      <p className="text-[#71ADBA] font-bold mt-2">{story.company}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-[#EDEAB1]/20 p-2 rounded">
                    <p className="text-[#EDEAB1] font-bold">In just {story.timeframe}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16 px-4 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
                     <h2 className="text-4xl font-bold text-center mb-12 text-white">
             What You Get Inside <span className="bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] bg-clip-text text-transparent">K<span className="text-[#71ADBA]">ai</span>yl</span>
           </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-6 rounded-lg border relative ${
                  feature.locked 
                    ? 'bg-gray-800/50 border-gray-600 opacity-75' 
                    : 'bg-dark-backgroundSecondary border-[#71ADBA]/50'
                }`}
              >
                {feature.locked && (
                  <div className="absolute top-4 right-4 bg-[#EDEAB1] text-dark-background px-3 py-1 rounded-full text-sm font-bold">
                    🔒 PRO
                  </div>
                )}
                
                <feature.icon className="text-4xl text-[#71ADBA] mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
                
                {feature.locked && (
                  <button
                    onClick={() => navigate('/pricing')}
                    className="mt-4 text-[#71ADBA] hover:text-[#EDEAB1] font-semibold transition-colors"
                  >
                    Unlock with Pro →
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOMO CTA */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl font-bold mb-6 text-white">
              Don't Spend Another Day Feeling Lost
            </h2>
            
            <div className="bg-[#EDEAB1]/20 border border-[#EDEAB1]/50 rounded-lg p-8 mb-8">
              <p className="text-2xl text-[#EDEAB1] font-semibold mb-4">
                While you're reading this, other students are already discovering their perfect career path
              </p>
              <p className="text-lg text-gray-300">
                Every month you wait is potential income lost, opportunities missed, and confidence that continues to slip away.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <p className="text-xl text-gray-300">
                ✅ <span className="text-green-400">2,847 students</span> found their path this month
              </p>
              <p className="text-xl text-gray-300">
                ✅ Average salary increase: <span className="text-green-400">$34,000</span>
              </p>
              <p className="text-xl text-gray-300">
                ✅ <span className="text-green-400">94%</span> say they wish they started sooner
              </p>
            </div>

            <motion.button
              onClick={() => navigate('/pricing')}
              className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-16 py-6 rounded-lg text-2xl font-bold hover:opacity-90 transition-all duration-300 shadow-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Journey Today
            </motion.button>
            
                         <p className="text-sm text-gray-400 mt-4">
               Join <span className="font-bold bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] bg-clip-text text-transparent">K<span className="text-[#71ADBA]">ai</span>yl</span> now and stop wondering "what if"
             </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CareerDiscoveryPage; 