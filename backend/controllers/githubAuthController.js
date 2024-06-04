import axios from 'axios';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const REDIRECT_URI = process.env.GITHUB_REDIRECT_URI;

const JWT_SECRET = process.env.JWT_SECRET;

const redirectToGithub = (req, res) => {};

const handleGithubCallback = async (req, res) => {
    const { code } = req.query;

    try {
        const tokenResponse = await axios({
            method: 'post',
            url: `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}`,
            headers: {
                accept: 'application/json',
            },
        });

        const accessToken = tokenResponse.data.access_token;
        const userResponse = await axios({
            method: 'get',
            url: 'https://api.github.com/user',
            headers: {
                Authorization: `token ${accessToken}`,
            },
        });

        const userInfo = userResponse.data;

        // github는 email이 null 일수도 있음
        const { id, name, email, avatar_url } = userInfo;

        let user = await User.findOne({
            socialMediaId: id,
            nickname: name,
        });

        if (!user) {
            user = new User({
                nickname: name,
                email,
                socialMediaId: id,
                socialMediaType: 'github',
                profileImage: avatar_url,
            });
            await user.save();
        }

        const token = jwt.sign(userInfo, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        });
        res.cookie('socialLogin', 'github');

        res.redirect('/todo/list');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

const getGithubUser = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({
            socialMediaId: decoded.id,
            nickname: decoded.name,
        });

        if (!user) {
            return res
                .status(404)
                .json({ message: 'getGithubUser >>> User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Invalid token:', error);
        res.status(401).json({ message: 'Invalid token' });
    }
};

export { redirectToGithub, handleGithubCallback, getGithubUser };
