const express = require("express");
const router = express.Router();
const studentRouters = require("./student/routes");
const teacherRouters = require("./teacher/routes");
const messageRouters = require("./message/routes");

router.use("/student", studentRouters);
router.use("/teacher", teacherRouters);
router.use("/message", messageRouters);


module.exports = router;
