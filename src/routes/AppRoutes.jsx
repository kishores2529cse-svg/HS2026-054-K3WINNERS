import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import CitizenLayout from '../layouts/CitizenLayout';
import OfficerLayout from '../layouts/OfficerLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public Pages
import Landing from '../pages/Landing';
import About from '../pages/About';
import Login from '../pages/Login';
import Register from '../pages/Register';

// Citizen Pages
import CitizenDashboard from '../pages/citizen/CitizenDashboard';
import ReportComplaint from '../pages/citizen/ReportComplaint';
import MyComplaints from '../pages/citizen/MyComplaints';
import ComplaintDetails from '../pages/citizen/ComplaintDetails';

// Officer Pages
import OfficerDashboard from '../pages/officer/OfficerDashboard';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Citizen Portal Routes */}
      <Route path="/citizen" element={<CitizenLayout />}>
        <Route index element={<Navigate to="/citizen/dashboard" replace />} />
        <Route path="dashboard" element={<CitizenDashboard />} />
        <Route path="report" element={<ReportComplaint />} />
        <Route path="complaints" element={<MyComplaints />} />
        <Route path="complaints/:id" element={<ComplaintDetails />} />
      </Route>

      {/* Officer Portal Routes (Kalai) */}
      <Route path="/officer" element={<OfficerLayout />}>
        <Route index element={<Navigate to="/officer/dashboard" replace />} />
        <Route path="dashboard" element={<OfficerDashboard />} />
      </Route>

      {/* Admin Portal Routes (Kanishk) */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>

      {/* Catch-all 404 redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
