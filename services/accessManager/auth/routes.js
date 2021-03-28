const express = require("express");
const router = express.Router();
const authControllers = require("./controller");
const { validator } = require("../../../middleware/joi-validator");
const checkAuth = require("../../../middleware/check-auth");
const authSchema = require("./schema");

router.post(
  "/signup/confirm",
  validator(authSchema.signup_confirm, "body"),
  authControllers.signUpConfirm
);
router.post(
  "/signup",
  validator(authSchema.signup, "body"),
  authControllers.signup
);
// singup
router.post(
  "/login",
  validator(authSchema.login, "body"),
  authControllers.login
);
router.get("/logout", checkAuth, authControllers.logout);
router.get("/logout-all", checkAuth, authControllers.logoutAll); // خروج از همه دستگاه ها

router.post(
  "/password/forget/confirm",
  validator(authSchema.forget_password_confirm, "body"),
  authControllers.forgetPasswordConfirm
);
router.post(
  "/password/forget/reset",
  validator(authSchema.forget_password_reset, "body"),
  authControllers.forgetPasswordReset
);
router.post(
  "/password/forget",
  validator(authSchema.forget_password, "body"),
  authControllers.forgetPassword
);
router.post(
  "/password/reset",
  checkAuth,
  validator(authSchema.reset_password),
  authControllers.resetPassword
);

module.exports = router;
