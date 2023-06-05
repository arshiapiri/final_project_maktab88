const express = require('express');
const router = express.Router();
const render =require("../controllers/view-controller");

router.get("/login", render.login);
router.get("/signup", render.Signup);
router.get("/profile" , render.renderUserProfile)
router.get("/Article" , render.renderArticle)
router.get("/createArticle" , render.renderCreateArticle)


// multer
router.post("/uploadAvatar", render.uploadAvatar);
router.post("/uploadThumbnail", render.uploadThumbnail);


module.exports = router