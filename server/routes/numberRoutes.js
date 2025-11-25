const express = require('express');
const router = express.Router();
const {
  getNumbers,
  addNumber,
  deleteNumber,
} = require('../controllers/numberController');
const { protect } = require('../middleware/authMiddleware');

// Public Route: Everyone can see the numbers
router.get('/', getNumbers);

// Protected Routes: Only logged-in Admin can Add or Delete
router.post('/', protect, addNumber);
router.delete('/:id', protect, deleteNumber);

module.exports = router;