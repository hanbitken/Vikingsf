import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AppLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-lg p-5 flex flex-col">
        <h4 className="text-2xl font-semibold text-gray-800 mb-6">Admin Panel</h4>
        <nav className="flex-1">
          <Link
            to="/"
            className="block py-2 px-4 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition duration-200 ease-in-out"
          >
            Dashboard
          </Link>
          <Link
            to="/users"
            className="block py-2 px-4 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition duration-200 ease-in-out mt-1"
          >
            Users
          </Link>
          <Link
            to="/products"
            className="block py-2 px-4 text-gray-700 hover:bg-blue-100 hover:text-blue-700 rounded-lg transition duration-200 ease-in-out mt-1"
          >
            Products
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;