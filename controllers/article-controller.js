const Articles = require("../models/Article");
const AppError = require('../utils/app-error');
const { join } = require('node:path');
const ArticleForCreate = require("../validators/checkForCreateArticle")

const resizeArticleThumbnail = require('../utils/resizeImage/resizeArticleThumbnail');
// const resizeArticleImages = require('../utils/resizeImage/resizeArticleImage');


module.exports.getAll = async (req, res, next) => {
  try {
    const readArticle = await Articles.find({})


    res.send({ readArticle })
  } catch (error) {
    next(new AppError(500, "something went wrong, not fault :)"));
  }
}

module.exports.getId = async (req, res, next) => {
  try {
    const readArticleById = await Articles.findById(req.params.articleId);

    res.render(join(__dirname, '../views/oneBlog.ejs'), { article: readArticleById });
  } catch (error) {
    console.log(error);
    next(new AppError(500, "something went wrong, not fault :)"));
  }
}

module.exports.updateArticle = async (req, res, next) => {
  try {
    const ress = await Articles.findById(req.params.articleId);
    console.log(ress);
   
  } catch (error) {
    console.log(error);
  }
}

module.exports.create = async (req, res, next) => {
  try {
    const newArticle = new Articles({
      title: req.body.title,
      content: req.body.content,
       author: req.session.user._id,
      thumbnail: "/images/articles/thumbnailPic/" + req.file.filename,
    });

    if (!req.session.user) return res.redirect("/users/login");
    // const articleImages = await resizeArticleImages.resizeArticleImages(article._id, req.file);
  
     await newArticle.save();
     res.redirect("/Article");
  
  } catch (error) {
    console.log(error);
    next(new AppError(500, "something went wrong, your article not create :)"));
  }
}

module.exports.delete = async (req, res, next) => {
  try {
    await Articles.findByIdAndDelete(req.params.articleId)
    res.redirect('/article')
  } catch (error) {
    console.log(error);
    next(new AppError(500, 'Something went wrong, not your fault :)'));
  }
};