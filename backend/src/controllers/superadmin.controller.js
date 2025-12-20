const db = require('../config/database');

// 1. Ambil daftar takmir yang BELUM memiliki tugas di masjid manapun
exports.getAvailableTakmirs = async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT u.user_id, u.nama, u.email 
            FROM user_app u 
            LEFT JOIN masjid_takmir mt ON u.user_id = mt.user_id 
            WHERE u.role = 'takmir' AND mt.id IS NULL
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Assign Takmir Lama ke Masjid
exports.assignTakmir = async (req, res) => {
    const { user_id, masjid_id } = req.body;
    try {
        await db.execute(
            'INSERT INTO masjid_takmir (user_id, masjid_id, pembuatakun) VALUES (?, ?, ?)',
            [user_id, masjid_id, req.user.id] // req.user.id dari middleware auth
        );
        res.json({ message: "Takmir berhasil ditugaskan!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Tambah Takmir Baru & Langsung Assign (Transaction)
exports.addNewTakmirToMasjid = async (req, res) => {
    const { nama, email, password, masjid_id } = req.body;
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Simpan user baru
        const [resUser] = await connection.execute(
            'INSERT INTO user_app (nama, email, password, role) VALUES (?, ?, ?, ?)',
            [nama, email, hashedPassword, 'takmir']
        );
        
        // Langsung assign ke masjid
        await connection.execute(
            'INSERT INTO masjid_takmir (user_id, masjid_id, pembuatakun) VALUES (?, ?, ?)',
            [resUser.insertId, masjid_id, req.user.id]
        );

        await connection.commit();
        res.status(201).json({ message: "Takmir baru berhasil dibuat dan ditugaskan!" });
    } catch (error) {
        await connection.rollback();
        res.status(500).json({ message: error.message });
    } finally {
        connection.release();
    }
};


exports.getAllMasjids = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT masjid_id, nama_masjid FROM masjid');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 1. Mengambil semua daftar masjid (READ)
exports.getMasjidList = async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM masjid ORDER BY nama_masjid ASC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Gagal mengambil data masjid: " + error.message });
    }
};

exports.storeMasjid = async (req, res) => {
    const { nama_masjid, alamat, no_hp, deskripsi } = req.body;
    try {
        await db.execute(
            'INSERT INTO masjid (nama_masjid, alamat, no_hp, deskripsi) VALUES (?, ?, ?, ?)',
            [nama_masjid, alamat, no_hp, deskripsi]
        );
        res.status(201).json({ message: "Masjid berhasil didaftarkan!" });
    } catch (error) {
        res.status(500).json({ message: "Gagal menambah masjid: " + error.message });
    }
};

exports.deleteMasjid = async (req, res) => {
    const { id } = req.params;
    try {
        // Cek apakah ada data keuangan atau takmir yang terhubung sebelum menghapus
        await db.execute('DELETE FROM masjid WHERE masjid_id = ?', [id]);
        res.json({ message: "Data masjid berhasil dihapus." });
    } catch (error) {
        res.status(500).json({ message: "Gagal menghapus: Data mungkin masih terhubung dengan takmir/keuangan." });
    }
};

exports.getAllTakmirs = async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT u.user_id, u.nama, u.email, m.nama_masjid 
            FROM user_app u
            LEFT JOIN masjid_takmir mt ON u.user_id = mt.user_id
            LEFT JOIN masjid m ON mt.masjid_id = m.masjid_id
            WHERE u.role = 'takmir'
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTakmir = async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute('DELETE FROM masjid_takmir WHERE user_id = ?', [id]);
        await db.execute('DELETE FROM user_app WHERE user_id = ?', [id]);
        res.json({ message: "Takmir berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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