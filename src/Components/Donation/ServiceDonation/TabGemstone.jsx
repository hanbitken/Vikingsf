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

const TabGemstone = () => {
  const [gemstones, setGemstones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    donation_informations_id: '',
    title: '',
    description: '',
    pricing: '',
  });
  const [currentItem, setCurrentItem] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const formFields = [
    { label: 'Donation Info ID', name: 'donation_informations_id', type: 'number', required: true },
    { label: 'Title', name: 'title', type: 'text', required: true },
    { label: 'Description', name: 'description', type: 'textarea', required: true },
    { label: 'Pricing', name: 'pricing', type: 'text', required: true },
  ];

  useEffect(() => {
    fetchGemstones();
  }, []);

  const fetchGemstones = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/donation/service/gemstone');
      if (!response.ok) {
        const errorText = await response.text();
        console.error('HTTP Error response (raw text):', errorText);
        let errorMessage = 'Gagal mengambil data Gemstone.';
        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson.message || errorJson.errors ? Object.values(errorJson.errors).flat().join('; ') : errorMessage;
        } catch (e) {
        }
        throw new Error(errorMessage);
      }
      const data = await response.json();
      setGemstones(data);
    } catch (error) {
      console.error('Error fetching gemstones:', error);
      setToastMessage(`Gagal mengambil data Gemstone: ${error.message}`);
      setShowToast(true);
    }
  };

  const handleShowModal = () => {
    setCurrentItem(null);
    setFormData({
      donation_informations_id: '',
      title: '',
      description: '',
      pricing: '',
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
        ? `http://127.0.0.1:8000/api/donation/service/gemstone/${currentItem.id}`
        : 'http://127.0.0.1:8000/api/donation/service/gemstone';

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
        const errorText = await response.text();
        try {
          errorData = JSON.parse(errorText);
        } catch (jsonError) {
          console.error('Gagal parse respons error sebagai JSON:', jsonError);
          errorData = { message: errorText };
        }

        let errorMessage = 'Terjadi kesalahan.';
        if (errorData && errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData && errorData.errors) {
          errorMessage = Object.values(errorData.errors).flat().join('; ');
        } else if (typeof errorData === 'string') {
          errorMessage = errorData;
        }
        throw new Error(errorMessage);
      }

      fetchGemstones();
      handleCloseModal();
      setToastMessage(currentItem ? 'Data Gemstone berhasil diperbarui.' : 'Data Gemstone berhasil ditambahkan.');
      setShowToast(true);
    } catch (error) {
      console.error('Error submitting gemstone data:', error);
      setToastMessage(`Gagal menyimpan data Gemstone: ${error.message}`);
      setShowToast(true);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData({
      donation_informations_id: item.donation_informations_id,
      title: item.title,
      description: item.description,
      pricing: item.pricing,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/donation/service/gemstone/${id}`, { method: 'DELETE' });
        if (!response.ok) {
          let errorData;
          const errorText = await response.text();
          try {
            errorData = JSON.parse(errorText);
          } catch (jsonError) {
            console.error('Gagal parse respons error hapus sebagai JSON:', jsonError);
            errorData = { message: errorText };
          }
          let errorMessage = 'Gagal menghapus data Gemstone.';
          if (errorData && errorData.message) {
            errorMessage = errorData.message;
          } else if (typeof errorData === 'string') {
            errorMessage = errorData;
          }
          throw new Error(errorMessage);
        }
        fetchGemstones();
        setToastMessage('Data Gemstone berhasil dihapus.');
        setShowToast(true);
      } catch (error) {
        console.error('Error deleting gemstone data:', error);
        setToastMessage(`Terjadi kesalahan saat menghapus data Gemstone: ${error.message}`);
        setShowToast(true);
      }
    }
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Gemstone Data (Service Donation)</h2>
        <Button variant="primary" onClick={handleShowModal}>
          Tambah Gemstone
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Donation Info ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Pricing</th>
            <th>Timestamp</th> 
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {gemstones.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.donation_informations_id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.pricing}</td>
              <td>{item.created_at ? dayjs(item.created_at).format('DD/MM/YYYY HH:mm:ss') : '-'}</td>
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
          <Modal.Title>{currentItem ? 'Edit Gemstone' : 'Tambah Gemstone'}</Modal.Title>
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
                    value={field.type === 'number' && formData[field.name] !== '' ? Number(formData[field.name]) : formData[field.name]}
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

export default TabGemstone;