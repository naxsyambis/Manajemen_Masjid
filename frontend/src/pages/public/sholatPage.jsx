import React from 'react';

const SholatPage = () => {
    return (
        <div className="bg-gray-50 min-h-screen pt-24 px-6 container mx-auto">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800">Jadwal Sholat</h2>
                <p className="text-gray-600">Wilayah Panjangrejo, Bantul dan Sekitarnya</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* --- JADWAL SHOLAT HARIAN --- */}
                <section className="prayer-times shadow-lg" style={{ background: '#15803d', borderRadius: '15px', padding: '20px' }}>
                    <h4 className="text-white" style={{ textAlign: 'center', marginBottom: '15px', fontWeight: 'bold' }}>
                        Jadwal Sholat Hari Ini
                    </h4>
                    
                    {/* Widget Iframe Eksternal Harian */}
                    <div style={{ borderRadius: '10px', overflow: 'hidden', background: '#fff' }}>
                        <iframe 
                            src="https://jadwalsholathariini.id/widget/index.php?type=daily&show_selector=true&city=bantul&theme=gradient-modern&lang=id&format=24&school=0&method=20" 
                            width="100%" 
                            height="380px" 
                            frameBorder="0" 
                            style={{ border: 'none', overflow: 'hidden' }}
                            title="Jadwal Sholat Bantul"
                        ></iframe>
                    </div>

                    <p style={{ textAlign: 'center', fontSize: '0.8rem', opacity: 0.9, color: 'white', marginTop: '15px' }}>
                        *Waktu sholat berdasarkan daerah Bantul dan sekitarnya.
                    </p>
                </section>

                {/* --- JADWAL SHOLAT BULANAN --- */}
                <section className="prayer-times shadow-lg" style={{ background: '#ffffff', borderRadius: '15px', padding: '20px', border: '1px solid #e5e7eb' }}>
                    <h4 style={{ textAlign: 'center', marginBottom: '15px', fontWeight: 'bold', color: '#1f2937' }}>
                        Jadwal Sholat Bulanan
                    </h4>
                    
                    <div style={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #f3f4f6' }}>
                        <iframe 
                            src="https://jadwalsholathariini.id/widget/index.php?type=monthly&show_selector=true&city=bantul&theme=gradient-modern&lang=id&format=24&school=0&method=20" 
                            width="100%" 
                            height="380px" 
                            frameBorder="0" 
                            style={{ border: 'none', overflow: 'hidden' }}
                            title="Jadwal Sholat Bulanan"
                        ></iframe>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SholatPage;