import { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signup = async(req:Request, res:Response,next:NextFunction)=>{
  try {
    const {username, email, password} = req.body;
    const existingUser = await User.findOne({$or: [{ username }, { email }]})
    if(existingUser) {
      return res.status(400).send("User already exists") ;
    }
    const user = new User(req.body);
    await user.save();
    return res.send("User successfully created");
  } catch (error) {
    next(error);
  }
}

export const signin = async(req:Request, res:Response,next:NextFunction)=>{
  const {email, password } = req.body;
  try {
    const validUser = await User.findOne({email});
    if(!validUser){
      return res.status(404).send("User not found");
    }
    const isMatch = await validUser.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send("Wrong credentials");
    }
    const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET as string);
    const {password: pass, ...rest} = validUser._doc;
    return res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);

  } catch (error) {
    next(error)
  }
}

export const google = async (req:Request, res:Response,next:NextFunction)=>{
  const {displayName,email, photoURL} = req.body;
  try {
    const user =  await User.findOne({email})
    if (user){
      const token = jwt.sign({id:user._id},process.env.JWT_SECRET as string);
      const {password, ...rest} = user._doc;
      return res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);
    }else{
      const generatedPassword = Math.random().toString(36).slice(-8);
      const newUser = new User({
        username: displayName.toLowerCase().split(' ').join('') +Math.random().toString(9).slice(-4),
        email,
        password: generatedPassword
      })
      await newUser.save();
      const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET as string);
      const {password, ...rest} = newUser._doc;
      res.status(200).cookie('access_token', token, { httpOnly: true }).json(rest);
    }
  } catch (error) {
    next(error)
  }
}