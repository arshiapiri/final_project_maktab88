const Joi = require("joi");

const validationForUpdate = Joi.object({
    title: Joi.string().min(3).max(50).required().messages({
        "string.base": "Title must be a string",
        "string.empty": "Title is required",
        "string.min": "Title must have at least {#limit} characters",
        "string.max": "Title can have at most {#limit} characters",
        "any.required": "Title is required",
      }),
      description: Joi.string().min(3).max(150).messages({
        "string.base": "Sketch must be a string",
        "string.min": "Sketch must have at least {#limit} characters",
        "string.max": "Sketch can have at most {#limit} characters",
      }),
      thumbnail: Joi.string().required().messages({
        "string.base": "Thumbnail file name must be a string",
        "string.empty": "Thumbnail file name is required",
        "any.required": "Thumbnail file name is required",
      }),
      content: Joi.string().min(3).required().messages({
        "string.base": "Content must be a string",
        "string.empty": "Content is required",
        "string.min": "Content must have at least {#limit} characters",
        "any.required": "Content is required",
      }),
      // imageFileNames: Joi.array().items(Joi.string()).messages({
      //   "array.base": "Image file names must be an array",
      //   "array.items": "Image file names must be strings",
      // }),
      // author: Joi.objectId().required().messages({
      //   "string.base": "Author must be a valid ObjectId",
      //   "any.required": "Author is required",
      // }),
})

module.exports.validateUser = function(requestBody) {
    return validationForUpdate.validate(requestBody);
  };