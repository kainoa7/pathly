import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';

// Custom SVG icons that match our design aesthetic
const CustomIcons = {
  Rocket: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 2C9 2 6 5 6 8.5c0 1.5.5 2.5 1.5 3.5L4 15.5V22h6.5l3.5-3.5c1 1 2 1.5 3.5 1.5 3.5 0 6.5-3 6.5-6.5C24 7 17 2 12.5 2z" 
        fill="currentColor" fillOpacity="0.9"/>
      <circle cx="17" cy="7" r="2" fill="white" fillOpacity="0.5"/>
    </svg>
  ),
  Brain: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3C7.5 3 4 6.5 4 11c0 2.5 1 4.5 2.5 6L4 22h16l-2.5-5c1.5-1.5 2.5-3.5 2.5-6 0-4.5-3.5-8-8-8z" 
        fill="currentColor" fillOpacity="0.9"/>
      <path d="M12 16a5 5 0 100-10 5 5 0 000 10z" fill="white" fillOpacity="0.5"/>
    </svg>
  ),
  Map: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" 
        fill="currentColor" fillOpacity="0.9"/>
      <path d="M15 7L9 5v14l6 2V7z" fill="white" fillOpacity="0.5"/>
    </svg>
  ),
  Trophy: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2z" 
        fill="currentColor" fillOpacity="0.9"/>
      <path d="M15 9l-3-3-3 3h2v4h2V9h2z" fill="white" fillOpacity="0.5"/>
    </svg>
  )
};

const Card3D = ({ children, className = "" }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 100);
    y.set(yPct * 100);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
};

const ProgressPath = ({ activeStep }: { activeStep: number }) => {
  return (
    <div className="absolute left-1/2 top-0 h-full -translate-x-1/2 hidden lg:block">
      <div className="h-full w-[2px] bg-[#1a2234] relative">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1]"
          initial={{ height: "0%" }}
          animate={{ height: `${(activeStep + 1) * 25}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        {[0, 1, 2, 3].map((step) => (
          <motion.div
            key={step}
            className={`absolute w-4 h-4 -left-[7px] rounded-full bg-[#1a2234] border-2 transition-colors duration-300 ${
              step <= activeStep ? 'border-[#71ADBA]' : 'border-[#71ADBA]/30'
            }`}
            style={{ top: `${step * 25}%` }}
            animate={{
              scale: step === activeStep ? 1.2 : 1,
              borderWidth: step === activeStep ? 3 : 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(-1);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  const steps = [
    {
      icon: CustomIcons.Rocket,
      title: "Take the vibe check ✨",
      description: "Quick quiz to understand your interests, skills, and goals - no pressure!",
      color: "from-[#9C71BA] to-[#BA71AD]",
      bgGlow: "group-hover:shadow-[0_0_30px_-5px_rgba(156,113,186,0.3)]"
    },
    {
      icon: CustomIcons.Brain,
      title: "Get matched fr fr 🎯",
      description: "We match you with careers that fit your unique personality and goals",
      color: "from-[#71ADBA] to-[#71BAB4]",
      bgGlow: "group-hover:shadow-[0_0_30px_-5px_rgba(113,173,186,0.3)]"
    },
    {
      icon: CustomIcons.Map,
      title: "See your roadmap 🗺️",
      description: "Get a personalized path to your dream career - we'll show you the way!",
      color: "from-[#71BA8E] to-[#8EBA71]",
      bgGlow: "group-hover:shadow-[0_0_30px_-5px_rgba(113,186,142,0.3)]"
    },
    {
      icon: CustomIcons.Trophy,
      title: "Level up your future 🚀",
      description: "Access resources, tips, and strategies to make it happen",
      color: "from-[#BAA971] to-[#BA9171]",
      bgGlow: "group-hover:shadow-[0_0_30px_-5px_rgba(186,169,113,0.3)]"
    }
  ];

  return (
    <section className="relative overflow-hidden">
      {/* Subtle section transition gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(113,173,186,0.03)] to-transparent pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        className="max-w-6xl mx-auto relative z-10 py-16 px-4"
      >
        <div className="text-center mb-16">
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
            <h2 className="relative text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#71ADBA] to-[#EDEAB1]">
              How it works
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-[#71ADBA] mt-4"
          >
            Four simple steps to your dream career - no cap! <span className="text-[#EDEAB1]">💯</span>
          </motion.p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          <ProgressPath activeStep={activeStep} />
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card3D
                key={index}
                className="group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(-1)}
                >
                  <div className={`glass-panel p-8 relative z-10 h-full rounded-xl transition-all duration-300 transform-gpu ${step.bgGlow} hover:-translate-y-2 backdrop-blur-sm bg-[rgba(26,34,52,0.4)] border border-[rgba(113,173,186,0.1)]`}>
                    {/* Animated gradient border */}
                    <motion.div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{
                        background: `linear-gradient(to right, transparent, rgba(113, 173, 186, 0.1), transparent)`,
                        backgroundSize: '200% 100%',
                      }}
                      animate={{
                        backgroundPosition: ['100% 0%', '-100% 0%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    
                    <div className="relative">
                      <motion.div
                        className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} p-3 mx-auto mb-6 transform-gpu transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}
                        whileHover={{ scale: 1.2, rotate: 12 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Icon />
                      </motion.div>

                      <motion.h3
                        className="text-xl font-bold text-[#EDEAB1] mb-4 transform-gpu transition-transform duration-300 group-hover:scale-105"
                      >
                        {step.title}
                      </motion.h3>

                      <p className="text-gray-300 transform-gpu transition-all duration-300 group-hover:text-gray-200">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Card3D>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default HowItWorks; 