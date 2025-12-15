import axios from 'axios';

// Ganti dengan URL backend Anda jika berbeda
const BASE_URL = 'http://localhost:3000/api/auth';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor: Otomatis menyisipkan Token JWT ke setiap request (jika ada)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const loginAPI = (email, password) => api.post('/login', { email, password });
export const registerAPI = (data) => api.post('/register', data);

export default api;