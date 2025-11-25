const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const numberRoutes = require('./routes/numberRoutes');

// Load env vars
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// --- SECURITY MIDDLEWARE ---

// 1. Set security HTTP headers
app.use(helmet());

// 2. CORS Configuration (CRITICAL FIX)
// We allow both localhost variants to prevent errors
const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://vi-fancy-numbers.vercel.app', 'https://vi-fancy-numbers.onrender.com', process.env.CLIENT_URL];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // Essential for cookies (Auth/Logout)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 1000, // Increased limit for development
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter); 

// --- ESSENTIAL MIDDLEWARE ---
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// --- ROUTES ---
app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/api/users', userRoutes);
app.use('/api/numbers', numberRoutes);

// --- ERROR HANDLING ---
app.use((err, req, res, next) => {
  console.error(err.stack); // Log error stack for debugging
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// --- START SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});