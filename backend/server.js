import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
// import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import connectDB from './config.js';
import authRoutes from './routes/authRoutes.js';
import googleAuthRoutes from './routes/googleAuthRoutes.js';

dotenv.config();
connectDB();

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.static('public'));

app.use('/api/auth', authRoutes);
app.use('/api/auth/google', googleAuthRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
