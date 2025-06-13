import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const FeatureInfo = () => {
  const [features, setFeatures] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingFeature, setEditingFeature] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '' });

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const response = await axios.get('/api/featureinformation');
      setFeatures(response.data);
    } catch (error) {
      console.error('Error fetching features:', error);
    }
  };

  const handleShowModal = (feature = null) => {
    setEditingFeature(feature);
    setFormData(feature || { title: '', description: '' });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingFeature(null);
    setFormData({ title: '', description: '' });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      if (editingFeature) {
        await axios.put(`/api/featureinformation/${editingFeature.id}`, formData);
      } else {
        await axios.post('/api/featureinformation', formData);
      }
      fetchFeatures();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving feature:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this feature?')) {
      try {
        await axios.delete(`/api/featureinformation/${id}`);
        fetchFeatures();
      } catch (error) {
        console.error('Error deleting feature:', error);
      }
    }
  };

  return (
    <div className="p-4">
      <h3>Feature Information</h3>
      <Button variant="primary" className="mb-3" onClick={() => handleShowModal()}>
        Add Feature
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Feature Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={feature.id}>
              <td>{index + 1}</td>
              <td>{feature.title}</td>
              <td>{feature.description}</td>
              <td>
                <Button size="sm" onClick={() => handleShowModal(feature)} className="me-2">
                  Edit
                </Button>
                <Button size="sm" variant="danger" onClick={() => handleDelete(feature.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editingFeature ? 'Edit Feature' : 'Add Feature'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="featureTitle" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="featureDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FeatureInfo;
