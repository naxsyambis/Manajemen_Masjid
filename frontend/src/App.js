import React from 'react';
import { Routes, Route } from 'react-router-dom';

// --- IMPORT LAYOUT ---
import PublicLayout from './layouts/publicLayout'; 
import SuperAdminLayout from './layouts/superAdminLayout'; 

// --- IMPORT HALAMAN (PAGES) ---
// Perubahan: Mengarah ke folder 'auth'
import LoginPage from './pages/auth/login'; 
import RegisterPage from './pages/auth/register'; 

// Halaman Super Admin
import DashboardAdmin from './pages/superadmin/dashboard';
import CreateTakmir from './pages/superadmin/createTakmir'; 

// Halaman Takmir
import DashboardTakmir from './pages/takmir/dashboard';

function App() {
  return (
    <Routes>
      
      {/* ======================= PUBLIC ROUTES ======================= */}
      {/* Halaman Login & Register */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Halaman Utama (Landing Page) */}
      <Route path="/" element={
        <PublicLayout>
          <div className="text-center">
            <h2>Selamat Datang di Sistem Manajemen Masjid</h2>
            <p>Silakan Login untuk mengakses dashboard.</p>
          </div>
        </PublicLayout>
      } />

      {/* ======================= SUPER ADMIN ROUTES ======================= */}
      <Route path="/superadmin" element={<SuperAdminLayout />}>
          <Route path="dashboard" element={<DashboardAdmin />} />
          <Route path="users" element={<CreateTakmir />} />
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