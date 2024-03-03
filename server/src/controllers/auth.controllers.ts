import { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';
import bcryptjs from 'bcryptjs';

export const signup = async(req:Request, res:Response,next:NextFunction)=>{
  try {
    const user = new User(req.body);
    await user.save();
    return res.status(200).send("Signed up successfully!")
  } catch (error) {
    next(error);
  }
}