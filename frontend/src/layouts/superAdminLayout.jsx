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

    return (
        <div className="d-flex" style={{ minHeight: '100vh', background: '#f4f7fe' }}>
            {/* Sidebar */}
            <div className="bg-dark text-white p-4" style={{ width: '260px' }}>
                <h4 className="fw-bold mb-5">Admin Masjid</h4>
                <nav className="nav flex-column">
                    <Link to="/superadmin/dashboard" className="nav-link text-white mb-3 opacity-75 hover-opacity-100">Dashboard</Link>
                    <Link to="/superadmin/create-takmir" className="nav-link text-white mb-3 opacity-75">Manajemen Takmir</Link>
                    <button onClick={handleLogout} className="btn btn-outline-danger btn-sm mt-5">Keluar</button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1">
                <header className="bg-white p-3 shadow-sm d-flex justify-content-end align-items-center">
                    <span className="me-3 text-muted">Halo, <strong>{user?.nama}</strong></span>
                </header>
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default SuperAdminLayout;