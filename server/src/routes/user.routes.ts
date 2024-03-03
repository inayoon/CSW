import express from 'express';
import { test } from '../controllers/user.contorllers';

const router = express.Router();
router.get('/test', test)

export default router;