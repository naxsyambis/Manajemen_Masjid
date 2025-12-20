const db = require('../config/database');

exports.getDashboardStats = async (req, res) => {
    try {
        // 1. Hitung Total Masjid & Takmir
        const [[{ total_masjid }]] = await db.execute('SELECT COUNT(*) as total_masjid FROM masjid');
        const [[{ total_takmir }]] = await db.execute("SELECT COUNT(*) as total_takmir FROM user_app WHERE role = 'takmir'");

        // 2. Ringkasan Keuangan Per Masjid
        const [keuangan] = await db.execute(`
            SELECT m.nama_masjid, 
                   SUM(CASE WHEN k.jenis = 'pemasukan' THEN keu.jumlah ELSE 0 END) as total_masuk,
                   SUM(CASE WHEN k.jenis = 'pengeluaran' THEN keu.jumlah ELSE 0 END) as total_keluar
            FROM masjid m
            LEFT JOIN keuangan keu ON m.masjid_id = keu.masjid_id
            LEFT JOIN kategori_keuangan k ON keu.kategori_id = k.kategori_id
            GROUP BY m.masjid_id
        `);

        // 3. Aktivitas Terbaru (Audit Log)
        const [aktivitas] = await db.execute(`
            SELECT a.created_at, u.nama, a.action, a.nama_tabel, m.nama_masjid
            FROM audit_log a
            JOIN user_app u ON a.user_id = u.user_id
            LEFT JOIN masjid_takmir mt ON u.user_id = mt.user_id
            LEFT JOIN masjid m ON mt.masjid_id = m.masjid_id
            ORDER BY a.created_at DESC LIMIT 5
        `);

        res.json({
            summary: { total_masjid, total_takmir },
            keuangan,
            aktivitas
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};