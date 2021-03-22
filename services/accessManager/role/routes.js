const express = require("express");
const roleSchema = require("./schema");
const rolesController = require("./controller");
const { validator } = require("../../../middleware/joi-validator");
const checkAccess = require("../../../middleware/check-acess");
const checkAuth = require("../../../middleware/check-auth");

const router = express.Router();

router.get("/", rolesController.getALLRoles);

router.get("/:id", rolesController.getRoleById);

router.post("/", rolesController.createRole);

router.patch("/:id", rolesController.updateRole);

router.delete("/:id", rolesController.deleteRole);

module.exports = router;
