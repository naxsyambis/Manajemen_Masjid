import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import PublicLayout from '../layouts/publicLayout';
import { useNavigate } from 'react-router-dom';
import './auth.css';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    role: 'takmir', // Default role
    masjid_id: ''   // Harus diisi ID masjid yang valid (Manual dulu untuk testing)
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validasi sederhana: pastikan ID masjid diisi jika role takmir
    if (formData.role === 'takmir' && !formData.masjid_id) {
        setError("ID Masjid wajib diisi untuk Takmir");
        return;
    }

    const result = await register(formData);
    
    if (result.success) {
      setSuccess('Registrasi berhasil! Silakan login.');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError(result.message);
    }
  };

  return (
    <PublicLayout>
      <div style={{...styles.container, minHeight: '90vh'}}>
        <div style={styles.card}>
          <h2 style={styles.title}>Daftar Akun Baru</h2>
          {error && <div style={styles.errorAlert}>{error}</div>}
          {success && <div style={{...styles.errorAlert, backgroundColor: '#dcfce7', color: '#166534'}}>{success}</div>}

          <form onSubmit={handleSubmit}>
            {/* Nama */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Nama Lengkap</label>
              <input type="text" name="nama" onChange={handleChange} style={styles.input} required />
            </div>

            {/* Email */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input type="email" name="email" onChange={handleChange} style={styles.input} required />
            </div>

            {/* Password */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input type="password" name="password" onChange={handleChange} style={styles.input} required />
            </div>

            {/* Role Selection */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>Daftar Sebagai</label>
              <select name="role" onChange={handleChange} style={styles.input} value={formData.role}>
                <option value="takmir">Takmir Masjid</option>
                <option value="super admin">Super Admin (Ranting)</option>
              </select>
            </div>

            {/* Masjid ID (Khusus Takmir) */}
             <div style={styles.inputGroup}>
                <label style={styles.label}>ID Masjid (Manual Input)</label>
                <input 
                  type="number" 
                  name="masjid_id" 
                  onChange={handleChange} 
                  style={styles.input} 
                  placeholder="Contoh: 1"
                />
                <small style={{color: '#888'}}>*Masukkan ID dari database tabel masjid</small>
            </div>

            <button type="submit" style={styles.button}>Daftar</button>
          </form>
        </div>
      </div>
    </PublicLayout>
  );
};

// Gunakan styles yang sama dengan Login
const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', backgroundColor: '#f5f5f5' },
    card: { width: '100%', maxWidth: '400px', padding: '2rem', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    title: { textAlign: 'center', color: '#333', marginBottom: '1.5rem' },
    inputGroup: { marginBottom: '1rem' },
    label: { display: 'block', marginBottom: '0.5rem', color: '#333', fontSize: '0.9rem' },
    input: { width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #ddd', fontSize: '1rem', boxSizing: 'border-box' },
    button: { width: '100%', padding: '0.75rem', backgroundColor: '#00A859', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' },
    errorAlert: { padding: '0.75rem', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '4px', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' },
};

export default RegisterPage;