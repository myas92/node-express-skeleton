const staticVars = require("../const/static-variables");
const { emailPattern, phonePattern } = require("../const/regex-pattern");
const getVerifyCode = (
  min = staticVars.MIN_LENGTH_VERIFY_CODE,
  max = staticVars.MAX_LENGTH_VERIFY_CODE
) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getQueryOfUsername = (username) => {
  let query;
  if (emailPattern.test(username)) {
    query = { email: username };
  } else if (phonePattern.test(username)) {
    query = { phone: username };
  }
  return query;
};

exports.getVerifyCode = getVerifyCode;
exports.getQueryOfUsername = getQueryOfUsername;
