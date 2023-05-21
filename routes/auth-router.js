const express = require('express');
const router = express.Router();
const signupController = require("../controllers/auth-controller")
const loginController  = require("../controllers/auth-controller")
const logoutController = require("../controllers/auth-controller")
const updateController = require("../controllers/auth-controller")
const deleteController = require("../controllers/auth-controller")

router.post("/signup", signupController.signup);
router.post("/login", loginController.login);
router.get("/logout", logoutController.logOut);

router.get("/deleteAcc" , deleteController.deleteUser)


module.exports = router;
