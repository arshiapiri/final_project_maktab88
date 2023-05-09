const Users = require("../models/Users");
const AppError = require('../utils/app-error');
const validateSignUp = require("../validators/checkForSignUp");
const validateLogIn = require("../validators/checForLogIn");
const userRequestForSignUp = require("../validators/userReq")

module.exports.signup = async (req, res, next) => {
    try {
        const  userRequestForSignUp = req.body;
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
        console.log(error);
        next(new AppError(400, "Sign-up failed. Please check your information and try again."));
    }
}
module.exports.login = async (req, res, next) => {
    try {
        const requestBody = { username = null, password = null } = req.body;
        const { error } = validateLogIn.validateUser(requestBody)
        if(!!error) {
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

module.exports.logOut = async(req,res,next) => {
    req.session.destroy();
    res.status(200).end();
}