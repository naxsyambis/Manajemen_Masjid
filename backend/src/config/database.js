const mysql = require('mysql2/promise');

// Ganti dengan kredensial database Laragon Anda
const dbConfig = {
    // Laragon default host
    host: 'localhost', 
    // Laragon default user
    user: 'root', 
    // Laragon default password (biasanya kosong)
    password: '', 
    // Nama database Anda
    database: 'mana_masjid' 
    // port: 3306 // (Opsional, karena 3306 adalah default)
};

const pool = mysql.createPool(dbConfig);

// Cek koneksi
pool.getConnection()
    .then(connection => {
        console.log("Database connection successful!");
        connection.release();
    })
    .catch(err => {
        console.error("Database connection failed:", err.message);
        console.error("Pastikan Laragon sudah menyalakan service MySQL.");
        process.exit(1);
    });

module.exports = pool;