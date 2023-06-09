const Joi = require("joi")
const JoiObjectId = require("joi-objectid")
Joi.objectId = JoiObjectId(Joi);

const validateCommentForCreate = Joi.object({
    commentForArticle: Joi.string().min(3).max(500).required().messages({
        "string.base": "Content must be a string",
        "string.empty": "Content is required",
        "string.min": "Content must have at least {#limit} characters",
        "string.max": "Content can have at most {#limit} characters",
        "any.required": "Content is required",
      }),
      articleId: Joi.objectId().required().messages({
        "string.pattern.base": "Article id must be a valid ObjectId",
        "string.base": "Article id must be a valid ObjectId",
        "any.required": "Article id is required",
      }),
    });

    module.exports.validateUser = function (requestBody) {
        return validateCommentForCreate.validate(requestBody);
    };