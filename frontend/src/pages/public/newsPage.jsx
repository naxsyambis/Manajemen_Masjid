import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NewsPage = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Mengambil semua berita tanpa limit 6
    axios
      .get('http://localhost:3000/api/public/news?limit=100') 
      .then(res => setNews(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-8">Semua Berita Kegiatan</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.length > 0 ? (
            news.map(item => (
              <div key={item.id} className="bg-white rounded-xl shadow hover:shadow-lg transition">
                <img
                  src={item.foto || 'https://via.placeholder.com/400x250'}
                  alt={item.judul}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="p-6">
                  <span className="text-xs text-green-600 font-bold uppercase">{item.nama_masjid}</span>
                  <h3 className="text-lg font-bold mt-2">{item.judul}</h3>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-3">{item.konten}</p>
                  <Link to={`/berita/${item.id}`} className="inline-block mt-4 text-blue-600 font-semibold">
                    Baca Selengkapnya →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full">Belum ada berita untuk ditampilkan.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;