// src/Page/Users.jsx
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    username: "",
    email: "",
    mobile: "",
    city: ""
  });

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5173/users"); // ganti sesuai endpoint
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setEditMode(false);
    setFormData({ id: null, username: "", email: "", mobile: "", city: "" });
  };

  const handleShow = () => setShowModal(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (editMode) {
      await axios.put(`http://localhost:5173/users/${formData.id}`, formData);
    } else {
      await axios.post("http://localhost:5173/users", formData);
    }
    fetchUsers();
    handleClose();
  };

  const handleEdit = (user) => {
    setFormData(user);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5173/users/${id}`);
    fetchUsers();
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h4>User List</h4>
        <Button variant="primary" onClick={handleShow}>
          Add User
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>SNo.</th>
            <th>Username</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>City</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>
                <td>{user.city}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>City</Form.Label>
              <Form.Control
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Users;
