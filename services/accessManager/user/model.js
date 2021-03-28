const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const userSchema = new mongoose.Schema(
  {
    display_name: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    password: { type: String, required: true },
    roles: [{ type: String }],
    reputation :{type: String},// شهرت و امتیاز
    posts_edited : {type: String},
    helpful_flags : {type: String},
    calling_code: { type: String, default: "+98" }, // کد کشور
    is_active: { type: Boolean },
    is_deleted: { type: Boolean },
  },
  { timestamps: true, versionKey: false }
);
// افزودن پلاگین برای پیج انیشن
userSchema.plugin(mongoosePaginate);

userSchema.pre("save", async function (next) {
  this.roles = ["visitor"];
  this.is_active = true;
  this.is_deleted = false;
  this.posts_edited = "0";
  this.helpful_flags = "0"; 
});

let User = mongoose.model("user", userSchema);

module.exports = User;
