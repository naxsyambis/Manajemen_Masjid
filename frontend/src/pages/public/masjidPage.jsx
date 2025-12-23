import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MasjidPage = () => {
    const [masjids, setMasjids] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedMasjid, setSelectedMasjid] = useState("");

  useEffect(() => {
    // Mengambil data masjid dari API publik
    axios
      .get('http://localhost:3000/api/public/masjid')
      .then((res) => setMasjids(res.data))
      .catch((err) => console.error(err));
  }, []);

    // Filter logic untuk pencarian dan select
    const filteredMasjids = masjids.filter(m => {
        const matchesSearch = m.nama_masjid.toLowerCase().includes(search.toLowerCase());
        const matchesSelect = selectedMasjid === "" || m.nama_masjid === selectedMasjid;
        return matchesSearch && matchesSelect;
    });

  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-8 text-center">Daftar Masjid Terdaftar</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {masjids.length > 0 ? (
            masjids.map((masjid) => (
              <div key={masjid.masjid_id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{masjid.nama_masjid}</h3>
                  </div>
                  <p className="text-gray-600 mb-2">
                    <span className="font-semibold text-sm uppercase text-gray-400 block">Alamat</span>
                    {masjid.alamat}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Aktif</span>
                    <button className="text-green-600 font-medium hover:underline text-sm">Lihat Detail</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <p className="text-gray-500 text-lg">Belum ada data masjid yang tersedia.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MasjidPage;