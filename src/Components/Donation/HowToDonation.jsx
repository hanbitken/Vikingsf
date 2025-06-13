import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Toast,
  ToastContainer,
} from 'react-bootstrap';


const HowToDonation = () => {
  const [howToDonations, setHowToDonations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    donation_informations_id: '',
    title: '',
    description: '',
  });
  const [currentItem, setCurrentItem] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const formFields = [
    { label: 'Donation ID', name: 'donation_informations_id', type: 'number', required: true, placeholder: 'Enter Donation Info ID (e.g., 1)' },
    { label: 'Title', name: 'title', type: 'text', required: true, placeholder: 'Enter title for how-to guide' },
    { label: 'Description', name: 'description', type: 'textarea', required: false, placeholder: 'Enter description steps, each on a new line. Example:\n1. Open donation menu\n2. Select amount' }, // Updated placeholder
  ];

  useEffect(() => {
    fetchHowToDonations();
  }, []);

  const fetchHowToDonations = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/donation/howto');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal mengambil data How To Donation.');
      }
      const data = await response.json();
      setHowToDonations(data);
    } catch (error) {
      console.error('Error fetching How To donations:', error);
      setToastMessage(`Gagal mengambil How To Donation: ${error.message}`);
      setShowToast(true);
    }
  };

  const handleShowModal = () => {
    setCurrentItem(null);
    setFormData({
      donation_informations_id: '',
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
        ? `http://127.0.0.1:8000/api/donation/howto/${currentItem.id}`
        : 'http://127.0.0.1:8000/api/donation/howto';

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

      fetchHowToDonations();
      handleCloseModal();
      setToastMessage(currentItem ? 'How To Donation berhasil diperbarui.' : 'How To Donation berhasil ditambahkan.');
      setShowToast(true);
    } catch (error) {
      console.error('Error submitting How To donation:', error);
      setToastMessage(`Gagal menyimpan How To Donation: ${error.message}`);
      setShowToast(true);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData({
      donation_informations_id: item.donation_informations_id,
      title: item.title,
      description: item.description,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/donation/howto/${id}`, { method: 'DELETE' });
        if (!response.ok) {
          let errorData;
          try {
            errorData = await response.json();
          } catch (jsonError) {
            errorData = response.statusText;
            console.error("Gagal parse respons error hapus sebagai JSON:", jsonError);
          }
          let errorMessage = 'Gagal menghapus How To Donation.';
          if (typeof errorData === 'string') {
              errorMessage = errorData;
          } else if (errorData && errorData.message) {
              errorMessage = errorData.message;
          }
          throw new Error(errorMessage);
        }
        fetchHowToDonations();
        setToastMessage('How To Donation berhasil dihapus.');
        setShowToast(true);
      } catch (error) {
        console.error('Error deleting How To donation:', error);
        setToastMessage(`Terjadi kesalahan saat menghapus: ${error.message}`);
        setShowToast(true);
      }
    }
  };

  const renderAsOrderedList = (text) => {
    if (!text) return null;
    const items = text.split('\n').filter(item => item.trim() !== '');
    if (items.length === 0) return null;

    return (
      <ol style={{ paddingLeft: '20px', margin: 0 }}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ol>
    );
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">How To Donation</h2>
        <Button variant="primary" onClick={handleShowModal}>
          Tambah How To Donation
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Donation ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {howToDonations.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.donation_informations_id}</td>
              <td>{item.title}</td>
              <td>{renderAsOrderedList(item.description)}</td> {/* Applied renderAsOrderedList here */}
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
          <Modal.Title>{currentItem ? 'Edit How To Donation' : 'Tambah How To Donation'}</Modal.Title>
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
                    rows={field.name === 'description' ? 5 : 3} 
                    required={field.required}
                    placeholder={field.placeholder} 
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

export default HowToDonation;