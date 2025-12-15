import React from 'react';

const DashboardAdmin = () => {
    return (
        <div>
            <h3 className="mb-4">Ringkasan Statistik</h3>
            
            <div className="row g-4">
                {/* Kartu 1: Total Masjid */}
                <div className="col-md-4">
                    <div className="card text-white bg-primary shadow-sm h-100">
                        <div className="card-body">
                            <h6 className="card-title text-uppercase mb-2 opacity-75">Total Masjid</h6>
                            <h2 className="display-6 fw-bold">12</h2>
                            <p className="card-text"><small>Terdaftar di sistem</small></p>
                        </div>
                    </div>
                </div>

                {/* Kartu 2: Total Takmir */}
                <div className="col-md-4">
                    <div className="card text-white bg-success shadow-sm h-100">
                        <div className="card-body">
                            <h6 className="card-title text-uppercase mb-2 opacity-75">Total Takmir</h6>
                            <h2 className="display-6 fw-bold">45</h2>
                            <p className="card-text"><small>Pengurus aktif</small></p>
                        </div>
                    </div>
                </div>

                {/* Kartu 3: Laporan Masuk */}
                <div className="col-md-4">
                    <div className="card text-white bg-warning shadow-sm h-100">
                        <div className="card-body">
                            <h6 className="card-title text-uppercase mb-2 opacity-75 text-dark">Laporan Bulan Ini</h6>
                            <h2 className="display-6 fw-bold text-dark">8</h2>
                            <p className="card-text text-dark"><small>Belum direview</small></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bagian Konten Tambahan */}
            <div className="row mt-5">
                <div className="col-12">
                    <div className="card shadow-sm">
                        <div className="card-header bg-white py-3">
                            <h5 className="m-0 fw-bold">Aktivitas Terbaru</h5>
                        </div>
                        <div className="card-body">
                            <div className="alert alert-info">
                                Sistem berjalan normal. Belum ada aktivitas krusial hari ini.
                            </div>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Tanggal</th>
                                        <th>Masjid</th>
                                        <th>Aktivitas</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>15 Des 2025</td>
                                        <td>Masjid Al-Falah</td>
                                        <td>Input Laporan Keuangan</td>
                                        <td><span className="badge bg-success">Selesai</span></td>
                                    </tr>
                                    <tr>
                                        <td>14 Des 2025</td>
                                        <td>Masjid An-Nur</td>
                                        <td>Registrasi Takmir Baru</td>
                                        <td><span className="badge bg-warning text-dark">Pending</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardAdmin;