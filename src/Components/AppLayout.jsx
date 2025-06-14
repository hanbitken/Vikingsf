import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';

const AppLayout = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={2} className="bg-light vh-100 p-3">
          <h4>Admin</h4>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/users">Users</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
          </Nav>
        </Col>
        <Col md={10} className="p-4">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default AppLayout;
