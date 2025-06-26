import React, { useState, useEffect } from 'react';
import api from '../Components/api';

const ItemPackageBonusInfo = () => {
  const [itemPackageBonuses, setItemPackageBonuses] = useState([]);
  const [formData, setFormData] = useState({ package_bonus_id: '', items_id: '' });
  const [currentItem, setCurrentItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('info');
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formFields = [
    { label: 'Package Bonus ID', name: 'package_bonus_id', type: 'number', required: true, placeholder: 'Enter Package Bonus ID (e.g., 1)' },
    { label: 'Item ID', name: 'items_id', type: 'number', required: true, placeholder: 'Enter Item ID (e.g., 1)' },
  ];

  const fetchItemPackageBonuses = async () => {
    setLoading(true);
    try {
      const response = await api.get('/donation/item-package');
      setItemPackageBonuses(Array.isArray(response.data) ? response.data : []);
      setToastMessage('Data Item Package Bonus berhasil dimuat.');
      setToastType('success');
    } catch (error) {
      setToastMessage(`Gagal mengambil data: ${error.response?.data?.message || error.message}`);
      setToastType('error');
      setItemPackageBonuses([]);
    } finally {
      setShowToast(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItemPackageBonuses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      package_bonus_id: Number(formData.package_bonus_id),
      items_id: Number(formData.items_id),
    };

    try {
      if (currentItem) {
        await api.put(`/donation/item-package/${currentItem.id}`, payload);
        setToastMessage('Item Package Bonus berhasil diperbarui.');
      } else {
        await api.post('/donation/item-package', payload);
        setToastMessage('Item Package Bonus berhasil ditambahkan.');
      }

      setToastType('success');
      fetchItemPackageBonuses();
      handleCloseModal();
    } catch (error) {
      let msg = error.response?.data?.message || 'Terjadi kesalahan.';
      if (error.response?.data?.errors) {
        msg = Object.values(error.response.data.errors).flat().join('; ');
      }
      setToastMessage(`Gagal menyimpan: ${msg}`);
      setToastType('error');
    } finally {
      setShowToast(true);
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus item package bonus ini?')) return;
    try {
      await api.delete(`/donation/item-package/${id}`);
      setToastMessage('Item Package Bonus berhasil dihapus.');
      setToastType('success');
      fetchItemPackageBonuses();
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      setToastMessage(`Gagal menghapus: ${msg}`);
      setToastType('error');
    } finally {
      setShowToast(true);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData({ package_bonus_id: item.package_bonus_id, items_id: item.items_id });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentItem(null);
    setFormData({ package_bonus_id: '', items_id: '' });
  };

  useEffect(() => {
    const escListener = (e) => {
      if (e.key === 'Escape') handleCloseModal();
    };
    if (showModal) window.addEventListener('keydown', escListener);
    return () => window.removeEventListener('keydown', escListener);
  }, [showModal]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <h2 className="text-3xl font-bold text-gray-800">Item Package Bonus Information</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md"
        >
          Tambah Item Package Bonus
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Package Bonus ID</th>
              <th className="py-3 px-6 text-left">Item ID</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {loading ? (
              <tr><td colSpan="4" className="text-center py-4">Loading...</td></tr>
            ) : itemPackageBonuses.length > 0 ? (
              itemPackageBonuses.map((item) => (
                <tr key={item.id} className="bg-white border-b hover:bg-gray-100">
                  <td className="py-3 px-6">{item.id}</td>
                  <td className="py-3 px-6">{item.package_bonus_id}</td>
                  <td className="py-3 px-6">{item.items_id}</td>
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
            ) : (
              <tr><td colSpan="4" className="text-center py-4 italic text-gray-500">Tidak ada data tersedia.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center z-50"
          onClick={handleCloseModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
          >
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="text-xl font-semibold">{currentItem ? 'Edit' : 'Tambah'} Item Package Bonus</h3>
              <button className="text-gray-500 text-2xl" onClick={handleCloseModal}>&times;</button>
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
              {formFields.map((field) => (
                <div key={field.name} className="mb-4">
                  <label htmlFor={field.name} className="block text-gray-700 font-medium mb-1">{field.label}</label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    placeholder={field.placeholder}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              ))}
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  {isSubmitting ? 'Menyimpan...' : currentItem ? 'Perbarui' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
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

export default ItemPackageBonusInfo;
