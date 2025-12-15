import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// --- IMPORT LAYOUT ---
import SuperAdminLayout from './layouts/superAdminLayout'; 
import PublicLayout from './layouts/publicLayout';

// --- IMPORT HALAMAN (PAGES) ---
import LoginPage from './pages/auth/login'; 
// RegisterPage kita hapus importnya karena tidak dipakai di publik lagi

// Halaman Super Admin
import DashboardAdmin from './pages/superadmin/dashboard';
import CreateTakmir from './pages/superadmin/createTakmir'; 

// Halaman Takmir
import DashboardTakmir from './pages/takmir/dashboard';

function App() {
  return (
    <Routes>
      
      {/* ======================= REDIRECT ROOT ======================= */}
      {/* Jika buka halaman awal, langsung paksa ke /login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* ======================= PUBLIC ROUTES ======================= */}
      <Route path="/login" element={<LoginPage />} />
      {/* Route Register dihapus */}
      
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
          <div className="container text-center mt-5">
            <h1 className="display-1 text-danger">404</h1>
            <h3>Halaman Tidak Ditemukan</h3>
          </div>
        </PublicLayout>
      } />

    </Routes>
  );
}

export default App;