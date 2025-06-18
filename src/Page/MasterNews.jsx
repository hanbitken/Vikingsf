import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

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

    const fetchNews = async () => {
        try {
            const res = await axios.get(API_URL);
            const rawData = Array.isArray(res.data)
                ? res.data
                : Array.isArray(res.data.data)
                    ? res.data.data
                    : [];

            const dataWithEditing = rawData.map(item => ({
                ...item,
                isEditing: false
            }));
            setNews(dataWithEditing);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
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

    const handleAddNews = async () => {
        if (!newTitle.trim() || !newDescription.trim()) {
            Swal.fire('Gagal', 'Judul dan deskripsi harus diisi', 'warning');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', newTitle);
            formData.append('description', newDescription);
            if (newImage) formData.append('image', newImage);

            await axios.post(API_URL, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setIsModalOpen(false);
            setNewTitle('');
            setNewDescription('');
            setNewImage(null);
            setNewImagePreview(null);

            Swal.fire('Sukses', 'Berita berhasil ditambahkan', 'success');
            fetchNews();
        } catch (error) {
            console.error('Error adding news:', error);
            Swal.fire('Gagal', 'Terjadi kesalahan saat menambahkan berita', 'error');
        }
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

    const handleSaveEdit = async (id) => {
        const item = news.find(n => n.id === id);
        if (!item.title.trim() || !item.description.trim()) {
            Swal.fire('Gagal', 'Judul dan deskripsi tidak boleh kosong', 'warning');
            return;
        }

        try {
            await axios.patch(`${API_URL}/${id}`, {
                title: item.title,
                description: item.description,
            });
            toggleEdit(id);
            fetchNews();
            Swal.fire('Sukses', 'Berita berhasil diperbarui', 'success');
        } catch (error) {
            console.error('Error saving edit:', error);
            Swal.fire('Gagal', 'Gagal menyimpan perubahan', 'error');
        }
    };

    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: 'Yakin ingin menghapus?',
            text: 'Tindakan ini tidak dapat dikembalikan!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
        });

        if (!confirm.isConfirmed) return;

        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchNews();
            Swal.fire('Terhapus!', 'Berita telah dihapus.', 'success');
        } catch (error) {
            console.error('Error deleting news:', error);
            Swal.fire('Gagal', 'Terjadi kesalahan saat menghapus', 'error');
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
                <div>
                    {news.length === 0 && <p>No news available</p>}
                    {news.map(item => (
                        <div key={item.id}>
                            <h3>{item.title}</h3>
                        </div>
                    ))}
                </div>

            </div>

            {/* Modal Add News */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded p-6 w-96 relative shadow-lg">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-lg font-bold"
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
