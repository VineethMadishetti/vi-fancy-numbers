import { Container, Row, Col } from 'react-bootstrap';
import { FaBirthdayCake, FaStar, FaBuilding, FaPeopleCarry } from 'react-icons/fa';
import '../styles/services.css'; 

const ServiceCard = ({ icon, title, desc }) => (
  <div className="service-card text-center">
    <div className="service-icon-box">
       {icon}
    </div>
    <div>
      <h5 className="fw-bold">{title}</h5>
      <p className="text-muted small">{desc}</p>
    </div>
  </div>
);

const Services = () => {
  return (
    <section id="services" className="services-section">
      
      {/* Background Overlay */}
      <div className="services-overlay"></div>

      <Container className="services-content-wrapper">
        <div className="text-center mb-5 services-header">
          <h2 className="fw-bold display-6">Tailored Services</h2>
          <p>We go beyond just selling numbers.</p>
        </div>
        
        <Row className="g-3 g-md-4">
           <Col md={3}>
             <ServiceCard 
               icon={<FaBirthdayCake />} 
               title="Date of Birth / Anniversary" 
               desc="Match your mobile number with your birth date or anniversary for special luck." 
             />
           </Col>
           <Col md={3}>
             <ServiceCard 
               icon={<FaStar />} 
               title="Numerology" 
               desc="Lucky numbers calculated based on ancient numerology science for your success." 
             />
           </Col>
           <Col md={3}>
             <ServiceCard 
               icon={<FaBuilding />} 
               title="Business Series" 
               desc="Consecutive or similar series numbers for your office staff to build brand trust." 
             />
           </Col>
           <Col md={3}>
             <ServiceCard 
               icon={<FaPeopleCarry />} 
               title="Family" 
               desc="keep your family mobile numbers similar with just one-digit difference" 
             />
           </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Services;