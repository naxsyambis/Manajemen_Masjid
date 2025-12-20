import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { login as loginApi } from '../../api/auth.api'; // Import fungsi API yang benar
import '../../styles/auth.css'; 

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { loginAction } = useAuth(); // Gunakan loginAction dari context
    const navigate = useNavigate();

const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await loginApi(email, password);
            const userData = response.data;

            // Simpan ke Context & LocalStorage
            loginAction(userData);

            // Navigasi berdasarkan role hasil pemetaan backend
            if (userData.role === 'superadmin') {
                navigate('/superadmin/dashboard', { replace: true });
            } else if (userData.role === 'takmir') {
                navigate('/takmir/dashboard', { replace: true });
            } else {
                setError('Role tidak dikenali: ' + userData.role);
            }
        } catch (err) {
            // Menampilkan pesan error asli dari backend (misal: "Email tidak ditemukan")
            setError(err.response?.data?.message || 'Gagal terhubung ke server');
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
                                placeholder="email@example.com"
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
                            {loading ? 'Loading...' : 'Masuk'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;