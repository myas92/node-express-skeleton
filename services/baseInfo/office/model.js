const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const officeSchema = new Schema({
  name: { type: String, trim: true },// نام انگلیسی
  title_fa: { type: String, trim: true }, // توضیحات فارسی اداره
  title_EN: { type: String, trim: true },// توضیحات انگلیسی اداره
  description: { type: String, trim: true }, // توضیحات
  country_id: { type: mongoose.Types.ObjectId, ref: "country" }, 
  city_id: { type: mongoose.Types.ObjectId, ref: "city" },
  district_id: { type: mongoose.Types.ObjectId, ref: "district" }, // ای دی منطقه
  area: { type: String }, // ناحیه
  category_one: { type: mongoose.Types.ObjectId, ref: "category" },// دسته بندی
  catgory_two: { type: mongoose.Types.ObjectId, ref: "category" },
  category_three: { type: mongoose.Types.ObjectId, ref: "category" },
  category_four: { type: mongoose.Types.ObjectId, ref: "category" },
});

module.exports = model("office", officeSchema);

// trim : method removes whitespace from both ends of a string
