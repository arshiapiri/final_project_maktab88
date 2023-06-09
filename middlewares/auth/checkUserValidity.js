const AppError = require('../../utils/app-error');
const Users = require("../../models/Users");


module.exports.UserExistance = async (req,res,next) => {
    try {
        const user = await Users.findById(req.params.bloggerId)
        if (!!user) return next()
        else return next(new AppError(404, "Not Found your User"))
    } catch (error) {
        return next(new AppError(500, "An error occurred."));
    }
}