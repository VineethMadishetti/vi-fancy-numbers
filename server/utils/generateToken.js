const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,     // Prevents client-side JS from reading the cookie (XSS protection)
    secure: true,       // CRITICAL: Must be true for HTTPS (Vercel/Render)
    sameSite: 'none',   // CRITICAL: Must be 'none' to allow Cross-Site cookies
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

module.exports = generateToken;