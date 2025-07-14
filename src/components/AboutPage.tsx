import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-pink-500">
      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
            About PathFinder
          </h1>
          
          <div className="space-y-8 text-white">
            <section className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-lg">
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-lg leading-relaxed">
                PathFinder is dedicated to helping students discover their perfect career path
                by matching their passions, skills, and goals with educational and professional
                opportunities. We believe everyone deserves a career they love.
              </p>
            </section>

            <section className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-lg">
              <h2 className="text-2xl font-semibold mb-4">How We Help</h2>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start">
                  <span className="mr-2">🎯</span>
                  <span>Personalized major recommendations based on your interests and goals</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📊</span>
                  <span>Real-world career insights and job market analysis</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">🎓</span>
                  <span>Educational pathway guidance for your chosen career</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">💼</span>
                  <span>Connection with opportunities at top companies</span>
                </li>
              </ul>
            </section>

            <section className="bg-white bg-opacity-10 rounded-xl p-6 backdrop-blur-lg">
              <h2 className="text-2xl font-semibold mb-4">Our Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="text-3xl font-bold mb-2">50,000+</h3>
                  <p>Students Helped</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-2">1,000+</h3>
                  <p>University Partners</p>
                </div>
                <div>
                  <h3 className="text-3xl font-bold mb-2">92%</h3>
                  <p>Student Satisfaction</p>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage; 