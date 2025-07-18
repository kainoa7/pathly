import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminAnalytics from './AdminAnalytics';
import AdminNewsManagement from './AdminNewsManagement';
import AdminPlatformFeedback from './admin/AdminPlatformFeedback';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-dark-background">
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="news" element={<AdminNewsManagement />} />
        <Route path="feedback" element={<AdminPlatformFeedback />} />
      </Routes>
    </div>
  );
};

export default AdminLayout;
