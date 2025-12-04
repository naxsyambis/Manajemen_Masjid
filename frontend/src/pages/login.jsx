import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Asumsi menggunakan PublicLayout.jsx
import PublicLayout from '../layouts/publicLayout'; 

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
            
            // Redirect berdasarkan Role setelah login berhasil
            if (userData.role === 'super admin') {
                navigate('/superadmin/dashboard', { replace: true });
            } else if (userData.role === 'takmir') {
                navigate('/takmir/dashboard', { replace: true });
            } else {
                // Handle role lain jika ada, atau default ke dashboard publik
                navigate('/');
            }

        } catch (err) {
            setError(err || 'Terjadi kesalahan saat login.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PublicLayout>
            <div style={styles.container}>
                <div style={styles.card}>
                    <h2>Login Mana Masjid</h2>
                    <p>Masuk sebagai Super Admin atau Takmir</p>

                    <form onSubmit={handleSubmit}>
                        {/* 1. Input Email */}
                        <div style={styles.formGroup}>
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                                required
                            />
                        </div>

                        {/* 2. Input Password */}
                        <div style={styles.formGroup}>
                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                                required
                            />
                        </div>

                        {/* 3. Pesan Error */}
                        {error && <p style={styles.error}>{error}</p>}
                        
                        {/* 4. Tombol Submit */}
                        <button type="submit" disabled={loading} style={styles.button}>
                            {loading ? 'Memproses...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </PublicLayout>
    );
};

// Contoh minimal styling (Anda dapat menggantinya dengan framework CSS)
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
    },
    card: {
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center',
    },
    formGroup: {
        marginBottom: '20px',
        textAlign: 'left',
    },
    error: {
        color: 'red',
        marginBottom: '15px',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    }
};

export default LoginPage;