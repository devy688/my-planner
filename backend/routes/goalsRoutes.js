import express from 'express';
import {
    readGoals,
    registerGoals,
    updateGoals,
    deleteGoals,
} from '../controllers/goalsController.js';

const router = express.Router();

router.post('/read', readGoals);
router.post('/register', registerGoals);
router.post('/update', updateGoals);
router.post('/delete', deleteGoals);

export default router;
