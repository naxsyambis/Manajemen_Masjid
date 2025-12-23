import React from 'react';

const ProfilePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen pt-20">
      <div className="container mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Profil Organisasi</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sistem Manajemen Masjid Terintegrasi untuk mewujudkan tata kelola rumah ibadah yang transparan dan modern.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div>
              <h2 className="text-2xl font-bold text-green-600 mb-4">Visi</h2>
              <p className="text-gray-700 leading-relaxed">
                Menjadi platform digital nomor satu dalam memfasilitasi manajemen masjid yang akuntabel, memudahkan jamaah dalam mengakses informasi, dan mempererat silaturahmi antar umat.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-600 mb-4">Misi</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Digitalisasi data masjid dan takmir secara sistematis.</li>
                <li>Menyediakan informasi kegiatan masjid secara real-time.</li>
                <li>Transparansi pengelolaan aset dan administrasi masjid.</li>
                <li>Meningkatkan partisipasi jamaah melalui teknologi informasi.</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-12">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Struktur Organisasi</h2>
            <div className="flex justify-center">
              {/* Anda bisa mengganti ini dengan gambar bagan atau list tim */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center text-green-600 font-bold text-xl">P</div>
                  <h4 className="font-bold">Pembina</h4>
                  <p className="text-xs text-gray-500">Dewan Masjid</p>
                </div>
                <div>
                  <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center text-green-600 font-bold text-xl">K</div>
                  <h4 className="font-bold">Ketua</h4>
                  <p className="text-xs text-gray-500">Pusat Manajemen</p>
                </div>
                <div>
                  <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center text-green-600 font-bold text-xl">S</div>
                  <h4 className="font-bold">Sekretaris</h4>
                  <p className="text-xs text-gray-500">Administrasi</p>
                </div>
                <div>
                  <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-3 flex items-center justify-center text-green-600 font-bold text-xl">B</div>
                  <h4 className="font-bold">Bendahara</h4>
                  <p className="text-xs text-gray-500">Keuangan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;