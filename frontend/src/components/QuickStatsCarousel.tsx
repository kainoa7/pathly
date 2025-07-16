import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { useMediaQuery } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface Stat {
  value: string;
  description: string;
  icon: string;
  gradient: string;
  highlight?: string;
}

const stats: Stat[] = [
  {
    value: "3x",
    description: "faster career moves than others",
    icon: "🚀",
    gradient: "from-[#71ADBA] to-[#9C71BA]",
    highlight: "Join 3,000+ successful career changers"
  },
  {
    value: "70%",
    description: "higher salary after 6 months",
    icon: "💰",
    gradient: "from-[#9C71BA] to-[#BA71AD]",
    highlight: "Average $12k+ salary increase"
  },
  {
    value: "92%",
    description: "found their dream role",
    icon: "⭐",
    gradient: "from-[#BA71AD] to-[#EDEAB1]",
    highlight: "Discover your perfect career match"
  }
];

const QuickStatsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const controls = useAnimation();

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % stats.length);
    controls.start({ opacity: [0, 1], x: [50, 0] });
  }, [controls]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + stats.length) % stats.length);
    controls.start({ opacity: [0, 1], x: [-50, 0] });
  }, [controls]);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(timer);
  }, [handleNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setTouchStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setTouchEnd(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;
    
    const swipeDistance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto group">
      <div 
        className="relative bg-navy-800/50 backdrop-blur-md rounded-2xl p-8 h-[360px] border border-white/10"
        style={{
          boxShadow: '0 0 40px rgba(113, 173, 186, 0.1)'
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="flex flex-col items-center justify-center h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="text-8xl mb-6"
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {stats[currentIndex].icon}
            </motion.div>
            
            <motion.div 
              className={`text-7xl font-bold bg-gradient-to-r ${stats[currentIndex].gradient} bg-clip-text text-transparent mb-4`}
            >
              {stats[currentIndex].value}
            </motion.div>
            
            <motion.div className="text-xl text-gray-300 text-center mb-6">
              {stats[currentIndex].description}
            </motion.div>
            
            {stats[currentIndex].highlight && (
              <motion.div 
                className="text-sm text-gray-400 bg-white/5 px-4 py-2 rounded-full"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {stats[currentIndex].highlight}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows - Only show on desktop */}
        {!isMobile && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 opacity-0 group-hover:opacity-100"
              aria-label="Previous stat"
            >
              <ChevronLeftIcon className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 opacity-0 group-hover:opacity-100"
              aria-label="Next stat"
            >
              <ChevronRightIcon className="w-6 h-6 text-white" />
            </button>
          </>
        )}

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {stats.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white w-4' 
                  : 'bg-white/30'
              }`}
              aria-label={`Go to stat ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickStatsCarousel; 