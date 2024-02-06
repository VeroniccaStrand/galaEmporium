import express from 'express';
import dotenv from 'dotenv';

const app = express();

//routes
import userRoutes from './backend/routes/userRoutes.js';
app.use('/api/users', userRoutes);
export default app;
