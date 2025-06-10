import React, { useState, useEffect, useRef } from "react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [username, setUsername] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    if (user && token) {
      setUsername(user.username);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
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
        {/* Kiri - Logo / Mode */}
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
          {["HOME", "NEWS", "DOWNLOAD", "GAME INFO", "DONATION"].map((item) => (
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
          ))}
        </div>

        {/* Kanan - Login / Username Dropdown */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            position: "relative",
          }}
          ref={dropdownRef}
        >
          {username ? (
            <div style={{ position: "relative" }}>
              <span
                onClick={() => setShowDropdown((prev) => !prev)}
                style={{
                  color: "#fff",
                  fontWeight: 500,
                  fontSize: 16,
                  cursor: "pointer",
                }}
              >
                {username.toUpperCase()}
              </span>

              {showDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "110%",
                    right: 0,
                    marginTop: 8,
                    backgroundColor: "#fff",
                    borderRadius: 6,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                    padding: "10px",
                    zIndex: 9999,
                    minWidth: "120px",
                  }}
                >
                  <button
                    onClick={handleLogout}
                    style={{
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      padding: "8px 16px",
                      fontWeight: "bold",
                      borderRadius: 4,
                      cursor: "pointer",
                      width: "100%",
                    }}
                  >
                    LOGOUT
                  </button>
                </div>
              )}
            </div>
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
              USER NAME 
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
