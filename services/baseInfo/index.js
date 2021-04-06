const express = require("express");
const router = express.Router();
const officeRouters = require("./office/routes");
const provinceRouters = require("./province/routes");
const cityRouters = require("./city/routes");
const countryRouters = require("./country/routes");

router.use("/office", officeRouters);
router.use("/province", provinceRouters);
router.use("/city", cityRouters);
router.use("/country", countryRouters);

module.exports = router;
