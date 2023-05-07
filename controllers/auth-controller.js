const Users = require("../models/Users");
const AppError = require('../utils/app-error');


const signup = async (req, res, next) => {
    try {
        const requestBody = {
            fristName = null,
            lastName = null,
            username = null,
            password = null,
            gender = "not set",
            phoneNumber = null,
            roleIn = "Blogger"
        } = req.body

        if (!fristName?.trim() ||
            !lastName?.trim() ||
            !username?.trim() ||
            !password?.trim() ||
            !phoneNumber?.trim()) {
            return next(
                new AppError(400, "fristName, lastName, username, password, phoneNumber is required."));
        }

        let user = await Users.findOne({ username: requestBody.username });
        if (!!user) {
            return next(
                new AppError(
                    400,
                    `username: ${username} is already taken, try another one.`
                )
            );
        }
        user = await Users.findOne({ phoneNumber: requestBody.phoneNumber });
        if (!!user) {
            return next(
                new AppError(
                    400,
                    `phoneNumber: ${phoneNumber} is already taken, try another one.`
                )
            );
        }
        const newUser = new Users(requestBody);
        await newUser.save()
        res.status(201).send(newUser);
    } catch (error) {
        next(new AppError(400, "Sign-up failed. Please check your information and try again."));
    }
}
const login = async (req, res, next) => {
    try {
        const requestBody = { username = null, password = null } = req.body;

        if (!username?.trim() || !password?.trim()) {
            return next(new AppError(400, 'username and password is required.'));
        }
        let user = await Users.findOne({ username: requestBody.username, password: requestBody.password });

        if (!user) {
            return next(new AppError(401, 'username or password not match'));
        }

        res.send({ user })
    } catch (error) {
        console.log(error);
        next(new AppError(500, '[-]: auth controller > login'));
    }
}

module.exports = signup
module.exports = login