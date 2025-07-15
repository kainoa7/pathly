import { useState } from 'react';
import { motion } from 'framer-motion';
import LanguageIcon from '@mui/icons-material/Language';
import DomainIcon from '@mui/icons-material/Domain';
import CodeIcon from '@mui/icons-material/Code';
import UpdateIcon from '@mui/icons-material/Update';
import SupportIcon from '@mui/icons-material/Support';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AutorenewIcon from '@mui/icons-material/Autorenew';

const websitePackages = [
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

const subscriptionAddOns = [
  {
    id: 'basic-maintenance',
    name: 'Basic Maintenance',
    price: 29,
    period: 'monthly',
    icon: <UpdateIcon />,
    description: 'Keep your site running smoothly',
    features: [
      'Monthly Updates',
      'Security Patches',
      'Basic Support',
      'Performance Monitoring'
    ]
  },
  {
    id: 'premium-maintenance',
    name: 'Premium Maintenance',
    price: 79,
    period: 'monthly',
    icon: <SecurityIcon />,
    description: 'Enhanced security and support',
    features: [
      'Weekly Updates',
      'Priority Support',
      'Advanced Security',
      'Daily Backups',
      'SEO Monitoring'
    ]
  },
  {
    id: 'lifetime',
    name: 'Lifetime Package',
    price: 199,
    period: 'monthly',
    icon: <AutorenewIcon />,
    description: 'Complete care for your website',
    features: [
      '24/7 Support',
      'Unlimited Updates',
      'Custom Changes',
      'Marketing Support',
      'Monthly Reports'
    ]
  }
];

const WebsiteServicePage = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedAddOn, setSelectedAddOn] = useState<string | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const calculateTotal = () => {
    const package_ = websitePackages.find(p => p.id === selectedPackage);
    const addOn = subscriptionAddOns.find(a => a.id === selectedAddOn);
    
    const basePrice = package_?.basePrice || 0;
    const monthlyPrice = addOn?.price || 0;
    
    // Apply $30 discount if both package and add-on are selected
    const discount = (selectedPackage && selectedAddOn) ? 30 : 0;
    
    return {
      oneTime: basePrice,
      monthly: monthlyPrice,
      discount: discount
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const package_ = websitePackages.find(p => p.id === selectedPackage);
    const addOn = subscriptionAddOns.find(a => a.id === selectedAddOn);
    const total = calculateTotal();
    
    const mailtoLink = `mailto:pathly.help@gmail.com?subject=Website Service Inquiry - ${package_?.name}&body=Selected Package: ${package_?.name} ($${total.oneTime})%0D%0A${addOn ? `Selected Add-on: ${addOn.name} ($${addOn.price}/month)%0D%0A` : ''}${total.discount ? `Bundle Discount Applied: -$${total.discount}%0D%0A` : ''}%0D%0ATotal:%0D%0AOne-time: $${total.oneTime - total.discount}%0D%0AMonthly: $${total.monthly}%0D%0A%0D%0AEmail: ${email}%0D%0A%0D%0AProject Description:%0D%0A${description}`;
    
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
          {selectedPackage && selectedAddOn && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-lg p-6 mb-8"
            >
              <LocalOfferIcon className="text-white text-3xl mb-2" />
              <h2 className="text-2xl font-bold text-white mb-2">Limited Time Bundle Offer! 🎉</h2>
              <p className="text-white text-lg">
                Save $30 when you combine any website package with a maintenance plan!
              </p>
            </motion.div>
          )}
        </div>

        {/* Website Packages */}
        <h2 className="text-2xl font-bold text-white mb-6">Choose Your Website Package</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {websitePackages.map((package_) => (
            <motion.div
              key={package_.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative cursor-pointer rounded-xl p-6 transition-all
                ${selectedPackage === package_.id
                  ? 'bg-gradient-to-br from-[#71ADBA]/20 to-[#9C71BA]/20 border-2 border-[#71ADBA]'
                  : 'bg-gray-800/50 border-2 border-gray-700 hover:border-[#71ADBA]/50'
                }
              `}
              onClick={() => setSelectedPackage(package_.id)}
            >
              {/* Clickable Indicator */}
              <div className="absolute top-4 right-4 text-[#71ADBA] animate-pulse">
                Click to Select
              </div>

              <div className="flex items-center mb-4">
                <div className={`
                  p-3 rounded-lg mr-4
                  ${selectedPackage === package_.id
                    ? 'bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white'
                    : 'bg-gray-700 text-gray-300'
                  }
                `}>
                  {package_.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{package_.name}</h3>
                  <p className="text-2xl font-bold text-[#71ADBA] mt-1">${package_.basePrice}</p>
                </div>
              </div>

              <p className="text-gray-400 mb-4">{package_.description}</p>
              
              <ul className="space-y-2">
                {package_.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <CheckCircleIcon className="text-[#71ADBA] mr-2 text-sm" />
                    {feature}
                  </li>
                ))}
              </ul>

              {selectedPackage === package_.id && (
                <div className="absolute top-2 left-2">
                  <CheckCircleIcon className="text-[#71ADBA] text-xl" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Subscription Add-ons */}
        <h2 className="text-2xl font-bold text-white mb-6">Add Maintenance & Support</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {subscriptionAddOns.map((addOn) => (
            <motion.div
              key={addOn.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative cursor-pointer rounded-xl p-6 transition-all
                ${selectedAddOn === addOn.id
                  ? 'bg-gradient-to-br from-[#71ADBA]/20 to-[#9C71BA]/20 border-2 border-[#71ADBA]'
                  : 'bg-gray-800/50 border-2 border-gray-700 hover:border-[#71ADBA]/50'
                }
              `}
              onClick={() => setSelectedAddOn(addOn.id)}
            >
              {/* Clickable Indicator */}
              <div className="absolute top-4 right-4 text-[#71ADBA] animate-pulse">
                Click to Select
              </div>

              <div className="flex items-center mb-4">
                <div className={`
                  p-3 rounded-lg mr-4
                  ${selectedAddOn === addOn.id
                    ? 'bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white'
                    : 'bg-gray-700 text-gray-300'
                  }
                `}>
                  {addOn.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{addOn.name}</h3>
                  <p className="text-2xl font-bold text-[#71ADBA] mt-1">
                    ${addOn.price}
                    <span className="text-sm text-gray-400">/{addOn.period}</span>
                  </p>
                </div>
              </div>

              <p className="text-gray-400 mb-4">{addOn.description}</p>
              
              <ul className="space-y-2">
                {addOn.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <CheckCircleIcon className="text-[#71ADBA] mr-2 text-sm" />
                    {feature}
                  </li>
                ))}
              </ul>

              {selectedAddOn === addOn.id && (
                <div className="absolute top-2 left-2">
                  <CheckCircleIcon className="text-[#71ADBA] text-xl" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Total and Get Started Button */}
        {selectedPackage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <div className="bg-gray-800/50 rounded-lg p-6 inline-block">
              <h3 className="text-xl font-bold text-white mb-4">Your Selected Package</h3>
              <div className="space-y-2 mb-4 text-left">
                <p className="text-gray-300">
                  Website Package: <span className="text-[#71ADBA] font-semibold">
                    {websitePackages.find(p => p.id === selectedPackage)?.name}
                  </span>
                </p>
                {selectedAddOn && (
                  <p className="text-gray-300">
                    Maintenance Plan: <span className="text-[#71ADBA] font-semibold">
                      {subscriptionAddOns.find(a => a.id === selectedAddOn)?.name}
                    </span>
                  </p>
                )}
              </div>
              <div className="text-xl text-white mb-6">
                <p>One-time: ${calculateTotal().oneTime - calculateTotal().discount}</p>
                {selectedAddOn && (
                  <p className="mt-2">Monthly: ${calculateTotal().monthly}</p>
                )}
                {calculateTotal().discount > 0 && (
                  <p className="text-[#71ADBA] text-sm mt-2">
                    Bundle discount applied: -${calculateTotal().discount}
                  </p>
                )}
              </div>
              <button
                onClick={() => setShowContactForm(true)}
                className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-8 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Get Started
              </button>
            </div>
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
                  <div className="space-y-2">
                    <p className="text-gray-300">
                      Website Package: {websitePackages.find(p => p.id === selectedPackage)?.name}
                      <span className="float-right">${calculateTotal().oneTime}</span>
                    </p>
                    {selectedAddOn && (
                      <p className="text-gray-300">
                        Maintenance Plan: {subscriptionAddOns.find(a => a.id === selectedAddOn)?.name}
                        <span className="float-right">${calculateTotal().monthly}/month</span>
                      </p>
                    )}
                    {calculateTotal().discount > 0 && (
                      <p className="text-[#71ADBA]">
                        Bundle Discount
                        <span className="float-right">-${calculateTotal().discount}</span>
                      </p>
                    )}
                    <div className="border-t border-gray-600 mt-2 pt-2">
                      <p className="text-white font-medium">
                        Total One-time: ${calculateTotal().oneTime - calculateTotal().discount}
                      </p>
                      {selectedAddOn && (
                        <p className="text-white font-medium">
                          Total Monthly: ${calculateTotal().monthly}
                        </p>
                      )}
                    </div>
                  </div>
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