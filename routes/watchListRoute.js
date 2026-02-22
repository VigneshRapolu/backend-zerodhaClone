const router = require('express').Router()
const wrapAsync=require("../util/wrapAsync");
const {watchList}=require("../controllers/watchListController");
router.get("/",wrapAsync(watchList));
module.exports=router;