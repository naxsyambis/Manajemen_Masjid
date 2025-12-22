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

module.exports = router;