const express = require('express');
const router = express.Router();

const render =require("../controllers/view-controller");

router.get("/login", render.login);
router.get("/signup", render.Signup);
router.get("/profile" , render.renderUserProfile)


// multer
router.post("/uploadAvatar", render.uploadAvatar);

router.post("/updateUser" , render.updateUser)

module.exports = router