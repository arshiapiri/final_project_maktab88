const AppError = require("../utils/app-error")
const notFoundError = (req, res, next) => {
	next(new AppError(404, `${req.method} ${req.originalUrl} not found!`));
}

module.exports = notFoundError