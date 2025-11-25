import { Container, Row, Col } from 'react-bootstrap';
import { FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import viLogo from '../assets/vi-logo.webp';
import storeImg from '../assets/vi-store.webp'; 

const Footer = () => {
  return (
    <footer id="contact" className="bg-dark text-white pt-5 pb-3">
      <Container>
        <Row className="gy-5 mb-4">
          
          {/* COLUMN 1: Brand & About */}
          <Col md={4}>
            <img src={viLogo} alt="Vi" className="bg-white p-2 rounded mb-3" height="50" />
            <p className="text-white-50 small pe-md-4">
              The premium destination for exclusive Vi mobile numbers. 
              100% legal transfer process, secure activation, and lifetime support guaranteed.
            </p>
          </Col>

          {/* COLUMN 2: Contact Details */}
          <Col md={4}>
            <h5 className="fw-bold mb-4 text-white">Contact Us</h5>
             
             <a href="https://wa.me/919603359031" target="_blank" rel="noreferrer" className="d-flex align-items-center text-white text-decoration-none mb-3 footer-link-hover">
                <div className="bg-success rounded-circle d-flex align-items-center justify-content-center me-3" style={{width:'36px', height:'36px'}}>
                  <FaWhatsapp className="text-white" size={20} /> 
                </div>
                <div>
                  <span className="d-block text-white-50 small">WhatsApp</span>
                  <span className="fw-semibold">+91 96033 59031</span>
                </div>
             </a>
             
             <a href="https://maps.app.goo.gl/JMyeVPxiStWh8rYb8?g_st=aw" target="_blank" rel="noreferrer" className="d-flex align-items-start text-white text-decoration-none footer-link-hover">
                <div className="bg-danger rounded-circle d-flex align-items-center justify-content-center me-3 mt-1" style={{width:'36px', height:'36px'}}>
                   <FaMapMarkerAlt className="text-white" size={18} /> 
                </div>
                <div>
                  <span className="d-block text-white-50 small">Location</span>
                  <span className="fw-semibold small">Champapet, Hyderabad, India</span>
                </div>
             </a>
          </Col>

          {/* COLUMN 3: Store Image (Right of Contact) */}
          <Col md={4}>
             <h5 className="fw-bold mb-4 text-white">Visit Us</h5>
             <div className="overflow-hidden rounded-3 border border-secondary">
               <img 
                 src={storeImg} 
                 alt="Vi Mini Store Front" 
                 className="img-fluid w-100"
                 style={{ objectFit: 'cover', height: '200px', opacity: '0.9' }}
                 loading="lazy"
               />
             </div>
             <p className="text-white-50 small mt-2 fst-italic">
               <small>Authentic Vi Mini Store Partner</small>
             </p>
          </Col>

        </Row>

        {/* BOTTOM: Divider & Credits */}
        <hr className="border-secondary opacity-25 my-4" />
        
        <div className="text-center text-white-50 small">
          <p className="mb-1">&copy; {new Date().getFullYear()} Vi Mini Store. All rights reserved.</p>
          <p className="mb-0 opacity-75">
            Designed & Developed by <span className="text-white fw-semibold">Vineeth Madishetti</span>
          </p>
        </div>

      </Container>
    </footer>
  );
};

export default Footer;