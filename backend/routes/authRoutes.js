import express from 'express';
import {
    signUpUser,
    signInUser,
    logoutUser,
} from '../controllers/authController.js';

const router = express.Router();

router.post('/sign-up', signUpUser);
router.post('/sign-in', signInUser);
router.get('/logout', logoutUser);

export default router;
