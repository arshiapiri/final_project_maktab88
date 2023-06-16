const AppError = require('../../utils/app-error');
const Articles = require("../../models/Article");


module.exports.ArticleExistance = async (req,res,next) => {
    try {
        const Article = await Articles.findById(req.params.articleId)
        if (!!Article) return next()
        else return next(new AppError(404, "Not Found your Article"))
    } catch (error) {
        return next(new AppError(500, "An error occurred."));
    }
}