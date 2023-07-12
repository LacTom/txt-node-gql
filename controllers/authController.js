const jwt = require("jwt-simple");
const moment = require("moment");

exports.create = async (req, res, next) => {
  try {
    const temporaryExpiration = 180;
    const payload = {
      exp: moment().add(temporaryExpiration, "minutes").unix(),
      iat: moment().unix(),
      id: "1",
      role: "admin",
    };

    const token = jwt.encode(payload, "123stella");
    return res.json({ token });
  } catch (error) {
    return next(error);
  }
};