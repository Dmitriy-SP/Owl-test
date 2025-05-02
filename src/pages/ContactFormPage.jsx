import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector } from 'react-redux';

const ContactFormPage = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    date: new Date(),
    comment: '',
    userId: '',
    birthDate: ''
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData((prevData) => ({
        ...prevData,
        fullName: `${user.firstname} ${user.lastname}`,
        phone: user.phone,
        email: user.email,
        userId: user.id,
        birthDate: user.birthday
      }));
    }
  }, [isAuthenticated, user]);

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Введите ФИО';
    if (!formData.phone.trim()) newErrors.phone = 'Введите телефон';
    if (!formData.email.trim()) newErrors.email = 'Введите почту';
    if (!formData.comment.trim()) newErrors.comment = 'Введите комментарий';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, date }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setShowModal(true);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Форма обратной связи</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="fullName" className="mb-3">
              <Form.Label>ФИО</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                isInvalid={!!errors.fullName}
              />
              <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="phone" className="mb-3">
              <Form.Label>Телефон</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Почта</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="date" className="mb-3">
          <Form.Label>Дата</Form.Label>
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            className="form-control"
            dateFormat="yyyy-MM-dd"
          />
        </Form.Group>

        {isAuthenticated && (
          <>
          <Form.Group controlId="date" className="mb-3">
            <Form.Label>ID</Form.Label>
            <Form.Control  name="userId" value={formData.userId} />
          </Form.Group>
            
          <Form.Group controlId="date" className="mb-3">
            <Form.Label>Дата рождения</Form.Label>
            <Form.Control  name="birthDate" value={formData.birthDate} />
          </Form.Group>
          </>
        )}

        <Form.Group controlId="comment" className="mb-3">
          <Form.Label>Комментарий</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            isInvalid={!!errors.comment}
          />
          <Form.Control.Feedback type="invalid">{errors.comment}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="success" type="submit">
          Отправить
        </Button>
      </Form>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Данные отправлены</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>ФИО:</strong> {formData.fullName}</p>
          <p><strong>Телефон:</strong> {formData.phone}</p>
          <p><strong>Почта:</strong> {formData.email}</p>
          <p><strong>Дата:</strong> {formData.date.toLocaleDateString()}</p>
          <p><strong>Комментарий:</strong> {formData.comment}</p>
          {isAuthenticated && (
            <>
              <p><strong>ID пользователя:</strong> {formData.userId}</p>
              <p><strong>Дата рождения:</strong> {formData.birthDate}</p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ContactFormPage;
