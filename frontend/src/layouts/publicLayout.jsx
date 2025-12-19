import React from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
    return (
        <div className="public-layout">
            {/* Header ini yang menyebabkan Anda hanya melihat tulisan saja sebelumnya */}
            <header style={{ padding: '20px', background: '#2c3e50', color: 'white', textAlign: 'center' }}>
                <h1>Sistem Manajemen Masjid</h1>
            </header>
            
            <main style={{ padding: '20px' }}>
                {/* Outlet adalah kunci! Ini tempat komponen Login muncul */}
                <Outlet /> 
            </main>
        </div>
    );
};

export default PublicLayout;