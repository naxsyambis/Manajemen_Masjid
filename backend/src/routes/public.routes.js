const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Mendapatkan data masjid untuk publik (disertai nama takmir)
router.get('/masjids', async (req, res) => {
    try {
        const [rows] = await db.execute(`
            SELECT m.*, u.nama as nama_takmir 
            FROM masjid m
            LEFT JOIN masjid_takmir mt ON m.masjid_id = mt.masjid_id
            LEFT JOIN user_app u ON mt.user_id = u.user_id
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// 2. Endpoint Baru: Ambil 6 Berita Terbaru

router.get('/news', async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : 6;
    try {
        // Query ini mengasumsikan Anda memiliki tabel 'berita'
        // Jika tabel belum ada, endpoint ini akan mengembalikan array kosong
        const [rows] = await db.execute(`
            SELECT b.*, m.nama_masjid, u.nama as author 
            FROM berita b
            JOIN masjid m ON b.masjid_id = m.masjid_id
            JOIN user_app u ON b.user_id = u.user_id
            ORDER BY b.created_at DESC
            LIMIT ?
        `, [limit]);
        res.json(rows);
    } catch (error) {
        // Mengembalikan array kosong jika tabel belum dibuat agar frontend tidak crash
        res.json([]);
    }
});

module.exports = router;