const express = require('express');
const router = express.Router();
const signupController = require("../controllers/auth-controller")
const loginController  = require("../controllers/auth-controller")
const logoutController = require("../controllers/auth-controller")
const updateController = require("../controllers/auth-controller")
const deleteController = require("../controllers/auth-controller")

const checkSessionValidity = require("../middlewares/auth/checkSessionValidity")

router.post("/signup", signupController.signup);
router.post("/login", loginController.login);
router.post("/updateUser",checkSessionValidity.protect, updateController.updateUser);
router.get("/logout",checkSessionValidity.protect, logoutController.logOut);

router.get("/deleteAcc" ,checkSessionValidity.protect, deleteController.deleteUser)






module.exports = router;
