const express = require('express');
const router = express.Router();
const article = require("../controllers/article-controller");
const Upload  = require("../utils/multer");
const checkSessionValidity = require("../middlewares/auth/checkSessionValidity");
const isOwnerOf = require("../middlewares/Article/isOwnerOfArticle")


router.get("/getAll",checkSessionValidity.protect, article.getAll);

router.get("/me", checkSessionValidity.protect, article.getAllMyArticle);
router.post("/create" ,Upload.articleTumbnailUpload.single("thumbnail"), article.create);
router.put("/:articleId" , isOwnerOf.Article, Upload.articleTumbnailUpload.single("thumbnail"), article.updateArticle);
router.get("/:articleId" , article.getId);


router.get("/delete/:articleId",checkSessionValidity.protect, isOwnerOf.Article, article.delete);

module.exports = router