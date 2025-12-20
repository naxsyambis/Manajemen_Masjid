import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const SuperAdminLayout = () => {
    const { logoutAction, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutAction();
        navigate('/login');
    };

    const isActive = (path) => location.pathname.includes(path) ? 'bg-primary shadow-sm active' : 'text-white-50';

 return (
        <div className="d-flex" style={{ minHeight: '100vh', background: '#f8f9fa' }}>
            {/* Sidebar */}
            <div className="bg-dark text-white p-4 shadow" style={{ width: '280px', position: 'fixed', height: '100vh', zIndex: 1000 }}>
                <div className="text-center mb-5">
                    <h4 className="fw-bold text-white mb-0">MASJID <span className="text-primary">APP</span></h4>
                    <small className="text-muted">Manajemen Terpusat</small>
                </div>
                
                <nav className="nav flex-column gap-2">
                    <Link to="/superadmin/dashboard" className={`nav-link p-3 rounded-3 transition-all ${isActive('/dashboard')}`}>
                        <i className="bi bi-speedometer2 me-2"></i> Dashboard
                    </Link>
                    <Link to="/superadmin/create-takmir" className={`nav-link p-3 rounded-3 transition-all ${isActive('/create-takmir')}`}>
                        <i className="bi bi-person-plus me-2"></i> Manajemen Takmir
                    </Link>
                    <Link to="/superadmin/manage-masjid" className={`nav-link p-3 rounded-3 transition-all ${isActive('/manage-masjid')}`}>
                        🏢 Unit Masjid
                    </Link>
                </nav>

                <div style={{ position: 'absolute', bottom: '30px', width: 'calc(280px - 48px)' }}>
                    <button onClick={handleLogout} className="btn btn-outline-danger w-100 py-2">
                        <i className="bi bi-box-arrow-left me-2"></i> Keluar
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1" style={{ marginLeft: '280px' }}>
                <header className="bg-white p-3 shadow-sm d-flex justify-content-between align-items-center sticky-top">
                    <span className="text-muted fw-medium">Halo, <strong className="text-dark">{user?.nama}</strong></span>
                    <div className="badge bg-primary-subtle text-primary rounded-pill px-3 py-2">Super Admin</div>
                </header>
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default SuperAdminLayout;