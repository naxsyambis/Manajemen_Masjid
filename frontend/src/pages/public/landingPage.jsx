import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/public.css'; // Buat file CSS baru nanti

const LandingPage = () => {
    const [masjids, setMasjids] = useState([]);
    const [news, setNews] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedMasjid, setSelectedMasjid] = useState('');
    const [prayerTimes, setPrayerTimes] = useState(null);

    useEffect(() => {
        // 1. Ambil Data Masjid
        axios.get('http://localhost:3000/api/public/masjids').then(res => setMasjids(res.data));
        
        // 2. Ambil Berita (Contoh endpoint)
        axios.get('http://localhost:3000/api/public/news').then(res => setNews(res.data));

        // 3. Ambil Jadwal Sholat (API Eksternal Al-Adhan untuk Bantul)
        axios.get('https://api.aladhan.com/v1/timingsByCity?city=Bantul&country=Indonesia&method=2')
            .then(res => setPrayerTimes(res.data.data.timings));
    }, []);

    const filteredMasjids = masjids.filter(m => 
        m.nama_masjid.toLowerCase().includes(search.toLowerCase()) &&
        (selectedMasjid === '' || m.nama_masjid === selectedMasjid)
    );

    return (
        <div className="landing-container">
            {/* --- HEADER --- */}
            <header className="main-header">
                <div className="logo-section">
                    <div className="logo-round">
                        <img src="/logo-muhammadiyah.png" alt="Logo Ranting" />
                    </div>
                    <h2>PRM Panjangrejo</h2>
                </div>
                <nav>
                    <a href="#home">Home</a>
                    <a href="#masjid">Masjid</a>
                    <a href="#berita">Berita</a>
                    <a href="#profil">Profil Organisasi</a>
                </nav>
            </header>

            {/* --- JADWAL SHOLAT --- */}
            <section className="prayer-times">
                <h3>Jadwal Sholat - Panjangrejo, Bantul</h3>
                {prayerTimes ? (
                    <div className="times-grid">
                        <div>Subuh: {prayerTimes.Fajr}</div>
                        <div>Dzuhur: {prayerTimes.Dhuhr}</div>
                        <div>Ashar: {prayerTimes.Asr}</div>
                        <div>Maghrib: {prayerTimes.Maghrib}</div>
                        <div>Isya: {prayerTimes.Isha}</div>
                    </div>
                ) : <p>Memuat jadwal...</p>}
            </section>

            {/* --- SEARCH & MASJID LIST --- */}
            <section id="masjid" className="masjid-section">
                <div className="filters">
                    <input 
                        type="text" 
                        placeholder="Cari Masjid..." 
                        onChange={(e) => setSearch(e.target.value)} 
                    />
                    <select onChange={(e) => setSelectedMasjid(e.target.value)}>
                        <option value="">Semua Masjid</option>
                        {masjids.map(m => <option key={m.masjid_id} value={m.nama_masjid}>{m.nama_masjid}</option>)}
                    </select>
                </div>

                <div className="masjid-cards">
                    {filteredMasjids.map(m => (
                        <div className="card" key={m.masjid_id}>
                            <img src={m.foto || '/default-masjid.jpg'} alt="Masjid" />
                            <div className="card-info">
                                <h4>{m.nama_masjid}</h4>
                                <p><i className="fa fa-map-marker"></i> {m.alamat}</p>
                                <p><strong>Takmir:</strong> {m.nama_takmir || 'Belum ditugaskan'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- BERITA --- */}
            <section id="berita" className="news-section">
                <h3>Berita Terkini</h3>
                <div className="news-grid">
                    {news.map(n => (
                        <div className="news-card" key={n.id}>
                            <img src={n.foto} alt="News" />
                            <div className="news-content">
                                <h5>{n.judul}</h5>
                                <small>{n.tempat}, {new Date(n.tanggal).toLocaleDateString()} | Penulis: {n.author}</small>
                                <p>{n.konten.substring(0, 100)}...</p>
                                <button>Selengkapnya</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default LandingPage;