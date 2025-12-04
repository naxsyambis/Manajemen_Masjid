import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginApi, logout as logoutApi, getCurrentUser } from '../api/auth.api';

// 1. Definisikan Context
const AuthContext = createContext(null);

// 2. Definisikan Provider
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Menyimpan data user (termasuk role & masjidId)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Cek Local Storage saat komponen mount
        const storedUser = getCurrentUser();
        if (storedUser) {
            setUser(storedUser);
        }
        setIsLoading(false);
    }, []);

    // Fungsi untuk proses login
    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const userData = await loginApi(email, password);
            setUser(userData);
            setIsLoading(false);
            return userData; // Mengembalikan data user untuk keperluan redirect
        } catch (error) {
            setUser(null);
            setIsLoading(false);
            throw error;
        }
    };

    // Fungsi untuk proses logout
    const logout = () => {
        logoutApi();
        setUser(null);
    };

    // Objek value yang akan disediakan oleh Context
    const value = {
        user,
        isAuthenticated: !!user, // true jika user tidak null
        isSuperAdmin: user && user.role === 'super admin',
        isTakmir: user && user.role === 'takmir',
        isLoading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// 3. Custom Hook untuk Konsumsi Context
export const useAuth = () => {
    return useContext(AuthContext);
};