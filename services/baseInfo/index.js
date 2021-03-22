const express = require("express");
const router = express.Router();
const testOneRouters = require("./testOne/routes");

router.use("/testOne", testOneRouters);

module.exports = router;
