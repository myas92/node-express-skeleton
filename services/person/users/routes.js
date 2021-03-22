const express = require("express");
const router = express.Router();
const usersControllers = require("./controller");
const fileUpload = require('../../../middleware/file-upload');

router.get("/", usersControllers.getUsers);
router.post("/signup", fileUpload.single('image'), usersControllers.signUp);
router.post("/login", usersControllers.login);



module.exports = router;
