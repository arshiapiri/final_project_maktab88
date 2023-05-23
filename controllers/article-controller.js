const Articles = require("../models/Article");
const AppError = require('../utils/app-error');
const { join } = require('node:path');
const mongoose = require("mongoose");

module.exports.getAll = async (req, res, next) => {
  try {
    const readArticle = await Articles.find({});

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

module.exports.create = async (req, res, next) => {
  try {
    const newArticle = new Articles({
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      images: req.body.images,
      author: req.body.author,
      thumbnail: "/images/thumbnailPic/" + req.file.filename,
    });

    const creatArticle = await newArticle.save();
    req.session.Articles = creatArticle;


  } catch (error) {
    console.log(error.message);
  }
}

module.exports.delete = async (req, res, next) => {
  try {
    const deleteArticle = await Articles.findByIdAndRemove(new mongoose.Types.ObjectId(req.params.articleId));
    const readArticleById = await Articles.findById(req.params.articleId);
    console.log(readArticleById);
    res.render(join(__dirname, '../views/bloges.ejs'));
  } catch (error) {
    console.log(error);
    next(new AppError(500, 'Something went wrong, not your fault :)'));
  }
};