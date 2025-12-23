// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import PublicLayout from './layouts/publicLayout';
import SuperAdminLayout from './layouts/superAdminLayout';
import Login from './pages/auth/login';
import SuperAdminDashboard from './pages/superadmin/dashboard';
import CreateTakmir from './pages/superadmin/createTakmir';
import TakmirDashboard from './pages/takmir/dashboard';
import ManageMasjid from './pages/superadmin/manageMasjid';
import ManageTakmirAssignment from './pages/superadmin/manageTakmirAssignment';
import LandingPage from './pages/public/landingPage';
import NewsPage from './pages/public/newsPage';
import MasjidPage from './pages/public/masjidPage';
import ProfilePage from './pages/public/profilePage';



const ProtectedRoute = ({ children, allowedRole }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    
    if (!user) return <Navigate to="/login" replace />;

    // Normalisasi role agar tidak sensitif terhadap spasi/huruf kapital
    const userRole = user.role.toLowerCase().replace(/\s/g, '');
    if (allowedRole && userRole !== allowedRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />

                <Route element={<PublicLayout />}>
                    <Route path="/login" element={<Login />} />
                </Route>

                <Route path="/berita" element={<NewsPage />} />

                <Route path="/masjid" element={<MasjidPage />} />

                <Route path="/profil" element={<ProfilePage />} />

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
                    <Route path="manage-masjid" element={<ManageMasjid />} />
                    <Route path="manage-takmir-assignment" element={<ManageTakmirAssignment />} />
                </Route>

                <Route 
                    path="/takmir" 
                    element={
                        <ProtectedRoute allowedRole="takmir">
                            <TakmirDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* <Route path="manage-masjid" 
                element={<ManageMasjid />} /> */}

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;