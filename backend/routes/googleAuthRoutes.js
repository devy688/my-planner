import express from 'express';
import {
    redirectToGoogle,
    handleGoogleCallback,
    getGoogleUser,
} from '../controllers/googleAuthController.js';

const router = express.Router();

router.get('/', redirectToGoogle);
router.get('/callback', handleGoogleCallback);
router.get('/user', getGoogleUser);

export default router;
