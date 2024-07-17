import express from 'express';
import { readTotalTimeSummary } from '../controllers/timeTableController.js';

const router = express.Router();

router.post('/read/totalTimeSummary', readTotalTimeSummary);

export default router;
