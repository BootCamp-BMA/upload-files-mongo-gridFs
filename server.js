require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const app = require('./src/app');

const port = process.env.PORT || 5000;

// Connect to database
connectDB();

app.listen(port, () => console.log(`Server started on port ${port}`));
