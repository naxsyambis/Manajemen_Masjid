import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../styles/superAdminLayout.css';

const SuperAdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="admin-layout">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h3>Super Admin</h3>
                </div>
                <nav className="sidebar-nav">
                    <Link to="/superadmin/dashboard">Dashboard</Link>
                    {/* Tambahkan Link ini */}
                    <Link to="/superadmin/create-takmir">Tambah Takmir</Link> 
                    <button onClick={handleLogout} className="btn-logout">Logout</button>
                </nav>
            </aside>
            <main className="content">
                <Outlet />
            </main>
        </div>
    );
};

export default SuperAdminLayout;