const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const provinceSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    country: { type: mongoose.Types.ObjectId, ref: "country" },
    cities: [{ type: mongoose.Types.ObjectId, ref: "city" }],
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = model("province", provinceSchema);

// trim : method removes whitespace from both ends of a string
