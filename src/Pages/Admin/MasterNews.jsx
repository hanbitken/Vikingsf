import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const API_URL = 'http://127.0.0.1:8000/api/news';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState(null);
  const [isEditingId, setIsEditingId] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await axios.get(API_URL, { responseType: 'text' });
      let rawData = [];

      try {
        const startIndex = res.data.indexOf('[');
        if (startIndex === -1) throw new Error('JSON array tidak ditemukan');

        const jsonString = res.data.substring(startIndex);
        rawData = JSON.parse(jsonString);
      } catch (err) {
        console.error('Gagal parsing JSON bersih:', err);
        if (Array.isArray(res.data)) {
          rawData = res.data;
        } else if (res.data && Array.isArray(res.data.data)) {
          rawData = res.data.data;
        } else {
          rawData = [];
        }
      }

      setNews(rawData);
    } catch (error) {
      console.error('Error fetching news:', error);
      setNews([]);
    }
  };

  const truncateDescription = (desc, wordLimit = 20) => {
    const words = desc.split(' ');
    if (words.length <= wordLimit) return desc;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const openReadMoreModal = (item) => {
    setModalContent(item);
    setIsModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
    setNewImagePreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setNewImage(file);
    setNewImagePreview(URL.createObjectURL(file));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleAddOrEditNews = async () => {
    if (!newTitle.trim() || !newDescription.trim()) {
      Swal.fire('Gagal', 'Judul dan deskripsi harus diisi', 'warning');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', newTitle);
      formData.append('description', newDescription);
      if (newImage) formData.append('image', newImage);

      if (isEditingId) {
        await axios.post(`${API_URL}/${isEditingId}?_method=PUT`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        Swal.fire('Sukses', 'Berita berhasil diperbarui', 'success');
      } else {
        await axios.post(API_URL, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        Swal.fire('Sukses', 'Berita berhasil ditambahkan', 'success');
      }

      resetForm();
      fetchNews();
    } catch (error) {
      console.error('Error saving news:', error);
      Swal.fire('Gagal', 'Terjadi kesalahan saat menyimpan berita', 'error');
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Yakin ingin menghapus?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        Swal.fire('Berhasil', 'Berita dihapus', 'success');
        fetchNews();
      } catch (error) {
        Swal.fire('Gagal', 'Gagal menghapus berita', 'error');
      }
    }
  };

  const handleEdit = (item) => {
    setNewTitle(item.title);
    setNewDescription(item.description);
    setNewImage(null); // reset new image
    setNewImagePreview(item.image || null);
    setIsEditingId(item.id);
    setModalContent(null);
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setNewTitle('');
    setNewDescription('');
    setNewImage(null);
    setNewImagePreview(null);
    setIsEditingId(null);
    setModalContent(null);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">News</h2>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          + Add News
        </button>
      </div>

      <div className="space-y-6">
        {news.length === 0 && <p>No news available</p>}
        {news.map(item => {
          const isLongDesc = item.description.split(' ').length > 20;
          return (
            <div
              key={item.id}
              className="flex border rounded p-3 shadow-sm hover:shadow-md transition"
            >
              <img
                src={item.image || 'https://via.placeholder.com/100x100?text=No+Image'}
                alt={item.title}
                className="w-24 h-24 object-cover rounded mr-4 flex-shrink-0"
              />
              <div className="flex flex-col justify-start flex-1">
                <h3 className="font-bold text-lg text-gray-800 mb-1">{item.title}</h3>
                <p className="text-gray-700">
                  {isLongDesc ? truncateDescription(item.description) : item.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {isLongDesc && (
                    <button
                      onClick={() => openReadMoreModal(item)}
                      className="text-blue-600 hover:underline"
                    >
                      Read More
                    </button>
                  )}
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-yellow-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && !modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded p-6 w-96 relative shadow-lg max-h-[90vh] overflow-auto">
            <button
              onClick={resetForm}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">
              {isEditingId ? 'Edit Berita' : 'Tambah Berita'}
            </h2>

            <input
              type="text"
              placeholder="Judul"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mb-3"
            />
            <textarea
              rows={4}
              placeholder="Deskripsi"
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 mb-4"
            />

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById('fileInput').click()}
              className="w-full h-32 border-2 border-dashed border-gray-300 rounded flex justify-center items-center cursor-pointer mb-5"
            >
              {newImagePreview ? (
                <img
                  src={newImagePreview}
                  alt="Preview"
                  className="max-h-full object-contain"
                />
              ) : (
                <span className="text-gray-400">Klik atau seret gambar ke sini</span>
              )}
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            <button
              onClick={handleAddOrEditNews}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              {isEditingId ? 'Simpan Perubahan' : 'Tambah'}
            </button>
          </div>
        </div>
      )}

      {isModalOpen && modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded max-w-lg w-full max-h-[90vh] overflow-auto p-6 relative">
            <button
              onClick={resetForm}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl font-bold"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">{modalContent.title}</h2>
            <img
              src={modalContent.image || 'https://via.placeholder.com/400x200?text=No+Image'}
              alt={modalContent.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <p className="text-gray-800 whitespace-pre-line">{modalContent.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPage;