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

const GameInformation = () => {
  const [gameInfos, setGameInfos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
  });
  const [currentItem, setCurrentItem] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const fetchGameInfos = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/game-info/game-data');
      const data = await response.json();
      setGameInfos(data);
    } catch (error) {
      console.error('Error fetching game information:', error);
    }
  };

  useEffect(() => {
    fetchGameInfos();
  }, []);

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
          console.error("Gagal parse respons error sebagai JSON:", jsonError);
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

      const result = await response.json();
      
      fetchGameInfos();
      handleCloseModal();
      setToastMessage(currentItem ? 'Game Information berhasil diperbarui.' : 'Game Information berhasil ditambahkan.');
      setShowToast(true);
    } catch (error) {
      console.error('Error submitting game information:', error);
      setToastMessage(`Gagal menyimpan Game Information: ${error.message}`);
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
          setToastMessage('Game Information berhasil dihapus.');
          setShowToast(true);
        } else {
          let errorData;
          try {
            errorData = await response.json();
          } catch (jsonError) {
            errorData = response.statusText;
            console.error("Gagal parse respons error hapus sebagai JSON:", jsonError);
            console.error("Teks respons hapus mentah:", await response.text());
          }
          let errorMessage = 'Gagal menghapus Game Information.';
          if (typeof errorData === 'string') {
              errorMessage = errorData;
          } else if (errorData && errorData.message) {
              errorMessage = errorData.message;
          }
          throw new Error(errorMessage);
        }
      } catch (error) {
        console.error('Error deleting game information:', error);
        setToastMessage(`Terjadi kesalahan saat menghapus Game Information: ${error.message}`);
        setShowToast(true);
      }
    }
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Game Information</h2>
        <Button variant="primary" onClick={handleShowModal}>
          Tambah Game Information
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {gameInfos.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{dayjs(item.created_at).format('DD/MM/YYYY HH:mm')}</td>
              <td>{dayjs(item.updated_at).format('DD/MM/YYYY HH:mm')}</td>
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentItem ? 'Edit Game Information' : 'Tambah Game Information'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="success" type="submit">
                {currentItem ? 'Perbarui' : 'Simpan'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide bg="info">
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default GameInformation;
