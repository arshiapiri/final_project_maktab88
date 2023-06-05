const { join } = require('node:path');
const Users = require("../models/Users");
const Articles = require("../models/Article");
const upload = require("../utils/multer");
const fs = require("fs/promises");

module.exports.login = (req, res, next) => {
    if (req.session && req.session.user) {
        return res.redirect("/profile");
    }

    res.render(join(__dirname, '../views/login.ejs'));
};

module.exports.Signup = (req, res, next) => {
    if (req.session && req.session.user) {
        return res.redirect("/profile");
    }

    res.render(join(__dirname, '../views/signup.ejs'));
};

module.exports.renderUserProfile = async (req, res, next) => {
    if (!req.session.user) return res.redirect("/login");
    const user = {
        fristName,
        lastName,
        username,
        password,
        gender,
        phoneNumber,
        roleIn
    } = await Users.findById(req.session.user._id);
    res.render(join(__dirname, "../views/userProfile.ejs"), { user }
    )
}

module.exports.renderArticle = async (req, res, next) => {

   await Articles.find({});

  res.render(join(__dirname, "../views/blogs.ejs"));
}

module.exports.renderCreateArticle = async (req, res, next) => {
  res.render(join(__dirname, "../views/createPost.ejs"));
}

module.exports.getId = async (req, res, next) => {
  
    const readArticleById = await Articles.findById(req.params.articleId);
    
    res.render(join(__dirname, '../views/blogs.ejs') , { readArticleById });
}

module.exports.uploadAvatar = (req, res, next) => {
  const uploadUserAvatar = upload.upload.single("avatar");
  if (!req.session.user) return res.redirect("/login");
  uploadUserAvatar(req, res, async (err) => {
    if (err) {
      if (err.message) return res.status(400).send(err.message);
      return res.status(500).send("server error!");
    }

    if (!req.file) return res.status(400).send("File not send!");

    try {
      if (req.session.user.avatar) {
        await fs.unlink(
          join(__dirname, "../public", req.session.user.avatar)
        );
      }

      const userss = await Users.findByIdAndUpdate(
        req.session.user._id,
        {
          avatar: "/images/userAvatars/" + req.file.filename,
        },
        { new: true }
      );
      req.session.user.avatar = userss.avatar;

      // return res.json(user);
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  });
  };

  module.exports.uploadThumbnail = (req, res, next) => {
    const uploadArticleThumbnail = upload.articleTumbnailUpload.single("thumbnail");
  
    uploadArticleThumbnail(req, res, async (err) => {
      if (err) {
        if (err.message) return res.status(400).send(err.message);
        return res.status(500).send("Server error!");
      }
  
      if (!req.file) return res.status(400).send("File not sent!");
  
      try {
        // Delete old thumbnail
        if (req.session.article.thumbnail) {
          await fs.unlink(
            path.join(__dirname, "../public", req.session.article.thumbnail)
          );
        }
  
        const updatedArticle = await Article.findByIdAndUpdate(
          req.session.article._id,
          {
            thumbnail: "/images/articleThumbnails/" + req.file.filename,
          },
          { new: true }
        );
  
        req.session.article.thumbnail = updatedArticle.thumbnail;
  
        res.redirect("/article");
      } catch (err) {
        return next(createError(500, "Server error!"));
      }
    });
  };
