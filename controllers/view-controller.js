const { join } = require('node:path');
const Users = require("../models/Users");

module.exports.login = (req, res, next) => {
    if (req.session && req.session.user) {
        return res.redirect("/profile");
    }

    res.render(join(__dirname, '../views/login.ejs'));
};

module.exports.Signup = (req, res, next) => {
    if (req.session && req.session.user) {
        return res.redirect("/profile");
    }

    res.render(join(__dirname, '../views/signup.ejs'));
};

module.exports.renderUserProfile = async (req, res, next) => {
    if (!req.session.user) return res.redirect("/login");
    const user = {
        fristName,
        lastName,
        username,
        password,
        gender,
        phoneNumber,
        roleIn
    } = await Users.findById(req.session.user._id);
    res.render(join(__dirname, "../views/userProfile.ejs"), { user }
    )
}


