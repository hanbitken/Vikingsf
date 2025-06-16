import React, { useState } from 'react';

const UserTable = () => {
  // State untuk menyimpan daftar user
  const [users, setUsers] = useState([
    { id: 1, name: 'Dinda', email: 'dindabc@gmail.com' },
    { id: 2, name: 'Bima', email: 'bimabc@gmail.com' }, // Menambahkan contoh data user lain
  ]);

  // State untuk mengontrol tampilan modal (form tambah/edit user)
  const [showModal, setShowModal] = useState(false);
  // State untuk menyimpan data user yang sedang diedit (null jika mode tambah)
  const [editUser, setEditUser] = useState(null);
  // State untuk data form yang akan dikirim (tambah/edit)
  const [formData, setFormData] = useState({ name: '', email: '' });

  // Fungsi untuk menampilkan modal, mengisi data jika mode edit
  const handleShowModal = (user) => {
    setEditUser(user);
    if (user) {
      setFormData({ name: user.name, email: user.email });
    } else {
      setFormData({ name: '', email: '' }); // Reset form jika mode tambah
    }
    setShowModal(true);
  };

  // Fungsi untuk menutup modal dan mereset state terkait
  const handleCloseModal = () => {
    setShowModal(false);
    setEditUser(null);
    setFormData({ name: '', email: '' }); // Pastikan form direset setelah ditutup
  };

  // Handler untuk perubahan input form
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handler untuk menyimpan data user (tambah atau edit)
  const handleSave = () => {
    if (editUser) {
      // Mode edit: perbarui user yang sudah ada
      setUsers((prev) =>
        prev.map((u) => (u.id === editUser.id ? { ...u, ...formData } : u))
      );
    } else {
      // Mode tambah: buat user baru dengan ID unik (timestamp)
      const newUser = { id: Date.now(), ...formData };
      setUsers((prev) => [...prev, newUser]);
    }
    handleCloseModal(); // Tutup modal setelah menyimpan
  };

  // Handler untuk menghapus user
  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus user ini?')) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      {/* Header dan Tombol Tambah User */}
      <div className="flex justify-between items-center mb-6">
        <h4 className="text-3xl font-bold text-gray-800 mb-0">Tabel User</h4>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
          onClick={() => handleShowModal(null)} // Panggil dengan null untuk mode tambah
        >
          Tambah User
        </button>
      </div>

      {/* Tabel Data User */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Nama</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {users.map((u, index) => (
              <tr
                key={u.id}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 border-b border-gray-200 transition duration-150 ease-in-out`}
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">{u.id}</td>
                <td className="py-3 px-6 text-left">{u.name}</td>
                <td className="py-3 px-6 text-left">{u.email}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-xs mr-2 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 transition duration-200 ease-in-out"
                    onClick={() => handleShowModal(u)} // Panggil dengan data user untuk mode edit
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-xs shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-200 ease-in-out"
                    onClick={() => handleDelete(u.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {/* Tampilkan pesan jika tidak ada data */}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="py-3 px-6 text-center text-gray-500">Tidak ada data user.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah/Edit User */}
      {showModal && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full flex justify-center z-50 transition-opacity duration-300 ease-out"
          style={{ opacity: showModal ? 1 : 0 }}
          onClick={handleCloseModal} // Menutup modal saat klik di luar
        >
          <div
            className="relative p-6 bg-white w-full max-w-lg mx-auto rounded-lg shadow-2xl transition-all duration-300 ease-out my-8 max-h-[90vh] overflow-y-auto"
            style={{
              transform: showModal ? 'translateY(0) scale(1)' : 'translateY(-50px) scale(0.95)',
              opacity: showModal ? 1 : 0
            }}
            onClick={(e) => e.stopPropagation()} // Mencegah klik di dalam modal menutupnya
          >
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {editUser ? 'Edit User' : 'Tambah User'}
              </h3>
              <button
                className="text-gray-400 hover:text-gray-600 text-2xl p-1 rounded-full hover:bg-gray-100 transition duration-150 ease-in-out"
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="mt-4">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Masukkan nama"
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Masukkan email"
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                />
              </div>
              <div className="flex justify-end pt-4 border-t border-gray-200 mt-6">
                <button
                  type="button"
                  className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5 mr-2"
                  onClick={handleCloseModal}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;