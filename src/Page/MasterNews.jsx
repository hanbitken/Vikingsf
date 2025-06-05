import React, { useState } from 'react';

const NewsPage = () => {
  const [news, setNews] = useState([
    {
      id: 1,
      title: 'Judul Berita 1',
      description: 'Deskripsi singkat berita pertama.',
      image: 'https://via.placeholder.com/100',
      isEditing: false,
    },
    {
      id: 2,
      title: 'Judul Berita 2',
      description: 'Deskripsi singkat berita kedua.',
      image: 'https://via.placeholder.com/100',
      isEditing: false,
    },
    {
      id: 3,
      title: 'Judul Berita 3',
      description: 'Deskripsi singkat berita ketiga.',
      image: 'https://via.placeholder.com/100',
      isEditing: false,
    },
    {
      id: 4,
      title: 'Judul Berita 4',
      description: 'Deskripsi singkat berita keempat.',
      image: 'https://via.placeholder.com/100',
      isEditing: false,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState(null);

  const handleAddNews = () => {
    const newNewsItem = {
      id: news.length + 1,
      title: newTitle,
      description: newDescription,
      image: newImagePreview || 'https://via.placeholder.com/100',
      isEditing: false,
    };
    setNews([newNewsItem, ...news]);
    setIsModalOpen(false);
    setNewTitle('');
    setNewDescription('');
    setNewImage(null);
    setNewImagePreview(null);
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

  const toggleEdit = (id) => {
    setNews(news.map(item =>
      item.id === id ? { ...item, isEditing: !item.isEditing } : item
    ));
  };

  const handleEditChange = (id, field, value) => {
    setNews(news.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus berita ini?');
    if (confirmDelete) {
      setNews(news.filter(item => item.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">News</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add News
        </button>
      </div>

      <div className="space-y-4">
        {news.map((item) => (
          <div
            key={item.id}
            className="flex items-start bg-white border border-gray-300 rounded p-4 shadow-sm"
          >
            <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded mr-4" />
            <div className="flex-1">
              {item.isEditing ? (
                <div>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleEditChange(item.id, 'title', e.target.value)}
                    className="w-full border p-1 rounded mb-1"
                  />
                  <textarea
                    value={item.description}
                    onChange={(e) => handleEditChange(item.id, 'description', e.target.value)}
                    className="w-full border p-1 rounded"
                    rows={2}
                  />
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2 ml-4">
              <button
                onClick={() => toggleEdit(item.id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                {item.isEditing ? 'Simpan' : 'Edit'}
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Tambah Berita</h2>
            <input
              type="text"
              placeholder="Judul"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mb-3"
            />
            <textarea
              placeholder="Deskripsi"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded mb-3"
              rows={3}
            />
            <div
              className="w-full h-32 border-2 border-dashed border-gray-300 rounded flex items-center justify-center text-gray-500 mb-4 cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById('fileInput').click()}
            >
              {newImagePreview ? (
                <img src={newImagePreview} alt="Preview" className="h-full object-contain" />
              ) : (
                'Klik atau seret gambar ke sini'
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
              onClick={handleAddNews}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Tambah
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
