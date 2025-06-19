import React from "react";
import Logo from "../assets/Picture/LOGO VIKINGS 1.png";

const Sidebar = ({ onMenuClick, activePage }) => {
  const menuItems = [
    { id: "news", label: "News" },
    { id: "table", label: "Table List" },
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
            onClick={() => onMenuClick(item.id)}
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
