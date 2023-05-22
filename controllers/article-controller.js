const Articles = require("../models/Article");
const AppError = require('../utils/app-error');

module.exports.getAll = async (req, res, next) => {
  try {
    const readArticle = await Articles.find({});

    res.send({ readArticle })
  } catch (error) {
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
      thumbnail: req.body.thumbnail
    });


    const creatArticle = await newArticle.save();
    req.session.Articles = creatArticle;

    res.send("okk")
  } catch (error) {
    console.log(error.message);
  }
}