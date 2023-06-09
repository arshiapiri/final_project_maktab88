const express = require('express');
const router = express.Router();
const controllers = require("../controllers/admin-controller")

const checkUserValidity = require("../middlewares/auth/checkUserValidity")


router.get("/getuser",controllers.getUser);

router.delete("/:bloggerId",checkUserValidity.UserExistance, controllers.deleteUser)

module.exports = router;