import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faExchangeAlt, 
  faLightbulb,
  faQuestionCircle,
  faClock,
  faMoneyBillWave,
  faHeart,
  faRocket,
  faArrowRight,
  faCheckCircle,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';

const SwitchingMajorPage = () => {
  const navigate = useNavigate();
  const [selectedReason, setSelectedReason] = useState<string>('');

  const reasons = [
    {
      id: 'not_interested',
      title: "I'm not interested in my current major anymore",
      description: "Lost passion or discovered it's not what you expected",
      icon: faHeart,
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'poor_job_prospects',
      title: "Poor job prospects or low salary potential",
      description: "Worried about career opportunities after graduation",
      icon: faMoneyBillWave,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'too_difficult',
      title: "It's too difficult or not a good fit",
      description: "Struggling with coursework or doesn't match your strengths",
      icon: faExclamationTriangle,
      color: 'from-red-600 to-red-400'
    },
    {
      id: 'found_new_passion',
      title: "I discovered a new field I'm passionate about",
      description: "Found something more exciting through classes or experiences",
      icon: faLightbulb,
      color: 'from-blue-500 to-purple-500'
    }
  ];

  const considerations = [
    {
      icon: faClock,
      title: "Time Investment",
      description: "How much additional time will switching add to your degree?",
      details: [
        "Will you need extra semesters?",
        "Can previous credits transfer?",
        "What's the new graduation timeline?"
      ]
    },
    {
      icon: faMoneyBillWave,
      title: "Financial Impact",
      description: "Consider the costs and future earning potential",
      details: [
        "Additional tuition costs",
        "Starting salary differences",
        "Long-term career earnings"
      ]
    },
    {
      icon: faHeart,
      title: "Personal Fulfillment",
      description: "Will this change make you happier and more motivated?",
      details: [
        "Genuine interest in new field",
        "Better alignment with values",
        "Improved work-life satisfaction"
      ]
    }
  ];

  const steps = [
    {
      number: 1,
      title: "Reflect & Research",
      description: "Understand why you want to switch and research the new field thoroughly"
    },
    {
      number: 2,
      title: "Talk to Advisors",
      description: "Meet with academic advisors and career counselors for guidance"
    },
    {
      number: 3,
      title: "Explore the Field",
      description: "Take intro courses, shadow professionals, or do informational interviews"
    },
    {
      number: 4,
      title: "Create a Plan",
      description: "Map out your new academic path and timeline to graduation"
    },
    {
      number: 5,
      title: "Make the Switch",
      description: "Officially change your major and commit to your new path"
    }
  ];

  const handleReasonSelect = (reasonId: string) => {
    setSelectedReason(reasonId);
  };

  const handleGetGuidance = () => {
    // Navigate to quiz with switching context
    navigate('/quiz/college', { 
      state: { 
        context: 'switching',
        reason: selectedReason 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full mb-6">
            <FontAwesomeIcon icon={faExchangeAlt} className="text-orange-400" />
            <span className="text-orange-300 font-medium">Major Change Guide</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-[#71ADBA] to-[#EDEAB1] bg-clip-text text-transparent mb-6">
            Thinking About Switching Majors?
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            You're not alone! About 80% of students change their major at least once. 
            Let's help you make the right decision for your future.
          </p>
        </motion.div>

        {/* Why Switch Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-[#71ADBA]">
            Why are you considering switching?
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Understanding your motivation helps us give you better guidance
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`bg-[#1e293b] rounded-lg p-6 border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedReason === reason.id 
                    ? 'border-[#71ADBA] bg-[#71ADBA]/10' 
                    : 'border-gray-600 hover:border-[#71ADBA]/50'
                }`}
                onClick={() => handleReasonSelect(reason.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${reason.color} flex items-center justify-center`}>
                    <FontAwesomeIcon icon={reason.icon} className="text-white text-lg" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{reason.title}</h3>
                    <p className="text-gray-400">{reason.description}</p>
                    {selectedReason === reason.id && (
                      <div className="mt-3 flex items-center gap-2 text-[#71ADBA]">
                        <FontAwesomeIcon icon={faCheckCircle} />
                        <span className="font-medium">Selected</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Considerations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-[#71ADBA]">
            Key Things to Consider
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {considerations.map((consideration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-[#1e293b] rounded-lg p-6 border border-gray-600"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] flex items-center justify-center mb-4">
                  <FontAwesomeIcon icon={consideration.icon} className="text-white text-lg" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{consideration.title}</h3>
                <p className="text-gray-400 mb-4">{consideration.description}</p>
                <ul className="space-y-2">
                  {consideration.details.map((detail, idx) => (
                    <li key={idx} className="text-sm text-gray-500 flex items-center gap-2">
                      <span className="w-1 h-1 bg-[#71ADBA] rounded-full"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Step-by-Step Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-[#71ADBA]">
            Your Step-by-Step Process
          </h2>
          
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#71ADBA] to-[#9C71BA] hidden md:block"></div>
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-start gap-6"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] flex items-center justify-center font-bold text-xl text-white flex-shrink-0">
                    {step.number}
                  </div>
                  <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-600 flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center bg-[#1e293b] rounded-lg p-8 border border-[#71ADBA]/20"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Explore Your Options?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Take our specialized quiz to discover majors that might be a better fit for your interests, 
            goals, and personality. Get personalized recommendations based on your unique situation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetGuidance}
              className="bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform flex items-center justify-center gap-3"
              disabled={!selectedReason}
            >
              <FontAwesomeIcon icon={faRocket} />
              Get Personalized Guidance
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
            
            <button
              onClick={() => navigate('/major-selection')}
              className="border border-[#71ADBA] text-[#71ADBA] px-8 py-4 rounded-lg font-bold hover:bg-[#71ADBA] hover:text-white transition-colors"
            >
              Browse All Majors
            </button>
          </div>
          
          {!selectedReason && (
            <p className="text-yellow-400 text-sm mt-4">
              Please select a reason above to get personalized guidance
            </p>
          )}
        </motion.div>

        {/* Beta Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-8"
        >
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-blue-300 text-sm">
              💡 <strong>Coming Soon:</strong> AI-powered major switching advisor that analyzes your transcript, 
              interests, and career goals to create a personalized switching plan.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SwitchingMajorPage; 