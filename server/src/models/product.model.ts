import { NextFunction } from 'express';
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    maxLength: 30,
  },
  price: {
    type: Number,
    default: 0,
  },
  category:{
    type:String
  },
  images: {
    type: Array,
    default: [],
  },
  sold: {
    type: Number,
    default: 0,
  }
  
}, {timestamps:true})

const Product = mongoose.model('Product', productSchema);
export default Product;