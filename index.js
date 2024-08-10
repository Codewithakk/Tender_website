const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db.js');
require('dotenv').config();

const app = express();
connectDB();

// CORS configuration
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
    credentials: true,
}));
app.use(express.json());

const adminRoutes = require('./routes/adminRoutes.js');
const userRoutes = require('./routes/users_route.js');
const bidRoutes = require('./routes/bids_route.js');
const bidsManagementRoutes=require('./routes/bidsManagementRoutes.js')

app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/bid', bidRoutes);
app.use('/api/management', bidsManagementRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));