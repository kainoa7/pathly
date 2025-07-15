import { useState } from 'react';
import { motion } from 'framer-motion';
import LanguageIcon from '@mui/icons-material/Language';
import DomainIcon from '@mui/icons-material/Domain';
import CodeIcon from '@mui/icons-material/Code';
import UpdateIcon from '@mui/icons-material/Update';
import StorageIcon from '@mui/icons-material/Storage';
import SupportIcon from '@mui/icons-material/Support';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import Analytics from '../utils/analytics';

const WebsiteServicePage = () => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [customFeatures, setCustomFeatures] = useState<string[]>([]);

  const websiteTypes = [
    {
      id: 'portfolio',
      name: 'Portfolio Website',
      icon: <LanguageIcon className="w-6 h-6" />,
      description: 'Showcase your work and skills with a professional portfolio',
      basePrice: 299,
      features: [
        'Custom Design',
        'Mobile Responsive',
        'Project Showcase',
        'Contact Form',
        'Social Media Integration'
      ]
    },
    {
      id: 'business',
      name: 'Business Website',
      icon: <DomainIcon className="w-6 h-6" />,
      description: 'Professional website for your business or startup',
      basePrice: 499,
      features: [
        'Custom Design',
        'Mobile Responsive',
        'Product/Service Pages',
        'Contact Form',
        'Google Maps Integration',
        'Basic SEO Setup'
      ]
    },
    {
      id: 'ecommerce',
      name: 'E-commerce Website',
      icon: <StorageIcon className="w-6 h-6" />,
      description: 'Full-featured online store for your products',
      basePrice: 999,
      features: [
        'Custom Design',
        'Mobile Responsive',
        'Product Management',
        'Shopping Cart',
        'Payment Integration',
        'Order Management',
        'Inventory Tracking'
      ]
    }
  ];

  const additionalServices = [
    {
      id: 'domain',
      name: 'Custom Domain & Hosting',
      icon: <CodeIcon />,
      price: 15,
      period: 'monthly',
      description: 'Custom domain name and reliable hosting'
    },
    {
      id: 'maintenance',
      name: 'Maintenance & Updates',
      icon: <UpdateIcon />,
      price: 49,
      period: 'monthly',
      description: 'Regular updates, backups, and technical maintenance'
    },
    {
      id: 'support',
      name: 'Priority Support',
      icon: <SupportIcon />,
      price: 29,
      period: 'monthly',
      description: '24/7 priority support and consulting'
    }
  ];

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    Analytics.trackInteraction('website_service', `select_plan_${planId}`);
  };

  const handleFeatureToggle = (featureId: string) => {
    setCustomFeatures(prev => 
      prev.includes(featureId)
        ? prev.filter(f => f !== featureId)
        : [...prev, featureId]
    );
    Analytics.trackInteraction('website_service', `toggle_feature_${featureId}`);
  };

  const calculateTotal = () => {
    if (!selectedPlan) return 0;
    const basePlan = websiteTypes.find(plan => plan.id === selectedPlan);
    const basePrice = basePlan?.basePrice || 0;
    
    const monthlyServices = customFeatures.reduce((total, featureId) => {
      const service = additionalServices.find(s => s.id === featureId);
      return total + (service?.price || 0);
    }, 0);

    return {
      oneTime: basePrice,
      monthly: monthlyServices
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Professional Website Solutions
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get a custom-built website that perfectly represents your brand or portfolio. Includes ongoing support and maintenance options.
          </p>
        </motion.div>

        {/* Website Types Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {websiteTypes.map((type) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className={`
                cursor-pointer rounded-xl p-8 border transition-all
                ${selectedPlan === type.id
                  ? 'bg-gradient-to-br from-[#71ADBA]/20 to-[#9C71BA]/20 border-[#71ADBA]'
                  : 'bg-gray-800/50 border-gray-700 hover:border-[#71ADBA]/50'
                }
              `}
              onClick={() => handlePlanSelect(type.id)}
            >
              <div className="flex items-center mb-4">
                <div className={`
                  p-3 rounded-lg mr-4
                  ${selectedPlan === type.id
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
                    <div className="w-1.5 h-1.5 rounded-full bg-[#71ADBA] mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 mb-16"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Additional Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {additionalServices.map((service) => (
              <div
                key={service.id}
                className={`
                  cursor-pointer rounded-lg p-6 border transition-all
                  ${customFeatures.includes(service.id)
                    ? 'bg-gradient-to-br from-[#71ADBA]/20 to-[#9C71BA]/20 border-[#71ADBA]'
                    : 'bg-gray-800/50 border-gray-700 hover:border-[#71ADBA]/50'
                  }
                `}
                onClick={() => handleFeatureToggle(service.id)}
              >
                <div className="flex items-center mb-4">
                  <div className={`
                    p-2 rounded-lg mr-3
                    ${customFeatures.includes(service.id)
                      ? 'bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white'
                      : 'bg-gray-700 text-gray-300'
                    }
                  `}>
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                    <p className="text-[#71ADBA] font-semibold">
                      ${service.price}/{service.period}
                    </p>
                  </div>
                </div>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <SpeedIcon className="text-[#71ADBA] mb-4 w-8 h-8" />
            <h3 className="text-lg font-semibold text-white mb-2">Fast Performance</h3>
            <p className="text-gray-400">Optimized for speed and user experience</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <SecurityIcon className="text-[#71ADBA] mb-4 w-8 h-8" />
            <h3 className="text-lg font-semibold text-white mb-2">Secure & Reliable</h3>
            <p className="text-gray-400">Built with security best practices</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <UpdateIcon className="text-[#71ADBA] mb-4 w-8 h-8" />
            <h3 className="text-lg font-semibold text-white mb-2">Regular Updates</h3>
            <p className="text-gray-400">Keep your site fresh and maintained</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
            <SupportIcon className="text-[#71ADBA] mb-4 w-8 h-8" />
            <h3 className="text-lg font-semibold text-white mb-2">Expert Support</h3>
            <p className="text-gray-400">Help when you need it</p>
          </div>
        </motion.div>

        {/* Price Calculator */}
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-xl p-8 border border-[#71ADBA]/30 text-center"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Your Custom Package</h2>
            <div className="flex justify-center gap-8 mb-8">
              <div>
                <p className="text-gray-400 mb-2">One-time Payment</p>
                <p className="text-3xl font-bold text-white">${calculateTotal().oneTime}</p>
              </div>
              <div>
                <p className="text-gray-400 mb-2">Monthly Services</p>
                <p className="text-3xl font-bold text-white">${calculateTotal().monthly}/mo</p>
              </div>
            </div>
            <button
              onClick={() => Analytics.trackInteraction('website_service', 'request_quote')}
              className="px-8 py-3 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Request Quote
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default WebsiteServicePage; 