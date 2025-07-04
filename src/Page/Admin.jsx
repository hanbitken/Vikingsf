import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar'; // Sidebar terpisah
import NewsPage from './MasterNews'; // Komponen konten
// import UserPage from './UserPage'; // Bisa ditambahkan nanti

const AdminPage = () => {
  const [activePage, setActivePage] = useState('dashboard'); // default

  const renderContent = () => {
    switch (activePage) {
      case 'news':
        return <NewsPage />;
      // case 'user':
      //   return <UserPage />;
      default:
        return (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to Admin Dashboard</h1>
            <p className="text-gray-600">Silakan pilih menu di sidebar untuk mengelola data.</p>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex">
      <Sidebar onMenuClick={setActivePage} activePage={activePage} />
      <main className="flex-1 p-8 bg-gray-100 overflow-auto">{renderContent()}</main>
    </div>
  );
};

export default AdminPage;
