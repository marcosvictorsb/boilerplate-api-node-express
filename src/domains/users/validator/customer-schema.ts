import Joi from 'joi'

const customerSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{3,30}$/),
  passwordRepeat: Joi.ref('password'),
});

module.exports = { customerSchema };
