const AppError = require('../utils/app-error');
const Users = require("../models/Users");
const Articles = require("../models/Article");
const Comment = require("../models/comment");


module.exports.getUser = async (req, res, next) => {
    try {
        const users = await Users.find({ role: { $ne: "Admin" } })
        if (users.length === 0) {
            return next(new 
                AppError(400, 'No users found'));
        }

        return res.send(users)
    } catch (error) {
        next(new AppError(500, "something went wrong, not fault :)"));
    }
}

module.exports.deleteUser = async (req, res, next) => {
    try {
        const deleting = await Articles.findByIdAndDelete(req.params.bloggerId);

        res.status(200).send("delete user successfully!")

    } catch (error) {
        console.log(error);
        next(new AppError(500, "something went wrong, not fault :)"));
    }
}

module.exports.deleteArticle = async (req, res, next) => {
    try {
        const deleting = await Articles.findByIdAndDelete(req.params.articleId);

        res.status(200).send("delete Article successfully!")

    } catch (error) {
        console.log(error);
        next(new AppError(500, "something went wrong, not fault :)"));
    }
}

module.exports.deleteComment = async (req, res, next) => {
    try {
        const deleting = await Comment.findByIdAndDelete(req.params.commentId);

        res.status(200).send("delete Comment successfully!")

    } catch (error) {
        console.log(error);
        next(new AppError(500, "something went wrong, not fault :)"));
    }
}
