import React, { useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

const UserTable = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Dinda', email: 'dindabc@gmail.com' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleShowModal = (user) => {
    setEditUser(user);
    if (user) {
      setFormData({ name: user.name, email: user.email });
    } else {
      setFormData({ name: '', email: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditUser(null);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    if (editUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editUser.id ? { ...u, ...formData } : u))
      );
    } else {
      const newUser = { id: Date.now(), ...formData };
      setUsers((prev) => [...prev, newUser]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>User Table</h4>
        <Button variant="primary" onClick={() => handleShowModal(null)}>
          Add User
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleShowModal(u)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(u.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">No data available</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editUser ? 'Edit User' : 'Add User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserTable;
