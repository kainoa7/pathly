import React from 'react';
import { motion } from 'framer-motion';
import { Feature } from '../../data/pricingData';

interface FeatureTableProps {
  features: Feature[];
}

const FeatureTable: React.FC<FeatureTableProps> = ({ features }) => {
  const renderFeatureValue = (value: boolean) => {
    return value ? (
      <div className="text-green-400 text-xl">✓</div>
    ) : (
      <div className="text-gray-500 text-xl">✗</div>
    );
  };

  const getFeatureBadge = (feature: Feature) => {
    if (feature.isAI) {
      return <span className="ml-2 px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded font-bold">AI</span>;
    }
    if (feature.isNew) {
      return <span className="ml-2 px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded font-bold">NEW</span>;
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1a2234]/60 rounded-2xl overflow-hidden border border-[#71ADBA]/20"
    >
      {/* Header */}
      <div className="grid grid-cols-4 gap-4 p-6 bg-[#0f1419]/50 border-b border-[#71ADBA]/20">
        <div className="text-white font-semibold">Features</div>
        <div className="text-center text-white font-semibold">Explorer</div>
        <div className="text-center text-white font-semibold">Pro</div>
        <div className="text-center text-white font-semibold">JARVUS AI</div>
      </div>

      {/* Features */}
      <div className="divide-y divide-[#71ADBA]/10">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="grid grid-cols-4 gap-4 p-4 hover:bg-[#71ADBA]/5 transition-colors"
          >
            <div className="text-gray-300 flex items-center">
              {feature.name}
              {getFeatureBadge(feature)}
            </div>
            <div className="text-center flex justify-center">
              {renderFeatureValue(feature.explorer)}
            </div>
            <div className="text-center flex justify-center">
              {renderFeatureValue(feature.pro)}
            </div>
            <div className="text-center flex justify-center">
              {renderFeatureValue(feature.premium)}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default FeatureTable; 