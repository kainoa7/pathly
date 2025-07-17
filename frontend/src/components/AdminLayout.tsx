import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminAnalytics from './AdminAnalytics';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-dark-background">
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="analytics" element={<AdminAnalytics />} />
      </Routes>
    </div>
  );
};

export default AdminLayout;
