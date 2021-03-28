const express = require("express");
const router = express.Router();
const authControllers = require("./controller");
const { validator } = require("../../../middleware/joi-validator");
const authSchema = require("./schema");
const fileUpload = require("../../../middleware/file-upload");
const checkAuth = require("../../../middleware/check-auth");
const checkAccess = require("../../../middleware/check-acess");
router.get("/:id/comment/:pid", checkAuth, checkAccess, authControllers.getUser);
router.get("/:id", checkAuth, checkAccess, authControllers.getUser);
router.get("/", checkAuth, checkAccess, authControllers.getAllUsers);
router.put(
  "/:id",
  validator(authSchema.update_user, "body"),
  authControllers.updateUser
);
router.delete(
  "/:id",
  validator(authSchema.delete_user, "body"),
  authControllers.deleteUser
);
module.exports = router;
