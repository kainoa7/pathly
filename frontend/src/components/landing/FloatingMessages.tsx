import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FLOATING_MESSAGES, FLOATING_POSITIONS } from '../../data/landingPageData';

interface FloatingElement {
  text: string;
  icon: string;
  position: { top: string; left: string };
}

const FloatingMessages: React.FC = () => {
  const getRandomMessages = (): FloatingElement[] => {
    const elements: FloatingElement[] = [];
    const usedIndices = new Set<number>();
    
    FLOATING_POSITIONS.forEach((pos) => {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * FLOATING_MESSAGES.length);
      } while (usedIndices.has(randomIndex));
      
      usedIndices.add(randomIndex);
      elements.push({
        text: FLOATING_MESSAGES[randomIndex].text,
        icon: FLOATING_MESSAGES[randomIndex].icon,
        position: pos
      });
    });

    return elements;
  };

  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>(getRandomMessages());

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      setFloatingElements(getRandomMessages());
    }, 3000);

    const interval = setInterval(() => {
      setFloatingElements(getRandomMessages());
    }, 7000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {floatingElements.map((element, index) => (
        <motion.div
          key={`${element.text}-${index}`}
          className="absolute bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 backdrop-blur-sm px-4 py-2 rounded-full border border-[#71ADBA]/30 text-sm text-white hidden lg:block"
          style={{ top: element.position.top, left: element.position.left }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <span className="mr-2">{element.icon}</span>
          {element.text}
        </motion.div>
      ))}
    </>
  );
};

export default FloatingMessages; 