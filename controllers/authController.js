const jwt = require("jwt-simple");
const moment = require("moment");
const configs = require("../config/configs");

exports.create = async (req, res, next) => {
  try {
    const temporaryExpiration = 180;
    const payload = {
      exp: moment().add(temporaryExpiration, "minutes").unix(),
      iat: moment().unix(),
      id: "1",
      role: configs.ADMIN,
    };

    const token = jwt.encode(payload, configs.jwtSecret);
    return res.json({ token });
  } catch (error) {
    return next(error);
  }
};
