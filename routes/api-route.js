const express = require('express');
const router = express.Router();
const usersRouter = require("./auth-router")
const commentRouter = require("./comment-router")
const articleRouter = require("./article-route")
const adminRouter = require("./admin-router")

router.use("/users", usersRouter);
router.use("/article", articleRouter);
router.use("/comment", commentRouter);
router.use("/admin", adminRouter);


module.exports = router;
