import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import ModalLogin from './ModalLogin';
import { FaUserCircle } from 'react-icons/fa';

const AppNavbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [showLogin, setShowLogin] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="border-bottom shadow-sm">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            Главная
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/articles">
                Статьи
              </Nav.Link>
              <Nav.Link as={NavLink} to="/contact">
                Обратная связь
              </Nav.Link>
            </Nav>

            <Nav>
              {isAuthenticated ? (
                <NavDropdown
                  title={
                    <>
                      <FaUserCircle className="me-1" />
                      {user.firstname}
                    </>
                  }
                  id="user-dropdown"
                  align="end"
                >
                  <NavDropdown.Item as={NavLink} to="/profile">
                    Профиль
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>Выйти</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Button variant="outline-success" onClick={() => setShowLogin(true)}>
                  Войти
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <ModalLogin show={showLogin} onHide={() => setShowLogin(false)} />
    </>
  );
};

export default AppNavbar;
