import React from 'react';
import { Routes, Route } from 'react-router-dom';

// --- IMPORT HALAMAN (PAGES) ---
import LoginPage from './pages/login'; 
import RegisterPage from './pages/register'; 
import DashboardAdmin from './pages/superadmin/dashboard';
import DashboardTakmir from './pages/takmir/dashboard';
// Perbaikan: Ubah path menjadi huruf kecil sesuai nama file asli
import CreateTakmir from './pages/superadmin/createTakmir'; 

// --- IMPORT LAYOUT ---
import PublicLayout from './layouts/publicLayout'; 
// Perbaikan: Tambahkan import SuperAdminLayout agar tidak error blank
import SuperAdminLayout from './layouts/superAdminLayout'; 
import './pages/auth.css';

function App() {
  return (
    <Routes>
      
      {/* ======================= PUBLIC ROUTES ======================= */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Route Halaman Utama (Landing Page) */}
      <Route path="/" element={
        <PublicLayout>
          <div className="text-center">
            <h2>Selamat Datang di Sistem Manajemen Masjid</h2>
            <p>Silakan Login untuk mengakses dashboard.</p>
          </div>
        </PublicLayout>
      } />

      {/* ======================= SUPER ADMIN ROUTES ======================= */}
      {/* Semua route di dalam sini otomatis pakai Sidebar & Header Admin */}
      <Route path="/superadmin" element={<SuperAdminLayout />}>
          {/* Dashboard Utama: /superadmin/dashboard */}
          <Route path="dashboard" element={<DashboardAdmin />} />
          
          {/* Manajemen User: /superadmin/users */}
          <Route path="users" element={<CreateTakmir />} />
          
          {/* Data Masjid: /superadmin/masjid */}
          <Route path="masjid" element={<div>Halaman Data Masjid (Coming Soon)</div>} />
      </Route>

      {/* ======================= TAKMIR ROUTES ======================= */}
      <Route path="/takmir/dashboard" element={<DashboardTakmir />} />
      
      {/* ======================= 404 / NOT FOUND ======================= */}
      <Route path="*" element={
        <PublicLayout>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 style={{ color: 'red' }}>404</h1>
            <h3>Halaman Tidak Ditemukan</h3>
          </div>
        </PublicLayout>
      } />

    </Routes>
  );
}

export default App;