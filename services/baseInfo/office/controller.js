const HttpError = require("../../../util/http-error");
const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const Office = require("./model");

const getALLOffices = async (req, res, next) => {
  console.log("Office-getALLOffices");
};
const getOfficeById = async (req, res, next) => {
  console.log("Office-getOfficeById");
};

const createOffice = async (req, res, next) => {
  console.log("Office-createOffice");
};

const updateOffice = async (req, res, next) => {
  console.log("Office-updateOffice");
};
const deleteOffice = async (req, res, next) => {
  console.log("Office-deleteOffice");
};

exports.getALLOffices = getALLOffices;
exports.getOfficeById = getOfficeById;
exports.createOffice = createOffice;
exports.updateOffice = updateOffice;
exports.deleteOffice = deleteOffice;
