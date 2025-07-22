import React from 'react';
import { motion } from 'framer-motion';

const TrustSignalsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "JARVUS helped me land my dream job at Tesla in just 3 months!",
      name: "Sarah Chen",
      title: "Software Engineer at Tesla",
      image: "🚗"
    },
    {
      quote: "From uncertain graduate to Amazon PM. JARVUS made it possible.",
      name: "Marcus Rodriguez", 
      title: "Product Manager at Amazon",
      image: "📦"
    },
    {
      quote: "156% salary increase after following my JARVUS roadmap.",
      name: "Emily Park",
      title: "Data Scientist at Google", 
      image: "📊"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-20 bg-gradient-to-b from-transparent via-[rgba(113,173,186,0.05)] to-transparent"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Battle-Tested Results
          </h2>
          <p className="text-xl text-gray-300">
            Real people, real career breakthroughs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="bg-gradient-to-br from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-2xl p-6 border border-[#71ADBA]/20"
            >
              <div className="text-4xl mb-4 text-center">{testimonial.image}</div>
              <blockquote className="text-gray-300 mb-4 italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="text-center">
                <div className="text-white font-semibold">{testimonial.name}</div>
                <div className="text-[#71ADBA] text-sm">{testimonial.title}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div>
            <div className="text-3xl font-bold text-[#71ADBA] mb-2">98%</div>
            <div className="text-gray-400 text-sm">Success Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#9C71BA] mb-2">3.2x</div>
            <div className="text-gray-400 text-sm">Avg Salary Increase</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#EDEAB1] mb-2">45 days</div>
            <div className="text-gray-400 text-sm">Avg Time to Offer</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#71ADBA] mb-2">500+</div>
            <div className="text-gray-400 text-sm">Top Companies</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TrustSignalsSection; 