const AppError = require('../../utils/app-error');
const Comment = require("../../models/comment");


module.exports.CommentExistance = async (req,res,next) => {
    try {
        const Comment = await Comment.findById(req.params.commentId)
        if (!!Comment) return next()
        else return next(new AppError(404, "Not Found your Comment"))
    } catch (error) {
        return next(new AppError(500, "An error occurred."));
    }
}