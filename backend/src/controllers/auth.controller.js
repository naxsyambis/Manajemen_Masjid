const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Ganti dengan secret key yang kuat
const jwtSecret = process.env.JWT_SECRET || 'your_super_secret_key'; 

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        // Query untuk mencari user dan mengambil masjid_id (jika ada)
        const [rows] = await db.execute(
            `SELECT 
                u.user_id, u.nama, u.email, u.password, u.role, u.masjid_id 
             FROM user_app u 
             WHERE u.email = ?`,
            [email]
        );

        const user = rows[0];

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // 1. Verifikasi Password
        // Catatan: Pastikan password di DB sudah di-hash saat registrasi
        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        // 2. Buat Payload JWT
        const tokenPayload = {
            id: user.user_id,
            role: user.role,
            // Hanya disertakan jika role-nya 'takmir'
            masjidId: user.role === 'takmir' ? user.masjid_id : null 
        };

        // 3. Generate Token
        const token = jwt.sign(tokenPayload, jwtSecret, {
            expiresIn: 86400 // 24 jam
        });

        // 4. Kirim respons
        res.status(200).json({
            user_id: user.user_id,
            nama: user.nama,
            email: user.email,
            role: user.role,
            masjidId: user.masjid_id,
            accessToken: token
        });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "An error occurred during login." });
    }
};

// Fungsi ini digunakan untuk keperluan testing (Wajib di-hash sebelum insert ke DB!)
exports.register = async (req, res) => {
    const { nama, email, password, role, masjid_id } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.execute(
            `INSERT INTO user_app (nama, email, password, role, masjid_id) 
             VALUES (?, ?, ?, ?, ?)`,
            [nama, email, hashedPassword, role, masjid_id]
        );
        res.status(201).send({ message: "User registered successfully!" });
    } catch (error) {
        res.status(500).send({ message: "Error registering user: " + error.message });
    }
};