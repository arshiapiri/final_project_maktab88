const Articles = require("../models/Article");
const AppError = require('../utils/app-error');
const { join } = require('node:path');
const ArticleForCreate = require("../validators/checkForCreateArticle");
const ArticleForUpdate = require("../validators/checkForUpdateArticle");
const paginate = require("../utils/pagination")

// const resizeArticleThumbnail = require('../utils/resizeImage/resizeArticleThumbnail');
// const resizeArticleImages = require('../utils/resizeImage/resizeArticleImage');


module.exports.getAll = async (req, res, next) => {
  try {
    if (!req.session.user) return res.redirect("/login");

    let { page, pageSize } = req.query;

    const paginatedResults = await paginate(Articles, page, pageSize);

    res.status(200).json(paginatedResults);
  } catch (error) {
    console.log(error);
    next(new AppError(500, "something went wrong, not fault :)" ));
  }
};


module.exports.getAllMyArticle = async (req, res, next) => {
  try {
    if (!req.session.user) return res.redirect("/login");

    const query = Articles.find({
      author: req.session.user._id,
    });

    const articles = await query;

    const articlesJSON = articles.map(article => article.toObject());

    res.status(200).json(articlesJSON);
  } catch (error) {
    console.log(error);
    next(new AppError(500, "Something went wrong, not your fault :)"));
  }
};

module.exports.getId = async (req, res, next) => {
  try {
    if (!req.session.user) return res.redirect("/login");
    const readArticleById = await Articles.findById(req.params.articleId);

    res.render(join(__dirname, '../views/oneBlog.ejs'), { article: readArticleById });
  } catch (error) {
    console.log(error);
    next(new AppError(500, "something went wrong, not fault :)"));
  }
}

module.exports.updateArticle = async (req, res, next) => {
  try {
    if (!req.session.user) return res.redirect("/login");
    const ress = await Articles.findById(req.params.articleId);
    let thumbnailPath = ress.thumbnail; // Initialize the thumbnail path with the existing thumbnail

    // Check if a new thumbnail is provided in the request
    if (req.file && req.file.filename) {
      thumbnailPath = "/images/articles/thumbnailPic/" + req.file.filename;
    }

    const articleBody = {
      title: req.body.title,
      content: req.body.content,
      thumbnail: thumbnailPath,
    };

    const { error } = ArticleForUpdate.validateUser(articleBody)
    console.log(error);

    if (!!error) {
        return next(
            new AppError(
                400,
                error.details[0].message
            )
        )
    }

    const updateArticle = await Articles.findByIdAndUpdate(
      req.params.articleId,
      articleBody,
      { new: true }
    ).select("-__v");

    res.status(200).send(updateArticle);
  } catch (error) {
    console.log(error);
    next(new AppError(500, "An error occurred."));
  }
};

module.exports.create = async (req, res, next) => {
  try {
    if (!req.session.user) return res.redirect("/login");
    const newArticle = new Articles({
      title: req.body.title,
      content: req.body.content,
      author: req.session.user._id,
      thumbnail: "/images/articles/thumbnailPic/" + req.file.filename,
    });

    const { error } = ArticleForCreate.validateUser(newArticle)

    // if (!!error) {
    //     return next(
    //         new AppError(
    //             400,
    //             error.details[0].message
    //         )
    //     )
    // }

    if (!req.session.user) return res.redirect("/login");
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
    if (!req.session.user) return res.redirect("/login");
    await Articles.findByIdAndDelete(req.params.articleId)
    res.redirect('/article')
  } catch (error) {
    console.log(error);
    next(new AppError(500, 'Something went wrong, not your fault :)'));
  }
};