import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { faUser, faGraduationCap, faBriefcase, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Toast {
  id: number;
  message: string;
  icon: JSX.Element;
}

const messages = [
  { text: "Alex switched majors and landed a 150k offer", icon: <FontAwesomeIcon icon={faGraduationCap} /> },
  { text: "Sarah found her dream internship", icon: <FontAwesomeIcon icon={faBriefcase} /> },
  { text: "Mike discovered his career path", icon: <FontAwesomeIcon icon={faLightbulb} /> },
  { text: "Emma matched with a mentor", icon: <FontAwesomeIcon icon={faUser} /> },
  { text: "James improved his resume score", icon: <FontAwesomeIcon icon={faBriefcase} /> },
  { text: "Lisa got interview-ready", icon: <FontAwesomeIcon icon={faLightbulb} /> },
  { text: "Maya got into her dream company today!", icon: <FontAwesomeIcon icon={faBriefcase} /> },
  { text: "Anna found her perfect major", icon: <FontAwesomeIcon icon={faGraduationCap} /> },
  { text: "Tom secured a tech interview", icon: <FontAwesomeIcon icon={faBriefcase} /> },
  { text: "Rachel got career clarity", icon: <FontAwesomeIcon icon={faLightbulb} /> }
];

const generateToast = (id: number): Toast => {
  const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  return {
    id,
    message: randomMessage.text,
    icon: randomMessage.icon
  };
};

const UserActivityToast = () => {
  const [toast, setToast] = useState<Toast | null>(null);
  const [nextId, setNextId] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  // Add scroll fade functionality
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      setToast(generateToast(nextId));
      setNextId(prev => prev + 1);
    }, 3000);

    const interval = setInterval(() => {
      setToast(generateToast(nextId));
      setNextId(prev => prev + 1);
    }, 7000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, [nextId]);

  const getPosition = () => {
    const baseLeft = Math.max(viewportWidth * 0.05, 20);
    const baseBottom = Math.max(window.innerHeight * 0.1, 40);
    
    return {
      left: baseLeft,
      bottom: baseBottom
    };
  };

  const position = getPosition();

  return (
    <motion.div 
      className="fixed z-50"
      style={{
        left: position.left,
        bottom: position.bottom,
        opacity
      }}
    >
      <AnimatePresence mode="wait">
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, x: -50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 40,
              mass: 1
            }}
            className="bg-[#1a2234]/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-[#71ADBA]/20 shadow-lg flex items-center gap-3 text-sm text-gray-300 max-w-xs sm:max-w-sm"
          >
            <span className="text-[#EDEAB1] text-base">
              {toast.icon}
            </span>
            <span className="whitespace-normal">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserActivityToast; 