import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { FaSearch, FaFilter, FaRedo, FaTimes } from 'react-icons/fa';
import NumberCard from '../components/NumberCard';
import axios from '../axios';
import '../styles/vip-numbers.css';

const VIPNumbers = () => {
  const [numbers, setNumbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [sumFilter, setSumFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    fetchNumbers();
  }, []);

  const fetchNumbers = async () => {
    try {
      const { data } = await axios.get("/numbers");
      setNumbers(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      setError("Failed to load numbers.");
      setLoading(false);
    }
  };

  const getSum = (numStr) => {
    if (!numStr) return 0;
    let sum = numStr.toString().split("").reduce((acc, curr) => acc + parseInt(curr), 0);
    while (sum > 9) sum = sum.toString().split("").reduce((a, c) => a + parseInt(c), 0);
    return sum;
  };

  const filteredData = numbers.filter(item => {
    const matchSearch = item.number.includes(search);
    const matchSum = sumFilter ? getSum(item.number) === parseInt(sumFilter) : true;
    return matchSearch && matchSum;
  });

  const visibleData = filteredData.slice(0, visibleCount);

  return (
    <section id="vip-numbers" className="vip-section">
      
      {/* --- ADDED: Background Animated Blobs --- */}
      <div className="vip-bg-animation">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <Container>
        <div className="text-center mb-4 mb-md-5">
          <h6 className="text-primary-vi fw-bold text-uppercase small ls-2">Inventory</h6>
          <h2 className="fw-bolder display-6">Choose Your Number</h2>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <Row className="g-2 align-items-center">
            {/* Search Input */}
            <Col xs={5} md={5}>
              <div className="position-relative">
                <FaSearch className="filter-icon" />
                <Form.Control 
                  type="text" 
                  className="search-input" 
                  placeholder="Number..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </Col>
            
            {/* Sum Filter */}
            <Col xs={4} md={4}>
               <div className="position-relative">
                <FaFilter className="filter-icon" />
                <Form.Control 
                  type="number" 
                  className="search-input" 
                  placeholder="Sum"
                  value={sumFilter}
                  onChange={(e) => setSumFilter(e.target.value)}
                />
              </div>
            </Col>

            {/* Reset Button */}
            <Col xs={3} md={3}>
               <Button 
                variant="light" 
                className="w-100 fw-bold text-muted border reset-btn"
                onClick={() => { setSearch(''); setSumFilter(''); }}
               >
                 <span className="d-none d-md-inline"><FaRedo className="me-1"/> Reset</span>
                 <span className="d-md-none"><FaTimes /></span>
               </Button>
            </Col>
          </Row>
        </div>

        {/* Content */}
        {loading ? (
           <div className="text-center py-5"><Spinner animation="border" variant="danger" /></div>
        ) : error ? (
           <Alert variant="danger">{error}</Alert>
        ) : (
          <>
            <Row className="g-2 g-md-4">
              {visibleData.map(item => (
                <Col key={item._id} xs={6} md={4} lg={3} className="vip-grid-col">
                  <NumberCard data={item} getSum={getSum} />
                </Col>
              ))}
            </Row>

            {visibleData.length === 0 && (
              <div className="text-center py-5 text-muted">
                <p>No numbers found matching your criteria.</p>
              </div>
            )}

            {visibleData.length < filteredData.length && (
              <div className="text-center mt-4">
                <Button 
                  variant="outline-dark" 
                  className="rounded-pill px-4 py-2 fw-bold text-uppercase small"
                  onClick={() => setVisibleCount(prev => prev + 12)}
                >
                  Load More
                </Button>
              </div>
            )}
          </>
        )}
      </Container>
    </section>
  );
};

export default VIPNumbers;