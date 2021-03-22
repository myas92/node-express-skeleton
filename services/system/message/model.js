const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const studentSchema = new Schema({
  name: {type : String},
  messages: [
    {
      receiver: { type: mongoose.Types.ObjectId, required: true, ref: "teacher" },
      contentInfo: {
        msg: { type: String },
        viewed: { type: Boolean, default: false },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    },
  ],
});

module.exports = model("student", studentSchema);

// trim : method removes whitespace from both ends of a string
