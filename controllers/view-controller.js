const { join } = require('node:path');
const Users = require("../models/Users");

module.exports.login = (req, res, next) => {
    res.render(join(__dirname, '../views/login.ejs'));
};

module.exports.Signup = (req, res, next) => {
    console.log(req.session.user);
    res.render(join(__dirname, '../views/signup.ejs'));
};

module.exports.renderUserProfile = async (req, res, next) => {
    try {
        // const { 
        //     fristName,
        //     lastName,
        //     username,
        //     password,
        //     gender,
        //     phoneNumber,
        //     roleIn
        // } = await Users.findById(req.session.user._id);
        res.render(join(__dirname, "../views/userProfile.ejs")
        )
    } catch (error) {
        console.log(error);
    }
}


