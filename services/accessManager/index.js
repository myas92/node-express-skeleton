const express = require("express");
const router = express.Router();
const authRouters = require("./auth/routes");
const roleRouters = require("./role/routes");
const usersRouters = require("./user/routes");


router.use("/auth", authRouters);
router.use("/users", usersRouters);
// router.use("/test", testRouters);


module.exports = router;
