import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import VerifiedIcon from '@mui/icons-material/Verified';

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Alex, 22",
      role: "Software Engineer @ Google",
      content: "No CS degree? Same! Used Jarvus to break into tech. Now making 6 figures at Google! 🚀",
      tag: "Career Changer",
      stats: "150k+ first job"
    },
    {
      name: "Sarah, 19",
      role: "CS Major @ Stanford",
      content: "Was stuck between 5 majors 😩 Jarvus helped me choose CS. Now interning at Tesla! ⚡",
      tag: "College Student",
      stats: "Dream internship"
    },
    {
      name: "Mike, 20",
      role: "Startup Founder",
      content: "From confused about college to launching my own startup! Jarvus showed me the entrepreneurship path 💡",
      tag: "Entrepreneur",
      stats: "Raised $1M"
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 px-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold heading-gradient mb-6">
          Success Stories 🌟
        </h2>
        <p className="text-xl text-gray-400">
          Join thousands who found their path
          <span className="text-[#EDEAB1]"> (and actually enjoy their career)</span>
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto relative">
        {/* Navigation Buttons */}
        <motion.button
          onClick={handlePrev}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute left-[-3rem] top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur-lg 
                     hover:bg-white/20 transition-all hover:shadow-lg hover:shadow-[#71ADBA]/20"
        >
          ←
        </motion.button>
        <motion.button
          onClick={handleNext}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute right-[-3rem] top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur-lg 
                     hover:bg-white/20 transition-all hover:shadow-lg hover:shadow-[#71ADBA]/20"
        >
          →
        </motion.button>

        {/* Testimonial Cards */}
        <div className="relative h-[400px]">
          <AnimatePresence mode="sync">
            {testimonials.map((testimonial, idx) => {
              const isActive = idx === activeIndex;
              
              return (
                <motion.div
                  key={idx}
                  initial={false}
                  animate={{
                    scale: isActive ? 1 : 0.8,
                    opacity: isActive ? 1 : 0,
                    x: `${(idx - activeIndex) * 100}%`,
                    zIndex: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-0 left-0 w-full"
                >
                  <div className="glass-panel p-8 relative group">
                    {/* Viral Tag */}
                    <div className="absolute -top-3 left-6 bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-1 rounded-full text-white text-sm font-medium">
                      {testimonial.tag} 🔥
                    </div>

                    {/* Verified Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="absolute -top-3 right-6 bg-[#71ADBA] px-3 py-1 rounded-full text-white text-sm font-medium
                               flex items-center gap-1"
                    >
                      <VerifiedIcon className="w-4 h-4" />
                      Verified
                    </motion.div>

                    {/* Content */}
                    <div className="flex flex-col items-center text-center pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-2xl font-bold text-[#EDEAB1]">
                          {testimonial.name}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-8">
                        <p className="text-lg text-[#71ADBA]">
                          {testimonial.role}
                        </p>
                      </div>

                      <div className="text-2xl mb-8 leading-relaxed">
                        {testimonial.content}
                      </div>

                      {/* Stats with enhanced design */}
                      <motion.div 
                        className="glass-effect px-6 py-3 text-[#EDEAB1] relative overflow-hidden group"
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-[#71ADBA]/10 via-[#EDEAB1]/10 to-[#71ADBA]/10"
                          animate={{
                            x: ["0%", "100%"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        <span className="relative">🎯 {testimonial.stats}</span>
                      </motion.div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-full blur-3xl pointer-events-none"></div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Enhanced Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? 'w-8 bg-gradient-to-r from-[#71ADBA] to-[#EDEAB1]'
                  : 'w-2 bg-white/30 hover:bg-white/50'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection; 