
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
dotenv.config();
import userRoutes from './routes/user.routes'
import authRoutes from './routes/auth.routes'
import productsRoutes from './routes/products.routes'

mongoose.connect(process.env.MONGO_KEY as string )
  .then(()=>{
    console.log("MongoDB is running")
  })
  .catch((err:any)=>{
  console.log(err)}
)

const app = express();
app.use(express.json());
app.use(cookieParser())
app.listen(3000, ()=>{
  console.log('Server is running on port 3000!!')
})

app.use('/api/user',userRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/products',productsRoutes)

app.use((err: any, req:Request, res:Response, next:NextFunction)=>{
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success:false,
    statusCode,
    message
  })
})