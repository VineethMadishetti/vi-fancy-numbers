import Navigation from '../components/Navigation';
import Hero from '../sections/Hero';
import VIPNumbers from '../sections/VIPNumbers';
import Services from '../sections/Services';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp'; // <--- Import here

const Home = () => {
  return (
    <>
      <Navigation />
      <Hero />
      <VIPNumbers />
      <Services />
      <Footer />
      
      {/* Floating Button */}
      <FloatingWhatsApp /> 
    </>
  );
};

export default Home;