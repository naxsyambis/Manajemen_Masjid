import React from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../styles/superAdminLayout.css'; // Import CSS Custom tadi

const SuperAdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // Untuk menandai menu aktif

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Helper untuk class menu aktif
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="d-flex">
      {/* SIDEBAR */}
      <aside className="sidebar d-flex flex-column">
        <div className="p-4 text-center border-bottom border-secondary">
          <h4 className="fw-bold m-0">Admin Masjid</h4>
          <small className="text-white-50">Panel Kontrol</small>
        </div>
        
        <nav className="sidebar-nav mt-4 flex-grow-1">
          <Link to="/superadmin/dashboard" className={`nav-link ${isActive('/superadmin/dashboard')}`}>
            <i className="bi bi-speedometer2 me-2"></i> Dashboard
          </Link>
          <Link to="/superadmin/masjid" className={`nav-link ${isActive('/superadmin/masjid')}`}>
            <i className="bi bi-building me-2"></i> Data Masjid
          </Link>
          <Link to="/superadmin/users" className={`nav-link ${isActive('/superadmin/users')}`}>
            <i className="bi bi-people me-2"></i> Manajemen Takmir
          </Link>
        </nav>

        <div className="p-3">
          <button onClick={handleLogout} className="btn btn-danger w-100">
            Keluar
          </button>
        </div>
      </aside>

      {/* KONTEN UTAMA */}
      <main className="main-content bg-light">
        {/* Header Sederhana */}
        <header className="d-flex justify-content-between align-items-center mb-4 p-3 bg-white shadow-sm rounded">
          <h5 className="m-0">Halo, {user?.nama || 'Super Admin'}! 👋</h5>
          <span className="badge bg-primary">Ranting</span>
        </header>

        {/* Isi Halaman */}
        <div className="container-fluid p-0">
            <Outlet /> 
        </div>
      </main>
    </div>
  );
};

export default SuperAdminLayout;