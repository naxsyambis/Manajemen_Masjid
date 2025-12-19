import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Layouts
import PublicLayout from './layouts/publicLayout';
import SuperAdminLayout from './layouts/superAdminLayout';

// Pages
import Login from './pages/auth/login';
import SuperAdminDashboard from './pages/superadmin/dashboard';
import CreateTakmir from './pages/superadmin/createTakmir';
import TakmirDashboard from './pages/takmir/dashboard';

// Komponen Proteksi Rute
const ProtectedRoute = ({ children, allowedRole }) => {
    const { user, loading } = useAuth();

    if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading...</div>;
    
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRole && user.role !== allowedRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

function App() {
    return (
        <Router>
            <Routes>
                {/* 1. Rute Publik (Login) */}
                <Route element={<PublicLayout />}>
                    <Route path="/login" element={<Login />} />
                </Route>

                {/* 2. Rute Super Admin */}
                <Route 
                    path="/superadmin" 
                    element={
                        <ProtectedRoute allowedRole="superadmin">
                            <SuperAdminLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route path="dashboard" element={<SuperAdminDashboard />} />
                    <Route path="create-takmir" element={<CreateTakmir />} />
                </Route>

                {/* 3. Rute Takmir */}
                <Route 
                    path="/takmir" 
                    element={
                        <ProtectedRoute allowedRole="takmir">
                            <TakmirDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Pengalihan Default */}
                <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;