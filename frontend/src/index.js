import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth'; 
import App from './App'; 

// --- IMPORT BOOTSTRAP DISINI ---
import 'bootstrap/dist/css/bootstrap.min.css';
// Import custom styles kita (jika ada)
import './styles/app.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Jika ada AuthProvider, letakkan di sini */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);