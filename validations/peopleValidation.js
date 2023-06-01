const Joi = require("joi");

const params = {
  id: Joi.string()
    .regex(/^[0-9]{24}$/)
    .required(),
};
const mandatoryValues = (enforceRequired = false) => {
  if (enforceRequired) {
    return {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      knowsNodejs: Joi.boolean().default(false),
    };
  }
  return {
    firstName: Joi.string(),
    lastName: Joi.string(),
    knowsNodejs: Joi.boolean(),
  };
};
const genericValues = {
  birthDate: Joi.date(),
  city: Joi.string(),
  BU: Joi.string().valid("DIMI", "DINE"),
};

module.exports = {
  createPerson: {
    body: {
      ...mandatoryValues(true),
      ...genericValues,
    },
  },

  updatePerson: {
    body: {
      ...mandatoryValues(false),
      ...genericValues,
    },
    params,
  },

  deletePerson: {
    params,
  },

  getPerson: {
    params,
  },
};
