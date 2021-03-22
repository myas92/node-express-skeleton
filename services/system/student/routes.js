const express = require("express");
const studentsController = require("./controller");
const { validator } = require("../../../middleware/joi-validator");
const checkAccess = require("../../../middleware/check-acess");
const checkAuth = require("../../../middleware/check-auth");

const router = express.Router();


router.get("/message", studentsController.getAllMessages);
router.get("/", studentsController.getALLStudents);

router.get("/:id", studentsController.getStudentById);

router.post("/", studentsController.createStudent);

router.patch("/:id", studentsController.updateStudent);

router.delete("/:id", studentsController.deleteStudent);
router.put("/",async(req, res, next)=>{
    let {Season, Week} = req.body
    console.log(req.body)
});
module.exports = router;
