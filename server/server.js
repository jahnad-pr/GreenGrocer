require('dotenv').config();
const express = require('express');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path');
require('dotenv').config()
require('./config/db')()

const app = express();
const PORT = process.env.PORT || 5000;

// Initial Middlewares
app.use(cors({
    origin: process.env.FRONT_END_URL,  // Your frontend URL
    credentials: true,  // Allow credentials (cookies)
}))

app.use('/uploads/products', express.static(path.join(__dirname, './public/uploads/products')));  
app.use(cookieParser())
// Increase body-parser limit
app.use(express.json({ limit: '10mb' })); // Set to a higher limit as needed
app.use(express.urlencoded({ extended: true }));


// Routes
app.use('/admin', adminRoutes)
app.use('/user', userRoutes)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
