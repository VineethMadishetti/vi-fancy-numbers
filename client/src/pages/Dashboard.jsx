import { useState, useEffect } from 'react';
import axios from '../axios';
import { Container, Row, Col, Card, Form, Button, Table, Tab, Tabs, Alert, Badge } from 'react-bootstrap';
import { FaTrash, FaPlus, FaSignOutAlt, FaHome, FaUpload, FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [numbers, setNumbers] = useState([]);
  const [filteredNumbers, setFilteredNumbers] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]); 
  const [newNumber, setNewNumber] = useState('');
  const [bulkText, setBulkText] = useState('');
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const isValidMobile = (num) => /^\d{10}$/.test(String(num).trim());

  const fetchNumbers = async () => {
    try {
      const { data } = await axios.get('/numbers');
      const list = Array.isArray(data) ? data : [];
      setNumbers(list);
      setFilteredNumbers(list); 
      setSelectedIds([]); 
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNumbers();
  }, []);

  useEffect(() => {
    if(!searchQuery) {
        setFilteredNumbers(numbers);
    } else {
        setFilteredNumbers(numbers.filter(n => n.number.includes(searchQuery)));
    }
  }, [searchQuery, numbers]);

  const handleLogout = async () => {
    await axios.post('/users/logout');
    navigate('/admin/login');
  };

  const addSingleNumber = async (e) => {
    e.preventDefault();
    if (!isValidMobile(newNumber)) {
        setMessage({ type: 'danger', text: 'Enter exactly 10 digits.' });
        return;
    }
    try {
      await axios.post('/numbers', { number: newNumber });
      setMessage({ type: 'success', text: 'Number Added!' });
      setNewNumber('');
      fetchNumbers();
    } catch (error) {
      setMessage({ type: 'danger', text: error.response?.data?.message || 'Error adding number' });
    }
  };

  const uploadBulk = async (rawArray) => {
    const validNumbers = rawArray.map(n => String(n).trim()).filter(n => isValidMobile(n));
    const uniqueNumbers = [...new Set(validNumbers)];
    
    if (uniqueNumbers.length === 0) {
        setMessage({ type: 'danger', text: 'No valid numbers found.' });
        return;
    }

    try {
      await axios.post('/numbers', { numbers: uniqueNumbers });
      setMessage({ type: 'success', text: `Added ${uniqueNumbers.length} numbers.` });
      fetchNumbers();
      setBulkText('');
    } catch (error) {
      setMessage({ type: 'warning', text: 'Uploaded with duplicates skipped.' });
      fetchNumbers();
    }
  };

  const handleProcessTextData = () => {
      if(!bulkText) return;
      const rawList = bulkText.split(/[\n,\s]+/).filter(item => item.trim() !== '');
      uploadBulk(rawList);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const wb = XLSX.read(event.target.result, { type: 'binary' });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      const flatNumbers = data.flat().filter(n => n);
      uploadBulk(flatNumbers);
    };
    reader.readAsBinaryString(file);
  };

  const handleDeleteSingle = async (id) => {
    if(window.confirm('Delete this number?')) {
      try { await axios.delete(`/numbers/${id}`); fetchNumbers(); } catch (error) { alert('Error deleting'); }
    }
  };

  const handleMultiDelete = async () => {
      if(!window.confirm(`Delete ${selectedIds.length} numbers?`)) return;
      try {
          await Promise.all(selectedIds.map(id => axios.delete(`/numbers/${id}`)));
          setMessage({ type: 'success', text: 'Deleted successfully.' });
          fetchNumbers();
      } catch (error) { fetchNumbers(); }
  };

  const toggleSelectAll = (e) => {
      if (e.target.checked) setSelectedIds(filteredNumbers.map(n => n._id));
      else setSelectedIds([]);
  };

  const toggleSelectOne = (id) => {
      if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(i => i !== id));
      else setSelectedIds([...selectedIds, id]);
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Admin Navbar - Responsive */}
      <div className="bg-white border-bottom px-3 px-md-4 py-3 sticky-top d-flex justify-content-between align-items-center shadow-sm">
          <div className="d-flex align-items-center gap-2">
            <h5 className="m-0 fw-bold text-dark d-none d-sm-block">Admin Panel</h5>
            <h5 className="m-0 fw-bold text-dark d-block d-sm-none">Admin</h5>
            <Badge bg="danger">Vi</Badge>
          </div>
          <div className="d-flex gap-2">
             <Link to="/" className="btn btn-outline-secondary btn-sm rounded-pill d-flex align-items-center">
                 <FaHome /> <span className="ms-2 d-none d-sm-inline">Site</span>
             </Link>
             <Button variant="dark" size="sm" className="rounded-pill d-flex align-items-center" onClick={handleLogout}>
                 <FaSignOutAlt /> <span className="ms-2 d-none d-sm-inline">Logout</span>
             </Button>
          </div>
      </div>

      <Container className="py-3 py-md-4">
        {message && <Alert variant={message.type} onClose={() => setMessage(null)} dismissible className="shadow-sm">{message.text}</Alert>}
        
        <Row>
          <Col md={12}>
             <Card className="border-0 shadow-sm rounded-3 overflow-hidden">
               <Card.Body className="p-0">
                 <Tabs defaultActiveKey="list" className="bg-white border-bottom px-2 px-md-3 pt-3">
                    
                    {/* LIST TAB */}
                    <Tab eventKey="list" title="Inventory" className="p-2 p-md-3">
                       
                       {/* Toolbar - Stacked on Mobile */}
                       <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-3 gap-3">
                           <div className="flex-grow-1 w-100" style={{ maxWidth: '400px' }}>
                               <div className="input-group">
                                   <span className="input-group-text bg-white border-end-0"><FaSearch className="text-muted"/></span>
                                   <Form.Control 
                                      type="text" 
                                      placeholder="Search..." 
                                      value={searchQuery}
                                      onChange={(e) => setSearchQuery(e.target.value)}
                                      className="border-start-0"
                                   />
                               </div>
                           </div>
                           <div className="d-flex justify-content-between align-items-center gap-2">
                               <Badge bg="secondary" className="p-2">Total: {numbers.length}</Badge>
                               {selectedIds.length > 0 && (
                                   <Button variant="danger" size="sm" onClick={handleMultiDelete} className="rounded-pill">
                                       <FaTrash /> Delete ({selectedIds.length})
                                   </Button>
                               )}
                           </div>
                       </div>

                       <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                         <Table hover responsive className="align-middle mb-0">
                           <thead className="bg-light sticky-top">
                             <tr>
                               <th width="40"><Form.Check type="checkbox" onChange={toggleSelectAll} checked={filteredNumbers.length > 0 && selectedIds.length === filteredNumbers.length} /></th>
                               <th>Number</th>
                               <th className="d-none d-sm-table-cell">Added On</th>
                               <th className="text-end">Action</th>
                             </tr>
                           </thead>
                           <tbody>
                             {filteredNumbers.map(num => (
                               <tr key={num._id}>
                                 <td><Form.Check type="checkbox" checked={selectedIds.includes(num._id)} onChange={() => toggleSelectOne(num._id)} /></td>
                                 <td className="fw-bold text-dark font-monospace fs-6">{num.number}</td>
                                 <td className="text-muted small d-none d-sm-table-cell">{new Date(num.createdAt).toLocaleDateString()}</td>
                                 <td className="text-end">
                                   <Button variant="link" className="text-danger p-0" onClick={() => handleDeleteSingle(num._id)}>
                                     <FaTrash />
                                   </Button>
                                 </td>
                               </tr>
                             ))}
                             {filteredNumbers.length === 0 && <tr><td colSpan="4" className="text-center py-4">No numbers found</td></tr>}
                           </tbody>
                         </Table>
                       </div>
                    </Tab>

                    {/* ADD TAB */}
                    <Tab eventKey="add" title="Add / Import" className="p-3">
                       <Row className="g-4">
                           {/* Add Single */}
                           <Col lg={4}>
                               <Card className="h-100 border p-3 bg-light">
                                   <h6 className="fw-bold mb-3 d-flex align-items-center"><FaPlus className="me-2 text-primary"/> Add Single</h6>
                                   <Form onSubmit={addSingleNumber}>
                                      <Form.Control 
                                        type="tel" 
                                        value={newNumber} 
                                        onChange={(e) => setNewNumber(e.target.value)} 
                                        placeholder="10 Digit Number"
                                        maxLength="10"
                                        className="mb-2 py-2"
                                        required
                                      />
                                      <Button type="submit" variant="dark" className="w-100 rounded-pill">Add Number</Button>
                                   </Form>
                               </Card>
                           </Col>
                           
                           {/* Bulk Import */}
                           <Col lg={8}>
                               <Card className="h-100 border p-3 bg-light">
                                   <h6 className="fw-bold mb-3 d-flex align-items-center"><FaUpload className="me-2 text-success"/> Bulk Import</h6>
                                   <div className="d-flex flex-column flex-md-row gap-3">
                                      <div className="flex-grow-1">
                                          <Form.Control 
                                            as="textarea" 
                                            rows={4} 
                                            placeholder="Paste numbers here..." 
                                            value={bulkText}
                                            onChange={(e) => setBulkText(e.target.value)}
                                            className="mb-2 font-monospace text-muted small"
                                          />
                                          <Button onClick={handleProcessTextData} disabled={!bulkText} variant="outline-dark" size="sm" className="w-100">Process Text</Button>
                                      </div>
                                      <div className="d-flex flex-column justify-content-center border-start-md ps-md-3 pt-3 pt-md-0 border-top border-top-md-0">
                                          <Form.Label className="small fw-bold">Upload Excel (.xlsx)</Form.Label>
                                          <Form.Control type="file" size="sm" accept=".xlsx" onChange={handleFileUpload} />
                                          <Form.Text className="text-muted small mt-2">Column A must contain numbers.</Form.Text>
                                      </div>
                                   </div>
                               </Card>
                           </Col>
                       </Row>
                    </Tab>
                 </Tabs>
               </Card.Body>
             </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;