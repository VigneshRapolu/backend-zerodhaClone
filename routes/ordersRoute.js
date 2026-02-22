const router = require('express').Router()
const wrapAsync=require("../util/wrapAsync");
const {userVerification}=require("../middlewares/authMiddleware");
const {orders,getOrders,sellStock}=require("../controllers/ordersController");
router.post("/newOrder",userVerification,wrapAsync(orders));
router.post("/sellOrder",userVerification,wrapAsync(sellStock))
router.get("/",userVerification,wrapAsync(getOrders));

module.exports=router;