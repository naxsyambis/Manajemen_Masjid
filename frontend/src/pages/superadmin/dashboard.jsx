import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardAdmin = () => {
    const [stats, setStats] = useState({ summary: {}, keuangan: [], aktivitas: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/superadmin/dashboard-stats');
                setStats(res.data);
            } catch (err) {
                console.error("Gagal mengambil data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
            <div className="spinner-grow text-primary" role="status"></div>
        </div>
    );

    return (
        <div className="container-fluid animate__animated animate__fadeIn">
            <div className="mb-4">
                <h3 className="fw-bold text-dark mb-1">Ringkasan Ranting</h3>
                <p className="text-muted small">Pantau performa dan aktivitas masjid secara real-time.</p>
            </div>
            
            {/* Kartu Statistik */}
            <div className="row g-4 mb-5">
                <div className="col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                        <div className="card-body p-4" style={{ borderLeft: '6px solid #0d6efd' }}>
                            <p className="text-muted small fw-bold text-uppercase mb-1">Total Masjid</p>
                            <h2 className="fw-bold mb-0">{stats.summary.total_masjid}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                        <div className="card-body p-4" style={{ borderLeft: '6px solid #198754' }}>
                            <p className="text-muted small fw-bold text-uppercase mb-1">Total Takmir</p>
                            <h2 className="fw-bold mb-0">{stats.summary.total_takmir}</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                {/* Tabel Keuangan */}
                <div className="col-xl-8">
                    <div className="card border-0 shadow-sm rounded-4">
                        <div className="card-header bg-white py-3 border-0 rounded-top-4">
                            <h5 className="mb-0 fw-bold">Kondisi Keuangan Masjid</h5>
                        </div>
                        <div className="table-responsive">
                            <table className="table align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="px-4 py-3 text-muted small">NAMA MASJID</th>
                                        <th className="py-3 text-muted small">PEMASUKAN</th>
                                        <th className="py-3 text-muted small">PENGELUARAN</th>
                                        <th className="py-3 text-muted small text-end px-4">SALDO</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.keuangan.map((m, i) => (
                                        <tr key={i} className="hover-bg-light">
                                            <td className="px-4 fw-medium text-dark">{m.nama_masjid}</td>
                                            <td className="text-success small fw-bold">Rp {Number(m.total_masuk).toLocaleString('id-ID')}</td>
                                            <td className="text-danger small fw-bold">Rp {Number(m.total_keluar).toLocaleString('id-ID')}</td>
                                            <td className="text-end px-4">
                                                <span className="badge bg-primary px-3 py-2 rounded-pill shadow-sm">
                                                    Rp {(m.total_masuk - m.total_keluar).toLocaleString('id-ID')}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Log Aktivitas */}
                <div className="col-xl-4">
                    <div className="card border-0 shadow-sm rounded-4 h-100">
                        <div className="card-header bg-white py-3 border-0 rounded-top-4">
                            <h5 className="mb-0 fw-bold">Aktivitas Terbaru</h5>
                        </div>
                        <div className="card-body p-0">
                            <div className="list-group list-group-flush">
                                {stats.aktivitas.length > 0 ? stats.aktivitas.map((a, i) => (
                                    <div key={i} className="list-group-item p-3 border-0 border-bottom">
                                        <div className="d-flex w-100 justify-content-between mb-1">
                                            <h6 className="mb-0 fw-bold text-dark">{a.nama}</h6>
                                            <small className="text-muted">{new Date(a.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</small>
                                        </div>
                                        <p className="mb-1 small text-muted">Aksi: <span className="text-primary fw-medium">{a.action}</span> di tabel {a.nama_tabel}</p>
                                        <span className="badge bg-light text-dark border small rounded-pill">{a.nama_masjid || 'Sistem'}</span>
                                    </div>
                                )) : <div className="p-4 text-center text-muted small">Belum ada aktivitas terekam.</div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;