const express = require("express");
const faker = require("faker/locale/fa");
const placeSchema = require("../schema/place-schema");
const placesController = require("../controller/places-controller");
const {validatorMiddleware} = require("../../../../middleware/joi-validator");
const checkAuth = require('../../../../middleware/check-auth');

const router = express.Router();

router.get("/:pid", placesController.getPlaceByPlaceId);

router.get("/user/:uid", placesController.getPlacesByUserId);

router.use(checkAuth);
router.post(
  "/",
  validatorMiddleware(placeSchema.place, "body"),
  placesController.createPlace
);

router.patch("/:pid", placesController.updatePlace);

router.delete("/:pid", placesController.deletePlace);

module.exports = router;
