const HttpError = require("../../../util/http-error");
const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const gerCoordsForAddress = require("../../../util/location");
const Test = require("./model");

const getALLTests = async (req, res, next) => {
  console.log("getALLTests");
};
const getTestById = async (req, res, next) => {
  console.log("getTestById");
};

const createTest = async (req, res, next) => {
  console.log("createTest");
};

const updateTest = async (req, res, next) => {
  console.log("updateTest");
};
const deleteTest = async (req, res, next) => {
  console.log("deleteTest");
};

exports.getALLTests = getALLTests;
exports.getTestById = getTestById;
exports.createTest = createTest;
exports.updateTest = updateTest;
exports.deleteTest = deleteTest;
