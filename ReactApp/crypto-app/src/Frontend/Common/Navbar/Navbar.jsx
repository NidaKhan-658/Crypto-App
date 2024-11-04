import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Navbar as BootstrapNavbar, Nav, Button, Container } from "react-bootstrap";
import "./Navbar.css";

function Navbar({ isLoggedIn, onLogout }) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/Auth");
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate("/Auth");
  };

  return (
    <header className="navbar">
      <BootstrapNavbar bg="transparent" variant="dark" expand="lg" className="w-100">
        <Container fluid>
          <BootstrapNavbar.Brand as={NavLink} to="/">QuantumFi</BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle aria-controls="navbarNav" />
          <BootstrapNavbar.Collapse id="navbarNav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">Home</Nav.Link>
              <Nav.Link as={NavLink} to="/market">Market</Nav.Link>
              <Nav.Link as={NavLink} to="/dex">Dex Scan</Nav.Link>
              <Nav.Link as={NavLink} to="/portfolio">Portfolio</Nav.Link>
              <Nav.Link as={NavLink} to="/user-dashboard">Admin</Nav.Link>
            </Nav>
            <div className="d-flex align-items-center">
              {isLoggedIn ? (
                <Button variant="outline-light" onClick={handleLogoutClick}>
                  <FaSignOutAlt /> Logout
                </Button>
              ) : (
                <Button variant="outline-light" onClick={handleLoginClick}>
                  <FaSignInAlt /> Login
                </Button>
              )}
            </div>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
    </header>
  );
}

export default Navbar;
