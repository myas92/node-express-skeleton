const { date } = require("faker");
const mongoose = require("mongoose");
const tokenSchema = new mongoose.Schema(
  {
    display_name: { type: String },
    email: {
      type: String,
    },
    phone: {
      type: String,
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

const forgetTokenSchema = new mongoose.Schema(
  {
    display_name: { type: String },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    verify_code: { type: String, required: true },
    is_used: { type: Boolean, default: false }, // استفاده نشده است
    expire_date: {
      type: Date,
    },
    ip: { type: String },
  },
  { timestamps: true }
);

tokenSchema.index({ email: 1, expire_date: 1 }, { unique: true });
tokenSchema.index({ phone: 1, expire_date: 1 }, { unique: true });

forgetTokenSchema.index({ email: 1, expire_date: 1 }, { unique: true });
forgetTokenSchema.index({ phone: 1, expire_date: 1 }, { unique: true });

// tokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 10 * 24 * 60 * 60 }); // پاک شدن داکیومنت مورد نظر بعد از یک 300 ثانیه
let VerifyCode = mongoose.model("verify_code", tokenSchema);
let ForgetVerifyCode = mongoose.model("forget_verify_code", forgetTokenSchema);

module.exports = { VerifyCode, ForgetVerifyCode };
//ایمیل و تلفن یونیک نیست چون  اخرین کد در دیتابیس  معتبر است و آپسرت میکنیم
