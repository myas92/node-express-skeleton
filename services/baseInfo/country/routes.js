const express = require("express");
const countrySchema = require("./schema");
const countryController = require("./controller");
const { validator } = require("../../../middleware/joi-validator");
const checkAuth = require("../../../middleware/check-auth");
const checkAccess = require("../../../middleware/check-acess");

const router = express.Router();

router.get("/", countryController.getALLCountries);

router.get("/:id", countryController.getCountryById);

router.post(
  "/",
  validator(countrySchema.country, "body"),
  checkAuth,
  checkAccess,
  countryController.createCountry
);

router.put(
  "/:id",
  validator(countrySchema.country, "body"),
  checkAuth,
  checkAccess,
  countryController.updateCountry
);

router.delete(
  "/:id",
  validator(countrySchema.country_id, "params"),
  checkAuth,
  checkAccess,
  countryController.deleteCountry
);

module.exports = router;
