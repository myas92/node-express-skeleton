const pathRoles = require("../const/path-roles");

const HttpError = require("../util/http-error");
const Errors = require("../const/errors");
module.exports = (req, res, next) => {
  try {
    let UserRoles = req.userData.roles;
    let path = req.method + ":" + req.baseUrl + req.route.path; // sample : "GET:/api/users/:id"
    let isValid = false;
    identifiedPath = pathRoles.find((item) => item.path == path);// مسیر در فایل مورد نظر وجود دارد
    if (identifiedPath) {
      // جستجو در رول ها
      UserRoles.forEach((userRole) => {
        if (identifiedPath.roles[0].includes(userRole)) {
          isValid = true;
        }
      });
    }
    if (!isValid) {
      const error = new HttpError(Errors.Access_Denied, req.language);
      return next(error);
    }
    next();
  } catch (err) {
    const error = new HttpError(Errors.Something_Went_Wrong, req.language);
    return next(error);
  }
};
