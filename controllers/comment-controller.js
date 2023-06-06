const AppError = require('../utils/app-error');
const Articles = require("../models/Article");
const Comment = require("../models/comment");



module.exports.getAllUserComments = async (req, res, next) => {
  try {
    const userId = req.session.user._id;
    let comments = await Comment.find({ author: userId });
    res.send(comments);
  } catch (error) {
    next(new AppError(500, "An error occurred"));
  }
}

module.exports.getCommentById = async (req, res, next) => {
  try {
    const filteredComment = await Comment.findOne({ _id : req.params.commentId},{__v:0,updatedAt:0});
    res.status(200).send(filteredComment);
  } catch (error) {
    console.log(error);
    next(new AppError(500, "Internal server error"));
  }
}

module.exports.createComment = async (req, res, next) => {
  try {
    const commentBody = {
      commentForArticle = null, articleId = null,
    } = req.body;
    const article = await Articles.findById(articleId);

    if (!article) {
      return next(
        new AppError(
          400,
          "Article not found."
        )
      );
    }

    const userId = req.session.user._id;

    const comment = new Comment({
      article: articleId,
      commentForArticle,
      author: userId,
    });

    await Articles.findByIdAndUpdate(articleId, {
      $push: { comments: comment._id },
    });

    const createComment = await comment.save();

    res.status(201).send(createComment);
  } catch (error) {
    next(new AppError(500, "An error occurred while creating the comment."));
  }
}

module.exports.updateComment = async (req, res, next) => {
try {
  const commentBody = {
    commentForArticle = null,
  } = req.body;

  const comment = await Comment.findByIdAndUpdate(
    {
      _id : req.params.commentId,
    },
    { $set: { commentForArticle } },
    { new: true }
  ).select("-__v");
  res.status(200).send(comment);
} catch (error) {
  next(new AppError(500, "An error occurred."));
}
}

module.exports.deleteComment = async(req, res, next) => {
  try {
    const comment = req.params.commentId;
    await Articles.findByIdAndDelete(comment)
    res.status(200).send("your comment deleted."); 
  } catch (error) {
    console.log(error);
  }
}

