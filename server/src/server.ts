
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

mongoose.connect(process.env.MONGO_KEY as string )
  .then(()=>{
    console.log("MongoDB is running")
  })
  .catch((err:any)=>{
  console.log(err)}
)

const app = express();
app.listen(3000, ()=>{
  console.log('Server is running on port 3000!!')
})

app.get('/test', (req: Request, res: Response)=>{
  res.json({message:'API is working now'})
})