const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/auth.routes'); 
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Untuk parsing JSON body

// Routes
app.use('/api/auth', authRoutes);

// Server start
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});