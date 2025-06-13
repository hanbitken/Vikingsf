// components/ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../assets/logic/api";
// Pastikan path ini sesuai dengan struktur project Anda
const ProtectedRoute = ({ children, roleRequired }) => {
  const [auth, setAuth] = useState({
    loading: true,
    isAuth: false,
    isAllowed: false,
  });

  useEffect(() => {
    // Ambil token dari localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      // Tidak ada token = belum login
      setAuth({ loading: false, isAuth: false, isAllowed: false });
      return;
    }

    // Set header Authorization untuk axios
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    // Cek role dari API Laravel
    api
      .get("/me")
      .then((res) => {
        const role = res.data.role;
        console.log("role:", role);
        setAuth({
          loading: false,
          isAuth: true,
          isAllowed: (role ?? "").toLowerCase() === roleRequired.toLowerCase(),
        });
      })
      .catch((error) => {
        console.error("Error fetching role data:", error);
        // Token tidak valid atau gagal ambil data user
        setAuth({ loading: false, isAuth: false, isAllowed: false });
      });
  }, [roleRequired]);

  if (auth.loading) return <p className="text-white text-center">Loading...</p>;

  if (!auth.isAuth) {
    return <Navigate to="/login" />;
  }

  if (!auth.isAllowed) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
