import React from 'react';
import './dashboard.css'; // Buat file css ini untuk styling dashboard

const DashboardAdmin = () => {
    // Data dummy (Nanti diganti fetch API)
    const stats = {
        totalMasjid: 12,
        totalSaldo: 150000000,
        totalPemasukanBulanIni: 25000000,
        totalPengeluaranBulanIni: 10000000
    };

    return (
        <div className="dashboard-content">
            {/* 1. KARTU RINGKASAN */}
            <div className="stats-grid">
                <div className="stat-card blue">
                    <h3>Total Masjid</h3>
                    <p className="stat-number">{stats.totalMasjid}</p>
                    <small>Terdaftar dalam sistem</small>
                </div>
                <div className="stat-card green">
                    <h3>Saldo Gabungan</h3>
                    <p className="stat-number">Rp {stats.totalSaldo.toLocaleString('id-ID')}</p>
                    <small>Seluruh Masjid</small>
                </div>
                <div className="stat-card orange">
                    <h3>Pemasukan (Bulan Ini)</h3>
                    <p className="stat-number">Rp {stats.totalPemasukanBulanIni.toLocaleString('id-ID')}</p>
                </div>
                <div className="stat-card red">
                    <h3>Pengeluaran (Bulan Ini)</h3>
                    <p className="stat-number">Rp {stats.totalPengeluaranBulanIni.toLocaleString('id-ID')}</p>
                </div>
            </div>

            {/* 2. TABEL MONITORING MASJID */}
            <div className="recent-activity-section">
                <h3>Monitoring Aktivitas Masjid</h3>
                <div className="table-responsive">
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Nama Masjid</th>
                                <th>Alamat</th>
                                <th>Saldo Terkini</th>
                                <th>Status Laporan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Dummy Data */}
                            <tr>
                                <td>Masjid Al-Ikhlas</td>
                                <td>Jl. Merdeka No. 1</td>
                                <td>Rp 50.000.000</td>
                                <td><span className="badge success">Aman</span></td>
                            </tr>
                            <tr>
                                <td>Masjid An-Nur</td>
                                <td>Jl. Sudirman No. 45</td>
                                <td>Rp 12.500.000</td>
                                <td><span className="badge warning">Belum Lapor</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;