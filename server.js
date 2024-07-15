
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const userRoutes = require('./routes/userRoutes'); 
const authRoutes = require('./routes/authRoutes'); 

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.use('/users', userRoutes); 
app.use('/auth', authRoutes); 

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

