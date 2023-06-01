const httpStatus = require("http-status");
const Joi = require("joi");
const logger = require("../utils/logger");
exports.validate = (schema, property="body") => {
  return (req, res, next) => {
    const { error } = Joi.object(schema).validate(req[property]);
    const valid = error == null;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");

      logger.error(message);
      res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: message });
    }
  };
};
