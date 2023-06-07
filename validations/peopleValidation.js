const Joi = require("joi");

const params = Joi.object({
  id: Joi.number().required(),
});
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
    body: Joi.object({
      ...mandatoryValues(true),
      ...genericValues,
    }),
  },

  updatePerson: {
    body: Joi.object({
      ...mandatoryValues(false),
      ...genericValues,
    }),
    params,
  },

  deletePerson: {
    params,
  },

  getPerson: {
    params,
  },
};
