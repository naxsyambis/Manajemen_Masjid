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

    if (loading) return <div className="text-center mt-5">Memuat Data...</div>;

    return (
        <div className="container-fluid">
            <h3 className="mb-4">Dashboard Ranting Muhammadiyah</h3>
            
            <div className="row g-4 mb-5">
                <div className="col-md-6 col-lg-3">
                    <div className="card bg-primary text-white shadow-sm border-0">
                        <div className="card-body">
                            <h6 className="opacity-75">Total Masjid</h6>
                            <h2 className="fw-bold">{stats.summary.total_masjid}</h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-3">
                    <div className="card bg-success text-white shadow-sm border-0">
                        <div className="card-body">
                            <h6 className="opacity-75">Total Takmir</h6>
                            <h2 className="fw-bold">{stats.summary.total_takmir}</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                {/* Tabel Ringkasan Keuangan per Masjid */}
                <div className="col-lg-8">
                    <div className="card shadow-sm mb-4">
                        <div className="card-header bg-white">
                            <h5 className="mb-0">Kondisi Keuangan Masjid</h5>
                        </div>
                        <div className="card-body p-0">
                            <table className="table table-hover mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th>Nama Masjid</th>
                                        <th>Pemasukan</th>
                                        <th>Pengeluaran</th>
                                        <th>Saldo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stats.keuangan.map((m, i) => (
                                        <tr key={i}>
                                            <td>{m.nama_masjid}</td>
                                            <td className="text-success">Rp {Number(m.total_masuk).toLocaleString()}</td>
                                            <td className="text-danger">Rp {Number(m.total_keluar).toLocaleString()}</td>
                                            <td className="fw-bold">Rp {(m.total_masuk - m.total_keluar).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Aktivitas Terbaru */}
                <div className="col-lg-4">
                    <div className="card shadow-sm">
                        <div className="card-header bg-white">
                            <h5 className="mb-0">Log Aktivitas</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            {stats.aktivitas.length > 0 ? stats.aktivitas.map((a, i) => (
                                <li key={i} className="list-group-item">
                                    <small className="text-muted">{new Date(a.created_at).toLocaleString()}</small>
                                    <p className="mb-0"><strong>{a.nama}</strong> melakukan <em>{a.action}</em> pada {a.nama_tabel}</p>
                                    <small className="badge bg-light text-dark">{a.nama_masjid || 'Sistem'}</small>
                                </li>
                            )) : <li className="list-group-item">Belum ada aktivitas.</li>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;