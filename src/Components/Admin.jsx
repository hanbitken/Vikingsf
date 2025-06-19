import React from "react";
import Logo from "../assets/Picture/LOGO VIKINGS 1.png"; // Pastikan nama file dan ekstensi sesuai

const AdminPage = () => {
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-6">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo Vikings" className="h-20 w-auto" />
        </div>
        <nav className="flex flex-col space-y-4">
          <a href="#news" className="hover:bg-gray-700 p-2 rounded">
            News
          </a>
          <a href="#table list" className="hover:bg-gray-700 p-2 rounded">
            Tables
          </a>
          <a href="#logout" className="hover:bg-gray-700 p-2 rounded">
            Logout
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100 overflow-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome to Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Silakan pilih menu di sidebar untuk mengelola data.
        </p>
      </main>
    </div>
  );
};

export default AdminPage;
