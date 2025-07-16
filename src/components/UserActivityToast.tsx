import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Realistic university names
const universities = [
  'UC Berkeley', 'Stanford', 'MIT', 'Georgia Tech', 'UCLA', 'NYU',
  'University of Michigan', 'UT Austin', 'University of Washington', 'Purdue',
  'Carnegie Mellon', 'USC', 'UIUC', 'UPenn', 'Columbia'
];

// Realistic locations
const locations = [
  'San Francisco', 'New York', 'Seattle', 'Austin', 'Boston', 'Los Angeles',
  'Chicago', 'Denver', 'Portland', 'Atlanta', 'Miami', 'Toronto', 'Vancouver',
  'London', 'Berlin', 'Singapore'
];

// Career paths and activities
const activities = [
  {
    type: 'join',
    templates: [
      'name from location started their career journey 🎉',
      'name from university joined Pathly 🚀',
      'name is exploring tech careers 💫',
      'name started building their roadmap 🗺️'
    ]
  },
  {
    type: 'quiz',
    templates: [
      'name discovered their perfect tech role 🎯',
      'name completed the career quiz 🌟',
      'name found their ideal career match ✨',
      'name is exploring name as a career path 🔍'
    ]
  },
  {
    type: 'learning',
    templates: [
      'name started the beginner coding track 💻',
      'name began interview prep journey 📚',
      'name unlocked the resume builder 📝',
      'name started the career transition guide 🎓',
      'name exploring resources for university students 🎨'
    ]
  },
  {
    type: 'milestone',
    templates: [
      'name got their first technical interview! 🎊',
      'name scheduled a mock interview 🤝',
      'name completed their career roadmap 🎯',
      'name started networking in tech 🌐',
      'name joined the mentorship program 🌱'
    ]
  }
];

// Career paths to randomly insert into messages
const careerPaths = [
  'Software Development',
  'Product Management',
  'Data Analytics',
  'UX Design',
  'Cloud Engineering',
  'Cybersecurity',
  'Web Development',
  'Mobile Development',
  'DevOps',
  'Technical Writing'
];

// Top tech companies
const companies = [
  'Google', 'Microsoft', 'Apple', 'Amazon', 'Meta',
  'Netflix', 'Uber', 'Airbnb', 'Stripe', 'Snowflake',
  'LinkedIn', 'Twitter', 'Salesforce', 'Adobe', 'Spotify'
];

// Common names from diverse backgrounds
const names = [
  'Alex', 'Maya', 'Raj', 'Sofia', 'Chen', 'Jordan', 'Aisha', 'Carlos',
  'Emma', 'James', 'Priya', 'Lucas', 'Nina', 'Omar', 'Sarah', 'David',
  'Zara', 'Miguel', 'Lily', 'Wei', 'Hassan', 'Isabella', 'Jamal', 'Anna',
  'Yuki', 'Andre', 'Fatima', 'Diego', 'Ava', 'Kai'
];

interface Toast {
  id: string;
  message: string;
}

const generateToastMessage = () => {
  const name = names[Math.floor(Math.random() * names.length)];
  const location = locations[Math.floor(Math.random() * locations.length)];
  const university = universities[Math.floor(Math.random() * universities.length)];
  const careerPath = careerPaths[Math.floor(Math.random() * careerPaths.length)];
  
  // Pick a random activity type
  const activityType = activities[Math.floor(Math.random() * activities.length)];
  let template = activityType.templates[Math.floor(Math.random() * activityType.templates.length)];
  
  // Replace placeholders with actual values
  template = template
    .replace('name', name)
    .replace('location', location)
    .replace('university', university)
    .replace(/\bname\b(?!.*\bname\b)/, careerPath); // Replace last instance of 'name' with career path
    
  return template;
};

const UserActivityToast = () => {
  const [currentToast, setCurrentToast] = useState<Toast | null>(null);

  useEffect(() => {
    const showNewToast = () => {
      const newToast = {
        id: Math.random().toString(),
        message: generateToastMessage()
      };
      setCurrentToast(newToast);

      // Clear toast after 4-5 seconds
      const clearDelay = 4000 + Math.random() * 1000;
      setTimeout(() => {
        setCurrentToast(null);
      }, clearDelay);
    };

    // Show first toast after a short delay
    const initialDelay = 2000;
    const initialTimer = setTimeout(showNewToast, initialDelay);

    // Set up interval for subsequent toasts (12-20 seconds)
    const interval = setInterval(() => {
      const delay = 12000 + Math.random() * 8000; // Random delay between 12-20 seconds
      setTimeout(showNewToast, delay);
    }, 20000); // Maximum delay to ensure we don't stack timeouts

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <AnimatePresence>
        {currentToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="bg-[#1a2234]/80 backdrop-blur-sm border border-[#71ADBA]/20 px-6 py-3 rounded-2xl shadow-lg"
          >
            <p className="text-white text-sm font-medium">{currentToast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserActivityToast; 