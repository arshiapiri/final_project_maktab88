const express = require('express');
const router = express.Router();
const controllers = require("../controllers/comment-controller.js")

const checkSessionValidity = require("../middlewares/auth/checkSessionValidity.js");
const getCommentCheck = require("../middlewares/comment/getCommentCheck.js")


router.get("/my-comments",
    checkSessionValidity.protect,
    controllers.getAllUserComments
);
router.get("/:commentId",
    getCommentCheck.commentExistance,
    controllers.getCommentById
);
router.post("/", checkSessionValidity.protect,
    controllers.createComment
);
router.put("/:commentId",
    checkSessionValidity.protect,
    getCommentCheck.commentExistance,
    controllers.updateComment
);
router.delete("/:commentId",
    checkSessionValidity.protect,
    getCommentCheck.commentExistance,
    controllers.deleteComment
);



module.exports = router;