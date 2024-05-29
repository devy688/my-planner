import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import connectDB from './config.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
connectDB();

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.static('public'));

app.use('/api/auth', authRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
