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
app.set('trust proxy', 1); 

// --- SECURITY MIDDLEWARE ---

// 1. Set security HTTP headers
app.use(helmet());

// 2. CORS Configuration (FIXED & SIMPLIFIED)
// We explicitly list the origins. No trailing slashes allowed.
app.use(cors({
  origin: [
    "http://localhost:5173",                 // For Local Development
    "https://vi-fancy-numbers.vercel.app"    // For Production (Vercel)
  ],
  credentials: true, // CRITICAL: Allows cookies (JWT) to travel between Vercel & Render
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 3. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 1000, 
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
  console.error(err.stack); 
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