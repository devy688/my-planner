import express from 'express';
import { registerPomodoro } from '../controllers/pomodoroController.js';

const router = express.Router();

router.post('/register', registerPomodoro);

export default router;
