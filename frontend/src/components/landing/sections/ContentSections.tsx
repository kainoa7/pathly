import React from 'react';
import { motion } from 'framer-motion';
import HowItWorks from '../../HowItWorks';
import CompanyLogos from '../../CompanyLogos';
import VideoShowcase from '../../VideoShowcase';
import TrustSignalsSection from './TrustSignalsSection';

const ContentSections: React.FC = () => {
  return (
    <div className="relative z-10">
      {/* How It Works Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative py-24"
      >
        <HowItWorks />
      </motion.div>

      {/* Trust Signals Section - Added early for credibility */}
      <TrustSignalsSection />
      
      {/* Company Logos Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-20 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(113,173,186,0.03)] to-transparent pointer-events-none" />
        <CompanyLogos />
      </motion.div>
      
      {/* Video Showcase Section */}
      <VideoShowcase />
    </div>
  );
};

export default ContentSections; 