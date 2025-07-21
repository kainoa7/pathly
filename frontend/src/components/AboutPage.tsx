import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faRocket, 
  faEye,
  faCheck,
  faArrowRight,
  faBrain,
  faUsers,
  faQuoteLeft,
  faGraduationCap,
  faCompass,
  faRoute
} from '@fortawesome/free-solid-svg-icons';

const AboutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats] = useState({ users: 3252, feedback: 847 });

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Computer Science Student",
      quote: "The career quiz gave me three potential paths I had never considered before—AI research, product management, and cybersecurity. Now I know exactly which internships to apply for.",
      feedback: "Career Clarity"
    },
    {
      name: "Marcus Johnson", 
      role: "Engineering Graduate",
      quote: "JARVUS showed me that my mechanical engineering degree could lead to renewable energy, aerospace, or even robotics. I landed my dream job at Tesla after following the roadmap.",
      feedback: "Dream Job Landed"
    },
    {
      name: "Emma Rodriguez",
      role: "High School Counselor", 
      quote: "I wish I had this tool 10 years ago. The way JARVUS breaks down salary projections and required skills for each career path is exactly what my students need to make informed decisions.",
      feedback: "Educator Approved"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Simple Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 relative z-10">
        
        {/* Beta Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full">
            <FontAwesomeIcon icon={faRocket} className="text-cyan-400 text-sm" />
            <span className="text-cyan-300 font-medium text-sm">JARVUS AI BETA • Early Access Available</span>
          </div>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Meet JARVUS AI
            </span>
            <br />
            <span className="text-white">Your Career Mentor</span>
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            We're building JARVUS AI to redefine how students navigate their careers—smarter, faster, and with confidence. 
            <span className="text-cyan-400 font-semibold"> Experience the future of career guidance.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/jarvus-ai-demo')}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white text-lg font-semibold"
            >
              <FontAwesomeIcon icon={faRocket} className="mr-2" />
              Experience JARVUS AI
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/vision')}
              className="px-8 py-4 border border-cyan-500/50 rounded-xl text-cyan-400 text-lg font-semibold"
            >
              See Our Vision
            </motion.button>
          </div>

          {/* Simple Stats */}
          <div className="grid grid-cols-2 gap-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-1">{stats.users}+</div>
              <div className="text-gray-400 text-sm">Beta Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-1">{stats.feedback}+</div>
              <div className="text-gray-400 text-sm">Success Stories</div>
            </div>
          </div>
        </motion.div>

        {/* Why We're Building This - Founder Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-slate-900/50 to-slate-800/50 rounded-2xl p-8 border border-cyan-500/20">
            <h2 className="text-3xl font-bold text-center mb-8">Why We're Building This</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Founder Image & Info */}
              <div className="text-center lg:text-left">
                <div className="relative mx-auto lg:mx-0 w-80 h-96 mb-8">
                  <img 
                    src="/founder/founder-photo.jpeg" 
                    alt="Founder - Graduation Photo" 
                    className="w-full h-full rounded-2xl object-cover object-top border-2 border-cyan-400/30 shadow-2xl"
                  />
                  <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-cyan-400 to-blue-500 p-3 rounded-xl shadow-lg">
                    <FontAwesomeIcon icon={faRocket} className="text-white text-2xl" />
                  </div>
                </div>
                
                {/* Industry Credibility Section */}
                <div className="mb-8">
                  {/* Powerful Header */}
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                      className="inline-block"
                    >
                      <div className="bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-2xl p-6 mb-4">
                        <h3 className="text-2xl font-bold text-white mb-2">BATTLE-TESTED EXPERIENCE</h3>
                        <p className="text-orange-300 font-semibold text-lg">From Silicon Valley Giants to Government Research</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Clean Logo Lineup */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex items-center justify-center gap-16 mb-8"
                  >
                    {/* Tesla */}
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                      className="group relative cursor-pointer"
                    >
                      <div className="absolute -inset-8 bg-gradient-to-r from-red-500/30 to-red-600/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="relative">
                        <img 
                          src="/company-logos/tesla.png" 
                          alt="Tesla" 
                          className="h-20 w-auto object-contain filter brightness-90 group-hover:brightness-110 group-hover:scale-110 transition-all duration-500"
                        />
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                          BIG TECH
                        </div>
                      </div>
                    </motion.div>

                    {/* Amazon */}
                    <motion.div
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9, duration: 0.6 }}
                      className="group relative cursor-pointer"
                    >
                      <div className="absolute -inset-8 bg-gradient-to-r from-orange-500/30 to-yellow-500/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="relative">
                        <img 
                          src="/company-logos/amazon.png" 
                          alt="Amazon" 
                          className="h-20 w-auto object-contain filter brightness-90 group-hover:brightness-110 group-hover:scale-110 transition-all duration-500"
                        />
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                          FAANG
                        </div>
                      </div>
                    </motion.div>

                    {/* NSF */}
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1, duration: 0.6 }}
                      className="group relative cursor-pointer"
                    >
                      <div className="absolute -inset-8 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                      <div className="relative">
                        <img 
                          src="/company-logos/nsf.png" 
                          alt="National Science Foundation" 
                          className="h-20 w-auto object-contain filter brightness-90 group-hover:brightness-110 group-hover:scale-110 transition-all duration-500"
                        />
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                          RESEARCH
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Stats Row */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3, duration: 0.6 }}
                    className="bg-gradient-to-br from-slate-800/40 to-slate-900/60 rounded-xl p-6 mb-6 backdrop-blur-sm border border-gray-600/30"
                  >

                    {/* Credibility Stats */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.3, duration: 0.6 }}
                      className="grid grid-cols-3 gap-4 mb-6"
                    >
                      <div className="text-center">
                        <div className="text-2xl font-bold text-cyan-400">$500B+</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">Combined Market Cap</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">2M+</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">Employees Combined</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400">ELITE</div>
                        <div className="text-xs text-gray-400 uppercase tracking-wide">Industry Leaders</div>
                      </div>
                    </motion.div>

                    {/* Impact Statement */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5, duration: 0.6 }}
                      className="text-center bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-cyan-500/30"
                    >
                      <p className="text-white font-bold text-lg mb-2">
                        🚀 REAL INDUSTRY EXPERIENCE
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        Not just theory—<span className="text-cyan-400 font-semibold">battle-tested insights</span> from scaling products at the world's most innovative companies and research institutions.
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Mission Story */}
              <div className="flex flex-col h-full">
                <div className="bg-slate-800/50 rounded-xl p-8 border border-gray-600/30 mb-6 flex-grow shadow-2xl">
                  <FontAwesomeIcon icon={faQuoteLeft} className="text-cyan-400 mb-6 text-3xl" />
                  <p className="text-xl text-gray-300 leading-relaxed italic mb-6">
                    "As someone who's navigated the career journey from student to working at companies like Tesla and Amazon, 
                    I've seen how broken the path can be for young people trying to figure out their future."
                  </p>
                  <p className="text-xl text-gray-300 leading-relaxed italic">
                    "JARVUS was born to fix that—with AI and empathy—for students and young adults who feel lost or unsure 
                    about their path, whether they're in school, out of school, recently graduated, still in high school, 
                    or not going to college at all."
                  </p>
                </div>

                {/* Mission Points */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <FontAwesomeIcon icon={faCheck} className="text-green-400 mt-1 text-lg" />
                    <p className="text-gray-300 text-lg">Guide students toward the right major, career, or next step</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <FontAwesomeIcon icon={faCheck} className="text-green-400 mt-1 text-lg" />
                    <p className="text-gray-300 text-lg">Help young adults who feel lost or unsure about their path</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <FontAwesomeIcon icon={faCheck} className="text-green-400 mt-1 text-lg" />
                    <p className="text-gray-300 text-lg">Support all paths: college, trade school, entrepreneurship, or direct workforce entry</p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20 shadow-lg">
                  <p className="text-cyan-300 font-bold text-xl text-center">
                    JARVUS is here to solve the problem of career uncertainty—one student at a time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* What JARVUS Delivers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">What JARVUS Delivers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-cyan-500/20">
              <FontAwesomeIcon icon={faBrain} className="text-cyan-400 text-2xl mb-3" />
              <h3 className="text-xl font-semibold mb-2">AI Career Assistant</h3>
              <p className="text-gray-300">Personalized guidance, resume optimization, and interview prep powered by advanced AI.</p>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-6 border border-green-500/20">
              <FontAwesomeIcon icon={faUsers} className="text-green-400 text-2xl mb-3" />
              <h3 className="text-xl font-semibold mb-2">Student-First Platform</h3>
              <p className="text-gray-300">Built specifically for students, by people who understand the modern career journey.</p>
            </div>
          </div>
        </motion.div>

        {/* Who We Help - With Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">Who We Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/50 rounded-xl p-6 border border-purple-500/20 text-center group hover:border-purple-500/40 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FontAwesomeIcon icon={faGraduationCap} className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-purple-300">Current Students</h3>
              <p className="text-gray-300">College students choosing majors, planning careers, and preparing for the job market</p>
            </div>
            
            <div className="bg-slate-900/50 rounded-xl p-6 border border-orange-500/20 text-center group hover:border-orange-500/40 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FontAwesomeIcon icon={faCompass} className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-orange-300">Young Adults</h3>
              <p className="text-gray-300">Those who feel lost or unsure about their career direction, whether in school or not</p>
            </div>
            
            <div className="bg-slate-900/50 rounded-xl p-6 border border-cyan-500/20 text-center group hover:border-cyan-500/40 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FontAwesomeIcon icon={faRoute} className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-cyan-300">All Career Paths</h3>
              <p className="text-gray-300">Supporting college, trade school, entrepreneurship, and direct workforce entry</p>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8">What People Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-900/50 rounded-xl p-6 border border-gray-600/30"
              >
                <FontAwesomeIcon icon={faQuoteLeft} className="text-cyan-400 mb-3" />
                <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                  <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                    {testimonial.feedback}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-slate-900/50 rounded-xl p-8 border border-cyan-500/20"
        >
          <h2 className="text-3xl font-bold mb-4">Help Perfect JARVUS</h2>
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            We're building the AI career mentor students actually want. Join our beta and help us perfect the experience.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/jarvus-ai-demo')}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white text-lg font-semibold"
          >
            <FontAwesomeIcon icon={faArrowRight} className="mr-2" />
            Join the Beta
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage; 