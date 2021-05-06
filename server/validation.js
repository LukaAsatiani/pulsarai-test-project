const { Joi } = require('express-validation')

const signup = {
  body: Joi.object({
    email: Joi.string()
      .email()
      .required(),
    username: Joi.string()
      .regex(/^[a-zA-Z0-9]+$/)
      .min(8)
      .max(21)
      .required(),
    password: Joi.string()
      .min(8)
      .max(64)
      .required(),
  }),
}

const login = {
  body: Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      .max(64)
      .required(),
  }),
}

module.exports = { signup, login }