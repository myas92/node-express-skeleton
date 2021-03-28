const HttpError = require("../../../util/http-error");
const User = require("./model");
const { sendEmail } = require("../../../util/send-mail");
const { emailPattern, phonePattern } = require("../../../const/regex-pattern");
class userControllers {
  constructor() {}
  getUserByEmail = async (email) => {
    try {
      let result = await User.findOne({ email: email });
      return result;
    } catch (err) {
      throw err;
    }
  };
  getUserByQuery = async (query) => {
    try {
      query["is_deleted"] = false;
      let result = await User.findOne(query);
      return result;
    } catch (err) {
      throw err;
    }
  };
  createUser = async (initialUser) => {
    try {
      let user = new User({
        display_name: initialUser.display_name,
        email: initialUser.email,
        phone: initialUser.phone,
        password: initialUser.password
      });
      let createdUser = await user.save();
      return createdUser;
    } catch (err) {
      throw err;
    }
  };
  getUserById = async (id) => {
    try {
      let result = await User.findById(id);
      return result;
    } catch (err) {
      throw err;
    }
  };
  async getAllUsers(req, res, next) {
    console.log("getAllUsers");
    res.status(201).json({ m: "email" });
  }
  async getUser(req, res, next) {
    console.log("getUser");
    res.status(201).json({ m: "national_code" });
  }

  async updateUser(req, res, next) {

    console.log("updateUser");
    res.status(201).json({ m: "t" });
  }

  async deleteUser(req, res, next) {

    console.log("deleteUser");
    res.status(201).json({ m: "t" });
  }
}

module.exports = new userControllers();
