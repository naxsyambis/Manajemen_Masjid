import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    role: 'takmir', 
    masjid_id: '' 
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

    if (formData.role === 'takmir' && !formData.masjid_id) {
        setError("ID Masjid wajib diisi untuk Takmir");
        return;
    }

    try {
        const result = await register(formData);
        
        // Asumsi: jika berhasil, result tidak error
        if (result) {
            setSuccess('Registrasi berhasil! Silakan login.');
            setTimeout(() => navigate('/login'), 2000);
        }
    } catch (err) {
        setError(err.message || 'Gagal mendaftar');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Daftar Akun Baru</h2>
        <p className="auth-subtitle">Buat akun pengurus masjid</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="error-message" style={{backgroundColor: '#dcfce7', color: '#166534', borderColor: '#bbf7d0'}}>{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nama Lengkap</label>
            <input type="text" name="nama" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Daftar Sebagai</label>
            <select name="role" onChange={handleChange} value={formData.role}>
              <option value="takmir">Takmir Masjid</option>
              <option value="super admin">Super Admin (Ranting)</option>
            </select>
          </div>

          {/* Field khusus Takmir */}
          {formData.role === 'takmir' && (
              <div className="form-group">
                <label>ID Masjid (Manual Input)</label>
                <input 
                  type="number" 
                  name="masjid_id" 
                  onChange={handleChange} 
                  placeholder="Contoh: 1"
                />
                <small style={{color: '#888', fontSize:'0.8rem'}}>*Masukkan ID dari database tabel masjid</small>
              </div>
          )}

          <button type="submit" className="btn-primary">Daftar Sekarang</button>
        </form>

        <div className="auth-footer">
           <p>Sudah punya akun? <Link to="/login">Login di sini</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;