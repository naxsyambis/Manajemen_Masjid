import React, { createContext, useContext, useState, useEffect } from "react";
import { login as loginAPI, register as registerAPI } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Cek login saat refresh
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // =================
  // LOGIN
  // =================
  const login = async (email, password) => {
    try {
      const response = await loginAPI(email, password);
      const data = response.data;

      localStorage.setItem("token", data.accessToken);

      const userData = {
        user_id: data.user_id,
        nama: data.nama,
        email: data.email,
        role: data.role,
        masjidId: data.masjidId,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);

      // Redirect berdasarkan role
      if (data.role === "super admin") {
        navigate("/superadmin/dashboard");
      } else if (data.role === "takmir") {
        navigate("/takmir/dashboard");
      } else {
        navigate("/");
      }

      return { success: true };
    } catch (error) {
      console.error("Login Failed:", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Login gagal. Periksa koneksi atau kredensial Anda.",
      };
    }
  };

  // =================
  // REGISTER
  // =================
  const register = async (formData) => {
    try {
      await registerAPI(formData);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message || "Registrasi gagal.",
      };
    }
  };

  // =================
  // LOGOUT
  // =================
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

export const useAuth = () => useContext(AuthContext);
