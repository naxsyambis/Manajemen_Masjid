import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageTakmirAssignment = () => {
    const [masjids, setMasjids] = useState([]);
    const [availableTakmirs, setAvailableTakmirs] = useState([]);
    const [selectedMasjid, setSelectedMasjid] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [mode, setMode] = useState('new'); // 'new' atau 'existing'
    
    const [formData, setFormData] = useState({ nama: '', email: '', password: '', user_id: '' });

    useEffect(() => {
        fetchMasjids();
        fetchAvailableTakmirs();
    }, []);

    const fetchMasjids = async () => {
        const res = await axios.get('http://localhost:3000/api/superadmin/masjid');
        setMasjids(res.data);
    };

    const fetchAvailableTakmirs = async () => {
        const res = await axios.get('http://localhost:3000/api/superadmin/available-takmirs');
        setAvailableTakmirs(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (mode === 'new') {
                await axios.post('http://localhost:3000/api/superadmin/add-assign-takmir', {
                    ...formData, masjid_id: selectedMasjid.masjid_id
                });
            } else {
                await axios.post('http://localhost:3000/api/superadmin/assign-takmir', {
                    user_id: formData.user_id, masjid_id: selectedMasjid.masjid_id
                });
            }
            alert("Berhasil!");
            setShowModal(false);
            fetchAvailableTakmirs();
        } catch (err) { alert("Gagal memproses penugasan"); }
    };

    return (
        <div className="container-fluid">
            <h3 className="fw-bold mb-4">Kelola Penugasan Takmir</h3>
            <div className="row g-3">
                {masjids.map(m => (
                    <div className="col-md-4" key={m.masjid_id}>
                        <div className="card shadow-sm border-0 h-100 p-3">
                            <h5 className="fw-bold">{m.nama_masjid}</h5>
                            <p className="small text-muted mb-3">{m.alamat}</p>
                            <button className="btn btn-primary btn-sm" onClick={() => { setSelectedMasjid(m); setShowModal(true); }}>
                                Tugaskan Takmir
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Sederhana (Bisa diganti dengan Bootstrap Modal) */}
            {showModal && (
                <div className="custom-modal p-4 shadow bg-white rounded-4" style={{position: 'fixed', top: '20%', left: '35%', zIndex: 2000, width: '400px'}}>
                    <h5 className="fw-bold mb-3">Tugaskan ke {selectedMasjid.nama_masjid}</h5>
                    <div className="d-flex gap-2 mb-3">
                        <button className={`btn btn-sm ${mode === 'new' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setMode('new')}>Takmir Baru</button>
                        <button className={`btn btn-sm ${mode === 'existing' ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setMode('existing')}>Takmir Lama</button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {mode === 'new' ? (
                            <>
                                <input type="text" className="form-control mb-2" placeholder="Nama" onChange={e => setFormData({...formData, nama: e.target.value})} required />
                                <input type="email" className="form-control mb-2" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} required />
                                <input type="password" className="form-control mb-3" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} required />
                            </>
                        ) : (
                            <select className="form-select mb-3" onChange={e => setFormData({...formData, user_id: e.target.value})} required>
                                <option value="">Pilih Takmir Menganggur</option>
                                {availableTakmirs.map(t => <option key={t.user_id} value={t.user_id}>{t.nama} ({t.email})</option>)}
                            </select>
                        )}
                        <div className="d-flex gap-2">
                            <button type="submit" className="btn btn-primary w-100">Simpan</button>
                            <button type="button" className="btn btn-light w-100" onClick={() => setShowModal(false)}>Batal</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ManageTakmirAssignment;