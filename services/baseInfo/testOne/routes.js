const express = require("express");
const testOneSchema = require("./schema");
const testOnesController = require("./controller");
const { validator } = require("../../../middleware/joi-validator");
const checkAccess = require("../../../middleware/check-acess");
const checkAuth = require("../../../middleware/check-auth");

const router = express.Router();

router.get("/", testOnesController.getALLTestOnes);

router.get("/:id", testOnesController.getTestOneById);

router.post("/", testOnesController.createTestOne);

router.patch("/:id", testOnesController.updateTestOne);

router.delete("/:id", testOnesController.deleteTestOne);

module.exports = router;
