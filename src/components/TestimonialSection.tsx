import { motion } from 'framer-motion';
import { useState } from 'react';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Alex, 22",
      role: "Software Engineer @ Google",
      image: "/company-logos/google.svg",
      content: "No CS degree? Same! Used Pathly to break into tech. Now making 6 figures at Google! 🚀",
      tag: "Career Changer",
      icon: WorkIcon,
      stats: "150k+ first job",
    },
    {
      name: "Sarah, 19",
      role: "CS Major @ Stanford",
      image: "/company-logos/tesla.svg",
      content: "Was stuck between 5 majors 😩 Pathly helped me choose CS. Now interning at Tesla! ⚡",
      tag: "College Student",
      icon: SchoolIcon,
      stats: "Dream internship",
    },
    {
      name: "Mike, 20",
      role: "Startup Founder",
      image: "/company-logos/meta.svg",
      content: "From confused about college to launching my own startup! Pathly showed me the entrepreneurship path 💡",
      tag: "Entrepreneur",
      icon: TrendingUpIcon,
      stats: "Raised $1M",
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
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-all"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 backdrop-blur-lg hover:bg-white/20 transition-all"
        >
          →
        </button>

        {/* Testimonial Cards */}
        <div className="relative h-[500px]">
          {testimonials.map((testimonial, idx) => {
            const Icon = testimonial.icon;
            return (
              <motion.div
                key={idx}
                initial={false}
                animate={{
                  scale: idx === activeIndex ? 1 : 0.8,
                  opacity: idx === activeIndex ? 1 : 0,
                  x: `${(idx - activeIndex) * 100}%`,
                  zIndex: idx === activeIndex ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 w-full"
              >
                <div className="glass-panel p-8 relative group">
                  {/* Viral Tag */}
                  <div className="absolute -top-3 left-6 bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-1 rounded-full text-white text-sm font-medium">
                    {testimonial.tag} 🔥
                  </div>

                  {/* Content */}
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#71ADBA] to-[#EDEAB1] p-1 mb-6">
                      <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center">
                        <Icon className="w-10 h-10 text-[#EDEAB1]" />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-[#EDEAB1] mb-2">
                      {testimonial.name}
                    </h3>
                    <p className="text-lg text-[#71ADBA] mb-6">
                      {testimonial.role}
                    </p>

                    <div className="text-2xl mb-8 leading-relaxed">
                      {testimonial.content}
                    </div>

                    {/* Stats */}
                    <div className="glass-effect px-6 py-3 text-[#EDEAB1]">
                      🎯 {testimonial.stats}
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-full blur-3xl pointer-events-none"></div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? 'w-8 bg-[#EDEAB1]'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection; 