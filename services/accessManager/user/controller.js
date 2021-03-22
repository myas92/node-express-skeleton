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
      // console.log(err);
      // const error = new HttpError(
      //   "Signing Up faild, please try again later",
      //   500
      // );
      throw err;
    }
  };
  getUserByQuery = async (query) => {
    try {
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
        password: initialUser.password,
        rolls: ["visitor"],
      });
      let createdUser = await user.save();
      return createdUser;
    } catch (err) {
      throw err;
    }
  };
  async authenticatePhone(req, res, next) {
    let { phone } = req.body;
    console.log("authenticatePhone");
    res.status(201).json({ m: email });
  }
  async authenticateCode(req, res, next) {
    let { national_code } = req.body;
    console.log("authenticateCode");
    res.status(201).json({ m: national_code });
  }

  async signUpEmail(req, res, next) {
    let { email, password } = req.params;
    console.log("signUpEmail");
    res.status(201).json({ m: "t" });
    // .json({ userId: createdUser.id, email: createdUser.email, token: token });
  }
  async signUpPhone(req, res, next) {
    console.log("signUpPhone");
  }
  async signUpCode(req, res, next) {
    let { national_code } = req.body;
    console.log("signUpCode");
  }
}

module.exports = new userControllers();
