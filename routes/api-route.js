const express = require('express');
const router = express.Router();
const authRouter = require("./auth-router")
const commentRouter = require("./comment")

router.use("/auth", authRouter);
router.use("/comment", commentRouter);

module.exports = router;
