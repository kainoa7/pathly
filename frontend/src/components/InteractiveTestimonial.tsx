import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface Reaction {
  emoji: string;
  label: string;
  count: number;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  reactions: Reaction[];
}

const testimonials: Testimonial[] = [
  {
    name: "Alex",
    role: "Software Engineer @ Google",
          content: "No CS degree? Same! Used Kaiyl to break into tech. Now making 6 figures at Google! 🚀",
    reactions: [
      { emoji: "🔥", label: "fire", count: 423 },
      { emoji: "💯", label: "100", count: 289 },
      { emoji: "🙌", label: "raised hands", count: 156 }
    ]
  },
  {
    name: "Sarah",
    role: "CS Major @ Stanford",
          content: "Was stuck between 5 majors 😩 Kaiyl helped me choose CS. Now interning at Tesla! ⚡",
    reactions: [
      { emoji: "⚡", label: "lightning", count: 345 },
      { emoji: "🎯", label: "bullseye", count: 234 },
      { emoji: "👏", label: "clap", count: 178 }
    ]
  },
  {
    name: "Mike",
    role: "Startup Founder",
          content: "From confused about college to launching my own startup! Kaiyl showed me the entrepreneurship path 💡",
    reactions: [
      { emoji: "🚀", label: "rocket", count: 512 },
      { emoji: "💪", label: "muscle", count: 367 },
      { emoji: "🌟", label: "star", count: 245 }
    ]
  }
];

const InteractiveTestimonial = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [userReactions, setUserReactions] = useState<{ [key: string]: boolean }>({});
  const [isAnimating, setIsAnimating] = useState(false);

  const handleReaction = (label: string) => {
    if (isAnimating) return;

    setIsAnimating(true);
    setUserReactions(prev => ({
      ...prev,
      [`${activeIndex}-${label}`]: !prev[`${activeIndex}-${label}`]
    }));

    setTimeout(() => setIsAnimating(false), 300);
  };

  const getReactionCount = (reaction: Reaction) => {
    const key = `${activeIndex}-${reaction.label}`;
    return reaction.count + (userReactions[key] ? 1 : 0);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Title Section */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative inline-block"
        >
          <motion.span
            className="absolute -inset-1 rounded-lg bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] opacity-75 blur-lg"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <h2 className="relative text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#71ADBA] to-[#EDEAB1] mb-4">
            Success Stories
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-[#71ADBA]"
        >
          See how others found their path 🚀
        </motion.p>
      </div>

      {/* Testimonial Card with Navigation */}
      <div className="relative px-8">
        {/* Previous Button */}
        <motion.button
          onClick={handlePrev}
          className="absolute left-0 top-[40%] -translate-y-1/2 w-8 h-8 rounded-full bg-[#1a1f36]/60 backdrop-blur-sm border border-[#71ADBA]/10 flex items-center justify-center text-[#71ADBA]/80 hover:text-[#EDEAB1] hover:border-[#71ADBA]/30 transition-all z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeftIcon sx={{ fontSize: 20 }} />
        </motion.button>

        {/* Next Button */}
        <motion.button
          onClick={handleNext}
          className="absolute right-0 top-[40%] -translate-y-1/2 w-8 h-8 rounded-full bg-[#1a1f36]/60 backdrop-blur-sm border border-[#71ADBA]/10 flex items-center justify-center text-[#71ADBA]/80 hover:text-[#EDEAB1] hover:border-[#71ADBA]/30 transition-all z-10"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRightIcon sx={{ fontSize: 20 }} />
        </motion.button>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-[#1a1f36]/40 backdrop-blur-sm rounded-2xl border border-[#71ADBA]/20 p-8"
          >
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <motion.h3
                  className="text-xl font-semibold text-[#EDEAB1] mb-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {testimonials[activeIndex].name}
                </motion.h3>
                <motion.p
                  className="text-gray-400 text-sm mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.1 } }}
                >
                  {testimonials[activeIndex].role}
                </motion.p>
                <motion.p
                  className="text-gray-300 text-lg mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.2 } }}
                >
                  {testimonials[activeIndex].content}
                </motion.p>
                
                {/* Reactions */}
                <div className="flex gap-3">
                  {testimonials[activeIndex].reactions.map((reaction) => {
                    const isReacted = userReactions[`${activeIndex}-${reaction.label}`];
                    return (
                      <motion.button
                        key={reaction.label}
                        onClick={() => handleReaction(reaction.label)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                          isReacted
                            ? 'bg-[#71ADBA]/30 border-[#71ADBA]'
                            : 'bg-[#1a1f36]/40 border-[#71ADBA]/20'
                        } border`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-xl">{reaction.emoji}</span>
                        <span className="text-gray-300 font-medium">
                          {getReactionCount(reaction).toLocaleString()}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeIndex
                  ? 'bg-[#71ADBA] w-6'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveTestimonial; 