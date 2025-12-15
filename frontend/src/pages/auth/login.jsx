import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/auth.css'; 

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await login(email, password);
            
            // --- DEBUGGING: Lihat isi respon di Console ---
            console.log("FULL RESPONSE:", response);

            // --- DETEKSI DATA USER ---
            // Kadang data ada di 'response', kadang di 'response.data' (tergantung axios)
            const data = response.data || response; 
            
            // --- DETEKSI ROLE ---
            // Cari role di berbagai kemungkinan lokasi
            const userRole = data.role || data.user?.role || response.role;

            console.log("ROLE DETECTED:", userRole);

            if (userRole === 'super admin') {
                navigate('/superadmin/dashboard', { replace: true });
            } else if (userRole === 'takmir') {
                navigate('/takmir/dashboard', { replace: true });
            } else {
                // Jika login sukses tapi role tidak terbaca
                setError('Login berhasil, tapi Role tidak dikenali. Cek Console (F12).');
            }
        } catch (err) {
            // Jika backend menolak (password salah / user tak ditemukan)
            console.error(err);
            setError(err.response?.data?.message || 'Email atau password salah');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="card login-card">
                <div className="card-body p-0">
                    <h3 className="login-title">Login System</h3>
                    <p className="login-subtitle">Manajemen Masjid</p>

                    {error && (
                        <div className="alert alert-danger py-2 text-center" role="alert">
                            <small>{error}</small>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold small">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@test.com"
                                disabled={loading}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold small">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Masukkan password"
                                disabled={loading}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-login"
                            disabled={loading}
                        >
                            {loading ? (
                                <span><span className="spinner-border spinner-border-sm me-2"></span>Loading...</span>
                            ) : 'Masuk'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;