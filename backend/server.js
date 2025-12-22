const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/auth.routes'); 
const cors = require('cors');
const superAdminRoutes = require('./src/routes/superadmin.routes');
const publicRoutes = require('./src/routes/public.routes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Untuk parsing JSON body
app.use('/api/superadmin', superAdminRoutes);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/superadmin', superAdminRoutes);
app.use('/api/public', publicRoutes);

// Server start
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});