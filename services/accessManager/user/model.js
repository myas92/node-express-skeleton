const { date } = require("faker");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    display_name: { type: String, required: true },
    email: { type: String, unique: true, sparse:true },
    phone: { type: String, unique: true, sparse:true },
    password: { type: String, required: true },
    rolls: [{ type: String}],
    calling_code: { type: String, default: "+98" }, // کد کشور
  },
  { timestamps: true, versionKey: false }
);



let User = mongoose.model("user", userSchema);

module.exports = User;
