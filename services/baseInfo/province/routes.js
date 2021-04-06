const express = require("express");
const Provincechema = require("./schema");
const provinceController = require("./controller");
const { validator } = require("../../../middleware/joi-validator");
const checkAccess = require("../../../middleware/check-acess");
const checkAuth = require("../../../middleware/check-auth");

const router = express.Router();

router.get("/", provinceController.getALLProvinces);

router.get("/:id", provinceController.getProvinceById);

router.post("/", provinceController.createProvince);

router.put("/:id", provinceController.updateProvince);

router.delete("/:id", provinceController.deleteProvince);

module.exports = router;
