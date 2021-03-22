const mongoose = require("mongoose");
const { Schema , model } = mongoose;

const testOneSchema = new Schema({
  title: { type: String, required: true, trim : true },
});

module.exports = model("testOne", testOneSchema);



// trim : method removes whitespace from both ends of a string