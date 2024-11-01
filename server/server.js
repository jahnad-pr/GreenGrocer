require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/adminRoutes');
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
require('./config/db')()

const app = express();
const PORT = process.env.PORT || 5000;

// Initial Middlewares
app.use(cors({
    origin: 'http://localhost:5173',  // Your frontend URL
    credentials: true,  // Allow credentials (cookies)
}))
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use(cookieParser())


// Routes
app.use('/admin', adminRoutes);

// // Database connection
// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('MongoDB connected');
//     } catch (err) {
//         console.error(err.message);
//         process.exit(1);
//     }
// };

// connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
