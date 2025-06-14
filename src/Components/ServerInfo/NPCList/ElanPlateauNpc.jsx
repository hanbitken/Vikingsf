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

const ElanPlateauNpc = () => { 
  const [elanPlateauNpcs, setElanPlateauNpcs] = useState([]); 
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    game_information_id: '',
    npc: '',
    buy_with: '',
  });
  const [currentItem, setCurrentItem] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const formFields = [
    { label: 'Game Info ID', name: 'game_information_id', type: 'number', required: true },
    { label: 'NPC', name: 'npc', type: 'text', required: true },
    { label: 'Buy With', name: 'buy_with', type: 'textarea', required: false },
  ];

  useEffect(() => {
    fetchElanPlateauNpcs(); 
  }, []);

  const fetchElanPlateauNpcs = async () => { 
    try {
      const response = await fetch('http://127.0.0.1:8000/api/game-info/server-information/elanplateaunpc'); // Updated API endpoint
      const data = await response.json();
      setElanPlateauNpcs(data); 
    } catch (error) {
      console.error('Error fetching Elan Plateau NPCs:', error); 
    }
  };

  const handleShowModal = () => {
    setCurrentItem(null);
    setFormData({
      game_information_id: '',
      npc: '',
      buy_with: '',
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
        ? `http://127.0.0.1:8000/api/game-info/server-information/elanplateaunpc/${currentItem.id}` 
        : 'http://127.0.0.1:8000/api/game-info/server-information/elanplateaunpc'; 

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        fetchElanPlateauNpcs(); 
        handleCloseModal();
        setToastMessage(currentItem ? 'Elan Plateau NPC berhasil diperbarui.' : 'Elan Plateau NPC berhasil ditambahkan.'); 
        setShowToast(true);
      } else {
        throw new Error(result.message || 'Terjadi kesalahan.');
      }
    } catch (error) {
      console.error('Error submitting Elan Plateau NPC:', error); 
      setToastMessage('Gagal menyimpan Elan Plateau NPC.'); 
      setShowToast(true);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData({
      game_information_id: item.game_information_id,
      npc: item.npc,
      buy_with: item.buy_with,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/game-info/server-information/elanplateaunpc/${id}`, { method: 'DELETE' }); 
        if (response.ok) {
          fetchElanPlateauNpcs(); 
          setToastMessage('Elan Plateau NPC berhasil dihapus.'); 
          setShowToast(true);
        } else {
          throw new Error('Gagal menghapus data.');
        }
      } catch (error) {
        console.error('Error deleting Elan Plateau NPC:', error); 
        setToastMessage('Terjadi kesalahan saat menghapus.'); 
        setShowToast(true);
      }
    }
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Elan Plateau NPC</h2>
        <Button variant="primary" onClick={handleShowModal}>
          Tambah Elan Plateau NPC
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Game Info ID</th>
            <th>NPC</th>
            <th>Buy With</th>
            <th>Timestamps</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {elanPlateauNpcs.map((item) => ( 
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.game_information_id}</td>
              <td>{item.npc}</td>
              <td>{item.buy_with}</td>
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

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentItem ? 'Edit Elan Plateau NPC' : 'Tambah Elan Plateau NPC'}</Modal.Title> 
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

export default ElanPlateauNpc; 