const express = require("express");
const teachersController = require("./controller");
const { validator } = require("../../../middleware/joi-validator");
const checkAccess = require("../../../middleware/check-acess");
const checkAuth = require("../../../middleware/check-auth");


const router = express.Router();

router.get("/", teachersController.getALLTeachers);

router.get("/:id", teachersController.getTeacherById);

router.post("/", teachersController.createTeacher);

router.patch("/:id", teachersController.updateTeacher);

router.delete("/:id", teachersController.deleteTeacher);

module.exports = router;
