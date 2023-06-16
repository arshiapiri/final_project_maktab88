const express = require('express');
const router = express.Router();
const controllers = require("../controllers/admin-controller")

const checkUserValidity = require("../middlewares/auth/checkUserValidity")
const checkCommentValidity = require("../middlewares/comment/checkCommentValidity")
const checkArticleValidity = require("../middlewares/Article/checkArticleValidity")



router.get("/getuser",controllers.getUser);

router.delete("/:bloggerId",checkUserValidity.UserExistance, controllers.deleteUser)

router.delete("/:articleId",checkArticleValidity.ArticleExistance, controllers.deleteArticle)

router.delete("/:commentId",checkCommentValidity.CommentExistance, controllers.deleteComment)

module.exports = router;