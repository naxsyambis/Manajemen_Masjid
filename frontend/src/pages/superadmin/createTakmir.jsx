import React, { useState } from 'react';
import { register } from '../../api/auth.api';
import '../../styles/auth.css'; 

const CreateTakmir = () => {
    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        password: '',
        role: 'takmir', 
        foto_tanda_tangan: null
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        
        try {
            const response = await register(formData);
            setMessage("Berjaya: " + response.message);
            // Reset borang selepas berjaya
            setFormData({ nama: '', email: '', password: '', role: 'takmir', foto_tanda_tangan: null });
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal menambahkan takmir');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <div className="auth-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Tambah Takmir Baru</h2>
                
                {message && <div style={{ color: 'green', marginBottom: '15px', textAlign: 'center' }}>{message}</div>}
                {error && <div style={{ color: 'red', marginBottom: '15px', textAlign: 'center' }}>{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nama Penuh</label>
                        <input 
                            type="text" 
                            name="nama" 
                            className="form-control"
                            value={formData.nama} 
                            onChange={handleChange} 
                            placeholder="Masukkan nama takmir"
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            className="form-control"
                            value={formData.email} 
                            onChange={handleChange} 
                            placeholder="email@contoh.com"
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Password Sementara</label>
                        <input 
                            type="password" 
                            name="password" 
                            className="form-control"
                            value={formData.password} 
                            onChange={handleChange} 
                            placeholder="Min 6 karakter"
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label>Role</label>
                        <input 
                            type="text" 
                            name="role" 
                            className="form-control"
                            value={formData.role} 
                            readOnly 
                        />
                    </div>
                    <button type="submit" className="btn-login" style={{ width: '100%', marginTop: '10px' }}>
                        Daftarkan Takmir
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateTakmir;