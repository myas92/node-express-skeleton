const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const config = require("../config.js");
const HtppError = require("./http-error");
const sendEmail = async (authEmail,verifyCode) => {
  const domain = config.DOMAIN;
  const mailServer = config.MAIL_SERVER;
  const mailPort = config.MAIL_PORT;
  const outboxEmailAddress = config.EMAIL;
  const emailPassword = config.EMMAIL_PASSWORD;

  var transporter = nodemailer.createTransport({
    host: mailServer,
    port: mailPort,
    secure: true, // true for 465, false for other ports
    auth: {
      user: outboxEmailAddress,
      pass: emailPassword,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  var handlebarsOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve(__dirname, "../templates"),
      layoutsDir: path.resolve(__dirname, "../templates"),
      defaultLayout: "publicEmail.handlebars",
    },
    //viewEngine: 'handlebars',
    viewPath: path.resolve(__dirname, "../templates"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarsOptions));

  //const logo = `https://api.nilootech.com/public/publicEmail_files/logo.png`;

  var mailOptions = {
    from: outboxEmailAddress, // ایمیل مبدا
    to: authEmail, // ایمیل مقصد
    bcc: "batis63@yahoo.com",
    template: "publicEmail",
    subject: "کد تایید روال گرد",
    context: {
      // url: `${domain}/verfiysignup?token=${token}`,// برای ارسال لینک توکن
      title: `Code : ${verifyCode}`,
      //   logo, لوگوی ستین
      //description: "به سایت ما خوش آمدید",
    },
    // attachments: [
    //   {
    //     filename: "image.png",
    //     path: path.resolve(__dirname, "../templates/image.png"),
    //   },
    // ],
  };
  try {
    let result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    throw error;
  }
};

exports.sendEmail = sendEmail;
