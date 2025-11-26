import { useState } from 'react';
import { Navbar, Container, Nav, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';
import viLogo from '../assets/vi-logo.webp'; 
import '../styles/navigation.css';

const Navigation = () => {
  const [expanded, setExpanded] = useState(false);

  // Function to close sidebar
  const closeMenu = () => setExpanded(false);

  // Scroll to top and close menu (safe for SSR)
  const scrollToTopAndClose = () => {
    if (typeof window !== 'undefined' && window.scrollTo) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <Navbar 
      expand="lg" 
      fixed="top"
      className="custom-navbar"
      expanded={expanded}
      onToggle={(val) => setExpanded(val)}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={() => { scrollToTopAndClose(); }}>
          <img src={viLogo} alt="Vi Logo" height="45" />
        </Navbar.Brand>
        
        {/* Toggle Button (Hamburger) */}
        <Navbar.Toggle aria-controls="offcanvasNavbar" className="border-0 shadow-none" />
        
        {/* 
           Responsive Side Menu 
           - 'placement="end"' puts it on the right side.
           - The 'sidebar-menu' class now ONLY affects mobile via CSS media queries.
        */}
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          className="sidebar-menu" 
          restoreFocus={false}
          show={expanded}
          onHide={closeMenu}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3 align-items-lg-center">
              <Nav.Link href="#home" className="nav-link-custom" onClick={(e) => { e.preventDefault(); scrollToTopAndClose(); }}>Home</Nav.Link>
              <Nav.Link href="#vip-numbers" className="nav-link-custom" onClick={closeMenu}>VIP Numbers</Nav.Link>
              <Nav.Link href="#services" className="nav-link-custom" onClick={closeMenu}>Services</Nav.Link>
              <Nav.Link href="#contact" className="nav-link-custom" onClick={closeMenu}>Contact Us</Nav.Link>

              <Link 
                to="/admin/login" 
                className="nav-link admin-btn-nav ms-lg-3 mt-3 mt-lg-0"
                onClick={closeMenu}
              >
                 <FaUserShield className="me-2"/>Admin
              </Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Navigation;