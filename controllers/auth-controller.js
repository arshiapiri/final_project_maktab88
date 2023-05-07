const Users = require("../models/Users");
const { AppError } = require('../utils/app-error');


const signup = async (req, res, next) => {
    try {
        const {
            fristName = null,
            lastName = null,
            username = null,
            password = null,
            gender = "not set",
            phoneNumber = null,
            roleIn = "Blogger"
        } = req.body

        if (!fristName?.trim()||
            !lastName?.trim() ||
            !username?.trim() ||
            !password?.trim() ||
            !phoneNumber?.trim()) {
            return next(
                new AppError(400, "fristName, lastName, username, password, phoneNumber is required."));
        }

        const user = Users.find(user => user.username === username);

        if (!!user) {
			return next(
				new AppError(
					400,
					`username: ${username} is already taken, try another one.`
				)
			);
		}
        await user.save();
    } catch (error) {

    }
}