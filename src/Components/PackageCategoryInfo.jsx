import React, { useState, useEffect } from 'react';

const PackageCategoryInfo = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  // Removed 'description' from formData state
  const [formData, setFormData] = useState({
    category_name: '',
  });
  const [currentItem, setCurrentItem] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('info');
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const TABLE_COLUMNS_COUNT = 3; 

  const formFields = [
    { label: 'Category Name', name: 'category_name', type: 'text', required: true, placeholder: 'Enter Category Name' },
  ];

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/donation/package-categories');
      if (!response.ok) {
        if (response.status === 404) {
          setCategories([]);
          setToastMessage('Tidak ada data kategori paket.');
          setToastType('info');
        } else {
          const errorText = await response.text();
          throw new Error(`Gagal mengambil data kategori: Status ${response.status} - ${errorText}`);
        }
      } else {
        const data = await response.json();
        setCategories(Array.isArray(data) ? data : []);
        setToastMessage('Data kategori paket berhasil dimuat.');
        setToastType('success');
      }
      setShowToast(true);
    } catch (error) {
      setToastMessage(`Gagal mengambil data kategori: ${error.message}`);
      setToastType('error');
      setShowToast(true);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const method = currentItem ? 'PUT' : 'POST';
    const url = currentItem
      ? `http://127.0.0.1:8000/api/donation/package-categories/${currentItem.id}`
      : 'http://127.0.0.1:8000/api/donation/package-categories';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      });

      const clonedResponse = response.clone();
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        const rawText = await clonedResponse.text();
        throw new Error(`Invalid response from server (${response.status}): ${rawText.substring(0, 100)}...`);
      }

      if (response.ok) {
        fetchCategories();
        handleCloseModal();
        setToastMessage(currentItem ? 'Kategori paket berhasil diperbarui.' : 'Kategori paket berhasil ditambahkan.');
        setToastType('success');
        setShowToast(true);
      } else {
        let errorMessage = 'Terjadi kesalahan.';
        if (data && data.message) {
            errorMessage = data.message;
        } else if (data && data.errors) {
            errorMessage = Object.values(data.errors).flat().join('; ');
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      setToastMessage(`Gagal menyimpan kategori: ${error.message}`);
      setToastType('error');
      setShowToast(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus kategori ini?')) return;
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/donation/package-categories/${id}`, {
        method: 'DELETE',
        headers: { 'Accept': 'application/json' },
      });

      const clonedResponse = response.clone();
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        const rawText = await clonedResponse.text();
        throw new Error(`Invalid response from server (${response.status}) on delete: ${rawText.substring(0, 100)}...`);
      }

      if (response.ok) {
        fetchCategories();
        setToastMessage('Kategori paket berhasil dihapus.');
        setToastType('success');
        setShowToast(true);
      } else {
        let errorMessage = 'Gagal menghapus data.';
        if (data && data.message) {
            errorMessage = data.message;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      setToastMessage(`Terjadi kesalahan saat menghapus: ${error.message}`);
      setToastType('error');
      setShowToast(true);
    }
  };

  useEffect(() => {
    let timer;
    if (showToast) {
      timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [showToast]);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };
    if (showModal) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [showModal]);

  const handleShowModal = () => {
    setCurrentItem(null);
    // Reset formData to only category_name
    setFormData({
      category_name: '',
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    // Set formData for editing based only on category_name
    setFormData({
      category_name: item.category_name,
    });
    setShowModal(true);
  };

  const getToastColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'info':
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Package Categories</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
          onClick={handleShowModal}
        >Tambah Kategori</button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Category Name</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {loading ? (
              <tr><td colSpan={TABLE_COLUMNS_COUNT} className="text-center py-4 text-gray-500">Loading...</td></tr>
            ) : categories.length > 0 ? (
              categories.map((cat, index) => (
                <tr
                  key={cat.id}
                  className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 border-b border-gray-200 transition duration-150 ease-in-out`}
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">{cat.id}</td>
                  <td className="py-3 px-6 text-left">{cat.category_name}</td>
                  {/* Removed Description column data */}
                  <td className="py-3 px-6 text-center">
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-xs mr-2 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 transition duration-200 ease-in-out"
                      onClick={() => handleEdit(cat)}
                    >Edit</button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-xs shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-200 ease-in-out"
                      onClick={() => handleDelete(cat.id)}
                    >Hapus</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={TABLE_COLUMNS_COUNT} className="text-center py-4 text-gray-500 italic">Tidak ada data kategori paket yang tersedia.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-75 overflow-y-auto h-full w-full flex items-center justify-center z-50 transition-opacity duration-300 ease-out"
          style={{ opacity: showModal ? 1 : 0 }}
          onClick={handleCloseModal}
        >
          <div
            className="relative p-8 bg-white w-full max-w-md mx-auto rounded-lg shadow-2xl transition-all duration-300 ease-out"
            style={{
              transform: showModal ? 'translateY(0) scale(1)' : 'translateY(-50px) scale(0.95)',
              opacity: showModal ? 1 : 0
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                {currentItem ? 'Edit Kategori Paket' : 'Tambah Kategori Paket'}
              </h3>
              <button
                className="text-gray-400 hover:text-gray-600 text-2xl p-1 rounded-full hover:bg-gray-100 transition duration-150 ease-in-out"
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
              {formFields.map((field, index) => (
                <div className="mb-4" key={index}>
                  <label htmlFor={field.name} className="block text-gray-700 text-sm font-bold mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                    placeholder={field.placeholder}
                    className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                  />
                </div>
              ))}
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
                >
                  {isSubmitting ? 'Menyimpan...' : (currentItem ? 'Perbarui' : 'Simpan')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed bottom-4 right-4 z-50 animate-slideInFromRight">
          <div className={`${getToastColor(toastType)} text-white px-6 py-3 rounded-lg shadow-lg flex items-center transition duration-300 ease-in-out transform hover:scale-105`}>
            <span>{toastMessage}</span>
            <button
              onClick={() => setShowToast(false)}
              className="ml-4 text-white text-xl leading-none font-bold opacity-75 hover:opacity-100 transition duration-150 ease-in-out"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageCategoryInfo;