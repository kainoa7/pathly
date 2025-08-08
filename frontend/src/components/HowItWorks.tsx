import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';
import React from 'react';

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

const Card3D = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
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
    <div className="absolute left-1/2 top-0 h-full -translate-x-1/2 hidden lg:block z-20">
      <div className="h-full w-[4px] bg-gradient-to-b from-gray-700 to-gray-800 relative rounded-full">
        {/* Animated progress line */}
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] rounded-full"
          initial={{ height: "0%" }}
          animate={{ height: `${(activeStep + 1) * 25}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        
        {/* Flowing particles along the line */}
        <motion.div
          className="absolute left-1/2 w-2 h-2 bg-white/60 rounded-full -translate-x-1/2"
          animate={{
            top: [`0%`, `${(activeStep + 1) * 25}%`],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {[0, 1, 2, 3].map((step) => (
          <motion.div
            key={step}
            className="absolute -left-[10px] flex items-center justify-center"
            style={{ top: `${step * 25}%` }}
          >
            {/* Outer glow ring */}
            <motion.div
              className={`absolute w-8 h-8 rounded-full transition-all duration-500 ${
                step <= activeStep 
                  ? 'bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20' 
                  : 'bg-gray-600/20'
              }`}
              animate={{
                scale: step === activeStep ? [1, 1.3, 1] : 1,
                opacity: step === activeStep ? [0.5, 0.8, 0.5] : 0.3,
              }}
              transition={{
                duration: 2,
                repeat: step === activeStep ? Infinity : 0,
                ease: "easeInOut",
              }}
            />
            
            {/* Main node */}
            <motion.div
              className={`relative w-6 h-6 rounded-full border-3 transition-all duration-300 ${
                step <= activeStep 
                  ? 'bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] border-white shadow-lg' 
                  : 'bg-gray-700 border-gray-500'
              }`}
              animate={{
                scale: step === activeStep ? 1.2 : 1,
                boxShadow: step === activeStep 
                  ? '0 0 20px rgba(113, 173, 186, 0.6)' 
                  : '0 0 0px rgba(113, 173, 186, 0)',
              }}
              whileHover={{ scale: 1.3 }}
            >
              {/* Inner pulse */}
              {step <= activeStep && (
                <motion.div
                  className="absolute inset-1 bg-white/30 rounded-full"
                  animate={{
                    scale: [0.5, 1, 0.5],
                    opacity: [0.8, 0.3, 0.8],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.div>
          </motion.div>
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
      title: "Share Your Dreams",
      description: "Tell us what you want in 2 minutes. We'll handle everything else.",
      color: "from-[#9C71BA] to-[#BA71AD]",
      bgGlow: "group-hover:shadow-[0_0_30px_-5px_rgba(156,113,186,0.3)]"
    },
    {
      icon: CustomIcons.Brain,
      title: "AI Works Its Magic",
      description: "Get your perfect career match faster than others can even apply.",
      color: "from-[#71ADBA] to-[#71BAB4]",
      bgGlow: "group-hover:shadow-[0_0_30px_-5px_rgba(113,173,186,0.3)]"
    },
    {
      icon: CustomIcons.Map,
      title: "Follow Your Roadmap", 
      description: "Step-by-step plan to beat every other candidate to the job.",
      color: "from-[#71BA8E] to-[#8EBA71]",
      bgGlow: "group-hover:shadow-[0_0_30px_-5px_rgba(113,186,142,0.3)]"
    },
    {
      icon: CustomIcons.Trophy,
      title: "Get Hired Fast",
      description: "Land offers in weeks. Start your dream job Monday.",
      color: "from-[#BAA971] to-[#BA9171]",
      bgGlow: "group-hover:shadow-[0_0_30px_-5px_rgba(186,169,113,0.3)]"
    }
  ];

  return (
    <section className="relative py-20">
      {/* Subtle overlay for section depth without harsh breaks */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent pointer-events-none" />
      
      {/* Minimal animated background orbs that blend with global background */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-[#71ADBA]/8 to-[#9C71BA]/8 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-[#9C71BA]/8 to-[#71ADBA]/8 rounded-full blur-3xl"
        animate={{
          scale: [1.1, 1, 1.1],
          x: [0, -25, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-4 h-4 bg-[#71ADBA]/20 rotate-45"
        animate={{
          rotate: [45, 405, 45],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-[#9C71BA]/20 rounded-full"
        animate={{
          y: [0, -40, 0],
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        className="max-w-7xl mx-auto relative z-10 py-16 px-4"
      >
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative inline-block"
          >
            {/* Multiple animated background layers */}
            <motion.span
              className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] opacity-20 blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.span
              className="absolute -inset-2 rounded-xl bg-gradient-to-r from-[#9C71BA] via-[#71ADBA] to-[#9C71BA] opacity-30 blur-xl"
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [360, 0, 360],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            
            <h2 className="relative text-5xl md:text-6xl lg:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] py-4">
              How it works
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-6"
          >
                                    <p className="text-2xl md:text-3xl font-bold text-white mb-2">
                          From confused to hired in 4 steps
                        </p>
            <div className="flex justify-center items-center gap-2 mt-4">
              <div className="w-12 h-1 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-[#9C71BA] rounded-full animate-bounce"></div>
              <div className="w-12 h-1 bg-gradient-to-r from-[#9C71BA] to-[#71ADBA] rounded-full animate-pulse"></div>
            </div>
          </motion.div>
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
                  <div className={`relative p-8 h-full min-h-[380px] rounded-2xl transition-all duration-500 transform-gpu ${step.bgGlow} hover:-translate-y-4 hover:scale-105 flex flex-col overflow-hidden`}>
                    {/* Dynamic background with multiple layers */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-lg"></div>
                    
                    {/* Animated border gradient */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-60 group-hover:opacity-100 transition-all duration-500"
                      style={{
                        background: `linear-gradient(45deg, ${step.color.replace('from-', '').replace('to-', '').split(' ')[0]}, transparent, ${step.color.replace('from-', '').replace('to-', '').split(' ')[1] || step.color.replace('from-', '').replace('to-', '').split(' ')[0]})`,
                        backgroundSize: '400% 400%',
                      }}
                      animate={{
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    
                    {/* Inner border */}
                    <div className="absolute inset-[2px] bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 rounded-[14px] backdrop-blur-lg"></div>
                    
                    {/* Floating particles effect */}
                    <motion.div
                      className="absolute top-4 right-4 w-2 h-2 bg-white/20 rounded-full"
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.2, 0.8, 0.2],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    />
                    <motion.div
                      className="absolute bottom-6 left-6 w-1 h-1 bg-white/30 rounded-full"
                      animate={{
                        x: [0, 15, 0],
                        opacity: [0.3, 0.9, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />
                    
                    <div className="relative flex-1 flex flex-col justify-between z-10">
                      <div className="flex-1 flex flex-col items-center text-center">
                        {/* Enhanced icon with multiple animation layers */}
                        <motion.div
                          className="relative mb-8"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {/* Icon glow effect */}
                          <motion.div
                            className={`absolute inset-0 w-20 h-20 rounded-full bg-gradient-to-r ${step.color} opacity-30 blur-xl`}
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          />
                          
                          {/* Main icon container */}
                          <motion.div
                            className={`relative w-20 h-20 rounded-full bg-gradient-to-r ${step.color} p-4 transform-gpu transition-all duration-300 group-hover:rotate-12 shadow-2xl`}
                            whileHover={{ rotate: 12, scale: 1.1 }}
                          >
                            <Icon />
                          </motion.div>

                          {/* Step number overlay */}
                          <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-gray-900 rounded-full flex items-center justify-center text-sm font-black shadow-lg">
                            {index + 1}
                          </div>
                        </motion.div>

                        {/* Enhanced title with gradient */}
                        <motion.h3
                          className={`text-2xl md:text-3xl font-black mb-4 bg-gradient-to-r ${step.color} bg-clip-text text-transparent transform-gpu transition-transform duration-300 group-hover:scale-110`}
                        >
                          {step.title}
                        </motion.h3>

                        {/* Enhanced description with better typography */}
                        <motion.p 
                          className="text-lg text-gray-300 leading-relaxed font-medium transform-gpu transition-all duration-300 group-hover:text-white group-hover:scale-105"
                          initial={{ opacity: 0.8 }}
                          whileHover={{ opacity: 1 }}
                        >
                          {step.description}
                        </motion.p>
                      </div>

                      {/* Progress indicator at bottom */}
                      <motion.div
                        className="mt-8 flex justify-center"
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ delay: index * 0.2, duration: 0.8 }}
                      >
                        <div className={`h-1 bg-gradient-to-r ${step.color} rounded-full w-16 group-hover:w-24 transition-all duration-300`}></div>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Card3D>
            );
          })}
        </div>
        
        {/* How It Works CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.button
            onClick={() => window.location.href = '/quiz'}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-10 py-5 text-xl font-bold text-white rounded-2xl bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] hover:from-[#5a9ba8] hover:to-[#8a5fa8] transform hover:shadow-2xl hover:shadow-[#71ADBA]/30 transition-all duration-500"
          >
            <span className="relative z-10">Get My Career Match</span>
            
            {/* Button glow effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#5a9ba8] to-[#8a5fa8] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HowItWorks; 