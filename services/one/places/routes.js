const express = require("express");
const faker = require("faker/locale/fa");
const placeSchema = require("./schema");
const placesController = require("./controller");
const {
  validator,
} = require("../../../middleware/joi-validator");
const checkAccess = require("../../../middleware/check-acess");
const checkAuth = require("../../../middleware/check-auth");

const router = express.Router();

router.get("/:pid", placesController.getPlaceByPlaceId);

router.get(
  "/user/:uid",
  validator(placeSchema.userId, "params"),
  checkAuth,
  checkAccess,
  placesController.getPlacesByUserId
);

router.use(checkAuth);
router.post(
  "/",
  validator(placeSchema.place, "body"),
  placesController.createPlace
);

router.patch("/:pid", placesController.updatePlace);

router.delete("/:pid", placesController.deletePlace);

module.exports = router;
