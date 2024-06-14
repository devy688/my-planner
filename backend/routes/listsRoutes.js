import express from 'express';
import {
    readLists,
    registerList,
    updateList,
    deleteList,
} from '../controllers/listsController.js';

const router = express.Router();

router.post('/read', readLists);
router.post('/register', registerList);
router.post('/update', updateList);
router.post('/delete', deleteList);

export default router;
