const HttpError = require("../../../util/http-error");
const mongoose = require("mongoose");
const Errors = require("../../../const/errors");
const Province = require("./model");
const Country = require("../country/model");
const City = require("../city/model");

const getALLProvinces = async (req, res, next) => {
  try {
    const error = new HttpError(Errors.API_Is_Not_Implemented , req.language);
    return next(error)
  } catch (err) {
    console.log(err);
    const error = new HttpError(Errors.Something_Went_Wrong, req.language);
    return next(error);
  }
};
const getProvinceById = async (req, res, next) => {
  try {
    let { id } = req.params;
    let provinceFounded = await Province.findOne(
      { _id: id, is_deleted: false },
      "name"
    ).populate("cities", "name");
    if (!provinceFounded) {
      let error = new HttpError(Errors.Item_Is_Not_Founded, req.language);
      return next(error);
    }
    res.status(201).json({
      status: "success",
      result: [
        provinceFounded
      ],
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError(Errors.Something_Went_Wrong, req.language);
    return next(error);
  }
};

const createProvince = async (req, res, next) => {
  try {
    let { country_id, province_name } = req.body;
    let identifiedCountry = await Country.findOne({
      _id: country_id,
      is_deleted: false,
    });
    if (!identifiedCountry) {
      const error = new HttpError(Errors.Item_Is_Not_Founded);
      return next(error);
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      let province = new Province({
        name: province_name,
        country: country_id,
      });
      let createdProvince = await province.save({ session });
      identifiedCountry.provinces.push(createdProvince);
      await identifiedCountry.save({ session });
      await session.commitTransaction();
      session.endSession();
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      const error = new HttpError(Errors.Transaction_Query_Faild, req.language);
      return next(error);
    }
    res.status(201).json({
      status: "success",
      result: [
        {
          id: createdProvince._id,
          province_name: createdProvince.name,
        },
      ],
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError(Errors.Something_Went_Wrong, req.language);
    return next(error);
  }
};

const updateProvince = async (req, res, next) => {
  const error = new HttpError(Errors.API_Is_Not_Implemented , req.language);
  return next(error)
};
const deleteProvince = async (req, res, next) => {
  const error = new HttpError(Errors.API_Is_Not_Implemented , req.language);
  return next(error)
};

exports.getALLProvinces = getALLProvinces;
exports.getProvinceById = getProvinceById;
exports.createProvince = createProvince;
exports.updateProvince = updateProvince;
exports.deleteProvince = deleteProvince;
