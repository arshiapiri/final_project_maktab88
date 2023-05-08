const Joi = require("joi")

const validationForLogIn = Joi.object({
    username: Joi.string().required().messages({
        "any.required": "Username is required",
        "string.empty": "Username cannot be empty",
      }),
      password: Joi.string().required().messages({
        "any.required": "Password is required",
        "string.empty": "Password cannot be empty",
      }),
  })
module.exports.validateUser = function (requestBody) {
    return validationForLogIn.validate(requestBody);
}