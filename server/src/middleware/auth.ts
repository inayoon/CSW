import jwt from 'jsonwebtoken';
import express from 'express';
import User from '../models/user.model';
import { NextFunction, Request, Response } from 'express';
import { IGetUserAuthInfoRequest } from './types';

export const  auth = async (req:IGetUserAuthInfoRequest, res: express.Response, next:express.NextFunction) => {
  const token = req.cookies.access_token;
  if(!token){
    return res.status(401).send("Unauthorized access");
  }
  jwt.verify(token, process.env.JWT_SECRET as string, (err:any, user:any)=>{
    if(err){
      return res.status(401).send("Unauthorized access");
    }
    req.user = user;
    next();
  })
}

