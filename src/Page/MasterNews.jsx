import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/news';

const NewsPage = () => {
    const [news, setNews] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newImage, setNewImage] = useState(null);
    const [newImagePreview, setNewImagePreview] = useState(null);

    useEffect(() => {
        fetchNews();
    }, []);

    // Fetch semua news dari backend
    const fetchNews = async () => {
        try {
            const res = await axios.get(API_URL);
            // Tambah properti isEditing default false tiap item
            const dataWithEditing = res.data.map(item => ({ ...item, isEditing: false }));
            setNews(dataWithEditing);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    // Handle upload gambar & preview
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

    // Submit berita baru ke backend
    const handleAddNews = async () => {
        if (!newTitle.trim() || !newDescription.trim()) {
            alert('Judul dan deskripsi harus diisi');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', newTitle);
            formData.append('description', newDescription);
            if (newImage) formData.append('image', newImage); // file image

            await axios.post(API_URL, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setIsModalOpen(false);
            setNewTitle('');
            setNewDescription('');
            setNewImage(null);
            setNewImagePreview(null);

            fetchNews(); // refresh data
        } catch (error) {
            console.error('Error adding news:', error);
        }
    };


    // Toggle mode edit berita
    const toggleEdit = (id) => {
        setNews(news.map(item =>
            item.id === id ? { ...item, isEditing: !item.isEditing } : item
        ));
    };

    // Edit field title/description lokal state
    const handleEditChange = (id, field, value) => {
        setNews(news.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    // Simpan perubahan berita ke backend (PATCH)
    const handleSaveEdit = async (id) => {
        const item = news.find(n => n.id === id);
        if (!item.title.trim() || !item.description.trim()) {
            alert('Judul dan deskripsi tidak boleh kosong');
            return;
        }

        try {
            await axios.patch(`${API_URL}/${id}`, {
                title: item.title,
                description: item.description,
                // Jika backend mendukung update gambar, tambahkan juga disini
            });
            toggleEdit(id);
            fetchNews();
        } catch (error) {
            console.error('Error saving edit:', error);
        }
    };

    // Hapus berita dari backend
    const handleDelete = async (id) => {
        if (!window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) return;

        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchNews();
        } catch (error) {
            console.error('Error deleting news:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">News</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
                >
                    + Add News
                </button>
            </div>

            <div className="space-y-5">
                {news.map(item => (
                    <div
                        key={item.id}
                        className="flex items-start bg-white border rounded shadow p-4"
                    >
                        <img
                            src={item.image}  // item.image harus URL lengkap
                            alt={item.title}
                            className="w-24 h-24 object-cover rounded mr-5"
                        />
                        <div className="flex-1">
                            {item.isEditing ? (
                                <>
                                    <input
                                        type="text"
                                        value={item.title}
                                        onChange={e => handleEditChange(item.id, 'title', e.target.value)}
                                        className="w-full border rounded p-2 mb-2"
                                    />
                                    <textarea
                                        rows={3}
                                        value={item.description}
                                        onChange={e => handleEditChange(item.id, 'description', e.target.value)}
                                        className="w-full border rounded p-2"
                                    />
                                </>
                            ) : (
                                <>
                                    <h3 className="text-xl font-semibold">{item.title}</h3>
                                    <p className="mt-1 text-gray-600">{item.description}</p>
                                </>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 ml-5">
                            {item.isEditing ? (
                                <button
                                    onClick={() => handleSaveEdit(item.id)}
                                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                                >
                                    Simpan
                                </button>
                            ) : (
                                <button
                                    onClick={() => toggleEdit(item.id)}
                                    className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                                >
                                    Edit
                                </button>
                            )}

                            <button
                                onClick={() => handleDelete(item.id)}
                                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Add News */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded p-6 w-96 relative shadow-lg">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg font-bold"
                            aria-label="Close modal"
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-bold mb-4">Tambah Berita</h2>

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
