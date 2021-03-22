const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userController = require("../user/controller");
const dbConfig = require("../../../initializer");
const stVars = require("../../../const/static-variables");
const config = require("../../../config");
const Token = require("./model");
const User = require("../user/model");
const HttpError = require("../../../util/http-error");
const Errors = require("../../../const/errors");
const { sendEmail } = require("../../../util/send-mail");
const { getVerifyCode, getQueryOfUsername } = require("../../../util/utility");
const redisController = require("../../../util/redis-controller");
const { emailPattern, phonePattern } = require("../../../const/regex-pattern");
class authControllers {
  constructor() {}
  signup = async (req, res, next) => {
    let { display_name, username, password } = req.body;
    try {
      let query = getQueryOfUsername(username); //{email: a@gmail.com} or {phone:09123456789}
      const typeOfUsername = Object.keys(query);
      let existingUser = await userController.getUserByQuery(query);
      if (existingUser) {
        const error = new HttpError(Errors.Username_Is_Duplicate, req.language);
        return next(error);
      }
      // از آپسرت استفاده میکنیم تا اخرین وری فای کد فقط معتبر باشد
      let verifiyCode = getVerifyCode();
      let hashedPassword = await bcrypt.hash(password, 12);
      await Token.findOneAndUpdate(
        query,
        {
          ...query,
          display_name,
          password: hashedPassword,
          verify_code: verifiyCode,
          ip: req.ip,
          is_used: false,
          expire_date: Date.now() + stVars.EXPIRE_TIME_EMAIL_TOKEN,
        },
        { new: true, upsert: true }
      );
      //TODO : ارسال ایمیل از حالت کامنت خارج شود
      //ارسال ایمیل
      // if (typeOfUsername == "email") await sendEmail(email, verifiyCode);
      // //ارسال پیامک
      // else if (typeOfUsername == "phone") await sendSms(email, verifiyCode);
      //TODO : کد اعتبار سنجی از نتیجه حذف شود
      res.status(201).json({
        status: "success",
        username,
        verify_code: verifiyCode,
      });
    } catch (err) {
      console.log(err);
      const error = new HttpError(Errors.Signing_Up_Faild, req.language);
      return next(error);
    }
  };

  signUpConfirm = async (req, res, next) => {
    try {
      let { username, verify_code } = req.body;
      let query = getQueryOfUsername(username); //{email: a@gmail.com} or {phone:09123456789}
      let createdToken = await Token.findOne({
        $and: [query, { verify_code }, { is_used: false }],
      });
      if (!createdToken) {
        let error = new HttpError(Errors.Invalid_Verify_Code, req.language);
        return next(error);
      }
      if (createdToken.expire_date < Date()) {
        let error = new HttpError(Errors.Expiration_Verify_Code, req.language);
        return next(error);
      }
      let createdUser;
      let user = new User({
        display_name: createdToken.display_name,
        email: createdToken.email,
        phone: createdToken.phone,
        password: createdToken.password,
        rolls: ["visitor"],
      });
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        // ایجاد یوزر جدید
        await user.save({ session });
        //توکن استفاده شده است
        createdToken.is_used = true;
        createdToken.password = "-1";
        createdUser = await createdToken.save({ session });
        await session.commitTransaction();
        session.endSession();
        let token = jwt.sign(
          { username, user_id: createdUser._id, rolls: createdUser.rolls },
          config.JWT,
          { expiresIn: stVars.EXPIRE_TIME_JWT_TOKEN }
        );
        await redisController.hset("tokens", createdUser._id, token);
        res.status(201).json({
          status: "success",
          user_id: createdUser._id,
          username,
          token,
        });
      } catch (err) {
        await session.abortTransaction();
        session.endSession();
        let error = new HttpError(Errors.Something_Went_Wrong, req.language);
        return next(error);
      }
    } catch (err) {
      console.log(err);
      const error = new HttpError(Errors.Something_Went_Wrong, req.language);
      return next(error);
    }
  };
  login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      let query = getQueryOfUsername(username); //{email: a@gmail.com} or {phone:09123456789}
      let existingUser;
      existingUser = await userController.getUserByQuery(query);
      if (!existingUser) {
        const error = new HttpError(Errors.Invalid_Username, req.language);
        return next(error);
      }
      //دریافت تعداد دفعات پسورد اشتباه وارد شده
      let countIncorrectPassword = await redisController.get(
        "password",
        existingUser._id
      );
      //چند بار پسورد اشتباه وارد شده است
      if (countIncorrectPassword > stVars.COUNT_BLOCKED_INCORRECT_PASSWORD) {
        const error = new HttpError(Errors.Account_Is_Disabled, req.language);
        return next(error);
      }

      let isValidPassword = false;
      try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
      } catch (err) {
        const error = new HttpError(Errors.Check_Credentials, req.language);
        return next(error);
      }
      if (!isValidPassword) {
        //افزودن تعداد دفعات پسورد اشتباه وارد شده
        await redisController.incr("password", existingUser._id);
        //وارد کردن اکسپایر تایم برای کلید
        redisController.setExpireTime(
          "password",
          existingUser._id,
          stVars.TIME_BLOCKED_INCORRECT_PASSWORD
        );
        let error;
        if (countIncorrectPassword == stVars.COUNT_BLOCKED_INCORRECT_PASSWORD)
          error = new HttpError(Errors.Account_Is_Disabled, req.language);
        else error = new HttpError(Errors.Invalid_Credentials, req.language);
        return next(error);
      }

      await redisController.delete("password", existingUser._id);
      let token;
      try {
        token = jwt.sign(
          {
            user_id: existingUser._id,
            rolls: existingUser.rolls,
          },
          config.JWT,
          { expiresIn: stVars.EXPIRE_TIME_JWT_TOKEN }
        );
      } catch (err) {
        const error = new HttpError(Errors.Loggin_Failed, req.language);
        return next(error);
      }

      try {
        await redisController.hset("tokens", existingUser._id, token);
        //redisController.setExpireTime("tokens", existingUser._id);
      } catch (err) {
        const error = new HttpError(Errors.Loggin_Failed, req.language);
        return next(error);
      }
      res.json({
        status: "success",
        userId: existingUser.id,
        token: token,
      });
    } catch (err) {
      console.log(err);
      const error = new HttpError(Errors.Something_Went_Wrong, req.language);
      return next(error);
    }
  };

  logout = async (req, res, next) => {
    try {
      let { user_id } = req.userData;
      let token = req.headers.authorization.split(" ")[1];
      await redisController.hdelete("tokens", user_id, token);
      res.status(201).json({ status: "success" });
    } catch (err) {
      console.log(err);
      const error = new HttpError(Errors.Something_Went_Wrong, req.language);
      return next(error);
    }

    // .json({ userId: createdUser.id, email: createdUser.email, token: token });
  };
  logoutAll = async (req, res, next) => {
    try {
      let { user_id } = req.userData;
      await redisController.delete("tokens", user_id);
      res.status(201).json({ status: "success" });
    } catch (err) {
      console.log(err);
      const error = new HttpError(Errors.Something_Went_Wrong, req.language);
      return next(error);
    }
  };
  forgetPassword = async (req, res, next) => {
    try {
      const { username } = req.body;
      let query = getQueryOfUsername(username); //{email: a@gmail.com} or {phone:09123456789}
      let existingUser;
      existingUser = await userController.getUserByQuery(query);
      if (!existingUser) {
        const error = new HttpError(Errors.Invalid_Username, req.language);
        return next(error);
      }
      // از آپسرت استفاده میکنیم تا اخرین وری فای کد فقط معتبر باشد
      let verifiyCode = getVerifyCode();
      await Token.findOneAndUpdate(
        query,
        {
          ...query,
          display_name,
          password: "-1",
          verify_code: verifiyCode,
          ip: req.ip,
          is_used: false,
          expire_date: Date.now() + stVars.EXPIRE_TIME_EMAIL_TOKEN,
        },
        { new: true, upsert: true }
      );
      //TODO : ارسال ایمیل از حالت کامنت خارج شود
      //ارسال ایمیل
      // if (typeOfUsername == "email") await sendEmail(email, verifiyCode);
      // //ارسال پیامک
      // else if (typeOfUsername == "phone") await sendSms(email, verifiyCode);
      //TODO : کد اعتبار سنجی از نتیجه حذف شود
      res.status(201).json({
        status: "success",
        username,
        verify_code: verifiyCode,
      });
    } catch (err) {
      console.log(err);
      const error = new HttpError(Errors.Something_Went_Wrong, req.language);
      return next(error);
    }
  };
  resetPassword = async (req, res, next) => {
    let { national_code } = req.body;
    console.log("signUpCode");
  };
}

module.exports = new authControllers();
