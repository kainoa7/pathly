import { motion } from 'framer-motion';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faVolumeLow, faExpand } from '@fortawesome/free-solid-svg-icons';

const VideoShowcase = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
    // When actual video is added, this will trigger video.play()
  };

  return (
    <section className="min-h-screen py-24 px-4 flex items-center relative">
      {/* Subtle overlay for video section emphasis */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/10 to-transparent"></div>
      
      {/* Minimal animated background elements that complement global background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-[#71ADBA]/15 to-[#9C71BA]/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-[#9C71BA]/15 to-[#EDEAB1]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-[#EDEAB1]/15 to-[#71ADBA]/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-4 inline-flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              LIVE DEMO
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400 bg-clip-text text-transparent"
          >
            Watch Career Confusion Disappear
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            See how Sarah went from "I have no idea what to do" to landing her dream job in 3 weeks.
          </motion.p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Video Frame with Glow Effect */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 shadow-2xl">
            {/* Animated Border */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'linear-gradient(45deg, #06b6d4, #8b5cf6, #ec4899, #06b6d4)',
                backgroundSize: '300% 300%',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="absolute inset-[2px] rounded-2xl bg-slate-900"></div>
            </motion.div>

            {/* Video Content Area */}
            <div className="relative aspect-video bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 flex items-center justify-center">
              {!isPlaying ? (
                /* Video Thumbnail/Placeholder */
                <motion.div
                  className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800"
                  whileHover={{ scale: 1.02 }}
                >
                  {/* Placeholder Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-400 rounded-full blur-3xl"></div>
                    <div className="absolute top-3/4 right-1/4 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 left-1/2 w-36 h-36 bg-pink-400 rounded-full blur-3xl"></div>
                  </div>

                  {/* Play Button */}
                  <motion.button
                    onClick={handlePlayClick}
                    className="relative z-10 group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Play Button Glow */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-2xl opacity-50 group-hover:opacity-80 transition-opacity"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    {/* Play Button */}
                    <div className="relative w-24 h-24 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center shadow-2xl group-hover:shadow-cyan-400/50 transition-all duration-300">
                      <FontAwesomeIcon 
                        icon={faPlay} 
                        className="text-white text-2xl ml-1"
                      />
                    </div>
                  </motion.button>

                  {/* Video Info Overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                    className="absolute bottom-8 left-8 right-8"
                  >
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg p-4">
                      <h3 className="text-white font-semibold mb-1">JARVUS AI Career Discovery</h3>
                      <p className="text-gray-300 text-sm">See how students find their perfect career path in under 10 minutes</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                        <span>2:30 duration</span>
                        <span>•</span>
                        <span>1080p HD</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                /* Actual Video Player (placeholder for now) */
                <div className="w-full h-full bg-black flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-white">Video will load here...</p>
                    <p className="text-gray-400 text-sm mt-2">Replace this with your actual video element</p>
                  </div>
                </div>
              )}
            </div>

            {/* Video Controls Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute bottom-4 left-4 right-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <FontAwesomeIcon icon={faVolumeLow} className="text-sm" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <FontAwesomeIcon icon={faExpand} className="text-sm" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Video Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-3 gap-8 mt-12"
          >
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                2:30
              </div>
              <div className="text-gray-400 text-sm">Average Discovery Time</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                98%
              </div>
              <div className="text-gray-400 text-sm">Accuracy Rate</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                3k+
              </div>
              <div className="text-gray-400 text-sm">Students Helped</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-10 py-5 rounded-xl font-bold text-xl shadow-lg hover:shadow-cyan-400/25 transition-all duration-300"
          >
            Watch Sarah's Story
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoShowcase; 