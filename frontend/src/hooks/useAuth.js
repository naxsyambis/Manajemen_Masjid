import React, { createContext, useContext, useState, useEffect } from "react";
import { loginAPI, registerAPI } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Untuk cek login saat refresh
  const navigate = useNavigate();

  // Cek apakah user sudah login saat aplikasi pertama kali dibuka (Reload page)
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Fungsi Login
  const login = async (email, password) => {
    try {
      const response = await loginAPI(email, password);
      const data = response.data;

      // Simpan data penting ke LocalStorage & State
      localStorage.setItem("token", data.accessToken);
      
      // Buat object user yang bersih (tanpa token di dalamnya)
      const userData = {
        user_id: data.user_id,
        nama: data.nama,
        email: data.email,
        role: data.role,
        masjidId: data.masjidId
      };
      
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      // Redirect berdasarkan Role
      if (data.role === "super admin") {
        navigate("/superadmin/dashboard");
      } else if (data.role === "takmir") {
        navigate("/takmir/dashboard");
      } else {
        navigate("/"); // Default ke home
      }

      return { success: true };
    } catch (error) {
      console.error("Login Failed:", error);
      return { 
        success: false, 
        message: error.response?.data?.message || "Login gagal. Periksa koneksi atau kredensial Anda." 
      };
    }
  };

  // Fungsi Register (Opsional / Untuk Testing)
  const register = async (formData) => {
    try {
      await registerAPI(formData);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || "Registrasi gagal." 
      };
    }
  };

  // Fungsi Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};