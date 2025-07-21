import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AdminNav from './AdminNav';

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

interface Stats {
  total: number;
  explorer: number;
  pro: number;
  premium: number;
  thisWeek: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'EXPLORER' | 'PRO' | 'PREMIUM'>('all');
  const [stats, setStats] = useState<Stats>({
    total: 0,
    explorer: 0,
    pro: 0,
    premium: 0,
    thisWeek: 0
  });

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
        const response = await fetch('/api/auth/users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);

          // Calculate stats
          const total = data.length;
          const explorer = data.filter((user: User) => user.accountType === 'EXPLORER').length;
          const pro = data.filter((user: User) => user.accountType === 'PRO').length;
          const premium = data.filter((user: User) => user.accountType === 'PREMIUM').length;

          // Calculate this week's signups
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
          const thisWeek = data.filter((user: User) => 
            new Date(user.createdAt) >= oneWeekAgo
          ).length;

          setStats({ total, explorer, pro, premium, thisWeek });
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  // Filter users based on search and filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || user.accountType === filterType;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <AdminNav title="Dashboard" description="Loading..." showBackButton={false} />
        <div className="flex items-center justify-center h-96">
          <div className="text-xl">Loading admin dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminNav 
        title="Admin Dashboard" 
        description="Monitor user signups and platform analytics"
        showBackButton={false}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8"
        >
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-6 border border-blue-500/30">
            <div className="text-3xl mb-2">👥</div>
            <div className="text-2xl font-bold text-white">{stats.total}</div>
            <div className="text-sm text-gray-400">Total Users</div>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-6 border border-green-500/30">
            <div className="text-3xl mb-2">🔍</div>
            <div className="text-2xl font-bold text-white">{stats.explorer}</div>
            <div className="text-sm text-gray-400">Explorers</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-6 border border-purple-500/30">
            <div className="text-3xl mb-2">✨</div>
            <div className="text-2xl font-bold text-white">{stats.pro}</div>
            <div className="text-sm text-gray-400">Pro Users</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-6 border border-yellow-500/30">
            <div className="text-3xl mb-2">👑</div>
            <div className="text-2xl font-bold text-white">{stats.premium}</div>
            <div className="text-sm text-gray-400">Premium</div>
          </div>
          <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-xl p-6 border border-cyan-500/30">
            <div className="text-3xl mb-2">📈</div>
            <div className="text-2xl font-bold text-white">{stats.thisWeek}</div>
            <div className="text-sm text-gray-400">This Week</div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div 
            onClick={() => navigate('/admin/beta-signups')}
            className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6 cursor-pointer hover:scale-105 transition-all duration-200"
          >
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="text-xl font-bold text-white mb-2">Beta Signups</h3>
            <p className="text-gray-400">View early access signups and waitlist</p>
          </div>
          
          <div 
            onClick={() => navigate('/admin/analytics')}
            className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-xl p-6 cursor-pointer hover:scale-105 transition-all duration-200"
          >
            <div className="text-3xl mb-3">📊</div>
            <h3 className="text-xl font-bold text-white mb-2">Analytics</h3>
            <p className="text-gray-400">Platform metrics and insights</p>
          </div>
          
          <div 
            onClick={() => navigate('/admin/feedback')}
            className="bg-gradient-to-br from-pink-500/10 to-pink-600/10 border border-pink-500/30 rounded-xl p-6 cursor-pointer hover:scale-105 transition-all duration-200"
          >
            <div className="text-3xl mb-3">💬</div>
            <h3 className="text-xl font-bold text-white mb-2">User Feedback</h3>
            <p className="text-gray-400">Reviews and platform feedback</p>
          </div>
        </motion.div>

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-900/50 rounded-xl p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search users by email or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'EXPLORER' | 'PRO' | 'PREMIUM')}
              className="px-4 py-3 bg-slate-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="EXPLORER">Explorer</option>
              <option value="PRO">Pro</option>
              <option value="PREMIUM">Premium</option>
            </select>
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/50 rounded-xl overflow-hidden"
        >
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">User Signups ({filteredUsers.length})</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-800/50">
                <tr>
                  <th className="px-6 py-4 text-left text-gray-300 font-medium">User</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-medium">Account Type</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-medium">University</th>
                  <th className="px-6 py-4 text-left text-gray-300 font-medium">Signup Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.slice(0, 20).map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-t border-gray-700 hover:bg-slate-800/30"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-white font-medium">{user.firstName} {user.lastName}</div>
                        <div className="text-gray-400 text-sm">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.accountType === 'PREMIUM' ? 'bg-yellow-500/20 text-yellow-300' :
                        user.accountType === 'PRO' ? 'bg-purple-500/20 text-purple-300' :
                        'bg-blue-500/20 text-blue-300'
                      }`}>
                        {user.accountType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{user.university || '-'}</td>
                    <td className="px-6 py-4 text-gray-300 text-sm">
                      {new Date(user.createdAt).toLocaleDateString()}
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
