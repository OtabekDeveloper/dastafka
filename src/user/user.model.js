const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: {
    type : String,
    required : true
  },
  tel: {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  code : {
    type : Number,
    max : 9999,
    min: 1000
  }
});
const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
