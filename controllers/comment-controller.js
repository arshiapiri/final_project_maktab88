const AppError = require('../utils/app-error');
const Articles = require("../models/Article");
const Comment = require("../models/comment");



module.exports.getAllUserComments =  async (req, res, next) => {
    const userId = req.session.user._id;
    let comments = await Comment.find({ user: userId });
    res.send(comments);
  }

module.exports.createComment = async (req, res, next) => {
    const commentBody = { content = null } = req.body;
    const articleId = req.params.articleId
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
        content,
        user: userId,
      });

      await Articles.findByIdAndUpdate(articleId, {
        $push: { comments: comment._id },
      });

      const createComment = await comment.save();

      res.status(201).send(createComment);
}

