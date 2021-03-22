const mongoose = require("mongoose");
const { Schema } = mongoose;

const placeSchema = new Schema({
  title: { type: String, required: true, trim : true },
  description: { type: String, required: true },
  image: { type: String },
  address: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User'},
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Placez", placeSchema);



// trim : method removes whitespace from both ends of a string