const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const citySchema = new Schema(
  {
    name: { type: String, required: true , trim: true},
    province: {
      type: mongoose.Types.ObjectId,
      req: "province",
      required: true,
    },
    is_deleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

module.exports = model("city", citySchema);

// trim : method removes whitespace from both ends of a string
