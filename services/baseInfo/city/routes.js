const express = require("express");
const testOneSchema = require("./schema");
const cityController = require("./controller");
const { validator } = require("../../../middleware/joi-validator");
const checkAccess = require("../../../middleware/check-acess");
const checkAuth = require("../../../middleware/check-auth");

const router = express.Router();

router.get("/", cityController.getALLCities);

router.get("/:id", cityController.getCityById);

router.post("/", cityController.createCity);

router.put("/:id", cityController.updateCity);

router.delete("/:id", cityController.deleteCity);

module.exports = router;
