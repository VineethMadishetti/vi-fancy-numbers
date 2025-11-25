import { useState } from 'react';
import axios from '../axios';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { FaArrowLeft, FaEnvelope, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import '../styles/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post('/users/auth', { email, password });
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      
      {/* LEFT SIDE - IMAGE & BRANDING (Hidden on Mobile) */}
      <motion.div 
        className="login-image-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="login-overlay">
          <motion.div 
             className="brand-text"
             initial={{ y: 20, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1>Admin<br />Portal</h1>
            <p>
              Manage your premium VIP number inventory, track sales, 
              and update services efficiently from one secure dashboard.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* RIGHT SIDE - FORM */}
      <div className="login-form-section">
        <motion.div 
           className="login-card-wrapper"
           initial={{ x: 20, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ duration: 0.5 }}
        >
          <div className="mb-4 mb-md-5">
            <Link to="/" className="text-decoration-none text-muted small fw-bold d-inline-flex align-items-center mb-4 hover-primary">
               <FaArrowLeft className="me-2"/> Website
            </Link>
            <h2 className="fw-bolder display-6 mb-2">Welcome Back</h2>
            <p className="text-muted">Sign in to manage inventory.</p>
          </div>

          {error && <Alert variant="danger" className="border-0 bg-danger-subtle text-danger py-2 small">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="small fw-bold text-uppercase text-muted">Email</Form.Label>
              <div className="input-group">
                  <span className="input-group-text bg-light border-end-0"><FaEnvelope className="text-muted"/></span>
                  <Form.Control 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control-lg border-start-0 ps-2 bg-light"
                    placeholder="name@example.com"
                    required 
                  />
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="small fw-bold text-uppercase text-muted">Password</Form.Label>
              <div className="input-group">
                  <span className="input-group-text bg-light border-end-0"><FaLock className="text-muted"/></span>
                  <Form.Control 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control-lg border-start-0 ps-2 bg-light"
                    placeholder="••••••••"
                    required 
                  />
              </div>
            </Form.Group>

            <Button 
                type="submit" 
                className="btn-vi w-100 py-3 rounded-3 shadow-sm fw-bold"
                disabled={loading}
            >
              {loading ? 'Authenticating...' : 'Sign In'}
            </Button>
          </Form>

          <div className="mt-4 text-center">
             <span className="text-muted small">Secure Admin Area</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;