import express from 'express';
import {
    readLists,
    registerList,
    updateList,
    updateListCompletion,
    deleteList,
    readMonthLists,
} from '../controllers/listsController.js';

const router = express.Router();

router.post('/read', readLists);
router.post('/read-month', readMonthLists);
router.post('/register', registerList);
router.post('/update', updateList);
router.post('/update-complete', updateListCompletion);
router.post('/delete', deleteList);

export default router;
