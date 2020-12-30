const admin = ["GET:/api/one/users", "GET:/api/one/places"];
const operator = ["GET:/api/one/users"];

const { isValidObjectId } = require("mongoose");
const HttpError = require("../util/http-error");

module.exports = (req, res, next) => {
  try {
    let roll = req.userData.roll;
    let baseUrl = req.baseUrl;
    let method = req.method;
    let isValid;
    if (roll === "admin") {
      isValid = admin.includes(method+":"+baseUrl);
    }
    if (roll === "operator") {
      isValid = operator.includes(baseUrl);
    }
    if (!isValid) {
      const error = new HttpError("could not access to this api", 403);
      return next(error);
    }
    next();
  } catch (err) {
    const error = new HttpError("somthing went wrong", 403);
    return next(error);
  }
};
