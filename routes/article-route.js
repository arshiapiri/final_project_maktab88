const express = require('express');
const router = express.Router();
const article = require("../controllers/article-controller")
const  Upload  = require("../utils/multer");
const checkSessionValidity = require("../middlewares/auth/checkSessionValidity")


router.get("/getAll",checkSessionValidity.protect, article.getAll);
router.post("/create" ,Upload.articleTumbnailUpload.single("thumbnail"), article.create);
router.put("/:articleId" ,Upload.articleTumbnailUpload.single("thumbnail"), article.updateArticle);
router.get("/:articleId", article.getId);


router.get("/delete/:articleId",checkSessionValidity.protect, article.delete);

module.exports = router