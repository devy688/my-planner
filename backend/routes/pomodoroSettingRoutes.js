import express from 'express';
import {
    readPomodoroSetting,
    updatePomodoroSetting,
} from '../controllers/pomodoroSettingController.js';

const router = express.Router();

router.post('/read', readPomodoroSetting);
router.post('/update', updatePomodoroSetting);

export default router;
