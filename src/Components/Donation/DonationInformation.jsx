import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import api from '../../Components/api';

const DonationInformation = () => {
  const [donations, setDonations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '' });
  const [currentItem, setCurrentItem] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('info');

  const formFields = [
    { label: 'Name', name: 'name', type: 'text', required: true, placeholder: 'Enter donation name' },
  ];

  const fetchDonationInfos = async () => {
    try {
      const response = await api.get('/donation/donation-info');
      setDonations(response.data);
    } catch (error) {
      setToastMessage(`Gagal mengambil Donasi: ${error.response?.data?.message || error.message}`);
      setToastType('error');
      setShowToast(true);
    }
  };

  useEffect(() => {
    fetchDonationInfos();
  }, []);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && handleCloseModal();
    if (showModal) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [showModal]);

  const handleShowModal = () => {
    setCurrentItem(null);
    setFormData({ name: '' });
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentItem) {
        await api.put(`/donation/donation-info/${currentItem.id}`, formData);
        setToastMessage('Informasi Donasi berhasil diperbarui.');
      } else {
        await api.post('/donation/donation-info', formData);
        setToastMessage('Informasi Donasi berhasil ditambahkan.');
      }
      setToastType('success');
      fetchDonationInfos();
      handleCloseModal();
      setShowToast(true);
    } catch (error) {
      setToastMessage(`Gagal menyimpan Informasi Donasi: ${error.response?.data?.message || error.message}`);
      setToastType('error');
      setShowToast(true);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData({ name: item.name });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus data ini?')) return;
    try {
      await api.delete(`/donation/donation-info/${id}`);
      fetchDonationInfos();
      setToastMessage('Informasi Donasi berhasil dihapus.');
      setToastType('success');
      setShowToast(true);
    } catch (error) {
      setToastMessage(`Terjadi kesalahan saat menghapus: ${error.response?.data?.message || error.message}`);
      setToastType('error');
      setShowToast(true);
    }
  };

  const getToastColor = (type) => {
    switch (type) {
      case 'success': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Donation Information</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
          onClick={handleShowModal}
        >
          Tambah Donation Information
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Created At</th>
              <th className="py-3 px-6 text-left">Updated At</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {donations.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-6 px-6 text-center text-gray-500">Tidak ada data donasi.</td>
              </tr>
            ) : (
              donations.map((item) => (
                <tr key={item.id} className="bg-white border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{item.id}</td>
                  <td className="py-3 px-6">{item.name}</td>
                  <td className="py-3 px-6">{dayjs(item.created_at).format('DD/MM/YYYY HH:mm')}</td>
                  <td className="py-3 px-6">{dayjs(item.updated_at).format('DD/MM/YYYY HH:mm')}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded text-xs mr-2"
                      onClick={() => handleEdit(item)}
                    >Edit</button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-xs"
                      onClick={() => handleDelete(item.id)}
                    >Hapus</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50" onClick={handleCloseModal}>
          <div
            className="bg-white w-full max-w-md p-6 rounded shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-lg font-semibold">
                {currentItem ? 'Edit Donation Information' : 'Tambah Donation Information'}
              </h3>
              <button className="text-2xl text-gray-400 hover:text-gray-600" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
              {formFields.map((field, idx) => (
                <div key={idx} className="mb-4">
                  <label htmlFor={field.name} className="block text-sm font-bold text-gray-700 mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    placeholder={field.placeholder}
                    className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md"
                >
                  {currentItem ? 'Perbarui' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className={`${getToastColor(toastType)} text-white px-6 py-3 rounded-lg shadow-lg flex items-center`}>
            <span>{toastMessage}</span>
            <button
              onClick={() => setShowToast(false)}
              className="ml-4 text-white text-xl font-bold"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationInformation;
