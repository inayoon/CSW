import { NextFunction, Request, Response } from 'express';
import Product from '../models/product.model';

export const uploadProducts =async (req:Request, res:Response,next:NextFunction)=>{
  try {
    const product = new Product(req.body);
    await product.save();
    return res.status(201).send("Product uploaded successfully")
  } catch (error) {
    next(error)
  }
}


export const getAllProducts =async (req:Request, res:Response,next:NextFunction)=>{
  try {
    const products = await Product.find();
    return res.status(200).json({ products });
  } catch (error) {
    next(error)
  }
}

export const getOneById= async (req:Request, res:Response,next:NextFunction)=>{
  try{
    const {productId} = req.params;
    const product = await Product.findById(productId);
    if(!product){
      console.log("Product not found");
      return res.status(404);
    }
    console.log("Product found", product);
    res.status(200).json(product);
  }
  catch(error){
    console.error("Error fetching product", error);
    next(error)
  }
}