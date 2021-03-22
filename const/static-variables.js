module.exports = {
  EXPIRE_TIME_EMAIL_TOKEN: 24 * 60 * 60 * 1000, // یک روز
  EXPIRE_TIME_PHONE_TOKEN: 10 * 60 * 1000, // ده دقیقه
  DEFAULT_LANGUGE: "EN",
  EXPIRE_TIME_JWT_TOKEN: "365 days",
  EXPIRE_TIME_REDIS_TOKEN: 365 * 24 * 60 * 60,
  MIN_LENGTH_VERIFY_CODE: 10000,
  MAX_LENGTH_VERIFY_CODE: 99999,
  COUNT_BLOCKED_INCORRECT_PASSWORD: '2',// سه بار می تواند پسورد را اشتباه وارد کند
  TIME_BLOCKED_INCORRECT_PASSWORD: 1 * 60 * 60,// در یک ساعت سه بار می تواند پسورد را اشتباه وارد کند
};
