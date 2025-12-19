const db = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'your_super_secret_key'; 

// --- LOGIN FUNCTION ---
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const [rows] = await db.execute(
            `SELECT 
                u.user_id, u.nama, u.email, u.password, u.role, u.foto_tanda_tangan 
             FROM user_app u 
             WHERE u.email = ?`,
            [email]
        );

        const user = rows[0];

        if (!user) {
            return res.status(401).json({ message: "Email tidak ditemukan." });
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).json({ message: "Password salah." });
        }

        const tokenPayload = {
            id: user.user_id,
            role: user.role,
            masjidId: null 
        };

        const token = jwt.sign(tokenPayload, jwtSecret, {
            expiresIn: 86400 
        });

        res.status(200).json({
            user_id: user.user_id,
            nama: user.nama,
            email: user.email,
            role: user.role,
            masjidId: null, 
            foto_tanda_tangan: user.foto_tanda_tangan,
            accessToken: token
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Terjadi kesalahan di server: " + error.message });
    }
};

// --- REGISTER FUNCTION (Gunakan ini untuk buat Takmir) ---
exports.register = async (req, res) => {
    const { nama, email, password, role, foto_tanda_tangan } = req.body;

    if (!nama || !email || !password || !role) {
        return res.status(400).json({ 
            message: "Data tidak lengkap! Nama, Email, Password, dan Role wajib diisi." 
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const finalTtd = foto_tanda_tangan || null; 

        await db.execute(
            `INSERT INTO user_app (nama, email, password, role, foto_tanda_tangan) 
             VALUES (?, ?, ?, ?, ?)`,
            [nama, email, hashedPassword, role, finalTtd]
        );

        res.status(201).send({ message: "User berhasil didaftarkan!" });

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).send({ message: "Gagal mendaftarkan user: " + error.message });
    }
};