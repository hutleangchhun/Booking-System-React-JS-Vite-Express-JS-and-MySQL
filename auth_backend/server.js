import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import userRoute from './routes/userRoute.js';

dotenv.config();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend React app (adjust as necessary)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow methods like GET, POST, PUT, DELETE
    allowedHeaders: ['Content-Type', 'Authorization'], // You can adjust headers as per your needs
}));
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', userRoute);

app.listen(process.env.PORT, () => console.log(`Server on port ${process.env.PORT}`));
