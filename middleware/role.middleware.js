const CustomErrorHandler = require("../error/custom-error.handler");

const roleMiddleware = (roles = []) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return next(CustomErrorHandler.Unauthorized());
    }

    if (!roles.includes(user.role)) {
      return next(CustomErrorHandler.Forbidden("Access denied"));
    }

    next();
  };
};

module.exports = roleMiddleware;
