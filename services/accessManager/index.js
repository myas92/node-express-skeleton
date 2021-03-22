const express = require("express");
const router = express.Router();
const authRouters = require("./auth/routes");
const roleRouters = require("./role/routes");
const testRouters = require("./test/routes");


router.use("/auth", authRouters);
// router.use("/role", roleRouters);
// router.use("/test", testRouters);


module.exports = router;
