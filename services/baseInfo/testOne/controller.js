const HttpError = require("../../../util/http-error");
const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const gerCoordsForAddress = require("../../../util/location");
const TestOne = require("./model");

const getALLTestOnes = async (req, res, next) => {
  console.log("testOne-getALLTestOnes");
};
const getTestOneById = async (req, res, next) => {
  console.log("testOne-getTestOneById");
};

const createTestOne = async (req, res, next) => {
  console.log("testOne-createTestOne");
};

const updateTestOne = async (req, res, next) => {
  console.log("testOne-updateTestOne");
};
const deleteTestOne = async (req, res, next) => {
  console.log("testOne-deleteTestOne");
};

exports.getALLTestOnes = getALLTestOnes;
exports.getTestOneById = getTestOneById;
exports.createTestOne = createTestOne;
exports.updateTestOne = updateTestOne;
exports.deleteTestOne = deleteTestOne;
