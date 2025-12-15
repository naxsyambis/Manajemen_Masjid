import React from 'react';
import { Routes, Route } from 'react-router-dom';

// --- IMPORT HALAMAN (PAGES) ---
import LoginPage from './pages/login'; 
import RegisterPage from './pages/register'; // <--- PENTING: Ini yang sebelumnya kurang
import DashboardAdmin from './pages/superadmin/dashboard';
import DashboardTakmir from './pages/takmir/dashboard';

// --- IMPORT LAYOUT ---
import PublicLayout from './layouts/publicLayout'; 

function App() {
  return (
    <Routes>
      
      {/* ======================= PUBLIC ROUTES ======================= */}
      {/* Route untuk Login & Register */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Route Halaman Utama (Beranda) */}
      <Route path="/" element={
        <PublicLayout>
          {/* Konten Beranda sementara */}
          <div className="text-center">
            <h2>Selamat Datang di Sistem Manajemen Masjid</h2>
            <p>Silakan Login untuk masuk ke dashboard.</p>
          </div>
        </PublicLayout>
      } />

      {/* ======================= SUPER ADMIN ROUTES ======================= */}
      <Route 
        path="/superadmin/dashboard" 
        element={<DashboardAdmin />} 
      />

      {/* ======================= TAKMIR ROUTES ======================= */}
      <Route 
        path="/takmir/dashboard" 
        element={<DashboardTakmir />} 
      />
      
      {/* ======================= 404 / NOT FOUND ======================= */}
      {/* Menangani jika user membuka link yang tidak ada */}
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