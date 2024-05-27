import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import bcryptjs from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import connectDB from './config.js';
import User from './models/User.js';

dotenv.config();
connectDB();

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.static('public'));

app.post('/register', async (req, res) => {
    const { nickname, email, password, socialMediaId, socialMediaType } =
        req.body;

    try {
        let existingUser;
        if (socialMediaId) {
            existingUser = await User.findOne({ socialMediaId });
        } else {
            existingUser = await User.findOne({ email });
        }
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        let existingNickname = await User.findOne({ nickname });
        if (existingNickname) {
            return res.status(400).json({ message: 'Nickname already exists' });
        }

        let hashedPassword;
        if (!socialMediaId) {
            const salt = await bcryptjs.genSalt(10);
            hashedPassword = await bcryptjs.hash(password, salt);
        }

        const newUser = new User({
            nickname,
            email,
            password: hashedPassword,
            socialMediaId: socialMediaId || uuidv4(),
            socialMediaType: socialMediaType || null,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
