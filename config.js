// config.js
const dotenv = require("dotenv");
const path = require("path");
// // resolve the .env file
dotenv.config({
  // path: path.resolve(__dirname, process.env.NODE_ENV  + '.env') // resolve .env based on envirement
  path: path.resolve(__dirname, ".env"),
});
module.exports = {
  NODE_ENV: process.env.NODE_ENV || "Development",
  HOST: process.env.HOST || "127.0.0.1",
  PORT: process.env.PORT || 3000,
  MONGO_DB_NAME: process.env.MONGO_DB_NAME || "revaal",
  MONGO_DB_URL: process.env.MONGO_DB_URL || "mongodb://127.0.0.1",
  REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
  REDIS_DB: process.env.REDIS_DB || "1",
  EMAIL: process.env.EMAIL || "",
  EMMAIL_PASSWORD: process.env.EMAIL_PASSWORD || "",
  MAIL_SERVER: process.env.MAIL_SERVER || "",
  MAIL_PORT: process.env.MAIL_PORT || "",
  MY_DOMAIN: process.env.MY_DOMAIN || "",
  JWT: process.env.JWT || "",
  DOMAIN: process.env.DOMAIN || "",
  REDIS_HOST_PUB_SUB: process.env.REDIS_HOST_PUB_SUB || "",
  REDIS_DB_PUB_SUB: process.env.REDIS_DB_PUB_SUB || "",
  PHONE_SYSADMIN: process.env.PHONE_SYSADMIN ,
};
