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

const FeaturesEnable = () => {
  const [featuresEnables, setFeaturesEnables] = useState([]);
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
    { label: 'Game Info ID', name: 'game_information_id', type: 'number', required: true, placeholder: 'Enter Game Info ID (e.g., 1)' },
    { label: 'Title', name: 'title', type: 'text', required: true },
    { label: 'Description', name: 'description', type: 'textarea', required: false },
  ];

  useEffect(() => {
    fetchFeaturesEnables();
  }, []);

  const fetchFeaturesEnables = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/game-info/server-information/feature-enable');
      if (!response.ok) {
          throw new Error('Gagal mengambil data Features Enable: ' + response.statusText);
      }
      const data = await response.json();
      setFeaturesEnables(data);
    } catch (error) {
      console.error('Error fetching Features Enable data:', error);
      setToastMessage(`Gagal mengambil data Features Enable: ${error.message}`);
      setShowToast(true);
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
        ? `http://127.0.0.1:8000/api/game-info/server-information/feature-enable/${currentItem.id}`
        : 'http://127.0.0.1:8000/api/game-info/server-information/feature-enable';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const clonedResponse = response.clone();
      let data;

      try {
        data = await response.json();
      } catch (jsonError) {
        const rawText = await clonedResponse.text();
        console.error("Gagal parse respons sebagai JSON:", jsonError);
        console.error("Teks respons mentah (non-JSON):", rawText);
        throw new Error(`Respons tidak valid dari server (${response.status}): ${rawText.substring(0, 100)}...`);
      }

      if (response.ok) {
        fetchFeaturesEnables();
        handleCloseModal();
        setToastMessage(currentItem ? 'Feature Enable berhasil diperbarui.' : 'Feature Enable berhasil ditambahkan.');
        setShowToast(true);
      } else {
        console.error('Backend error response:', data);
        let errorMessage = 'Terjadi kesalahan.';
        if (data && data.message) {
            errorMessage = data.message;
        } else if (data && data.errors) {
            errorMessage = Object.values(data.errors).flat().join('; ');
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error submitting Feature Enable data:', error);
      setToastMessage(`Gagal menyimpan Feature Enable data: ${error.message}`);
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
        const response = await fetch(`http://127.0.0.1:8000/api/game-info/server-information/feature-enable/${id}`, {
          method: 'DELETE',
        });
        
        const clonedResponse = response.clone();
        let data;

        try {
          data = await response.json();
        } catch (jsonError) {
          const rawText = await clonedResponse.text();
          console.error("Gagal parse respons error hapus sebagai JSON:", jsonError);
          console.error("Teks respons hapus mentah:", rawText);
          throw new Error(`Respons tidak valid dari server (${response.status}) saat menghapus: ${rawText.substring(0, 100)}...`);
        }

        if (response.ok) {
          fetchFeaturesEnables();
          setToastMessage('Feature Enable berhasil dihapus.');
          setShowToast(true);
        } else {
          let errorMessage = 'Gagal menghapus data.';
          if (data && data.message) {
              errorMessage = data.message;
          }
          throw new Error(errorMessage);
        }
      } catch (error) {
        console.error('Error deleting Feature Enable data:', error);
        setToastMessage(`Terjadi kesalahan saat menghapus: ${error.message}`);
        setShowToast(true);
      }
    }
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Features Enable</h2>
        <Button variant="primary" onClick={handleShowModal}>
          Tambah Feature Enable
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Game Info ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created At</th> 
            <th>Updated At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {featuresEnables.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.game_information_id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              {/* Menggunakan item.created_at dan item.updated_at */}
              <td>{item.created_at ? dayjs(item.created_at).format('DD/MM/YYYY HH:mm') : 'N/A'}</td>
              <td>{item.updated_at ? dayjs(item.updated_at).format('DD/MM/YYYY HH:mm') : 'N/A'}</td>
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
          <Modal.Title>{currentItem ? 'Edit Feature Enable' : 'Tambah Feature Enable'}</Modal.Title>
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
                    placeholder={field.placeholder}
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

      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide bg="info">
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default FeaturesEnable;