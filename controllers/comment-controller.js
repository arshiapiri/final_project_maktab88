const AppError = require('../utils/app-error');
const Articles = require("../models/Article");
const Comment = require("../models/comment");



module.exports.getAllUserComments =  async (req, res, next) => {
    const userId = req.session.user._id;
    let comments = await Comment.find({ user: userId });
    res.send(comments);
  }

 module.exports.getCommentById = async(req,res,next) => {
  try {
    const filteredComment = await Comment.findOne(req.params.articleId ,{__v:0,updatedAt:0});
    res.send(filteredComment);
  } catch (error) {
    console.log(error);
  }
 }

module.exports.createComment = async (req, res, next) => {
    const commentBody = { commentForArticle = null , articleId = null ,
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
}

module.exports.
