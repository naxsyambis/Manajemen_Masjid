import axios from 'axios';

// Base URL backend
const BASE_URL = 'http://localhost:3000/api/auth';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔐 Interceptor: sisipkan JWT token otomatis
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// =====================
// AUTH API FUNCTIONS
// =====================

export const login = (email, password) => {
  return api.post('/login', { email, password });
};

export const register = (data) => {
  return api.post('/register', data);
};

export default api;
