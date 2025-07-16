import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import LockIcon from '@mui/icons-material/Lock';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import NightlifeIcon from '@mui/icons-material/Nightlife';
import SchoolIcon from '@mui/icons-material/School';

const CampusLifePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();

  const previewLocations = [
    {
      name: "The Study Café",
      description: "Popular student hangout with great coffee",
      icon: <LocalCafeIcon className="text-[#A1DDE6]" />
    },
    {
      name: "Central Park",
      description: "Perfect for outdoor study sessions",
      icon: <LocationOnIcon className="text-[#D9F99D]" />
    }
  ];

  const vibeMetrics = [
    { label: "Academic Focus", value: 80 },
    { label: "Social Life", value: 75 },
    { label: "Campus Spirit", value: 85 }
  ];

  const popularClubs = [
    "🤖 Robotics Club",
    "🎮 Gaming Society",
    "☕️ Boba Lovers",
    "🎨 Art Collective"
  ];

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#A1DDE6]/10 to-[#FDF6E3]/20 dark:from-[#A1DDE6]/5 dark:to-[#FDF6E3]/10"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#A1DDE6]/5 to-[#FDF6E3]/10 animate-gradient" />
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/20"
              style={{
                width: Math.random() * 100 + 50 + 'px',
                height: Math.random() * 100 + 50 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animation: `float ${Math.random() * 10 + 5}s infinite`,
                opacity: Math.random() * 0.5
              }}
            />
          ))}
        </div>
        <div className="relative text-center px-4 max-w-4xl mx-auto z-10">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-bold text-light-text dark:text-dark-text mb-4"
          >
            Explore Campus Life
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-light-textSoft dark:text-dark-textSoft max-w-2xl mx-auto"
          >
            Get a glimpse of what it's really like at your future school.
          </motion.p>
        </div>
      </motion.div>

      {/* Preview Cards */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Local Spots Card */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-light-background dark:bg-dark-backgroundSecondary rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-4 text-light-text dark:text-dark-text">Popular Local Spots</h3>
            <div className="space-y-4">
              {previewLocations.map((location, index) => (
                <div key={index} className="flex items-start space-x-3">
                  {location.icon}
                  <div>
                    <h4 className="font-medium text-light-text dark:text-dark-text">{location.name}</h4>
                    <p className="text-sm text-light-textSoft dark:text-dark-textSoft">{location.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Vibe Check Card */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-light-background dark:bg-dark-backgroundSecondary rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-4 text-light-text dark:text-dark-text">Vibe Check</h3>
            <div className="space-y-4">
              {vibeMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-light-textSoft dark:text-dark-textSoft">{metric.label}</span>
                    <span className="text-light-text dark:text-dark-text font-medium">{metric.value}%</span>
                  </div>
                  <div className="h-2 bg-light-border dark:bg-dark-border rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#A1DDE6] to-[#D9F99D]"
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Clubs Card */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-light-background dark:bg-dark-backgroundSecondary rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-4 text-light-text dark:text-dark-text">Clubs & Community</h3>
            <div className="flex flex-wrap gap-2">
              {popularClubs.map((club, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-[#FDF6E3] dark:bg-[#FDF6E3]/10 text-light-text dark:text-dark-text rounded-full text-sm"
                >
                  {club}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Locked Content Section */}
      <div className="relative max-w-6xl mx-auto px-4 py-12 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 filter blur-sm pointer-events-none">
          {/* Student Testimonials */}
          <div className="bg-light-background dark:bg-dark-backgroundSecondary rounded-xl shadow-lg p-6">
            <StarIcon className="text-[#FECACA] mb-4" />
            <h3 className="text-xl font-semibold mb-4 text-light-text dark:text-dark-text">Student Testimonials</h3>
            <div className="space-y-4">
              {/* Placeholder content */}
              <div className="h-20 bg-light-border dark:bg-dark-border rounded animate-pulse" />
              <div className="h-20 bg-light-border dark:bg-dark-border rounded animate-pulse" />
            </div>
          </div>

          {/* Cost of Living */}
          <div className="bg-light-background dark:bg-dark-backgroundSecondary rounded-xl shadow-lg p-6">
            <SchoolIcon className="text-[#D9F99D] mb-4" />
            <h3 className="text-xl font-semibold mb-4 text-light-text dark:text-dark-text">Cost of Living</h3>
            <div className="space-y-4">
              {/* Placeholder content */}
              <div className="h-20 bg-light-border dark:bg-dark-border rounded animate-pulse" />
              <div className="h-20 bg-light-border dark:bg-dark-border rounded animate-pulse" />
            </div>
          </div>

          {/* Events & Nightlife */}
          <div className="bg-light-background dark:bg-dark-backgroundSecondary rounded-xl shadow-lg p-6">
            <NightlifeIcon className="text-[#A1DDE6] mb-4" />
            <h3 className="text-xl font-semibold mb-4 text-light-text dark:text-dark-text">Events & Nightlife</h3>
            <div className="space-y-4">
              {/* Placeholder content */}
              <div className="h-20 bg-light-border dark:bg-dark-border rounded animate-pulse" />
              <div className="h-20 bg-light-border dark:bg-dark-border rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Overlay Card */}
        <div className="absolute inset-0 flex items-center justify-center bg-light-background/50 dark:bg-dark-background/50 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-light-background dark:bg-dark-backgroundSecondary rounded-xl shadow-xl p-8 text-center max-w-lg mx-4"
          >
            <div className="w-12 h-12 bg-[#A1DDE6]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <LockIcon className="text-[#A1DDE6]" />
            </div>
            <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">
              Unlock full campus life insights
            </h3>
            <p className="text-light-textSoft dark:text-dark-textSoft mb-6">
              Join thousands of students discovering their next campus.
            </p>
            <button
              onClick={() => navigate('/pricing')}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#A1DDE6] to-[#D9F99D] text-gray-800 rounded-xl font-semibold hover:opacity-90 transition-all transform hover:scale-105"
            >
              Create Free Account
            </button>
          </motion.div>
        </div>
      </div>

      {/* Sticky Sign-Up Banner */}
      {!isAuthenticated && (
        <div className="fixed bottom-0 left-0 right-0 bg-light-background dark:bg-dark-backgroundSecondary border-t border-light-border dark:border-dark-border shadow-lg p-4 z-50">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4">
            <div className="flex items-center gap-2 mb-4 sm:mb-0">
              <PeopleIcon className="text-[#A1DDE6]" />
              <p className="text-light-text dark:text-dark-text">
                Join <span className="font-semibold">2,000+</span> students discovering their next campus
              </p>
            </div>
            <button
              onClick={() => navigate('/pricing')}
              className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-[#A1DDE6] to-[#D9F99D] text-gray-800 rounded-full font-semibold hover:opacity-90 transition-all transform hover:scale-105"
            >
              Create Free Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampusLifePage; 