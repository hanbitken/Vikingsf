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

const ServerRules = () => {
  const [serverRules, setServerRules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    game_information_id: '',
    title: '',
    description: '',
  });
  const [currentRule, setCurrentRule] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const fetchServerRules = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/game-info/server-rules');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal mengambil data aturan server.');
      }
      const data = await response.json();
      setServerRules(data);
    } catch (error) {
      console.error('Error fetching server rules:', error);
      setToastMessage(`Gagal mengambil aturan server: ${error.message}`);
      setShowToast(true);
    }
  };

  useEffect(() => {
    fetchServerRules();
  }, []);

  const handleShowModal = () => {
    setCurrentRule(null);
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
      const method = currentRule ? 'PUT' : 'POST';
      const url = currentRule
        ? `http://127.0.0.1:8000/api/game-info/server-rules/${currentRule.id}`
        : 'http://127.0.0.1:8000/api/game-info/server-rules';

      const payload = {
        ...formData,
      };

      if (!currentRule) {
        payload.timestamps = dayjs().toISOString();
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (jsonError) {
          errorData = response.statusText;
          console.error("Gagal parse respons error sebagai JSON:", jsonError);
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

      fetchServerRules();
      handleCloseModal();
      setToastMessage(
        currentRule
            ? 'Aturan server berhasil diperbarui.'
            : 'Aturan server berhasil ditambahkan.'
      );
      setShowToast(true);
    } catch (error) {
      console.error('Error submitting server rule:', error);
      setToastMessage(`Gagal menyimpan aturan server: ${error.message}`);
      setShowToast(true);
    }
  };

  const handleEdit = (rule) => {
    setCurrentRule(rule);
    setFormData({
      game_information_id: rule.game_information_id,
      title: rule.title,
      description: rule.description,
      timestamps: rule.timestamps,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus aturan ini?')) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/game-info/server-rules/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch (jsonError) {
            errorData = response.statusText;
            console.error("Gagal parse respons error hapus sebagai JSON:", jsonError);
          }
          let errorMessage = 'Gagal menghapus data.';
          if (typeof errorData === 'string') {
              errorMessage = errorData;
          } else if (errorData && errorData.message) {
              errorMessage = errorData.message;
          }
          throw new Error(errorMessage);
        }
        fetchServerRules();
        setToastMessage('Aturan server berhasil dihapus.');
        setShowToast(true);
      } catch (error) {
        console.error('Error deleting rule:', error);
        setToastMessage(`Terjadi kesalahan saat menghapus: ${error.message}`);
        setShowToast(true);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Server Rules</h2>
        <Button variant="primary" onClick={handleShowModal}>
          Tambah Aturan
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
          {serverRules.map((rule) => (
            <tr key={rule.id}>
              <td>{rule.id}</td>
              <td>{rule.game_information_id}</td>
              <td>{rule.title}</td>
              <td>
                {rule.description && ( 
                  <ol style={{ paddingLeft: '20px', margin: 0 }}>
                    {rule.description.split('\n').map((item, index) => (
                      item.trim() !== '' && <li key={index}>{item}</li>
                    ))}
                  </ol>
                )}
              </td>
              <td>{dayjs(rule.timestamps).format('DD/MM/YYYY HH:mm')}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(rule)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(rule.id)}
                >
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {currentRule ? 'Edit Aturan' : 'Tambah Aturan Server'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGameInfoId">
              <Form.Label>Game Info ID</Form.Label>
              <Form.Control
                type="number"
                name="game_information_id" 
                value={formData.game_information_id} 
                onChange={handleChange}
                placeholder="Masukkan Game Info ID"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Masukkan judul aturan server"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5} 
                placeholder="Tulis setiap item daftar di baris baru. Contoh:&#10;Item pertama&#10;Item kedua" // Petunjuk untuk user
              />
            </Form.Group>

            <div className="d-flex">
              <Button variant="success" type="submit" className="ms-auto">
                {currentRule ? 'Perbarui' : 'Simpan'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <ToastContainer position="top-end" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg="info"
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default ServerRules;