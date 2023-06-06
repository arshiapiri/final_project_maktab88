const AppError = require('../../utils/app-error');
const Comment = require("../../models/comment");


module.exports.commentExistance = async (req,res,next) => {
    try {
        const comment = await Comment.findById(req.params.commentId)
        if (!!comment) return next()
        else return next(new AppError(404, "Not Found your Comment"))
    } catch (error) {
        return next(new AppError(500, "An error occurred."));
    }
}