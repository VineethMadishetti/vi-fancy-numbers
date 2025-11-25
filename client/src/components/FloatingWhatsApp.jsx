import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import '../styles/floating-whatsapp.css';

const FloatingWhatsApp = () => {
  // Your phone number (no spaces or special chars)
  const phoneNumber = "919603359031"; 
  
  // The Pre-filled message
  const message = "Hi, I visited your website and I'm interested in buying a VIP number.";
  
  // URL Encoding
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={whatsappUrl} 
      className="whatsapp-float" 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
};

export default FloatingWhatsApp;