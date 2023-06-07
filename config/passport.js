const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const logger = require("../utils/logger");
const configs = require('./configs');

const jwtFromRequest = (req) => {
  return ExtractJwt.fromAuthHeaderWithScheme('Bearer')(req);
};

const jwtOptions = {
  secretOrKey: configs.jwtSecret,
  jwtFromRequest,
};

const jwt = async (payload, done) => {
  try {
    const user = {
      id: "1",
      role: configs.ADMIN,
    };
    return done(null, user);
  } catch (error) {
    logger.error({error})
    return done(error, false);
  }
};

exports.jwt = new JwtStrategy(jwtOptions, jwt);
