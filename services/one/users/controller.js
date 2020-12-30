const HtppError = require("../../../util/http-error");
const User = require("./model");
const { v4: uuid } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "yaser",
    email: "yaser@test.com",
    password: "123456",
  },
];
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password -__v");
    users = users.map((user) => user.toObject({ getters: true }));
  } catch (err) {
    const error = new HtppError(
      "something went warong, plase try again later",
      500
    );
    return next(error);
  }
  res.status(200).json({ users: users });
  // res.status(200).json({ users: DUMMY_USERS });
};

const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
    const error = new HtppError(
      "Signing Up faild, please try again later",
      500
    );
    return next(error);
  }
  if (existingUser) {
    const error = new HtppError(
      "user exist already, please login insated",
      422
    );
    return next(error);
  }
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }
  let createdUser = new User({
    name,
    email,
    password,
    image: req.file.path,
    password: hashedPassword,
    places: [],
  });
  try {
    await createdUser.save();
  } catch (err) {
    const error = new HtppError(
      "creating user failed, please try again later",
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
  // const createdUser = {};
  // const hasUser = DUMMY_USERS.find((u) => u.email === email);
  // if (hasUser) {
  //   throw new Error("could not creat user, email already exist", 422); //invalid user input
  // }
  // DUMMY_USERS.push(createdUser);
  // res.status(201).json({ user: createdUser.toObject({ getters: true }) }); //The request has been fulfilled, resulting in the creation of a new resource
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  // const identifiedUser = DUMMY_USERS.filter(
  //   (u) => u.email === email && u.password === password
  // );

  // if (!identifiedUser || identifiedUser.length === 0) {
  //   throw new HtppError(
  //     "could not identify user, credentials seem to be wrong",
  //     401
  //   ); // unauthorized
  // }
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
    const error = new HtppError(
      "Signing Up faild, please try again later",
      500
    );
  }
  if (!existingUser) {
    const error = new HtppError(
      "Invalid credentials, could not log you in ",
      401
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
      500
    );
    return next(error);
  }
  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "supersecret_dont_share",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    token: token,
  });

  // res.status(200).json({
  //   message: "Logged in!",
  //   user: existingUser.toObject({ getters: true }),
  // });
};

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.login = login;
