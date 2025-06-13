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

const PendantInformation = () => {
  const [pendants, setPendants] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name_item: '',
    type: '',
    trade: '',
    game_information_id: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchPendants();
  }, []);

  const fetchPendants = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/game-info/server-information/pendant-information');
      if (!response.ok) {
        throw new Error('Gagal mengambil data Pendant: ' + response.statusText);
      }
      const data = await response.json();
      setPendants(data);
    } catch (error) {
      console.error('Error fetching pendant information:', error);
      setToastMessage(`Gagal mengambil data Pendant: ${error.message}`);
      setShowToast(true);
    }
  };

  const handleShowModal = () => {
    setCurrentItem(null);
    setFormData({
      name_item: '',
      type: '',
      trade: '',
      game_information_id: '',
    });
    setImageFile(null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files.length > 0) {
      setImageFile(files[0]);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = currentItem ? 'PUT' : 'POST';
      const url = currentItem
        ? `http://127.0.0.1:8000/api/game-info/server-information/pendant-information/${currentItem.id}`
        : 'http://127.0.0.1:8000/api/game-info/server-information/pendant-information';

      const formDataToSend = new FormData();
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }
      formDataToSend.append('name_item', formData.name_item);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('trade', formData.trade);
      formDataToSend.append('game_information_id', formData.game_information_id);

      if (method === 'PUT') {
        formDataToSend.append('_method', 'PUT');
      }

      const response = await fetch(url, {
        method: 'POST', 
        headers: {
          'Accept': 'application/json',
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (jsonError) {
          errorData = response.statusText;
          console.error("Failed to parse error response as JSON:", jsonError);
          console.error("Raw response text:", await response.text());
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

      
      fetchPendants();
      handleCloseModal();
      setToastMessage(currentItem ? 'Pendant berhasil diperbarui.' : 'Pendant berhasil ditambahkan.');
      setShowToast(true);
    } catch (error) {
      console.error('Error submitting pendant information:', error);
      setToastMessage(`Gagal menyimpan pendant: ${error.message}`);
      setShowToast(true);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData({
      game_information_id: item.game_information_id,
      name_item: item.name_item,
      type: item.type,
      trade: item.trade,
    });
    setImageFile(null); 
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/game-info/server-information/pendant-information/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchPendants();
          setToastMessage('Pendant berhasil dihapus.');
          setShowToast(true);
        } else {
          let errorData;
          try {
            errorData = await response.json();
          } catch (jsonError) {
            errorData = response.statusText;
            console.error("Failed to parse delete error response as JSON:", jsonError);
            console.error("Raw delete response text:", await response.text());
          }
          let errorMessage = 'Gagal menghapus pendant.';
          if (typeof errorData === 'string') {
              errorMessage = errorData;
          } else if (errorData && errorData.message) {
              errorMessage = errorData.message;
          }
          throw new Error(errorMessage);
        }
      } catch (error) {
        console.error('Error deleting pendant:', error);
        setToastMessage(`Terjadi kesalahan saat menghapus pendant: ${error.message}`);
        setShowToast(true);
      }
    }
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Pendant Information</h2>
        <Button variant="primary" onClick={handleShowModal}>
          Tambah Pendant
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Game Info ID</th>
            <th>Image</th>
            <th>Name Item</th>
            <th>Type</th>
            <th>Trade</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendants.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.game_information_id}</td> 
              <td>
                <img
                  src={`http://127.0.0.1:8000/storage/${item.image}`}
                  alt={item.name_item}
                  style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/50x50/cccccc/000000?text=No+Image'; }}
                />
              </td>
              <td>{item.name_item}</td>
              <td>{item.type}</td>
              <td>{item.trade}</td>
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
          <Modal.Title>{currentItem ? 'Edit Pendant' : 'Tambah Pendant'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
              <Form.Label>Game Info ID</Form.Label>
              <Form.Control
                type="number"
                name="game_information_id"
                value={formData.game_information_id}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="image" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name Item</Form.Label>
              <Form.Control
                type="text"
                name="name_item"
                value={formData.name_item}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Trade</Form.Label>
              <Form.Control
                type="text"
                name="trade"
                value={formData.trade}
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

export default PendantInformation;