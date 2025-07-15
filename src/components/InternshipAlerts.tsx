import React, { useState } from 'react';

interface InternshipCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  popular?: boolean;
}

const InternshipAlerts: React.FC = () => {
  const [email, setEmail] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const internshipCategories: InternshipCategory[] = [
    {
      id: 'ux-design',
      name: 'UX/UI Design',
      description: 'Design user experiences for products and apps',
      icon: '🎨',
      popular: true
    },
    {
      id: 'software-eng',
      name: 'Software Engineering',
      description: 'Build and develop software applications',
      icon: '💻',
      popular: true
    },
    {
      id: 'product-management',
      name: 'Product Management',
      description: 'Lead product strategy and development',
      icon: '📱',
      popular: true
    },
    {
      id: 'data-science',
      name: 'Data Science',
      description: 'Analyze data and build ML models',
      icon: '📊',
      popular: true
    },
    {
      id: 'cybersecurity',
      name: 'Cybersecurity',
      description: 'Protect systems and data from threats',
      icon: '🔒',
    },
    {
      id: 'digital-marketing',
      name: 'Digital Marketing',
      description: 'Create and execute marketing strategies',
      icon: '📢',
    },
    {
      id: 'content-creation',
      name: 'Content Creation',
      description: 'Create engaging digital content',
      icon: '🎥',
    },
    {
      id: 'business-analytics',
      name: 'Business Analytics',
      description: 'Drive business decisions with data',
      icon: '📈',
    },
    {
      id: 'consulting',
      name: 'Management Consulting',
      description: 'Solve complex business problems',
      icon: '💼',
    },
    {
      id: 'healthcare-tech',
      name: 'Healthcare Technology',
      description: 'Innovate in healthcare with technology',
      icon: '⚕️',
    },
    {
      id: 'biotech',
      name: 'Biotech Research',
      description: 'Research in biotechnology',
      icon: '🧬',
    },
    {
      id: 'fintech',
      name: 'Financial Technology',
      description: 'Innovate in financial services',
      icon: '💰',
    }
  ];

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log('Submitted:', { email, selectedCategories });
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-white mb-4">Get Notified About Dream Internships</h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Be the first to know about internship opportunities at top companies. 
          Select your interests and we'll alert you when relevant positions open up.
        </p>
      </div>

      {submitted ? (
        <div className="bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 rounded-lg p-8 text-center backdrop-blur-sm">
          <div className="text-3xl mb-4">🎉</div>
          <h3 className="text-2xl font-semibold text-white mb-2">You're All Set!</h3>
          <p className="text-gray-300">
            We'll send you alerts for your selected categories. Keep an eye on your inbox!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
            <div className="mb-6">
              <label htmlFor="email" className="block text-white font-medium mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-[#71ADBA] focus:ring-2 focus:ring-[#71ADBA]/50 outline-none transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-4">
                Select Internship Categories
                <span className="text-gray-400 text-sm ml-2">(Choose as many as you like)</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {internshipCategories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => handleCategoryToggle(category.id)}
                    className={`relative cursor-pointer rounded-lg p-4 transition-all ${
                      selectedCategories.includes(category.id)
                        ? 'bg-gradient-to-r from-[#71ADBA]/30 to-[#9C71BA]/30 border-[#71ADBA]'
                        : 'bg-gray-700/50 hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{category.icon}</div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-white">{category.name}</h3>
                          {category.popular && (
                            <span className="ml-2 px-2 py-1 text-xs bg-[#71ADBA]/30 text-[#71ADBA] rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 mt-1">{category.description}</p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => {}}
                      className="absolute top-4 right-4 h-5 w-5 accent-[#71ADBA]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={selectedCategories.length === 0 || !email}
              className={`px-8 py-3 rounded-full text-white font-medium transition-all transform hover:scale-105
                ${selectedCategories.length === 0 || !email
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] hover:opacity-90'
                }`}
            >
              Sign Up for Alerts
            </button>
          </div>
        </form>
      )}

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-400">
          🔒 We respect your privacy and will only send relevant alerts based on your selections.
        </p>
      </div>
    </div>
  );
};

export default InternshipAlerts; 