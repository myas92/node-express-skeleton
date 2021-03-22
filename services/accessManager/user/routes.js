const express = require("express");
const router = express.Router();
const authControllers = require("./controller");
const { validator } = require("../../../middleware/joi-validator");
const authSchema = require("./schema");
const fileUpload = require("../../../middleware/file-upload");

router.post(
  "/signup-email",
  validator(authSchema.signup_email, "body"),
  authControllers.signupEmail
);
router.post("/signup-phone", authControllers.signUpPhone);
router.post("/signup-code", authControllers.signUpCode);

// singup
router.post(
  "/signup-finish-email",
  validator(authSchema.signup_email, "body"),
  authControllers.signUpEmail
);
router.post("/signup-finish-phone", authControllers.signUpPhone);
router.post("/signup-finish-code", authControllers.signUpCode);
// router.post("/login", authControllers.login);
// router.post("/logout", authControllers.login);

module.exports = router;
