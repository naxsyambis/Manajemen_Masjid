import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './auth.css';

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
            const userData = await login(email, password);

            if (userData.role === 'super admin') {
                navigate('/superadmin/dashboard', { replace: true });
            } else if (userData.role === 'takmir') {
                navigate('/takmir/dashboard', { replace: true });
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.message || 'Email atau password salah');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Login Manajemen Masjid</h2>
                <p className="auth-subtitle">
                    Masuk sebagai Super Admin atau Takmir
                </p>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="contoh@masjid.com"
                            disabled={loading}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Masukkan password"
                            disabled={loading}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Memproses...' : 'Login'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        Belum punya akun?{' '}
                        <Link to="/register">Daftar di sini</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;