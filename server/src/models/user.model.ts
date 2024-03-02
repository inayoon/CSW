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

const User = mongoose.model('User', userSchema);
export default User;