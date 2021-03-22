const express = require("express");
const testSchema = require("./schema");
const testsController = require("./controller");
const { validator } = require("../../../middleware/joi-validator");
const checkAccess = require("../../../middleware/check-acess");
const checkAuth = require("../../../middleware/check-auth");

const router = express.Router();

router.get("/", testsController.getALLTests);

router.get("/:id", testsController.getTestById);

router.post("/", testsController.createTest);

router.patch("/:id", testsController.updateTest);

router.delete("/:id", testsController.deleteTest);

module.exports = router;
