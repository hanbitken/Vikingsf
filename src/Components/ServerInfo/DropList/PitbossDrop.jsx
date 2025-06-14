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

const PitbossDrop = () => { 
  const [pitbossDrops, setPitbossDrops] = useState([]); 
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
    fetchPitbossDrops(); 
  }, []);

  const fetchPitbossDrops = async () => { 
    try {
      const response = await fetch('http://127.0.0.1:8000/api/game-info/server-information/pitbossdrop'); 
      const data = await response.json();
      setPitbossDrops(data); 
    } catch (error) {
      console.error('Error fetching Pitboss Drops:', error); 
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
        ? `http://127.0.0.1:8000/api/game-info/server-information/pitbossdrop/${currentItem.id}` 
        : 'http://127.0.0.1:8000/api/game-info/server-information/pitbossdrop';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        fetchPitbossDrops();
        handleCloseModal();
        setToastMessage(currentItem ? 'Pitboss Drop berhasil diperbarui.' : 'Pitboss Drop berhasil ditambahkan.'); 
        setShowToast(true);
      } else {
        throw new Error(result.message || 'Terjadi kesalahan.');
      }
    } catch (error) {
      console.error('Error submitting Pitboss Drop:', error); 
      setToastMessage('Gagal menyimpan Pitboss Drop.'); 
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
        const response = await fetch(`http://127.0.0.1:8000/api/game-info/server-information/pitbossdrop/${id}`, { method: 'DELETE' });
        if (response.ok) {
          fetchPitbossDrops(); 
          setToastMessage('Pitboss Drop berhasil dihapus.');
          setShowToast(true);
        } else {
          throw new Error('Gagal menghapus data.');
        }
      } catch (error) {
        console.error('Error deleting Pitboss Drop:', error); 
        setToastMessage('Terjadi kesalahan saat menghapus.'); 
        setShowToast(true);
      }
    }
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Pitboss Drop</h2> {/* Changed title */}
        <Button variant="primary" onClick={handleShowModal}>
          Tambah Pitboss Drop
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
          {pitbossDrops.map((item) => ( 
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.game_information_id}</td>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{dayjs(item.timestamps).format('DD/MM/YYYY HH:mm')}</td> {/* Assuming timestamps still exist */}
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
          <Modal.Title>{currentItem ? 'Edit Pitboss Drop' : 'Tambah Pitboss Drop'}</Modal.Title> {/* Updated title */}
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

      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide bg="info">
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default PitbossDrop; 