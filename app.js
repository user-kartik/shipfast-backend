const express = require('express');
const dotenv = require('dotenv');
const { sequelize, connectDB } = require('./config/db');  // Ensure this import is correct
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
app.use(express.json());

// Connect to DB
connectDB();

// Use routes
app.use('/api/auth', authRoutes);

// Sync Sequelize models (create the SQLite database)
const startServer = async () => {
    await sequelize.sync();  // This should work now
    console.log('Database synced');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
