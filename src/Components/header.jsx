import React, { useState, useEffect } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogin(!!token);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    window.location.reload();
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
        transition: "background 0.3s",
        background: scrolled ? "black" : "rgba(0,0,0,0.5)",
        boxShadow: scrolled ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
        color: scrolled ? "white" : "black",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0.75rem 2rem",
        }}
      >
        {/* Kiri - Switching Mode */}
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          SWITCHING
        </div>

        {/* Tengah - Menu */}
        <div
          style={{
            flex: 2,
            display: "flex",
            justifyContent: "center",
            gap: 34,
          }}
        >
          {["NEWS", "DOWNLOAD", "GAME INFO", "MEMBERSHIP", "DONATION"].map(
            (item) => (
              <a
                key={item}
                href="#"
                style={{
                  color: scrolled ? "#1976d2" : "#fff",
                  textDecoration: "none",
                  fontWeight: 500,
                  fontSize: 16,
                }}
              >
                {item}
              </a>
            )
          )}
        </div>

        {/* Kanan - Login/Register */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {isLogin ? (
            <a
              onClick={handleLogout}
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              LOGOUT
            </a>
          ) : (
            <a
              href="/login"
              style={{
                color: "#fff",
                textDecoration: "none",
                fontWeight: 500,
                fontSize: 16,
              }}
            >
              LOGIN / REGISTER
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
