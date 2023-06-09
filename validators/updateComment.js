const Joi = require("joi")


const validateCommentForUpdate = Joi.object({
    commentForArticle: Joi.string().min(3).max(500).required().messages({
        "string.base": "Content must be a string",
        "string.empty": "Content is required",
        "string.min": "Content must have at least {#limit} characters",
        "string.max": "Content can have at most {#limit} characters",
        "any.required": "Content is required",
    }),
});

module.exports.validateUser = function (requestBody) {
    return validateCommentForUpdate.validate(requestBody);
};