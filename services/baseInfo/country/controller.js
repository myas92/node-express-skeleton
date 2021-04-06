const HttpError = require("../../../util/http-error");
const Country = require("./model");
const Errors = require("../../../const/errors");

const getALLCountries = async (req, res, next) => {
  try {
    let countiesFounded = await Country.find(
      {
        is_deleted: false,
      },
      "name"
    );
    res.status(201).json({
      status: "success",
      result: countiesFounded,
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError(Errors.Something_Went_Wrong, req.language);
    return next(error);
  }
};
const getCountryById = async (req, res, next) => {
  try {
    let { id } = req.params;
    let countryFounded = await Country.findOne(
      { _id: id, is_deleted: false },
      "name"
    ).populate("provinces", "name");
    if (!countryFounded) {
      let error = new HttpError(Errors.Item_Is_Not_Founded, req.language);
      return next(error);
    }
    res.status(201).json({
      status: "success",
      result: [
        countryFounded
      ],
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError(Errors.Something_Went_Wrong, req.language);
    return next(error);
  }
};

const createCountry = async (req, res, next) => {
  try {
    let { name } = req.body;
    let createdCountry = await Country.create({
      name,
    });
    res.status(201).json({
      status: "success",
      result: [
        {
          id: createdCountry._id,
          name: createdCountry.name,
        },
      ],
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError(Errors.Something_Went_Wrong, req.language);
    return next(error);
  }
};

const updateCountry = async (req, res, next) => {
  try {
    let { id } = req.params;
    let { name } = req.body;
    let countryFounded = await Country.findOne({ _id: id, is_deleted: false });
    if (!countryFounded) {
      let error = new HttpError(Errors.Item_Is_Not_Founded, req.language);
      return next(error);
    }
    countryFounded.name = name;
    await countryFounded.save();
    res.status(201).json({
      status: "success",
      result: [
        {
          id: id,
          name: name,
        },
      ],
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError(Errors.Something_Went_Wrong, req.language);
    return next(error);
  }
};
const deleteCountry = async (req, res, next) => {
  try {
    let { id } = req.params;
    let countryFounded = await Country.findOne({ _id: id, is_deleted: false });
    if (!countryFounded) {
      let error = new HttpError(Errors.Item_Is_Not_Founded, req.language);
      return next(error);
    }
    countryFounded.is_deleted = true;
    await countryFounded.save();
    res.status(201).json({
      status: "success",
      result: [
        {
          id: id,
          name: countryFounded.name,
        },
      ],
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError(Errors.Something_Went_Wrong, req.language);
    return next(error);
  }
};

exports.getALLCountries = getALLCountries;
exports.getCountryById = getCountryById;
exports.createCountry = createCountry;
exports.updateCountry = updateCountry;
exports.deleteCountry = deleteCountry;
