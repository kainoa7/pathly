import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  accountType: 'EXPLORER' | 'PRO' | 'PREMIUM';
  university?: string;
  graduationYear?: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'EXPLORER' | 'PRO' | 'PREMIUM'>('all');

  // Check admin authentication
  useEffect(() => {
    const isAdminAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    const loginTime = localStorage.getItem('adminLoginTime');
    
    if (!isAdminAuthenticated) {
      navigate('/admin/login');
      return;
    }

    // Check if login is older than 24 hours
    if (loginTime) {
      const loginDate = new Date(loginTime);
      const now = new Date();
      const hoursDiff = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60);
      
      if (hoursDiff > 24) {
        localStorage.removeItem('adminAuthenticated');
        localStorage.removeItem('adminLoginTime');
        navigate('/admin/login');
        return;
      }
    }

    const fetchUsers = async () => {
      try {
        // Try to fetch from local backend
        const response = await fetch('https://backend-production-294e.up.railway.app/api/auth/users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Failed to fetch users');
          // Fallback to mock data
          setUsers([
            {
              id: '1',
              email: 'john@example.com',
              firstName: 'John',
              lastName: 'Doe',
              accountType: 'PRO',
              university: 'Stanford',
              graduationYear: '2025',
              createdAt: '2024-01-15T10:30:00Z'
            },
            {
              id: '2',
              email: 'jane@example.com',
              firstName: 'Jane',
              lastName: 'Smith',
              accountType: 'EXPLORER',
              university: 'MIT',
              graduationYear: '2026',
              createdAt: '2024-01-14T15:45:00Z'
            },
            {
              id: '3',
              email: 'mike@example.com',
              firstName: 'Mike',
              lastName: 'Johnson',
              accountType: 'PREMIUM',
              university: 'Harvard',
              graduationYear: '2024',
              createdAt: '2024-01-13T09:15:00Z'
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        // Fallback to mock data
        setUsers([
          {
            id: '1',
            email: 'john@example.com',
            firstName: 'John',
            lastName: 'Doe',
            accountType: 'PRO',
            university: 'Stanford',
            graduationYear: '2025',
            createdAt: '2024-01-15T10:30:00Z'
          },
          {
            id: '2',
            email: 'jane@example.com',
            firstName: 'Jane',
            lastName: 'Smith',
            accountType: 'EXPLORER',
            university: 'MIT',
            graduationYear: '2026',
            createdAt: '2024-01-14T15:45:00Z'
          },
          {
            id: '3',
            email: 'mike@example.com',
            firstName: 'Mike',
            lastName: 'Johnson',
            accountType: 'PREMIUM',
            university: 'Harvard',
            graduationYear: '2024',
            createdAt: '2024-01-13T09:15:00Z'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || user.accountType === filterType;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: users.length,
    explorer: users.filter(u => u.accountType === 'EXPLORER').length,
    pro: users.filter(u => u.accountType === 'PRO').length,
    premium: users.filter(u => u.accountType === 'PREMIUM').length,
    recent: users.filter(u => {
      const userDate = new Date(u.createdAt);
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return userDate > weekAgo;
    }).length
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'EXPLORER': return 'bg-gray-500';
      case 'PRO': return 'bg-blue-500';
      case 'PREMIUM': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminLoginTime');
    navigate('/admin/login');
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    if (!confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) {
      return;
    }

    try {
              const response = await fetch(`https://backend-production-294e.up.railway.app/api/auth/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove user from local state
        setUsers(users.filter(user => user.id !== userId));
        alert(`User ${userName} has been deleted successfully.`);
      } else {
        const errorData = await response.json();
        alert(`Error deleting user: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-background pt-20 flex items-center justify-center">
        <div className="text-white text-xl">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex justify-between items-center mb-4">
            <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600">
              <span className="text-white font-semibold">👑 ADMIN DASHBOARD</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#71ADBA] via-[#9C71BA] to-[#EDEAB1]">
            K<span className="text-[#71ADBA]">ai</span>yl Admin Panel
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Monitor user signups and platform analytics
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-6 border border-blue-500/30">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-sm text-gray-400">Total Users</div>
          </div>
          <div className="bg-gradient-to-br from-gray-500/20 to-gray-600/20 rounded-lg p-6 border border-gray-500/30">
            <div className="text-3xl mb-2">🔍</div>
            <div className="text-2xl font-bold text-white">{stats.explorer}</div>
            <div className="text-sm text-gray-400">Explorers</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-6 border border-blue-500/30">
            <div className="text-3xl mb-2">✨</div>
            <div className="text-2xl font-bold text-white">{stats.pro}</div>
            <div className="text-sm text-gray-400">Pro Users</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-lg p-6 border border-yellow-500/30">
            <div className="text-3xl mb-2">👑</div>
            <div className="text-2xl font-bold text-white">{stats.premium}</div>
            <div className="text-sm text-gray-400">Premium</div>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg p-6 border border-green-500/30">
            <div className="text-3xl mb-2">📈</div>
            <div className="text-2xl font-bold text-white">{stats.recent}</div>
            <div className="text-sm text-gray-400">This Week</div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-dark-backgroundSecondary rounded-lg p-6 border border-dark-border mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search users by email or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-dark-background border border-dark-border rounded-lg text-white placeholder-gray-400 focus:border-[#71ADBA] focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="px-4 py-2 bg-dark-background border border-dark-border rounded-lg text-white focus:border-[#71ADBA] focus:outline-none"
              >
                <option value="all">All Types</option>
                <option value="EXPLORER">Explorers</option>
                <option value="PRO">Pro Users</option>
                <option value="PREMIUM">Premium</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-dark-backgroundSecondary rounded-lg border border-dark-border overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-dark-border">
            <h2 className="text-xl font-bold text-white">User Signups ({filteredUsers.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-background">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Account Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">University</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Signup Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="hover:bg-dark-background/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-white">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-400">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getAccountTypeColor(user.accountType)} text-white`}>
                        {user.accountType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {user.university || 'Not specified'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <button
                        onClick={() => handleDeleteUser(user.id, `${user.firstName} ${user.lastName}`)}
                        className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-xs"
                      >
                        Delete
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
