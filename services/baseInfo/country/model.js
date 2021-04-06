const mongoose = require("mongoose");
const { Schema , model } = mongoose;

const provinceSchema = new Schema({
  name : {type : String , required : true, trim: true },
  provinces : [{type : mongoose.Types.ObjectId , ref : "province" }],
  is_deleted : {type : Boolean , default : false}
}, {timestamps : true, versionKey: false});

module.exports = model("country", provinceSchema);



// trim : method removes whitespace from both ends of a string