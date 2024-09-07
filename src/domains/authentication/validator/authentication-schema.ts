const Joi = require('joi');

const schema = Joi.object({
  email: Joi.string()
    .required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

module.exports = { schema };
