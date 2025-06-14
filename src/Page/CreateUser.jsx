// src/Page/CreateUser.jsx

import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateUser = () => {
  const [formData, setFormData] = useState({ nama: '', email: '' });
  const navigate = useNavigate();
  const apiUrl = 'http://localhost:5000/api/users';

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(apiUrl, formData);
      navigate('/admin/users');
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

  return (
    <div className="p-4">
      <h4>Tambah User</h4>
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
        <Button type="submit" variant="primary" className="mt-3">
          Simpan
        </Button>
      </Form>
    </div>
  );
};

export default CreateUser;
