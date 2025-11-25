
const express = require('express');
const router = express.Router();
const {
  authUser,
  registerUser,
  logoutUser,
} = require('../controllers/authController');

// router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);

module.exports = router;