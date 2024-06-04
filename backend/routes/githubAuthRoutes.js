import express from 'express';
import {
    redirectToGithub,
    handleGithubCallback,
    getGithubUser,
} from '../controllers/githubAuthController.js';

const router = express.Router();

router.get('/', redirectToGithub);
router.get('/callback', handleGithubCallback);
router.get('/user', getGithubUser);

export default router;
