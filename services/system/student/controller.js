const HttpError = require("../../../util/http-error");
const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const gerCoordsForAddress = require("../../../util/location");
const Student = require("./model");
const Teacher = require("../teacher/model");

const getALLStudents = async (req, res, next) => {
  console.log("getALLStudents");
};
const getStudentById = async (req, res, next) => {
  console.log("getStudentById");
};

const createStudent = async (req, res, next) => {
  let { name } = req.body;
  let user = await Student.findById("5ffe214c88bc255ca4ad65a0")
  user.categories[0].products.push("5ffe1fba94c6c65120e69f59");
  await user.save()
  // let user = new Student({
  //   name: name,
  //   categories: [
  //     {
  //       name: "trasnak2",
  //       products : ["5ffe1fba94c6c65120e69f59"]
  //     },
  //   ],
  // });
  // await user.save();
  res.status(200).json({ user });
};

const updateStudent = async (req, res, next) => {
  console.log("updateStudent");
};
const deleteStudent = async (req, res, next) => {
  console.log("deleteStudent");
};
const getAllMessages = async (req, res, next) => {
  let { sid } = req.params;
  // let messages = await Student.findById(sid);
  let result = await Student.findById("5ffe214c88bc255ca4ad65a0").populate({ path: 'categories.products' }).lean();

  // let resUser = await Model_User.find({"id_user": {"$in": resUserMap}})
  // let { messages } = await Student.findById(sid).select("messages");
  // let resMsgMap = messages.map((msg) => {
  //   return msg.receiver;
  // });

  // let resUser = await Teacher.find({ _id: { $in: resMsgMap } }).select("name");
  console.log({ result });
  //TODO : check the student id and teacher id are correct;

  res.status(200).json(result);
};

exports.getALLStudents = getALLStudents;
exports.getStudentById = getStudentById;
exports.createStudent = createStudent;
exports.updateStudent = updateStudent;
exports.deleteStudent = deleteStudent;
exports.getAllMessages = getAllMessages;
