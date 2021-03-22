const Errors = require('../const/errors');
const staticVariables = require("../const/static-variables");
class HttpError extends Error {
  constructor(error , language = staticVariables.DEFAULT_LANGUGE) {
    let message = (error.message) ? error.message[language] : error
    super(message);
    this.code = error.code;
    this.statusCode = error.statusCode ;
  }
}

module.exports = HttpError;
