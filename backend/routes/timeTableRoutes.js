import express from 'express';
import {
    readTotalTimeSummary,
    readTimeTable,
} from '../controllers/timeTableController.js';

const router = express.Router();

router.post('/total-time-summary/read', readTotalTimeSummary);
router.post('/time-table/read', readTimeTable);

export default router;
