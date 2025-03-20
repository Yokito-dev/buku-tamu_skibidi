"use client";
import { createContext, useState, useEffect, useContext } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [stafList, setStafList] = useState([]); // State untuk daftar staf
  const router = useRouter();

  // Fetch data user & staf saat pertama kali aplikasi dibuka
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("auth_token");
      if (!token) return;

      try {
        const res = await axios.get("/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Gagal mengambil data pengguna:", error);
        localStorage.removeItem("auth_token");
        setUser(null);
      }
    };

    fetchUser();
    fetchStaf(); // Ambil daftar staf
  }, []);

  // Ambil daftar staf
  const fetchStaf = async () => {
    try {
      const res = await axios.get("/kepseks"); // Pastikan route ini ada di backend Laravel
      setStafList(res.data);
    } catch (error) {
      console.error("Gagal mengambil daftar staf:", error);
    }
  };

  // Login user
  const login = async (form) => {
    if (!form.username || !form.password) {
      throw new Error("Username dan password harus diisi.");
    }
    try {
      const res = await axios.post("/login", form);
      localStorage.setItem("auth_token", res.data.access_token);
      setUser(res.data.user);
      fetchStaf(); // Ambil daftar staf setelah login berhasil

      if (res.data.user.role === "staf") {
        router.push("/lobbystaf");
      } else if (res.data.user.role === "superadmin") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (e) {
      console.error("Login gagal:", e.response?.data?.message || e.message);
      throw new Error("Login gagal, periksa kembali username dan password.");
    }
  };

  // Register user
  const register = async (username, email, password, code, role) => {
    if (!username || !email || !password || !code || !role) {
      throw new Error("Semua field registrasi harus diisi.");
    }
    try {
      await axios.post("/register", { username, email, password, code, role });
      router.push("/login");
    } catch (e) {
      console.error("Registrasi gagal:", e.response?.data?.message || e.message);
      throw new Error("Registrasi gagal, coba lagi.");
    }
  };

  // Logout user
  const logout = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      if (token) {
        await axios.post("/logout", null, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch (e) {
      console.error("Logout gagal:", e);
    } finally {
      localStorage.removeItem("auth_token");
      setUser(null);
      router.push("/login2"); 
      router.replace("/login2");  
    }
  };

  // Tambah data kepala sekolah dan Perf QM RS
  const addKepsek = async (data) => {
    try {
      const token = localStorage.getItem("auth_token");

      // Kirim data ke dua endpoint sekaligus
      const responses = await Promise.all([
        axios.post("/kepseks", data, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.post("/perf_q_m_rs", data, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      console.log("Data berhasil dikirim ke /kepseks:", responses[0].data);
      console.log("Data berhasil dikirim ke /perf_q_m_rs:", responses[1].data);

      return {
        kepseks: responses[0].data,
        perf_q_m_rs: responses[1].data,
      };
    } catch (error) {
      console.error("Gagal mengirim data:", error.response?.data?.message || error.message);
      throw new Error("Gagal menyimpan data ke kedua endpoint.");
    }
  };

  return (
    <AuthContext.Provider value={{ user, stafList, login, logout, register, addKepsek }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook untuk mengakses context
export const useAuth = () => useContext(AuthContext);
