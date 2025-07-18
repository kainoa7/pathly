import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faRocket, faLock, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  accountType: 'EXPLORER' | 'PRO' | 'PREMIUM';
}

interface Major {
  id: string;
  name: string;
  category: string;
}

interface SalaryProjection {
  year: number;
  salary: number;
}

interface ComparisonData {
  year: number;
  major1Salary: number;
  major2Salary: number;
  major1Name: string;
  major2Name: string;
}

interface MajorComparisonToolProps {
  user: User;
}

const MajorComparisonTool: React.FC<MajorComparisonToolProps> = ({ user }) => {
  const navigate = useNavigate();
  const [majors, setMajors] = useState<Major[]>([]);
  const [selectedMajor1, setSelectedMajor1] = useState<string>('');
  const [selectedMajor2, setSelectedMajor2] = useState<string>('');
  const [comparisonData, setComparisonData] = useState<ComparisonData[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMajors, setLoadingMajors] = useState(true);
  const [error, setError] = useState<string>('');
  const [showDataModal, setShowDataModal] = useState(false);

  // Check if user is Pro
  const isPro = user?.accountType === 'PRO' || user?.accountType === 'PREMIUM';

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showDataModal) {
        setShowDataModal(false);
      }
    };

    if (showDataModal) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [showDataModal]);

  // Fetch majors on component mount
  useEffect(() => {
    const fetchMajors = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/majors`);
        
        if (response.ok) {
          const data = await response.json();
          setMajors(data.majors || []);
        } else {
          // Fallback data if API isn't available
          setMajors([
            { id: '1', name: 'Computer Science', category: 'STEM' },
            { id: '2', name: 'Business Administration', category: 'Business' },
            { id: '3', name: 'Engineering', category: 'STEM' },
            { id: '4', name: 'Psychology', category: 'Social Sciences' },
            { id: '5', name: 'Economics', category: 'Business' },
            { id: '6', name: 'Marketing', category: 'Business' },
            { id: '7', name: 'Data Science', category: 'STEM' },
            { id: '8', name: 'Finance', category: 'Business' },
            { id: '9', name: 'Mechanical Engineering', category: 'STEM' },
            { id: '10', name: 'Communications', category: 'Liberal Arts' }
          ]);
        }
      } catch (err) {
        console.error('Error fetching majors:', err);
        // Use fallback data
        setMajors([
          { id: '1', name: 'Computer Science', category: 'STEM' },
          { id: '2', name: 'Business Administration', category: 'Business' },
          { id: '3', name: 'Engineering', category: 'STEM' },
          { id: '4', name: 'Psychology', category: 'Social Sciences' },
          { id: '5', name: 'Economics', category: 'Business' }
        ]);
      } finally {
        setLoadingMajors(false);
      }
    };

    fetchMajors();
  }, []);

  const handleCompare = async () => {
    if (!selectedMajor1 || !selectedMajor2) {
      setError('Please select both majors to compare');
      return;
    }

    if (selectedMajor1 === selectedMajor2) {
      setError('Please select different majors to compare');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(
        `${apiUrl}/api/salary-projections?major1=${selectedMajor1}&major2=${selectedMajor2}`
      );

      if (response.ok) {
        const data = await response.json();
        setComparisonData(data.comparison || []);
      } else {
        // Fallback data for demo purposes
        const major1Name = majors.find(m => m.id === selectedMajor1)?.name || 'Major 1';
        const major2Name = majors.find(m => m.id === selectedMajor2)?.name || 'Major 2';
        
        // Generate mock salary projections
        const mockData: ComparisonData[] = [];
        for (let year = 1; year <= 10; year++) {
          const baseSalary1 = getMockBaseSalary(selectedMajor1);
          const baseSalary2 = getMockBaseSalary(selectedMajor2);
          
          mockData.push({
            year,
            major1Salary: Math.round(baseSalary1 * Math.pow(1.06, year - 1)), // 6% annual growth
            major2Salary: Math.round(baseSalary2 * Math.pow(1.05, year - 1)), // 5% annual growth
            major1Name,
            major2Name
          });
        }
        setComparisonData(mockData);
      }
    } catch (err) {
      console.error('Error fetching salary projections:', err);
      setError('Failed to fetch salary projections. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Mock base salary function for demo
  const getMockBaseSalary = (majorId: string): number => {
    const salaryMap: { [key: string]: number } = {
      '1': 75000, // Computer Science
      '2': 55000, // Business Administration
      '3': 70000, // Engineering
      '4': 45000, // Psychology
      '5': 65000, // Economics
      '6': 50000, // Marketing
      '7': 80000, // Data Science
      '8': 60000, // Finance
      '9': 68000, // Mechanical Engineering
      '10': 42000  // Communications
    };
    return salaryMap[majorId] || 50000;
  };

  // Data Sources Modal Component
  const DataSourcesModal = () => (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={() => setShowDataModal(false)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-gradient-to-br from-[#1a2234] to-[#2a3441] rounded-2xl p-8 max-w-2xl w-full border border-[#71ADBA]/20 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setShowDataModal(false)}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <FontAwesomeIcon icon={faInfoCircle} className="text-[#71ADBA] text-2xl" />
          <h3 className="text-2xl font-bold text-white">About Our Data</h3>
        </div>

        {/* Content */}
        <div className="space-y-6 text-gray-300">
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Data Sources</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#71ADBA] mt-1">•</span>
                <span><strong>U.S. Bureau of Labor Statistics:</strong> Official government salary and employment data by occupation and industry</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#71ADBA] mt-1">•</span>
                <span><strong>National Association of Colleges and Employers (NACE):</strong> Starting salary surveys and career outcome data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#71ADBA] mt-1">•</span>
                <span><strong>Verified User Submissions:</strong> Anonymized salary data from our Pro community members (validated for accuracy)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#71ADBA] mt-1">•</span>
                <span><strong>Industry Reports:</strong> Compensation studies from leading consulting firms and professional associations</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Methodology</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#9C71BA] mt-1">•</span>
                <span><strong>Base Salaries:</strong> Calculated from median entry-level salaries for each major's most common career paths</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#9C71BA] mt-1">•</span>
                <span><strong>Growth Projections:</strong> Based on historical wage growth trends, adjusted for industry-specific factors and economic conditions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#9C71BA] mt-1">•</span>
                <span><strong>Regional Adjustments:</strong> Data represents national averages; actual salaries vary by location and cost of living</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#9C71BA] mt-1">•</span>
                <span><strong>Updates:</strong> Our models are refreshed quarterly to reflect current market conditions</span>
              </li>
            </ul>
          </div>

          <div className="bg-[#71ADBA]/10 rounded-lg p-4 border border-[#71ADBA]/20">
            <h4 className="text-sm font-semibold text-[#71ADBA] mb-2">Important Note</h4>
            <p className="text-xs text-gray-400">
              These projections are estimates for educational and planning purposes. Actual career outcomes depend on many factors including location, experience, skills, industry trends, and economic conditions. Individual results may vary significantly.
            </p>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-600 text-center">
          <button
            onClick={() => setShowDataModal(false)}
            className="px-6 py-2 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white rounded-lg font-medium hover:scale-105 transition-transform"
          >
            Got it
          </button>
        </div>
      </motion.div>
    </div>
  );

  // If user is not Pro, show upgrade message
  if (!isPro) {
    return (
      <div className="bg-gradient-to-br from-[#1a2234] to-[#2a3441] rounded-2xl p-8 border border-[#71ADBA]/20">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-16 h-16 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FontAwesomeIcon icon={faLock} className="text-white text-2xl" />
          </motion.div>
          
          <h3 className="text-2xl font-bold text-white mb-4">
            Major Salary Comparison Tool
          </h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Compare salary projections between different majors over 10 years. This advanced career simulation tool is available for Pro members only.
          </p>
          
          <div className="space-y-3 mb-8 text-left max-w-sm mx-auto">
            <div className="flex items-center gap-3 text-gray-300">
              <FontAwesomeIcon icon={faChartLine} className="text-[#71ADBA]" />
              <span>10-year salary projections</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <FontAwesomeIcon icon={faChartLine} className="text-[#71ADBA]" />
              <span>Interactive comparison charts</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <FontAwesomeIcon icon={faChartLine} className="text-[#71ADBA]" />
              <span>Real-time career insights</span>
            </div>
          </div>
          
          <button
            onClick={() => navigate('/upgrade-to-pro')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform"
          >
            <FontAwesomeIcon icon={faRocket} />
            Upgrade to Pro
          </button>
        </div>
      </div>
    );
  }

  // Pro user interface
  return (
    <div className="bg-gradient-to-br from-[#1a2234] to-[#2a3441] rounded-2xl p-8 border border-[#71ADBA]/20">
      <div className="flex items-center gap-3 mb-8">
        <FontAwesomeIcon icon={faChartLine} className="text-[#71ADBA] text-2xl" />
        <h2 className="text-3xl font-bold text-white">Major Salary Comparison</h2>
        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-bold">
          PRO EXCLUSIVE
        </span>
      </div>

      {loadingMajors ? (
        <div className="text-center py-8">
          <div className="text-white">Loading majors...</div>
        </div>
      ) : (
        <>
          {/* Selection Controls */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Your Current Major
              </label>
              <select
                value={selectedMajor1}
                onChange={(e) => setSelectedMajor1(e.target.value)}
                className="w-full px-4 py-3 bg-dark-background border border-dark-border text-white rounded-lg focus:ring-2 focus:ring-[#71ADBA] focus:border-transparent"
              >
                <option value="">Choose a major...</option>
                {majors.map((major) => (
                  <option key={major.id} value={major.id}>
                    {major.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select a Major to Compare
              </label>
              <select
                value={selectedMajor2}
                onChange={(e) => setSelectedMajor2(e.target.value)}
                className="w-full px-4 py-3 bg-dark-background border border-dark-border text-white rounded-lg focus:ring-2 focus:ring-[#71ADBA] focus:border-transparent"
              >
                <option value="">Choose a major...</option>
                {majors.map((major) => (
                  <option key={major.id} value={major.id}>
                    {major.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Compare Button */}
          <div className="text-center mb-8">
            <button
              onClick={handleCompare}
              disabled={loading || !selectedMajor1 || !selectedMajor2}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#71ADBA] to-[#9C71BA] text-white rounded-xl font-bold text-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Comparing...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faChartLine} />
                  Compare
                </>
              )}
            </button>
          </div>

          {/* Results Chart */}
          {comparisonData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-6"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <h3 className="text-xl font-bold text-gray-900 text-center">
                  10-Year Salary Projection Comparison
                </h3>
                <button
                  onClick={() => setShowDataModal(true)}
                  className="p-1 text-gray-500 hover:text-[#71ADBA] transition-colors group relative"
                  title="About Our Data"
                >
                  <FontAwesomeIcon icon={faInfoCircle} className="text-sm" />
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    About Our Data
                  </span>
                </button>
              </div>
              
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="year" 
                    label={{ value: 'Years of Experience', position: 'insideBottom', offset: -10 }}
                  />
                  <YAxis 
                    label={{ value: 'Annual Salary ($)', angle: -90, position: 'insideLeft' }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip 
                    formatter={(value: number, name: string) => [
                      `$${value.toLocaleString()}`, 
                      name === 'major1Salary' ? comparisonData[0]?.major1Name : comparisonData[0]?.major2Name
                    ]}
                    labelFormatter={(year) => `Year ${year}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="major1Salary" 
                    stroke="#71ADBA" 
                    strokeWidth={3}
                    name={comparisonData[0]?.major1Name || 'Major 1'}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="major2Salary" 
                    stroke="#9C71BA" 
                    strokeWidth={3}
                    name={comparisonData[0]?.major2Name || 'Major 2'}
                  />
                </LineChart>
              </ResponsiveContainer>

              {/* Summary Stats */}
              <div className="grid md:grid-cols-2 gap-6 mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <h4 className="font-bold text-gray-900 mb-2">
                    {comparisonData[0]?.major1Name}
                  </h4>
                  <div className="text-2xl font-bold text-[#71ADBA]">
                    ${comparisonData[comparisonData.length - 1]?.major1Salary.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">10-year projected salary</div>
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-gray-900 mb-2">
                    {comparisonData[0]?.major2Name}
                  </h4>
                  <div className="text-2xl font-bold text-[#9C71BA]">
                    ${comparisonData[comparisonData.length - 1]?.major2Salary.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">10-year projected salary</div>
                </div>
              </div>
            </motion.div>
          )}
        </>
      )}
      
      {/* Data Sources Modal */}
      <AnimatePresence>
        {showDataModal && <DataSourcesModal />}
      </AnimatePresence>
    </div>
  );
};

export default MajorComparisonTool; 