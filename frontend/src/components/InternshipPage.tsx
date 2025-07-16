import React from 'react';
import InternshipAlerts from './InternshipAlerts';

const InternshipPage: React.FC = () => {
  return (
    <div className="page-container bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10 py-16 rounded-2xl mb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-[#71ADBA]/20 text-[#71ADBA] text-sm font-medium mb-6">
              Featured Opportunities
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Launch Your Career with Top Internships
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get exclusive access to internship opportunities at innovative startups and leading companies.
              Perfect for students looking to break into competitive fields.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 border-b border-gray-800 mb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#71ADBA] mb-2">500+</div>
              <div className="text-gray-300">Partner Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#9C71BA] mb-2">2,000+</div>
              <div className="text-gray-300">Internship Opportunities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#71ADBA] mb-2">85%</div>
              <div className="text-gray-300">Success Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Pathly for Your Internship Search?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-white mb-3">Personalized Matching</h3>
              <p className="text-gray-300">
                Our AI-powered system matches you with internships that align with your skills, interests, and career goals.
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-white mb-3">Early Access</h3>
              <p className="text-gray-300">
                Get notified about opportunities before they're posted on job boards or company websites.
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-3xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold text-white mb-3">Exclusive Opportunities</h3>
              <p className="text-gray-300">
                Access internships at startups and companies that only recruit through our platform.
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-white mb-3">Application Resources</h3>
              <p className="text-gray-300">
                Get tips, templates, and guidance to help you create standout applications.
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-white mb-3">Mentor Network</h3>
              <p className="text-gray-300">
                Connect with professionals and past interns for advice and insights.
              </p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-6 backdrop-blur-sm">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-white mb-3">Career Growth</h3>
              <p className="text-gray-300">
                Build your professional network and gain real-world experience in your field.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Internship Alerts Section */}
      <InternshipAlerts />

      {/* Pathly Internship Opportunities Section */}
      <div className="py-16 bg-gradient-to-r from-[#71ADBA]/10 to-[#9C71BA]/10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-[#71ADBA]/20 text-[#71ADBA] px-4 py-1 rounded-full text-sm font-medium mb-4">
              Now Accepting Applications 🎯
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join the Pathly Team</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Kickstart your career with us! We offer year-round internship opportunities across different roles. 
              No prior experience needed - just bring your enthusiasm and willingness to learn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-800/50 rounded-lg p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-semibold text-white mb-3">Tech & Development</h3>
              <p className="text-gray-300 mb-4">
                Learn modern web development, help build features that impact thousands of students.
              </p>
              <div className="flex items-center text-sm text-[#71ADBA]">
                <span>React • TypeScript • Node.js</span>
              </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-white mb-3">Design & UX</h3>
              <p className="text-gray-300 mb-4">
                Create beautiful, intuitive experiences that help students navigate their career paths.
              </p>
              <div className="flex items-center text-sm text-[#71ADBA]">
                <span>Figma • User Research • UI/UX</span>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-8 transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-white mb-3">Data & Analytics</h3>
              <p className="text-gray-300 mb-4">
                Work with data to uncover insights that shape career guidance for students.
              </p>
              <div className="flex items-center text-sm text-[#71ADBA]">
                <span>Python • SQL • Data Visualization</span>
              </div>
            </div>
          </div>

          {/* Alert Signup Section */}
          <div className="bg-gray-800/50 rounded-lg p-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-4xl mb-4">🔔</div>
              <h3 className="text-2xl font-semibold text-white mb-4">Never Miss an Opportunity</h3>
              <p className="text-gray-300 mb-6">
                Set up personalized alerts for roles you're interested in. We'll notify you as soon as new positions open up.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <select className="bg-gray-700 text-white rounded-lg px-4 py-2 min-w-[200px]">
                  <option value="">Select Role Category</option>
                  <option value="tech">Tech & Development</option>
                  <option value="design">Design & UX</option>
                  <option value="data">Data & Analytics</option>
                  <option value="content">Content & Marketing</option>
                  <option value="research">Research & Strategy</option>
                </select>
                <button className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white font-semibold py-2 px-6 rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap">
                  Set Alert
                </button>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-white mb-4">What You'll Get 🎁</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-[#71ADBA]">✓</span>
                  Real project experience in a fast-growing startup
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#71ADBA]">✓</span>
                  Mentorship from experienced professionals
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#71ADBA]">✓</span>
                  Flexible remote work options
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#71ADBA]">✓</span>
                  Opportunity to convert to full-time
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-white mb-4">How It Works 🔄</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-[#71ADBA]">1.</span>
                  Set up alerts for roles you're interested in
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#71ADBA]">2.</span>
                  Receive notifications when positions open
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#71ADBA]">3.</span>
                  Apply with your profile (no resume needed!)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#71ADBA]">4.</span>
                  Get matched with the right team
                </li>
              </ul>
            </div>
          </div>

          {/* Community Share Section */}
          <div className="mt-12 bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 rounded-lg p-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-2xl font-semibold text-white mb-4">Grow Our Community</h3>
              <p className="text-gray-300 mb-6">
                Know someone who'd love to join Pathly? Share these opportunities and help us build 
                an amazing community of ambitious students supporting each other!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="flex items-center gap-2 bg-[#E4405F]/20 hover:bg-[#E4405F]/30 text-white px-6 py-3 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  Share on Instagram
                </button>
                <button className="flex items-center gap-2 bg-[#0A66C2]/20 hover:bg-[#0A66C2]/30 text-white px-6 py-3 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  Share on LinkedIn
                </button>
                <button className="flex items-center gap-2 bg-gray-700/50 hover:bg-gray-700/70 text-white px-6 py-3 rounded-lg transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
                  </svg>
                  Copy Link
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-6">
                Together, we can create more opportunities for students everywhere! 🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipPage; 