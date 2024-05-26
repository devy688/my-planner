import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import connectDB from './config.js';

dotenv.config();
connectDB();

const app = express();
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
