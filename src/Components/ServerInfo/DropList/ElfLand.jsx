import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Toast,
  ToastContainer,
} from 'react-bootstrap';
import dayjs from 'dayjs';

const ElfLand = () => { 
  const [elfLands, setElfLands] = useState([]); 
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    game_information_id: '',
    title: '',
    description: '',
  });
  const [currentItem, setCurrentItem] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const formFields = [
    { label: 'Game Info ID', name: 'game_information_id', type: 'number', required: true },
    { label: 'Title', name: 'title', type: 'text', required: true },
    { label: 'Description', name: 'description', type: 'textarea', required: false },
  ];

  useEffect(() => {
    fetchElfLands(); 
  }, []);

  const fetchElfLands = async () => { 
    try {
      const response = await fetch('http://127.0.0.1:8000/api/game-info/server-information/elfland'); 
      const data = await response.json();
      setElfLands(data); 
    } catch (error) {
      console.error('Error fetching Elf Lands:', error); 
    }
  };

  const handleShowModal = () => {
    setCurrentItem(null);
    setFormData({
      game_information_id: '',
      title: '',
      description: '',
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
          ? `http://127.0.0.1:8000/api/game-info/server-information/elfland/${currentItem.id}` 
          : 'http://127.0.0.1:8000/api/game-info/server-information/elfland'; 

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (response.ok) {
          fetchElfLands(); 
          handleCloseModal();
          setToastMessage(currentItem ? 'Elf Land berhasil diperbarui.' : 'Elf Land berhasil ditambahkan.'); 
          setShowToast(true);
        } else {
          throw new Error(result.message || 'Terjadi kesalahan.');
        }
      } catch (error) {
        console.error('Error submitting Elf Land:', error); 
        setToastMessage('Gagal menyimpan Elf Land.'); 
        setShowToast(true);
      }
    };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData({
      game_information_id: item.game_information_id,
      title: item.title,
      description: item.description,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/game-info/server-information/elfland/${id}`, { method: 'DELETE' }); 
        if (response.ok) {
          fetchElfLands(); 
          setToastMessage('Elf Land berhasil dihapus.'); 
          setShowToast(true);
        } else {
          throw new Error('Gagal menghapus data.');
        }
      } catch (error) {
        console.error('Error deleting Elf Land:', error); 
        setToastMessage('Terjadi kesalahan saat menghapus.'); 
        setShowToast(true);
      }
    }
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Elf Land</h2> 
        <Button variant="primary" onClick={handleShowModal}>
          Tambah Elf Land
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Game Info ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Timestamps</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {elfLands.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.game_information_id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{dayjs(item.timestamps).format('DD/MM/YYYY HH:mm')}</td> 
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(item)}>
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Form */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentItem ? 'Edit Elf Land' : 'Tambah Elf Land'}</Modal.Title> 
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {formFields.map((field, index) => (
              <Form.Group className="mb-3" key={index}>
                <Form.Label>{field.label}</Form.Label>
                {field.type === 'textarea' ? (
                  <Form.Control
                    as="textarea"
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    rows={3}
                    required={field.required}
                  />
                ) : (
                  <Form.Control
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required={field.required}
                  />
                )}
              </Form.Group>
            ))}
            <div className="d-flex justify-content-end">
              <Button variant="success" type="submit">
                {currentItem ? 'Perbarui' : 'Simpan'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide bg="info">
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default ElfLand; 