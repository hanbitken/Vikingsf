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
import { useParams } from 'react-router-dom'; 

const MapInfo = () => { 
  const { mapNumber } = useParams(); 

  const [mapData, setMapData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    game_information_id: '',
    location_name: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [imageRemoved, setImageRemoved] = useState(false);

  const formFields = [
    { label: 'Game Info ID', name: 'game_information_id', type: 'number', required: true, placeholder: 'Enter Game Info ID (e.g., 1)' },
    { label: 'Location Name', name: 'location_name', type: 'text', required: true, placeholder: 'Enter Location Name (e.g., Elan Plateau)' },
    { label: 'Image', name: 'image', type: 'file', required: false, multiple: false },
  ];

  useEffect(() => {
    console.log("MapInfo component mounted/mapNumber changed. Current mapNumber from useParams:", mapNumber);
    fetchMapData();
  }, [mapNumber]);

  const fetchMapData = async () => {
    console.log("Attempting to fetch map data for mapNumber:", mapNumber);
    const displayMapNumber = mapNumber || 'Unknown Map';

    if (!mapNumber) {
      console.log("fetchMapData: mapNumber from useParams is undefined/null, skipping fetch.");
      setMapData([]); 
      setToastMessage(`Map number tidak tersedia untuk menampilkan data.`);
      setShowToast(true);
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/game-info/mapinfo/by-number/${mapNumber}`);
      console.log(`API response status for map ${mapNumber}:`, response.status);

      if (!response.ok) {
        if (response.status === 404) {
          setMapData([]);
          setToastMessage(`Data Map ${displayMapNumber} belum ada.`);
          setShowToast(true);
          console.log(`No data found for Map ${displayMapNumber}. API returned 404.`);
        } else {
          const errorText = await response.text();
          throw new Error(`Gagal mengambil data Map ${displayMapNumber}: Status ${response.status} - ${errorText}`);
        }
      } else {
        const data = await response.json();
        console.log(`Successfully fetched data for Map ${displayMapNumber}:`, data);
        if (Array.isArray(data)) {
            setMapData(data);
        } else if (data && typeof data === 'object') {
            setMapData([data]);
        } else {
            console.warn("API returned unexpected data format:", data);
            setMapData([]);
        }
        setToastMessage(`Data Map ${displayMapNumber} berhasil dimuat.`);
        setShowToast(true);
      }
    } catch (error) {
      console.error(`Error fetching Map ${displayMapNumber} data:`, error);
      setToastMessage(`Gagal mengambil data Map ${displayMapNumber}: ${error.message}`);
      setShowToast(true);
      setMapData([]);
    }
  };

  const handleShowModal = () => {
    setCurrentItem(null);
    setFormData({
      game_information_id: '',
      location_name: '',
    });
    setImageFile(null);
    setImageRemoved(false);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setImageFile(files.length > 0 ? files[0] : null);
      setImageRemoved(false);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setFormData(prev => ({ ...prev, image: null }));
    setImageRemoved(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form for map number:", mapNumber);
    const displayMapNumber = mapNumber || 'Unknown Map';

    if (!mapNumber) { 
        setToastMessage(`Tidak dapat menyimpan: Map number tidak terdefinisi.`);
        setShowToast(true);
        return;
    }

    try {
      const url = currentItem
        ? `http://127.0.0.1:8000/api/game-info/mapinfo/${currentItem.id}`
        : 'http://127.0.0.1:8000/api/game-info/mapinfo';

      const formPayload = new FormData();
      for (const key in formData) {
        if (formData[key] !== null && formData[key] !== '') {
          formPayload.append(key, formData[key]);
        }
      }
      formPayload.append('map_number', mapNumber); 

      if (imageFile) {
        formPayload.append('image', imageFile);
      } else if (currentItem && imageRemoved) {
        formPayload.append('image_removed', 'true');
      } else if (currentItem && !imageFile && !imageRemoved && currentItem.image) {
        formPayload.append('image', currentItem.image);
      }

      if (currentItem) {
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
        console.error("Failed to parse response as JSON:", jsonError);
        console.error("Raw non-JSON response text:", rawText);
        throw new Error(`Respons tidak valid dari server (${response.status}): ${rawText.substring(0, 100)}...`);
      }

      if (response.ok) {
        fetchMapData();
        handleCloseModal();
        setToastMessage(currentItem ? `Data Map ${displayMapNumber} berhasil diperbarui.` : `Data Map ${displayMapNumber} berhasil ditambahkan.`);
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
      console.error(`Error submitting Map ${displayMapNumber} data:`, error);
      setToastMessage(`Gagal menyimpan data Map ${displayMapNumber}: ${error.message}`);
      setShowToast(true);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setFormData({
      game_information_id: item.game_information_id,
      location_name: item.location_name,
    });
    setImageFile(null);
    setImageRemoved(false);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const displayMapNumber = mapNumber || 'Unknown Map';
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/game-info/mapinfo/${id}`, { method: 'DELETE' });

        const clonedResponse = response.clone();
        let data;

        try {
          data = await response.json();
        } catch (jsonError) {
          const rawText = await clonedResponse.text();
          console.error("Failed to parse delete error response as JSON:", jsonError);
          console.error("Raw delete response text:", rawText);
          throw new Error(`Respons tidak valid dari server (${response.status}) saat menghapus: ${rawText.substring(0, 100)}...`);
        }

        if (response.ok) {
          fetchMapData();
          setToastMessage(`Data Map ${displayMapNumber} berhasil dihapus.`);
          setShowToast(true);
        } else {
          let errorMessage = 'Gagal menghapus data.';
          if (data && data.message) {
              errorMessage = data.message;
          }
          throw new Error(errorMessage);
        }
      } catch (error) {
        console.error(`Error deleting Map ${displayMapNumber} data:`, error);
        setToastMessage(`Terjadi kesalahan saat menghapus data Map ${displayMapNumber}: ${error.message}`);
        setShowToast(true);
      }
    }
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Map Information - Map {mapNumber || 'Loading...'}</h2>
        <Button variant="primary" onClick={handleShowModal}>
          Tambah Data Map {mapNumber || ''}
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Game Info ID</th>
            <th>Map Number</th>
            <th>Location Name</th>
            <th>Image</th>
            <th>Timestamps</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {mapData && mapData.length > 0 ? (
            mapData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.game_information_id}</td>
                <td>{item.map_number}</td> 
                <td>{item.location_name}</td>
                <td>
                  {typeof item.image === 'string' && item.image ? (
                    <Image
                      src={`http://127.0.0.1:8000/storage/mapinfo/${item.image}`}
                      alt="Map Image"
                      thumbnail
                      width="50"
                      height="50"
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/50x50/e0e0e0/555?text=Img"; }}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
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
              <td colSpan="7" className="text-center">
                {mapNumber ? `Tidak ada data Map untuk ${mapNumber}.` : "Pilih Map Number untuk menampilkan data."}
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentItem ? `Edit Data Map ${mapNumber || ''}` : `Tambah Data Map ${mapNumber || ''}`}</Modal.Title>
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
                ) : field.type === 'file' ? (
                  <>
                    <Form.Control
                      type="file"
                      name={field.name}
                      onChange={handleChange}
                      required={field.required && (!currentItem?.image || imageRemoved)}
                      multiple={field.multiple}
                    />
                    {currentItem?.image && !imageFile && !imageRemoved && (
                      <div className="mt-2">
                        <Image src={`http://127.0.0.1:8000/storage/mapinfo/${currentItem.image}`} thumbnail width="100" />
                        <Button variant="danger" size="sm" className="ms-2" onClick={handleRemoveImage}>
                          Hapus Gambar
                        </Button>
                      </div>
                    )}
                  </>
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

      <ToastContainer position="top-end" className="p-3 fixed-top-right">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide bg="info">
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default MapInfo;