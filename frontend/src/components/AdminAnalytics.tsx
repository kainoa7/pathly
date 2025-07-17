import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { FaArrowLeft, FaChartLine, FaUsers, FaCalendarAlt, FaChartBar } from 'react-icons/fa';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

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

interface DailySignup {
  date: string;
  count: number;
  cumulative: number;
}

const AdminAnalytics = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [dailySignups, setDailySignups] = useState<DailySignup[]>([]);

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

    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/auth/users`);
      if (response.ok) {
        const userData = await response.json();
        setUsers(userData);
        processAnalyticsData(userData);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const processAnalyticsData = (userData: User[]) => {
    // Group users by signup date
    const signupsByDate: { [key: string]: number } = {};
    
    userData.forEach(user => {
      const date = new Date(user.createdAt).toISOString().split('T')[0];
      signupsByDate[date] = (signupsByDate[date] || 0) + 1;
    });

    // Create array of last 30 days
    const last30Days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      last30Days.push(dateString);
    }

    // Process daily signups with cumulative count
    let cumulative = 0;
    const processedData: DailySignup[] = last30Days.map(date => {
      const count = signupsByDate[date] || 0;
      cumulative += count;
      return {
        date,
        count,
        cumulative
      };
    });

    setDailySignups(processedData);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminLoginTime');
    navigate('/admin/login');
  };

  // Chart configurations
  const userGrowthData = {
    labels: dailySignups.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Total Users',
        data: dailySignups.map(item => item.cumulative),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(239, 68, 68)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 4,
      }
    ]
  };

  const dailySignupsData = {
    labels: dailySignups.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Daily Signups',
        data: dailySignups.map(item => item.count),
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1,
      }
    ]
  };

  const accountTypeData = {
    labels: ['Explorer', 'Pro', 'Premium'],
    datasets: [
      {
        data: [
          users.filter(u => u.accountType === 'EXPLORER').length,
          users.filter(u => u.accountType === 'PRO').length,
          users.filter(u => u.accountType === 'PREMIUM').length,
        ],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(239, 68, 68, 0.6)',
          'rgba(239, 68, 68, 0.4)',
        ],
        borderColor: [
          'rgb(239, 68, 68)',
          'rgb(239, 68, 68)',
          'rgb(239, 68, 68)',
        ],
        borderWidth: 2,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#e5e7eb'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#9ca3af'
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.2)'
        }
      },
      y: {
        ticks: {
          color: '#9ca3af'
        },
        grid: {
          color: 'rgba(156, 163, 175, 0.2)'
        }
      }
    }
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#e5e7eb'
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="h-8 w-8 border-2 border-red-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const totalUsers = users.length;
  const todaySignups = dailySignups[dailySignups.length - 1]?.count || 0;
  const weekSignups = dailySignups.slice(-7).reduce((sum, day) => sum + day.count, 0);
  const monthSignups = dailySignups.reduce((sum, day) => sum + day.count, 0);

  return (
    <div className="min-h-screen bg-dark-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <FaArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </button>
            <div className="h-6 w-px bg-gray-600"></div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              Analytics Dashboard
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#1a2234]/90 rounded-lg p-6 border border-red-500/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white">{totalUsers}</p>
              </div>
              <FaUsers className="h-8 w-8 text-red-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1a2234]/90 rounded-lg p-6 border border-red-500/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Today</p>
                <p className="text-2xl font-bold text-white">{todaySignups}</p>
              </div>
              <FaChartLine className="h-8 w-8 text-red-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1a2234]/90 rounded-lg p-6 border border-red-500/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">This Week</p>
                <p className="text-2xl font-bold text-white">{weekSignups}</p>
              </div>
              <FaCalendarAlt className="h-8 w-8 text-red-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#1a2234]/90 rounded-lg p-6 border border-red-500/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">This Month</p>
                <p className="text-2xl font-bold text-white">{monthSignups}</p>
              </div>
              <FaChartBar className="h-8 w-8 text-red-500" />
            </div>
          </motion.div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Growth Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#1a2234]/90 rounded-lg p-6 border border-red-500/20"
          >
            <h3 className="text-xl font-semibold text-white mb-4">User Growth (Last 30 Days)</h3>
            <Line data={userGrowthData} options={chartOptions} />
          </motion.div>

          {/* Daily Signups Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-[#1a2234]/90 rounded-lg p-6 border border-red-500/20"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Daily Signups</h3>
            <Bar data={dailySignupsData} options={chartOptions} />
          </motion.div>
        </div>

        {/* Account Types Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-[#1a2234]/90 rounded-lg p-6 border border-red-500/20 max-w-md mx-auto"
        >
          <h3 className="text-xl font-semibold text-white mb-4 text-center">Account Type Distribution</h3>
          <Doughnut data={accountTypeData} options={doughnutOptions} />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAnalytics; 