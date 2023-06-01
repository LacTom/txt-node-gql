const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const logger = require("../utils/logger");

const jwtFromRequest = (req) => {
  return ExtractJwt.fromAuthHeaderWithScheme('Bearer')(req);
};

const jwtOptions = {
  secretOrKey: "123stella",
  jwtFromRequest,
};

const jwt = async (payload, done) => {
  try {
    const user = {
      id: "1",
      role: "admin",
    };
    return done(null, user);
  } catch (error) {
    logger.error({error})
    return done(error, false);
  }
};

exports.jwt = new JwtStrategy(jwtOptions, jwt);
