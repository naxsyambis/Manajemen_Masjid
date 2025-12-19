import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import Layouts
import PublicLayout from './layouts/publicLayout';
import SuperAdminLayout from './layouts/superAdminLayout';

// Import Pages
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import SuperAdminDashboard from './pages/superadmin/dashboard';
import CreateTakmir from './pages/superadmin/createTakmir'; 
import TakmirDashboard from './pages/takmir/dashboard';

import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <Routes>
      {/* Rute Publik */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Navigate to="/login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Rute Super Admin */}
      <Route 
        path="/superadmin" 
        element={
          user && user.role === 'superadmin' ? (
            <SuperAdminLayout />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="create-takmir" element={<CreateTakmir />} />
      </Route>

      {/* Rute Takmir */}
      <Route 
        path="/takmir" 
        element={
          user && user.role === 'takmir' ? (
            <TakmirDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      >
        <Route path="dashboard" element={<TakmirDashboard />} />
      </Route>

      {/* Jika link ngawur, lempar ke login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;