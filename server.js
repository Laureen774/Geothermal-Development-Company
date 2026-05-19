const express = require('express');
const cors = require('cors');
const formRoutes = require('./formRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use('/api', formRoutes);

//Serve static files
app.use(express.static(__dirname + '/public'));''

module.exports = app;


    