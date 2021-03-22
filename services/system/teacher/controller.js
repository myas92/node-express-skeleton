const HttpError = require("../../../util/http-error");
const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const gerCoordsForAddress = require("../../../util/location");
const Teacher = require("./model");
const {Validation} = require("./schema");
const getALLTeachers = async (req, res, next) => {


};
const getTeacherById = async (req, res, next) => {
  console.log("getTeacherById");
};

const createTeacher = async (req, res, next) => {
  let x = Validation(req.body);
  console.log(req.body)
  let { name } = req.body;
  let teacher = new Teacher({
    name: name,
  });
  await teacher.save();
  res.status(200).json({ teacher });
};

const updateTeacher = async (req, res, next) => {
  console.log("updateTeacher");n
};
const deleteTeacher = async (req, res, next) => {
  console.log("deleteTeacher");
};

exports.getALLTeachers = getALLTeachers;
exports.getTeacherById = getTeacherById;
exports.createTeacher = createTeacher;
exports.updateTeacher = updateTeacher;
exports.deleteTeacher = deleteTeacher;
