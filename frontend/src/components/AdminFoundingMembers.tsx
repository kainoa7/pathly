import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faDownload, faSearch, faCalendarAlt, faUsers, faCrown } from '@fortawesome/free-solid-svg-icons';

interface FoundingMember {
  id: string;
  email: string;
  joinedAt: string;
  ipAddress: string;
}

const AdminFoundingMembers = () => {
  const navigate = useNavigate();
  const [foundingMembers, setFoundingMembers] = useState<FoundingMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'email' | 'joinedAt'>('joinedAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Check admin authentication
  useEffect(() => {
    const isAdminAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
      return;
    }

    fetchFoundingMembers();
  }, [navigate]);

  const fetchFoundingMembers = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/founding-members/admin/list`, {
        headers: {
          'x-admin-auth': 'true'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setFoundingMembers(data.members || []);
      } else {
        // Fallback mock data for demo
        setFoundingMembers([
          {
            id: '1',
            email: 'sarah@stanford.edu',
            joinedAt: '2024-01-15T14:20:00Z',
            ipAddress: '192.168.1.1'
          },
          {
            id: '2',
            email: 'alex@mit.edu',
            joinedAt: '2024-01-15T09:45:00Z',
            ipAddress: '192.168.1.2'
          },
          {
            id: '3',
            email: 'jordan@harvard.edu',
            joinedAt: '2024-01-14T16:30:00Z',
            ipAddress: '192.168.1.3'
          },
          {
            id: '4',
            email: 'taylor@berkeley.edu',
            joinedAt: '2024-01-14T11:15:00Z',
            ipAddress: '192.168.1.4'
          },
          {
            id: '5',
            email: 'morgan@caltech.edu',
            joinedAt: '2024-01-13T22:30:00Z',
            ipAddress: '192.168.1.5'
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching founding members:', error);
      // Fallback mock data
      setFoundingMembers([
        {
          id: '1',
          email: 'sarah@stanford.edu',
          joinedAt: '2024-01-15T14:20:00Z',
          ipAddress: '192.168.1.1'
        },
        {
          id: '2',
          email: 'alex@mit.edu',
          joinedAt: '2024-01-15T09:45:00Z',
          ipAddress: '192.168.1.2'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSort = (field: 'email' | 'joinedAt') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const exportToCSV = () => {
    const headers = ['Email', 'Joined Date', 'IP Address'];
    const csvData = filteredAndSortedMembers.map(member => [
      member.email,
      formatDate(member.joinedAt),
      member.ipAddress
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `founding-members-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredAndSortedMembers = foundingMembers
    .filter(member => 
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = sortBy === 'email' ? a.email : new Date(a.joinedAt).getTime();
      const bValue = sortBy === 'email' ? b.email : new Date(b.joinedAt).getTime();
      
      if (sortBy === 'email') {
        return sortOrder === 'asc' 
          ? (aValue as string).localeCompare(bValue as string)
          : (bValue as string).localeCompare(aValue as string);
      } else {
        return sortOrder === 'asc' 
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });

  const getGrowthData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => {
      const count = foundingMembers.filter(member => 
        member.joinedAt.split('T')[0] === date
      ).length;
      return { date, count };
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-background pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-yellow-400/30 border-t-yellow-400 rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-xl">Loading founding members...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-background pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                <FontAwesomeIcon icon={faCrown} className="text-black text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-clip-text text-transparent">
                  Founding Members
                </h1>
                <p className="text-gray-400">Exclusive community co-creators</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-6 border border-yellow-500/30"
            >
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faUsers} className="text-yellow-400 text-2xl" />
                <div>
                  <div className="text-3xl font-bold text-white">{foundingMembers.length}</div>
                  <div className="text-yellow-200 text-sm">Total Members</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-500/30"
            >
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-green-400 text-2xl" />
                <div>
                  <div className="text-3xl font-bold text-white">
                    {foundingMembers.filter(m => {
                      const memberDate = new Date(m.joinedAt);
                      const today = new Date();
                      const diffTime = today.getTime() - memberDate.getTime();
                      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                      return diffDays <= 7;
                    }).length}
                  </div>
                  <div className="text-green-200 text-sm">This Week</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🚀</span>
                <div>
                  <div className="text-3xl font-bold text-white">
                    {Math.round((foundingMembers.length / 1000) * 100)}%
                  </div>
                  <div className="text-purple-200 text-sm">Goal Progress</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-dark-backgroundSecondary rounded-xl p-6 border border-dark-border mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 relative">
              <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-background border border-dark-border rounded-lg text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => handleSort('joinedAt')}
                className={`px-4 py-3 rounded-lg border transition-all ${
                  sortBy === 'joinedAt' 
                    ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300' 
                    : 'border-dark-border text-gray-300 hover:border-gray-500'
                }`}
              >
                Sort by Date {sortBy === 'joinedAt' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              
              <button
                onClick={() => handleSort('email')}
                className={`px-4 py-3 rounded-lg border transition-all ${
                  sortBy === 'email' 
                    ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300' 
                    : 'border-dark-border text-gray-300 hover:border-gray-500'
                }`}
              >
                Sort by Email {sortBy === 'email' && (sortOrder === 'asc' ? '↑' : '↓')}
              </button>
              
              <button
                onClick={exportToCSV}
                className="px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:opacity-90 transition-all flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faDownload} />
                Export CSV
              </button>
            </div>
          </div>
        </motion.div>

        {/* Members Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl border-2 border-yellow-500/30 overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-yellow-500/20 bg-gradient-to-r from-yellow-500/20 to-orange-500/20">
            <h2 className="text-xl font-bold text-white">
              Founding Members ({filteredAndSortedMembers.length})
            </h2>
          </div>
          
          {filteredAndSortedMembers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-yellow-500/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-yellow-300 uppercase tracking-wider">
                      Member
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-yellow-300 uppercase tracking-wider">
                      Joined Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-yellow-300 uppercase tracking-wider">
                      IP Address
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-yellow-300 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-yellow-500/20">
                  {filteredAndSortedMembers.map((member, index) => (
                    <motion.tr
                      key={member.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-yellow-500/5 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                            <FontAwesomeIcon icon={faCrown} className="text-black text-sm" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-white">{member.email}</div>
                            <div className="text-xs text-yellow-200">Founding Member #{index + 1}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {formatDate(member.joinedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">
                        {member.ipAddress}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-2 px-3 py-1 text-sm font-semibold rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border border-yellow-500/30">
                          <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                          Active
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <div className="text-6xl mb-4">🌟</div>
              <h3 className="text-xl font-bold text-yellow-300 mb-2">No founding members yet</h3>
              <p className="text-yellow-200 mb-4">
                {searchTerm ? 'No members match your search.' : 'Members will appear here as they join the exclusive community.'}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminFoundingMembers; 