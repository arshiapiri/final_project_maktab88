const { join } = require('node:path');

module.exports.login = async (req, res, next) => {
    res.render(join(__dirname, '../views/login.ejs'));
};

module.exports.Signup = (req, res, next) => {
	res.render(join(__dirname, '../views/signup.ejs'));
};

