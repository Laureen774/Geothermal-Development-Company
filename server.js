const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const formRoutes = require('./formRoutes');

const app = express();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// API routes
app.use('/api', formRoutes);

// Serve static files
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname));

module.exports = app;