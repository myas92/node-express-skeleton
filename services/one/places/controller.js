const HttpError = require("../../../util/http-error");
const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const gerCoordsForAddress = require("../../../util/location");
const Place = require("./model");
const User = require("../users/model");
const { getUsers } = require("../users/controller");
let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    address: "بانک شهر",
    location: {
      lat: 36.3073889,
      lng: 59.5959445,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "yaser building",
    description: "One of the most famous sky scrapers in Iran!",
    address: "بانک صادرات",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

const getPlaceByPlaceId = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place = await Place.findById(placeId).map((place) =>
      place.toObject({ getters: true })
    );
  } catch (err) {
    const error = new HttpError(
      `something went wrong, could not find a place beacuse: ${err.message}`,
      500
    );
    return next(error);
  }
  // const place = DUMMY_PLACES.find(({ id }) => id == placeId); // پیدا کردن از آرایه بصورت استاتیک

  if (!place) {
    // const error = new Error("could not find a place for the provided id ");
    // error.code = 404;
    // throw error;
    const error = new HttpError(
      "could not find a place for the provided id",
      404
    );
    return next(error);
  }
  res.json({ place: place }); // داشتن آی دی بدون آندرلاین
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  // let places;
  let userWhitPlaces;
  try {
    // places = await Place.find({ creator: userId });
    userWhitPlaces = await User.findById(userId).populate("places");
  } catch (err) {
    const error = new HttpError(
      `could not find places,please try again later :${err.message}`,
      500
    ); // خطای سرور
    return next(error);
  }
  // const places = DUMMY_PLACES.filter(({ creator }) => creator === userId);
  if (!userWhitPlaces || userWhitPlaces.places.length === 0) {
    // const error = new Error("could not find a place for the provided user id ");
    // error.code = 404;
    // // throw error;
    // return next(error);
    const error = new HttpError(
      "could not find a places for the provided user id",
      404
    );
    return next(error);
  }
  res.json({ places: userWhitPlaces.places.toObject({ getters: true }) });
};

const createPlace = async (req, res, next) => {
  const { title, description, address } = req.body;
  let coordinates;
  try {
    coordinates = await gerCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    creator : req.userData.userId
  });
  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError("creating place failed, please try again", 500);
    return next(error);
  }
  if (!user) {
    const error = new HttpError("could not find user for provided id", 404);
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdPlace.save({ session: sess });
    user.places.push(createdPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
    // await createdPlace.save();
    // user.places.push(createdPlace);
    // await user.save();
  } catch (err) {
    const error = new HttpError(
      `creating place failed because ${err.message}`,
      500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  const { title, description } = req.body;
  // let updatedPlace = {} // روش خودم بود برای آپدیت کردن
  // updatedDummyplaces = DUMMY_PLACES.map((p) => {
  //   if (p.id === placeId) {
  //     p.title = title;
  //     p.description = description;
  //     updatedPlace = p;
  //   }
  //   return p;
  // });

  // const updatedPlace = { ...DUMMY_PLACES.find(({ id }) => id === placeId) };
  // const placeIndex = DUMMY_PLACES.findIndex(({ id }) => id === placeId);
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not update place",
      500
    );
    return next(error);
  }
  if (place.creator.toString() !== req.userData.userId) {
    const error = new HttpError('You are not allowed to edit this place.', 401);
    return next(error);
  }
  try {
    place.title = title;
    place.description = description;
    await place.save();
  } catch (err) {
    const error = new HttpError(
      "something went wrong could not upldate place",
      500
    );
    return next(error);
  }

  res.status(200).json({ place: place.toObject({ getters: true }) });
};
const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  // DUMMY_PLACES = DUMMY_PLACES.filter(({ id }) => id !== placeId);
  let place;
  try {
    place = await Place.findById(placeId).populate("creator");

    console.log({ place });
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not delete place",
      500
    );
    return next(error);
  }
  if (!place) {
    const error = new HttpError('Could not find place for this id.', 404);
    return next(error);
  }
  if (place.creator.id !== req.userData.userId) {
    const error = new HttpError(
      'You are not allowed to delete this place.',
      401
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.remove({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
    // await place.remove();
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not delete place",
      500
    );
    return next(error);
  }
  res.status(200).json({ message: "Delated Place" });
};

exports.getPlaceByPlaceId = getPlaceByPlaceId;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
