const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const oneRouter = require("./services/one/index");
const twoRouter = require("./services/one/index");
const HttpError = require("./util/http-error");
const app = express();
let init = require("./initializer");
init.runInitializer();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads","images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

app.use("/api/one", oneRouter);
app.use("/api/two", twoRouter);

app.use((req, res, next) => {
  const error = new HttpError("could not found this route", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "an unknown error occurred!" });
});

module.exports = app;
