const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config();

mongoose.connect(process.env.MONGO_KEY )
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