import express from 'express';
import multer from 'multer';
import { updateUser } from '../controllers/userController.js';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/update', upload.single('file'), updateUser);

export default router;
