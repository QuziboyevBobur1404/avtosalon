const CustomErrorHandler = require("../error/custom-error.handler");
const clientValidator = require("../validator/client.validate");

module.exports = function (req, res, next) {
  const { error } = clientValidator(req.body);

  if (error) {
    throw CustomErrorHandler.BadRequest(error.message);
  }
  next();
};
