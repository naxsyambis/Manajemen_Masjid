import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageMasjid = () => {
    const [masjidList, setMasjidList] = useState([]);
    const [availableTakmirs, setAvailableTakmirs] = useState([]); // State untuk dropdown
    const [formData, setFormData] = useState({ 
        nama_masjid: '', alamat: '', no_hp: '', deskripsi: '', user_id: '' 
    });
    const [loading, setLoading] = useState(false);

    // Fungsi untuk mengambil data masjid dan takmir sekaligus
    const fetchData = async () => {
        try {
            const resM = await axios.get('http://localhost:3000/api/superadmin/masjid');
            const resT = await axios.get('http://localhost:3000/api/superadmin/unassigned-takmirs');
            
            setMasjidList(resM.data);
            setAvailableTakmirs(resT.data); // Data takmir masuk ke sini
        } catch (err) { 
            console.error("Gagal mengambil data dari server:", err); 
        }
    };

    // Panggil fetchData saat halaman pertama kali dibuka
    useEffect(() => { 
        fetchData(); 
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Gunakan endpoint masjid-with-takmir agar relasi tersimpan
            await axios.post('http://localhost:3000/api/superadmin/masjid-with-takmir', formData);
            alert("Masjid Berhasil Ditambahkan!");
            setFormData({ nama_masjid: '', alamat: '', no_hp: '', deskripsi: '', user_id: '' });
            fetchData(); // Refresh data agar takmir yang sudah dipilih hilang dari daftar
        } catch (err) { 
            alert("Gagal menambah masjid"); 
        } finally { 
            setLoading(false); 
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Hapus masjid ini?")) {
            try {
                await axios.delete(`http://localhost:3000/api/superadmin/masjid/${id}`);
                fetchData();
            } catch (err) { alert(err.response?.data?.message); }
        }
    };

    return (
        <div className="container-fluid animate__animated animate__fadeIn">
            <h3 className="fw-bold mb-4 text-dark">Unit Masjid Ranting</h3>
            <div className="row g-4">
                <div className="col-lg-4">
                    <div className="card border-0 shadow-sm rounded-4 p-4">
                        <h5 className="fw-bold mb-3">Registrasi Masjid Baru</h5>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label small fw-bold">Nama Masjid</label>
                                <input type="text" className="form-control" value={formData.nama_masjid} required
                                    onChange={e => setFormData({...formData, nama_masjid: e.target.value})} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold">Alamat</label>
                                <textarea className="form-control" rows="2" value={formData.alamat} required
                                    onChange={e => setFormData({...formData, alamat: e.target.value})}></textarea>
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold">No. HP (CP)</label>
                                <input type="text" className="form-control" value={formData.no_hp} required
                                    onChange={e => setFormData({...formData, no_hp: e.target.value})} />
                            </div>
                            
                            <div className="mb-4">
                                <label className="form-label small fw-bold text-primary">Pilih Takmir Penanggung Jawab</label>
                                <select className="form-select border-primary" required
                                    value={formData.user_id} onChange={e => setFormData({...formData, user_id: e.target.value})}>
                                    <option value="">-- Pilih Takmir Tersedia --</option>
                                    {availableTakmirs.length > 0 ? (
                                        availableTakmirs.map(t => (
                                            <option key={t.user_id} value={t.user_id}>{t.nama}</option>
                                        ))
                                    ) : (
                                        <option disabled>Tidak ada takmir tersedia</option>
                                    )}
                                </select>
                            </div>

                            <button className="btn btn-primary w-100 py-2 fw-bold" disabled={loading}>
                                {loading ? 'Memproses...' : 'Simpan Unit Masjid'}
                            </button>
                        </form>
                    </div>
                </div>
                {/* Bagian tabel tetap sama */}
                <div className="col-lg-8">
                    <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                        <table className="table align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th className="px-4 py-3">NAMA MASJID</th>
                                    <th>ALAMAT & KONTAK</th>
                                    <th className="text-end px-4">AKSI</th>
                                </tr>
                            </thead>
                            <tbody>
                                {masjidList.map((m) => (
                                    <tr key={m.masjid_id}>
                                        <td className="px-4 fw-bold">{m.nama_masjid}</td>
                                        <td>{m.alamat}</td>
                                        <td className="text-end px-4">
                                            <button onClick={() => handleDelete(m.masjid_id)} className="btn btn-sm btn-outline-danger border-0">
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageMasjid;