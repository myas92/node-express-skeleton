const mongoose = require("mongoose");
const { Schema , model } = mongoose;

const placeSchema = new Schema({
  title: { type: String, required: true, trim : true },
});

module.exports = model("Place", placeSchema);



// trim : method removes whitespace from both ends of a string