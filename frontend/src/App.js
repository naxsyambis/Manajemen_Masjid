import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login'; // Halaman login yang sudah dibuat
import PublicLayout from './layouts/publicLayout'; // Layout dasar
// Import komponen-komponen yang belum dibuat (hanya untuk routing)
import DashboardAdmin from './pages/superadmin/dashboard';
import DashboardTakmir from './pages/takmir/dashboard';

// Import Middleware Proteksi Route (Belum dibuat, ini hanya placeholder)
// const PrivateRoute = ({ children, role }) => { /* ... logika proteksi */ return children; }; 

function App() {
  return (
    <Routes>
      
      {/* ======================= PUBLIC ROUTES ======================= */}
      {/* Route Login */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Route Halaman Publik/Warga */}
      <Route path="/" element={<PublicLayout><p>Halaman Beranda Publik</p></PublicLayout>} />

      {/* ======================= SUPER ADMIN ROUTES ======================= */}
      <Route 
        path="/superadmin/dashboard" 
        element={
          // <PrivateRoute role="superadmin"> // Tambahkan ini setelah middleware dibuat
            <DashboardAdmin />
          // </PrivateRoute>
        } 
      />
      {/* Tambahkan route Super Admin lainnya di sini (e.g., /superadmin/masjid) */}

      {/* ======================= TAKMIR ROUTES ======================= */}
      <Route 
        path="/takmir/dashboard" 
        element={
          // <PrivateRoute role="takmir"> // Tambahkan ini setelah middleware dibuat
            <DashboardTakmir />
          // </PrivateRoute>
        } 
      />
      {/* Tambahkan route Takmir lainnya di sini (e.g., /takmir/keuangan) */}
      
      {/* ======================= 404/NOT FOUND ======================= */}
      <Route path="*" element={<PublicLayout><h1>404 | Halaman Tidak Ditemukan</h1></PublicLayout>} />

    </Routes>
  );
}

export default App;