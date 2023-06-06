const AppError = require('../../utils/app-error');
const Users = require("../../models/Users");

module.exports.protect = async (req, res, next) => {
	const userId = req.session.user
	if (!userId) {
		return next(new AppError(401, 'you are not logged in, please login first'));
	}

	const user = await Users.findById(userId);
	if (!user) {
		return next(
			new AppError(401, 'the user blonging to this session no longer exists')
		);
	}

	next();
};