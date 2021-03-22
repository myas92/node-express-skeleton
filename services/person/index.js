const express = require("express");
const router = express.Router();
const userRouters = require("./users/routes");
const palceRouters = require("./places/routes");

router.use("/user", userRouters);
router.use("/place", palceRouters);


module.exports = router;
