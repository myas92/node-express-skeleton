const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const studentSchema = new Schema({
  name: { type: String },
  categories: [
    {
      name: {
        type: String,
        required: true,
      },
      products: [
        {
          type: mongoose.Types.ObjectId,
          required: false,
          ref: "teacher",
        },
      ],
    },
  ],
});

module.exports = model("studenttt", studentSchema);

// trim : method removes whitespace from both ends of a string
