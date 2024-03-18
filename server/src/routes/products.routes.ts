import express from 'express'
import { uploadProducts } from '../controllers/products.controllers';
import { auth } from '../middleware/auth';


const router = express.Router();

router.post('/upload', auth, uploadProducts)

export default router;
