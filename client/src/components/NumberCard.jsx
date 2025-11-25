import React from 'react'; 
import { Card, Button } from 'react-bootstrap';
import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';
// Ensure CSS is imported in parent or globally, but structure relies on classes defined above

const NumberCard = ({ data, getSum }) => {
  const whatsappLink = `https://wa.me/919603359031?text=Hi, I am interested in Vi Number: ${data.number}`;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="h-100"
    >
      <Card className="h-100 border-0 number-card">
        <Card.Body className="p-4 d-flex flex-column align-items-center justify-content-center text-center">
            
            {/* Number Display */}
            <h3 className="vip-number-text">
                {data.number}
            </h3>
            
            {/* Badges - Compact */}
            <div className="d-flex align-items-center gap-2 mb-3">
                <span className="badge bg-light text-dark border fw-normal vip-badge">
                    Sum: <b>{getSum(data.number)}</b>
                </span>
                <span className="badge bg-success-subtle text-success border border-success-subtle fw-normal vip-badge">
                    Available
                </span>
            </div>

            {/* Action Button */}
            <Button 
                href={whatsappLink} 
                target="_blank" 
                className="btn-success w-100 vip-buy-btn shadow-none"
            >
                <FaWhatsapp className="me-1" /> Buy Now
            </Button>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default React.memo(NumberCard);