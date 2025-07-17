import { motion } from 'framer-motion';
import { useState } from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WorkIcon from '@mui/icons-material/Work';

interface Story {
  id: number;
  name: string;
  age: string;
  role: string;
  company: string;
  companyLogo: string;
  image: string;
  tag: string;
  story: string;
  achievement: string;
  verified: boolean;
}

const stories: Story[] = [
  {
    id: 1,
    name: "Alex Chen",
    age: "22",
    role: "Software Engineer",
    company: "Google",
    companyLogo: "/logos/google.svg",
    image: "/success-stories/alex.jpg",
    tag: "Career Changer 🔥",
          story: "No CS degree? Same! Used Kaiyl to break into tech. Now making 6 figures at Google! 🚀",
    achievement: "150k+ first job",
    verified: true
  },
  {
    id: 2,
    name: "Sarah Miller",
    age: "24",
    role: "Product Manager",
    company: "Microsoft",
    companyLogo: "/logos/microsoft.svg",
    image: "/success-stories/sarah.jpg",
    tag: "Major Switcher ⚡",
          story: "Switched from Biology to Tech PM. Kaiyl helped me find my true passion. Now leading product teams! 💪",
    achievement: "Doubled salary",
    verified: true
  },
  {
    id: 3,
    name: "James Wilson",
    age: "23",
    role: "Data Scientist",
    company: "Tesla",
    companyLogo: "/logos/tesla.svg",
    image: "/success-stories/james.jpg",
    tag: "Fast Tracker 🎯",
          story: "From confused about career to data scientist at Tesla in 6 months. Kaiyl's roadmap made it possible! 📈",
    achievement: "Dream company",
    verified: true
  }
];

const SuccessStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextStory = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#71ADBA]/5 via-transparent to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-[#EDEAB1]">
            Success Stories <span className="text-4xl">⭐</span>
          </h2>
          <p className="text-xl text-gray-300">
            Join thousands who found their path <span className="text-[#EDEAB1]">(and actually enjoy their career)</span>
          </p>
        </motion.div>

        {/* Stories Carousel */}
        <div className="relative">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="bg-[#1a1f36]/60 backdrop-blur-xl rounded-2xl border border-[#71ADBA]/20 p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Section */}
              <div className="flex-shrink-0 text-center md:text-left">
                <div className="relative inline-block">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#71ADBA]/30">
                    <img
                      src={stories[currentIndex].image}
                      alt={stories[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <img
                    src={stories[currentIndex].companyLogo}
                    alt={stories[currentIndex].company}
                    className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full p-2"
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1">
                {/* Tags Row */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="bg-[#ff69b4]/20 text-[#ff69b4] px-4 py-1.5 rounded-full text-sm font-medium">
                    {stories[currentIndex].tag}
                  </span>
                  {stories[currentIndex].verified && (
                    <span className="bg-[#71ADBA]/20 text-[#71ADBA] px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1">
                      <VerifiedIcon className="w-4 h-4" /> Verified
                    </span>
                  )}
                </div>

                {/* Profile Info */}
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {stories[currentIndex].name}, {stories[currentIndex].age}
                  </h3>
                  <p className="text-[#71ADBA] text-lg">
                    {stories[currentIndex].role} @ {stories[currentIndex].company}
                  </p>
                </div>

                {/* Story */}
                <p className="text-gray-300 text-lg mb-6">
                  {stories[currentIndex].story}
                </p>

                {/* Achievement Badge */}
                <div className="inline-block bg-[#1a1f36] rounded-full px-4 py-2 border border-[#71ADBA]/30">
                  <span className="text-[#71ADBA] text-sm">🎯 {stories[currentIndex].achievement}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <button
              onClick={prevStory}
              className="p-2 rounded-full bg-[#1a1f36]/60 border border-[#71ADBA]/20 text-[#71ADBA] 
                       hover:bg-[#1a1f36] transition-all duration-300"
            >
              <ArrowBackIcon />
            </button>
            <button
              onClick={nextStory}
              className="p-2 rounded-full bg-[#1a1f36]/60 border border-[#71ADBA]/20 text-[#71ADBA] 
                       hover:bg-[#1a1f36] transition-all duration-300"
            >
              <ArrowForwardIcon />
            </button>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center mt-4 gap-2">
            {stories.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-[#71ADBA]' : 'bg-[#71ADBA]/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories; 