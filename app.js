import express from 'express';
import dotenv from 'dotenv';
import connectDB from './backend/config/db.js';
const app = express();
dotenv.config();
connectDB();
//routes
import userRoutes from './backend/routes/userRoutes.js';
app.use('/api/users', userRoutes);
export default app;
