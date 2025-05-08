import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import userRoute from './routes/userRoute.js';
import unitRoute from './routes/unitRoute.js';
import systemInformationRoute from './routes/systemInformationRoute.js';
import booking from './routes/bookingRoute.js';
import customer from './routes/customerRoute.js';

dotenv.config();

const app = express();

// CORS configuration to allow requests from your frontend
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL, adjust if needed
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow methods like GET, POST, PUT, DELETE
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

app.use(express.json()); // Middleware to parse JSON

// Routes
app.use('/api', authRoutes);  // Authentication Routes
app.use('/api', userRoute);   // User Routes
app.use('/api', unitRoute);
app.use('/api', systemInformationRoute);
app.use('/api', booking);
app.use('/api', customer);

// Start the server
app.listen(process.env.PORT, () => console.log(`Server on port ${process.env.PORT}`));
