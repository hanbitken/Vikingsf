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

const RetailDonation = () => {
  const [retailDonations, setRetailDonations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    donation_informations_id: '',
    title: '',
    description: '',
    pricing: '',
    timestamps: '', 
  });
  const [currentItem, setCurrentItem] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const formFields = [
    { label: 'Donation ID', name: 'donation_informations_id', type: 'number', required: true },
    { label: 'Judul', name: 'title', type: 'text', required: true },
    { label: 'Deskripsi', name: 'description', type: 'textarea', required: false },
    { label: 'Harga', name: 'pricing', type: 'text', required: true },
  ];

  useEffect(() => {
    fetchRetailDonations();
  }, []);

  const fetchRetailDonations = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/donation/retail');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal mengambil data Retail Donation.');
      }
      const data = await response.json();
      setRetailDonations(data);
    } catch (error) {
      console.error('Error fetching retail donations:', error);
      setToastMessage(`Gagal mengambil Retail Donation: ${error.message}`);
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
      timestamps: dayjs().toISOString(), 
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
        ? `http://127.0.0.1:8000/api/donation/retail/${currentItem.id}`
        : 'http://127.0.0.1:8000/api/donation/retail';

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

      fetchRetailDonations();
      handleCloseModal();
      setToastMessage(currentItem ? 'Retail Donation berhasil diperbarui.' : 'Retail Donation berhasil ditambahkan.');
      setShowToast(true);
    } catch (error) {
      console.error('Error submitting retail donation:', error);
      setToastMessage(`Gagal menyimpan Retail Donation: ${error.message}`);
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
      timestamps: item.timestamps, 
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/donation/retail/${id}`, { method: 'DELETE' });
        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch (jsonError) {
            errorData = response.statusText;
            console.error("Gagal parse respons error hapus sebagai JSON:", jsonError);
          }
          let errorMessage = 'Gagal menghapus Retail Donation.';
          if (typeof errorData === 'string') {
              errorMessage = errorData;
          } else if (errorData && errorData.message) {
              errorMessage = errorData.message;
          }
          throw new Error(errorMessage);
        }
        fetchRetailDonations();
        setToastMessage('Retail Donation berhasil dihapus.');
        setShowToast(true);
      } catch (error) {
        console.error('Error deleting retail donation:', error);
        setToastMessage(`Terjadi kesalahan saat menghapus: ${error.message}`);
        setShowToast(true);
      }
    }
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Retail Donation</h2>
        <Button variant="primary" onClick={handleShowModal}>
          Tambah Retail Donation
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Donation ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Pricing</th>
            <th>Timestamps</th> 
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {retailDonations.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.donation_informations_id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.pricing}</td>
              {/* Tampilkan timestamps kustom saja */}
              <td>{dayjs(item.timestamps).format('DD/MM/YYYY HH:mm:ss')}</td>
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
          <Modal.Title>{currentItem ? 'Edit Retail Donation' : 'Tambah Retail Donation'}</Modal.Title>
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

export default RetailDonation;