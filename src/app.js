const express = require('express');
const methodOverride = require('method-override');
const fileRoutes = require('./routes/fileRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set('views', 'src/views');

// Routes
app.use('/', fileRoutes);

module.exports = app;
