const Comment = require("../../models/comment");
const AppError = require('../../utils/app-error');


module.exports.Comment = async(req,res,next) =>{
    const commentId = req.params.commentId;

    const targetComment = await Comment.findById(commentId);
    if (
      !targetComment ||
      targetComment.user.toString() !== req.session.user._id
    ) {
      return next(new AppError("you are not the owner of this comment.", 403));
    }   
    next();
}