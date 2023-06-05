const express = require('express');
const router = express.Router();
const controllers = require("../controllers/comment-controller.js")


router.get("/my-comments",controllers.getAllUserComments);
router.post("/",controllers.createComment)
  

module.exports = router;