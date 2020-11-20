const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String , required: true},
  mobile_no: { type: Number},
  password: { type: String , required: true},
  email: { type: String, required: true ,unique:true},
  ward: { type: Number},
  address: { type: String},
  credit:{type:Number,default:0},
  image: { type: String },
  role:{type:String,default:'user'}
});

module.exports = mongoose.model("user", userSchema);
