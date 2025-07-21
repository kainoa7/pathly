import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminAnalytics from './AdminAnalytics';
import AdminNewsManagement from './AdminNewsManagement';
import AdminPlatformFeedback from './admin/AdminPlatformFeedback';
import AdminFoundingMembers from './AdminFoundingMembers';
import AdminNotifications from './AdminNotifications';
import AdminBetaSignups from './AdminBetaSignups';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-dark-background">
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="news" element={<AdminNewsManagement />} />
        <Route path="feedback" element={<AdminPlatformFeedback />} />
        <Route path="founding-members" element={<AdminFoundingMembers />} />
        <Route path="notifications" element={<AdminNotifications />} />
        <Route path="beta-signups" element={<AdminBetaSignups />} />
      </Routes>
    </div>
  );
};

export default AdminLayout;
