const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const teacherSchema = new Schema({
  name: { type: String }
});
const stuSchema = new Schema({
  name: { type: String }
});

module.exports = tech =  model("teacher", teacherSchema);
module.exports = stu =  model("stu", stuSchema);

// trim : method removes whitespace from both ends of a string
