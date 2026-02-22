const { Signup, Login,Hello,logout } = require('../controllers/AuthController')
const {userVerification}=require("../middlewares/authMiddleware")
const router = require('express').Router()
const wrapAsync=require("../util/wrapAsync");
// router.get('/',userVerification);
router.post('/signup', wrapAsync(Signup))
router.post('/login', wrapAsync(Login))

router.post("/logout",userVerification,wrapAsync(logout));


module.exports = router