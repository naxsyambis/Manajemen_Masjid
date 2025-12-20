import React, { useEffect, useState } from 'react';
import axios from 'axios';

const cardStyle = {
    borderRadius: '16px',
    boxShadow: '0 10px 28px rgba(0,0,0,0.06)',
    border: 'none'
};

const statCard = (color) => ({
    ...cardStyle,
    borderLeft: `6px solid ${color}`,
    height: '100%'
});

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
        <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
            <div className="spinner-border text-primary" />
        </div>
    );

    return (
        <div className="container-fluid py-4" style={{ background: '#f4f6f9', minHeight: '100vh' }}>

            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-white"
                style={cardStyle}>
                <div>
                    <h4 className="fw-bold mb-1">Dashboard Ranting Panjangrejo</h4>
                    <small className="text-muted">Sistem Manajemen Masjid</small>
                </div>
                <span className="badge bg-light text-dark border px-3 py-2 rounded-pill">
                    {new Date().toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </span>
            </div>

            {/* STAT CARDS */}
            <div className="row g-4 mb-5">
                <div className="col-md-6 col-lg-3">
                    <div className="p-4 bg-white" style={statCard('#0d6efd')}>
                        <div className="text-uppercase small fw-bold text-muted">Total Masjid</div>
                        <div className="fs-2 fw-bold mt-2">{stats.summary.total_masjid}</div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-3">
                    <div className="p-4 bg-white" style={statCard('#198754')}>
                        <div className="text-uppercase small fw-bold text-muted">Total Takmir</div>
                        <div className="fs-2 fw-bold mt-2">{stats.summary.total_takmir}</div>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                {/* TABLE KEUANGAN */}
                <div className="col-lg-8">
                    <div className="bg-white" style={cardStyle}>
                        <div className="p-3 border-bottom">
                            <h5 className="fw-bold mb-0">Kondisi Keuangan Masjid</h5>
                        </div>

                        <div className="table-responsive">
                            <table className="table align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="px-4">Nama Masjid</th>
                                        <th>Pemasukan</th>
                                        <th>Pengeluaran</th>
                                        <th>Saldo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.keuangan.map((m, i) => (
                                        <tr key={i}>
                                            <td className="px-4 fw-medium">{m.nama_masjid}</td>
                                            <td className="text-success">
                                                Rp {Number(m.total_masuk).toLocaleString('id-ID')}
                                            </td>
                                            <td className="text-danger">
                                                Rp {Number(m.total_keluar).toLocaleString('id-ID')}
                                            </td>
                                            <td className="fw-bold">
                                                Rp {(m.total_masuk - m.total_keluar).toLocaleString('id-ID')}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* AKTIVITAS */}
                <div className="col-lg-4">
                    <div className="bg-white h-100" style={cardStyle}>
                        <div className="p-3 border-bottom">
                            <h5 className="fw-bold mb-0">Aktivitas Terbaru</h5>
                        </div>

                        <div className="list-group list-group-flush">
                            {stats.aktivitas.length > 0 ? stats.aktivitas.map((a, i) => (
                                <div key={i} className="list-group-item p-3 border-0 border-bottom">
                                    <div className="d-flex justify-content-between">
                                        <small className="text-muted">
                                            {new Date(a.created_at).toLocaleTimeString()}
                                        </small>
                                        <span className="badge bg-primary-subtle text-primary rounded-pill small">
                                            {a.action}
                                        </span>
                                    </div>
                                    <p className="mb-1 mt-2 small">
                                        <strong>{a.nama}</strong> mengedit <strong>{a.nama_tabel}</strong>
                                    </p>
                                    <small className="text-secondary">
                                        {a.nama_masjid || 'Sistem'}
                                    </small>
                                </div>
                            )) : (
                                <div className="p-4 text-center text-muted">
                                    Belum ada aktivitas.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DashboardAdmin;
