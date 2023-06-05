const express = require('express');
const router = express.Router();
const controllers = require("../controllers/comment-controller.js")


router.get("/my-comments",controllers.getAllUserComments);
router.get("/:commentId", controllers.getCommentById);
router.post("/",controllers.createComment)
  

module.exports = router;