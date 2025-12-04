import axios from 'axios';

// Ganti BASE_URL sesuai dengan alamat server backend Anda
const API_URL = 'http://localhost:3000/api/auth/'; 

/**
 * Melakukan panggilan login ke server.
 * @param {string} email - Email pengguna.
 * @param {string} password - Password pengguna.
 * @returns {Promise<object>} Data pengguna dan accessToken.
 */
export const login = (email, password) => {
    return axios
        .post(API_URL + 'login', {
            email,
            password
        })
        .then(response => {
            // Simpan data user ke local storage jika login berhasil
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        })
        .catch(error => {
            // Melemparkan error untuk ditangkap di komponen React
            throw error.response.data.message || "Login failed!";
        });
};

/**
 * Menghapus data user dari local storage (Logout).
 */
export const logout = () => {
    localStorage.removeItem('user');
};

/**
 * Mengambil data user dari local storage.
 * @returns {object | null}
 */
export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};