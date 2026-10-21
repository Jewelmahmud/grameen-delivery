import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrderTracking from './pages/OrderTracking';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import RiderPage from './pages/RiderPage';
import PartnerPage from './pages/PartnerPage';
import RiderDashboard from './rider/Dashboard';
import PartnerDashboard from './partner/Dashboard';
import AdminDashboard from './admin/Dashboard';
import { LanguageProvider } from './context/LanguageContext';
import './styles/App.css';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/track-order" element={<OrderTracking />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/rider" element={<RiderPage />} />
          <Route path="/partner" element={<PartnerPage />} />
          
          {/* Rider Dashboard Routes */}
          <Route path="/rider/*" element={<RiderDashboard />}>
            <Route path="available" element={<RiderDashboard />} />
            <Route path="deliveries" element={<RiderDashboard />} />
            <Route path="earnings" element={<RiderDashboard />} />
            <Route path="profile" element={<RiderDashboard />} />
            <Route path="settings" element={<RiderDashboard />} />
          </Route>
          
          {/* Partner Dashboard Routes */}
          <Route path="/partner/*" element={<PartnerDashboard />}>
            <Route path="overview" element={<PartnerDashboard />} />
            <Route path="orders" element={<PartnerDashboard />} />
            <Route path="products" element={<PartnerDashboard />} />
            <Route path="settings" element={<PartnerDashboard />} />
            <Route path="print-labels" element={<PartnerDashboard />} />
          </Route>
          
          {/* Admin Dashboard Routes */}
          <Route path="/admin/*" element={<AdminDashboard />}>
            <Route path="overview" element={<AdminDashboard />} />
            <Route path="users" element={<AdminDashboard />} />
            <Route path="orders" element={<AdminDashboard />} />
            <Route path="analytics" element={<AdminDashboard />} />
            <Route path="settings" element={<AdminDashboard />} />
            <Route path="print-labels" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;
