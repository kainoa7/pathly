import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faSearch, 
  faDownload,
  faFilter,
  faEye,
  faCalendar,
  faGraduationCap,
  faBrain,
  faRocket
} from '@fortawesome/free-solid-svg-icons';
import AdminNav from './AdminNav';

interface BetaSignup {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  currentStatus: string;
  interestArea?: string;
  university?: string;
  graduationYear?: string;
  howHeardAboutUs?: string;
  specificInterests?: string;
  source?: string;
  createdAt: string;
}

interface SignupStats {
  total: number;
  recentSignups: number;
  statusBreakdown: Array<{ currentStatus: string; _count: { currentStatus: number } }>;
  interestBreakdown: Array<{ interestArea: string; _count: { interestArea: number } }>;
  sourceBreakdown: Array<{ source: string; _count: { source: number } }>;
}

const AdminBetaSignups = () => {
  const [signups, setSignups] = useState<BetaSignup[]>([]);
  const [stats, setStats] = useState<SignupStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [interestFilter, setInterestFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchSignups = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20',
        ...(searchTerm && { search: searchTerm }),
        ...(statusFilter && { status: statusFilter }),
        ...(interestFilter && { interest: interestFilter })
      });

      const response = await fetch(`/api/beta-signups?${params}`);
      const data = await response.json();

      if (response.ok) {
        setSignups(data.signups);
        setTotalPages(data.pagination.pages);
      }
    } catch (error) {
      console.error('Failed to fetch beta signups:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/beta-signups/stats');
      const data = await response.json();

      if (response.ok) {
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch beta signup stats:', error);
    }
  };

  useEffect(() => {
    fetchSignups();
    fetchStats();
    setLoading(false);
  }, [currentPage, searchTerm, statusFilter, interestFilter]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const exportToCSV = () => {
    const headers = ['Email', 'Name', 'Status', 'Interest', 'University', 'Grad Year', 'Source', 'Signed Up'];
    const csvContent = [
      headers.join(','),
      ...signups.map(signup => [
        signup.email,
        `${signup.firstName} ${signup.lastName || ''}`.trim(),
        signup.currentStatus,
        signup.interestArea || '',
        signup.university || '',
        signup.graduationYear || '',
        signup.source || '',
        formatDate(signup.createdAt)
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `jarvus-beta-signups-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <AdminNav title="Beta Signups" description="Loading early access signups..." />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <FontAwesomeIcon icon={faRocket} className="text-4xl text-cyan-400 mb-4 animate-spin" />
            <p className="text-gray-300">Loading beta signups...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminNav 
        title="Beta Signups" 
        description="Manage and view early access signups for JARVUS AI" 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6"
            >
              <FontAwesomeIcon icon={faUsers} className="text-cyan-400 text-2xl mb-3" />
              <h3 className="text-2xl font-bold text-white mb-1">{stats.total}</h3>
              <p className="text-gray-300 text-sm">Total Signups</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6"
            >
              <FontAwesomeIcon icon={faCalendar} className="text-green-400 text-2xl mb-3" />
              <h3 className="text-2xl font-bold text-white mb-1">{stats.recentSignups}</h3>
              <p className="text-gray-300 text-sm">Last 7 Days</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6"
            >
              <FontAwesomeIcon icon={faGraduationCap} className="text-purple-400 text-2xl mb-3" />
              <h3 className="text-2xl font-bold text-white mb-1">
                {stats.statusBreakdown.filter(s => s.currentStatus.includes('college')).reduce((sum, s) => sum + s._count.currentStatus, 0)}
              </h3>
              <p className="text-gray-300 text-sm">College Students</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-6"
            >
              <FontAwesomeIcon icon={faBrain} className="text-orange-400 text-2xl mb-3" />
              <h3 className="text-2xl font-bold text-white mb-1">
                {stats.interestBreakdown.find(i => i.interestArea === 'technology')?._count.interestArea || 0}
              </h3>
              <p className="text-gray-300 text-sm">Tech Interest</p>
            </motion.div>
          </div>
        )}

        {/* Filters and Search */}
        <div className="bg-slate-900/50 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                <FontAwesomeIcon icon={faSearch} className="mr-2" />
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, email, university..."
                className="w-full px-4 py-2 bg-slate-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2">
                <FontAwesomeIcon icon={faFilter} className="mr-2" />
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="">All Statuses</option>
                <option value="high_school_senior">High School Senior</option>
                <option value="college_freshman">College Freshman</option>
                <option value="college_sophomore">College Sophomore</option>
                <option value="college_junior">College Junior</option>
                <option value="college_senior">College Senior</option>
                <option value="recent_graduate">Recent Graduate</option>
                <option value="working_professional">Working Professional</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 font-medium mb-2">Interest</label>
              <select
                value={interestFilter}
                onChange={(e) => setInterestFilter(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none"
              >
                <option value="">All Interests</option>
                <option value="technology">Technology</option>
                <option value="business">Business</option>
                <option value="healthcare">Healthcare</option>
                <option value="education">Education</option>
                <option value="finance">Finance</option>
                <option value="unsure">Not Sure Yet</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={exportToCSV}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg hover:from-green-400 hover:to-emerald-400 transition-all duration-200"
              >
                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Signups Table */}
        <div className="bg-slate-900/50 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-300 font-medium">Name</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-medium">Email</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-medium">Status</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-medium">Interest</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-medium">University</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-medium">Signed Up</th>
                </tr>
              </thead>
              <tbody>
                {signups.map((signup, index) => (
                  <motion.tr
                    key={signup.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-t border-gray-700 hover:bg-slate-800/30"
                  >
                    <td className="px-6 py-4 text-white">
                      {signup.firstName} {signup.lastName}
                    </td>
                    <td className="px-6 py-4 text-gray-300">{signup.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs">
                        {signup.currentStatus.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {signup.interestArea ? (
                        <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs">
                          {signup.interestArea}
                        </span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-300">{signup.university || '-'}</td>
                    <td className="px-6 py-4 text-gray-300 text-sm">
                      {formatDate(signup.createdAt)}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-700 flex justify-between items-center">
              <p className="text-gray-300 text-sm">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-slate-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBetaSignups; 