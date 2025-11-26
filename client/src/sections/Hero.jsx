import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';
import { FaChevronRight } from 'react-icons/fa';
import heroImg from '../assets/hero-img.webp';
import '../styles/hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero-wrapper">
      <Container>
        <Row className="align-items-center gy-5">
          <Col lg={6}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="hero-badge">Official Vi Partner</span>
              <h1 className="display-3 hero-title mb-3">
                Premium Numbers, <br/>
                <span className="text-primary-vi">Exclusive Identity.</span>
              </h1>
              <p className="lead text-muted mb-4" style={{ maxWidth: '500px' }}>
                Upgrade your digital identity with a VIP number. 100% legal transfer, instant activation, and lifetime support.
              </p>
              
              <div className="d-flex gap-3 flex-wrap justify-content-md-start justify-content-center">
                <Button href="#vip-numbers" className="btn-vi btn-lg px-4">
                  Explore Numbers <FaChevronRight size={14} className="ms-1"/>
                </Button>
              </div>
            <div className="d-flex gap-4 mt-5 justify-content-md-start justify-content-center text-muted small fw-bold">
                 <span>🛡️ 100% Secure</span>
                 <span>⚡ 24hr Activation</span>
                 <span>💎 Verified List</span>
              </div>
            </motion.div>
          </Col>
          <Col lg={6}>
            <motion.div 
              className="hero-img-container text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            > 
              <img 
                src={heroImg} 
                alt="Vi VIP Numbers" 
                className="img-fluid"
                style={{ maxHeight: '480px' }}
                fetchPriority="high"
              />
            </motion.div>
            
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;