import { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';
import viLogo from '../assets/vi-logo.webp'; 
import '../styles/navigation.css';

const Navigation = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar 
      expand="lg" 
      fixed="top"
      className="custom-navbar"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={() => setExpanded(false)}>
          <img src={viLogo} alt="Vi Logo" height="45" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link href="#home" className="nav-link-custom" onClick={() => setExpanded(false)}>Home</Nav.Link>
            <Nav.Link href="#vip-numbers" className="nav-link-custom" onClick={() => setExpanded(false)}>VIP Numbers</Nav.Link>
            <Nav.Link href="#services" className="nav-link-custom" onClick={() => setExpanded(false)}>Services</Nav.Link>
            <Nav.Link href="#contact" className="nav-link-custom" onClick={() => setExpanded(false)}>Contact Us</Nav.Link>
            
            <Link 
              to="/admin/login" 
              className="nav-link admin-btn-nav ms-lg-3 mt-3 mt-lg-0"
              onClick={() => setExpanded(false)}
            >
               <FaUserShield className="me-2"/>Admin
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;