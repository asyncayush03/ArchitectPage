// backend/server.js
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db'); 
const path = require('path');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(morgan('dev'));

// serve uploaded images
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// admin routes
app.use('/api/v1/admin', require('./routes/adminRoute'));

// optionally health
// app.get('/api/health', (req, res) => res.json({ ok: true }));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Running in ${process.env.NODE_ENV} Mode on port ${port}`.bgCyan.yellow.bold);
});
