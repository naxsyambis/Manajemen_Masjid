import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageMasjid = () => {
    const [masjidList, setMasjidList] = useState([]);
    const [unassignedTakmirs, setUnassignedTakmirs] = useState([]);
    const [formData, setFormData] = useState({ nama_masjid: '', alamat: '', no_hp: '', deskripsi: '' });
    const [loading, setLoading] = useState(false);
    const [availableTakmirs, setAvailableTakmirs] = useState([]);

    const fetchData = async () => {
            try {
                const resM = await axios.get('http://localhost:3000/api/superadmin/masjid');
                const resT = await axios.get('http://localhost:3000/api/superadmin/unassigned-takmirs');
                setMasjidList(resM.data);
                setUnassignedTakmirs(resT.data);
                setAvailableTakmirs(resT.data);
            } catch (err) { console.error(err); }
        };
    
    const fetchMasjids = async () => {
        try {
            const res = await axios.get('http://localhost:3000/api/superadmin/masjid');
            setMasjidList(res.data);
        } catch (err) { console.error(err); }
    };

    useEffect(() => { fetchMasjids(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:3000/api/superadmin/masjid-with-takmir', formData);
            alert("Masjid Berhasil Ditambahkan");
            setFormData({ nama_masjid: '', alamat: '', no_hp: '', deskripsi: '' });
            fetchMasjids();
        } catch (err) { alert("Gagal menambah masjid"); }
        finally { setLoading(false); }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Hapus masjid ini? Seluruh data terkait mungkin akan hilang.")) {
            try {
                await axios.delete(`http://localhost:3000/api/superadmin/masjid/${id}`);
                fetchMasjids();
            } catch (err) { alert(err.response.data.message); }
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
                                    {availableTakmirs.map(t => (
                                        <option key={t.user_id} value={t.user_id}>{t.nama}</option>
                                    ))}
                                </select>
                                <small className="text-muted mt-1 d-block">Hanya menampilkan takmir yang belum bertugas.</small>
                            </div>

                            <button className="btn btn-primary w-100 py-2 fw-bold" disabled={loading}>
                                {loading ? 'Menyimpan...' : 'Simpan Unit Masjid'}
                            </button>
                        </form>
                    </div>
                </div>
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
                                        <td>
                                            <small className="d-block text-muted">{m.alamat}</small>
                                            <small className="fw-bold text-primary">{m.no_hp}</small>
                                        </td>
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