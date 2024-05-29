import bcryptjs from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const signUpUser = async (req, res) => {
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

        const user = new User({
            nickname,
            email,
            password: hashedPassword,
            socialMediaId: socialMediaId || uuidv4(),
            socialMediaType: socialMediaType || null,
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const signInUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign(
            { userId: user._id }, //
            process.env.JWT_SECRET, //
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', user, token });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export { signUpUser, signInUser };
