import express from 'express';
import {
    readGoals,
    registerGoal,
    updateGoal,
    deleteGoal,
} from '../controllers/goalsController.js';

const router = express.Router();

router.post('/read', readGoals);
router.post('/register', registerGoal);
router.post('/update', updateGoal);
router.post('/delete', deleteGoal);

export default router;
