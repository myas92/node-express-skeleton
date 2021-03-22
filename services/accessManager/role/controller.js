const HttpError = require("../../../util/http-error");
const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const gerCoordsForAddress = require("../../../util/location");
const Role = require("./model");

const getALLRoles = async (req, res, next) => {
  console.log("getALLRoles");
  res.status(200).json({ message: "getALLRoles" });
};
const getRoleById = async (req, res, next) => {
  console.log("getRoleById");
  res.status(200).json({ message: "getRoleById" });
};

const createRole = async (req, res, next) => {
  console.log("createRole");
  res.status(200).json({ message: "createRole" });

};

const updateRole = async (req, res, next) => {
  console.log("updateRole");
  res.status(200).json({ message: "updateRole" });

};
const deleteRole = async (req, res, next) => {
  console.log("deleteRole");
  res.status(200).json({ message: "deleteRole" });

};

exports.getALLRoles = getALLRoles;
exports.getRoleById = getRoleById;
exports.createRole = createRole;
exports.updateRole = updateRole;
exports.deleteRole = deleteRole;
