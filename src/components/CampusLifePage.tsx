import React, { useState } from 'react';
import FeedbackPoll from './FeedbackPoll';

const CampusLifePage: React.FC = () => {
  const [pollResults, setPollResults] = useState({
    interested: 0,
    notInterested: 0
  });

  const handleVote = (isInterested: boolean) => {
    setPollResults(prev => ({
      ...prev,
      [isInterested ? 'interested' : 'notInterested']: prev[isInterested ? 'interested' : 'notInterested'] + 1
    }));
    console.log('Vote recorded:', isInterested ? 'interested' : 'not interested');
  };

  // Placeholder links - to be updated when available
  const socialLinks = {
    instagram: "#", // Replace with actual Instagram link
    linkedin: "#"   // Replace with actual LinkedIn link
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-4 text-white">Preview Your Future Campus Life</h1>
        <p className="text-lg text-gray-300 text-center mb-8">
          After taking our PathFinder quiz, explore what life could be like at your potential future school - 
          whether you're taking time off, in high school, community college, or looking to transfer universities.
        </p>
        
        {/* Social Media Section */}
        <div className="bg-gradient-to-r from-[#71ADBA]/20 to-[#9C71BA]/20 rounded-lg shadow-md p-8 mb-12 backdrop-blur-sm border border-[#71ADBA]/30">
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-4 py-1 rounded-full text-sm mb-4">
              Launching Soon! 🚀
            </div>
            <h3 className="text-2xl font-semibold mb-3 text-white">Be Among the First to Join Our Social Community!</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              We're expanding to Instagram and LinkedIn! Follow us now to be part of our founding community and watch us grow. 
              We're building something special and want you to be part of it from day one.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
              <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm">
                <h4 className="text-lg font-semibold text-white mb-3">📸 Coming to Instagram</h4>
                <ul className="text-gray-300 text-left space-y-2 mb-4">
                  <li className="flex items-center">
                    <span className="text-[#71ADBA] mr-2">•</span>
                    Campus life sneak peeks
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#71ADBA] mr-2">•</span>
                    Student success stories
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#71ADBA] mr-2">•</span>
                    Daily college life tips
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#71ADBA] mr-2">•</span>
                    Behind-the-scenes @ colleges
                  </li>
                </ul>
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:opacity-90 transition-all hover:scale-105 transform w-full"
                >
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Follow for Launch
                </a>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm">
                <h4 className="text-lg font-semibold text-white mb-3">💼 Coming to LinkedIn</h4>
                <ul className="text-gray-300 text-left space-y-2 mb-4">
                  <li className="flex items-center">
                    <span className="text-[#71ADBA] mr-2">•</span>
                    Career insights & trends
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#71ADBA] mr-2">•</span>
                    College success stories
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#71ADBA] mr-2">•</span>
                    Industry expert advice
                  </li>
                  <li className="flex items-center">
                    <span className="text-[#71ADBA] mr-2">•</span>
                    Networking opportunities
                  </li>
                </ul>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-[#0A66C2] text-white rounded-full hover:opacity-90 transition-all hover:scale-105 transform w-full"
                >
                  <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  Connect for Launch
                </a>
              </div>
            </div>

            <p className="text-sm text-gray-400">
              🌟 Early followers will get exclusive access to features and community events!
            </p>
          </div>
        </div>

        <div className="mb-12">
          <FeedbackPoll onVote={handleVote} />
        </div>

        <div className="bg-gray-800/50 rounded-lg shadow-md p-8 mb-8 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold mb-6 text-white">Your Complete Campus Guide</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-[#71ADBA] pl-4">
              <h3 className="text-xl font-medium mb-2 text-white">For Those Considering College</h3>
              <p className="text-gray-300 mb-3">
                Whether you're taking a gap year or thinking about starting your college journey, explore campus environments
                and get a real sense of college life. See how different schools could fit your goals and lifestyle.
              </p>
            </div>

            <div className="border-l-4 border-[#9C71BA] pl-4">
              <h3 className="text-xl font-medium mb-2 text-white">For High School Students</h3>
              <p className="text-gray-300 mb-3">
                Get a real feel for college life before you commit. See what current students love about their campus
                and what daily life looks like.
              </p>
            </div>

            <div className="border-l-4 border-[#71ADBA] pl-4">
              <h3 className="text-xl font-medium mb-2 text-white">For Community College Students</h3>
              <p className="text-gray-300 mb-3">
                Compare campus environments and see what university life is really like before you transfer.
                Get insights from other transfer students about their experience.
              </p>
            </div>

            <div className="border-l-4 border-[#9C71BA] pl-4">
              <h3 className="text-xl font-medium mb-2 text-white">For Transfer Students</h3>
              <p className="text-gray-300 mb-3">
                Compare different university environments and find the perfect fit for your next step.
                Learn about transfer student resources and communities.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-white">Coming Soon: Everything You Need to Know</h3>
            <ul className="grid md:grid-cols-2 gap-4">
              <li className="flex items-start space-x-3">
                <span className="text-[#71ADBA]">•</span>
                <span className="text-gray-300">Student-recommended restaurants, cafes, and hangout spots near campus</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-[#71ADBA]">•</span>
                <span className="text-gray-300">Transportation options and typical commute times</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-[#71ADBA]">•</span>
                <span className="text-gray-300">Housing options and typical living costs</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-[#71ADBA]">•</span>
                <span className="text-gray-300">Student clubs and social activities</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-[#71ADBA]">•</span>
                <span className="text-gray-300">Real student reviews and authentic experiences</span>
              </li>
              <li className="flex items-start space-x-3">
                <span className="text-[#71ADBA]">•</span>
                <span className="text-gray-300">Campus resources for non-traditional students</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 bg-gray-900/50 p-6 rounded-lg">
            <p className="text-[#71ADBA] font-medium">
              💡 Take our PathFinder quiz first to get personalized college recommendations, then explore what life 
              could be like at each potential school!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampusLifePage; 