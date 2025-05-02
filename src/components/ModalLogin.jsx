import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/authSlice';

const ModalLogin = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');

  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      onHide();
    }
  }, [isAuthenticated, onHide]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      dispatch(loginUser(email));
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Вход</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="loginEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Введите email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

          <Button
            variant="success"
            type="submit"
            className="mt-3 w-100"
            disabled={loading}
          >
            {loading ? <Spinner animation="border" size="sm" /> : 'Войти'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalLogin;
