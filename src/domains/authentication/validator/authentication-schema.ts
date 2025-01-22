const Joi = require('joi');

const authSchema = Joi.object({
  email: Joi.string()
    .required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

module.exports = { authSchema };
