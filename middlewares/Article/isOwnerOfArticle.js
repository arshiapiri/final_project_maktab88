const  Users = require("../../models/Users");
const Articles = require("../../models/Article");
const AppError = require('../../utils/app-error');

module.exports.Article = async(req,res,next) =>{
    const articleId = req.params.articleId;
    const requsterUser = await Users.findById(req.session.user._id);

    const targetArticle = await Articles.findById(articleId);
    if(!!targetArticle && requsterUser.role === "admin"){
      return next();
    }
    if (
      !targetArticle ||
      targetArticle.author.toString() !== req.session.user._id
    ) {
      return next(new AppError("you are not the owner of this article.", 403));
    }   
    next();
}