import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const companies = [
  {
    name: 'Meta',
    logo: '/company-logos/meta.png',
    stats: {
      avgSalary: 'Up to $170K+',
      positions: 'Software Engineering',
      location: 'Multiple Locations'
    },
    glowColor: 'rgba(0, 132, 255, 0.3)' // Meta blue glow
  },
  {
    name: 'Apple',
    logo: '/company-logos/apple.png',
    stats: {
      avgSalary: 'Up to $180K+',
      positions: 'Tech & Design',
      location: 'Global Opportunities'
    },
    glowColor: 'rgba(255, 255, 255, 0.2)' // White glow for Apple
  },
  {
    name: 'Amazon',
    logo: '/company-logos/amazon.png',
    stats: {
      avgSalary: 'Up to $160K+',
      positions: 'Tech & Business',
      location: 'Global Positions'
    },
    glowColor: 'rgba(255, 153, 0, 0.2)' // Amazon orange glow
  },
  {
    name: 'Netflix',
    logo: '/company-logos/netflix.png',
    stats: {
      avgSalary: 'Up to $200K+',
      positions: 'Engineering & Content',
      location: 'Multiple Locations'
    },
    glowColor: 'rgba(229, 9, 20, 0.3)' // Netflix red glow
  },
  {
    name: 'Google',
    logo: '/company-logos/google.png',
    stats: {
      avgSalary: 'Up to $190K+',
      positions: 'Tech & Research',
      location: 'Global Opportunities'
    },
    glowColor: 'rgba(66, 133, 244, 0.3)' // Google blue glow
  }
];

const CompanyLogos = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section className="py-16 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#71ADBA] via-[#EDEAB1] to-[#71ADBA] bg-clip-text text-transparent">
            Dream Big, Aim High
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Discover pathways to opportunities at top companies. Let's help you build the skills and knowledge needed to get there.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Company Logo Card */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative bg-[#1a1f36] rounded-xl p-4 border border-white/10
                         hover:border-[#71ADBA]/20 hover:bg-[#1a1f36]/80 transition-all duration-300
                         overflow-hidden"
                style={{
                  boxShadow: `0 0 20px ${company.glowColor}`,
                }}
              >
                {/* Glow effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, ${company.glowColor} 0%, transparent 70%)`,
                  }}
                />
                
                <div className="flex items-center justify-center h-16 relative z-10">
                  <img
                    src={company.logo}
                    alt={`${company.name} opportunities`}
                    className="max-h-full max-w-full object-contain filter brightness-100 group-hover:brightness-110 transition-all duration-300"
                  />
                </div>
              </motion.div>

              {/* Opportunity Info Tooltip */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileHover={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-[#1a1f36]/90 
                         backdrop-blur-lg rounded-lg p-3 border border-white/10 opacity-0 group-hover:opacity-100
                         pointer-events-none z-50"
              >
                <div className="text-center">
                  <p className="text-[#EDEAB1] font-semibold mb-1">{company.stats.avgSalary}</p>
                  <p className="text-sm text-gray-300 mb-1">{company.stats.positions}</p>
                  <p className="text-xs text-[#71ADBA]">{company.stats.location}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 text-sm mb-6">
            * Salary ranges are estimates based on public data and may vary by location, experience, and role
          </p>
          <motion.a
            href="/breaking-into-tech"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-xl text-white font-medium
                     hover:brightness-110 transition-all duration-300"
          >
            <span>See How Others Broke Into Big Tech</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default CompanyLogos; 