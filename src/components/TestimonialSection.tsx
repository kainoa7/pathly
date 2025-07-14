import { motion } from 'framer-motion';
import { Star } from '@mui/icons-material';
import { testimonials } from '../data/testimonials';

const TestimonialSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-white mb-12">
          What Students Are Saying
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 w-5 h-5" />
                ))}
              </div>
              <p className="text-white text-opacity-90 mb-4 text-sm md:text-base">
                "{testimonial.review}"
              </p>
              <div className="mt-auto">
                <h3 className="font-semibold text-white">{testimonial.name}</h3>
                {testimonial.role && (
                  <p className="text-white text-opacity-70 text-sm">{testimonial.role}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection; 