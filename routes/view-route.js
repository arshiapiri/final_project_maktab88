const express = require('express');
const router = express.Router();

const render =require("../controllers/view-controller");

router.get("/login", render.login);
router.get("/signup", render.Signup);

module.exports = router