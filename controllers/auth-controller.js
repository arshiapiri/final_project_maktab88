const Users = require("../models/Users");
const AppError = require('../utils/app-error');
const validateSignUp = require("../validators/checkForSignUp");
const validateLogIn = require("../validators/checForLogIn");
const validateUpdate = require("../validators/checkForUpdate");
const userRequestForSignUp = require("../validators/userReq")

module.exports.signup = async (req, res, next) => {
    try {
        const userRequestForSignUp = req.body;
        const { error } = validateSignUp.validateUser(userRequestForSignUp);
        if (!!error) {
            return next(
                new AppError(
                    400,
                    error.details[0].message
                )
            )
        }
        let user = await Users.findOne({ username: userRequestForSignUp.username });
        if (!!user) {
            return next(
                new AppError(
                    400,
                    "username is already taken, try another one."
                )
            );
        }
        user = await Users.findOne({ phoneNumber: userRequestForSignUp.phoneNumber });
        if (!!user) {
            return next(
                new AppError(
                    400,
                    "phoneNumber is already taken, try another one."
                )
            );
        }
        const newUser = new Users((userRequestForSignUp));
        await newUser.save()
        res.status(201).send(newUser)
    } catch (error) {
        next(new AppError(500, "Sign-up failed. Please check your information and try again."));
    }
}
module.exports.login = async (req, res, next) => {
    try {
        const requestBody = { username = null, password = null } = req.body;
        const { error } = validateLogIn.validateUser(requestBody)
        if (!!error) {
            return next(
                new AppError(
                    400,
                    error.details[0].message
                )
            )
        }

        let user = await Users.findOne({
            username: requestBody.username,
        });

        if (!user) {
            return next(new AppError(401, 'username not match'));
        }

        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return next(new AppError(401, 'password not match'));
        }

        req.session.user = { _id: user._id, role: user.roleIn };
        res.send({ user })
    } catch (error) {
        next(new AppError(500, "LogIn failed. Please check your information and try again."));
    }
}

module.exports.updateUser = async (req, res, next) => {
    try {
        const fields = {
            fristName,
            lastName,
            gender,
            username
        } = req.body;

        const { error } = validateUpdate.validateUser(fields)
        console.log(error);

        if (!!error) {
            return next(
                new AppError(
                    400,
                    error.details[0].message
                )
            )
        }
        let user = await Users.findOne({
            username: fields.username,
        });
        if (!user) {
            return next(new AppError(400, 'username not found, you cant change your userName'));
        }

        req.session.user = { _id: user._id };
    console.log(req.session.user);
        const updating = await Users.findByIdAndUpdate(
            req.session.user._id,
            fields,
            {
                new: true,
            }
        );
        res.send({ user });
    } catch (error) {
        console.log(error);
    }
};


module.exports.deleteUser = async (req, res, next) => {
    await Users.findByIdAndRemove(req.session.user._id);
    req.session.destroy();
    res.status(204).end()
}

module.exports.logOut = async (req, res, next) => {
    console.log(req.session);
    req.session.destroy();
    res.status(200).end()
}