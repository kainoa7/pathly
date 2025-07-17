import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import QuizIcon from '@mui/icons-material/Quiz';
import InsightsIcon from '@mui/icons-material/Insights';
import RouteIcon from '@mui/icons-material/Route';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';

const HowItWorksPage = () => {
  const navigate = useNavigate();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const steps = [
    {
      icon: QuizIcon,
      title: "Take Our Smart Career Quiz",
      description: "Answer 20 personalized questions to uncover your ideal majors and careers.",
      delay: 0.2
    },
    {
      icon: InsightsIcon,
      title: "See Your Results Instantly",
      description: "Get top 3 major matches, salary insights, and job outlook — powered by real data.",
      delay: 0.4
    },
    {
      icon: RouteIcon,
      title: "Explore Real Career Paths",
      description: "Visualize where each path leads and what it takes to get there.",
      delay: 0.6
    },
    {
      icon: NotificationsActiveIcon,
      title: "Save Progress & Get Alerts",
      description: "Create an account to unlock saved results, alerts, and personalized content.",
      delay: 0.8
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      major: "Computer Science",
      quote: "The career quiz matched me perfectly with tech roles I never considered. Now I'm on track for my dream job! 🚀",
      rating: 5
    },
    {
      name: "James L.",
      major: "Business Analytics",
      quote: "Finally found clarity about my career path. The salary insights helped me make an informed decision. 💡",
      rating: 5
    },
    {
      name: "Emily K.",
      major: "Psychology",
      quote: "Love how the platform shows different career paths. It helped me choose between clinical and research roles! ✨",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A1020]">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] mb-6"
          >
            How K<span className="text-[#71ADBA]">ai</span>yl Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-[#71ADBA] max-w-2xl mx-auto"
          >
            From confusion to clarity in minutes
          </motion.p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: step.delay }}
                className="bg-[#1a2234] p-6 rounded-xl border border-[#71ADBA]/20 hover:shadow-lg hover:shadow-[#71ADBA]/10 transition-all"
              >
                <div className="w-12 h-12 flex items-center justify-center mb-4">
                  <step.icon className="w-8 h-8 text-[#71ADBA]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-[#71ADBA]">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            What Students Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-[#1a2234] p-6 rounded-xl border border-[#71ADBA]/20 hover:shadow-lg hover:shadow-[#71ADBA]/10 transition-all"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-[#EDEAB1]" />
                  ))}
                </div>
                <p className="text-[#71ADBA] mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-[#71ADBA] text-sm">{testimonial.major}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#1a2234] p-8 rounded-xl border border-[#71ADBA]/20"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Find Your Path?
            </h2>
            <motion.button
              onClick={() => navigate('/onboarding')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1] text-[#1a2234] font-semibold rounded-xl text-lg mb-4 hover:opacity-90 transition-opacity"
            >
              Start the Free Quiz
            </motion.button>
            <p className="text-[#71ADBA]">
              No sign-up required. Join 3,000+ already finding their path.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage; 