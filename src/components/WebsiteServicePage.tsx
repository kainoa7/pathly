import { useState } from 'react';
import { motion } from 'framer-motion';
import LanguageIcon from '@mui/icons-material/Language';
import DomainIcon from '@mui/icons-material/Domain';
import CodeIcon from '@mui/icons-material/Code';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

const websiteTypes = [
  {
    id: 'personal',
    name: 'Personal Website',
    basePrice: 499,
    icon: <LanguageIcon />,
    description: 'Perfect for portfolios and personal branding',
    features: [
      'Custom Design',
      'Mobile Responsive',
      'Contact Form',
      '3 Pages',
      'Basic SEO'
    ]
  },
  {
    id: 'business',
    name: 'Business Website',
    basePrice: 999,
    icon: <DomainIcon />,
    description: 'Professional site for your business',
    features: [
      'Custom Design',
      'Mobile Responsive',
      'Contact Forms',
      '5-7 Pages',
      'Advanced SEO',
      'Analytics Integration'
    ]
  },
  {
    id: 'ecommerce',
    name: 'E-commerce Website',
    basePrice: 1499,
    icon: <CodeIcon />,
    description: 'Full-featured online store',
    features: [
      'Custom Design',
      'Mobile Responsive',
      'Product Management',
      'Payment Integration',
      'Order System',
      'Customer Accounts'
    ]
  }
];

const WebsiteServicePage = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showContactForm, setShowContactForm] = useState(false);
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const calculateTotal = () => {
    const baseTotal = selectedServices.reduce((total, serviceId) => {
      const service = websiteTypes.find(type => type.id === serviceId);
      return total + (service?.basePrice || 0);
    }, 0);

    // Apply $30 discount if multiple services selected
    const discount = selectedServices.length >= 2 ? 30 : 0;
    return baseTotal - discount;
  };

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => {
      if (prev.includes(serviceId)) {
        return prev.filter(id => id !== serviceId);
      }
      return [...prev, serviceId];
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPlans = selectedServices.map(id => 
      websiteTypes.find(type => type.id === id)?.name
    ).join(', ');
    
    const mailtoLink = `mailto:pathly.help@gmail.com?subject=Website Service Inquiry - ${selectedPlans}&body=Selected Services: ${selectedPlans}%0D%0ATotal Price: $${calculateTotal()}%0D%0A%0D%0AEmail: ${email}%0D%0A%0D%0AProject Description:%0D%0A${description}`;
    
    window.location.href = mailtoLink;
    setShowContactForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Professional Website Solutions</h1>
          <p className="text-xl text-gray-300 mb-6">Choose your perfect website package</p>
          
          {/* Stats Banner */}
          <div className="bg-gray-800/50 rounded-lg p-4 mb-8">
            <p className="text-[#71ADBA] font-semibold">
              Currently maintaining 47 active client websites 🚀
            </p>
          </div>

          {/* Limited Time Offer */}
          {selectedServices.length >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-lg p-6 mb-8"
            >
              <LocalOfferIcon className="text-white text-3xl mb-2" />
              <h2 className="text-2xl font-bold text-white mb-2">Limited Time Offer! 🎉</h2>
              <p className="text-white text-lg">
                Bundle Discount Applied: Save $30!
              </p>
            </motion.div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {websiteTypes.map((type) => (
            <motion.div
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative cursor-pointer rounded-xl p-6 transition-all
                ${selectedServices.includes(type.id)
                  ? 'bg-gradient-to-br from-[#71ADBA]/20 to-[#9C71BA]/20 border-2 border-[#71ADBA]'
                  : 'bg-gray-800/50 border-2 border-gray-700 hover:border-[#71ADBA]/50'
                }
              `}
              onClick={() => handleServiceToggle(type.id)}
            >
              {/* Clickable Indicator */}
              <div className="absolute top-4 right-4 text-[#71ADBA] animate-pulse">
                Click to Select
              </div>

              <div className="flex items-center mb-4">
                <div className={`
                  p-3 rounded-lg mr-4
                  ${selectedServices.includes(type.id)
                    ? 'bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white'
                    : 'bg-gray-700 text-gray-300'
                  }
                `}>
                  {type.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{type.name}</h3>
                  <p className="text-2xl font-bold text-[#71ADBA] mt-1">${type.basePrice}</p>
                </div>
              </div>

              <p className="text-gray-400 mb-4">{type.description}</p>
              
              <ul className="space-y-2">
                {type.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <CheckCircleIcon className="text-[#71ADBA] mr-2 text-sm" />
                    {feature}
                  </li>
                ))}
              </ul>

              {selectedServices.includes(type.id) && (
                <div className="absolute top-2 left-2">
                  <CheckCircleIcon className="text-[#71ADBA] text-xl" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {selectedServices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <p className="text-xl text-white mb-4">
              Total: ${calculateTotal()}
              {selectedServices.length >= 2 && (
                <span className="text-[#71ADBA] ml-2">(Includes $30 bundle discount!)</span>
              )}
            </p>
            <button
              onClick={() => setShowContactForm(true)}
              className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Get Started
            </button>
          </motion.div>
        )}

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gray-800 rounded-xl p-8 max-w-lg w-full relative"
            >
              <button
                onClick={() => setShowContactForm(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <CloseIcon />
              </button>

              <h2 className="text-2xl font-semibold text-white mb-6">
                Get Started with Your Website
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#71ADBA]"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Description
                  </label>
                  <textarea
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#71ADBA] min-h-[100px]"
                    placeholder="Tell us about your project and any specific requirements"
                  />
                </div>

                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <h3 className="text-white font-medium mb-2">Selected Services:</h3>
                  <ul className="space-y-1">
                    {selectedServices.map(serviceId => {
                      const service = websiteTypes.find(type => type.id === serviceId);
                      return (
                        <li key={serviceId} className="text-gray-300">
                          • {service?.name} - ${service?.basePrice}
                        </li>
                      );
                    })}
                  </ul>
                  <p className="text-white font-medium mt-4">
                    Total: ${calculateTotal()}
                    {selectedServices.length >= 2 && (
                      <span className="text-[#71ADBA] ml-2">(Includes bundle discount!)</span>
                    )}
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Send Inquiry
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsiteServicePage; 