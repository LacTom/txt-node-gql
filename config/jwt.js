const jwt = require("jwt-simple");
const configs = require("./configs");

const getDecodedToken = (token) =>
  jwt.decode(token.replace("Bearer ", ""), configs.jwtSecret);
const getJwtPayload = (token) => {
  try {
    return token && getDecodedToken(token);
  } catch (error) {
    return null;
  }
};

module.exports = {
  getJwtPayload,
};
