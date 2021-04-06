const express = require("express");
const testOneSchema = require("./schema");
const officeController = require("./controller");
const { validator } = require("../../../middleware/joi-validator");
const checkAccess = require("../../../middleware/check-acess");
const checkAuth = require("../../../middleware/check-auth");

const router = express.Router();

router.get("/", officeController.getALLOffices);

router.get("/:id", officeController.getOfficeById);

router.post("/", officeController.createOffice);

router.put("/:id", officeController.updateOffice);

router.delete("/:id", officeController.deleteOffice);

module.exports = router;
