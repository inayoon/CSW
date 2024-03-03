import { NextFunction } from 'express';
import bcryptjs from 'bcryptjs';

const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required:true,
    unique:true,
    maxLength: 20, 
  },
  email:{
    type:String,
    trim: true,
    unique:true,
  },
  password:{
    type:String,
    minLength:6,
  },
  cart:{
    type:Array,
    default:[],
  },
  likes:{
    type:Array,
    default:[],
  }
}, {timestamps:true})

userSchema.pre("save", async function (next:NextFunction){
  let user = this;
  if(user.isModified("password")){
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(user.password, salt);
    user.password = hash;
  }
  next();
});

userSchema.methods.comparePassword = async function (plainPassword:string){
  let user = this;
  const match = await bcryptjs.compare(plainPassword, user.password);
  return match;
}

const User = mongoose.model('User', userSchema);
export default User;