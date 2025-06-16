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

const RaceHqNpc = () => {
  const [raceHqNpcs, setRaceHqNpcs] = useState([]);
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
    { label: 'Game Info ID', name: 'game_information_id', type: 'number', required: true, placeholder: 'Enter Game Info ID (e.g., 1)' },
    { label: 'NPC', name: 'npc', type: 'text', required: true, placeholder: 'Enter NPC Name' }, // Ditambahkan placeholder
    { label: 'Buy With', name: 'buy_with', type: 'textarea', required: false, placeholder: 'Enter what can be bought with (e.g., Honor, PvP Points)' }, // Ditambahkan placeholder
  ];

  useEffect(() => {
    console.log("RaceHqNpc component mounted. Fetching data...");
    fetchRaceHqNpcs();
  }, []); 

  const fetchRaceHqNpcs = async () => { 
    console.log("Attempting to fetch Race HQ NPCs data.");
    try {
     
      const response = await fetch('http://127.0.0.1:8000/api/game-info/server-information/racehqnpc');
      console.log("API response status for Race HQ NPC:", response.status);

      if (!response.ok) {
        if (response.status === 404) {
          setRaceHqNpcs([]); 
          setToastMessage('Data Race NPC HQ belum ada.');
          setShowToast(true);
          console.log('No data found for Race NPC HQ. API returned 404.');
          return;
        }
        const errorText = await response.text();
        throw new Error(`Gagal mengambil data Race NPC HQ: Status ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Successfully fetched Race HQ NPCs data:", data);
      if (Array.isArray(data)) {
        setRaceHqNpcs(data);
      } else if (data && typeof data === 'object') {
        setRaceHqNpcs([data]);
      } else {
        console.warn("API returned unexpected data format for Race HQ NPC:", data);
        setRaceHqNpcs([]);
      }
      setToastMessage('Data Race NPC HQ berhasil dimuat.');
      setShowToast(true);
    } catch (error) {
      console.error('Error fetching Race HQ NPCs:', error);
      setToastMessage(`Gagal mengambil data Race NPC HQ: ${error.message}`);
      setShowToast(true);
      setRaceHqNpcs([]);
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
    console.log("Submitting form for Race HQ NPC:", formData);
    try {
      const method = 'POST'; 

      const url = currentItem
        ? `http://127.0.0.1:8000/api/game-info/server-information/racehqnpc/${currentItem.id}`
        : 'http://127.0.0.1:8000/api/game-info/server-information/racehqnpc';

      const payload = { ...formData }; 

      if (currentItem) {
        payload._method = 'PUT';
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json', 
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload), 
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
        fetchRaceHqNpcs(); 
        handleCloseModal();
        setToastMessage(currentItem ? 'Race NPC HQ berhasil diperbarui.' : 'Race NPC HQ berhasil ditambahkan.');
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
      console.error('Error submitting Race NPC HQ:', error);
      setToastMessage(`Gagal menyimpan Race NPC HQ: ${error.message}`);
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
        const response = await fetch(`http://127.0.0.1:8000/api/game-info/server-information/racehqnpc/${id}`, {
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
          fetchRaceHqNpcs(); 
          setToastMessage('Race NPC HQ berhasil dihapus.');
          setShowToast(true);
        } else {
          let errorMessage = 'Gagal menghapus data.';
          if (data && data.message) {
              errorMessage = data.message;
          }
          throw new Error(errorMessage);
        }
      } catch (error) {
        console.error('Error deleting Race NPC HQ:', error);
        setToastMessage(`Terjadi kesalahan saat menghapus: ${error.message}`);
        setShowToast(true);
      }
    }
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Race NPC HQ</h2>
        <Button variant="primary" onClick={handleShowModal}>
          Tambah Race NPC HQ
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
          {raceHqNpcs.length > 0 ? (
            raceHqNpcs.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.game_information_id}</td>
                <td>{item.npc}</td>
                <td>{item.buy_with}</td>
                <td>{item.created_at ? dayjs(item.created_at).format('DD/MM/YYYY HH:mm') : 'N/A'}</td>
                <td>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(item)}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>
                    Hapus
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                Tidak ada data Race NPC HQ yang tersedia.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentItem ? 'Edit Race NPC HQ' : 'Tambah Race NPC HQ'}</Modal.Title>
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

export default RaceHqNpc;