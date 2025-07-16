import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const RemainingSpots = () => {
  const [spotsRemaining, setSpotsRemaining] = useState(37);
  const [isDecreasing, setIsDecreasing] = useState(false);

  useEffect(() => {
    // Decrease spots every 20-30 seconds
    const interval = setInterval(() => {
      if (spotsRemaining > 1) {
        setIsDecreasing(true);
        setTimeout(() => {
          setSpotsRemaining(prev => Math.max(1, prev - 1));
          setIsDecreasing(false);
        }, 500); // Animation duration
      }
    }, 20000 + Math.random() * 10000); // Random interval between 20-30 seconds

    return () => clearInterval(interval);
  }, [spotsRemaining]);

  return (
    <motion.div 
      className="bg-[#1a2234]/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-[#71ADBA]/20"
      animate={{
        scale: isDecreasing ? [1, 0.95, 1] : 1,
        transition: { duration: 0.5 }
      }}
    >
      <p className="text-white font-medium">
        🔥 Only{' '}
        <motion.span
          key={spotsRemaining}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-bold"
        >
          {spotsRemaining}
        </motion.span>
        {' '}spots remaining today!
      </p>
    </motion.div>
  );
};

export default RemainingSpots; 