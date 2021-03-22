const { date } = require("faker");
const mongoose = require("mongoose");
const tokenSchema = new mongoose.Schema(
  {
    display_name: { type: String },
    email: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      sparse: true,
    },
    phone: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      sparse: true,
    },
    password: { type: String, required: true },
    verify_code: { type: String, required: true },
    is_used: { type: Boolean, default: false }, // استفاده نشده است
    expire_date: {
      type: Date,
    },
    ip: { type: String },
  },
  { timestamps: true }
);
// tokenSchema.index({ email: 1, phone: 1, expire_date: 1 }, { unique: true });
let Token = mongoose.model("token", tokenSchema);

module.exports = Token;
//ایمیل و تلفن یونیک نیست چون  اخرین کد در دیتابیس  معتبر است و آپسرت میکنیم
