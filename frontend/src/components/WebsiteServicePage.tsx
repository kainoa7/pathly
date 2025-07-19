import { useState, useEffect } from 'react';
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import PaletteIcon from '@mui/icons-material/Palette';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import SendIcon from '@mui/icons-material/Send';
import PaymentsIcon from '@mui/icons-material/Payments';
import emailjs from '@emailjs/browser';

const websitePackages = [
  {
    id: 'personal',
    name: 'Personal Website',
    basePrice: 499,
    mockupPrice: 49,
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
    mockupPrice: 99,
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
    mockupPrice: 149,
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
  const [wantsMockup, setWantsMockup] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'venmo' | 'cashapp' | 'other'>('venmo');
  const [customPaymentMethod, setCustomPaymentMethod] = useState('');

  // Add escape key handler
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showContactForm) {
        setShowContactForm(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showContactForm]);

  const calculateTotal = () => {
    const package_ = websitePackages.find(p => p.id === selectedPackage);
    const addOn = subscriptionAddOns.find(a => a.id === selectedAddOn);
    
    const basePrice = package_?.basePrice || 0;
    const monthlyPrice = addOn?.price || 0;
    const mockupPrice = wantsMockup ? (package_?.mockupPrice || 0) : 0;
    
    // Apply $30 discount if both package and add-on are selected
    const bundleDiscount = (selectedPackage && selectedAddOn) ? 30 : 0;
    // Apply $50 loyalty discount for preview customers
    const previewDiscount = wantsMockup ? 50 : 0;
    
    return {
      oneTime: basePrice,
      monthly: monthlyPrice,
      mockup: mockupPrice,
      bundleDiscount: bundleDiscount,
      previewDiscount: previewDiscount,
      totalDiscount: bundleDiscount + previewDiscount
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const package_ = websitePackages.find(p => p.id === selectedPackage);
    const addOn = subscriptionAddOns.find(a => a.id === selectedAddOn);
    const total = calculateTotal();

    try {
      const templateParams = {
        to_email: 'jarvus.help@gmail.com',
        from_email: email,
        subject: `Website Service Inquiry - ${wantsMockup ? 'Preview Request' : 'Full Service'} - ${package_?.name}`,
        message: `
Client Information:
Email: ${email}

Selected Services:
${wantsMockup ? '🎨 Preview Request - Initial Mockup ($' + total.mockup + ')\n' : ''}
📦 Package: ${package_?.name} ($${total.oneTime})
${addOn ? `🔧 Maintenance: ${addOn.name} ($${total.monthly}/month - starts month 2)\n` : ''}

Pricing Breakdown:
${wantsMockup ? `Initial Mockup Payment: $${total.mockup}\n` : ''}
Website Development: $${total.oneTime}
${total.bundleDiscount ? 'Bundle Discount: -$30\n' : ''}${total.previewDiscount ? 'Preview Loyalty Discount: -$50\n' : ''}
Final Total: $${total.oneTime - total.totalDiscount}
${addOn ? `Monthly Maintenance (from month 2): $${total.monthly}/month` : ''}

Payment Details:
Preferred Method: ${paymentMethod === 'other' ? customPaymentMethod : paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}

Project Description:
${description}

Additional Notes:
- All prices are in USD
- Maintenance plan starts from the second month
- Development begins after initial payment
${wantsMockup ? '- Preview cost will be deducted from final website development cost' : ''}
        `,
      };

      // Initialize EmailJS with your public key
      emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key

      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        templateParams
      );

      // Show success message
      alert('Thank you for your inquiry! We will contact you shortly.');
      setShowContactForm(false);
    } catch (error) {
      console.error('Error sending email:', error);
      alert('There was an error sending your inquiry. Please try again or contact us directly at jarvus.help@gmail.com');
    }
  };

  // Add loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

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
                relative cursor-pointer rounded-xl p-6 pt-12 transition-all
                ${selectedPackage === package_.id
                  ? 'bg-gradient-to-br from-[#71ADBA]/20 to-[#9C71BA]/20 border-2 border-[#71ADBA]'
                  : 'bg-gray-800/50 border-2 border-gray-700 hover:border-[#71ADBA]/50'
                }
              `}
              onClick={() => setSelectedPackage(package_.id === selectedPackage ? null : package_.id)}
            >
              {/* Selection Status */}
              {selectedPackage === package_.id && (
                <div className="absolute top-3 left-3">
                  <div className="flex items-center">
                    <CheckCircleIcon className="text-[#71ADBA] text-xl" />
                    <span className="text-[#71ADBA] ml-2 text-sm">Selected</span>
                  </div>
                </div>
              )}

              {/* Clickable Indicator */}
              <div className="absolute top-3 right-3 text-[#71ADBA] animate-pulse z-10 bg-gray-800/90 px-2 py-1 rounded text-sm">
                {selectedPackage === package_.id ? 'Click to Remove' : 'Click to Select'}
              </div>

              <div className="flex items-center mb-4 mt-2">
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
                relative cursor-pointer rounded-xl p-6 pt-12 transition-all
                ${selectedAddOn === addOn.id
                  ? 'bg-gradient-to-br from-[#71ADBA]/20 to-[#9C71BA]/20 border-2 border-[#71ADBA]'
                  : 'bg-gray-800/50 border-2 border-gray-700 hover:border-[#71ADBA]/50'
                }
              `}
              onClick={() => setSelectedAddOn(addOn.id === selectedAddOn ? null : addOn.id)}
            >
              {/* Selection Status */}
              {selectedAddOn === addOn.id && (
                <div className="absolute top-3 left-3">
                  <div className="flex items-center">
                    <CheckCircleIcon className="text-[#71ADBA] text-xl" />
                    <span className="text-[#71ADBA] ml-2 text-sm">Selected</span>
                  </div>
                </div>
              )}

              {/* Clickable Indicator */}
              <div className="absolute top-3 right-3 text-[#71ADBA] animate-pulse z-10 bg-gray-800/90 px-2 py-1 rounded text-sm">
                {selectedAddOn === addOn.id ? 'Click to Remove' : 'Click to Select'}
              </div>

              <div className="flex items-center mb-4 mt-2">
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
            <div className="bg-gray-800/50 rounded-lg p-8 inline-block max-w-2xl w-full relative">
              <button
                onClick={() => {
                  setSelectedPackage(null);
                  setSelectedAddOn(null);
                  setWantsMockup(false);
                }}
                className="absolute -top-4 -right-4 bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white rounded-full p-2.5 transition-all duration-200 transform hover:scale-110 z-50 shadow-lg"
                aria-label="Clear selection"
              >
                <CloseIcon className="w-7 h-7" />
              </button>

              <h3 className="text-3xl font-bold text-white mb-6">Your Selected Package</h3>
              
              <div className="space-y-4 mb-8 text-left">
                <div className="flex justify-between items-center">
                  <p className="text-xl text-gray-300">
                    Website Package: <span className="text-[#71ADBA] font-semibold">
                      {websitePackages.find(p => p.id === selectedPackage)?.name}
                    </span>
                  </p>
                  <p className="text-xl text-[#71ADBA] font-semibold">
                    ${websitePackages.find(p => p.id === selectedPackage)?.basePrice}
                  </p>
                </div>

                {selectedAddOn && (
                  <div className="flex justify-between items-center">
                    <p className="text-xl text-gray-300">
                      Maintenance Plan: <span className="text-[#71ADBA] font-semibold">
                        {subscriptionAddOns.find(a => a.id === selectedAddOn)?.name}
                      </span>
                    </p>
                    <p className="text-xl text-[#71ADBA] font-semibold">
                      ${subscriptionAddOns.find(a => a.id === selectedAddOn)?.price}/month
                    </p>
                  </div>
                )}

                {calculateTotal().bundleDiscount > 0 && (
                  <div className="bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 p-4 rounded-lg border-2 border-[#71ADBA] mt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-[#71ADBA] font-bold text-lg">Bundle Discount Applied! 🎉</h4>
                        <p className="text-gray-300 text-sm mt-1">
                          Special offer when you combine a website package with maintenance
                        </p>
                      </div>
                      <p className="text-[#71ADBA] font-bold text-xl">-${calculateTotal().bundleDiscount}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-700 pt-6 mb-8">
                <div className="space-y-4">
                  {/* Mockup Option */}
                  {selectedPackage && (
                    <div className="bg-gradient-to-br from-[#71ADBA]/10 to-[#9C71BA]/10 rounded-lg p-6 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <VisibilityIcon className="text-[#71ADBA] mr-3" />
                          <h4 className="text-xl font-semibold text-white">Preview Your Website</h4>
                        </div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={wantsMockup}
                            onChange={(e) => setWantsMockup(e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#71ADBA]"></div>
                        </label>
                      </div>
                      
                      <div className="space-y-3">
                        <p className="text-gray-300">
                          Get a detailed mockup of your website design before committing to the full project.
                          {wantsMockup ? (
                            <span className="block mt-2 space-y-2">
                              <span className="flex items-center text-[#71ADBA]">
                                <CheckCircleIcon className="mr-2" />
                                Only ${websitePackages.find(p => p.id === selectedPackage)?.mockupPrice} to see your design
                              </span>
                              <span className="flex items-center text-[#71ADBA]">
                                <CheckCircleIcon className="mr-2" />
                                This amount will be deducted from your final website cost
                              </span>
                              <span className="flex items-center text-[#71ADBA]">
                                <CheckCircleIcon className="mr-2" />
                                Includes 2 revision rounds
                              </span>
                              <span className="flex items-center text-[#71ADBA]">
                                <MoneyOffIcon className="mr-2" />
                                Get an additional $50 off when you proceed with the full website
                              </span>
                            </span>
                          ) : (
                            <span className="block mt-2 text-gray-400">
                              Toggle to add a preview step to your project
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <h4 className="text-xl font-semibold text-white">One-time Website Fee:</h4>
                    <div className="text-right">
                      {calculateTotal().bundleDiscount > 0 && (
                        <p className="text-gray-400 line-through text-lg">
                          ${calculateTotal().oneTime}
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        <p className="text-2xl font-bold text-[#71ADBA]">
                          ${calculateTotal().oneTime - calculateTotal().totalDiscount}
                        </p>
                        {calculateTotal().bundleDiscount > 0 && (
                          <span className="bg-[#71ADBA] text-white text-sm px-2 py-1 rounded">
                            Bundle Deal!
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {wantsMockup && (
                    <div className="flex justify-between items-center">
                      <h4 className="text-xl font-semibold text-white">Initial Mockup Fee:</h4>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#71ADBA]">
                          ${calculateTotal().mockup}
                        </p>
                        <p className="text-sm text-gray-400">
                          (deducted from final price)
                        </p>
                      </div>
                    </div>
                  )}

                  {selectedAddOn && (
                    <>
                      <div className="flex justify-between items-center">
                        <h4 className="text-xl font-semibold text-white">Monthly Maintenance Fee:</h4>
                        <p className="text-2xl font-bold text-[#71ADBA]">
                          ${calculateTotal().monthly}
                        </p>
                      </div>
                      
                      <div className="bg-gray-800 rounded-lg p-4 mt-4">
                        <p className="text-gray-300 text-sm space-y-2">
                          {wantsMockup ? (
                            <>
                              <span className="block">
                                <span className="font-medium text-white">Step 1:</span> Initial mockup payment
                                <span className="float-right">${calculateTotal().mockup}</span>
                              </span>
                              <span className="block">
                                <span className="font-medium text-white">Step 2:</span> Website development
                                <span className="float-right">
                                  <span className="line-through text-gray-400">${calculateTotal().oneTime}</span>
                                  {" "}${calculateTotal().oneTime - calculateTotal().totalDiscount}
                                </span>
                              </span>
                              <div className="mt-2 space-y-1">
                                {calculateTotal().bundleDiscount > 0 && (
                                  <span className="block text-[#71ADBA]">
                                    Bundle savings
                                    <span className="float-right">-${calculateTotal().bundleDiscount}</span>
                                  </span>
                                )}
                                <span className="block text-[#71ADBA]">
                                  Preview loyalty discount
                                  <span className="float-right">-${calculateTotal().previewDiscount}</span>
                                </span>
                              </div>
                              {selectedAddOn && (
                                <span className="block mt-4">
                                  <span className="font-medium text-white">Step 3:</span> Monthly maintenance
                                  <span className="float-right">${calculateTotal().monthly}/month (starts month 2)</span>
                                </span>
                              )}
                            </>
                          ) : (
                            <>
                              One-time website development fee 
                              {calculateTotal().bundleDiscount > 0 ? (
                                <span>
                                  {" "}(was <span className="line-through">${calculateTotal().oneTime}</span>, now ${calculateTotal().oneTime - calculateTotal().bundleDiscount} with bundle savings)
                                </span>
                              ) : (
                                <span> (${calculateTotal().oneTime})</span>
                              )}.
                              {selectedAddOn && (
                                <span className="block mt-2">
                                  Starting from the second month, you'll pay ${calculateTotal().monthly}/month for maintenance and support.
                                </span>
                              )}
                            </>
                          )}
                        </p>
                      </div>
                    </>
                  )}

                  {!selectedAddOn && (
                    <div className="bg-gray-800 rounded-lg p-4 mt-4">
                      <p className="text-gray-300 text-sm">
                        {wantsMockup ? (
                          <>
                            Initial mockup payment: ${calculateTotal().mockup}
                            <br />
                            After approval, website development fee: ${calculateTotal().oneTime}
                          </>
                        ) : (
                          <>
                            One-time website development fee: ${calculateTotal().oneTime}
                          </>
                        )}
                        <br />
                        <span className="text-[#71ADBA]">
                          💡 Add a maintenance plan to save $30 on your website package and get ongoing support!
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => setShowContactForm(true)}
                className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-12 py-4 rounded-lg font-medium text-xl hover:opacity-90 transition-opacity mx-auto block w-full md:w-auto flex items-center justify-center gap-2"
              >
                {wantsMockup ? (
                  <>
                    <VisibilityIcon className="w-6 h-6" />
                    Start with Preview
                  </>
                ) : (
                  <>
                    Get Started
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Contact Form Modal */}
        {showContactForm && (
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-start justify-center z-50 p-4 overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowContactForm(false);
              }
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="bg-gray-800 rounded-xl p-6 max-w-lg w-full relative my-8 max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Form Header with Close Button */}
              <div className="flex items-center justify-between border-b border-gray-700 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  {wantsMockup ? (
                    <PaletteIcon className="w-7 h-7 text-[#71ADBA]" />
                  ) : (
                    <RocketLaunchIcon className="w-7 h-7 text-[#71ADBA]" />
                  )}
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      {wantsMockup ? "Start with Website Preview" : "Get Started with Your Website"}
                    </h2>
                    <p className="text-sm text-gray-400">
                      {wantsMockup 
                        ? "Get a detailed mockup of your website design before proceeding with the full project."
                        : "Begin your website development journey with us today."}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="ml-4 p-2 hover:bg-gray-700 rounded-lg transition-colors group"
                  aria-label="Close form"
                >
                  <CloseIcon className="w-6 h-6 text-gray-400 group-hover:text-white" />
                </button>
              </div>

              <div className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-[#71ADBA] focus:ring-[#71ADBA] text-white"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                        Project Description
                      </label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-[#71ADBA] focus:ring-[#71ADBA] text-white"
                        placeholder="Tell us about your project and any specific requirements"
                        required
                      />
                    </div>

                    <div className="bg-gray-900 rounded-lg p-6 space-y-4">
                      <h3 className="text-xl font-medium text-white">Selected Services:</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300">{websitePackages.find(p => p.id === selectedPackage)?.name}</span>
                          <span className="text-[#71ADBA]">${calculateTotal().oneTime}</span>
                        </div>
                        {selectedAddOn && (
                          <div className="flex justify-between items-center">
                            <span className="text-gray-300">{subscriptionAddOns.find(a => a.id === selectedAddOn)?.name}</span>
                            <span className="text-[#71ADBA]">${calculateTotal().monthly}/month</span>
                          </div>
                        )}
                        {calculateTotal().bundleDiscount > 0 && (
                          <div className="flex justify-between items-center text-green-500">
                            <span>Bundle Discount</span>
                            <span>-$30</span>
                          </div>
                        )}
                        {calculateTotal().previewDiscount > 0 && (
                          <div className="flex justify-between items-center text-green-500">
                            <span>Preview Loyalty Discount</span>
                            <span>-$50</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Preferred Payment Method
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('venmo')}
                          className={`p-3 rounded-lg border ${
                            paymentMethod === 'venmo'
                              ? 'border-[#71ADBA] bg-[#71ADBA]/10 text-white'
                              : 'border-gray-600 text-gray-400 hover:border-gray-500'
                          }`}
                        >
                          Venmo
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('cashapp')}
                          className={`p-3 rounded-lg border ${
                            paymentMethod === 'cashapp'
                              ? 'border-[#71ADBA] bg-[#71ADBA]/10 text-white'
                              : 'border-gray-600 text-gray-400 hover:border-gray-500'
                          }`}
                        >
                          Cash App
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('other')}
                          className={`p-3 rounded-lg border col-span-2 ${
                            paymentMethod === 'other'
                              ? 'border-[#71ADBA] bg-[#71ADBA]/10 text-white'
                              : 'border-gray-600 text-gray-400 hover:border-gray-500'
                          }`}
                        >
                          Other Payment Method
                        </button>
                      </div>
                      {paymentMethod === 'other' && (
                        <div className="mt-4 p-4 bg-gray-700/50 rounded-lg border border-gray-600">
                          <label htmlFor="customPayment" className="block text-sm font-medium text-white mb-2">
                            Please specify your preferred payment method
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="customPayment"
                              value={customPaymentMethod}
                              onChange={(e) => setCustomPaymentMethod(e.target.value)}
                              className="block w-full rounded-lg bg-gray-800 border-2 border-[#71ADBA] focus:border-[#9C71BA] focus:ring-2 focus:ring-[#9C71BA] text-white px-4 py-3 placeholder-gray-400 transition-all duration-200"
                              placeholder="Enter your preferred payment method (e.g., PayPal, Wire Transfer)"
                              required={paymentMethod === 'other'}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              <PaymentsIcon className="h-5 w-5 text-[#71ADBA]" />
                            </div>
                          </div>
                          <p className="mt-2 text-sm text-gray-400">
                            We'll contact you to arrange payment using your preferred method
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <SendIcon className="w-5 h-5" />
                        Send Inquiry
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsiteServicePage; 