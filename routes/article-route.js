const express = require('express');
const router = express.Router();
const article = require("../controllers/article-controller")
const  Upload  = require("../utils/multer");


router.get("/getAll" , article.getAll);
router.post("/create" ,Upload.articleTumbnailUpload.single("thumbnail"), article.create);
router.get("/:articleId", article.getId);


router.get("/delete/:articleId", article.delete);

module.exports = router