import React from 'react';
import { Routes, Route } from 'react-router-dom';
// --- IMPORT HALAMAN (PAGES) ---
import LoginPage from './pages/login'; 
import RegisterPage from './pages/register'; // <--- PENTING: Ini yang sebelumnya kurang
import DashboardAdmin from './pages/superadmin/dashboard';
import DashboardTakmir from './pages/takmir/dashboard';
import CreateTakmir from './pages/superadmin/CreateTakmir';

// --- IMPORT LAYOUT ---
import PublicLayout from './layouts/publicLayout'; 
import './pages/auth.css';

function App() {
  return (
    <Routes>
      {/* ======================= SUPER ADMIN ROUTES ======================= */}
      <Route path="/superadmin" element={<SuperAdminLayout />}>
          {/* Index route = Dashboard Utama */}
          <Route path="dashboard" element={<DashboardAdmin />} />
          
          {/* Route Manajemen User / Buat Akun */}
          <Route path="users" element={<CreateTakmir />} />
          
          {/* Route Data Masjid (Nanti bisa ditambahkan) */}
          <Route path="masjid" element={<div>Halaman Data Masjid (Coming Soon)</div>} />
      </Route>

      
      {/* ======================= PUBLIC ROUTES ======================= */}
      {/* Route untuk Login & Register */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Route Halaman Utama (Beranda) */}
      {/* HAPUS <PublicLayout> DARI DALAM FILE login.jsx DAN register.jsx SEPERTI SARAN DI BAWAH, 
          ATAU BIARKAN SAJA TAPI TAMPILANNYA ADA HEADERNYA */}
          
      {/* Cara Terbaik: Login & Register berdiri sendiri tanpa layout global */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Halaman Beranda Tetap Pakai Layout */}
      <Route path="/" element={
        <PublicLayout>
          <div className="text-center">
            <h2>Selamat Datang</h2>
            {/* ... */}
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