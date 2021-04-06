const HttpError = require("../../../util/http-error");
const mongoose = require("mongoose");
const City = require("./model");
const Province = require("../province/model");
const Errors = require("../../../const/errors");
const getALLCities = async (req, res, next) => {
  try {
    const error = new HttpError(Errors.API_Is_Not_Implemented, req.language);
    return next(error);
  } catch (err) {
    console.log(err);
    const error = new HttpError(Errors.Something_Went_Wrong, req.language);
    return next(error);
  }
};
const getCityById = async (req, res, next) => {};

const createCity = async (req, res, next) => {
  try {
    let { province_id, city_name } = req.body;
    let identifiedProvince = await Province.findOne({
      _id: province_id,
      is_deleted: false,
    });
    if (!identifiedProvince) {
      const error = new HttpError(Errors.Item_Is_Not_Founded);
      return next(error);
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      let city = new City({
        name: city_name,
        province: province_id,
      });
      let createdCity = await city.save({ session });
      identifiedProvince.cities.push(createdCity);
      await identifiedProvince.save({ session });
      await session.commitTransaction();
      session.endSession();
      res.status(201).json({
        status: "success",
        result: [
          {
            id: createdCity._id,
            city_name: createdCity.name,
          },
        ],
      });
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      const error = new HttpError(Errors.Transaction_Query_Faild, req.language);
      return next(error);
    }
  } catch (err) {
    console.log(err);
    const error = new HttpError(Errors.Something_Went_Wrong, req.language);
    return next(error);
  }
};

const updateCity = async (req, res, next) => {
  console.log("City-updateCity");
};
const deleteCity = async (req, res, next) => {
  console.log("City-deleteCity");
};

exports.getALLCities = getALLCities;
exports.getCityById = getCityById;
exports.createCity = createCity;
exports.updateCity = updateCity;
exports.deleteCity = deleteCity;
