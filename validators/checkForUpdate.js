const Joi = require("joi")


const validationForUpdateUser = Joi.object({
    fristName: Joi.string().min(3).max(30).required().messages({
        "string.base": `Firstname should be a string`,
        "string.empty": `Firstname cannot be an empty `,
        "string.min": `Firstname should have a minimum length of {#limit}`,
        "string.max": `Firstname should have a maximum length of {#limit}`,
        "any.required": `Firstname is a required field`
    }),
    lastName: Joi.string().min(3).max(30).required().messages({
        "string.base": `Lastname should be a string`,
        "string.empty": `Lastname cannot be an empty `,
        "string.min": `Lastname should have a minimum length of {#limit}`,
        "string.max": `Lastname should have a maximum length of {#limit}`,
        "any.required": `Lastname is a required field`
    }),
    username: Joi.string().min(3).max(30).required().messages({
        "string.base": "Username must be a string",
        "string.empty": "Username cannot be empty",
        "string.min": "Username must be at least {#limit} characters long",
        "string.max": "Username must be at most {#limit} characters long",
        "any.required": "Username is required",
      }),
    gender: Joi.string()
        .valid("not set", "women", "man")
        .optional()
        .default("not set")
        .messages({
            "string.empty": "Field cannot be empty",
            "any.required": "Field is required",
            "any.only": "Gender must be one of not set, women, or man"
        }),
    phoneNumber: Joi.forbidden().messages({
        "any.forbidden": `"role" field is not allowed in this request`,
    }),
    role: Joi.string().valid("blogger").default("blogger").messages({
        "any.only": "The role must be set to blogger."
    }),
})

module.exports.validateUser = function (requestBody) {
    return validationForUpdateUser.validate(requestBody);
};