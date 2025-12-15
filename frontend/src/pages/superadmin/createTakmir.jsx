import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth'; // Sesuaikan path

const CreateTakmir = () => {
    // State Form
    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        password: '',
        masjid_id: '', // Admin harus menentukan user ini untuk masjid mana
        role: 'takmir'
    });
    
    // State Feedback
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Dummy Data Masjid (Nanti diambil dari API GET /api/masjid)
    const daftarMasjid = [
        { id: 1, nama: 'Masjid Al-Ikhlas' },
        { id: 2, nama: 'Masjid An-Nur' },
        { id: 3, nama: 'Musholla Al-Hidayah' },
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            // DISINI PANGGIL API REGISTER / CREATE USER
            // Contoh simulasi:
            console.log('Mengirim data:', formData);
            
            // await api.post('/register', formData); 
            // Anggap sukses:
            setTimeout(() => {
                setMessage({ type: 'success', text: 'Akun Takmir berhasil dibuat!' });
                setFormData({ nama: '', email: '', password: '', masjid_id: '', role: 'takmir' });
                setLoading(false);
            }, 1000);

        } catch (error) {
            setMessage({ type: 'error', text: 'Gagal membuat akun.' });
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '600px', background: 'white', padding: '2rem', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{marginBottom: '20px'}}>Buat Akun Takmir Baru</h2>
            
            {message.text && (
                <div style={{ 
                    padding: '10px', 
                    marginBottom: '15px', 
                    borderRadius: '5px',
                    backgroundColor: message.type === 'success' ? '#dcfce7' : '#fee2e2',
                    color: message.type === 'success' ? '#166534' : '#991b1b'
                }}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nama Lengkap Takmir</label>
                    <input type="text" name="nama" value={formData.nama} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Email Login</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Password Awal</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>

                <div className="form-group">
                    <label>Tugaskan di Masjid:</label>
                    <select name="masjid_id" value={formData.masjid_id} onChange={handleChange} required>
                        <option value="">-- Pilih Masjid --</option>
                        {daftarMasjid.map(masjid => (
                            <option key={masjid.id} value={masjid.id}>
                                {masjid.nama}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Menyimpan...' : 'Buat Akun Takmir'}
                </button>
            </form>
        </div>
    );
};

export default CreateTakmir;