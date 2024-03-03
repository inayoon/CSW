import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { NextFunction, Request, Response } from 'express';

let auth = async (req:Request, res:Response, next:NextFunction) => {
  
}