// src/layouts/SuperAdminLayout.jsx
import React from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './SuperAdminLayout.css'; // Kita akan buat CSS-nya setelah ini

const SuperAdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-container">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h3>Admin Ranting</h3>
          <p>Super Admin</p>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/superadmin/dashboard" className="nav-item">
            📊 Dashboard
          </Link>
          <Link to="/superadmin/masjid" className="nav-item">
            🕌 Data Masjid
          </Link>
          <Link to="/superadmin/users" className="nav-item">
            👥 Manajemen Takmir
          </Link>
          <Link to="/superadmin/laporan" className="nav-item">
            📑 Laporan Gabungan
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="btn-logout">
            Keluar
          </button>
        </div>
      </aside>

      {/* KONTEN UTAMA */}
      <main className="main-content">
        <header className="top-bar">
          <h2>Selamat Datang, {user?.nama || 'Admin'}</h2>
        </header>
        <div className="content-area">
          {/* Outlet ini akan merender halaman anak (Dashboard, Users, dll) */}
          <Outlet /> 
        </div>
      </main>
    </div>
  );
};

export default SuperAdminLayout;