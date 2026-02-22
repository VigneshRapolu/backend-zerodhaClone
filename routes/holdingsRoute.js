const router = require('express').Router()
const wrapAsync=require("../util/wrapAsync");
const {userVerification}=require("../middlewares/authMiddleware");
const {holdings}=require("../controllers/holdingsController");
router.get("/",userVerification,wrapAsync(holdings))
module.exports=router;