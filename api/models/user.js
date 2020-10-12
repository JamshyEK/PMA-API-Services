const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String , required: true},
  mobile_no: { type: Number, required:true,unique:true},
  password: { type: String , required: true},
  email: { type: String, required: true ,unique:true},
  ward: { type: Number, required: true },
  address: { type: String, required: true },
  credit:{type:Number,default:0},
  image: { type: String },
});

module.exports = mongoose.model("user", userSchema);
