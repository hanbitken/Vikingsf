// src/Page/EditUser.jsx

import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nama: '', email: '' });
  const apiUrl = `http://localhost:8000/api/users/${id}`;

  useEffect(() => {
    axios.get(apiUrl).then(res => {
      setFormData({ nama: res.data.nama, email: res.data.email });
    }).catch(err => {
      console.error('Error loading user:', err);
    });
  }, [id]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(apiUrl, formData);
      navigate('/admin/users');
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  return (
    <div className="p-4">
      <h4>Edit User</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nama</Form.Label>
          <Form.Control
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button type="submit" variant="success" className="mt-3">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default EditUser;
