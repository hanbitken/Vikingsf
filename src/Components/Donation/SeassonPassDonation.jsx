import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Toast,
  ToastContainer,
} from 'react-bootstrap';

const SeassonPassDonation = () => {
  const [seassonPassDonations, setSeassonPassDonations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    donation_informations_id: '',
    title: '',
    description: '',
    pricing: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchSeassonPassDonations();
  }, []);

  const fetchSeassonPassDonations = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/donation/seassonpass');
      if (!response.ok) {
          throw new Error('Failed to fetch Seasson Pass Donations: ' + response.statusText); 
      }
      const data = await response.json();
      setSeassonPassDonations(data);
    } catch (error) {
      console.error('Error fetching Seasson Pass Donations:', error);
      setToastMessage(`Failed to fetch Seasson Pass Donations: ${error.message}`);
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
        ? `http://127.0.0.1:8000/api/donation/seassonpass/${currentItem.id}`
        : 'http://127.0.0.1:8000/api/donation/seassonpass';

      const method = 'POST';
      const formDataToSend = new FormData();
      
      formDataToSend.append('donation_informations_id', formData.donation_informations_id);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('pricing', formData.pricing);

      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }
      
      if (isUpdate) {
        formDataToSend.append('_method', 'PUT');
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
        console.error("Failed to parse response as JSON:", jsonError);
        console.error("Raw response text (non-JSON):", rawText);
        throw new Error(`Invalid response from server (${response.status}): ${rawText.substring(0, 100)}...`);
      }

      if (response.ok) {
        fetchSeassonPassDonations();
        handleCloseModal();
        setToastMessage(isUpdate ? 'Seasson Pass Donation updated successfully.' : 'Seasson Pass Donation added successfully.');
        setShowToast(true);
      } else {
        console.error('Backend error response:', data);
        let errorMessage = 'An error occurred.';
        if (data && data.message) {
            errorMessage = data.message;
        } else if (data && data.errors) {
            errorMessage = Object.values(data.errors).flat().join('; ');
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error submitting Seasson Pass Donation:', error);
      setToastMessage(`Failed to save Seasson Pass Donation: ${error.message}`);
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
    setImageFile(null); 
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/donation/seassonpass/${id}`, {
          method: 'DELETE',
        });
        
        const clonedResponse = response.clone();
        let data;

        try {
          data = await response.json();
        } catch (jsonError) {
          const rawText = await clonedResponse.text();
          console.error("Failed to parse delete error response as JSON:", jsonError);
          console.error("Raw delete response text:", rawText);
          throw new Error(`Invalid response from server (${response.status}) on delete: ${rawText.substring(0, 100)}...`);
        }

        if (response.ok) {
          fetchSeassonPassDonations();
          setToastMessage('Seasson Pass Donation deleted successfully.');
          setShowToast(true);
        } else {
          let errorMessage = 'Failed to delete data.';
          if (data && data.message) {
              errorMessage = data.message;
          }
          throw new Error(errorMessage);
        }
      } catch (error) {
        console.error('Error deleting Seasson Pass Donation:', error);
        setToastMessage(`An error occurred while deleting: ${error.message}`);
        setShowToast(true);
      }
    }
  };

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Seasson Pass Donation</h2>
        <Button variant="primary" onClick={handleShowModal}>
          Add Seasson Pass Donation
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th> 
            <th>Donation ID</th> 
            <th>Title</th> 
            <th>Description</th> 
            <th>Pricing</th> 
            <th>Image</th> 
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {seassonPassDonations.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td> 
              <td>{item.donation_informations_id}</td> 
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.pricing}</td>
              <td>
                {item.image ? (
                  <img
                    src={`http://127.0.0.1:8000/storage/${item.image}`}
                    alt={item.title}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/50x50/cccccc/000000?text=No+Image'; }}
                  />
                ) : (
                  'No Image'
                )}
              </td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(item)}>
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentItem ? 'Edit Seasson Pass Donation' : 'Add Seasson Pass Donation'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Donation Information ID</Form.Label>
              <Form.Control
                type="number"
                name="donation_informations_id"
                value={formData.donation_informations_id}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Pricing</Form.Label>
              <Form.Control
                type="text"
                name="pricing"
                value={formData.pricing}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="image" onChange={handleChange} />
              {currentItem && currentItem.image && (
                <div className="mt-2">
                  <img src={`http://127.0.0.1:8000/storage/${currentItem.image}`} alt="Current" style={{ width: '100px' }} />
                  <Form.Text muted>
                    Select a new image to replace the current one.
                  </Form.Text>
                </div>
              )}
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="success" type="submit">
                {currentItem ? 'Update' : 'Save'}
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

export default SeassonPassDonation;