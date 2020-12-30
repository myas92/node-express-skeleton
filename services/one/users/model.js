const { strict } = require("joi");
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  image: { type: String },
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: "Place" }],
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
