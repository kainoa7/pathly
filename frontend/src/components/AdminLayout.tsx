import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-dark-background">
      <Routes>
        <Route path="login" element={<AdminLogin />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Routes>
    </div>
  );
};

export default AdminLayout;
