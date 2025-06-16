import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const GameInformation = () => {
  const [gameInfos, setGameInfos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
  });
  const [currentItem, setCurrentItem] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState('info');

  const fetchGameInfos = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/game-info/game-data');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setGameInfos(data);
    } catch (error) {
      console.error('Error fetching game information:', error);
      setToastMessage(`Gagal mengambil informasi game: ${error.message}`);
      setToastType('error');
      setShowToast(true);
    }
  };

  useEffect(() => {
    fetchGameInfos();
  }, []);

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
    setFormData({
      name: '',
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = currentItem ? 'PUT' : 'POST';
      const url = currentItem
        ? `http://127.0.0.1:8000/api/game-info/game-data/${currentItem.id}`
        : 'http://127.0.0.1:8000/api/game-info/game-data';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (jsonError) {
          errorData = response.statusText;
          console.error("Gagal mengurai respons error sebagai JSON:", jsonError);
          console.error("Teks respons mentah:", await response.text());
        }

        let errorMessage = 'Terjadi kesalahan.';
        if (typeof errorData === 'string') {
            errorMessage = errorData;
        } else if (errorData && errorData.message) {
            errorMessage = errorData.message;
        } else if (errorData && errorData.errors) {
            errorMessage = Object.values(errorData.errors).flat().join('; ');
        }
        throw new Error(errorMessage);
      }

      fetchGameInfos();
      handleCloseModal();
      setToastMessage(currentItem ? 'Informasi Game berhasil diperbarui.' : 'Informasi Game berhasil ditambahkan.');
      setToastType('success');
      setShowToast(true);
    } catch (error) {
      console.error('Error saat mengirim informasi game:', error);
      setToastMessage(`Gagal menyimpan Informasi Game: ${error.message}`);
      setToastType('error');
      setShowToast(true);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData({
      name: item.name,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/game-info/game-data/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchGameInfos();
          setToastMessage('Informasi Game berhasil dihapus.');
          setToastType('success');
          setShowToast(true);
        } else {
          let errorData;
          try {
            errorData = await response.json();
          } catch (jsonError) {
            errorData = response.statusText;
            console.error("Gagal mengurai respons error penghapusan sebagai JSON:", jsonError);
            console.error("Teks respons penghapusan mentah:", await response.text());
          }
          let errorMessage = 'Gagal menghapus Informasi Game.';
          if (typeof errorData === 'string') {
              errorMessage = errorData;
          } else if (errorData && errorData.message) {
              errorMessage = errorData.message;
          }
          throw new Error(errorMessage);
        }
      } catch (error) {
        console.error('Error saat menghapus informasi game:', error);
        setToastMessage(`Terjadi kesalahan saat menghapus Informasi Game: ${error.message}`);
        setToastType('error');
        setShowToast(true);
      }
    }
  };

  const getToastColor = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Informasi Game</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
          onClick={handleShowModal}
        >
          Tambah Informasi Game
        </button>
      </div>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Nama</th>
              <th className="py-3 px-6 text-left">Dibuat Pada</th>
              <th className="py-3 px-6 text-left">Diperbarui Pada</th>
              <th className="py-3 px-6 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm">
            {gameInfos.map((item, index) => (
              <tr
                key={item.id}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-gray-100 border-b border-gray-200 transition duration-150 ease-in-out`}
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">{item.id}</td>
                <td className="py-3 px-6 text-left">{item.name}</td>
                <td className="py-3 px-6 text-left">{dayjs(item.created_at).format('DD/MM/YYYY HH:mm')}</td>
                <td className="py-3 px-6 text-left">{dayjs(item.updated_at).format('DD/MM/YYYY HH:mm')}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-xs mr-2 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 transition duration-200 ease-in-out"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-xs shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-200 ease-in-out"
                    onClick={() => handleDelete(item.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
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
                {currentItem ? 'Edit Informasi Game' : 'Tambah Informasi Game'}
              </h3>
              <button
                className="text-gray-400 hover:text-gray-600 text-2xl p-1 rounded-full hover:bg-gray-100 transition duration-150 ease-in-out"
                onClick={handleCloseModal}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-4">
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
                  className="shadow-sm appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition duration-300 ease-in-out transform hover:-translate-y-0.5"
                >
                  {currentItem ? 'Perbarui' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
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

export default GameInformation;