import express from 'express';
import { signout, test } from '../controllers/user.contorllers';
import { auth } from '../middleware/auth';


const router = express.Router();
router.get('/test', test)
router.post('/signout', signout);

export default router;