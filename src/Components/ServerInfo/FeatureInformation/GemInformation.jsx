import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Toast,
  ToastContainer,
} from 'react-bootstrap';

const GemInformation = () => {
  const [gemInformations, setGemInformations] = useState([]);
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
    fetchGemInformations();
  }, []);

  const fetchGemInformations = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/game-info/server-information/gem-information');
      if (!response.ok) {
          throw new Error('Gagal mengambil data Gem Information: ' + response.statusText);
      }
      const data = await response.json();
      setGemInformations(data);
    } catch (error) {
      console.error('Error fetching Gem Information:', error);
      setToastMessage(`Gagal mengambil data Gem: ${error.message}`);
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
      const isUpdate = !!currentItem;
      const url = isUpdate
        ? `http://127.0.0.1:8000/api/game-info/server-information/gem-information/${currentItem.id}`
        : 'http://127.0.0.1:8000/api/game-info/server-information/gem-information';

      const method = 'POST'; 
      const formDataToSend = new FormData();
      
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }
      formDataToSend.append('name_item', formData.name_item);
      formDataToSend.append('type', formData.type);
      formDataToSend.append('trade', formData.trade);
      formDataToSend.append('game_information_id', formData.game_information_id);
      
      if (isUpdate) {
        formDataToSend.append('_method', 'PUT'); // Laravel memerlukan ini untuk PUT dengan FormData
      }

      const response = await fetch(url, {
        method,
        body: formDataToSend,
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
        fetchGemInformations();
        handleCloseModal();
        setToastMessage(isUpdate ? 'Gem Information berhasil diperbarui.' : 'Gem Information berhasil ditambahkan.');
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
      console.error('Error submitting Gem Information:', error);
      setToastMessage(`Gagal menyimpan Gem Information: ${error.message}`);
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
        const response = await fetch(`http://127.0.0.1:8000/api/game-info/server-information/gem-information/${id}`, {
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
          fetchGemInformations();
          setToastMessage('Gem Information berhasil dihapus.');
          setShowToast(true);
        } else {
          let errorMessage = 'Gagal menghapus data.';
          if (data && data.message) {
              errorMessage = data.message;
          }
          throw new Error(errorMessage);
        }
      } catch (error) {
        console.error('Error deleting Gem Information:', error);
        setToastMessage(`Terjadi kesalahan saat menghapus: ${error.message}`);
        setShowToast(true);
      }
    }
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Gem Information</h2>
        <Button variant="primary" onClick={handleShowModal}>
          Tambah Gem Information
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
          {gemInformations.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.game_information_id}</td> 
              <td>
                {item.image ? (
                  <img
                    src={`http://127.0.0.1:8000/storage/${item.image}`}
                    alt={item.name_item}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/50x50/cccccc/000000?text=No+Image'; }}
                  />
                ) : (
                  'No Image'
                )}
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
          <Modal.Title>{currentItem ? 'Edit Gem Information' : 'Tambah Gem Information'}</Modal.Title>
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
                required
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

export default GemInformation;