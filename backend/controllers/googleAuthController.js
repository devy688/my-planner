import axios from 'axios';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

// 구글 클라이언트 정보
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

const JWT_SECRET = process.env.JWT_SECRET;

const redirectToGoogle = (req, res) => {
    const googleAuthURL = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email profile`;
    res.redirect(googleAuthURL);
};

const handleGoogleCallback = async (req, res) => {
    let data;
    let userInfo;

    try {
        const { code } = req.query;
        const params = new URLSearchParams({
            code,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code',
        });

        const response = await axios.post(
            'https://oauth2.googleapis.com/token',
            params
        );
        data = response.data;
    } catch (error) {
        console.error('Error getting response data:', error.response.data);
    }

    try {
        const { id_token, access_token } = data;
        userInfo = await axios.get(
            'https://www.googleapis.com/oauth2/v2/userinfo',
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );
    } catch (error) {
        console.error('Error getting access token:', error.response.data);
    }

    try {
        const { id, name, email, picture } = userInfo.data;

        let user = await User.findOne({ email });
        let socialUser = await User.findOne({ socialMediaId: id });

        if (user && !socialUser) {
            return res.status(400).json({
                message: 'User already registered by email',
                redirectTo: '/login',
            });
        }

        if (!user) {
            user = new User({
                nickname: name,
                email,
                socialMediaId: id,
                socialMediaType: 'google',
                profileImage: picture,
            });
            await user.save();
        }

        const token = jwt.sign(userInfo.data, JWT_SECRET, {
            expiresIn: '1h',
        });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });
        res.cookie('socialLogin', 'google');

        res.redirect('/todo/list');
    } catch (error) {
        console.error('Error redirect to /todo/list:', error);
        return res.status(500).json({ message: 'Failed to handle user login' });
    }
};

const getGoogleUser = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findOne({ email: decoded.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Invalid token:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

export { redirectToGoogle, handleGoogleCallback, getGoogleUser };
