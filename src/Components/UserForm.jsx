import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const UserForm = ({ onSubmit, initialData = {} }) => {
  const [name, setName] = useState(initialData.name || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control 
          type="text" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required 
        />
      </Form.Group>
      <Button type="submit" variant="success">Save</Button>
    </Form>
  );
};

export default UserForm;
