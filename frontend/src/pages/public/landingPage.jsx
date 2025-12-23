import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/public.css';

const LandingPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/public/news?limit=6')
      .then(res => setNews(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ================= HEADER ================= */}
      <header className="main-header">
        <div className="logo-section">
          <div className="logo-round">
            <img src="/logo-muhammadiyah.png" alt="Logo Ranting" />
          </div>
          <h2>PRM Panjangrejo</h2>
        </div>

        <nav>
          <a href="#home">Home</a>
          <Link to="/masjid" className="hover:text-green-600 transition-colors">Masjid</Link>
          <Link to="/berita" className="hover:text-green-600">Berita</Link>
          <a href="#profil">Profil Organisasi</a>
          <a href="#jadwalsholat">Jadwal Sholat</a>
          <a href="#login">Login</a>
        </nav>
      </header>

      {/* ================= HERO ================= */}
      <section
        id="home"
        className="h-[500px] flex items-center justify-center text-white relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2070')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative text-center px-6">
          <h1 className="text-5xl font-extrabold mb-4">
            PRM Panjangrejo
          </h1>
          <p className="text-xl italic">
            “Mewujudkan Masyarakat Islam yang Sebenar-benarnya”
          </p>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="container mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-6 border-l-8 border-green-600 pl-4">
          Tentang Kami
        </h2>
        <p className="text-gray-600 leading-relaxed text-justify max-w-4xl">
          Pimpinan Ranting Muhammadiyah (PRM) Panjangrejo berlokasi di
          Kapanewon Pundong, Kabupaten Bantul. PRM Panjangrejo aktif
          mengelola dakwah, masjid, serta kegiatan keislaman demi
          terwujudnya masyarakat Islam yang sebenar-benarnya.
        </p>
      </section>

      {/* ================= BERITA ================= */}
      <section id="berita" className="bg-slate-100 py-20">
        <div className="container mx-auto px-6">

          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold">Berita Terbaru</h2>
              <p className="text-gray-500">
                Informasi kegiatan masjid di Panjangrejo
              </p>
            </div>

            <Link
              to="/berita"
              className="text-green-600 font-semibold hover:underline hidden md:block"
            >
              Lihat Semua →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.length > 0 ? (
              news.map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition"
                >
                  <img
                    src={item.foto || 'https://via.placeholder.com/400x250'}
                    alt={item.judul}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="p-6">
                    <span className="text-xs text-green-600 font-bold uppercase">
                      {item.nama_masjid}
                    </span>
                    <h3 className="text-lg font-bold mt-2 line-clamp-2">
                      {item.judul}
                    </h3>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                      {item.konten}
                    </p>
                    <Link
                      to={`/berita/${item.id}`}
                      className="inline-block mt-4 text-blue-600 font-semibold"
                    >
                      Selengkapnya →
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-400">
                Belum ada berita
              </p>
            )}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/berita"
              className="bg-slate-800 text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-900"
            >
              Selengkapnya
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
};

export default LandingPage;
