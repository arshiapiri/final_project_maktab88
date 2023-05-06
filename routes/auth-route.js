const router = require('express').Router();
import { signup, login, logout } from '../controllers/auth-controller';

router.post("/signup", signup);
router.post("/login", login);
router.get("/logOut/:username", logout);


export default router;
