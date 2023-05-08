const express = require('express');
const router = express.Router();

const render =require("../controllers/view-controller");

router.get("/login", render.login);
router.get("/signup", render.Signup);
router.get("/profile" , render.renderUserProfile)

module.exports = router