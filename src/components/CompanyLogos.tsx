import { motion } from 'framer-motion';

const companies = [
  { name: 'Tesla', logo: '/company-logos/tesla.png' },
  { name: 'Amazon', logo: '/company-logos/amazon.png' },
  { name: 'Microsoft', logo: '/company-logos/microsoft.png' },
  { name: 'Goldman Sachs', logo: '/company-logos/goldmansachs.png' },
  { name: 'DoorDash', logo: '/company-logos/doordash.png' }
];

const CompanyLogos = () => {
  return (
    <section className="py-16 bg-white bg-opacity-5">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-white mb-12">
          Trusted by Students Who Landed Jobs At
        </h2>
        {/* Outer container with gradient fade effect */}
        <div className="relative">
          {/* Left fade gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[rgba(0,0,0,0.3)] to-transparent z-10" />
          {/* Right fade gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[rgba(0,0,0,0.3)] to-transparent z-10" />
          
          {/* Scrollable container */}
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex items-center gap-8 md:gap-12 py-4 px-4 min-w-max">
              {companies.map((company) => (
                <motion.div
                  key={company.name}
                  whileHover={{ scale: 1.1 }}
                  className="w-24 md:w-32 aspect-[3/2] flex-shrink-0"
                >
                  <div className="flex items-center justify-center h-full">
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="w-full h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Add custom scrollbar hiding styles
const style = document.createElement('style');
style.textContent = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;
document.head.appendChild(style);

export default CompanyLogos; 