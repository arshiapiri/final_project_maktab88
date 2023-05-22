const express = require('express');
const router = express.Router();
const article = require("../controllers/article-controller")


router.get("/getAll" , article.getAll);
router.post("/" , article.create);

module.exports = router