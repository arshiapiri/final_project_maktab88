const express = require('express');
const router = express.Router();
const signup = require("")
const login = require("")
const logout = require("")

router.post("/signup", signup);
router.post("/login", login);
router.get("/logOut/:username", logout);


module.exports = router;
