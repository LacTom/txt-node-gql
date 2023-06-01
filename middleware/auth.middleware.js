const passport = require("passport");
const util = require('util');
const APIError = require("../utils/APIError");
const httpStatus = require("http-status");

const handleJWT = (req, res, next, roles) => async (err, user, info) => {
  const error = err || info;
  const logIn = util.promisify(req.logIn);

  try {
    if (error || !user) throw error;
    await logIn(user, { session: false });
  } catch (e) {
    return next(new APIError({
        ...e,
        status: httpStatus.UNAUTHORIZED,
        message: error.message
    }));
  }
  if (!roles.includes(user.role)) {
    return next(new APIError({
      status: httpStatus.FORBIDDEN,
      message: "you don't have the required role to access this information",
    }));
  }
  if (user) req.user = user;
  return next();
};

exports.authorize =
  (roles = []) =>
  (req, res, next) => {
    passport.authenticate(
      "jwt",
      { session: false },
      handleJWT(req, res, next, roles)
    )(req, res, next);
  };
