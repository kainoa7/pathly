import { motion } from 'framer-motion';

const steps = [
  {
    icon: "🎯",
    title: "Take Our Smart Quiz",
    description: "Answer questions about your interests, skills, and goals to help us understand you better."
  },
  {
    icon: "🔍",
    title: "Explore Majors",
    description: "Get personalized major recommendations based on your unique profile and preferences."
  },
  {
    icon: "🎓",
    title: "Career Insights",
    description: "Learn about potential career paths, job prospects, and salary expectations for each major."
  },
  {
    icon: "🚀",
    title: "Make Your Decision",
    description: "Compare options, read success stories, and confidently choose your educational path."
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 glass-panel mx-4 lg:mx-8 my-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold heading-gradient mb-4">How PathFinder Works</h2>
          <p className="text-xl text-[#71ADBA]">Your journey to the perfect major in four simple steps</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="card group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{step.icon}</div>
              <h3 className="text-xl font-semibold text-[#EDEAB1] mb-3">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => window.location.href = '/onboarding'}
            className="btn btn-primary"
          >
            Start Your Journey Now
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks; 