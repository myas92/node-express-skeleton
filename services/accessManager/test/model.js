const mongoose = require("mongoose");
const { Schema , model } = mongoose;

const testSchema = new Schema({
  title: { type: String, required: true, trim : true },
});

module.exports = model("test", testSchema);



// trim : method removes whitespace from both ends of a string