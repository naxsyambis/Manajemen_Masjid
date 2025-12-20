import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { register } from '../../api/auth.api';
import '../../styles/auth.css';

const CreateTakmir = () => {
    const [masjids, setMasjids] = useState([]);
    const [takmirs, setTakmirs] = useState([]);

    const [formData, setFormData] = useState({
        nama: '',
        email: '',
        password: '',
        masjid_id: '',
        role: 'takmir'
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchMasjids();
        fetchTakmirs();
    }, []);

    const fetchMasjids = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/superadmin/masjids');
            setMasjids(res.data);
        } catch (err) {
            console.error('Gagal mengambil masjid');
        }
    };

    const fetchTakmirs = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/superadmin/takmirs');
            setTakmirs(res.data);
        } catch (err) {
            console.error('Gagal mengambil takmir');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            // Register user takmir
            const res = await register(formData);

            setMessage(res.data.message || 'Takmir berhasil ditambahkan');

            setFormData({
                nama: '',
                email: '',
                password: '',
                masjid_id: '',
                role: 'takmir'
            });

            fetchTakmirs();
        } catch (err) {
            setError(err.response?.data?.message || 'Gagal menambahkan takmir');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Hapus takmir ini?')) return;

        try {
            await axios.delete(`http://localhost:3000/api/superadmin/takmir/${id}`);
            fetchTakmirs();
        } catch (err) {
            alert('Gagal menghapus takmir');
        }
    };

    return (
        <div className="container-fluid py-4">
            <div className="row g-4">

                {/* FORM TAMBAH TAKMIR */}
                <div className="col-md-4">
                    <div className="auth-card p-4">
                        <h5 className="fw-bold mb-4 text-center">Tambah Takmir Baru</h5>

                        {message && <div className="alert alert-success py-2 text-center">{message}</div>}
                        {error && <div className="alert alert-danger py-2 text-center">{error}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label small fw-bold">Nama Lengkap</label>
                                <input
                                    type="text"
                                    name="nama"
                                    className="form-control"
                                    value={formData.nama}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label small fw-bold">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label small fw-bold">Password Sementara</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* <div className="mb-4">
                                <label className="form-label small fw-bold">Masjid</label>
                                <select
                                    name="masjid_id"
                                    className="form-select"
                                    value={formData.masjid_id}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Pilih Masjid</option>
                                    {masjids.map(m => (
                                        <option key={m.masjid_id} value={m.masjid_id}>
                                            {m.nama_masjid}
                                        </option>
                                    ))}
                                </select>
                            </div> */}

                            <button
                                type="submit"
                                className="btn-login"
                                disabled={loading}
                            >
                                {loading ? 'Menyimpan...' : 'Daftarkan Takmir'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* LIST TAKMIR */}
                <div className="col-md-8">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                        <div className="card-header bg-white border-0 py-3">
                            <h5 className="fw-bold mb-0">Daftar Takmir</h5>
                        </div>

                        <div className="table-responsive">
                            <table className="table align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="px-4">TAKMIR</th>
                                        <th>MASJID</th>
                                        <th className="text-end px-4">AKSI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {takmirs.length > 0 ? takmirs.map(t => (
                                        <tr key={t.user_id}>
                                            <td className="px-4">
                                                <strong>{t.nama}</strong><br />
                                                <small className="text-muted">{t.email}</small>
                                            </td>
                                            <td>{t.nama_masjid || 'Belum diatur'}</td>
                                            <td className="text-end px-4">
                                                <button
                                                    onClick={() => handleDelete(t.user_id)}
                                                    className="btn btn-sm btn-outline-danger"
                                                >
                                                    Hapus
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="3" className="text-center py-4 text-muted">
                                                Belum ada takmir
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CreateTakmir;
