import React, { useState, useEffect } from "react";

const UserProfile = () => {
  const [username, setUsername] = useState("");
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Ambil user dari localStorage
    if (user && user.username) {
      setUsername(user.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  // Kalau belum login, tampilkan link ke login
  if (!username) {
    return (
      <a
        href="/login"
        style={{
          color: "#fff",
          textDecoration: "none",
          fontWeight: 500,
          fontSize: 16,
        }}
      >
        LOGIN
      </a>
    );
  }

  // Kalau sudah login, dan belum klik -> tampilkan username
  if (!showLogout) {
    return (
      <span
        onClick={() => setShowLogout(true)}
        style={{
          cursor: "pointer",
          color: "#fff",
          fontWeight: 500,
          fontSize: 16,
        }}
      >
        {username.toUpperCase()}
      </span>
    );
  }

  // Setelah diklik, tampilkan tombol logout merah
  return (
    <button
      onClick={handleLogout}
      style={{
        backgroundColor: "red",
        color: "white",
        border: "none",
        padding: "6px 12px",
        fontWeight: "bold",
        borderRadius: 4,
        cursor: "pointer",
      }}
    >
      LOGOUT
    </button>
  );
};

export default UserProfile;
