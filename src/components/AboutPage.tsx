import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#1a2234] rounded-2xl p-8 shadow-xl"
        >
          <h1 className="text-4xl font-bold mb-8 text-[#71ADBA]">Welcome to Our Pathly Family</h1>
          
          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Our Heart & Soul</h2>
              <p className="mb-6">
                At Pathly, we're more than just a platform - we're your extended family on this 
                journey. We believe that finding your path isn't just about careers; it's about 
                discovering where your heart truly belongs. Every student who comes to us brings 
                their own unique story, and we're here to help write the next beautiful chapter together.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">How We Walk With You</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0f172a] p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-[#71ADBA]">Personal Journey Guide</h3>
                  <p>
                    We don't just point you in a direction - we walk beside you, 
                    understanding your dreams and helping them take flight through 
                    thoughtful guidance and genuine support.
                  </p>
                </div>
                <div className="bg-[#0f172a] p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-[#71ADBA]">Your Success Story</h3>
                  <p>
                    Every step forward is a celebration. We're here to light up the path 
                    ahead, turning your educational journey into a story of growth and discovery.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">The Spirit of Pathly</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#0f172a] p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-[#71ADBA]">Endless Welcome</h3>
                  <p>
                    From the moment you join us, you're family. We celebrate your uniqueness 
                    and embrace your story with open arms and warm hearts.
                  </p>
                </div>
                <div className="bg-[#0f172a] p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-[#71ADBA]">Growing Together</h3>
                  <p>
                    Like a flourishing garden under the warm sun, we nurture your dreams 
                    with patience, care, and unwavering support.
                  </p>
                </div>
                <div className="bg-[#0f172a] p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-[#71ADBA]">True Connection</h3>
                  <p>
                    Here, you'll find a home where your voice matters, your dreams are 
                    cherished, and your future shines bright with possibility.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-white">Your Place is Here</h2>
              <p className="mb-6">
                Whether you're dreaming big in high school, exploring new paths in college, 
                or seeking a change that speaks to your soul - you belong here. Our doors 
                and hearts are always open, ready to welcome you with the warmth of family 
                and the excitement of new beginnings. Your journey is unique, and that's 
                exactly what makes it beautiful.
              </p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                <a
                  href="/onboarding"
                  className="inline-block px-6 py-3 bg-[#71ADBA] text-white rounded-lg font-medium hover:bg-[#5C919C] transition-colors"
                >
                  Begin Your Story With Us
                </a>
              </motion.div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage; 