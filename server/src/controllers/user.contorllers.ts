import { NextFunction, Request, Response } from 'express';


export const test = (req:Request , res:Response)=>{
  res.json({ message: 'API is working now'});
};

export const signout = (req:Request, res:Response,next:NextFunction)=>{
  try{
    res.clearCookie('access_token')
        .status(200)
        .json("User signed out successfully");
  }catch(error){
    next(error)
  }
}