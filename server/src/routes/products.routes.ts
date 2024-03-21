import express from 'express'
import { uploadProducts, getAllProducts } from '../controllers/products.controllers';
import { auth } from '../middleware/auth';


const router = express.Router();

router.post('/upload', auth, uploadProducts)
router.get('/all', getAllProducts)

export default router;
