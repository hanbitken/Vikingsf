import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Toast,
  ToastContainer,
  Image,
} from 'react-bootstrap';
import dayjs from 'dayjs';

const DailyQuestThursday = () => {
  const [dailyQuestThursdays, setDailyQuestThursdays] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    game_information_id: '',
    tutorial: '',
    quest: '',
    reward: '',
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const formFields = [
    { label: 'Game Info ID', name: 'game_information_id', type: 'number', required: true, placeholder: 'Enter Game Info ID (e.g., 1)' },
    { label: 'Image', name: 'image', type: 'file', required: false, multiple: false },
    { label: 'Tutorial', name: 'tutorial', type: 'textarea', required: true, placeholder: 'Enter tutorial steps, each on a new line. Example:\n1. Open map\n2. Go to marker' }, // Updated placeholder
    { label: 'Quest', name: 'quest', type: 'textarea', required: false, placeholder: 'Enter quest objectives, each on a new line. Example:\n- Defeat enemy boss\n- Protect the village' }, // Updated placeholder
    { label: 'Reward', name: 'reward', type: 'textarea', required: false, placeholder: 'Enter rewards, each on a new line. Example:\n750 XP\n2x Rare Gem' }, // Updated placeholder
  ];

  useEffect(() => {
    fetchDailyQuestThursdays();
  }, []);

  const fetchDailyQuestThursdays = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/game-info/quest-information/dailyquestthursday');
      if (!response.ok) {
          throw new Error('Gagal mengambil data Daily Quest Thursday: ' + response.statusText);
      }
      const data = await response.json();
      setDailyQuestThursdays(data);
    } catch (error) {
      console.error('Error fetching Daily Quest Thursdays:', error);
      setToastMessage(`Gagal mengambil data Daily Quest Thursday: ${error.message}`);
      setShowToast(true);
    }
  };

  const handleShowModal = () => {
    setCurrentItem(null);
    setFormData({
      game_information_id: '',
      tutorial: '',
      quest: '',
      reward: '',
    });
    setImageFiles([]);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setImageFiles(Array.from(files));
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
        ? `http://127.0.0.1:8000/api/game-info/quest-information/dailyquestthursday/${currentItem.id}`
        : 'http://127.0.0.1:8000/api/game-info/quest-information/dailyquestthursday';

      const formPayload = new FormData();
      for (const key in formData) {
        formPayload.append(key, formData[key]);
      }
      if (imageFiles.length > 0) {
        formPayload.append('image', imageFiles[0]); 
      }

      if (method === 'PUT') {
        formPayload.append('_method', 'PUT');
      }

      const response = await fetch(url, {
        method: 'POST',
        body: formPayload,
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
        fetchDailyQuestThursdays();
        handleCloseModal();
        setToastMessage(currentItem ? 'Daily Quest Thursday berhasil diperbarui.' : 'Daily Quest Thursday berhasil ditambahkan.');
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
      console.error('Error submitting Daily Quest Thursday:', error);
      setToastMessage(`Gagal menyimpan Daily Quest Thursday: ${error.message}`);
      setShowToast(true);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData({
      game_information_id: item.game_information_id,
      tutorial: item.tutorial,
      quest: item.quest,
      reward: item.reward,
    });
    setImageFiles([]);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/game-info/quest-information/dailyquestthursday/${id}`, { method: 'DELETE' });
        
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
          fetchDailyQuestThursdays();
          setToastMessage('Daily Quest Thursday berhasil dihapus.');
          setShowToast(true);
        } else {
          let errorMessage = 'Gagal menghapus data.';
          if (data && data.message) {
              errorMessage = data.message;
          }
          throw new Error(errorMessage);
        }
      } catch (error) {
        console.error('Error deleting Daily Quest Thursday:', error);
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
        <h2 className="mb-0">Daily Quest Thursday</h2>
        <Button variant="primary" onClick={handleShowModal}>
          Tambah Daily Quest Thursday
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Game Info ID</th>
            <th>Image</th>
            <th>Tutorial</th>
            <th>Quest</th>
            <th>Reward</th>
            <th>Timestamps</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dailyQuestThursdays.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.game_information_id}</td>
              <td>
                {Array.isArray(item.image) && item.image.length > 0 ? (
                  item.image.map((imgSrc, idx) => (
                    <Image
                      key={idx}
                      src={`http://127.0.0.1:8000/storage/dailyquestthursday/${imgSrc}`}
                      alt={`Quest Image ${idx}`}
                      thumbnail
                      width="50"
                      height="50"
                      className="me-1 mb-1"
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/50x50/e0e0e0/555?text=Img"; }}
                    />
                  ))
                ) : typeof item.image === 'string' && item.image ? (
                  <Image
                    src={`http://127.0.0.1:8000/storage/dailyquestthursday/${item.image}`}
                    alt="Quest Image"
                    thumbnail
                    width="50"
                    height="50"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/50x50/e0e0e0/555?text=Img"; }}
                  />
                ) : (
                  <span>No Image</span>
                )}
              </td>
              <td>{renderAsOrderedList(item.tutorial)}</td> 
              <td>{renderAsOrderedList(item.quest)}</td>    
              <td>{renderAsOrderedList(item.reward)}</td>   
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
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentItem ? 'Edit Daily Quest Thursday' : 'Tambah Daily Quest Thursday'}</Modal.Title>
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
                    rows={field.name === 'tutorial' || field.name === 'quest' || field.name === 'reward' ? 5 : 3}
                    required={field.required}
                    placeholder={field.placeholder}
                  />
                ) : field.type === 'file' ? (
                  <Form.Control
                    type="file"
                    name={field.name}
                    onChange={handleChange}
                    required={field.required && !currentItem?.image}
                    multiple={field.multiple}
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

      {/* Toast Notification */}
      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide bg="info">
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default DailyQuestThursday;