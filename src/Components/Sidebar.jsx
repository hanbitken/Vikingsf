import React from "react";
import { useNavigate } from "react-router-dom";
import api from "./api"; // pastikan path ini benar
import Logo from "../assets/Picture/LOGO VIKINGS 1.png";

const Sidebar = ({ onMenuClick, activePage }) => {
  const navigate = useNavigate();

  const handleMenuClick = async (id) => {
    if (id === "logout") {
      try {
        await api.get("/logout"); // pastikan route ini tersedia di backend
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    } else {
      onMenuClick(id); // ini untuk handle menu lainnya
    }
  };

  const menuItems = [
    { id: "news", label: "News" },
    { id: "user", label: "User" },
    { id: "settings", label: "Settings" },
    { id: "logout", label: "Logout" },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-6">
      <div className="flex justify-center mb-6">
        <img src={Logo} alt="Logo Vikings" className="h-20 w-auto" />
      </div>
      <nav className="flex flex-col space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuClick(item.id)}
            className={`text-left hover:bg-gray-700 p-2 rounded ${
              activePage === item.id ? "bg-gray-700" : ""
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
